# 悅心靈專案集與 GitHub Pages 部署指南 (Deployment & Troubleshooting Guide)

本文件整理了未來在開發 React + Vite 網頁專案、整合品牌視覺與部署至 **GitHub Pages** 時的標準設定、常見錯誤與解決方案，供日後快速參考。

---

## 一、 GitHub Pages 自動化發布設定 (Workflow)

為了讓每次更新程式碼推送到 GitHub 時，都能自動編譯並部署至 GitHub Pages，需要確保以下三項核心設定完整：

### 1. Vite 設定檔 (`vite.config.ts`)
* **必要設定**：必須加入 `base: './'`。
* **原因**：GitHub Pages 預設會將專案部署在子路徑（如 `https://username.github.io/repo-name/`），若未使用相對路徑，編譯後的 CSS/JS 資源路徑會指向絕對根目錄 (`/assets/...`) 導致 404 錯誤。

```ts
export default defineConfig({
  base: './',
  plugins: [react()],
  // ...
});
```

### 2. GitHub Actions 工作流程設定 (`.github/workflows/main.yml`)
* **標準設定**：使用 Node.js 22 及 `peaceiris/actions-gh-pages` 套件將 `./dist` 資料夾自動發布至 `gh-pages` 分支。

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Project
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 3. 版本鎖定檔 (`package-lock.json`)
* **重要性**：GitHub Actions 運行 `npm ci` 安裝依賴時，強制依賴 `package-lock.json`。因此必須將 `package-lock.json` 納入 Git 版本控管，切勿在 `.gitignore` 中略過。

---

## 二、 常見錯誤與解決方案 (Troubleshooting)

### Q1: GitHub Actions 執行時報錯 `npm ci can only install packages when your package.json and package-lock.json are in sync`
* **原因**：專案缺少 `package-lock.json` 或兩者版本不同步。
* **解決方案**：
  1. 在本地端終端機執行 `npm install` 以產生完整的 `package-lock.json`。
  2. 執行 `git add package-lock.json` 並推送到 GitHub。

### Q2: 部署後網頁呈現空白或控制台出現 404 (CSS/JS 資源載入失敗)
* **原因**：`vite.config.ts` 未設定 `base: './'`，導致瀏覽器嘗試載入 `/assets/index.js` 而非 `./assets/index.js`。
* **解決方案**：確認 `vite.config.ts` 中包含 `base: './'`，重新建置並推送。

### Q3: 本地執行 `npm run build` 或 `tsc --noEmit` 發生型別錯誤
* **原因**：TypeScript 嚴格型別檢查未通過（例如型別定義不符、漏掉屬性或未使用的引用品）。
* **解決方案**：
  1. 檢查終端機報錯的檔案與行號。
  2. 確保所有 props 與 State 都有明確定義介面 (`interface` 或 `type`)。
  3. 修正後再次執行 `npm run build` 確認編譯完全通過。

---

## 三、 品牌色彩與前端設計實踐

* **精準色彩對齊**：若品牌指定特定的 HEX 碼（例如 `#FF7A7B`），建議：
  - SVG 圖標可直接在 `<svg>` 標籤或內部 `<path>` 設定 `fill="#FF7A7B"`。
  - React 元件或按鈕可直接使用內聯樣式 `style={{ color: '#FF7A7B', backgroundColor: '#FF7A7B' }}` 確保 100% 精準吻合。
* **無障礙與字體**：保持標題與內文的對比度，並適當使用圓角 (`rounded-2xl`) 與輕柔陰影 (`shadow-sm` / `shadow-[...]`) 提升精緻感。
