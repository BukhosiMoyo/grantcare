import assert from 'node:assert/strict';
import test from 'node:test';
import { FALLBACK_GUIDES, FALLBACK_NEWS_ARTICLES } from '../src/lib/fallback-content';
import { correctGuide, correctNews } from '../src/lib/content-corrections';
import { hasArticleTranslation, localizeArticle } from '../src/lib/content-language';
import rejected from '../src/lib/rejected-generated-translations.json';
import { resolveGuideLink } from '../src/lib/guide-links';
import { getSeoRedirects } from '../src/lib/seo-redirects';
import { getPaymentGrantSeoTitle, getPaymentGrantSeoDescription } from '../src/lib/seo-aliases';
import { getDuplicateGuideRedirectPath } from '../src/lib/guide-redirects';
import { isGuideIndexable } from '../src/lib/guide-seo';
import { getSitemapEntries } from '../src/lib/sitemap';
import { buildLocalizedMetadata } from '../src/lib/metadata';
import { getPublicAnalyticsUrl, isPublicAnalyticsPath } from '../src/lib/public-analytics';
import { getPublicLocales } from '../src/lib/site';

// All tests are offline: never create production analytics events or submissions.
test('public analytics excludes every locale of account and personal-result routes and all URL parameters', () => {
  for (const prefix of ['', '/en', '/zu', '/xh', '/tn']) {
    for (const path of ['/admin', '/dashboard', '/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/unsubscribe', '/api/analytics', '/tools/sassa-appeal/builder', '/tools/email-template/result/private-id']) {
      assert.equal(isPublicAnalyticsPath(prefix+path), false, prefix+path);
      assert.equal(getPublicAnalyticsUrl(prefix+path+'?token=secret', 'https://grantcare.co.za'), undefined);
    }
    assert.equal(isPublicAnalyticsPath(prefix+'/payment-dates'), true);
  }
  assert.equal(getPublicAnalyticsUrl('/payment-dates?email=private@example.com#secret', 'https://grantcare.co.za'), 'https://grantcare.co.za/payment-dates');
  assert.equal(getPublicAnalyticsUrl('', 'https://grantcare.co.za'), undefined);
});

test('a CMS legacy generic translation is rejected while a complete authored translation is preserved', () => {
  const source={title:'An English title', summary:'An English summary', sections:[{title:'Step',body:'The original specific guidance.'}]};
  const translations={zu:{title:'Isihloko',summary:'Isifinyezo',sections:[{title:'Isinyathelo',body:'Landela umyalelo wesicelo sakho.'}]}};
  assert.equal(hasArticleTranslation(source,translations,'zu'),true);
  assert.equal(localizeArticle(source,translations,'zu').sections[0].body,translations.zu.sections[0].body);
  for (const body of rejected.tn) {
    const article=localizeArticle(source,{tn:{title:'Kopo',summary:'Kakaretso',sections:[{title:'Kgato',body}]}},'tn');
    assert.equal(article.contentLocale,'en');
    assert.equal(article.sections[0].body,source.sections[0].body);
    assert.ok(!article.indexableLocales.includes('tn'));
  }
  assert.equal(localizeArticle(source,{},'xh').contentLocale,'en');
});

test('all guide destinations in the full fallback inventory resolve to actual content or payment routes', () => {
  const slugs=new Set(FALLBACK_GUIDES.map(g=>g.slug));
  for (const guide of FALLBACK_GUIDES) for (const section of guide.sections) for (const match of section.body.matchAll(/\/guides\/([a-z0-9-]+)/g)) {
    const target=resolveGuideLink(match[0]);
    assert.ok(!target.startsWith('/guides/') || slugs.has(target.slice(8)), `${guide.slug}: ${target}`);
  }
  for (const guide of FALLBACK_GUIDES) if(getDuplicateGuideRedirectPath(guide.slug)) assert.equal(isGuideIndexable(guide),false,guide.slug);
});

test('factual corrections cover legacy content without overwriting subsequent editorial replacements', () => {
  const office=FALLBACK_GUIDES.find(g=>g.slug==='sassa-office-visit-survival-guide')!;
  const corrected=correctGuide(office);
  assert.ok(!JSON.stringify(corrected).includes('Tuesdays and Thursdays'));
  assert.ok(!JSON.stringify(corrected).includes('MANDATORY'));
  assert.deepEqual(corrected.translations,{});
  const later={...corrected,title:'Later verified editorial title'};
  assert.equal(correctGuide(later),later);
  const schedule=correctNews(FALLBACK_NEWS_ARTICLES.find(a=>a.slug==='sassa-payment-schedule-2026-2027')!);
  assert.ok(JSON.stringify(schedule).includes('R1,290'));
  assert.ok(!JSON.stringify(schedule).includes('R1,295'));
  const news=correctNews(FALLBACK_NEWS_ARTICLES.find(a=>a.slug==='sassa-new-biometric-verification-rules')!);
  assert.ok(news.sourceUrls.every(url=>!url.includes('21-jun-2026')&&!url.includes('/news/biometric')));
  assert.ok(!JSON.stringify(news).includes('less than 2 minutes'));
  for (const [slug, unsupported] of [
    ['how-long-appeal-status-updates-take','30 days to 90 days'],
    ['how-to-check-payment-method-before-pay-date','save you 30 days'],
    ['how-to-know-if-an-appeal-is-worth-submitting','waste 90 days'],
    ['when-to-use-contact-details-instead-of-status-check','Pending\' for over 90 days'],
    ['what-identity-verification-sms-usually-means','literally 5 minutes ago'],
  ]) {
    const guide=correctGuide(FALLBACK_GUIDES.find(g=>g.slug===slug)!);
    assert.ok(!JSON.stringify(guide).includes(unsupported),slug);
    assert.equal(guide.updatedAt,'2026-09-09',slug);
  }
});

