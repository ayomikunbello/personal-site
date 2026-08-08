"use client";

import { useId, useState } from "react";

const WIDTH = 720;
const HEIGHT = 220;
const PAD_LEFT = 32;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

export default function ViewsChart({ data }: { data: { date: string; views: number }[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const gradientId = useId();

  const maxViews = Math.max(1, ...data.map((d) => d.views));
  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const stepX = data.length > 1 ? plotWidth / (data.length - 1) : 0;

  const points = data.map((d, i) => ({
    x: PAD_LEFT + i * stepX,
    y: PAD_TOP + plotHeight - (d.views / maxViews) * plotHeight,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1]?.x ?? PAD_LEFT},${PAD_TOP + plotHeight} L${PAD_LEFT},${PAD_TOP + plotHeight} Z`;

  // Grid lines at 0, 50%, 100% of max
  const gridValues = [0, 0.5, 1].map((f) => Math.round(maxViews * f));

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let closest = 0;
    let closestDist = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - x);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setHoverIndex(closest);
  }

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Recessive grid lines + axis labels */}
        {gridValues.map((v, i) => {
          const y = PAD_TOP + plotHeight - (v / maxViews) * plotHeight;
          return (
            <g key={i}>
              <line x1={PAD_LEFT} y1={y} x2={WIDTH - PAD_RIGHT} y2={y} stroke="#e5e0f0" strokeWidth="1" />
              <text x={0} y={y + 3} fontSize="10" fill="#9992a8">
                {v}
              </text>
            </g>
          );
        })}

        {/* Date labels (first, middle, last) */}
        {[0, Math.floor((points.length - 1) / 2), points.length - 1].map((i) => {
          const p = points[i];
          if (!p) return null;
          return (
            <text key={i} x={p.x} y={HEIGHT - 8} fontSize="10" fill="#9992a8" textAnchor="middle">
              {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </text>
          );
        })}

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path d={linePath} fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {hovered && (
          <>
            <line x1={hovered.x} y1={PAD_TOP} x2={hovered.x} y2={PAD_TOP + plotHeight} stroke="#c4b5fd" strokeWidth="1" />
            <circle cx={hovered.x} cy={hovered.y} r="4" fill="#7c3aed" stroke="white" strokeWidth="2" />
          </>
        )}
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute top-2 -translate-x-1/2 rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs shadow-md"
          style={{ left: `${(hovered.x / WIDTH) * 100}%` }}
        >
          <p className="font-semibold text-ink">{hovered.views} view{hovered.views === 1 ? "" : "s"}</p>
          <p className="text-ink/50">
            {new Date(hovered.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
        </div>
      )}
    </div>
  );
}
