export interface Course {
  credit: number;
  grade: number;
}

export interface SemesterResult {
  newCGPA: number;
  totalCredits: number;
  semesterGPA: number;
  change: number;
}

export interface DropResult {
  newCGPA: number;
  remainingCredits: number;
  change: number;
}

export interface RepeatResult {
  newCGPA: number;
  cgpaChange: number;
}

export function clamp(value: number, min = 0, max = 4.0): number {
  return Math.min(max, Math.max(min, value));
}

export function round4(value: number): number {
  return Math.round(value * 10000) / 10000;
}

export function calculateAfterSemester(
  currentCGPA: number,
  currentCredits: number,
  courses: Course[]
): SemesterResult {
  const semesterPoints = courses.reduce((sum, c) => sum + c.credit * c.grade, 0);
  const semesterCredits = courses.reduce((sum, c) => sum + c.credit, 0);
  const totalCredits = currentCredits + semesterCredits;
  const newCGPA = ((currentCGPA * currentCredits) + semesterPoints) / totalCredits;
  const semesterGPA = semesterCredits > 0 ? semesterPoints / semesterCredits : 0;

  return {
    newCGPA: round4(clamp(newCGPA)),
    totalCredits,
    semesterGPA: round4(clamp(semesterGPA)),
    change: round4(clamp(newCGPA) - currentCGPA),
  };
}

export function calculateAfterDrop(
  currentCGPA: number,
  currentCredits: number,
  dropCredit: number,
  dropGrade: number
): DropResult {
  const remainingCredits = currentCredits - dropCredit;
  if (remainingCredits <= 0) {
    return { newCGPA: 0, remainingCredits: 0, change: -currentCGPA };
  }
  const newCGPA =
    ((currentCGPA * currentCredits) - dropCredit * dropGrade) / remainingCredits;

  return {
    newCGPA: round4(clamp(newCGPA)),
    remainingCredits,
    change: round4(clamp(newCGPA) - currentCGPA),
  };
}

export function calculateAfterRepeat(
  currentCGPA: number,
  currentCredits: number,
  courseCredit: number,
  oldGrade: number,
  newGrade: number
): RepeatResult {
  if (currentCredits <= 0) {
    return { newCGPA: currentCGPA, cgpaChange: 0 };
  }
  const newCGPA =
    ((currentCGPA * currentCredits) -
      oldGrade * courseCredit +
      newGrade * courseCredit) /
    currentCredits;
  const clamped = round4(clamp(newCGPA));

  return {
    newCGPA: clamped,
    cgpaChange: round4(clamped - currentCGPA),
  };
}

export function isValidCGPA(value: string): boolean {
  const n = parseFloat(value);
  return !isNaN(n) && n >= 0 && n <= 4.0;
}

export function isValidCredits(value: string): boolean {
  const n = parseFloat(value);
  return !isNaN(n) && n > 0 && Number.isInteger(n);
}
