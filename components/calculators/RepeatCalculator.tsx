"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { NumberInput } from "@/components/shared/NumberInput";
import { PillSelector } from "@/components/shared/PillSelector";
import { ResultCard } from "@/components/shared/ResultCard";
import { calculateAfterRepeat } from "@/lib/calculations";
import { CREDITS, GRADES, DEFAULT_CREDIT, DEFAULT_OLD_GRADE, DEFAULT_GRADE } from "@/lib/constants";

const STORAGE_KEY = "gf-repeat";

function InfoBanner() {
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-accent/10 border border-accent/20">
      <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
      <p className="text-xs text-accent/90 leading-relaxed">
        <strong>Credit hours do NOT increase</strong> after a repeat/replace.
        Only the grade changes — credits stay exactly the same.
      </p>
    </div>
  );
}

export function RepeatCalculator() {
  const [currentCGPA, setCurrentCGPA] = useState("");
  const [completedCredits, setCompletedCredits] = useState("");
  const [courseCredit, setCourseCredit] = useState(DEFAULT_CREDIT);
  const [oldGrade, setOldGrade] = useState(DEFAULT_OLD_GRADE);
  const [newGrade, setNewGrade] = useState(DEFAULT_GRADE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        if (d.cgpa) setCurrentCGPA(d.cgpa);
        if (d.credits) setCompletedCredits(d.credits);
        if (d.courseCredit) setCourseCredit(d.courseCredit);
        if (d.oldGrade) setOldGrade(d.oldGrade);
        if (d.newGrade) setNewGrade(d.newGrade);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cgpa: currentCGPA, credits: completedCredits, courseCredit, oldGrade, newGrade })
      );
    } catch {}
  }, [currentCGPA, completedCredits, courseCredit, oldGrade, newGrade]);

  const cgpaNum = parseFloat(currentCGPA);
  const creditsNum = parseFloat(completedCredits);
  const isValid =
    !isNaN(cgpaNum) && cgpaNum >= 0 && cgpaNum <= 4.0 &&
    !isNaN(creditsNum) && creditsNum > 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    return calculateAfterRepeat(cgpaNum, creditsNum, courseCredit, oldGrade, newGrade);
  }, [isValid, cgpaNum, creditsNum, courseCredit, oldGrade, newGrade]);

  const handleReset = () => {
    setCurrentCGPA("");
    setCompletedCredits("");
    setCourseCredit(DEFAULT_CREDIT);
    setOldGrade(DEFAULT_OLD_GRADE);
    setNewGrade(DEFAULT_GRADE);
  };

  const oldGradeLabel = GRADES.find((g) => g.value === oldGrade)?.label ?? "";
  const newGradeLabel = GRADES.find((g) => g.value === newGrade)?.label ?? "";

  const copyText = result
    ? `My CGPA after repeating the course (${oldGrade.toFixed(1)} ${oldGradeLabel} → ${newGrade.toFixed(1)} ${newGradeLabel}): ${result.newCGPA.toFixed(2)} (Change: ${result.cgpaChange >= 0 ? "+" : ""}${result.cgpaChange.toFixed(4)})`
    : undefined;

  return (
    <div className="pt-4 md:pt-6">

      {/* Page header */}
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 rounded-2xl bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-xl">🔄</span>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#E2E8F0] dark:text-[#E2E8F0] text-slate-800 leading-tight">
            After Grade Replace
          </h2>
          <p className="text-xs text-[#94A3B8] dark:text-[#94A3B8] text-slate-500 mt-0.5">
            See how retaking a course with a better grade boosts your CGPA
          </p>
        </div>
      </div>

      {/* ── Desktop: two-column │ Mobile: single column ─────────────── */}
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 md:items-start">

        {/* ── LEFT COLUMN — Form ───────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Info banner — Mobile only (desktop shows in right column) */}
          <div className="md:hidden">
            <InfoBanner />
          </div>

          {/* Current standing */}
          <div className="p-4 rounded-2xl border border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 bg-[#1A1A2E] dark:bg-[#1A1A2E] bg-white">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-3">
              Current Standing
            </p>
            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Current CGPA"
                value={currentCGPA}
                onChange={setCurrentCGPA}
                placeholder="e.g. 3.20"
                min={0}
                max={4.0}
                step="0.01"
                suffix="/ 4.0"
                error={
                  currentCGPA &&
                  (isNaN(parseFloat(currentCGPA)) || parseFloat(currentCGPA) > 4.0)
                    ? "Must be 0–4.00"
                    : undefined
                }
              />
              <NumberInput
                label="Completed Credits"
                value={completedCredits}
                onChange={setCompletedCredits}
                placeholder="e.g. 90"
                min={1}
                step="1"
                hint="Credits stay the same"
              />
            </div>
          </div>

          {/* Course details */}
          <div className="p-4 rounded-2xl border border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 bg-[#1A1A2E] dark:bg-[#1A1A2E] bg-white space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
              Course Being Repeated
            </p>

            <PillSelector
              label="Credit Hours"
              options={CREDITS}
              selected={courseCredit}
              onSelect={setCourseCredit}
            />

            <div className="h-px bg-[#2A2A4A] dark:bg-[#2A2A4A] bg-slate-100" />

            {/* Old grade */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-danger/80 mb-2">
                Old Grade — what you got before
              </p>
              <PillSelector
                label=""
                options={GRADES}
                selected={oldGrade}
                onSelect={setOldGrade}
                variant="grade"
              />
            </div>

            <div className="h-px bg-[#2A2A4A] dark:bg-[#2A2A4A] bg-slate-100" />

            {/* New grade */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-success/80 mb-2">
                New Grade — after retake
              </p>
              <PillSelector
                label=""
                options={GRADES}
                selected={newGrade}
                onSelect={setNewGrade}
                variant="grade"
              />
            </div>

            {/* Grade comparison — GPA number is now primary */}
            {oldGradeLabel && newGradeLabel && (
              <div className="flex items-center gap-3 mt-1">
                <div className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 rounded-xl bg-danger/10 border border-danger/20">
                  <span className="font-extrabold text-danger text-xl leading-none">
                    {oldGrade.toFixed(1)}
                  </span>
                  <span className="text-xs text-danger/70 font-semibold leading-none">
                    {oldGradeLabel}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#0F0F1A] dark:bg-[#0F0F1A] bg-slate-100 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 rounded-xl bg-success/10 border border-success/20">
                  <span className="font-extrabold text-success text-xl leading-none">
                    {newGrade.toFixed(1)}
                  </span>
                  <span className="text-xs text-success/70 font-semibold leading-none">
                    {newGradeLabel}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN — Info (desktop) + Result ───────────────────── */}
        <div className="space-y-4 md:sticky md:top-[136px]">

          {/* Info banner — Desktop only */}
          <div className="hidden md:block">
            <InfoBanner />
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                key="repeat-result"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 280 }}
              >
                <ResultCard
                  newCGPA={result.newCGPA}
                  change={result.cgpaChange}
                  stats={[
                    { label: "Credits (unchanged)", value: creditsNum },
                    {
                      label: "Grade Change",
                      value: `${oldGrade.toFixed(1)} ${oldGradeLabel} → ${newGrade.toFixed(1)} ${newGradeLabel}`,
                    },
                    {
                      label: "CGPA Change",
                      value: `${result.cgpaChange >= 0 ? "+" : ""}${result.cgpaChange.toFixed(4)}`,
                    },
                  ]}
                  copyText={copyText}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!isValid && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center"
            >
              <p className="text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 text-sm">
                Enter your current CGPA and credits, then select grades to see the result
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
