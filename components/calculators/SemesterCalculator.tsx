"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { NumberInput } from "@/components/shared/NumberInput";
import { CourseCard } from "@/components/shared/CourseCard";
import { ResultCard } from "@/components/shared/ResultCard";
import { calculateAfterSemester } from "@/lib/calculations";
import { DEFAULT_CREDIT, DEFAULT_GRADE, MAX_COURSES, MIN_COURSES } from "@/lib/constants";

interface Course {
  credit: number;
  grade: number;
}

const STORAGE_KEY = "gf-semester";

function makeDefaultCourse(): Course {
  return { credit: DEFAULT_CREDIT, grade: DEFAULT_GRADE };
}

function ResultDivider() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-px bg-[#2A2A4A] dark:bg-[#2A2A4A] bg-slate-200" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] dark:text-[#94A3B8] text-slate-400">
        Result
      </span>
      <div className="flex-1 h-px bg-[#2A2A4A] dark:bg-[#2A2A4A] bg-slate-200" />
    </div>
  );
}

export function SemesterCalculator() {
  const [currentCGPA, setCurrentCGPA] = useState("");
  const [completedCredits, setCompletedCredits] = useState("");
  const [courses, setCourses] = useState<Course[]>([
    makeDefaultCourse(),
    makeDefaultCourse(),
    makeDefaultCourse(),
  ]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { cgpa, credits, courses: sc } = JSON.parse(saved);
        if (cgpa) setCurrentCGPA(cgpa);
        if (credits) setCompletedCredits(credits);
        if (sc?.length) setCourses(sc);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cgpa: currentCGPA, credits: completedCredits, courses })
      );
    } catch {}
  }, [currentCGPA, completedCredits, courses]);

  const cgpaNum = parseFloat(currentCGPA);
  const creditsNum = parseFloat(completedCredits);
  const isValid =
    !isNaN(cgpaNum) && cgpaNum >= 0 && cgpaNum <= 4.0 &&
    !isNaN(creditsNum) && creditsNum >= 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    return calculateAfterSemester(cgpaNum, creditsNum, courses);
  }, [isValid, cgpaNum, creditsNum, courses]);

  const addCourse = () => {
    if (courses.length >= MAX_COURSES) return;
    setCourses((prev) => [...prev, makeDefaultCourse()]);
  };

  const removeCourse = (i: number) => {
    if (courses.length <= MIN_COURSES) return;
    setCourses((prev) => prev.filter((_, idx) => idx !== i));
  };

  const updateCourse = (i: number, field: keyof Course, value: number) => {
    setCourses((prev) =>
      prev.map((c, idx) => (idx === i ? { ...c, [field]: value } : c))
    );
  };

  const handleReset = () => {
    setCurrentCGPA("");
    setCompletedCredits("");
    setCourses([makeDefaultCourse(), makeDefaultCourse(), makeDefaultCourse()]);
  };

  const copyText = result
    ? `My CGPA after this semester: ${result.newCGPA.toFixed(2)} (Sem GPA: ${result.semesterGPA.toFixed(2)}, Total Credits: ${result.totalCredits})`
    : undefined;

  return (
    <div className="pt-4 md:pt-6">
      {/* Page header — full width on both layouts */}
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-xl">📅</span>
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#E2E8F0] dark:text-[#E2E8F0] text-slate-800 leading-tight">
            After Semester
          </h2>
          <p className="text-xs text-[#94A3B8] dark:text-[#94A3B8] text-slate-500 mt-0.5">
            See where your CGPA will stand after this semester&apos;s results
          </p>
        </div>
      </div>

      {/* ── Desktop: two-column grid ── Mobile: single column ────────── */}
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-[380px_1fr] md:gap-6 md:items-start">

        {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
        <div className="space-y-4 md:sticky md:top-[136px]">

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
                placeholder="e.g. 3.45"
                min={0}
                max={4.0}
                step="0.01"
                suffix="/ 4.0"
                hint="Range: 0.00 – 4.00"
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
                min={0}
                step="1"
                hint="Total credits so far"
              />
            </div>
          </div>

          {/* Course count stepper */}
          <div className="p-4 rounded-2xl border border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 bg-[#1A1A2E] dark:bg-[#1A1A2E] bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
                  Courses This Semester
                </p>
                <p className="text-xs text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 mt-0.5">
                  {courses.length} course{courses.length !== 1 ? "s" : ""} added
                </p>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeCourse(courses.length - 1)}
                  disabled={courses.length <= MIN_COURSES}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#0F0F1A] dark:bg-[#0F0F1A] bg-slate-100 text-[#94A3B8] hover:text-danger hover:bg-danger/15 disabled:opacity-30 transition-all border border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="w-8 text-center font-extrabold text-[#E2E8F0] dark:text-[#E2E8F0] text-slate-800 text-lg">
                  {courses.length}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={addCourse}
                  disabled={courses.length >= MAX_COURSES}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-accent text-white hover:bg-accent-light disabled:opacity-30 transition-all shadow-md shadow-accent/30"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Result card — DESKTOP ONLY (shows in sticky left column) */}
          <div className="hidden md:block space-y-3">
            <AnimatePresence>
              {result && (
                <motion.div
                  key="desktop-result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <ResultDivider />
                  <ResultCard
                    newCGPA={result.newCGPA}
                    change={result.change}
                    stats={[
                      { label: "Semester GPA", value: result.semesterGPA.toFixed(2) },
                      { label: "Total Credits", value: result.totalCredits },
                      { label: "Change", value: `${result.change >= 0 ? "+" : ""}${result.change.toFixed(4)}` },
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
                className="py-6 text-center"
              >
                <p className="text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 text-sm">
                  Enter your current CGPA and completed credits to see the result
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN — Course cards ─────────────────────────────── */}
        <div className="space-y-3">
          {/* On mobile add a label since the cards appear below the stepper */}
          <p className="md:hidden text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] dark:text-[#94A3B8] text-slate-400">
            Course Details
          </p>
          <AnimatePresence>
            {courses.map((course, i) => (
              <CourseCard
                key={i}
                index={i}
                credit={course.credit}
                grade={course.grade}
                onCreditChange={(v) => updateCourse(i, "credit", v)}
                onGradeChange={(v) => updateCourse(i, "grade", v)}
                onRemove={() => removeCourse(i)}
                canRemove={courses.length > MIN_COURSES}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Result card — MOBILE ONLY (appears below course cards) */}
      <div className="md:hidden space-y-3 mt-4">
        <AnimatePresence>
          {result && (
            <motion.div
              key="mobile-result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <ResultDivider />
              <ResultCard
                newCGPA={result.newCGPA}
                change={result.change}
                stats={[
                  { label: "Semester GPA", value: result.semesterGPA.toFixed(2) },
                  { label: "Total Credits", value: result.totalCredits },
                  { label: "Change", value: `${result.change >= 0 ? "+" : ""}${result.change.toFixed(4)}` },
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
            className="py-6 text-center"
          >
            <p className="text-[#94A3B8] dark:text-[#94A3B8] text-slate-400 text-sm">
              Enter your current CGPA and completed credits to see the result
            </p>
          </motion.div>
        )}
      </div>

      <div className="h-4" />
    </div>
  );
}
