import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { assertCorrectedPublicContent } from "./helpers.cjs";

const files = await readdir(new URL("../dist/", import.meta.url), {
  recursive: true,
});
test("The static build contains no original PDFs, evidence notes or source files", () => {
  assert.ok(files.includes("index.html"));
  assert.ok(files.includes("favicon.svg"));
  assert.doesNotMatch(
    files.join("\n"),
    /Database|local-review|artifacts|prototypes|verification|\.pdf$|content-evidence|\.map$|\.jsx$|\.md$/m,
  );
});
test("Initial HTML metadata is in Japanese and preserves the verified identity", async () => {
  const html = await readFile(
    new URL("../dist/index.html", import.meta.url),
    "utf8",
  );
  assert.match(html, /<html lang="ja">/);
  assert.match(
    html,
    /<title>鈴木 真理 \| Researcher &amp; Developer<\/title>|<title>鈴木 真理 \| Researcher & Developer<\/title>/,
  );
  assert.match(html, /og:description/);
  assert.match(html, /https:\/\/belltreetech.github.io\//);
  assert.match(html, /mailto:shinri.suzuki@keio.jp/);
  assert.doesNotMatch(html, /Hybrid Architect|vite.svg/);
});
test("Every built asset reference resolves inside dist", async () => {
  const html = await readFile(
    new URL("../dist/index.html", import.meta.url),
    "utf8",
  );
  for (const match of html.matchAll(
    /(?:src|href)="(\/assets\/[^"?#]+|\/favicon.svg)"/g,
  ))
    assert.ok(files.includes(match[1].slice(1)), match[1]);
});

test("All distributed text excludes withdrawn projects, unconfirmed claims and private evidence", async () => {
  const textFiles = files.filter((file) =>
    /\.(?:html|js|css|json|svg|map)$/i.test(file),
  );
  assert.ok(textFiles.some((file) => file.endsWith(".js")));
  for (const file of textFiles) {
    const text = await readFile(
      new URL(`../dist/${file}`, import.meta.url),
      "utf8",
    );
    assertCorrectedPublicContent(text, `dist/${file}`);
    assert.doesNotMatch(
      text,
      /SFC_任意提出資料|Database\/|content-evidence|local-review/,
      `dist/${file}: private evidence stays outside the distribution`,
    );
  }
});
