import { useCallback, useRef, useState } from "react";

const AXIS_PX = 8;

/**
 * Slider avant / après — glisser horizontalement.
 * Le défilement vertical de la page reste libre.
 */
export default function BeforeAfter({ before, after }) {
  const [pos, setPos] = useState(50);
  const drag = useRef({
    active: false,
    axis: null,
    pointerId: null,
    startX: 0,
    startY: 0,
  });
  const track = useRef(null);

  const setFromClientX = useCallback((clientX) => {
    const el = track.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }, []);

  const endDrag = (e) => {
    const state = drag.current;
    if (state.pointerId != null && e?.currentTarget?.hasPointerCapture?.(state.pointerId)) {
      e.currentTarget.releasePointerCapture(state.pointerId);
    }
    drag.current = {
      active: false,
      axis: null,
      pointerId: null,
      startX: 0,
      startY: 0,
    };
  };

  const onPointerDown = (e) => {
    drag.current = {
      active: true,
      axis: null,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
    };
  };

  const onPointerMove = (e) => {
    const state = drag.current;
    if (!state.active) return;

    if (state.axis == null) {
      const dx = e.clientX - state.startX;
      const dy = e.clientY - state.startY;
      if (Math.abs(dx) < AXIS_PX && Math.abs(dy) < AXIS_PX) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        endDrag(e);
        return;
      }
      state.axis = "x";
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }

    if (state.axis === "x") {
      setFromClientX(e.clientX);
    }
  };

  return (
    <div className="formule-ba">
      <div
        className="formule-ba__frame"
        ref={track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="group"
        aria-label="Comparaison avant et après"
      >
        <img
          src={after}
          alt="Site de coach après refonte Alkarizmia : clair et lisible"
          className="formule-ba__img"
          width="390"
          height="844"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <img
          src={before}
          alt="Ancien site de coach avant refonte : lent et confus"
          className="formule-ba__img formule-ba__img--before"
          width="390"
          height="844"
          loading="lazy"
          decoding="async"
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
