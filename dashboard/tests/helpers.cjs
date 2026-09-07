const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { createRequire } = require("node:module");
const requireFromRuntime = process.env.PLAYWRIGHT_MODULE_PATH
  ? createRequire(path.join(process.env.PLAYWRIGHT_MODULE_PATH, "package.json"))
  : require;
let playwright;

// These are the owner's explicit corrections, not a list derived from the app.
// ELSI and Affective Computing remain legitimate general research interests.
const rejectedPublicClaims = [
  [/ELSI\s+Compliance\s+Engine|Affective\s+Computing\s+SDK/i, "fabricated project names"],
  [/affective-sdk|["']elsi["']/, "deleted project identifiers"],
  [/AIの開発と、法律・倫理をつなぐ|表情の動きと、感情理解の接点を探る/, "fabricated project taglines"],
  [/法的要件の整理やルール表現、開発プロセスへの組み込み|透明性のある表情分析を目指す|表情の動きをどう表現・分析するかを検討/, "fabricated project descriptions"],
  [/法的要件をルールエンジン化|コンプライアンスチェッカーを構築|FACS\s+Action\s+Unit検出をスクラッチ実装|オープンソースSDKを提供/, "retracted implementation claims"],
  [/98\.5\s*%|96\.2\s*%|94\s*%|12\s*ms|1\.2\s*M|45\s*MB|120\+|30\+|<\s*3\s*s|Model Accuracy|Rule Coverage|AU Detection|Check Speed/i, "unsupported performance metrics"],
  [/株式会社REQS|株式会社肌マッチ|matsuo-programs|meiji-research|松尾[・･]岩澤|スマートメカトロニクス|GLOBAL CONSUMER INTELLIGENCE|Deep Learning Basic 2026/, "unconfirmed roles and activities"],
  [/sfc-camp-2023|未来構想キャンプ|linkedin\.com|LinkedIn/, "withdrawn camp or unverified profile"],
];

function assertCorrectedPublicContent(text, label) {
  // A minifier may escape Unicode in JavaScript or JSON without changing what
  // gets published; inspect that representation as well as literal strings.
  const decoded = text.replace(/\\u([\da-f]{4})/gi, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16)),
  );
  for (const [pattern, reason] of rejectedPublicClaims)
    assert.doesNotMatch(decoded, pattern, `${label}: ${reason}`);
}

