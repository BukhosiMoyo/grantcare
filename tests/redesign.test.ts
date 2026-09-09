import assert from "node:assert/strict";
import test from "node:test";
import { FALLBACK_GUIDES } from "../src/lib/fallback-content";
import { filterIndexableGuides } from "../src/lib/guide-seo";
import { filterBrowsableGuides, GUIDE_TOPICS } from "../src/lib/guide-browse";

test("clearing guide filters restores every indexable guide in its original order", () => {
  const guides = filterIndexableGuides(FALLBACK_GUIDES);
  const before = guides.map((guide) => guide.slug);
  filterBrowsableGuides(guides, "appeal", "status");
  assert.deepEqual(
    filterBrowsableGuides(guides, "", "all").map((guide) => guide.slug),
    before,
  );
  assert.deepEqual(
    guides.map((guide) => guide.slug),
    before,
  );
});

test("the topic filters account for every guide exactly once", () => {
  const guides = filterIndexableGuides(FALLBACK_GUIDES);
  const categorized = GUIDE_TOPICS.filter((topic) => topic !== "all").flatMap(
    (topic) => filterBrowsableGuides(guides, "", topic),
  );
  assert.equal(categorized.length, guides.length);
  assert.equal(
    new Set(categorized.map((guide) => guide.slug)).size,
    guides.length,
  );
});

test("search handles punctuation and accents, combines topic with search, and returns honest empty results", () => {
  const guides = [
    {
      slug: "banking-details",
      title: "Banking details",
      summary: "Update your café address",
    },
    {
      slug: "pending-status",
      title: "Your pending status",
      summary: "Bank verification",
    },
  ];
  assert.deepEqual(
    filterBrowsableGuides(guides, "  BANKING—DETAILS cafe ", "banking"),
    [guides[0]],
  );
  assert.deepEqual(filterBrowsableGuides(guides, "bank", "status"), [
    guides[1],
  ]);
  assert.deepEqual(filterBrowsableGuides(guides, "nonexistent", "all"), []);
});
