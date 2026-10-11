import { useEffect, useState } from "react";
import { profile } from "../data.js";

const NAMES = { top: "whoami", shell: "shell" };

function dubaiTime() {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Asia/Dubai",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// vim/tmux-style status line pinned to the bottom of the screen.
export default function StatusBar({ theme, sections, ready }) {
  const [active, setActive] = useState("top");
  const [time, setTime] = useState(dubaiTime);

  useEffect(() => {
    const t = setInterval(() => setTime(dubaiTime()), 15000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ready, sections]);

  const mode = active === "shell" ? "INSERT" : "NORMAL";

  return (
    <footer className="statusbar" aria-hidden="true">
      <span className="mode">{mode}</span>
      <span className="seg">~/{NAMES[active] || active}</span>
      <span className="spacer" />
      <span className="seg hide-sm">theme:{theme}</span>
      <span className="seg hide-sm">dubai {time}</span>
      <span className="seg">
        <span className="live-dot" /> {profile.status}
      </span>
    </footer>
  );
}
