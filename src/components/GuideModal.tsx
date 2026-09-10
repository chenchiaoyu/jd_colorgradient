import React from 'react';
import { X, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuideModal({ isOpen, onClose }: GuideModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#FDFBF7] border border-stone-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 text-stone-800"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF7A7B]/15 text-[#FF7A7B] flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                品牌漸層生成工具・使用說明書
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                基於悅心靈品牌色彩系統，輕鬆打造柔和優雅的網頁與設計漸層
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors -mt-1 -mr-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core Principles */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: '#FF7A7B' }} />
            漸層設計核心原則
          </h3>
          <div className="grid sm:grid-cols-3 gap-3.5 text-xs sm:text-[13px] text-stone-600 leading-relaxed">
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
              <span className="font-bold text-stone-800 block mb-1">❶ 色彩和諧</span>
              嚴選悅心靈品牌主色與輔助色，確保色調過渡自然且具備心靈安定感。
            </div>
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
              <span className="font-bold text-stone-800 block mb-1">❷ 角度方向</span>
              自訂線性或放射狀角度，營造出豐富的光影流動與視覺層次。
            </div>
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
              <span className="font-bold text-stone-800 block mb-1">❸ 一鍵複製</span>
              即時預覽漸層效果，一鍵複製標準 CSS 語法或 Tailwind 類別。
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-rose-500" />
            三步驟輕鬆生成漸層
          </h3>

          <div className="space-y-3">
            <div className="flex gap-3.5 p-3.5 bg-white border border-stone-200/80 rounded-2xl">
              <div className="w-7 h-7 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0">1</div>
              <div>
                <h4 className="text-sm font-bold text-stone-800 mb-0.5">選擇第一層色彩</h4>
                <p className="text-xs text-stone-500 leading-relaxed">挑選品牌主色（破曉之光）或輔助色系，並選擇對應明暗深淺層次。</p>
              </div>
            </div>

            <div className="flex gap-3.5 p-3.5 bg-white border border-stone-200/80 rounded-2xl">
              <div className="w-7 h-7 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0">2</div>
              <div>
                <h4 className="text-sm font-bold text-stone-800 mb-0.5">選擇第二層色彩</h4>
                <p className="text-xs text-stone-500 leading-relaxed">挑選搭配的第二色系與深淺層次，與第一層交織出優雅過渡。</p>
              </div>
            </div>

            <div className="flex gap-3.5 p-3.5 bg-white border border-stone-200/80 rounded-2xl">
              <div className="w-7 h-7 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0">3</div>
              <div>
                <h4 className="text-sm font-bold text-stone-800 mb-0.5">調整角度並複製 CSS</h4>
                <p className="text-xs text-stone-500 leading-relaxed">微調漸層角度或類型，即時預覽並一鍵複製 CSS 樣式碼應用於專案中。</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            開始使用
          </button>
        </div>
      </div>
    </div>
  );
}
