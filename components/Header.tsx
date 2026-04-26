"use client";

import { useState } from "react";
import { Sun, Moon, GraduationCap, X, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 glass-dark dark:glass-dark glass-light">
        {/* Wider inner container on desktop */}
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-violet-500 flex items-center justify-center shadow-md shadow-accent/30">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg leading-none text-gradient tracking-tight">
                GradeFlow
              </span>
              <p className="text-[10px] text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 leading-none mt-0.5 font-medium tracking-wide uppercase">
                CGPA Calculator
              </p>
            </div>
          </div>

          {/* Desktop: extra context label
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 font-medium">
          </div> */}

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowInfo(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#94A3B8] hover:text-accent hover:bg-accent/10 transition-all duration-200"
              aria-label="Info"
            >
              <Info className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1A1A2E] dark:bg-[#1A1A2E] bg-slate-100 text-[#94A3B8] dark:text-[#94A3B8] text-slate-500 hover:text-accent hover:bg-accent/10 dark:hover:bg-accent/10 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-[18px] h-[18px]" />
              ) : (
                <Moon className="w-[18px] h-[18px]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center px-4 pb-4 md:pb-0"
            onClick={() => setShowInfo(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#1A1A2E] dark:bg-[#1A1A2E] bg-white rounded-2xl p-5 border border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg text-[#E2E8F0] dark:text-[#E2E8F0] text-slate-800">
                  About GradeFlow
                </h2>
                <button
                  onClick={() => setShowInfo(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-white dark:hover:text-white hover:text-slate-700 hover:bg-[#2A2A4A] dark:hover:bg-[#2A2A4A] hover:bg-slate-100 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-sm text-[#94A3B8] dark:text-[#94A3B8] text-slate-500">
                <p>
                  GradeFlow helps you predict your CGPA with three powerful calculators:
                </p>
                <div className="space-y-2">
                  {[
                    { emoji: "📅", title: "Semester", desc: "See how this semester's results will affect your CGPA." },
                    { emoji: "❌", title: "Drop", desc: "Calculate your CGPA after dropping a completed course." },
                    { emoji: "🔄", title: "Repeat", desc: "See how retaking a course with a better grade changes your CGPA." },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0F0F1A] dark:bg-[#0F0F1A] bg-slate-50">
                      <span className="text-lg">{item.emoji}</span>
                      <div>
                        <p className="font-semibold text-[#E2E8F0] dark:text-[#E2E8F0] text-slate-700 text-xs uppercase tracking-wide mb-0.5">
                          {item.title}
                        </p>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs border-t border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 pt-3 mt-3">
                  All calculations use the standard 4.0 GPA scale. Results are saved locally on your device.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
