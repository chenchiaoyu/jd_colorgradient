import React from 'react';
import { Check } from 'lucide-react';
import { cn } from './utils';

interface ChipProps {
  active: boolean;
  title: string;
  sub?: string;
  swatchHex?: string;
  isMulti?: boolean;
  align?: 'left' | 'center';
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

export function Chip({ 
  active, 
  title, 
  sub, 
  swatchHex, 
  isMulti = false, 
  align,
  className, 
  ...props 
}: ChipProps) {
  const isCentered = align === 'center' || (!sub && !swatchHex && !isMulti && align !== 'left');

  return (
    <button
      type="button"
      aria-pressed={!isMulti ? active : undefined}
      role={isMulti ? "checkbox" : undefined}
      aria-checked={isMulti ? active : undefined}
      className={cn(
        "appearance-none border rounded-2xl transition-all duration-150 active:scale-[0.98] w-full text-left relative select-none cursor-pointer flex",
        // Padding & Min-height for visual consistency
        sub || swatchHex ? "p-3 min-h-[58px]" : "px-3.5 py-2.5 min-h-[44px]",
        // Layout mode
        swatchHex ? "flex-row items-center gap-2.5 text-left" : "",
        isMulti ? "flex-row items-center justify-between gap-2 text-left" : "",
        !swatchHex && !isMulti && sub ? "flex-col justify-center text-left gap-0.5" : "",
        !swatchHex && !isMulti && !sub && isCentered ? "items-center justify-center text-center" : "",
        !swatchHex && !isMulti && !sub && !isCentered ? "items-center text-left" : "",
        // Active / Inactive states
        active
          ? "bg-[#FF7A7B]/10 border-[#FF7A7B] text-stone-900 shadow-[0_2px_12px_-4px_rgba(255,122,123,0.25)] ring-1 ring-[#FF7A7B]/40"
          : "bg-stone-50/70 hover:bg-white border-stone-200/80 hover:border-[#FF7A7B]/60 text-stone-700 shadow-xs",
        className
      )}
      {...props}
    >
      {swatchHex && (
        <span
          className="w-4 h-4 rounded-full flex-none border border-black/10 shadow-xs ring-1 ring-white"
          style={{ backgroundColor: swatchHex }}
        />
      )}

      <div className={cn("flex flex-col min-w-0 leading-tight", isCentered && !swatchHex && !isMulti ? "items-center text-center w-full" : "flex-1")}>
        <span className="font-semibold text-[13px] sm:text-[13.5px] truncate block text-stone-800">
          {title}
        </span>
        {sub && (
          <span className={cn(
            "text-[11px] leading-tight truncate block mt-0.5 font-normal",
            active ? "text-[#FF7A7B]" : "text-stone-400"
          )}>
            {sub}
          </span>
        )}
      </div>

      {isMulti && (
        <div className={cn(
          "w-4 h-4 rounded-md border flex items-center justify-center transition-colors shrink-0",
          active ? "bg-[#FF7A7B] border-[#FF7A7B] text-white" : "border-stone-300 bg-white"
        )}>
          {active && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
      )}
    </button>
  );
}

interface InfoPopProps {
  id: string;
  text: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function InfoPop({ id, text, isOpen, onToggle }: InfoPopProps) {
  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onToggle}
        className={cn(
          "w-5 h-5 rounded-full text-[11px] font-bold leading-none inline-flex items-center justify-center transition-all shrink-0 cursor-pointer",
          isOpen
            ? "bg-[#FF7A7B] border border-[#FF7A7B] text-white shadow-xs"
            : "bg-stone-100 border border-stone-200 text-stone-500 hover:border-[#FF7A7B] hover:text-[#FF7A7B]"
        )}
        title="說明"
      >
        i
      </button>
      {isOpen && (
        <div
          id={id}
          className="absolute z-30 top-full left-0 mt-2 w-72 sm:w-80 bg-white text-stone-700 border border-stone-200/90 rounded-2xl p-4 text-[12.5px] leading-relaxed shadow-xl animate-in fade-in duration-150"
        >
          {text}
        </div>
      )}
    </div>
  );
}
