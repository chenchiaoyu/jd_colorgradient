# 悅心靈・互動式提示詞工具與部署完整指南 (Master Guide)

本文件整合了 **GitHub 專案部署與錯誤排除指南** 以及 **互動式 AI 提示詞工具專案規劃藍本**，供您未來開發與發布類似工具時作為完整參考與 AI 生成提示詞使用。

---

# 第一部分：GitHub Pages 自動化發布與排錯指南

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

---

# 第二部分：互動式 AI 提示詞工具專案規劃藍本 (Master Prompt Blueprint)

當您未來想要再次請 AI 打造類似「悅心靈·品牌影像生成提示詞」或任何專業領域的互動式提示詞生成工具時，可以直接將以下這份**「標準化專案生成藍本」**修改並提供給 AI。

## 📋 藍本範本 (可複製並填入您的需求)

```text
請幫我打造一個專業的網頁端互動式提示詞生成工具（React + Vite + Tailwind CSS），專門用於【請在此填入工具領域，例如：品牌文案、短影音腳本、Midjourney 攝影、UI/UX 介面設計】。

### 一、 核心功能架構需求
1. 品牌與主題視覺識別：
   - 頂部包含精緻的品牌 Logo 標誌與工具標題。
   - 採用指定的品牌主色系（例如 HEX: #FF7A7B）作為所有選取態、按鈕、互動標籤 (Chips)、滑桿與焦點框的主視覺色。
2. 參數與維度設定面板：
   - 區分為多個直覺的區塊（例如：風格流派、核心主體、構圖視角、燈光氛圍、進階專屬參數）。
   - 提供「單選切換」與「多選組合」的互動元件。
   - 包含數值滑桿（Sliders）供調整細緻參數（如比重、留白比例、強度等）。
   - 支援自由輸入的文字框（Textarea）與一鍵清除按鈕。
3. 即時即用提示詞預覽與複製區：
   - 即時組合所有已選參數與自定義輸入，動態生成最終的結構化提示詞（支援英文/中文切換或多模組組合）。
   - 提供流暢的「一鍵複製 Prompt」按鈕，並伴隨視覺回饋（Toast 提示）。
4. 輔助說明與引導功能：
   - 提供「網頁使用說明 Modal」或「專業流派解析 Modal」，幫助使用者快速理解各專業名詞的意涵。
   - 手機版響應式設計：提供「切換預覽」與「返回調整」的浮動按鈕，確保行動裝置操作體驗流暢。

### 二、 視覺設計與介面規範
- 風格：典雅、高質感、乾淨留白、現代微奢感。
- 色彩：基底採用柔和舒適的中性色（如 #FDF9F6 或類似石紋色），核心互動與品牌識別統一採用精準的品牌主色。
- 元件：圓角設計（rounded-2xl）、細緻的陰影層次（shadow-sm / shadow-xs）、懸停過渡動畫（transition-all）。

### 三、 部署與環境要求
- 支援 GitHub Pages 自動化發布（vite.config.ts 需包含 base: './'）。
- 程式碼需妥善模組化，避免單一檔案過大。
```

## 📐 規劃設計指南（開發此類工具的心法）

1. **定義「輸入與輸出」的對應邏輯**：將使用者勾選的標籤（Tags）自動串接成結構化語法。
2. **狀態管理 (State Management)**：集中管理在 React `state` 中，透過單一更新函式確保即時反應。
3. **響應式排版 (Responsive Layout)**：電腦版雙欄、手機版分頁切換。
4. **細節互動 (Micro-interactions)**：增加選取邊框發光、勾選圖標、Toast 提示與彈窗引導。
