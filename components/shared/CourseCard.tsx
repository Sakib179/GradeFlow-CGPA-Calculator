"use client";

import { motion } from "framer-motion";
import { CREDITS, GRADES } from "@/lib/constants";
import { PillSelector } from "./PillSelector";
import { Trash2 } from "lucide-react";

interface CourseCardProps {
  index: number;
  credit: number;
  grade: number;
  onCreditChange: (credit: number) => void;
  onGradeChange: (grade: number) => void;
  onRemove?: () => void;
  canRemove?: boolean;
}

export function CourseCard({
  index,
  credit,
  grade,
  onCreditChange,
  onGradeChange,
  onRemove,
  canRemove = false,
}: CourseCardProps) {
  const gradeLabel = GRADES.find((g) => g.value === grade)?.label ?? "A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="rounded-2xl border border-[#2A2A4A] dark:border-[#2A2A4A] border-slate-200 bg-[#16213E] dark:bg-[#16213E] bg-white shadow-card-dark dark:shadow-card-dark shadow-card-light overflow-hidden"
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-[#2A2A4A]/60 dark:border-[#2A2A4A]/60 border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center">
            <span className="text-[11px] font-extrabold text-accent">
              {index + 1}
            </span>
          </div>
          <span className="text-xs font-bold text-[#94A3B8] dark:text-[#94A3B8] text-slate-500 uppercase tracking-wider">
            Course {index + 1}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Preview badge — shows GPA first, then letter */}
          <div className="flex items-center gap-1.5 bg-[#0F0F1A] dark:bg-[#0F0F1A] bg-slate-100 rounded-xl px-2.5 py-1">
            <span className="text-xs font-bold text-[#94A3B8] dark:text-[#94A3B8] text-slate-500">
              {credit} cr
            </span>
            <span className="w-px h-3 bg-[#2A2A4A] dark:bg-[#2A2A4A] bg-slate-300" />
            <span className="text-xs font-extrabold text-accent">
              {grade.toFixed(1)}
            </span>
            <span className="text-xs text-[#94A3B8] dark:text-[#94A3B8] text-slate-400">
              {gradeLabel}
            </span>
          </div>

          {canRemove && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onRemove}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-danger hover:bg-danger/10 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Selectors */}
      <div className="px-4 py-3.5 space-y-3">
        <PillSelector
          label="Credit Hours"
          options={CREDITS}
          selected={credit}
          onSelect={onCreditChange}
        />
        <PillSelector
          label="Grade"
          options={GRADES}
          selected={grade}
          onSelect={onGradeChange}
          variant="grade"
        />
      </div>
    </motion.div>
  );
}