async function launchBrowser(name) {
  if (!playwright) {
    try {
      playwright = require("playwright");
    } catch {
      playwright = requireFromRuntime("playwright");
    }
  }
  const options = { headless: true };
  if (name === "chromium" && process.env.CHROMIUM_EXECUTABLE_PATH)
    options.executablePath = process.env.CHROMIUM_EXECUTABLE_PATH;
  return playwright[name].launch(options);
}
function collectBrowserErrors(page) {
  const errors = [];
  page.on("pageerror", (error) =>
    errors.push({ type: "pageerror", message: error.message }),
  );
  page.on("console", (entry) => {
    if (entry.type() === "error")
      errors.push({ type: "console", message: entry.text() });
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push({
        type: "response",
        status: response.status(),
        url: response.url(),
      });
  });
  return errors;
}
async function inspectLayout(page) {
  return page.evaluate(() => {
    const visible = (element) =>
      !!(
        element.getClientRects().length &&
        getComputedStyle(element).visibility !== "hidden"
      );
    const describe = (element) => ({
      tag: element.tagName,
      id: element.id,
      classes: element.className,
      text: (element.textContent || "").trim().slice(0, 120),
    });
    const overflow = [...document.body.querySelectorAll("*")]
      .filter(visible)
      .flatMap((element) => {
        const box = element.getBoundingClientRect();
        // Fixed off-screen skip links and decorative SVG children do not contribute to document overflow.
        if (
          element.closest("svg") ||
          element.matches(".skip-link") ||
          getComputedStyle(element).position === "fixed"
        )
          return [];
        return box.width > 0 && (box.left < -1 || box.right > innerWidth + 1)
          ? [
              {
                ...describe(element),
                left: box.left,
                right: box.right,
                width: box.width,
              },
            ]
          : [];
      });
    const idCounts = new Map();
    for (const element of document.querySelectorAll("[id]"))
      idCounts.set(element.id, (idCounts.get(element.id) || 0) + 1);
    const duplicateIds = [...idCounts].filter(([, count]) => count > 1);
    const targets = [
      ...document.querySelectorAll(
        "button, a[href], summary, input, select, textarea",
      ),
    ]
      .filter(visible)
      .map((element) => {
        const box = element.getBoundingClientRect();
        return {
          ...describe(element),
          width: box.width,
          height: box.height,
          name:
            element.getAttribute("aria-label") || element.textContent.trim(),
        };
      });
    return {
      viewport: { width: innerWidth, height: innerHeight },
      scrollWidth: document.documentElement.scrollWidth,
      rootOverflowX: getComputedStyle(document.documentElement).overflowX,
      bodyOverflowX: getComputedStyle(document.body).overflowX,
      headerWidths: document.querySelector(".site-header")
        ? {
            scrollWidth: document.querySelector(".site-header").scrollWidth,
            clientWidth: document.querySelector(".site-header").clientWidth,
          }
        : null,
      duplicateIds,
      overflow,
      targets,
      headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
        .filter(visible)
        .map((element) => ({
          level: Number(element.tagName[1]),
          text: element.textContent.trim(),
        })),
      mainCount: document.querySelectorAll("main").length,
      lang: document.documentElement.lang,
      brokenInternalLinks: [...document.querySelectorAll('a[href^="#"]')]
        .map((element) => ({
          href: element.getAttribute("href"),
          text: element.textContent.trim(),
        }))
        .filter(({ href }) => href === "#"),
      sourcePdfLinks: [...document.querySelectorAll("a[href]")]
        .map((element) => element.getAttribute("href"))
        .filter((href) => /Database|\.pdf(?:$|[?#])/i.test(href)),
    };
  });
}
function assertLayout(layout, label) {
  assert.ok(
    layout.scrollWidth <= layout.viewport.width + 1,
    `${label}: document overflow ${layout.scrollWidth}/${layout.viewport.width}; ${JSON.stringify(layout.overflow.slice(0, 8))}`,
  );
  assert.notEqual(
    layout.rootOverflowX,
    "hidden",
    `${label}: root overflow hidden masks layout failures`,
  );
  assert.notEqual(
    layout.bodyOverflowX,
    "hidden",
    `${label}: body overflow hidden masks layout failures`,
  );
  if (layout.headerWidths)
    assert.ok(
      layout.headerWidths.scrollWidth <= layout.headerWidths.clientWidth + 1,
      `${label}: horizontal overflow inside header/sidebar ${JSON.stringify(layout.headerWidths)}`,
    );
  assert.deepEqual(layout.duplicateIds, [], `${label}: duplicate ids`);
  assert.deepEqual(
    layout.brokenInternalLinks,
    [],
    `${label}: placeholder hash links`,
  );
  assert.deepEqual(
    layout.sourcePdfLinks,
    [],
    `${label}: source PDF link exposed`,
  );
  assert.equal(layout.mainCount, 1, `${label}: exactly one main`);
  assert.equal(layout.lang, "ja", `${label}: HTML lang Japanese`);
  assert.ok(
    layout.headings.some((heading) => heading.level === 1),
    `${label}: visible h1`,
  );
}
async function runAxe(page) {
  const axePath = process.env.AXE_MODULE_PATH
    ? path.join(process.env.AXE_MODULE_PATH, "axe.min.js")
    : require.resolve("axe-core/axe.min.js");
  await page.addScriptTag({ path: axePath });
  return page.evaluate(async () => {
    const result = await window.axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
      },
    });
    return {
      passes: result.passes.length,
      incomplete: result.incomplete.map(({ id, nodes }) => ({
        id,
        count: nodes.length,
      })),
      violations: result.violations.map(
        ({ id, impact, description, nodes }) => ({
          id,
          impact,
          description,
          nodes: nodes.map(({ target, failureSummary }) => ({
            target,
            failureSummary,
          })),
        }),
      ),
    };
  });
}
module.exports = {
  assert,
  fs,
  path,
  launchBrowser,
  collectBrowserErrors,
  inspectLayout,
  assertLayout,
  runAxe,
  assertCorrectedPublicContent,
};
