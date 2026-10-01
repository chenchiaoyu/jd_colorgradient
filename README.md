# 悅心靈・品牌漸層色搭配參考 (Brand Gradient Studio)

本工具為「悅心靈」品牌專屬打造的輕量級漸層生成與色彩搭配管理平台。基於品牌視覺識別規範（VI Manual），提供符合品牌心靈安定感與透亮質感的漸層配置、即時文案與字體排版預覽，並支援色碼與 CSS 樣式一鍵複製。

---

## 🌐 線上 Demo 體驗

* **[點擊此處立即體驗線上網頁工具](https://chenchiaoyu.github.io/jd_colorgradient/)**

---

## 🎨 品牌色彩規範架構

本系統內建七大品牌核心色系，嚴格遵循品牌手冊設定：

### 1. 品牌主色 (Rose 破曉之光)
代表品牌理念與形象核心，提供完整四階層次，精準對應漸層手冊的「淡／標準／強」三組強度：
* **Rose 50** (`#FFEAE7`)：極淺底色 Tint，作為透亮溫潤的基底
* **Rose 100** (`#FFE1DE`)：柔光階 Soft，搭配 Rose 50 構成**「淡」**主色漸層
* **Rose 200** (`#FFCDCB`)：淺玫瑰階 Soft 200，搭配 Rose 50 構成**「標準」**主色漸層
* **Rose 300** (`#FFB5B3`)：中柔玫瑰階 Soft 300，搭配 Rose 50 構成**「強」**主色漸層

### 2. 六組品牌輔助色系
各輔助色系均提供 Tint（極淺基底）與 Soft（柔光點綴）兩階：
* **紫羅蘭 (Violet)**：`#C78AC8` ｜ Tint `#F7EEF7`、Soft `#EAD7EA`（寧靜、靈性之美）
* **天空 (Sky)**：`#88A0C7` ｜ Tint `#EDF1F7`、Soft `#D7DEEA`（遼闊、清晰日光）
* **湖水 (Lake)**：`#82B6C6` ｜ Tint `#EDF4F6`、Soft `#D5E4EA`（澄澈、靜止水面）
* **青苔 (Moss)**：`#78B4AA` ｜ Tint `#ECF6F5`、Soft `#D4EAE6`（沉靜、幽靜草本）
* **草木 (Verdant)**：`#C0CEA8` ｜ Tint `#EFF6ED`、Soft `#D9EAD6`（生機、清新嫩葉）
* **大地 (Earth)**：`#DCB163` ｜ Tint `#FCF7F0`、Soft `#F1E0C2`（沉著、溫暖砂岩）

---

## ✨ 核心功能特色

### 1. 雙層次色彩搭配系統
* **第一層（極淺基底）**：選取各色系的極淺明度（Rose 50 或各色 Tint），保持背景清透自然。
* **第二層（點綴色彩）**：可選配主色 Rose 的四階色度（做出淡、標準、強漸層），或六大輔助色的 Soft / Tint 層次。
* **快捷 Hex 複製**：第一層與第二層標題右側皆標示當前 Hex 色碼，點擊即可一鍵複製。

### 2. 多元漸層模式
* **線性漸層 (Linear)**：支援 0° 至 360° 連續角度滑桿調整（步進 15°），直覺營造光線照射方向。
* **放射漸層 (Radial)**：標準圓形光暈擴散，由中心平滑過渡至四周。
* **圓錐漸層 (Conic)**：以中心為軸心的 360° 旋轉光影過渡。

### 3. 即時排版與文字色彩檢驗
* **預設情境文字**：「悅心靈・用光指引生命的方向」，支援自訂任何文字即時檢視排版對比度。
* **雙字體切換**：整合 **思源宋體 (Noto Serif TC)** 與 **思源黑體 (Noto Sans TC)**。
* **六段字級縮放**：提供「小 (sm)」、「標準 (base)」、「中 (lg)」、「大 (xl)」、「特大 (2xl)」、「巨大 (3xl)」快速切換。
* **結構化文字色彩基準**：
  * **第一排・灰階基準**：Gray 900 (`#2A2430`)、Gray 700 (`#544A52`)，維持最高閱讀舒適性。
  * **第二排・品牌主色**：Rose 700、Rose 800、Rose 900，展現高雅品牌調性。
  * **輔助色 Deep 系列**：紫羅蘭、天空、湖水、青苔、草木、大地對應的高對比深色選項。

### 4. 便捷複製與品牌聯動
* **一鍵複製 CSS**：懸停於預覽區塊右上角點選「複製 CSS」，即可取得標準 `background` 語法。
* **一鍵隨機搭配**：點擊右上角「隨機搭配」快速激發色彩靈感。
* **品牌手冊引導**：內建「使用說明書」彈窗，隨時查閱設計守則。
* **品牌提示詞工具**：整合外部連結，可快速跳轉至 [悅心靈品牌提示詞工具 (jd_prompt)](https://chenchiaoyu.github.io/jd_prompt/)。

---

## 🛠 技術架構與開發

* **前端框架**：React 19 + TypeScript
* **建置工具**：Vite
* **樣式管理**：Tailwind CSS
* **圖標庫**：Lucide React
* **字體導入**：Google Fonts（Noto Serif TC、Noto Sans TC）

### 本地開發指令
```bash
# 安裝依賴
npm install

# 啟動本地開發伺服器
npm run dev

# 專案型別檢查
npm run lint

# 生產環境打包編譯
npm run build
```

### GitHub Pages 自動部署
本專案已在 `.github/workflows/main.yml` 配置 GitHub Actions 自動化 CI/CD 流程：
* 每次推送到 `main` 分支時，自動執行 `npm run build` 並由 `peaceiris/actions-gh-pages` 將打包產物 `./dist` 發佈至 GitHub Pages。
* `vite.config.ts` 設定 `base: './'` 確保在 GitHub Pages 子路徑下的靜態資源正常載入。
