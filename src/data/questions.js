// ─────────────────────────────────────────────────────────────────────────
// FRACTIONS, DECIMALS, PERCENTAGES & ROUNDING (single section, no images)
// ─────────────────────────────────────────────────────────────────────────
//
// FRACTION DISPLAY
// Fractions are written with a horizontal line using a small inline helper,
// `frac(numerator, denominator)`, used inside question `text` and
// `displayAnswer` strings. Add this CSS wherever your quiz styles live:
//
//   .frac { display: inline-flex; flex-direction: column; text-align: center;
//           vertical-align: middle; margin: 0 2px; line-height: 1.1; }
//   .frac .num { border-bottom: 1px solid currentColor; padding: 0 2px; }
//   .frac .denom { padding: 0 2px; }
//
// ANSWER CHECKING
// Fraction answers are stored/compared as plain strings like "3/4" (not the
// HTML). `checkFraction` simplifies both the submitted value and the target
// answer before comparing, so equivalent fractions (e.g. "2/4" vs "1/2")
// are accepted.

// ─── Helpers ────────────────────────────────────────────────────────────

function frac(num, denom) {
  return `<span class="frac"><span class="num">${num}</span><span class="denom">${denom}</span></span>`;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

function parseFraction(str) {
  const cleaned = String(str).trim().replace(/\s+/g, "");
  const parts = cleaned.split("/");
  if (parts.length !== 2) return null;
  const num = parseInt(parts[0], 10);
  const denom = parseInt(parts[1], 10);
  if (isNaN(num) || isNaN(denom) || denom === 0) return null;
  return [num, denom];
}

function simplifyFraction(num, denom) {
  const g = gcd(num, denom);
  let n = num / g;
  let d = denom / g;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  return [n, d];
}

// Checks whether a submitted fraction string is equivalent to the target
// fraction string, after simplifying both.
function checkFraction(submitted, target) {
  const a = parseFraction(submitted);
  const b = parseFraction(target);
  if (!a || !b) return false;
  const [an, ad] = simplifyFraction(a[0], a[1]);
  const [bn, bd] = simplifyFraction(b[0], b[1]);
  return an === bn && ad === bd;
}

function normalizeFractionInput(v) {
  return String(v).trim().replace(/\s+/g, "");
}

// ─── Questions ─────────────────────────────────────────────────────────

export const questions = [

  // ═══════════════════════════════════════════════════════════════════
  // 1. Mixed number → top-heavy (improper) fraction — 3 questions
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "F1",
    sec: "A",
    marks: 1,
    type: "text",
    text: `Write 2${frac(1, 4)} as a top-heavy (improper) fraction.`,
    answer: "9/4",
    displayAnswer: frac(9, 4),
    normalize: normalizeFractionInput,
    check: v => checkFraction(v, "9/4"),
    hint: "Multiply the whole number by the denominator, then add the numerator.",
    explanation: `2${frac(1, 4)} = (2 × 4 + 1) over 4 = ${frac(9, 4)}`
  },

  {
    id: "F2",
    sec: "A",
    marks: 1,
    type: "text",
    text: `Write 3${frac(2, 5)} as a top-heavy (improper) fraction.`,
    answer: "17/5",
    displayAnswer: frac(17, 5),
    normalize: normalizeFractionInput,
    check: v => checkFraction(v, "17/5"),
    hint: "Multiply the whole number by the denominator, then add the numerator.",
    explanation: `3${frac(2, 5)} = (3 × 5 + 2) over 5 = ${frac(17, 5)}`
  },

  {
    id: "F3",
    sec: "A",
    marks: 1,
    type: "text",
    text: `Write 1${frac(5, 6)} as a top-heavy (improper) fraction.`,
    answer: "11/6",
    displayAnswer: frac(11, 6),
    normalize: normalizeFractionInput,
    check: v => checkFraction(v, "11/6"),
    hint: "Multiply the whole number by the denominator, then add the numerator.",
    explanation: `1${frac(5, 6)} = (1 × 6 + 5) over 6 = ${frac(11, 6)}`
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. Top-heavy fraction → mixed number — 3 questions
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "F4",
    sec: "A",
    marks: 1,
    type: "twotext",
    labels: ["Whole number", "Fraction"],
    text: `Write ${frac(9, 4)} as a mixed number.`,
    answer: ["2", "1/4"],
    displayAnswer: `2${frac(1, 4)}`,
    check: (input1, input2) => Number(input1) === 2 && checkFraction(input2, "1/4"),
    hint: "Write the inteer number as a fraction by myltiplying and dividing by the denominator of the fraction part, then add. ",
    explanation: `9 ÷ 4 = 2 remainder 1, so ${frac(9, 4)} = 2${frac(1, 4)}`
  },

  {
    id: "F5",
    sec: "A",
    marks: 1,
    type: "twotext",
    labels: ["Whole number", "Fraction"],
    text: `Write ${frac(17, 5)} as a mixed number.`,
    answer: [3, "2/5"],
    displayAnswer: `3${frac(2, 5)}`,
    checkPart: (i, v) => (i === 0 ? Number(v) === 3 : checkFraction(v, "2/5")),
    hint: "Write the inteer number as a fraction by myltiplying and dividing by the denominator of the fraction part, then add..",
    explanation: `17 ÷ 5 = 3 remainder 2, so ${frac(17, 5)} = 3${frac(2, 5)}`
  },

  {
    id: "F6",
    sec: "A",
    marks: 1,
    type: "twotext",
    labels: ["Whole number", "Fraction"],
    text: `Write ${frac(23, 6)} as a mixed number.`,
    answer: [3, "5/6"],
    displayAnswer: `3${frac(5, 6)}`,
    checkPart: (i, v) => (i === 0 ? Number(v) === 3 : checkFraction(v, "5/6")),
    hint: "Write the inteer number as a fraction by myltiplying and dividing by the denominator of the fraction part, then add.",
    explanation: `23 ÷ 6 = 3 remainder 5, so ${frac(23, 6)} = 3${frac(5, 6)}`
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. Fraction addition — 3 questions (1 same denominator, 2 different)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "F7",
    sec: "A",
    marks: 1,
    type: "text",
    text: `Work out ${frac(1, 5)} + ${frac(2, 5)}\n\nGive your answer as a fraction in its simplest form.`,
    answer: "3/5",
    displayAnswer: frac(3, 5),
    normalize: normalizeFractionInput,
    check: v => checkFraction(v, "3/5"),
    hint: "The denominators are already the same. Just add the numerators.",
    explanation: `1 + 2 = 3, so ${frac(1, 5)} + ${frac(2, 5)} = ${frac(3, 5)}`
  },

  {
    id: "F8",
    sec: "A",
    marks: 1,
    type: "text",
    text: `Work out ${frac(1, 2)} + ${frac(1, 3)}\n\nGive your answer as a fraction in its simplest form.`,
    answer: "5/6",
    displayAnswer: frac(5, 6),
    normalize: normalizeFractionInput,
    check: v => checkFraction(v, "5/6"),
    hint: "Find a common denominator (6) before adding.",
    explanation: `${frac(1, 2)} = ${frac(3, 6)} and ${frac(1, 3)} = ${frac(2, 6)}. 3 + 2 = 5, so the answer is ${frac(5, 6)}`
  },

  {
    id: "F9",
    sec: "A",
    marks: 1,
    type: "text",
    text: `Work out ${frac(2, 3)} + ${frac(1, 4)}\n\nGive your answer as a fraction in its simplest form.`,
    answer: "11/12",
    displayAnswer: frac(11, 12),
    normalize: normalizeFractionInput,
    check: v => checkFraction(v, "11/12"),
    hint: "Find a common denominator (12) before adding.",
    explanation: `${frac(2, 3)} = ${frac(8, 12)} and ${frac(1, 4)} = ${frac(3, 12)}. 8 + 3 = 11, so the answer is ${frac(11, 12)}`
  },

  // ═══════════════════════════════════════════════════════════════════
  // 4. Fraction ÷ fraction — 2 questions
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "F10",
    sec: "A",
    marks: 1,
    type: "text",
    text: `Work out ${frac(2, 3)} ÷ ${frac(1, 4)}\n\nGive your answer as a fraction in its simplest form.`,
    answer: "8/3",
    displayAnswer: frac(8, 3),
    normalize: normalizeFractionInput,
    check: v => checkFraction(v, "8/3"),
    hint: "To divide by a fraction, multiply by its reciprocal (flip it upside down).",
    explanation: `${frac(2, 3)} ÷ ${frac(1, 4)} = ${frac(2, 3)} × ${frac(4, 1)} = ${frac(8, 3)}`
  },

  {
    id: "F11",
    sec: "A",
    marks: 1,
    type: "text",
    text: `Work out ${frac(3, 5)} ÷ ${frac(2, 5)}\n\nGive your answer as a fraction in its simplest form.`,
    answer: "3/2",
    displayAnswer: frac(3, 2),
    normalize: normalizeFractionInput,
    check: v => checkFraction(v, "3/2"),
    hint: "To divide by a fraction, multiply by its reciprocal (flip it upside down).",
    explanation: `${frac(3, 5)} ÷ ${frac(2, 5)} = ${frac(3, 5)} × ${frac(5, 2)} = ${frac(15, 10)} = ${frac(3, 2)}`
  },

  // ═══════════════════════════════════════════════════════════════════
  // 5. Fraction → decimal — 4 questions
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "F12",
    sec: "A",
    marks: 1,
    type: "number",
    text: `Write ${frac(1, 4)} as a decimal.`,
    answer: 0.25,
    displayAnswer: "0.25",
    hint: "Divide the numerator by the denominator: 1 ÷ 4.",
    explanation: `1 ÷ 4 = 0.25`
  },

  {
    id: "F13",
    sec: "A",
    marks: 1,
    type: "number",
    text: `Write ${frac(3, 5)} as a decimal.`,
    answer: 0.6,
    displayAnswer: "0.6",
    hint: "Divide the numerator by the denominator: 3 ÷ 5.",
    explanation: `3 ÷ 5 = 0.6`
  },

  {
    id: "F14",
    sec: "A",
    marks: 1,
    type: "number",
    text: `Write ${frac(7, 8)} as a decimal.`,
    answer: 0.875,
    displayAnswer: "0.875",
    hint: "Divide the numerator by the denominator: 7 ÷ 8.",
    explanation: `7 ÷ 8 = 0.875`
  },

  {
    id: "F15",
    sec: "A",
    marks: 1,
    type: "number",
    text: `Write ${frac(2, 5)} as a decimal.`,
    answer: 0.4,
    displayAnswer: "0.4",
    hint: "Divide the numerator by the denominator: 2 ÷ 5.",
    explanation: `2 ÷ 5 = 0.4`
  },

  // ═══════════════════════════════════════════════════════════════════
  // 6. Percentage → fraction — 4 questions
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "F16",
    sec: "A",
    marks: 1,
    type: "text",
    text: "Write 25% as a fraction in its simplest form.",
    answer: "1/4",
    displayAnswer: frac(1, 4),
    normalize: normalizeFractionInput,
    check: v => checkFraction(v, "1/4"),
    hint: "Write the percentage over 100, then simplify.",
    explanation: `25% = ${frac(25, 100)} = ${frac(1, 4)}`
  },

  {
    id: "F17",
    sec: "A",
    marks: 1,
    type: "text",
    text: "Write 60% as a fraction in its simplest form.",
    answer: "3/5",
    displayAnswer: frac(3, 5),
    normalize: normalizeFractionInput,
    check: v => checkFraction(v, "3/5"),
    hint: "Write the percentage over 100, then simplify.",
    explanation: `60% = ${frac(60, 100)} = ${frac(3, 5)}`
  },

  {
    id: "F18",
    sec: "A",
    marks: 1,
    type: "text",
    text: "Write 75% as a fraction in its simplest form.",
    answer: "3/4",
    displayAnswer: frac(3, 4),
    normalize: normalizeFractionInput,
    check: v => checkFraction(v, "3/4"),
    hint: "Write the percentage over 100, then simplify.",
    explanation: `75% = ${frac(75, 100)} = ${frac(3, 4)}`
  },

  {
    id: "F19",
    sec: "A",
    marks: 1,
    type: "text",
    text: "Write 40% as a fraction in its simplest form.",
    answer: "2/5",
    displayAnswer: frac(2, 5),
    normalize: normalizeFractionInput,
    check: v => checkFraction(v, "2/5"),
    hint: "Write the percentage over 100, then simplify.",
    explanation: `40% = ${frac(40, 100)} = ${frac(2, 5)}`
  },

  // ═══════════════════════════════════════════════════════════════════
  // 7. Rounding — 5 questions (nearest 10/100, decimal places, sig figs)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "F20",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Round 346 to the nearest 10.",
    answer: 350,
    displayAnswer: "350",
    hint: "Is 346 closer to 340 or 350?",
    explanation: "346 is closer to 350 than to 340, so rounded to the nearest 10 it is 350."
  },

  {
    id: "F21",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Round 2378 to the nearest 100.",
    answer: 2400,
    displayAnswer: "2400",
    hint: "Is 2378 closer to 2300 or 2400?",
    explanation: "2378 is closer to 2400 than to 2300, so rounded to the nearest 100 it is 2400."
  },

  {
    id: "F22",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Round 5.678 to 1 decimal place.",
    answer: 5.7,
    displayAnswer: "5.7",
    hint: "Look at the second decimal digit to decide whether to round up or down.",
    explanation: "5.678 — the second decimal digit is 7, so round up: 5.7"
  },

  {
    id: "F23",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Round 0.0348 to 2 significant figures.",
    answer: 0.035,
    displayAnswer: "0.035",
    hint: "The first significant figure is the first non-zero digit. Count two from there.",
    explanation: "The first two significant figures are 3 and 4. The next digit (8) rounds the 4 up to 5, giving 0.035."
  },

  {
    id: "F24",
    sec: "A",
    marks: 1,
    type: "number",
    text: "Round 4562 to 2 significant figures.",
    answer: 4600,
    displayAnswer: "4600",
    hint: "The first two significant figures are 4 and 5. Look at the next digit to round.",
    explanation: "The first two significant figures are 4 and 5. The next digit (6) rounds the 5 up to 6, giving 4600."
  }

];

export default questions;