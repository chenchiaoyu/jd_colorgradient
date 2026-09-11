import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Copy, Check, Sparkles, RefreshCw, Layers, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { GradientState, Palette, Shade } from './types';
import { PALETTES, STORAGE_KEY } from './data';
import { generateGradientCSS, getColorHex, cn } from './utils';
import { GuideModal } from './components/GuideModal';

const FIELD_INFOS: Record<string, string> = {
  layer1_heading: "作為漸層背景的底色，提供溫潤透亮的極淺基底，通常選用各色系的 Tint 或者是品牌專屬的 Rose 50。",
  layer1_group: "挑選第一層基底色彩所屬的色群（如品牌主色、紫羅蘭、天空、湖水、青苔、草木、大地、暖灰等）。",
  layer1_shade: "第一層固定為極淺明亮的基礎明度（Tint / Rose 50），確保背景通透自然。",
  layer2_heading: "作為漸層過渡或交疊的第二層色彩，提供豐富的層次感與視覺氛圍。",
  layer2_group: "挑選第二層點綴色彩所屬的色群。",
  layer2_shade: "可選擇 soft、tint、Gray 100，或品牌主色 Rose 50、Rose 100。請注意色彩深淺搭配原則。",
  gradient_heading: "設定漸層的光影類型與方向，支援線性漸層、放射漸層與圓錐漸層。",
  gradient_angle: "調整線性漸層的光線投射角度（0° 至 360°），決定視覺流動的方向。",
  radial_percent: "調整放射狀漸層的擴散程度（30% 集中至 180% 擴散），打造精緻的光暈中心。"
};

function getFirstLayerShades(palette: Palette): Shade[] {
  if (palette.key === 'rose') {
    return palette.shades.filter(s => s.key === 'tint');
  }
  return palette.shades.filter(s => s.key === 'tint');
}

function getSecondLayerShades(palette: Palette): Shade[] {
  if (palette.key === 'rose') {
    return palette.shades; // Rose 50 (tint) and Rose 100 (soft)
  }
  if (palette.key === 'warmgray') {
    return palette.shades; // Gray 50 (tint) and Gray 100 (soft)
  }
  return palette.shades; // tint and soft
}

const DEFAULT_STATE: GradientState = {
  projectName: "品牌漸層專用",
  previewText: "悅心靈・找到屬於你的平靜與美好",
  textColorMode: "gray900",
  color1Group: "rose",
  color1Shade: "tint",
  color2Group: "violet",
  color2Shade: "soft",
  gradientType: "linear",
  angle: 135,
  radialPercent: 75,
  textFontSize: "xl",
  textFontFamily: "serif",
};

