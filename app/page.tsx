"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/Header";
import { BottomTabBar, type Tab } from "@/components/BottomTabBar";
import { DesktopTabBar } from "@/components/DesktopTabBar";
import { SemesterCalculator } from "@/components/calculators/SemesterCalculator";
import { DropCalculator } from "@/components/calculators/DropCalculator";
import { RepeatCalculator } from "@/components/calculators/RepeatCalculator";

const tabOrder: Tab[] = ["semester", "drop", "repeat"];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("semester");
  const [prevTab, setPrevTab] = useState<Tab>("semester");

  const handleTabChange = (tab: Tab) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const direction =
    tabOrder.indexOf(activeTab) > tabOrder.indexOf(prevTab) ? 1 : -1;

  return (
    <div className="min-h-screen bg-[#0F0F1A] dark:bg-[#0F0F1A] bg-slate-50 transition-colors duration-300">
      {/* Subtle grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.025] opacity-[0.012]"
        style={{
          backgroundImage: `linear-gradient(rgba(108,99,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Ambient glow — wider on desktop */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-accent/5 dark:bg-accent/5 bg-accent/[0.025] blur-[120px] pointer-events-none" />

      <Header />
      {/* Desktop horizontal tab bar — hidden on mobile */}
      <DesktopTabBar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main content
          Mobile:  pt accounts for fixed header only (60px), pb for bottom tab bar (80px)
          Desktop: pt accounts for header + desktop tab bar (~116px), larger pb */}
      <main className="relative pt-[60px] md:pt-[116px] pb-[84px] md:pb-12 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait" custom={direction}>
            {activeTab === "semester" && (
              <motion.div
                key="semester"
                custom={direction}
                initial={{ opacity: 0, x: direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -28 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <SemesterCalculator />
              </motion.div>
            )}
            {activeTab === "drop" && (
              <motion.div
                key="drop"
                custom={direction}
                initial={{ opacity: 0, x: direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -28 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <DropCalculator />
              </motion.div>
            )}
            {activeTab === "repeat" && (
              <motion.div
                key="repeat"
                custom={direction}
                initial={{ opacity: 0, x: direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -28 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <RepeatCalculator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile bottom tab bar — hidden on desktop */}
      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
