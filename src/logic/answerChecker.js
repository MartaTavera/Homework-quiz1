export function checkAnswer(q, a) {
  let correct = false;
  let userDisplay = "";

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }
  function parseFraction(str) {
    const c = String(str).trim().replace(/\s+/g, "");
    const p = c.split("/");
    if (p.length !== 2) return null;
    const n = parseInt(p[0], 10), d = parseInt(p[1], 10);
    if (isNaN(n) || isNaN(d) || d === 0) return null;
    return [n, d];
  }
  function simplifyFraction(n, d) { const g = gcd(n, d); let a = n / g, b = d / g; if (b < 0) { a = -a; b = -b; } return [a, b]; }
  function checkFraction(sub, target) {
    const a = parseFraction(sub), b = parseFraction(target);
    if (!a || !b) return false;
    const [an, ad] = simplifyFraction(a[0], a[1]);
    const [bn, bd] = simplifyFraction(b[0], b[1]);
    return an === bn && ad === bd;
  }
  switch (q.type) {
    case "number": {
      correct = q.check
        ? q.check(a.input)
        : Number.isInteger(q.answer)
          ? parseInt(a.input) === q.answer
          : Math.abs(parseFloat(a.input) - q.answer) < 0.01;
      userDisplay = a.input;
      break;
    }
    case "text": {
      const norm = q.normalize ? q.normalize(a.input) : a.input.trim();
      correct = q.check ? q.check(norm) : norm === q.answer;
      userDisplay = a.input;
      break;
    }
    case "choice": {
      correct = a.selected === q.answer;
      userDisplay = a.selected;
      break;
    }
    case "yesno": {
      correct = a.yesNo === q.answer;
      userDisplay = a.yesNo;
      break;
    }
    case "parcel": {
      correct = a.selected === q.answer;
      userDisplay = a.selected ? a.selected.replace("/", " cm / ") + " kg" : "";
      break;
    }
    case "twonumber": {
      const v1 = parseInt(a.input), v2 = parseInt(a.input2);
      correct = v1 === q.answer[0] && v2 === q.answer[1];
      userDisplay = `${a.input} documents, ${a.input2} sheets`;
      break;
    }

    case "order": {
      // a.inputs: string[] — one entry per blank, in the order the user provided
      const norm = v => v.trim().toLowerCase();
      correct =
        Array.isArray(a.inputs) &&
        a.inputs.length === q.answer.length &&
        a.inputs.every((v, i) => norm(v) === norm(q.answer[i]));
      userDisplay = Array.isArray(a.inputs) ? a.inputs.join(", ") : "";
      break;
    }

    case "multi": {
      // a.selected: string[] — the options the user ticked
      const norm = arr => [...arr].map(v => v.trim()).sort().join("|");
      correct =
        Array.isArray(a.selected) &&
        norm(a.selected) === norm(q.answer);
      userDisplay = Array.isArray(a.selected) ? a.selected.join(", ") : "";
      break;
    }
    case "twotext": {
      // Order-independent: the pair of inputs must match the pair of answers
      const norm = v => v.trim().toLowerCase();
      const given = [norm(a.input ?? ""), norm(a.input2 ?? "")].sort();
      const expect = [...q.answer].map(norm).sort();
      correct = given[0] === expect[0] && given[1] === expect[1];
      userDisplay = [a.input, a.input2].filter(Boolean).join(", ");
      break;
    }
    case "threetext": {
      if (typeof q.check === "function") {
        correct = q.check(a.input, a.input2, a.input3);
        userDisplay = [a.input, a.input2, a.input3].filter(Boolean).join(", ");
        break;
      }
      const norm = v => v.trim().toLowerCase();
      const given  = [norm(a.input ?? ""), norm(a.input2 ?? ""), norm(a.input3 ?? "")].sort();
      const expect = [...q.answer].map(norm);
      correct = given[0] === expect[0] && given[1] === expect[1] && given[2] === expect[2];
      userDisplay = [a.input, a.input2, a.input3].filter(Boolean).join(", ");
      break;
    }
    case "table": {
      // a.inputs: Record<string, string> — keyed by row label, value is what the user typed
      // q.answer: Record<string, number|string> — same keys, expected values
      if (!a.inputs || typeof a.inputs !== "object") break;
      const entries = Object.entries(q.answer);
      correct = entries.every(([key, expected]) => {
        const raw = (a.inputs[key] ?? "").trim();
        // Support numeric cells (loose equality after parsing) and string cells
        return typeof expected === "number"
          ? parseInt(raw) === expected
          : raw.toLowerCase() === String(expected).toLowerCase();
      });
      userDisplay = Object.entries(a.inputs)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      break;
    }

    default:
      break;
  }

  return { correct, userDisplay };
}