test('sitemap contains only canonical supported language variants, with reciprocal alternates and genuine dates', async () => {
  assert.equal(process.env.DATABASE_URL,undefined,'Offline test must not access production');
  const entries=await getSitemapEntries();
  const urls=new Set(entries.map(e=>e.url));
  assert.equal(urls.size,entries.length);
  for (const entry of entries) {
    const path=new URL(entry.url).pathname;
    assert.ok(!/^\/en(?:\/|$)/.test(path));
    assert.ok(!/\/(?:sitemap|dashboard|admin|sign-in|sign-up)$/.test(path));
    assert.ok(!/\/(?:builder|result)(?:\/|$)/.test(path));
    if(path.includes('/guides/')) {
      assert.equal(getDuplicateGuideRedirectPath(path.split('/guides/')[1]),null);
      for(const alternate of Object.values(entry.alternates?.languages ?? {})) assert.ok(urls.has(alternate as string),String(alternate));
    }
    if(path==='/') assert.equal(entry.lastModified,undefined);
  }
  const languages=buildLocalizedMetadata({locale:'en',path:'/payment-dates',title:'Payment dates',description:'Payment dates'}).alternates?.languages ?? {};
  assert.ok(String(Object.entries(languages).find(([key])=>key==='x-default')?.[1]).endsWith('/payment-dates'));
  assert.ok(getPublicLocales().every(l=>l.code in languages));
});

test('published payment dates remain exact and unknown fallback dates are not invented', async () => {
  const {findFallbackPaymentPeriod}=await import('../src/lib/fallback-content');
  const {getPaymentSummaryDayText}=await import('../src/components/grant-summary-card');
  const {getCopy}=await import('../src/lib/copy');
  const expected=[[2026,4,2,7,8],[2026,5,5,6,7],[2026,6,2,3,4],[2026,7,2,3,6],[2026,8,4,5,6],[2026,9,2,3,4],[2026,10,2,5,6],[2026,11,3,4,5],[2026,12,2,3,4],[2027,1,5,6,7],[2027,2,2,3,4],[2027,3,2,3,4]];
  for(const [year,month,...days] of expected){
    const period=findFallbackPaymentPeriod(year,month)!;
    ['older-persons','disability','children'].forEach((grant,i)=>assert.equal(period.grants[grant].date,`${year}-${String(month).padStart(2,'0')}-${String(days[i]).padStart(2,'0')}`));
  }
  assert.equal(findFallbackPaymentPeriod(2027,5)?.grants.children.date,null);
  for(const locale of ['en','zu','xh','tn'] as const) assert.equal(getPaymentSummaryDayText(getCopy(locale),{date:null,grantSlug:'social-relief',locale,month:2,year:2026,state:'portal-only'}),getCopy(locale).paymentPortalOnly);
  const srd = {grantSlug:'social-relief', grantName:'SRD'};
  assert.ok(!/expected|confirmed|window/i.test(getPaymentGrantSeoTitle(srd,'February 2026',null)));
  assert.match(getPaymentGrantSeoDescription(srd,'February 2026',null),/vary by applicant/);
});

test('previously broken public URLs redirect directly to real pages in each public language', () => {
  const paths=['/guides/how-to-check-370-application-pages-safely','/guides/how-to-understand-r370-application-status-safely','/guides/how-to-find-official-portal-updates-without-fake-login-pages','/status/payment-processing'];
  const redirects=getSeoRedirects();
  const slugs=new Set(FALLBACK_GUIDES.map(g=>g.slug));
  for(const path of paths) {
    const root=redirects.find(r=>r.source===path)!;
    assert.equal(root.permanent,true);
    assert.ok(slugs.has(root.destination.slice('/guides/'.length)));
    assert.equal(redirects.find(r=>r.source==='/:locale(en)'+path)?.destination,root.destination);
    assert.equal(redirects.find(r=>r.source==='/:locale(zu|xh|af|nso|tn)'+path)?.destination,'/:locale'+root.destination);
  }
});
