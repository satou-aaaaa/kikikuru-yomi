// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、キキクルの4つの色（黄・赤・紫・黒）のます。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <rect x="14" y="14" width="34" height="34" rx="5" fill="#f2e700"/><rect x="52" y="14" width="34" height="34" rx="5" fill="#ff2800"/><rect x="14" y="52" width="34" height="34" rx="5" fill="#aa00aa"/><rect x="52" y="52" width="34" height="34" rx="5" fill="#0c000c" stroke="#fffdf7" stroke-width="3"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
