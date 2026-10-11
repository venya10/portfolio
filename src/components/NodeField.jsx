import { useEffect, useRef } from "react";

// Drifting point cloud with links between nearby nodes — a quiet nod to
// neural nets / sensor graphs. Nodes lean gently toward the cursor.
export default function NodeField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    let nodes = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const colors = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        node: s.getPropertyValue("--node").trim(),
        link: s.getPropertyValue("--link").trim(),
        hot: s.getPropertyValue("--accent-2").trim(),
      };
    };
    let palette = colors();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (width * height) / 14000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.8,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const maxDist = 130;

      for (const n of nodes) {
        if (!reduceMotion) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 180 && d > 1) {
            n.vx += (dx / d) * 0.008;
            n.vy += (dy / d) * 0.008;
          }
          n.vx *= 0.99;
          n.vy *= 0.99;
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxDist) {
            ctx.globalAlpha = (1 - d / maxDist) * 0.6;
            ctx.strokeStyle = palette.link;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const near = Math.hypot(pointer.x - n.x, pointer.y - n.y) < 120;
        ctx.globalAlpha = 1;
        ctx.fillStyle = near ? palette.hot : palette.node;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r + 1 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }
    function onLeave() {
      pointer.x = pointer.y = -9999;
    }
    function onResize() {
      resize();
      if (reduceMotion) draw();
    }

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      palette = colors();
      if (reduceMotion) draw();
    };

    resize();
    draw();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    scheme.addEventListener("change", onScheme);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      scheme.removeEventListener("change", onScheme);
    };
  }, []);

  return <canvas ref={canvasRef} className="node-field" aria-hidden="true" />;
}
