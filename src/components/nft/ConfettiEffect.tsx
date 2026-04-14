import { useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

export function ConfettiEffect({ active, duration = 3000 }: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = '';

    const colors = ['#6C63FF', '#38B2AC', '#FFD700', '#FF6B9D', '#B9F2FF', '#CD7F32', '#C0C0C0'];
    const shapes = ['circle', 'rect', 'triangle'];

    for (let i = 0; i < 80; i++) {
      const el = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = 6 + Math.random() * 8;
      const left = Math.random() * 100;
      const delay = Math.random() * 1.5;
      const spinDuration = 1 + Math.random() * 2;

      el.style.cssText = `
        position: absolute;
        top: -20px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        opacity: 0.9;
        animation: confettiFall ${2 + Math.random() * 2}s ease-in ${delay}s forwards,
                   confettiSpin ${spinDuration}s linear ${delay}s infinite;
        z-index: 100;
      `;

      if (shape === 'circle') el.style.borderRadius = '50%';
      if (shape === 'triangle') {
        el.style.width = '0';
        el.style.height = '0';
        el.style.background = 'transparent';
        el.style.borderLeft = `${size / 2}px solid transparent`;
        el.style.borderRight = `${size / 2}px solid transparent`;
        el.style.borderBottom = `${size}px solid ${color}`;
      }

      container.appendChild(el);
    }

    const timer = setTimeout(() => { container.innerHTML = ''; }, duration);
    return () => clearTimeout(timer);
  }, [active, duration]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 9999,
      }}
    />
  );
}
