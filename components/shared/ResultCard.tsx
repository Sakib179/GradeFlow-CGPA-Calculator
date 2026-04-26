"use client";

import { useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Copy, Check } from "lucide-react";
import { useState } from "react";

interface StatItem {
  label: string;
  value: string | number;
}

interface ResultCardProps {
  newCGPA: number;
  change: number;
  stats?: StatItem[];
  copyText?: string;
  onReset?: () => void;
}

function AnimatedNumber({ value }: { value: number }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => v.toFixed(2));
  const [display, setDisplay] = useState("0.00");

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration: 0.8,
      ease: [0.34, 1.2, 0.64, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, motionVal, rounded]);

  return <span>{display}</span>;
}

export function ResultCard({
  newCGPA,
  change,
  stats = [],
  copyText,
  onReset,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const isUp = change > 0.001;
  const isDown = change < -0.001;

  const handleCopy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const gradientClass = isUp
    ? "from-[#6C63FF] via-[#4f46e5] to-[#2563eb]"
    : isDown
    ? "from-[#ef4444] via-[#dc2626] to-[#b91c1c]"
    : "from-[#475569] via-[#334155] to-[#1e293b]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 280, delay: 0.05 }}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradientClass} p-px shadow-2xl`}
    >
      <div className="relative rounded-[23px] bg-[#1A1A2E]/90 dark:bg-[#1A1A2E]/90 bg-white/90 backdrop-blur-sm p-5">
        <div
          className={`absolute inset-0 rounded-[23px] opacity-[0.06] bg-gradient-to-br ${gradientClass}`}
        />

        <div className="relative flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] dark:text-[#94A3B8] text-slate-500">
            Your New CGPA
          </p>
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold ${
              isUp
                ? "bg-success/15 text-success"
                : isDown
                ? "bg-danger/15 text-danger"
                : "bg-[#94A3B8]/15 text-[#94A3B8]"
            }`}
          >
            {isUp ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : isDown ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            {isUp ? "+" : ""}
            {change.toFixed(2)}
          </div>
        </div>

        <div className="relative flex items-end gap-3 mb-4">
          <span
            className={`text-7xl font-extrabold leading-none tracking-tight ${
              isUp ? "text-gradient" : isDown ? "text-gradient-red" : "text-[#94A3B8]"
            }`}
          >
            <AnimatedNumber value={newCGPA} />
          </span>
          <span className="text-lg font-semibold text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 mb-2">
            / 4.00
          </span>
        </div>

        {stats.length > 0 && (
          <div className="relative flex gap-2 mb-4 flex-wrap">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex-1 min-w-[80px] bg-[#0F0F1A] dark:bg-[#0F0F1A] bg-slate-50 rounded-xl px-3 py-2.5"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 mb-0.5 whitespace-nowrap">
                  {s.label}
                </p>
                <p className="text-sm font-bold text-[#E2E8F0] dark:text-[#E2E8F0] text-slate-700 truncate">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="relative flex gap-2">
          {copyText && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent/10 text-accent text-sm font-semibold hover:bg-accent/20 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Result
                </>
              )}
            </motion.button>
          )}

          {onReset && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0F0F1A] dark:bg-[#0F0F1A] bg-slate-100 text-[#94A3B8] dark:text-[#94A3B8] text-slate-500 text-sm font-semibold hover:text-white dark:hover:text-white hover:bg-[#2A2A4A] dark:hover:bg-[#2A2A4A] hover:text-slate-700 transition-colors border border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200"
            >
              Recalculate
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
