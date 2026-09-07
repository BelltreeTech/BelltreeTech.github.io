import test from "node:test";
import assert from "node:assert/strict";
import * as content from "../src/data/portfolioData.js";
import { assertCorrectedPublicContent } from "./helpers.cjs";

test("Owner corrections retain one real project and only confirmed affiliations", () => {
  assert.deepEqual(content.projects.map((item) => item.id), ["polaris"]);
  assert.equal(content.projects[0].name, "Polaris");
  assert.deepEqual(content.profile.roles, [
    {
      organization: "一般社団法人ウェルネステックラボ",
      role: "代表理事 / CTO",
    },
  ]);
  assert.deepEqual(
    content.activities.map((item) => item.id).sort(),
    ["keio", "vr-academy", "wellness-tech"],
  );
  assert.deepEqual(
    content.profile.socials.map((item) => item.label).sort(),
    ["GitHub", "Qiita", "X"],
  );
  assertCorrectedPublicContent(JSON.stringify(content), "all public exports");
});

test("No.5: three distinct internships keep their certified periods and duties", () => {
  assert.equal(content.internships.length, 3);
  const expected = {
    mocmo: ["2024-01", "2024-01", "プロトタイプ開発"],
    "vr-design": ["2024-11", "2025-03", "プログラミング講師"],
    "vr-imaginators": ["2024-09", "2025-06", "広報"],
  };
  for (const [id, [start, end, duty]] of Object.entries(expected)) {
    const records = content.internships.filter((item) => item.id === id);
    assert.equal(records.length, 1, id);
    assert.equal(records[0].startDate, start);
    assert.equal(records[0].endDate, end);
    assert.ok(records[0].responsibilities.includes(duty));
    assert.ok(records[0].learnings.length > 0);
  }
});

test("No.7: all eight records remain distinct and accurately classified", () => {
  assert.equal(content.achievements.length, 9);
  const expected = {
    "symposium-10": ["award", "ポスター部門・医療／医学分野 最優秀賞"],
    "gakugei-68": ["award", "高校生の部・スタートアップ部門 銀賞"],
    "science-grant-2024": ["research-support", "研究支援プログラム修了"],
    "science-castle-2024": ["award", "東武不動産賞・奨励賞"],
    "global-link-2025": [
      "participation",
      "Applied Science / Medical Science 分野で出場",
    ],
    "inquiry-2025": ["selection", "困りごと部門 セミファイナリスト"],
    "my-project-2024": ["award", "地域Summit特別賞"],
    "makers-10": ["adoption", "第10期生として採択"],
  };
  for (const [id, [category, result]] of Object.entries(expected)) {
    const records = content.achievements.filter((item) => item.id === id);
    assert.equal(records.length, 1, id);
    assert.equal(records[0].category, category);
    assert.equal(records[0].result, result);
  }
});

test("Ambiguous dates do not acquire unsupported day or month precision", () => {
  const dates = Object.fromEntries(
    content.achievements.map((item) => [item.id, item.date]),
  );
  assert.equal(dates["global-link-2025"], "2025-07");
  assert.equal(dates["inquiry-2025"], "2025");
  assert.equal(dates["makers-10"], "2025");
  const vrExperience = content.activities.find((item) => item.id === "vr-academy");
  assert.equal(vrExperience.date, null);
  assert.equal(vrExperience.dateLabel, null);
  assert.match(vrExperience.description, /リーダー/);
});

test("Later achievements, qualifications and media remain correctly separated", () => {
  assert.equal(
    content.achievements.find((item) => item.id === "science-castle-world-2025")
      .result,
    "アステラス製薬賞・優秀賞",
  );
  assert.equal(content.achievements.some((item) => item.category === "completion"), false);
  assert.equal(content.qualifications[0].id, "it-passport");
  assert.equal(content.qualifications[0].category, "qualification");
  assert.deepEqual(
    Object.fromEntries(content.media.map((item) => [item.id, item.date])),
    { steenz: "2026-08", dempa: "2025-09", larva06: "2025-07" },
  );
  assert.ok(
    content.media.every(
      (item) => item.category === "media" && item.links.length > 0,
    ),
  );
});

test("Public content contains no private source paths, unsupported metrics, or placeholder links", () => {
  const serialized = JSON.stringify(content);
  assert.doesNotMatch(
    serialized,
    /Database|\.pdf|98\.5%|96\.2%|1\.2M|12ms|Coming soon|calendly\.com|Model Accuracy|Rule Coverage/,
  );
  assert.ok(content.skills.every((item) => !("level" in item)));
  assert.ok(content.projects.every((item) => !("metrics" in item)));
  const records = [
    ...content.projects,
    ...content.achievements,
    ...content.qualifications,
    ...content.media,
  ];
  assert.equal(new Set(records.map((item) => item.id)).size, records.length);
  for (const item of records)
    for (const link of item.links) {
      assert.equal(new URL(link.url).protocol, "https:");
      assert.ok(link.label.trim().length > 0);
    }
  assert.equal(content.contact.email, "shinri.suzuki@keio.jp");
});
