"use client";

import { motion } from "framer-motion";
import { CalendarDays, MinusCircle, RefreshCw } from "lucide-react";

export type Tab = "semester" | "drop" | "repeat";

interface BottomTabBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "semester", label: "Semester", icon: CalendarDays },
  { id: "drop", label: "Drop", icon: MinusCircle },
  { id: "repeat", label: "Repeat", icon: RefreshCw },
];

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    /* Hidden on desktop — DesktopTabBar takes over */
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 glass-dark dark:glass-dark glass-light">
      <div className="max-w-md mx-auto flex items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex-1 flex flex-col items-center gap-1 py-2.5 px-3 transition-all duration-200"
              aria-label={tab.label}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-tab-bg"
                  className="absolute inset-1 rounded-xl bg-accent/15"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                />
              )}
              <div
                className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-br from-accent to-violet-500 shadow-md shadow-accent/40"
                    : "bg-transparent"
                }`}
              >
                <tab.icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-[#94A3B8] dark:text-[#94A3B8] text-slate-400"
                  }`}
                />
              </div>
              <span
                className={`relative z-10 text-[11px] font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "text-accent"
                    : "text-[#94A3B8] dark:text-[#94A3B8] text-slate-400"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
