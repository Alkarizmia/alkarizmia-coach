/**
 * Petite explosion de confettis depuis un élément — canvas, sans librairie.
 */
import { prefersReducedMotion } from "./motion.js";

const COLORS = ["#A34F3C", "#B5654A", "#4F8A74", "#1F4D3F", "#F7F4EE", "#D4A373"];
const DURATION_MS = 1500;

let stopCurrent = null;

export function burstConfetti(originEl) {
  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) return;
  if (!originEl) return;

  stopCurrent?.();

  const rect = originEl.getBoundingClientRect();
  const ox = rect.left + rect.width / 2;
  const oy = rect.top + rect.height / 2;
  const dpr = Math.min(2, window.devicePixelRatio || 1);

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:180;";
  const resize = () => {
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
  };
  resize();
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const particles = Array.from({ length: 72 }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.15;
    const speed = 6 + Math.random() * 9;
    return {
      x: ox,
      y: oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: 5 + Math.random() * 7,
      h: 3 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.45,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  });

  const start = performance.now();
  let frame = 0;

  const tick = (now) => {
    const t = Math.min(1, (now - start) / DURATION_MS);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const alpha = 1 - t;
    particles.forEach((p) => {
      p.vy += 0.32;
      p.vx *= 0.992;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (t < 1) {
      frame = requestAnimationFrame(tick);
    } else {
      stopCurrent?.();
    }
  };

  stopCurrent = () => {
    cancelAnimationFrame(frame);
    canvas.remove();
    stopCurrent = null;
  };

  frame = requestAnimationFrame(tick);
}
