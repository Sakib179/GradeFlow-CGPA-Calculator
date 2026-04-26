"use client";

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: string;
  error?: string;
  suffix?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  placeholder = "0",
  hint,
  min,
  max,
  step = "any",
  error,
  suffix,
}: NumberInputProps) {
  return (
    <div className="w-full">
      <label className="block text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`w-full px-4 py-3.5 rounded-2xl text-lg font-semibold transition-all duration-200 outline-none
            bg-[#0F0F1A] dark:bg-[#0F0F1A] bg-slate-100
            border-2 ${
              error
                ? "border-danger/60 focus:border-danger"
                : "border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 focus:border-accent dark:focus:border-accent"
            }
            text-[#E2E8F0] dark:text-[#E2E8F0] text-slate-800
            placeholder-[#94A3B8]/40 dark:placeholder-[#94A3B8]/40 placeholder-slate-400/60
            focus:shadow-accent-glow
          `}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-danger font-medium">{error}</p>
      )}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-[#94A3B8]/70 dark:text-[#94A3B8]/70 text-slate-400/80">
          {hint}
        </p>
      )}
    </div>
  );
}
