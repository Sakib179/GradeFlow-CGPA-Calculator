"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { NumberInput } from "@/components/shared/NumberInput";
import { PillSelector } from "@/components/shared/PillSelector";
import { ResultCard } from "@/components/shared/ResultCard";
import { calculateAfterDrop } from "@/lib/calculations";
import { CREDITS, GRADES, DEFAULT_CREDIT, DEFAULT_GRADE } from "@/lib/constants";

const STORAGE_KEY = "gf-drop";

function WarningBanner() {
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-warning/10 border border-warning/20">
      <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
      <p className="text-xs text-warning/90 leading-relaxed">
        This assumes the course was <strong>already completed</strong> and counted
        in your CGPA. Dropping removes it from the record.
        <span className="block mt-1 opacity-75">
          Always consult your academic advisor before dropping a course.
        </span>
      </p>
    </div>
  );
}

export function DropCalculator() {
  const [currentCGPA, setCurrentCGPA] = useState("");
  const [completedCredits, setCompletedCredits] = useState("");
  const [dropCredit, setDropCredit] = useState(DEFAULT_CREDIT);
  const [dropGrade, setDropGrade] = useState(DEFAULT_GRADE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        if (d.cgpa) setCurrentCGPA(d.cgpa);
        if (d.credits) setCompletedCredits(d.credits);
        if (d.dropCredit) setDropCredit(d.dropCredit);
        if (d.dropGrade) setDropGrade(d.dropGrade);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cgpa: currentCGPA, credits: completedCredits, dropCredit, dropGrade })
      );
    } catch {}
  }, [currentCGPA, completedCredits, dropCredit, dropGrade]);

  const cgpaNum = parseFloat(currentCGPA);
  const creditsNum = parseFloat(completedCredits);
  const isValid =
    !isNaN(cgpaNum) && cgpaNum >= 0 && cgpaNum <= 4.0 &&
    !isNaN(creditsNum) && creditsNum > 0 &&
    creditsNum > dropCredit;

  const result = useMemo(() => {
    if (!isValid) return null;
    return calculateAfterDrop(cgpaNum, creditsNum, dropCredit, dropGrade);
  }, [isValid, cgpaNum, creditsNum, dropCredit, dropGrade]);

  const handleReset = () => {
    setCurrentCGPA("");
    setCompletedCredits("");
    setDropCredit(DEFAULT_CREDIT);
    setDropGrade(DEFAULT_GRADE);
  };

  const copyText = result
    ? `My CGPA after dropping the course: ${result.newCGPA.toFixed(2)} (Remaining Credits: ${result.remainingCredits})`
    : undefined;

  const dropGradeLabel = GRADES.find((g) => g.value === dropGrade)?.label ?? "";
  const creditError =
    completedCredits && dropCredit >= creditsNum
      ? "Drop credits must be less than total credits"
      : undefined;

  return (
    <div className="pt-4 md:pt-6">

      {/* Page header */}
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 rounded-2xl bg-danger/10 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-xl">❌</span>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#E2E8F0] dark:text-[#E2E8F0] text-slate-800 leading-tight">
            After Course Drop
          </h2>
          <p className="text-xs text-[#94A3B8] dark:text-[#94A3B8] text-slate-500 mt-0.5">
            See how dropping a completed course affects your CGPA
          </p>
        </div>
      </div>

      {/* ── Desktop: two-column │ Mobile: single column ─────────────── */}
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 md:items-start">

        {/* ── LEFT COLUMN — Form ───────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 bg-[#1A1A2E] dark:bg-[#1A1A2E] bg-white space-y-4">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-3">
                Current Standing
              </p>
              <div className="grid grid-cols-2 gap-3">
                <NumberInput
                  label="Current CGPA"
                  value={currentCGPA}
                  onChange={setCurrentCGPA}
                  placeholder="e.g. 3.45"
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
                  error={creditError}
                />
              </div>
            </div>

            <div className="h-px bg-[#2A2A4A] dark:bg-[#2A2A4A] bg-slate-100" />

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-danger/80 mb-3">
                Course to Drop
              </p>
              <div className="space-y-3">
                <PillSelector
                  label="Credit Hours"
                  options={CREDITS}
                  selected={dropCredit}
                  onSelect={setDropCredit}
                />
                <PillSelector
                  label="Grade Received"
                  options={GRADES}
                  selected={dropGrade}
                  onSelect={setDropGrade}
                  variant="grade"
                />
              </div>

              {/* Preview badge */}
              {dropGradeLabel && (
                <div className="mt-3 flex items-center gap-2 text-xs text-[#94A3B8] dark:text-[#94A3B8] text-slate-500">
                  <span className="px-2 py-0.5 rounded-lg bg-danger/10 text-danger font-bold">
                    {dropCredit} cr
                  </span>
                  <span>course with grade</span>
                  <span className="px-2 py-1 rounded-lg bg-accent/10 text-accent font-bold flex items-center gap-1">
                    <span>{dropGrade.toFixed(1)}</span>
                    <span className="opacity-60 text-[10px]">{dropGradeLabel}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Warning — Mobile: below form card */}
          <div className="md:hidden">
            <WarningBanner />
          </div>
        </div>

        {/* ── RIGHT COLUMN — Warning (desktop) + Result ───────────────── */}
        <div className="space-y-4 md:sticky md:top-[136px]">

          {/* Warning — Desktop: top of right column */}
          <div className="hidden md:block">
            <WarningBanner />
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                key="drop-result"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 280 }}
              >
                <ResultCard
                  newCGPA={result.newCGPA}
                  change={result.change}
                  stats={[
                    { label: "Remaining Credits", value: result.remainingCredits },
                    {
                      label: "Change",
                      value: `${result.change >= 0 ? "+" : ""}${result.change.toFixed(4)}`,
                    },
                  ]}
                  copyText={copyText}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!isValid && !creditError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center"
            >
              <p className="text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 text-sm">
                Fill in your current CGPA and credits to see the impact of dropping this course
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
