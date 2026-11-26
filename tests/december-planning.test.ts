import assert from 'node:assert/strict';
import test from 'node:test';
import { DECEMBER_PLANNING_GUIDES } from '../src/lib/december-planning-guides';
import { FALLBACK_GUIDES } from '../src/lib/fallback-content';
import { localizeArticle } from '../src/lib/content-language';
import { hasDecemberPlanning } from '../src/components/december-planning';

test('December guides are real destinations, with English indexing only until translated', () => {
  for (const guide of DECEMBER_PLANNING_GUIDES) {
    assert.equal(FALLBACK_GUIDES.filter(g => g.slug === guide.slug).length, 1);
    assert.equal(guide.updatedAt, '2026-11-26');
    for (const locale of ['en', 'zu', 'xh', 'tn'] as const) {
      const result = localizeArticle(guide, guide.translations ?? {}, locale);
      assert.deepEqual(result.indexableLocales, ['en']);
      assert.equal(result.contentLocale, 'en');
    }
    for (const section of guide.sections) {
      for (const [, slug] of section.body.matchAll(/\/guides\/([a-z0-9-]+)/g)) {
        assert.ok(FALLBACK_GUIDES.some(g => g.slug === slug), slug);
      }
    }
  }
});

test('seasonal content does not appear on unrelated months, years or untranslated pages', () => {
  assert.equal(hasDecemberPlanning('en', 2026, 12), true);
  for (const input of [['zu',2026,12],['xh',2026,12],['tn',2026,12],['en',2026,11],['en',2027,12]] as const) {
    assert.equal(hasDecemberPlanning(input[0], input[1], input[2]), false);
  }
});
