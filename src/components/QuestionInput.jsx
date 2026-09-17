import { C } from "../config/constants";

export function QuestionInput({ q, a, onUpdate, onSubmit, canSubmit }) {
  const upd = patch => onUpdate(patch);

  if (q.type === "number" || q.type === "text") {
    return (
      <div style={{ display: "flex", alignItems: "center", border: `2px solid ${C.bdr}`, borderRadius: 8, marginBottom: 18, overflow: "hidden" }}>
        <input
          type={q.type === "number" ? "number" : "text"}
          value={a.input}
          onChange={e => upd({ input: e.target.value })}
          onKeyDown={e => e.key === "Enter" && canSubmit && onSubmit()}
          placeholder="Enter your answer…"
          style={{ flex: 1, padding: "13px 16px", border: "none", fontSize: 20, outline: "none", boxSizing: "border-box" }}
        />
        {q.suffix && (
          <span style={{ padding: "13px 16px", background: "#f1f5f9", color: C.neu, fontSize: 18, fontWeight: 600, borderLeft: `2px solid ${C.bdr}` }}>
            {q.suffix}
          </span>
        )}
      </div>
    );
  }

  if (q.type === "twonumber") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
        {q.labels.map((label, i) => (
          <div key={i}>
            <div style={{ fontSize: 19, fontWeight: 600, color: C.neu, marginBottom: 5 }}>{label}</div>
            <input
              type="number"
              value={i === 0 ? a.input : a.input2}
              onChange={e => upd(i === 0 ? { input: e.target.value } : { input2: e.target.value })}
              onKeyDown={e => e.key === "Enter" && canSubmit && onSubmit()}
              placeholder={`Enter  ${label}…`}
              style={{ width: "100%", padding: "13px 16px", border: `2px solid ${C.bdr}`, borderRadius: 8, fontSize: 16, outline: "none", boxSizing: "border-box" }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (q.type === "choice") {
    const sc = q.sec === "A" ? C.a : C.b;
    return (
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 100, marginBottom: 18 }}>
        {q.options.map(opt => (
          <button key={opt} onClick={() => upd({ selected: opt })}
            style={{ padding: "12px 16px", border: `2px solid ${a.selected === opt ? sc : C.bdr}`, borderRadius: 8, background: a.selected === opt ? (q.sec === "A" ? "#e0f2fe" : "#ede9fe") : "#fff", color: a.selected === opt ? sc : "#334155", fontSize: 16, cursor: "pointer", textAlign: "left", fontWeight: a.selected === opt ? 600 : 400, transition: "all 0.12s" }}>
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (q.type === "yesno") {
    const sc = q.sec === "A" ? C.a : C.b;
    return (
      <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
        {["Yes", "No"].map(v => (
          <button key={v} onClick={() => upd({ yesNo: v })}
            style={{ flex: 1, padding: "16px", border: `2px solid ${a.yesNo === v ? sc : C.bdr}`, borderRadius: 8, background: a.yesNo === v ? (q.sec === "A" ? "#e0f2fe" : "#ede9fe") : "#fff", color: a.yesNo === v ? sc : "#334155", fontSize: 20, fontWeight: 600, cursor: "pointer", transition: "all 0.12s" }}>
            {v}
          </button>
        ))}
      </div>
    );
  }

  if (q.type === "parcel") {
    return <ParcelTable sel={a.selected} onSel={v => upd({ selected: v })} />;
  }

  if (q.type === "multi") {
    const selected = a.selected ?? [];
    const toggle = opt => {
      const next = selected.includes(opt)
        ? selected.filter(v => v !== opt)
        : [...selected, opt];
      upd({ selected: next });
    };
    return (
      <div style={{ display: "flex", flexDirection: "row",flexWrap:"wrap", gap: 30, marginBottom: 18 }}>
        {q.options.map(opt => {
          const checked = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              style={{
                display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center",
                padding: "13px 22px", borderRadius: 10, cursor: "pointer", textAlign: "left",
                border: `2px solid ${checked ? C.pri : C.bdr}`,
                background: checked ? C.priLight : "#fff",
                color: C.txt, fontSize: 17, fontWeight: checked ? 600 : 400,
                transition: "border-color 0.15s, background 0.15s",
              }}
            >
              <span>{opt}</span>
              {/* Tick indicator on the right */}
              <span style={{
                width: 22, height: 22, borderRadius: 4, flexShrink: 0,
                border: `2px solid ${checked ? C.pri : C.bdr}`,
                background: checked ? C.pri : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s, border-color 0.15s",
              }}>
                {checked && (
                  <svg width="8" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // ── table ─────────────────────────────────────────────────────────────────
  if (q.type === "table") {
    const inputs = a.inputs ?? {};
    const setCell = (key, val) => upd({ inputs: { ...inputs, [key]: val } });
    const { headers, rows } = q.tableData;
  
    return (
      <div style={{ marginBottom: 18, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
          <thead>
            <tr>
              {headers.map(h => (
                <th key={h} style={{
                  padding: "9px 14px", background: C.pri, color: "#fff",
                  fontWeight: 700, textAlign: "left", border: `1px solid ${C.bdr}`,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "#f8fafc" }}>
  
                {/* Label cell — always static */}
                <td style={{ padding: "8px 14px", border: `1px solid ${C.bdr}`, fontWeight: 600, color: C.txt }}>
                  {row.label}
                </td>
  
                {/* Value cell — static text OR editable input */}
                <td style={{ padding: "6px 10px", border: `1px solid ${C.bdr}` }}>
                  {row.valueEditable ? (
                    <input
                      type="text"
                      value={inputs[`${row.label}_temp`] ?? ""}
                      onChange={e => setCell(`${row.label}_temp`, e.target.value)}
                      placeholder="?"
                      style={{
                        width: "100%", padding: "7px 10px", fontSize: 16,
                        border: `2px solid ${C.bdr}`, borderRadius: 6,
                        outline: "none", boxSizing: "border-box",
                      }}
                    />
                  ) : (
                    <span style={{ color: C.neu, fontWeight: 600 }}>{row.value ?? "—"}</span>
                  )}
                </td>
  
                {/* Answer cell — yes/no input or blank rows input */}
                {!row.given && (
                  <td style={{ padding: "6px 10px", border: `1px solid ${C.bdr}` }}>
                    <input
                      type="text"
                      value={inputs[row.valueEditable ? `${row.label}_yn` : row.label] ?? ""}
                      onChange={e => setCell(row.valueEditable ? `${row.label}_yn` : row.label, e.target.value)}
                      placeholder="?"
                      style={{
                        width: "100%", padding: "7px 10px", fontSize: 16,
                        border: `2px solid ${C.bdr}`, borderRadius: 6,
                        outline: "none", boxSizing: "border-box",
                      }}
                    />
                  </td>
                )}
  
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  if (q.type === "twotext") {
    const labels = q.labels ?? ["First answer", "Second answer"];
    return (
      <div style={{ marginBottom: 18 }}>
        {[
          { label: labels[0], key: "input", val: a.input ?? "" },
          { label: labels[1], key: "input2", val: a.input2 ?? "" },
        ].map(({ label, key, val }, i) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <label style={{ display: "block", fontSize: 18, fontWeight: 600, color: C.neu, marginBottom: 4 }}>
              {label}
            </label>
            <input
              type="text"
              value={val}
              onChange={e => upd({ [key]: e.target.value })}
              onKeyDown={e => e.key === "Enter" && i === 1 && canSubmit && onSubmit()}
              placeholder="Enter your answer…"
              style={{
                width: "100%", padding: "11px 14px", fontSize: 18,
                border: `2px solid ${C.bdr}`, borderRadius: 8,
                outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
        ))}
      </div>
    );
  }
  if (q.type === "threetext") {
    const labels = q.labels ?? ["First answer", "Second answer", "Third answer"];
    return (
      <div style={{ marginBottom: 18 }}>
        {[
          { label: labels[0], key: "input", val: a.input ?? "" },
          { label: labels[1], key: "input2", val: a.input2 ?? "" },
          { label: labels[2], key: "input3", val: a.input3 ?? "" },
        ].map(({ label, key, val }, i) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <label style={{ display: "block", fontSize: 20, fontWeight: 600, color:"black" , marginBottom: 4 }}>
              {label}
            </label>
            <input
              type="text"
              value={val}
              onChange={e => upd({ [key]: e.target.value })}
              onKeyDown={e => e.key === "Enter" && i === 2 && canSubmit && onSubmit()}
              placeholder="…"
              style={{
                width: "100%", padding: "11px 14px", fontSize: 18,
                border: `2px solid ${C.bdr}`, borderRadius: 8,
                outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
        ))}
      </div>
    );
  }
  if (q.type === "order") {
    const inputs = a.inputs ?? Array(q.answer.length).fill("");
    const setAt = (i, val) => {
      const next = [...inputs];
      next[i] = val;
      upd({ inputs: next });
    };
    return (
      <div style={{ marginBottom: 18 }}>
        {inputs.map((val, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ minWidth: 24, fontWeight: 700, color: C.neu, fontSize: 15 }}>{i + 1}.</span>
            <input
              type="text"
              value={val}
              onChange={e => setAt(i, e.target.value)}
              onKeyDown={e => e.key === "Enter" && i === inputs.length - 1 && canSubmit && onSubmit()}
              placeholder={`…`}
              style={{ flex: 1, padding: "10px 14px", border: `2px solid ${C.bdr}`, borderRadius: 8, fontSize: 17, outline: "none", boxSizing: "border-box" }}
            />
          </div>
        ))}
      </div>
    );

  }
  return null;
}