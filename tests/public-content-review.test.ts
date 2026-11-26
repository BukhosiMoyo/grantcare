import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaqList } from '../src/components/faq-list';
import { listFaqs, getPaymentPeriod } from '../src/lib/content';
import { FALLBACK_GUIDES, FALLBACK_FAQS, FALLBACK_PAYMENT_PERIODS } from '../src/lib/fallback-content';
import { completeGuideFaqs, getPaymentFaqs, getTopicFaqs, withMinimumFaqs } from '../src/lib/public-faqs';
import { getPaymentDateSources, getReviewedPaymentSchedule, reconcilePaymentEntry } from '../src/lib/payment-schedule';

test('every public language has at least five complete FAQs even with a short CMS list', async () => {
  for (const locale of ['en','zu','xh','tn'] as const) {
    const faqs = await listFaqs(locale);
    assert.ok(faqs.length >= 5, locale);
    assert.ok(faqs.every(faq=>faq.question.trim() && faq.answer.trim()));
    assert.equal(new Set(faqs.map(faq=>faq.question)).size, faqs.length);
    for (const topic of ['status','eligibility'] as const) assert.ok(getTopicFaqs(locale, topic, faqs).length >= 5);
    assert.ok(getPaymentFaqs(locale,{},faqs).length >= 5);
  }
  assert.equal(withMinimumFaqs([FALLBACK_FAQS[0],FALLBACK_FAQS[0]],FALLBACK_FAQS).length,5);
});

test('FAQ answers are present in server HTML without accordion interaction', () => {
  const html=renderToStaticMarkup(createElement(FaqList,{items:FALLBACK_FAQS.slice(0,5)}));
  assert.equal((html.match(/data-faq-item/g)??[]).length,5);
  assert.ok(!/<details|<summary|hidden=/.test(html));
  for(const item of FALLBACK_FAQS.slice(0,5)) assert.ok(html.includes(item.answer));
});

test('guide FAQ completion preserves authored answers and guarantees five distinct questions', () => {
  for (const guide of FALLBACK_GUIDES) {
    const authored=guide.sections.filter(section=>section.title.startsWith('FAQ: '));
    const complete=completeGuideFaqs(authored,FALLBACK_FAQS);
    assert.ok(complete.length>=5,guide.slug);
    assert.deepEqual(complete.slice(0,authored.length),authored);
  }
});

test('November revision retains its cycle while using October 30 for older persons', async () => {
  assert.deepEqual(getReviewedPaymentSchedule(2026,11),{olderPersons:'2026-10-30',disability:'2026-11-02',children:'2026-11-03'});
  assert.ok(getPaymentDateSources(2026,11)[0].href.includes('revises-november'));
  for (const locale of ['en','zu','xh','tn'] as const) {
    const period=await getPaymentPeriod(locale,2026,'november');
    assert.equal(period?.month,11);
    assert.equal(period?.grants['older-persons'].date,'2026-10-30');
    assert.ok(period?.grants['older-persons'].note.includes('2026'));
  }
});

test('stale CMS dates cannot override reviewed dates or create universal SRD paydays', () => {
  const stale={id:'cms-record',grantSlug:'older-persons',grantName:'Older Persons',officialHref:'https://www.sassa.gov.za/',state:'expected' as const,date:'2026-11-03',note:'Old calendar',published:true};
  assert.equal(reconcilePaymentEntry(stale,2026,11,'en').date,'2026-10-30');
  assert.equal(reconcilePaymentEntry(stale,2026,11,'en').id,'cms-record');
  const unknown=reconcilePaymentEntry(stale,2027,4,'en');
  assert.equal(unknown.date,null); assert.equal(unknown.state,'pending');
  const srd=reconcilePaymentEntry({...stale,grantSlug:'social-relief'},2026,12,'en');
  assert.equal(srd.date,null); assert.equal(srd.state,'portal-only');
});

test('all calendar periods have valid sourced dates or honest pending/individual states', () => {
  let dates=0;
  for (const period of FALLBACK_PAYMENT_PERIODS) for(const entry of period.entries) {
    if(entry.grantSlug==='social-relief') {assert.equal(entry.date,null);assert.equal(entry.state,'portal-only');continue;}
    if(entry.date) {dates++;assert.ok(getPaymentDateSources(period.year,period.month).length);assert.equal(new Date(entry.date+'T00:00:00Z').toISOString().slice(0,10),entry.date);}
    else assert.equal(entry.state,'pending');
  }
  assert.equal(dates,72);
  for (let month=4;month<=12;month++) assert.equal(getReviewedPaymentSchedule(2027,month),null);
});
