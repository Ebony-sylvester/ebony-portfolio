// Records a short tour of EbonyOS as an animated GIF (docs/demo.gif).
// Run `npm start` first, then `npm run demo`. Uses your installed Chrome.
import gifenc from 'gifenc';
import { writeFileSync } from 'node:fs';
import { PNG } from 'pngjs';
import puppeteer from 'puppeteer-core';

const { GIFEncoder, applyPalette, quantize } = gifenc; // CommonJS package
const URL = process.env.DEMO_URL ?? 'http://localhost:4300/';
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const W = 1200;
const H = 750;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, defaultViewport: { width: W, height: H } });
const page = await browser.newPage();
// Skip the boot screen; the tour starts on the desktop.
await page.evaluateOnNewDocument(() => sessionStorage.setItem('ebonyos-booted', '1'));

const gif = GIFEncoder();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function frame(holdMs) {
  const png = PNG.sync.read(await page.screenshot({ type: 'png' }));
  const palette = quantize(png.data, 256);
  gif.writeFrame(applyPalette(png.data, palette), W, H, { palette, delay: holdMs });
}

async function openIcon(label) {
  await page.evaluate((text) => {
    const icon = [...document.querySelectorAll('app-desktop-icons .icon')].find((el) => el.textContent.trim() === text);
    icon?.click();
  }, label);
  await wait(900);
}

async function scrollWindow(selector, fraction) {
  await page.evaluate(
    (sel, f) => {
      const el = document.querySelector(sel);
      if (el) el.scrollTop = el.scrollHeight * f;
    },
    selector,
    fraction,
  );
  await wait(400);
}

await page.goto(URL, { waitUntil: 'networkidle0' });
await wait(2500);
await frame(2600); // the desktop and About window

await openIcon('Case study');
await frame(2200);
await scrollWindow('app-case-study .pane', 0.42);
await frame(2000);
await scrollWindow('app-case-study .pane', 1);
await frame(2400);

await openIcon('Projects');
await frame(2200);

await openIcon('Terminal');
await page.keyboard.type('whoami', { delay: 60 });
await page.keyboard.press('Enter');
await wait(400);
await frame(2400);

await openIcon('Resume');
await wait(600);
await frame(2600);

await browser.close();
gif.finish();
writeFileSync('docs/demo.gif', gif.bytes());
console.log('Wrote docs/demo.gif');
