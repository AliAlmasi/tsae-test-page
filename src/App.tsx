import { useEffect, useState } from "react";
import "./App.css";

export default function App({ rows = 3, cols = 8 }) {
  const [selected, setSelected] = useState(Array(rows).fill(null));

  useEffect(() => {
    setSelected((prev) => {
      if (prev.length === rows) return prev;
      const next = Array(rows).fill(null);
      for (let i = 0; i < Math.min(prev.length, rows); i++) next[i] = prev[i];
      return next;
    });
  }, [rows]);

  const handleToggle = (r: number, c: number) => {
    setSelected((prev) => {
      const next = prev.slice();
      next[r] = prev[r] === c ? null : c;
      return next;
    });
  };

  const handleClear = () => setSelected(Array(rows).fill(null));

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
      <h1>TVU Survey Simulator</h1>
      <p>
        This page simulates the TVU Iran survey page for{" "}
        <a
          target="_blank"
          href="https://github.com/alialmasi/tvu-survey-autofill-extension"
          style={{ fontStyle: "italic", textDecoration: "none" }}
        >
          TVU Survey Autofill
        </a>{" "}
        extension to test it.
      </p>

      <table
        border={1}
        style={{
          width: "40rem",
          margin: "0 auto",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, c) => (
              <th key={c}>{c + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r} id={`row${r + 1}`}>
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c}>
                  <input
                    type="checkbox"
                    id={`SurveyQuestionID_${r + 1}_${c + 1}`}
                    name={`row${r + 1}-col${c + 1}`}
                    checked={selected[r] === c}
                    onChange={() => handleToggle(r, c)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 12 }}>
        <button onClick={handleClear} style={{ fontSize: "larger" }}>
          Clear
        </button>
      </div>
    </div>
  );
}
