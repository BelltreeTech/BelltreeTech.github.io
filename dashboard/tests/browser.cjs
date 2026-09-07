/* Standalone browser regression suite. See companion helpers.cjs for dependency loading.
 * Environment: BASE_URL, QA_OUTPUT_DIR, QA_BROWSERS, PLAYWRIGHT_MODULE_PATH,
 * CHROMIUM_EXECUTABLE_PATH (optional existing browser), AXE_MODULE_PATH (optional).
 */
const {
  assert,
  fs,
  path,
  launchBrowser,
  collectBrowserErrors,
  inspectLayout,
  assertLayout,
  runAxe,
  assertCorrectedPublicContent,
} = require("./helpers.cjs");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:4174/";
const outputDir =
  process.env.QA_OUTPUT_DIR || path.resolve("artifacts/browser-qa");
const browserNames = (process.env.QA_BROWSERS || "chromium,webkit").split(",");
const widths = process.env.QA_WIDTHS
  ? process.env.QA_WIDTHS.split(",").map(Number)
  : [
      320, 360, 390, 430, 639, 640, 641, 768, 959, 960, 961, 1024, 1199, 1200,
      1201, 1280, 1440, 1799, 1800, 1801, 1920,
    ];
const sections = [
  "profile",
  "research",
  "internships",
  "achievements",
  "approach",
  "contact",
];
const navNames = [
  "プロフィール",
  "研究・制作",
  "インターン",
  "大会・受賞等",
  "考え方・技術",
  "連絡先",
];
const contentPatterns = [
  /鈴木\s*真理/,
  /慶應義塾大学/,
  /総合政策学部/,
  /Emotion-Aware AI/,
  /Polaris/,
  /モシーモ/,
  /VRデザイン研究所/,
  /VR IMAGINATORS/,
  /高校生国際シンポジウム/,
  /全国学芸サイエンスコンクール/,
  /ベネッセこども基金/,
  /サイエンスキャッスル2024/,
  /Global Link Singapore 2025/,
  /中高生探究コンテスト2025/,
  /My Project Award 2024/i,
  /Makers University U-18/i,
  /東武不動産賞/,
  /奨励賞/,
  /ITパスポート/,
  /shinri\.suzuki@keio\.jp/,
];
async function screenshot(page, options) {
  await page.mouse.move(page.viewportSize().width - 1, 1);
  await page.screenshot(options);
}
async function gotoSection(page, id, width) {
  const menu = page.getByRole("button", { name: "メニュー", exact: true });
  if (width < 960 && (await menu.getAttribute("aria-expanded")) !== "true")
    await menu.click();
  const link = page.locator(`#primary-navigation a[href="#${id}"]`);
  await link.click();
  await page.waitForFunction(
    (expected) => location.hash === `#${expected}`,
    id,
  );
  await page.waitForFunction(
    (id) => {
      const target = document.getElementById(id);
      return (
        target === document.activeElement ||
        target?.contains(document.activeElement)
      );
    },
    id,
    { timeout: 3000 },
  );
  if (width < 960)
    assert.equal(
      await menu.getAttribute("aria-expanded"),
      "false",
      `menu closes after ${id}`,
    );
  assert.equal(
    await page.locator(`#${id}`).count(),
    1,
    `${id} anchor exists uniquely`,
  );
  assert.equal(
    await page
      .locator(`#${id}`)
      .evaluate(
        (element) =>
          element === document.activeElement ||
          element.contains(document.activeElement),
      ),
    true,
    `${id} navigation moves keyboard focus into destination`,
  );
  const bounds = await page.locator(`#${id}`).boundingBox();
  assert.ok(
    bounds && bounds.y >= -2 && bounds.y < page.viewportSize().height - 40,
    `${id} anchor visible below sticky UI, y=${bounds?.y}`,
  );
}
async function openEveryDetail(page) {
  const summaries = page.locator("main details > summary");
  const count = await summaries.count();
  assert.equal(
    count,
    13,
    "one Polaris, three internships and nine activity records provide 13 details",
  );
  for (let index = 0; index < count; index++) {
    const summary = summaries.nth(index);
    if (!(await summary.evaluate((element) => element.parentElement.open)))
      await summary.click();
    assert.ok(
      await summary.evaluate((element) => element.parentElement.open),
      `detail ${index} opened`,
    );
  }
  return count;
}
async function bodyText(page) {
  return (await page.locator("main").innerText()).replace(/\s+/g, " ").trim();
}
async function checkCorrectionStructure(page) {
  assert.equal(await page.locator("#research article").count(), 1, "only one project card remains");
  assert.equal(await page.locator("#research #polaris").count(), 1, "Polaris remains reachable");
  assert.equal(await page.locator("#internships article").count(), 3, "all three internships remain");
  assert.equal(await page.locator("#achievements details").count(), 9, "nine confirmed achievement records remain");
  assert.equal(await page.locator("main details").count(), 13, "corrected detail count");
  assert.equal(await page.locator(".roles-block li").count(), 1, "only the confirmed current role is displayed");
  assert.equal(await page.locator("#contact .social-links a").count(), 3, "three confirmed SNS links remain");
  assert.equal(await page.locator(".activity-row").count(), 3, "only three confirmed activity entries remain");
  const vrExperience = page.locator(".activity-row").filter({
    has: page.getByRole("heading", { name: "VRプロフェッショナルアカデミー", exact: true }),
  });
  assert.equal(await vrExperience.count(), 1, "confirmed VR experience is retained");
  assert.equal(await vrExperience.locator("time").count(), 0, "VR experience has no invented year");
  assertCorrectedPublicContent(await page.locator("main").textContent(), "rendered and collapsed public content");
  assert.equal(
    await page.locator('a[href*="linkedin.com"]').count(),
    0,
    "unverified LinkedIn is not retained as a hidden or visible link",
  );
}
async function checkContent(page) {
  await checkCorrectionStructure(page);
  const text = await bodyText(page);
  for (const pattern of contentPatterns)
    assert.match(text, pattern, `required shared content ${pattern}`);
  assert.equal(
    (await page.locator('a[href="mailto:shinri.suzuki@keio.jp"]').count()) > 0,
    true,
    "email link is valid",
  );
  for (const href of [
    "https://github.com/BelltreeTech",
    "https://x.com/BelltreeTech82",
    "https://qiita.com/BelltreeTech",
  ]) {
    const links = page.locator(`a[href="${href}"]`);
    assert.ok((await links.count()) > 0, `existing personal SNS ${href}`);
    for (const link of await links.all())
      assert.ok(
        (await link.getAttribute("aria-label")) ||
          (await link.innerText()).trim(),
        `SNS link accessible name ${href}`,
      );
  }
  const evidenceExpectations = [
    ["science-castle-world-2025", "award", /アステラス製薬賞・優秀賞/],
    ["symposium-10", "award", /ポスター部門・医療／医学分野 最優秀賞/],
    ["gakugei-68", "award", /高校生の部・スタートアップ部門 銀賞/],
    ["science-grant-2024", "research-support", /研究支援プログラム修了/],
    ["science-castle-2024", "award", /東武不動産賞・奨励賞/],
    ["global-link-2025", "participation", /2025年7月/],
    ["inquiry-2025", "selection", /困りごと部門 セミファイナリスト/],
    ["my-project-2024", "award", /地域Summit特別賞/],
    ["makers-10", "adoption", /第10期生として採択/],
  ];
  for (const [id, category, result] of evidenceExpectations) {
    const entry = page.locator(`#${id}`);
    assert.equal(await entry.count(), 1, `single event record ${id}`);
    assert.equal(
      await entry.getAttribute("data-category"),
      category,
      `correct evidence category ${id}`,
    );
    assert.match(
      await entry.innerText(),
      result,
      `source-supported result/date ${id}`,
    );
  }
  for (const [id, period] of [
    ["mocmo", "2024年1月"],
    ["vr-design", "2024年11月〜2025年3月"],
    ["vr-imaginators", "2024年9月〜2025年6月"],
  ]) {
    const article = page.locator(`#${id}`).locator("xpath=ancestor::article");
    assert.ok(
      (await article.innerText()).includes(period),
      `verified internship period ${id}`,
    );
  }
  assert.doesNotMatch(
    await page.locator("#global-link-2025").innerText(),
    /2025年7月(?:20|26|27)日/,
    "conflicting Global Link day is not invented",
  );
  assert.doesNotMatch(
    text,
    /98\.5%|96\.2%|12ms|1\.2M|Rule Coverage|Model Accuracy/,
    "unverified performance claims not amplified",
  );
  return text;
}
async function activateContactLinksWithoutSending(page) {
  const urls = [
    "mailto:shinri.suzuki@keio.jp",
    "https://github.com/BelltreeTech",
    "https://x.com/BelltreeTech82",
    "https://qiita.com/BelltreeTech",
  ];
  await page.evaluate(() => {
    window.__portfolioLinkClicks = [];
    window.__portfolioClickInterceptor = (event) => {
      const anchor = event.target.closest("a[href]");
      if (anchor && /^(mailto:|https?:)/.test(anchor.href)) {
        event.preventDefault();
        window.__portfolioLinkClicks.push(anchor.href);
      }
    };
    document.addEventListener(
      "click",
      window.__portfolioClickInterceptor,
      true,
    );
  });
  const pagesBefore = page.context().pages().length;
  try {
    for (const url of urls)
      await page.locator(`#contact a[href="${url}"]`).click();
    assert.deepEqual(
      await page.evaluate(() => window.__portfolioLinkClicks),
      urls,
      "email and SNS click dispatches preserve verified destinations",
    );
    assert.equal(
      page.context().pages().length,
      pagesBefore,
      "intercepted link activation opens no external window",
    );
  } finally {
    await page.evaluate(() => {
      document.removeEventListener(
        "click",
        window.__portfolioClickInterceptor,
        true,
      );
      delete window.__portfolioClickInterceptor;
      delete window.__portfolioLinkClicks;
    });
  }
  return {
    mode: "actual clicks intercepted with preventDefault",
    destinations: urls,
    externalApplicationsLaunched: false,
    messagesSent: false,
  };
}
async function verifyFilter(page) {
  const select = page.getByRole("combobox", {
    name: "表示する実績の区分",
    exact: true,
  });
  assert.equal(await select.count(), 1, "one accessible category filter");
  const options = await select
    .locator("option")
    .evaluateAll((elements) =>
      elements.map((element) => ({
        value: element.value,
        text: element.textContent,
      })),
    );
  const expectedCounts = {
    all: 9,
    award: 5,
    participation: 1,
    "research-support": 1,
    selection: 1,
    adoption: 1,
  };
  assert.deepEqual(
    options.map((option) => option.value).sort(),
    Object.keys(expectedCounts).sort(),
    "only populated achievement categories are offered; no withdrawn completion category",
  );
  const results = [];
  for (const option of options) {
    await select.selectOption(option.value);
    assert.equal(await select.inputValue(), option.value);
    const categorized = page.locator("#achievements [data-category]:visible");
    const categories = await categorized.evaluateAll((elements) =>
      elements.map((element) => element.dataset.category),
    );
    assert.equal(categories.length, expectedCounts[option.value], `filter ${option.value} has the confirmed record count`);
    if (option.value !== "all")
      assert.ok(
        categories.every((category) => category === option.value),
        `filter ${option.value}: ${categories.join(",")}`,
      );
    results.push({ ...option, categories });
  }
  await select.selectOption(
    options.find((option) => option.value === "all")?.value || options[0].value,
  );
  return { present: true, results };
}

