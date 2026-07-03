import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const SHOTS = resolve('screenshots');
mkdirSync(SHOTS, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

console.log('--- Step 1: Load page ---');
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(800);
await page.screenshot({ path: `${SHOTS}/01-initial-load.png` });

const hasPreloaderText = await page.evaluate(() => document.body.innerText.includes('BUTO'));
console.log('BUTO text on preloader:', hasPreloaderText);

console.log('--- Step 2: Wait for images to load (max 12s) ---');
await page.waitForTimeout(12000);
await page.screenshot({ path: `${SHOTS}/02-after-preload.png` });

console.log('--- Step 3: Check phase (password or error) ---');
const hasInput = await page.locator('input[type="text"]').count() > 0;
console.log('Password input visible:', hasInput);
await page.screenshot({ path: `${SHOTS}/03-password-screen.png` });

if (hasInput) {
  console.log('--- Step 4: Enter password ---');
  await page.locator('input[type="text"]').fill('buto2024');
  await page.screenshot({ path: `${SHOTS}/04-filled.png` });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${SHOTS}/05-unlocked.png` });

  console.log('--- Step 5: Check canvas ---');
  const canvasCount = await page.locator('canvas').count();
  console.log('Canvas elements:', canvasCount);

  console.log('--- Step 6: Scroll through animation ---');
  for (let i = 0; i < 8; i++) {
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(200);
  }
  await page.screenshot({ path: `${SHOTS}/06-mid-scroll.png` });

  for (let i = 0; i < 12; i++) {
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${SHOTS}/07-near-end.png` });

  console.log('--- Step 7: Scroll to Hero ---');
  await page.mouse.wheel(0, 3000);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${SHOTS}/08-hero-section.png` });

  const heroTagline = await page.evaluate(() => {
    const els = [...document.querySelectorAll('p, span, h1, h2')];
    const el = els.find(e => e.textContent?.includes('Mimarlığın'));
    return el ? el.textContent?.trim() : null;
  });
  console.log('Hero tagline found:', heroTagline);

  console.log('--- Step 8: Scroll to content sections ---');
  await page.mouse.wheel(0, 2000);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${SHOTS}/09-about-section.png` });

  await page.mouse.wheel(0, 2000);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${SHOTS}/10-services-section.png` });
} else {
  console.log('WARNING: Password input not found. Check preloader phase logic.');
  const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 300));
  console.log('Body text:', bodyText);
}

await browser.close();
console.log('Done. Screenshots saved to:', SHOTS);
