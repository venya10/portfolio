import { useEffect, useRef, useState } from "react";

// A live ASCII chart of synthetic sensor readings. A rolling z-score detector
// flags spikes as anomalies — a small, honest demo of the kind of work I did
// on fleet telemetry at Tenderd.

const ROWS = 6;
const WINDOW = 30;
const Z_LIMIT = 3;
const TICK_MS = 380;
const BLOCKS = " ▁▂▃▄▅▆▇█";

let t = 0;
function nextReading() {
  t += 1;
  const base = 50 + 9 * Math.sin(t / 7) + 4 * Math.sin(t / 2.3);
  const noise = (Math.random() - 0.5) * 6;
  // Occasional fault: a sharp spike or a dropout.
  const fault = Math.random() < 0.035 ? (Math.random() < 0.75 ? 34 : -30) : 0;
  return Math.max(2, Math.min(98, base + noise + fault));
}

function isAnomaly(history, value) {
  const win = history.slice(-WINDOW);
  if (win.length < 10) return null;
  const mean = win.reduce((a, b) => a + b, 0) / win.length;
  const sd = Math.sqrt(win.reduce((a, b) => a + (b - mean) ** 2, 0) / win.length) || 1;
  const z = (value - mean) / sd;
  return Math.abs(z) > Z_LIMIT ? z : null;
}

function step(state) {
  const value = nextReading();
  const z = isAnomaly(
    state.points.map((p) => p.v),
    value,
  );
  const point = { v: value, z, id: t };
  const points = [...state.points, point].slice(-200);
  const log = z
    ? [
        {
          id: t,
          time: new Date().toLocaleTimeString("en-GB", { hour12: false }),
          msg: `${z > 0 ? "spike" : "dropout"} on hyd_pressure_03  z=${z.toFixed(1)}  → flagged`,
        },
        ...state.log,
      ].slice(0, 3)
    : state.log;
  return { points, log, flagged: state.flagged + (z ? 1 : 0), seen: state.seen + 1 };
}

function seed() {
  let s = { points: [], log: [], flagged: 0, seen: 0 };
  for (let i = 0; i < 120; i++) s = step(s);
  return s;
}

function cellChar(value, row) {
  // row 0 is the top. Each row covers 8 levels of the scaled value.
  const level = (value / 100) * ROWS * 8;
  const fromBottom = ROWS - 1 - row;
  const fill = level - fromBottom * 8;
  if (fill >= 8) return BLOCKS[8];
  if (fill <= 0) return " ";
  return BLOCKS[Math.round(fill)];
}

export default function SensorChart() {
  const wrapRef = useRef(null);
  const [cols, setCols] = useState(56);
  const [state, setState] = useState(seed);

  // Fit the number of columns to the available width.
  useEffect(() => {
    const el = wrapRef.current;
    const measure = () => {
      const probe = document.createElement("span");
      probe.textContent = "█".repeat(10);
      probe.style.visibility = "hidden";
      probe.style.position = "absolute";
      el.appendChild(probe);
      const ch = probe.getBoundingClientRect().width / 10 || 8;
      el.removeChild(probe);
      setCols(Math.max(20, Math.min(72, Math.floor((el.clientWidth - 4 * ch) / ch))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Tick only while visible, and not at all for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = null;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting) timer = setInterval(() => setState(step), TICK_MS);
    });
    io.observe(wrapRef.current);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  const visible = state.points.slice(-cols);

  return (
    <div className="sensor" ref={wrapRef}>
      <div className="dim">
        demo · synthetic telemetry · rolling z-score (window={WINDOW}, |z|&gt;{Z_LIMIT})
      </div>
      <pre
        className="chart"
        role="img"
        aria-label="Live chart of simulated sensor readings with anomalies highlighted in pink"
      >
        {Array.from({ length: ROWS }, (_, row) => (
          <div key={row}>
            <span className="dim">{row === 0 ? "100┤" : row === ROWS - 1 ? "  0┤" : "   │"}</span>
            {visible.map((p) => (
              <span key={p.id} className={p.z ? "anomaly" : undefined}>
                {cellChar(p.v, row)}
              </span>
            ))}
          </div>
        ))}
        <div>
          <span className="dim">{"   └"}</span>
          {visible.map((p) => (
            <span key={p.id} className={p.z ? "anomaly" : "dim"}>
              {p.z ? "▲" : "─"}
            </span>
          ))}
        </div>
      </pre>
      <div className="sensor-stats">
        <span>
          readings <span className="accent">{state.seen}</span>
        </span>
        <span>
          anomalies <span className="accent">{state.flagged}</span>
        </span>
        <span>
          rate <span className="accent">{((state.flagged / state.seen) * 100).toFixed(1)}%</span>
        </span>
      </div>
      <div className="sensor-log" aria-live="off">
        {state.log.length === 0 && <div className="dim">waiting for anomalies…</div>}
        {state.log.map((l) => (
          <div key={l.id}>
            <span className="dim">[{l.time}]</span> <span className="warn">WARN</span> {l.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
