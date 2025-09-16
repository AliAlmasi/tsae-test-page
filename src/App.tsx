import { useEffect, useState } from "react";
import "./App.css";

export default function App({ rows = 3, cols = 8 }) {
  const [selected, setSelected] = useState(Array(rows).fill(null));

  const checkboxesIdPrefix = "SurveyQuestionID";

  useEffect(() => {
    setSelected((prev) => {
      if (prev.length === rows) return prev;
      const next = Array(rows).fill(null);
      for (let i = 0; i < Math.min(prev.length, rows); i++) next[i] = prev[i];
      return next;
    });
  }, [rows]);

  const handleToggle = (row: number, col: number) => {
    setSelected((prev) => {
      const next = prev.slice();
      next[row] = prev[row] === col ? null : col;
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
        style={{
          width: "40rem",
          margin: "0 auto",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Questions &darr; / Answers &rarr;</th>
            {Array.from({ length: cols }).map((_, col) => (
              <th key={col}>{col + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, row) => (
            <>
              <tr key={row} id={`row${row + 1}`}>
                <td>Question {row + 1}</td>
                {Array.from({ length: cols }).map((_, col) => (
                  <td key={col}>
                    <input
                      type="checkbox"
                      id={`${checkboxesIdPrefix}_${row + 1}_${col + 1}`}
                      name={`row${row + 1}-col${col + 1}`}
                      checked={selected[row] === col}
                      onChange={() => handleToggle(row, col)}
                    />
                  </td>
                ))}
              </tr>
            </>
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
