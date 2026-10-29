import { useCallback, useRef, useState } from "react";

/**
 * Slider avant / après — glisser pour comparer (Refonte).
 */
export default function BeforeAfter({ before, after }) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const track = useRef(null);

  const setFromClientX = useCallback((clientX) => {
    const el = track.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="formule-ba">
      <div
        className="formule-ba__frame"
        ref={track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="group"
        aria-label="Comparaison avant et après"
      >
        <img src={after} alt="Après refonte" className="formule-ba__img" draggable={false} />
        <img
          src={before}
          alt="Avant refonte"
          className="formule-ba__img formule-ba__img--before"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />
        <div className="formule-ba__handle" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="formule-ba__knob" />
        </div>
        <span className="formule-ba__tag formule-ba__tag--before">Avant</span>
        <span className="formule-ba__tag formule-ba__tag--after">Après</span>
      </div>
      <input
        className="formule-ba__range"
        type="range"
        min="4"
        max="96"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Position du curseur avant / après"
      />
    </div>
  );
}
