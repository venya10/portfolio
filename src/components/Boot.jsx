import { useEffect, useState } from "react";

const LINES = [
  ["ok", "booting venya.os v26.10"],
  ["ok", "loading models ........... llm, isolation-forest, yolo-nano"],
  ["ok", "mounting /projects"],
  ["ok", "indexing experience.log"],
  ["ok", "calibrating sensors"],
  ["ok", "starting shell"],
];
const STEP_MS = 190;

// Short boot log. Plays once per browser session; any key, click or tap skips it.
export default function Boot({ onDone }) {
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (shown < LINES.length) {
      const t = setTimeout(() => setShown((n) => n + 1), STEP_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLeaving(true), 280);
    return () => clearTimeout(t);
  }, [shown]);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onDone, 260);
    return () => clearTimeout(t);
  }, [leaving, onDone]);

  useEffect(() => {
    const skip = () => setLeaving(true);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <div className={`boot${leaving ? " leaving" : ""}`} role="status" aria-label="Loading">
      <div className="boot-log">
        {LINES.slice(0, shown).map(([state, text]) => (
          <div key={text}>
            <span className="dim">[</span>
            <span className="ok"> {state} </span>
            <span className="dim">]</span> {text}
          </div>
        ))}
        {shown < LINES.length && <span className="cursor" />}
      </div>
      <p className="boot-skip dim">press any key to skip</p>
    </div>
  );
}
