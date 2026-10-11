import { useCallback, useEffect, useRef, useState } from "react";
import { complete, run } from "./commands.jsx";
import Boot from "./components/Boot.jsx";
import Neofetch from "./components/Neofetch.jsx";
import SensorChart from "./components/SensorChart.jsx";
import { Contact, Education, Experience, Projects, Skills, Whoami } from "./components/Sections.jsx";
import StatusBar from "./components/StatusBar.jsx";
import Typed from "./components/Typed.jsx";
import { profile, themes } from "./data.js";

const reduceMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function store(kind, key, value) {
  try {
    const s = kind === "local" ? window.localStorage : window.sessionStorage;
    if (value === undefined) return s.getItem(key);
    s.setItem(key, value);
  } catch {
    return null;
  }
}

// The page is a terminal session that has already "run" these commands.
const SECTIONS = [
  { id: "about", nav: "about", cmd: "neofetch", body: <Neofetch /> },
  { id: "demo", nav: "demo", cmd: "./anomaly-detector --live", body: <SensorChart /> },
  { id: "experience", nav: "experience", cmd: "git log --graph experience", body: <Experience /> },
  { id: "projects", nav: "projects", cmd: "tree projects/", body: <Projects anchor /> },
  { id: "skills", nav: "skills", cmd: "skills --list", body: <Skills /> },
  { id: "education", nav: null, cmd: "cat education.txt", body: <Education /> },
  { id: "contact", nav: "contact", cmd: "contact", body: <Contact /> },
];

const STATUS_SECTIONS = ["top", ...SECTIONS.map((s) => s.id), "shell"];

const QUICK = ["help", "neofetch", "projects", "anomaly", "theme", "contact"];

function Prompt({ children }) {
  return (
    <>
      <span className="ps1" aria-hidden="true">
        <span className="accent">{profile.handle}@portfolio</span>
        <span className="dim">:</span>
        <span className="path">~</span>
        <span className="dim">$</span>{" "}
      </span>
      {children}
    </>
  );
}

export default function App() {
  const [theme, setThemeState] = useState(() => {
    const saved = store("local", "theme");
    return themes.includes(saved) ? saved : themes[0];
  });
  const [booted, setBooted] = useState(() => reduceMotion || store("session", "booted") === "1");
  const [heroDone, setHeroDone] = useState(booted);
  const [entries, setEntries] = useState([]);
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    store("local", "theme", theme);
  }, [theme]);

  const finishBoot = useCallback(() => {
    store("session", "booted", "1");
    setBooted(true);
  }, []);
  const finishHero = useCallback(() => setHeroDone(true), []);

  // Reveal sections as they scroll into view.
  useEffect(() => {
    if (!heroDone) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".block").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [heroDone]);

  useEffect(() => {
    if (entries.length) endRef.current?.scrollIntoView({ block: "end", behavior: reduceMotion ? "auto" : "smooth" });
  }, [entries]);

  function execute(cmd) {
    const ctx = {
      theme,
      history,
      setTheme: setThemeState,
      clear: () => {
        setEntries([]);
        return null;
      },
    };
    const out = run(cmd, ctx);
    if (cmd.trim().split(/\s+/)[0] !== "clear") {
      setEntries((e) => [...e, { id: Date.now() + Math.random(), cmd, out }]);
    }
    if (cmd.trim()) setHistory((h) => [...h, cmd.trim()]);
    setHistIdx(-1);
    setInput("");
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      execute(input);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const c = complete(input);
      if (c) setInput(c);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const i = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const i = histIdx + 1;
      if (i >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(i);
        setInput(history[i]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  }

  return (
    <>
      {!booted && <Boot onDone={finishBoot} />}

      <a className="skip" href="#main">
        Skip to content
      </a>

      <nav className="topbar" aria-label="Sections">
        <a href="#top" className="brand">
          <span className="accent">~</span>/{profile.handle}
        </a>
        <ul>
          {SECTIONS.filter((s) => s.nav).map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.nav}</a>
            </li>
          ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="accent">
              resume ↗
            </a>
          </li>
        </ul>
      </nav>

      <main id="main" className="term">
        <section id="top" className="hero" aria-label="Introduction">
          <div className="cmd">
            <Prompt>
              <Typed text="whoami" start={booted} instant={reduceMotion || heroDone} onDone={finishHero} />
            </Prompt>
          </div>
          <div className={`out${heroDone ? " shown" : ""}`}>{heroDone && <Whoami heading />}</div>
        </section>

        {heroDone &&
          SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="block" aria-labelledby={`${s.id}-cmd`}>
              <h2 className="cmd" id={`${s.id}-cmd`}>
                <Prompt>{s.cmd}</Prompt>
                <span className="sr-only"> — {s.id}</span>
              </h2>
              <div className="out">{s.body}</div>
            </section>
          ))}

        {heroDone && (
          <section id="shell" className="shell" aria-label="Interactive terminal">
            <p className="dim shell-intro">
              # this part is live. type a command, or click one:{" "}
              {QUICK.map((q) => (
                <button key={q} type="button" className="chip-btn" onClick={() => execute(q)}>
                  {q}
                </button>
              ))}
            </p>

            <div aria-live="polite">
              {entries.map((en) => (
                <div key={en.id} className="entry">
                  <div className="cmd">
                    <Prompt>{en.cmd}</Prompt>
                  </div>
                  {en.out != null && <div className="out">{en.out}</div>}
                </div>
              ))}
            </div>

            <label className="cmd input-line" ref={endRef}>
              <Prompt>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  aria-label="Terminal command"
                  placeholder="type 'help'"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  enterKeyHint="go"
                />
              </Prompt>
            </label>
          </section>
        )}
      </main>

      <StatusBar theme={theme} sections={STATUS_SECTIONS} ready={heroDone} />
    </>
  );
}