export default function App() {
  const [state, setState] = useState<GradientState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      // Ignore
    }
    return DEFAULT_STATE;
  });

  const [toast, setToast] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [codeTab, setCodeTab] = useState<'css' | 'tailwind'>('css');
  const [ruleWarning, setRuleWarning] = useState<string | null>(null);
  const [openInfos, setOpenInfos] = useState<Record<string, boolean>>({});

  const toggleInfo = (key: string) => {
    setOpenInfos(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Ignore
    }
  }, [state]);

  const updateState = (updates: Partial<GradientState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const gradientCSS = generateGradientCSS(state);
  const c1Hex = getColorHex(state.color1Group, state.color1Shade);
  const c2Hex = getColorHex(state.color2Group, state.color2Shade);

  const handleCopy = useCallback((text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setToast(true);
        setTimeout(() => setToast(false), 1400);
      });
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setToast(true);
      setTimeout(() => setToast(false), 1400);
    }
  }, []);

  const handleRandomize = () => {
    const randomGroup1 = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    const shades1 = getFirstLayerShades(randomGroup1);
    const randomShade1 = shades1[0] || randomGroup1.shades[0];
    
    let randomGroup2 = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    if (randomGroup2.key === randomGroup1.key) {
      randomGroup2 = PALETTES[(PALETTES.indexOf(randomGroup1) + 1) % PALETTES.length];
    }
    const shades2 = getSecondLayerShades(randomGroup2);
    const randomShade2 = shades2[Math.floor(Math.random() * shades2.length)] || randomGroup2.shades[0];
    const randomAngle = [45, 90, 135, 180][Math.floor(Math.random() * 4)];
    const randomPercent = [50, 75, 100, 125][Math.floor(Math.random() * 4)];

    setState(prev => ({
      ...prev,
      color1Group: randomGroup1.key,
      color1Shade: randomShade1.key,
      color2Group: randomGroup2.key,
      color2Shade: randomShade2.key,
      angle: randomAngle,
      radialPercent: randomPercent
    }));
    setRuleWarning(null);
  };



  const palette1 = PALETTES.find(p => p.key === state.color1Group) || PALETTES[0];
  const palette2 = PALETTES.find(p => p.key === state.color2Group) || PALETTES[1];

  const shades1 = getFirstLayerShades(palette1);
  const shades2 = getSecondLayerShades(palette2);

  const handleSelectShade1 = (shadeKey: string) => {
    updateState({ color1Shade: shadeKey });
    setRuleWarning(null);
  };

  const handleSelectShade2 = (shadeKey: string) => {
    updateState({ color2Shade: shadeKey });
    setRuleWarning(null);
  };

  useEffect(() => {
    if (!shades1.some(s => s.key === state.color1Shade)) {
      if (shades1[0]) updateState({ color1Shade: shades1[0].key });
    }
  }, [state.color1Group]);

  useEffect(() => {
    if (!shades2.some(s => s.key === state.color2Shade)) {
      if (shades2[0]) updateState({ color2Shade: shades2[0].key });
    }
  }, [state.color2Group]);

  return (
    <div className="min-h-screen bg-[#FDF9F6] text-stone-800 font-sans selection:bg-rose-100 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        
        {/* Header */}
        <header className="mb-6 md:mb-10 pb-5 md:pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 flex-wrap">
            <a 
              href="https://github.com/chenchiaoyu/jd_colorgradient/blob/main/public/logo_final_Logotype01_R.svg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-90 transition-opacity"
              title="查看 LOGOTYPE 原始圖檔"
            >
              <div className="relative inline-block w-[220px] sm:w-[290px] h-14 sm:h-18 overflow-hidden flex items-center">
                <img 
                  src="https://raw.githubusercontent.com/chenchiaoyu/jd_colorgradient/386fd11282de93cb53cca877a3ff4ac11d009525/public/logo_final_Logotype01_R.svg" 
                  alt="JOYFUL DIVINE 悅心靈" 
                  className="w-full h-full object-contain object-left"
                  style={{ filter: 'brightness(0) saturate(100%) invert(64%) sepia(35%) saturate(1450%) hue-rotate(313deg) brightness(101%) contrast(102%)' }}
                />
              </div>
            </a>
            <div className="hidden sm:block h-7 w-[1px] bg-stone-300"></div>
            <span className="text-stone-600 font-medium text-sm md:text-base tracking-wide">
              品牌漸層色搭配參考
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href="https://chenchiaoyu.github.io/jd_prompt/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold bg-white text-stone-700 hover:bg-stone-50 border border-stone-200/80 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-rose-500" />
              <span>品牌提示詞工具</span>
            </a>
            <button
              type="button"
              onClick={handleRandomize}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold bg-white text-stone-700 hover:bg-stone-50 border border-stone-200/80 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-rose-500" />
              <span>隨機漸層</span>
            </button>
            <button
              type="button"
              onClick={() => setShowGuideModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold bg-[#FF7A7B]/10 text-[#FF7A7B] hover:bg-[#FF7A7B]/20 border border-[#FF7A7B]/30 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" style={{ color: '#FF7A7B' }} />
              <span>使用說明</span>
            </button>
          </div>
        </header>

        {/* Rule Warning Banner */}
        {ruleWarning && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-800 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span className="font-semibold">{ruleWarning}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT: COLOR & GRADIENT CONTROLS */}
          <div className="flex flex-col gap-6">
            
            {/* Color 1 Selection */}
            <section className="bg-white border border-stone-200/80 rounded-3xl p-5 md:p-7 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)]">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full inline-block border border-black/10" style={{ backgroundColor: c1Hex }}></span>
                  第一層：極淺基底色彩
                  <button
                    type="button"
                    onClick={() => toggleInfo('layer1_heading')}
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ml-1 cursor-pointer",
                      openInfos['layer1_heading'] ? "bg-[#FF7A7B] text-white" : "bg-stone-100 hover:bg-[#FF7A7B]/15 text-stone-500 hover:text-[#FF7A7B]"
                    )}
                    title="切換說明"
                  >
                    i
                  </button>
                </h2>
                <span className="font-mono text-[12px] text-stone-400">{c1Hex}</span>
              </div>
              {openInfos['layer1_heading'] && (
                <p className="mb-4 text-xs text-rose-800 bg-rose-50/90 border border-rose-100 p-2.5 rounded-xl leading-relaxed animate-in fade-in duration-200">
                  {FIELD_INFOS.layer1_heading}
                </p>
              )}

              {/* Palette Selection */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">色系選擇</label>
                  <button
                    type="button"
                    onClick={() => toggleInfo('layer1_group')}
                    className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer",
                      openInfos['layer1_group'] ? "bg-[#FF7A7B] text-white" : "bg-stone-100 hover:bg-[#FF7A7B]/15 text-stone-400 hover:text-[#FF7A7B]"
                    )}
                    title="切換說明"
                  >
                    i
                  </button>
                </div>
                {openInfos['layer1_group'] && (
                  <p className="mb-3 text-xs text-rose-800 bg-rose-50/90 border border-rose-100 p-2 rounded-xl leading-relaxed animate-in fade-in duration-200">
                    {FIELD_INFOS.layer1_group}
                  </p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PALETTES.map(p => {
                    const active = state.color1Group === p.key;
                    return (
                      <button
                        key={`c1-group-${p.key}`}
                        type="button"
                        onClick={() => {
                          const light = getFirstLayerShades(p);
                          const lightShade = light[0]?.key || p.shades[0].key;
                          updateState({ color1Group: p.key, color1Shade: lightShade });
                        }}
                        className={cn(
                          "px-3 py-2.5 rounded-2xl border text-left transition-all flex items-center gap-2 cursor-pointer",
                          active ? "bg-[#FF7A7B]/10 border-[#FF7A7B] text-stone-900 shadow-xs" : "bg-stone-50/70 hover:bg-white border-stone-200 text-stone-700"
                        )}
                      >
                        <span className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10" style={{ backgroundColor: p.hex }} />
                        <span className="text-[13px] font-semibold truncate">{p.key === 'rose' ? '品牌主色' : p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Shade Selection */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">層次選擇</label>
                  <button
                    type="button"
                    onClick={() => toggleInfo('layer1_shade')}
                    className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer",
                      openInfos['layer1_shade'] ? "bg-[#FF7A7B] text-white" : "bg-stone-100 hover:bg-[#FF7A7B]/15 text-stone-400 hover:text-[#FF7A7B]"
                    )}
                    title="切換說明"
                  >
                    i
                  </button>
                </div>
                {openInfos['layer1_shade'] && (
                  <p className="mb-3 text-xs text-rose-800 bg-rose-50/90 border border-rose-100 p-2 rounded-xl leading-relaxed animate-in fade-in duration-200">
                    {FIELD_INFOS.layer1_shade}
                  </p>
                )}
                <div className="grid grid-cols-1 gap-2">
                  {shades1.map(s => {
                    const active = state.color1Shade === s.key;
                    return (
                      <button
                        key={`c1-shade-${s.key}`}
                        type="button"
                        onClick={() => handleSelectShade1(s.key)}
                        className={cn(
                          "p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer",
                          active ? "bg-stone-900 border-stone-900 text-white shadow-sm" : "bg-stone-50 hover:bg-white border-stone-200 text-stone-700"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-4 h-4 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: s.hex }} />
                          <span className="text-[13px] font-bold truncate">{palette1.key === 'rose' ? 'Rose 50' : s.label}</span>
                        </div>
                        <span className="font-mono text-[11px] opacity-80">{s.hex}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Color 2 Selection */}
            <section className="bg-white border border-stone-200/80 rounded-3xl p-5 md:p-7 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)]">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full inline-block border border-black/10" style={{ backgroundColor: c2Hex }}></span>
                  第二層：柔和點綴色彩
                  <button
                    type="button"
                    onClick={() => toggleInfo('layer2_heading')}
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ml-1 cursor-pointer",
                      openInfos['layer2_heading'] ? "bg-[#FF7A7B] text-white" : "bg-stone-100 hover:bg-[#FF7A7B]/15 text-stone-500 hover:text-[#FF7A7B]"
                    )}
                    title="切換說明"
                  >
                    i
                  </button>
                </h2>
                <span className="font-mono text-[12px] text-stone-400">{c2Hex}</span>
              </div>
              {openInfos['layer2_heading'] && (
                <p className="mb-4 text-xs text-rose-800 bg-rose-50/90 border border-rose-100 p-2.5 rounded-xl leading-relaxed animate-in fade-in duration-200">
                  {FIELD_INFOS.layer2_heading}
                </p>
              )}

              {/* Palette Selection */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">色系選擇</label>
                  <button
                    type="button"
                    onClick={() => toggleInfo('layer2_group')}
                    className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer",
                      openInfos['layer2_group'] ? "bg-[#FF7A7B] text-white" : "bg-stone-100 hover:bg-[#FF7A7B]/15 text-stone-400 hover:text-[#FF7A7B]"
                    )}
                    title="切換說明"
                  >
                    i
                  </button>
                </div>
                {openInfos['layer2_group'] && (
                  <p className="mb-3 text-xs text-rose-800 bg-rose-50/90 border border-rose-100 p-2 rounded-xl leading-relaxed animate-in fade-in duration-200">
                    {FIELD_INFOS.layer2_group}
                  </p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PALETTES.map(p => {
                    const active = state.color2Group === p.key;
                    return (
                      <button
                        key={`c2-group-${p.key}`}
                        type="button"
                        onClick={() => {
                          const accents = getSecondLayerShades(p);
                          const accentShade = accents[0]?.key || p.shades[0].key;
                          updateState({ color2Group: p.key, color2Shade: accentShade });
                        }}
                        className={cn(
                          "px-3 py-2.5 rounded-2xl border text-left transition-all flex items-center gap-2 cursor-pointer",
                          active ? "bg-[#FF7A7B]/10 border-[#FF7A7B] text-stone-900 shadow-xs" : "bg-stone-50/70 hover:bg-white border-stone-200 text-stone-700"
                        )}
                      >
                        <span className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10" style={{ backgroundColor: p.hex }} />
                        <span className="text-[13px] font-semibold truncate">{p.key === 'rose' ? '品牌主色' : p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Shade Selection */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">層次選擇</label>
                  <button
                    type="button"
                    onClick={() => toggleInfo('layer2_shade')}
                    className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer",
                      openInfos['layer2_shade'] ? "bg-[#FF7A7B] text-white" : "bg-stone-100 hover:bg-[#FF7A7B]/15 text-stone-400 hover:text-[#FF7A7B]"
                    )}
                    title="切換說明"
                  >
                    i
                  </button>
                </div>
                {openInfos['layer2_shade'] && (
                  <p className="mb-3 text-xs text-rose-800 bg-rose-50/90 border border-rose-100 p-2 rounded-xl leading-relaxed animate-in fade-in duration-200">
                    {FIELD_INFOS.layer2_shade}
                  </p>
                )}
                <div className="grid grid-cols-1 gap-2">
                  {shades2.map(s => {
                    const active = state.color2Shade === s.key;
                    return (
                      <button
                        key={`c2-shade-${s.key}`}
                        type="button"
                        onClick={() => handleSelectShade2(s.key)}
                        className={cn(
                          "p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer",
                          active ? "bg-stone-900 border-stone-900 text-white shadow-sm" : "bg-stone-50 hover:bg-white border-stone-200 text-stone-700"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-4 h-4 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: s.hex }} />
                          <span className="text-[13px] font-bold truncate">{s.label}</span>
                        </div>
                        <span className="font-mono text-[11px] opacity-80">{s.hex}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Gradient Type & Angle */}
            <section className="bg-white border border-stone-200/80 rounded-3xl p-5 md:p-7 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)]">
              <h2 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                漸層樣式與角度
                <button
                  type="button"
                  onClick={() => toggleInfo('gradient_heading')}
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ml-1 cursor-pointer",
                    openInfos['gradient_heading'] ? "bg-[#FF7A7B] text-white" : "bg-stone-100 hover:bg-[#FF7A7B]/15 text-stone-500 hover:text-[#FF7A7B]"
                  )}
                  title="切換說明"
                >
                  i
                </button>
              </h2>
              {openInfos['gradient_heading'] && (
                <p className="mb-4 text-xs text-rose-800 bg-rose-50/90 border border-rose-100 p-2.5 rounded-xl leading-relaxed animate-in fade-in duration-200">
                  {FIELD_INFOS.gradient_heading}
                </p>
              )}
              
              <div className="grid grid-cols-3 gap-2.5 mb-5">
                {[
                  { key: 'linear', label: '線性漸層' },
                  { key: 'radial', label: '放射漸層' },
                  { key: 'conic', label: '圓錐漸層' }
                ].map(item => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => updateState({ gradientType: item.key as any })}
                    className={cn(
                      "py-3 px-3 rounded-2xl border text-center text-xs sm:text-[13px] font-bold transition-all cursor-pointer",
                      state.gradientType === item.key ? "bg-[#FF7A7B] text-white border-[#FF7A7B] shadow-sm" : "bg-stone-50 hover:bg-white border-stone-200 text-stone-700"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {state.gradientType === 'linear' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">漸層角度</label>
                      <button
                        type="button"
                        onClick={() => toggleInfo('gradient_angle')}
                        className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer",
                          openInfos['gradient_angle'] ? "bg-[#FF7A7B] text-white" : "bg-stone-100 hover:bg-[#FF7A7B]/15 text-stone-400 hover:text-[#FF7A7B]"
                        )}
                        title="切換說明"
                      >
                        i
                      </button>
                    </div>
                    <span className="font-mono text-sm font-bold text-stone-700">{state.angle}°</span>
                  </div>
                  {openInfos['gradient_angle'] && (
                    <p className="mb-3 text-xs text-rose-800 bg-rose-50/90 border border-rose-100 p-2 rounded-xl leading-relaxed animate-in fade-in duration-200">
                      {FIELD_INFOS.gradient_angle}
                    </p>
                  )}
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="15"
                    value={state.angle}
                    onChange={e => updateState({ angle: Number(e.target.value) })}
                    className="w-full accent-[#FF7A7B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-1">
                    <span>0°</span>
                    <span>90°</span>
                    <span>180°</span>
                    <span>270°</span>
                    <span>360°</span>
                  </div>
                </div>
              )}

              {state.gradientType === 'radial' && (
                <div className="py-2 text-stone-500 text-xs leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                  放射漸層採用標準圓形擴散（radial-gradient），由中心向外自然過渡。
                </div>
              )}
            </section>

          </div>

          {/* RIGHT: LIVE PREVIEW & CODE OUTPUT */}
          <div className="flex flex-col gap-6 sticky top-6">
            
            <section className="bg-white border border-stone-200/80 rounded-3xl p-5 md:p-7 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                  預覽：文字與漸層搭配
                </h2>
                <span className="text-xs font-mono text-stone-400">Layered Gradient</span>
              </div>

              {/* Gradient Preview Box */}
              <div 
                className="w-full h-64 sm:h-80 rounded-2xl shadow-inner border border-black/10 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group"
                style={{ background: gradientCSS }}
              >
                <div className="z-10 max-w-xs transition-transform duration-300 group-hover:scale-105">
                  <p className={cn(
                    "font-medium tracking-wider drop-shadow-xs",
                    (state.textFontFamily || 'serif') === 'serif' ? 'font-serif-tc' : 'font-sans-tc',
                    state.textFontSize === 'sm' && "text-sm",
                    state.textFontSize === 'base' && "text-base",
                    state.textFontSize === 'lg' && "text-lg",
                    (!state.textFontSize || state.textFontSize === 'xl') && "text-xl",
                    state.textFontSize === '2xl' && "text-2xl sm:text-3xl",
                    state.textFontSize === '3xl' && "text-3xl sm:text-4xl",
                    state.textColorMode === 'violet_deep' && "text-[#9439A2]",
                    state.textColorMode === 'sky_deep' && "text-[#3F5DB1]",
                    state.textColorMode === 'lake_deep' && "text-[#166C82]",
                    state.textColorMode === 'moss_deep' && "text-[#00754A]",
                    state.textColorMode === 'verdant_deep' && "text-[#407215]",
                    state.textColorMode === 'earth_deep' && "text-[#8A5A00]",
                    state.textColorMode === 'rose700' && "text-rose-700",
                    state.textColorMode === 'rose800' && "text-rose-800",
                    state.textColorMode === 'rose900' && "text-rose-900",
                    state.textColorMode === 'gray700' && "text-[#544A52]",
                    state.textColorMode === 'gray900' && "text-[#2A2430]"
                  )}>
                    {state.previewText || "請輸入預覽文字..."}
                  </p>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <button
                    type="button"
                    onClick={() => handleCopy(gradientCSS)}
                    className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white text-stone-900 font-bold text-xs shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 border border-stone-200/50"
                    title="快速複製 CSS 語法"
                  >
                    <Copy className="w-3.5 h-3.5 text-rose-500" />
                    <span>複製 CSS</span>
                  </button>
                </div>
              </div>

              {/* Text Input for Preview */}
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">預覽文字內容</label>
                    <div className="flex items-center gap-2">
                      {/* Font Family Selector */}
                      <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                        {[
                          { key: 'serif', label: '思源宋體' },
                          { key: 'sans', label: '思源黑體' }
                        ].map(f => (
                          <button
                            key={f.key}
                            type="button"
                            onClick={() => updateState({ textFontFamily: f.key as any })}
                            className={cn(
                              "px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer",
                              (state.textFontFamily || 'serif') === f.key 
                                ? "bg-white text-stone-900 shadow-2xs font-bold" 
                                : "text-stone-500 hover:text-stone-800"
                            )}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>

                      {/* Font Size Selector */}
                      <div className="flex items-center gap-1">
                        {[
                          { key: 'sm', label: '小' },
                          { key: 'base', label: '標準' },
                          { key: 'lg', label: '中' },
                          { key: 'xl', label: '大' },
                          { key: '2xl', label: '特大' },
                          { key: '3xl', label: '巨大' }
                        ].map(sz => (
                          <button
                            key={sz.key}
                            type="button"
                            onClick={() => updateState({ textFontSize: sz.key as any })}
                            className={cn(
                              "px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border",
                              (state.textFontSize || 'xl') === sz.key 
                                ? "bg-stone-900 text-white border-stone-900 shadow-2xs" 
                                : "bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200"
                            )}
                          >
                            {sz.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={state.previewText}
                    onChange={e => updateState({ previewText: e.target.value })}
                    placeholder="輸入要在漸層上顯示的文字..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#FF7A7B]/30 focus:border-[#FF7A7B] transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">文字色彩基準</label>
                  
                  {/* Category 1: 品牌主色與灰階 (Moved to top) */}
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 mb-1.5 block">品牌主色與灰階</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 sm:grid-flow-col sm:auto-cols-fr gap-2">
                      {[
                        { key: 'gray900', label: 'Gray 900', hex: '#2A2430' },
                        { key: 'gray700', label: 'Gray 700', hex: '#544A52' },
                        { key: 'rose700', label: 'Rose 700', hex: '#be123c' },
                        { key: 'rose800', label: 'Rose 800', hex: '#9f1239' },
                        { key: 'rose900', label: 'Rose 900', hex: '#881337' }
                      ].map(mode => (
                        <button
                          key={mode.key}
                          type="button"
                          onClick={() => updateState({ textColorMode: mode.key as any })}
                          className={cn(
                            "py-2 px-2.5 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer flex items-center gap-2",
                            state.textColorMode === mode.key 
                              ? "bg-stone-900 text-white border-stone-900 shadow-sm" 
                              : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200/80"
                          )}
                        >
                          <span className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10 shadow-2xs" style={{ backgroundColor: mode.hex }} />
                          <span className="truncate">{mode.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 2: 輔助色 Deep */}
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 mb-1.5 block">輔助色 Deep</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { key: 'violet_deep', label: '紫羅蘭', hex: '#9439A2' },
                        { key: 'sky_deep', label: '天空', hex: '#3F5DB1' },
                        { key: 'lake_deep', label: '湖水', hex: '#166C82' },
                        { key: 'moss_deep', label: '青苔', hex: '#00754A' },
                        { key: 'verdant_deep', label: '草木', hex: '#407215' },
                        { key: 'earth_deep', label: '大地', hex: '#8A5A00' }
                      ].map(mode => (
                        <button
                          key={mode.key}
                          type="button"
                          onClick={() => updateState({ textColorMode: mode.key as any })}
                          className={cn(
                            "py-2 px-2.5 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer flex items-center gap-2",
                            state.textColorMode === mode.key 
                              ? "bg-stone-900 text-white border-stone-900 shadow-sm" 
                              : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200/80"
                          )}
                        >
                          <span className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10 shadow-2xs" style={{ backgroundColor: mode.hex }} />
                          <span className="truncate">{mode.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Info */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full shrink-0 border border-black/10 shadow-xs" style={{ backgroundColor: c1Hex }} />
                  <div className="min-w-0">
                    <span className="text-[11px] text-stone-400 block truncate">Base ({palette1.key === 'rose' ? 'Rose 50' : palette1.name})</span>
                    <span className="font-mono text-xs font-bold text-stone-700">{c1Hex}</span>
                  </div>
                </div>
                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full shrink-0 border border-black/10 shadow-xs" style={{ backgroundColor: c2Hex }} />
                  <div className="min-w-0">
                    <span className="text-[11px] text-stone-400 block truncate">Accent ({palette2.key === 'rose' ? (state.color2Shade === 'tint' ? 'Rose 50' : 'Rose 100') : palette2.name})</span>
                    <span className="font-mono text-xs font-bold text-stone-700">{c2Hex}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Code Output Section */}
            <section className="bg-white border border-stone-200/80 rounded-3xl p-5 md:p-7 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setCodeTab('css')}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      codeTab === 'css' ? "bg-white text-stone-900 shadow-xs" : "text-stone-500"
                    )}
                  >
                    CSS
                  </button>
                  <button
                    type="button"
                    onClick={() => setCodeTab('tailwind')}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      codeTab === 'tailwind' ? "bg-white text-stone-900 shadow-xs" : "text-stone-500"
                    )}
                  >
                    Tailwind
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(codeTab === 'css' ? `background: ${gradientCSS};` : `bg-[${gradientCSS}]`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FF7A7B] text-white hover:bg-[#FF6566] transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>複製程式碼</span>
                </button>
              </div>

              <div className="bg-stone-900 text-stone-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner">
                {codeTab === 'css' ? (
                  <code>background: {gradientCSS};</code>
                ) : (
                  <code>/* 推薦使用內聯樣式應用動態漸層 */<br/>style=&#123;&#123; background: "{gradientCSS}" &#125;&#125;</code>
                )}
              </div>
            </section>

          </div>

        </div>

      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold">已成功複製漸層程式碼！</span>
        </div>
      )}

      {/* Guide Modal */}
      <GuideModal isOpen={showGuideModal} onClose={() => setShowGuideModal(false)} />
    </div>
  );
}
