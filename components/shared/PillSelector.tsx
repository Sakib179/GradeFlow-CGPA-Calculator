"use client";

import { motion } from "framer-motion";

interface Option {
  label: string;
  value: number;
}

interface PillSelectorProps {
  label: string;
  options: Option[];
  selected: number;
  onSelect: (value: number) => void;
  variant?: "default" | "grade";
}

export function PillSelector({
  label,
  options,
  selected,
  onSelect,
  variant = "default",
}: PillSelectorProps) {
  return (
    <div className="w-full">
      {label && (
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 mb-2">
          {label}
        </p>
      )}

      {variant === "grade" ? (
        /* Grade grid: 4 cols mobile, 6 cols desktop — GPA number prominent */
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
          {options.map((opt) => (
            <GradePill
              key={opt.value}
              opt={opt}
              isSelected={selected === opt.value}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        /* Credit scroll row */
        <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
          <div className="flex gap-2 w-max">
            {options.map((opt) => (
              <DefaultPill
                key={opt.value}
                opt={opt}
                isSelected={selected === opt.value}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GradePill({
  opt,
  isSelected,
  onSelect,
}: {
  opt: Option;
  isSelected: boolean;
  onSelect: (v: number) => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => onSelect(opt.value)}
      className={`
        relative w-full h-[54px] rounded-xl flex flex-col items-center justify-center gap-0.5
        transition-all duration-200
        ${
          isSelected
            ? "bg-accent shadow-pill-selected"
            : "bg-[#0F0F1A] dark:bg-[#0F0F1A] bg-slate-100 border border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 hover:border-accent/50"
        }
      `}
    >
      {/* GPA number — primary, most prominent */}
      <span
        className={`text-[13px] font-extrabold leading-none ${
          isSelected
            ? "text-white"
            : "text-[#E2E8F0] dark:text-[#E2E8F0] text-slate-800"
        }`}
      >
        {opt.value.toFixed(1)}
      </span>

      {/* Letter grade — secondary */}
      <span
        className={`text-[9px] font-bold leading-none ${
          isSelected
            ? "text-white/75"
            : "text-[#94A3B8] dark:text-[#94A3B8] text-slate-400"
        }`}
      >
        {opt.label}
      </span>
    </motion.button>
  );
}

function DefaultPill({
  opt,
  isSelected,
  onSelect,
}: {
  opt: Option;
  isSelected: boolean;
  onSelect: (v: number) => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => onSelect(opt.value)}
      className={`
        relative min-w-[46px] h-9 px-3 rounded-xl text-sm font-bold
        transition-all duration-200 flex items-center justify-center shrink-0
        ${
          isSelected
            ? "bg-accent text-white shadow-pill-selected"
            : "bg-[#0F0F1A] dark:bg-[#0F0F1A] bg-slate-100 text-[#94A3B8] dark:text-[#94A3B8] text-slate-500 border border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 hover:border-accent/50 hover:text-accent"
        }
      `}
    >
      {opt.label}
    </motion.button>
  );
}
