/* Supplemental portrait, decorative motion and fallback checks. */
const { assert, fs, path, launchBrowser, collectBrowserErrors } = require('./helpers.cjs');
const base = process.env.BASE_URL || 'http://127.0.0.1:4311/';
const output = process.env.QA_OUTPUT_DIR || 'artifacts/blue-rose-2026-09-11/motion';
(async () => {
  const report = [];
  for (const name of (process.env.QA_BROWSERS || 'chromium,webkit').split(',')) {
    const browser = await launchBrowser(name);
    try {
      for (const width of [390, 1440]) {
        const page = await browser.newPage({viewport:{width,height: width === 390 ? 844 : 1000}});
        const errors = collectBrowserErrors(page);
        // Count actual drawing calls, independently of the component's state marker.
        await page.addInitScript(() => {
          window.drawTimes = [];
          window.activeObservers = 0;
          for (const key of ['ResizeObserver','IntersectionObserver']) {
            const Original = window[key];
            window[key] = class extends Original {
              constructor(...args) { super(...args); window.activeObservers++; this.active = true; }
              disconnect() { if(this.active) window.activeObservers--; this.active=false; super.disconnect(); }
            };
          }
          const clear = CanvasRenderingContext2D.prototype.clearRect;
          CanvasRenderingContext2D.prototype.clearRect = function(...args) {
            window.drawTimes.push(performance.now()); return clear.apply(this,args);
          };
        });
        await page.goto(base, {waitUntil:'networkidle'});
        await page.waitForFunction(() => document.querySelector('canvas').dataset.motion === 'running');
        const count = () => page.evaluate(() => window.drawTimes.length);
        const start = await count(); await page.waitForTimeout(1100);
        const frames = await count() - start;
        assert.ok(frames > 0 && frames <= 34, `${name}: throttled animation ${frames}`);
        await page.getByRole('button',{name:'粒子の動きを停止',exact:true}).click();
        await page.waitForTimeout(100); const stopped = await count(); await page.waitForTimeout(180);
        assert.equal(await count(),stopped,'pause halts drawing');
        await page.getByRole('button',{name:'粒子の動きを再開',exact:true}).click();
        await page.waitForTimeout(150); assert.ok(await count()>stopped,'resume draws');
        const observerCount = await page.evaluate(() => window.activeObservers);
        for(let i=0;i<4;i++) {
          await page.getByRole('button',{name:'粒子の動きを停止',exact:true}).click();
          await page.getByRole('button',{name:'粒子の動きを再開',exact:true}).click();
        }
        assert.equal(await page.evaluate(() => window.activeObservers),observerCount,'effect replacement disconnects old observers');
        const afterCycles=await count(); await page.waitForTimeout(1100);
        assert.ok(await count()-afterCycles<=34,'effect replacement has only one animation loop');
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForFunction(() => document.querySelector('canvas').dataset.motion === 'static');
        const outside = await count(); await page.waitForTimeout(180); assert.equal(await count(),outside,'offscreen stops');
        await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
        await page.waitForFunction(() => document.querySelector('canvas').dataset.motion === 'running');
        // Simulated visibility event checks the lifecycle handler; not a real device/tab test.
        await page.evaluate(() => { Object.defineProperty(document,'hidden',{configurable:true,get:()=>true}); document.dispatchEvent(new Event('visibilitychange')); });
        const hidden = await count(); await page.waitForTimeout(180); assert.equal(await count(),hidden,'hidden document stops');
        await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
        await page.waitForFunction(() => document.querySelector('canvas').dataset.motion === 'running');
        await page.emulateMedia({reducedMotion:'reduce'});
        await page.waitForFunction(() => document.querySelector('canvas').dataset.motion === 'static');
        const reduced = await count(); await page.waitForTimeout(180); assert.equal(await count(),reduced,'reduced motion static');
        assert.equal(await page.locator('.motion-toggle').isVisible(),false);
        const portrait = await page.locator('.portrait').evaluate(e => ({loaded:e.complete && e.naturalWidth>0,width:e.width,alt:e.alt}));
        assert.ok(portrait.loaded); assert.ok(portrait.width <= (width===390?88:144));
        assert.match(portrait.alt,/鈴木真理/);
        assert.equal(await page.locator('.blue-rose').getAttribute('alt'),'');
        assert.match(await page.locator('.future-note').innerText(),/Future = Variable/);
        assert.match(await page.locator('.starting-line').innerText(),/大切にしている言葉.*後悔するよりはスタートラインを描こう/s);
        const cta = await page.locator('.focus-link').boundingBox();
        assert.ok(cta.y+cta.height<= (width===390?844:1000),'research link above fold');
        assert.deepEqual(errors,[]);
        report.push({name,width,framesPer1100ms:frames,pause:true,resume:true,effectCleanup:true,offscreen:true,simulatedVisibility:true,reducedMotion:true,portrait,aboveFold:true});
        await page.close();
      }
      for(const failure of ['null','throw']) {
        const page = await browser.newPage();
        await page.addInitScript(mode => { HTMLCanvasElement.prototype.getContext = () => { if(mode==='throw') throw new Error('unavailable'); return null; }; }, failure);
        await page.goto(base,{waitUntil:'networkidle'});
        assert.equal(await page.locator('.blue-rose').evaluate(e=>e.complete&&e.naturalWidth>0),true);
        assert.match(await page.locator('#focus-reading').innerText(),/入院中の中高生/);
        await page.locator('.focus-link').click(); assert.equal(new URL(page.url()).hash,'#research');
        report.push({name,canvasFailure:failure,staticImageAndNavigation:true}); await page.close();
      }
    } finally { await browser.close(); }
  }
  await fs.mkdir(output,{recursive:true}); await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2));
  console.log(`Rose checks passed: ${report.length} scenarios; ${output}`);
})().catch(e=>{console.error(e);process.exitCode=1;});
