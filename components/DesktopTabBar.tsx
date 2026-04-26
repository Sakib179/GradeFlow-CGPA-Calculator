"use client";

import { motion } from "framer-motion";
import { CalendarDays, MinusCircle, RefreshCw } from "lucide-react";
import type { Tab } from "./BottomTabBar";

interface DesktopTabBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: {
  id: Tab;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    id: "semester",
    label: "Semester Result",
    description: "Predict CGPA after this semester",
    icon: CalendarDays,
    color: "text-accent",
  },
  {
    id: "drop",
    label: "Course Drop",
    description: "Impact of dropping a course",
    icon: MinusCircle,
    color: "text-danger",
  },
  {
    id: "repeat",
    label: "Grade Replace",
    description: "Course retake or drop from gradesheet",
    icon: RefreshCw,
    color: "text-success",
  },
];

export function DesktopTabBar({ activeTab, onTabChange }: DesktopTabBarProps) {
  return (
    /* Visible only on md+ screens, sits fixed below the header */
    <div className="hidden md:block fixed top-[60px] left-0 right-0 z-40 border-b border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 bg-[#0F0F1A]/95 dark:bg-[#0F0F1A]/95 bg-white/95 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex items-center justify-center gap-1 py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group"
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-tab-bg"
                    className="absolute inset-0 rounded-xl bg-accent/10 border border-accent/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                  />
                )}

                <div
                  className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? "bg-accent/20"
                      : "bg-[#1A1A2E] dark:bg-[#1A1A2E] bg-slate-100 group-hover:bg-accent/10"
                  }`}
                >
                  <tab.icon
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isActive
                        ? tab.color
                        : "text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 group-hover:text-accent"
                    }`}
                  />
                </div>

                <div className="relative z-10 text-left">
                  <p
                    className={`text-sm font-bold leading-none transition-colors duration-200 ${
                      isActive
                        ? "text-[#E2E8F0] dark:text-[#E2E8F0] text-slate-800"
                        : "text-[#94A3B8] dark:text-[#94A3B8] text-slate-500 group-hover:text-[#E2E8F0] dark:group-hover:text-[#E2E8F0] group-hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </p>
                  <p className="text-[10px] text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 mt-0.5 leading-none">
                    {tab.description}
                  </p>
                </div>
              </button>
            );
          })}

        </div>
      </div>
    </div>
  );
}
