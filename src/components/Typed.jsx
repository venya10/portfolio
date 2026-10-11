import { useEffect, useState } from "react";

// Types `text` one character at a time once `start` is true, then calls onDone.
export default function Typed({ text, start, instant, onDone, speed = 85 }) {
  const [count, setCount] = useState(instant ? text.length : 0);

  useEffect(() => {
    if (!start) return;
    if (count >= text.length) {
      const t = setTimeout(onDone, instant ? 0 : 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount((c) => c + 1), speed + Math.random() * 60);
    return () => clearTimeout(t);
  }, [start, count, text, speed, instant, onDone]);

  return (
    <>
      {text.slice(0, count)}
      {count < text.length && <span className="cursor" />}
    </>
  );
}