async function verifyWithdrawnHashes(page, width) {
  const withdrawnIds = ["elsi", "affective-sdk", "sfc-camp-2023", "matsuo-programs", "meiji-research"];
  for (const id of withdrawnIds) {
    await page.goto(`${baseURL}#${id}`, { waitUntil: "networkidle" });
    await page.locator("#contact").waitFor({ state: "attached" });
    assert.equal(await page.locator(`[id="${id}"]`).count(), 0, `${id}: removed record is not recreated`);
    await checkCorrectionStructure(page);
    await page.reload({ waitUntil: "networkidle" });
    await checkCorrectionStructure(page);
    await gotoSection(page, "research", width);
    await page.goBack();
    await checkCorrectionStructure(page);
    await page.goForward();
    await checkCorrectionStructure(page);
  }
  return { ids: withdrawnIds, directAccess: true, reload: true, history: true };
}
(async () => {
  await fs.mkdir(outputDir, { recursive: true });
  const report = {
    baseURL,
    date: new Date().toISOString(),
    widths,
    sections,
    browsers: [],
    limitations: [
      "Headless browser emulation on macOS; no physical device test.",
      "200% text check changes root font size to32px; this is not a physical browser UI zoom test.",
      "Automated axe findings are supplemented by manual screenshot review; they do not establish full accessibility compliance.",
    ],
  };
  for (const name of browserNames) {
    const browser = await launchBrowser(name);
    const record = {
      name,
      version: browser.version(),
      widths: [],
      interactions: [],
      accessibility: [],
      errors: [],
    };
    try {
      let desktopText;
      for (const width of widths) {
        const context = await browser.newContext({
          viewport: { width, height: width < 640 ? 844 : 1000 },
          deviceScaleFactor: 1,
          hasTouch: width < 960,
          reducedMotion: "reduce",
        });
        const page = await context.newPage();
        const errors = collectBrowserErrors(page);
        await page.goto(baseURL, { waitUntil: "networkidle" });
        await page.locator("#contact").waitFor({ state: "attached" });
        await checkCorrectionStructure(page);
        const assets = await page
          .locator('script[src],link[rel="stylesheet"]')
          .evaluateAll((elements) =>
            elements
              .map(
                (element) =>
                  element.getAttribute("src") || element.getAttribute("href"),
              )
              .sort(),
          );
        if (!record.assets) record.assets = assets;
        else
          assert.deepEqual(
            assets,
            record.assets,
            "same build served throughout browser checks",
          );
        assert.equal(await page.locator("main").count(), 1);
        assert.equal(await page.locator("#primary-navigation").count(), 1);
        const labels = await page
          .locator("#primary-navigation a")
          .allTextContents();
        navNames.forEach((expected) =>
          assert.ok(
            labels.some((label) => label.includes(expected)),
            `nav ${expected}`,
          ),
        );
        for (const id of sections) {
          await gotoSection(page, id, width);
          if ([390, 1440].includes(width))
            await screenshot(page, {
              path: path.join(outputDir, `${name}-${width}-${id}.png`),
            });
        }
        if ([390, 1440].includes(width))
          await gotoSection(page, "contact", width); // same hash still restores focus
        const layout = await inspectLayout(page);
        assertLayout(layout, `${name}/${width}`);
        const summary = {
          width,
          scrollWidth: layout.scrollWidth,
          headingCount: layout.headings.length,
          smallTargets: layout.targets.filter(
            (target) => target.width < 43.9 || target.height < 43.9,
          ),
        };
        const smallPrimaryTargets = await page
          .locator("button, summary, select, #primary-navigation a, .social-links a, .contact-email")
          .evaluateAll((elements) =>
            elements
              .filter(
                (element) =>
                  element.getClientRects().length &&
                  getComputedStyle(element).visibility !== "hidden",
              )
              .flatMap((element) => {
                const rect = element.getBoundingClientRect();
                return rect.width < 43.9 || rect.height < 43.9
                  ? [
                      {
                        text: element.textContent.trim(),
                        width: rect.width,
                        height: rect.height,
                      },
                    ]
                  : [];
              }),
          );
        assert.deepEqual(
          smallPrimaryTargets,
          [],
          `${name}/${width}: primary targets below44px ${JSON.stringify(smallPrimaryTargets)}`,
        );
        assert.equal(
          await page.evaluate(
            () => matchMedia("(prefers-reduced-motion: reduce)").matches,
          ),
          true,
          "reduced motion preference active",
        );
        const activeAnimations = await page.evaluate(
          () =>
            document
              .getAnimations()
              .filter((animation) => animation.playState === "running").length,
        );
        assert.equal(
          activeAnimations,
          0,
          "reduced motion leaves no active animations",
        );
        if ([320, 390, 768, 1440].includes(width)) {
          await page.goto(baseURL, { waitUntil: "networkidle" });
          const axe = await runAxe(page);
          record.accessibility.push({ width, ...axe });
          assert.deepEqual(
            axe.violations,
            [],
            `${name}/${width}: axe violations ${JSON.stringify(axe.violations)}`,
          );
        }
        if ([320, 390, 430, 768, 1024, 1440, 1920].includes(width)) {
          await page.goto(baseURL, { waitUntil: "networkidle" });
          await screenshot(page, {
            path: path.join(outputDir, `${name}-${width}-home.png`),
          });
          await screenshot(page, {
            path: path.join(outputDir, `${name}-${width}-full.png`),
            fullPage: true,
          });
        }
        if ([390, 1440].includes(width)) {
          summary.detailCount = await openEveryDetail(page);
          const text = await checkContent(page);
          summary.contactClicks =
            await activateContactLinksWithoutSending(page);
          const openAxe = await runAxe(page);
          record.accessibility.push({
            width,
            state: "details-open",
            ...openAxe,
          });
          assert.deepEqual(
            openAxe.violations,
            [],
            `${name}/${width}/details-open: axe violations ${JSON.stringify(openAxe.violations)}`,
          );
          // Compare independently captured full text across both display modes.
          if (!desktopText) desktopText = text;
          else
            assert.equal(
              text,
              desktopText,
              `${name}: mobile and desktop content parity`,
            );
          summary.filter = await verifyFilter(page);
          await gotoSection(page, "internships", width);
          await screenshot(page, {
            path: path.join(outputDir, `${name}-${width}-internships.png`),
          });
          await gotoSection(page, "achievements", width);
          await screenshot(page, {
            path: path.join(outputDir, `${name}-${width}-achievements.png`),
          });
          await gotoSection(page, "research", width);
          await gotoSection(page, "internships", width);
          await page.goBack();
          assert.equal(
            new URL(page.url()).hash,
            "#research",
            "browser back preserves anchor",
          );
          await page.goForward();
          assert.equal(
            new URL(page.url()).hash,
            "#internships",
            "browser forward preserves anchor",
          );
          await page.reload({ waitUntil: "networkidle" });
          assert.equal(new URL(page.url()).hash, "#internships", "hash reload");
          for (const id of sections) {
            await page.goto(`${baseURL}#${id}`, { waitUntil: "networkidle" });
            assert.equal(
              new URL(page.url()).hash,
              `#${id}`,
              "direct hash access",
            );
          }
          await page.goto(`${baseURL}#it-passport`, {
            waitUntil: "networkidle",
          });
          const qualification = page.locator("#it-passport");
          await page.waitForFunction(() =>
            document
              .querySelector("#it-passport")
              .contains(document.activeElement),
          );
          assert.equal(
            await qualification.isVisible(),
            true,
            "direct qualification hash visible",
          );
          const qualificationBox = await qualification.boundingBox();
          assert.ok(
            qualificationBox.y >= -1 &&
              qualificationBox.y < page.viewportSize().height - 40,
            "qualification direct link clears sticky UI",
          );
          await page.goto(`${baseURL}#global-link-2025`, {
            waitUntil: "networkidle",
          });
          const linkedRecord = page.locator("#global-link-2025");
          assert.equal(
            await linkedRecord.evaluate((element) => element.open),
            true,
            "direct record hash opens detail",
          );
          assert.equal(
            await linkedRecord.isVisible(),
            true,
            "direct record visible",
          );
          await page.reload({ waitUntil: "networkidle" });
          assert.equal(
            await linkedRecord.evaluate((element) => element.open),
            true,
            "record hash reload opens detail",
          );
          await page
            .getByRole("combobox", { name: "表示する実績の区分", exact: true })
            .selectOption("award");
          assert.equal(
            await linkedRecord.isVisible(),
            false,
            "award filter excludes participation record",
          );
          await gotoSection(page, "research", width);
          await page.goBack();
          await page.waitForTimeout(80);
          assert.equal(
            new URL(page.url()).hash,
            "#global-link-2025",
            "Back returns to linked record",
          );
          assert.equal(
            await linkedRecord.isVisible(),
            true,
            "history navigation restores filtered-out record",
          );
          assert.equal(
            await linkedRecord.evaluate((element) => element.open),
            true,
            "history navigation opens linked detail",
          );
          summary.withdrawnHashes = await verifyWithdrawnHashes(page, width);
          await page
            .getByRole("combobox", { name: "表示する実績の区分", exact: true })
            .selectOption("all");
          // Text enlargement check after opening long content.
          await openEveryDetail(page);
          await page.addStyleTag({
            content: "html {font-size:32px !important;}",
          });
          const zoomLayout = await inspectLayout(page);
          assertLayout(zoomLayout, `${name}/${width}/200pct-text`);
          await screenshot(page, {
            path: path.join(outputDir, `${name}-${width}-text200.png`),
            fullPage: true,
          });
          summary.text200 = {
            scrollWidth: zoomLayout.scrollWidth,
            headerWidths: zoomLayout.headerWidths,
          };
        }
        if ([320, 768, 960, 1024].includes(width)) {
          await openEveryDetail(page);
          await page.addStyleTag({
            content: "html {font-size:32px !important;}",
          });
          await page.waitForTimeout(80);
          const zoomLayout = await inspectLayout(page);
          assertLayout(zoomLayout, `${name}/${width}/200pct-text`);
          await screenshot(page, {
            path: path.join(outputDir, `${name}-${width}-text200.png`),
            fullPage: true,
          });
          summary.text200 = {
            scrollWidth: zoomLayout.scrollWidth,
            headerWidths: zoomLayout.headerWidths,
          };
        }
        assert.deepEqual(errors, [], `${name}/${width}: browser errors`);
        record.widths.push(summary);
        await context.close();
      }
      // Keyboard, mobile menu focus, active detail and hash persistence through layout changes.
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = collectBrowserErrors(page);
      await page.goto(baseURL, { waitUntil: "networkidle" });
      const tabKey = name === "webkit" ? "Alt+Tab" : "Tab";
      await page.keyboard.press(tabKey);
      assert.match(
        await page.evaluate(() => document.activeElement.textContent),
        /本文|コンテンツ/,
        "first keyboard focus is skip link",
      );
      assert.ok(
        await page.evaluate(() => {
          const style = getComputedStyle(document.activeElement);
          return (
            (style.outlineStyle !== "none" &&
              parseFloat(style.outlineWidth) > 0) ||
            style.boxShadow !== "none"
          );
        }),
        "keyboard focus has visible outline or shadow",
      );
      await page.keyboard.press("Enter");
      assert.ok(
        await page
          .locator("main")
          .evaluate(
            (element) =>
              element === document.activeElement ||
              element.contains(document.activeElement),
          ),
        "skip link moves focus to main content",
      );
      const menu = page.getByRole("button", { name: "メニュー", exact: true });
      await menu.click();
      assert.equal(await menu.getAttribute("aria-expanded"), "true");
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
      assert.equal(
        await menu.evaluate((element) => document.activeElement === element),
        true,
        "Escape returns focus to menu",
      );
      await gotoSection(page, "achievements", 390);
      const firstSummary = page
        .locator("#achievements details > summary")
        .first();
      await firstSummary.focus();
      await page.keyboard.press("Enter");
      assert.equal(
        await firstSummary.evaluate((element) => element.parentElement.open),
        true,
        "keyboard opens detail",
      );
      for (const viewport of [
        { width: 844, height: 390 },
        { width: 959, height: 900 },
        { width: 960, height: 900 },
        { width: 1440, height: 1000 },
        { width: 390, height: 844 },
      ]) {
        await page.setViewportSize(viewport);
        await page.waitForTimeout(60);
        assert.equal(
          new URL(page.url()).hash,
          "#achievements",
          "resize retains section hash",
        );
        assert.equal(
          await firstSummary.evaluate((element) => element.parentElement.open),
          true,
          "resize retains open detail",
        );
        assertLayout(
          await inspectLayout(page),
          `${name}/resize${viewport.width}x${viewport.height}`,
        );
      }
      await page.keyboard.press("Enter");
      assert.equal(
        await firstSummary.evaluate((element) => element.parentElement.open),
        false,
        "keyboard closes detail",
      );
      // Menu opened on mobile must not leave hidden nav focus or stale state after crossing breakpoint.
      await menu.click();
      await page.setViewportSize({ width: 1024, height: 900 });
      await page.setViewportSize({ width: 390, height: 844 });
      const menuState = await menu.getAttribute("aria-expanded");
      if (menuState === "true") await page.keyboard.press("Escape");
      assert.equal(
        await menu.getAttribute("aria-expanded"),
        "false",
        "Escape closes menu after desktop/mobile resize",
      );
      assert.ok(
        await page.evaluate(
          () =>
            document.activeElement === document.body ||
            !!document.activeElement.getClientRects().length,
        ),
        "no hidden control keeps focus after resize",
      );
      assertLayout(await inspectLayout(page), `${name}/menu-resize`);
      record.interactions.push({
        keyboard: true,
        tabKey,
        skipLink: true,
        menuEscapeFocus: true,
        detailsKeyboard: true,
        resizePreservesDetailsAndHash: true,
        landscape: true,
      });
      assert.deepEqual(errors, [], `${name}/interactions: browser errors`);
      await context.close();
      report.browsers.push(record);
      await fs.writeFile(
        path.join(outputDir, "report.json"),
        JSON.stringify(report, null, 2),
      );
      console.log(
        `${name}: ${record.widths.length} widths with section navigation; ${record.widths.filter((item) => item.detailCount).length} content/history/text-enlargement checks; ${record.accessibility.length} axe scans; keyboard/menu/resize checks passed`,
      );
    } catch (error) {
      record.failure = { message: error.message, stack: error.stack };
      report.browsers.push(record);
      await fs.writeFile(
        path.join(outputDir, "report.json"),
        JSON.stringify(report, null, 2),
      );
      throw error;
    } finally {
      await browser.close();
    }
  }
  console.log(`Report and screenshots: ${outputDir}`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
