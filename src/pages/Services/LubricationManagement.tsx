/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, CheckCircle2,
  Droplets, Activity, BarChart3, Settings, Zap,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

/* ─── useFU ─── */
const useFU = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("vis"), delay); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
};

/* ═══════════════════════════════════════════════════════
   SVG ILLUSTRATIONS
═══════════════════════════════════════════════════════ */

/* 1 — Hero: Bearing cross-section with lubrication probe */
const HeroSVG = () => (
  <svg viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", borderRadius: 20 }}>
    <defs>
      <radialGradient id="lb-h-bg" cx="50%" cy="50%"><stop offset="0%" stopColor="#fffbeb" /><stop offset="100%" stopColor="#fef3c7" /></radialGradient>
      <radialGradient id="lb-h-outer" cx="50%" cy="50%"><stop offset="0%" stopColor="#cbd5e1" /><stop offset="100%" stopColor="#94a3b8" /></radialGradient>
      <radialGradient id="lb-h-race" cx="50%" cy="50%"><stop offset="0%" stopColor="#f8fafc" /><stop offset="100%" stopColor="#e2e8f0" /></radialGradient>
      <radialGradient id="lb-h-grease" cx="40%" cy="40%"><stop offset="0%" stopColor="#fde68a" /><stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" /></radialGradient>
      <filter id="lb-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    <rect width="520" height="420" rx="20" fill="url(#lb-h-bg)" />

    {/* ── Bearing rings ── */}
    <circle cx="260" cy="210" r="148" fill="url(#lb-h-outer)" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.18))" }} />
    <circle cx="260" cy="210" r="122" fill="url(#lb-h-race)" />
    <circle cx="260" cy="210" r="112" fill="#f1f5f9" />
    {/* Grease fill in cage area */}
    <circle cx="260" cy="210" r="112" fill="url(#lb-h-grease)" opacity="0.25" />
    <circle cx="260" cy="210" r="82" fill="url(#lb-h-outer)" />
    <circle cx="260" cy="210" r="67" fill="url(#lb-h-race)" />
    <circle cx="260" cy="210" r="54" fill="#fff" opacity="0.85" />

    {/* ── Rolling elements (10 balls) ── */}
    {Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * 2 * Math.PI;
      const r = 97;
      const cx = 260 + r * Math.cos(a), cy = 210 + r * Math.sin(a);
      const colors = { 2: "#f59e0b", 5: "#22c55e", 7: "#ef4444" };
      const c = (colors as any)[i] || "#94a3b8";
      return (
        <g key={i}>
          {(colors as any)[i] && <circle cx={cx} cy={cy} r="20" fill={c} opacity="0.12" />}
          <circle cx={cx} cy={cy} r="14" fill={c} stroke="#fff" strokeWidth="2"
            style={{ filter: (colors as any)[i] ? `drop-shadow(0 0 6px ${c}80)` : "none" }} />
          {/* Grease blob on optimal ball */}
          {i === 2 && <circle cx={cx} cy={cy} r="19" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />}
        </g>
      );
    })}

    {/* ── Shaft text ── */}
    <text x="260" y="206" fill="#b45309" fontSize="10" fontWeight="800" textAnchor="middle">SHAFT</text>
    <text x="260" y="220" fill="#64748b" fontSize="8.5" textAnchor="middle">CONNECTION</text>

    {/* ── Grease gun / probe from top ── */}
    <rect x="228" y="22" width="64" height="28" rx="10" fill="#1e293b" style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.28))" }} />
    <rect x="230" y="24" width="60" height="24" rx="9" fill="#0f172a" />
    <text x="260" y="40" fill="#f59e0b" fontSize="9" fontWeight="700" textAnchor="middle">SONAPHONE III</text>
    {/* Probe line */}
    <line x1="260" y1="50" x2="260" y2="62" stroke="#f59e0b" strokeWidth="3" />
    {/* Pulse */}
    <circle cx="260" cy="62" r="5" fill="#f59e0b" style={{ filter: "url(#lb-glow)" }}>
      <animate attributeName="r" values="5;9;5" dur="1.8s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
    </circle>
    {/* Grease nozzle */}
    <rect x="244" y="62" width="32" height="8" rx="4" fill="#334155" />
    <line x1="260" y1="70" x2="260" y2="80" stroke="#fbbf24" strokeWidth="2.5" opacity="0.7" />

    {/* ── Status badges ── */}
    {/* Before lube */}
    <rect x="8" y="145" width="118" height="38" rx="11" fill="#fff" stroke="rgba(239,68,68,0.35)" strokeWidth="1.5" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }} />
    <circle cx="22" cy="164" r="7" fill="#ef4444" />
    <text x="34" y="160" fill="#ef4444" fontSize="8.5" fontWeight="700">BEFORE LUBE</text>
    <text x="34" y="173" fill="#64748b" fontSize="8">dB: 38 — HIGH</text>
    <line x1="126" y1="164" x2="148" y2="185" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />

    {/* Optimal */}
    <rect x="394" y="145" width="118" height="38" rx="11" fill="#fff" stroke="rgba(34,197,94,0.35)" strokeWidth="1.5" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }} />
    <circle cx="408" cy="164" r="7" fill="#22c55e" />
    <text x="420" y="160" fill="#22c55e" fontSize="8.5" fontWeight="700">AFTER LUBE</text>
    <text x="420" y="173" fill="#64748b" fontSize="8">dB: 22 — OPTIMAL</text>
    <line x1="394" y1="164" x2="373" y2="190" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,2" />

    {/* Grease volume */}
    <rect x="8" y="240" width="118" height="38" rx="11" fill="#fff" stroke="rgba(245,158,11,0.35)" strokeWidth="1.5" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }} />
    <circle cx="22" cy="259" r="7" fill="#f59e0b" />
    <text x="34" y="255" fill="#b45309" fontSize="8.5" fontWeight="700">GREASE USED</text>
    <text x="34" y="268" fill="#64748b" fontSize="8">3.2g — 4 strokes</text>
    <line x1="126" y1="259" x2="144" y2="248" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />

    {/* Temperature */}
    <rect x="394" y="240" width="118" height="38" rx="11" fill="#fff" stroke="rgba(245,158,11,0.35)" strokeWidth="1.5" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }} />
    <circle cx="408" cy="259" r="7" fill="#f97316" />
    <text x="420" y="255" fill="#f97316" fontSize="8.5" fontWeight="700">TEMPERATURE</text>
    <text x="420" y="268" fill="#64748b" fontSize="8">62°C — NORMAL</text>
    <line x1="394" y1="259" x2="376" y2="248" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4,2" />

    {/* ── Legend ── */}
    {[{ c: "#ef4444", l: "Under-Lubricated" }, { c: "#22c55e", l: "Optimally Lubricated" }, { c: "#94a3b8", l: "No Action Needed" }].map((lg, i) => (
      <g key={lg.l}>
        <circle cx={50 + i * 148} cy="388" r="6" fill={lg.c} />
        <text x={62 + i * 148} y="392" fill="#475569" fontSize="9.5" fontWeight="600">{lg.l}</text>
      </g>
    ))}
  </svg>
);

/* 2 — 5-Step Process Flow */
const ProcessSVG = () => {
  const steps = [
    { n: "01", emoji: "📡", title: "Baseline\nMeasurement", desc: "Record pre-lube dB level\nusing SONAPHONE III", color: "#f59e0b" },
    { n: "02", emoji: "💉", title: "Grease\nInjection", desc: "Apply in small increments\n(1–2 pump strokes)", color: "#ea580c" },
    { n: "03", emoji: "📊", title: "Real-Time\nMonitoring", desc: "Watch dB drop on screen\nduring lubrication", color: "#f97316" },
    { n: "04", emoji: "✅", title: "Optimal\nLevel Reached", desc: "Stop when dB returns to\nsafe baseline level", color: "#22c55e" },
    { n: "05", emoji: "📝", title: "Log &\nReport", desc: "Record dB, volume used,\nbearing ID & date", color: "#3b82f6" },
  ];
  return (
    <svg viewBox="0 0 780 310" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", borderRadius: 16 }}>
      <defs>
        <linearGradient id="ps-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb" /><stop offset="100%" stopColor="#fef3c7" /></linearGradient>
        <marker id="ps-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" /></marker>
      </defs>
      <rect width="780" height="310" rx="16" fill="url(#ps-bg)" />
      <text x="390" y="28" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">Ultrasound-Based Lubrication Management — 5-Step Process</text>
      {steps.map((s, i) => {
        const cx = 68 + i * 148;
        return (
          <g key={s.n}>
            <rect x={cx - 56} y="46" width="112" height="200" rx="16" fill="#fff" stroke={`${s.color}44`} strokeWidth="2"
              style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.07))" }} />
            {/* Colour cap */}
            <rect x={cx - 56} y="46" width="112" height="28" rx="16" fill={s.color} opacity="0.18" />
            <rect x={cx - 56} y="62" width="112" height="12" fill={s.color} opacity="0.18" />
            <text x={cx} y="63" fill={s.color} fontSize="9" fontWeight="900" textAnchor="middle">STEP {s.n}</text>
            {/* Emoji */}
            <text x={cx} y="112" fontSize="32" textAnchor="middle">{s.emoji}</text>
            {/* Title */}
            {s.title.split("\n").map((l, j) => <text key={j} x={cx} y={140 + j * 15} fill="#0f1117" fontSize="11" fontWeight="700" textAnchor="middle">{l}</text>)}
            {/* Desc */}
            {s.desc.split("\n").map((l, j) => <text key={j} x={cx} y={176 + j * 14} fill="#64748b" fontSize="9.5" textAnchor="middle">{l}</text>)}
            {/* Arrow */}
            {i < steps.length - 1 && (
              <line x1={cx + 58} y1="145" x2={cx + 90} y2="145" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ps-arr)" />
            )}
          </g>
        );
      })}
      {/* dB drop curve at bottom */}
      <text x="390" y="262" fill="#475569" fontSize="9.5" fontWeight="600" textAnchor="middle">dB level drops as grease fills — stop at baseline</text>
      <polyline points="64,290 140,288 218,276 296,258 374,244 452,230 530,224 608,218 714,216" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
      <line x1="64" y1="216" x2="714" y2="216" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.7" />
      <text x="718" y="219" fill="#22c55e" fontSize="8" fontWeight="700">TARGET</text>
    </svg>
  );
};

/* 3 — dB Trending Chart */
const DbTrendSVG = () => {
  const readings = [
    { x: 75, y: 180, s: "OK", c: "#22c55e" },
    { x: 135, y: 172, s: "OK", c: "#22c55e" },
    { x: 195, y: 156, s: "WATCH", c: "#f59e0b" },
    { x: 255, y: 138, s: "WATCH", c: "#f59e0b" },
    { x: 315, y: 114, s: "LUBE NOW", c: "#ef4444" },
    { x: 375, y: 110, s: "LUBE NOW", c: "#ef4444" },
    { x: 435, y: 178, s: "POST-LUBE", c: "#3b82f6" },
    { x: 495, y: 173, s: "OK", c: "#22c55e" },
    { x: 555, y: 165, s: "OK", c: "#22c55e" },
    { x: 615, y: 160, s: "OK", c: "#22c55e" },
  ];
  return (
    <svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", borderRadius: 16 }}>
      <defs>
        <linearGradient id="dt-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9" /><stop offset="100%" stopColor="#f0f9ff" /></linearGradient>
        <linearGradient id="dt-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b" stopOpacity="0.32" /><stop offset="100%" stopColor="#f59e0b" stopOpacity="0" /></linearGradient>
      </defs>
      <rect width="720" height="320" rx="16" fill="url(#dt-bg)" />
      <text x="360" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">Bearing dB Level Trending — Lubrication Decision Chart</text>
      <text x="360" y="44" fill="#64748b" fontSize="9.5" textAnchor="middle">ISO-based ultrasound amplitude monitoring for lubrication scheduling</text>
      {/* Zone bands */}
      {[
        { y: 58, h: 42, fill: "#ef4444", label: "CRITICAL", opacity: 0.12 },
        { y: 100, h: 48, fill: "#f59e0b", label: "WATCH", opacity: 0.10 },
        { y: 148, h: 62, fill: "#22c55e", label: "NORMAL", opacity: 0.10 },
        { y: 210, h: 38, fill: "#3b82f6", label: "OVER-LUBE", opacity: 0.08 },
      ].map(z => (
        <g key={z.label}>
          <rect x="58" y={z.y} width="626" height={z.h} fill={z.fill} opacity={z.opacity} />
          <text x="54" y={z.y + z.h / 2 + 4} fill={z.fill} fontSize="8" textAnchor="end" fontWeight="700">{z.label}</text>
        </g>
      ))}
      {/* Grid */}
      {[80, 108, 136, 164, 192, 220].map(y => <line key={y} x1="58" y1={y} x2="684" y2={y} stroke="#eef0f4" strokeWidth="1" strokeDasharray="4,4" />)}
      {/* Y labels */}
      {[0, 5, 10, 15, 20, 25, 30].map((v, i) => <text key={v} x="52" y={248 - i * 28} fill="#94a3b8" fontSize="7.5" textAnchor="end">{60 - i * 5} dB</text>)}
      {/* Axes */}
      <line x1="58" y1="58" x2="58" y2="248" stroke="#eef0f4" strokeWidth="1.5" />
      <line x1="58" y1="248" x2="684" y2="248" stroke="#eef0f4" strokeWidth="1.5" />
      {/* Area + line */}
      <polygon points={`75,248 ${readings.map(r => `${r.x},${r.y}`).join(" ")} 615,248`} fill="url(#dt-area)" />
      <polyline points={readings.map(r => `${r.x},${r.y}`).join(" ")} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
      {/* Data points */}
      {readings.map((r, i) => (
        <g key={i}>
          <circle cx={r.x} cy={r.y} r="7" fill={r.c} stroke="#fff" strokeWidth="2" />
          <text x={r.x} y={r.y - 12} fill={r.c} fontSize="7" fontWeight="700" textAnchor="middle">{r.s}</text>
        </g>
      ))}
      {/* Lube event */}
      <line x1="380" y1="96" x2="420" y2="130" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,2" />
      <rect x="300" y="80" width="84" height="18" rx="9" fill="#3b82f6" opacity="0.14" stroke="#3b82f6" strokeWidth="1" />
      <text x="342" y="93" fill="#3b82f6" fontSize="8.5" fontWeight="700" textAnchor="middle">LUBE APPLIED</text>
      {/* X dates */}
      {["Jan 5", "Jan 12", "Jan 19", "Jan 26", "Feb 2", "Feb 9", "Feb 16", "Feb 23", "Mar 1", "Mar 8"].map((d, i) => (
        <text key={d} x={75 + i * 60} y="262" fill="#94a3b8" fontSize="7.5" textAnchor="middle" transform={`rotate(-30 ${75 + i * 60} 262)`}>{d}</text>
      ))}
      <text x="12" y="165" fill="#64748b" fontSize="9" textAnchor="middle" transform="rotate(-90 12 165)" fontWeight="600">dB Level</text>
      {/* Legend row */}
      {[{ c: "#22c55e", l: "Normal" }, { c: "#f59e0b", l: "Watch / Schedule Lube" }, { c: "#ef4444", l: "Lubricate Now" }, { c: "#3b82f6", l: "Post-Lubrication" }].map((lg, i) => (
        <g key={lg.l}><circle cx={58 + i * 162} cy="306" r="5" fill={lg.c} /><text x={68 + i * 162} y="310" fill="#475569" fontSize="8.5" fontWeight="600">{lg.l}</text></g>
      ))}
    </svg>
  );
};

/* 4 — Before / After Comparison */
const ComparisonSVG = () => (
  <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", borderRadius: 16 }}>
    <defs>
      <linearGradient id="ca-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb" /><stop offset="100%" stopColor="#fef3c7" /></linearGradient>
    </defs>
    <rect width="760" height="280" rx="16" fill="url(#ca-bg)" />
    <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">Traditional vs Ultrasound-Based Lubrication Management</text>

    {/* Traditional column */}
    <rect x="24" y="40" width="344" height="218" rx="14" fill="#fff" stroke="rgba(239,68,68,0.25)" strokeWidth="2" style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.07))" }} />
    <rect x="24" y="40" width="344" height="38" rx="14" fill="#ef4444" opacity="0.12" />
    <rect x="24" y="62" width="344" height="16" fill="#ef4444" opacity="0.12" />
    <text x="196" y="63" fill="#ef4444" fontSize="11" fontWeight="800" textAnchor="middle">😟  TRADITIONAL — Time-Based</text>
    {[
      "Fixed grease schedule (every 3 months)",
      "No measurement — just pump & hope",
      "Over-greasing causes seal failure",
      "Under-greasing causes metal-to-metal contact",
      "Bearings fail unexpectedly",
      "High lubricant waste & cost",
      "No data, no records, no accountability",
    ].map((t, i) => (
      <g key={t}>
        <circle cx="42" cy={96 + i * 23} r="5" fill="#ef4444" opacity="0.7" />
        <text x="54" y={100 + i * 23} fill="#475569" fontSize="11">{t}</text>
      </g>
    ))}

    {/* VS divider */}
    <circle cx="380" cy="149" r="26" fill="#f59e0b" style={{ filter: "drop-shadow(0 4px 12px rgba(245,158,11,0.35))" }} />
    <text x="380" y="155" fill="#fff" fontSize="14" fontWeight="900" textAnchor="middle">VS</text>

    {/* Ultrasound column */}
    <rect x="392" y="40" width="344" height="218" rx="14" fill="#fff" stroke="rgba(34,197,94,0.30)" strokeWidth="2" style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.07))" }} />
    <rect x="392" y="40" width="344" height="38" rx="14" fill="#22c55e" opacity="0.12" />
    <rect x="392" y="62" width="344" height="16" fill="#22c55e" opacity="0.12" />
    <text x="564" y="63" fill="#22c55e" fontSize="11" fontWeight="800" textAnchor="middle">✅  ULTRASOUND — Condition-Based</text>
    {[
      "Lube only when dB level indicates need",
      "Real-time measurement during application",
      "Stop exactly at optimal dB level",
      "Prevent both over & under-greasing",
      "Detect bearing faults 3–6 months early",
      "50%+ reduction in lubricant consumption",
      "Full digital records for every bearing",
    ].map((t, i) => (
      <g key={t}>
        <circle cx="410" cy={96 + i * 23} r="5" fill="#22c55e" opacity="0.8" />
        <text x="422" y={100 + i * 23} fill="#334155" fontSize="11" fontWeight="500">{t}</text>
      </g>
    ))}
  </svg>
);

/* ─── Data ─── */
const benefits = [
  { icon: "📊", title: "Prevent Over & Under Lubrication", desc: "Ultrasound measures exact bearing dB before, during and after — eliminating guesswork and calendar-based schedules." },
  { icon: "💰", title: "Reduce Lubricant Waste by 50%+", desc: "Apply only what the bearing needs. No over-greasing that ruptures seals, contaminates motor windings or causes overheating." },
  { icon: "🔮", title: "Extend Bearing Life 3–5×", desc: "Optimal lubrication film eliminates metal-to-metal contact — the primary cause of premature bearing failure and overheating." },
  { icon: "📋", title: "Full Digital Lubrication Records", desc: "Every event is logged with dB readings before/after, lubricant type, volume applied, bearing ID, route and technician." },
  { icon: "⚡", title: "Measurable Energy Savings", desc: "Properly lubricated bearings run cooler and draw less current — providing measurable reductions in energy consumption." },
  { icon: "🚨", title: "Early Fault Detection Included", desc: "Elevated dB baseline readings indicate developing faults — giving 3–6 months warning before catastrophic failure." },
];

const heroStats = [
  { num: "50%+", label: "Lubricant waste saved" },
  { num: "3–5×", label: "Bearing life extended" },
  { num: "0", label: "Shutdown required" },
  { num: "100%", label: "Documented records" },
];

const applicationsList = [
  "Motor & pump bearings (all speeds)",
  "Conveyor drive & return bearings",
  "Fan & blower bearings",
  "Compressor & turbine bearings",
  "Slow-speed gearbox bearings",
  "Paper machine roll bearings",
  "Kiln & rotary drum trunnions",
  "Wind turbine main bearings",
];

/* ═══ CSS ═══ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  .lm-page { font-family:'Roboto',sans-serif; color:#1e293b; }
  .lm-page * { box-sizing:border-box; }

  @keyframes lm-fadein { 0%{opacity:0;transform:translateY(6px);letter-spacing:0.13em;} 60%{opacity:0.85;} 100%{opacity:1;transform:translateY(0);letter-spacing:0.04em;} }
  @keyframes lm-flicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1;text-shadow:0 0 8px rgba(245,158,11,0.85),0 0 20px rgba(234,88,12,0.5);} 20%,24%,55%{opacity:0.35;text-shadow:none;} }
.lm-flicker {
  opacity: 0;
  animation: lm-fadein 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
             lm-flicker 4s ease-in-out 2s infinite;

  font-size: clamp(13px,1.2vw,15px);
  font-weight: 600;

  color: #062979; /* ✅ your desired color */

  

  display: block;
  margin-top: 10px;
  margin-bottom: 18px;
}
  .fu { opacity:0; transform:translateY(22px); transition:opacity 0.55s ease,transform 0.55s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }

  .lm-hero { position:relative; overflow:hidden; min-height:90vh; display:flex; align-items:center; }
  .lm-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
  .lm-hero-wash  { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,0.90) 0%,rgba(224,242,254,0.82) 55%,rgba(255,251,235,0.90) 100%); }
  .lm-hero-dots  { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .lm-hero-burst { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,0.26) 0%,rgba(251,191,36,0.09) 40%,transparent 70%); top:-15%; left:-8%; }
  .lm-hero-sky   { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.20) 0%,rgba(56,189,248,0.06) 45%,transparent 70%); bottom:-15%; right:-5%; }

  .lm-stat { background:rgba(255,255,255,0.82); border:1px solid rgba(245,158,11,0.28); border-radius:14px; padding:14px 18px; backdrop-filter:blur(10px); box-shadow:0 2px 12px rgba(0,0,0,0.06); }
  .lm-stat-num { font-size:22px; font-weight:900; color:#ea580c; line-height:1; }
  .lm-stat-label { font-size:11px; color:#64748b; font-weight:500; margin-top:3px; }

  .lm-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:18px; }
  .lm-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }
  .lm-bread { display:flex; align-items:center; gap:6px; margin-bottom:24px; }
  .lm-bread a { font-size:12.5px; color:#64748b; text-decoration:none; } .lm-bread a:hover { color:#f59e0b; }

  .lm-svg-card { border-radius:20px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.09),0 2px 8px rgba(0,0,0,0.05); border:1px solid rgba(245,158,11,0.14); transition:transform 0.3s,box-shadow 0.3s; }
  .lm-svg-card:hover { transform:translateY(-5px) scale(1.005); box-shadow:0 20px 56px rgba(0,0,0,0.14); }
  .lm-svg-label { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.10); border:1px solid rgba(245,158,11,0.25); color:#b45309; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; padding:5px 12px; border-radius:999px; margin-bottom:10px; }

  .lm-benefit-card { background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:22px 20px; transition:box-shadow 0.2s,border-color 0.2s,transform 0.2s; position:relative; overflow:hidden; }
  .lm-benefit-card::after { content:''; position:absolute; top:0; left:0; bottom:0; width:3px; background:linear-gradient(to bottom,#f59e0b,#ea580c); opacity:0; transition:opacity 0.2s; }
  .lm-benefit-card:hover { box-shadow:0 8px 28px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.28); transform:translateY(-3px); }
  .lm-benefit-card:hover::after { opacity:1; }

  .lm-app-pill { display:flex; align-items:center; gap:10px; background:#fff; border:1px solid #eef0f4; border-radius:12px; padding:11px 15px; font-size:13px; font-weight:500; color:#334155; transition:border-color 0.2s,box-shadow 0.2s; }
  .lm-app-pill:hover { border-color:rgba(245,158,11,0.30); box-shadow:0 4px 14px rgba(0,0,0,0.06); }

  .lm-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:15px; font-weight:700; padding:14px 28px; border-radius:12px; text-decoration:none; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 20px rgba(245,158,11,0.38); }
  .lm-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.52); }
  .lm-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:15px; font-weight:500; padding:14px 28px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,0.25); transition:border-color 0.2s,background 0.2s; }
  .lm-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  .lm-two-col { display:grid; grid-template-columns:1fr 1fr; gap:52px; align-items:start; }
  @media(max-width:900px){ .lm-two-col{ grid-template-columns:1fr; gap:36px; } }

  .lm-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:20px; padding:32px 36px; color:#fff; box-shadow:0 12px 40px rgba(245,158,11,0.32); position:relative; overflow:hidden; }
  .lm-highlight::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 0%,rgba(255,255,255,0.18) 0%,transparent 60%); pointer-events:none; }

  .lm-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .lm-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }
`;

const LubricationManagement = () => {
  const refProcess = useFU(0);
  const refTrend = useFU(100);
  const refComp = useFU(0);
  const refBenH = useFU(0);
  const refAppH = useFU(0);
  const benRefs = benefits.map((_, i) => useFU(i * 70));
  const appRefs = applicationsList.map((_, i) => useFU(i * 50));

  return (
    <div className="lm-page">
      <style>{css}</style>

      {/* ════ HERO ════ */}
      <section className="lm-hero">
        <img src={heroBg} alt="" className="lm-hero-photo" aria-hidden="true" />
        <div className="lm-hero-wash" /><div className="lm-hero-dots" />
        <div className="lm-hero-burst" /><div className="lm-hero-sky" />

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "80px 28px 72px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }}>

          <div>
            <div className="lm-bread">
              <Link to="/">Home</Link><ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link><ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span style={{ fontSize: 12.5, color: "#334155", fontWeight: 500 }}>Lubrication Management</span>
            </div>

            <div className="lm-badge"><Droplets size={11} /> Ultrasound Analysis Technology</div>

            <h1 style={{ fontSize: "clamp(26px,4vw,52px)", fontWeight: 900, color: "#1e293b", lineHeight: 1.05, marginBottom: 0, maxWidth: 560 }}>
              Bearing{" "}
              <span style={{ background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Lubrication Management
              </span>
            </h1>

            <span className="lm-flicker" >⚡ Lube what the bearing needs — not what the calendar says</span>

            <p style={{ fontSize: "clamp(13px,1.3vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 28, maxWidth: 500 }}>
              Using <strong style={{ color: "#b45309" }}>SONAPHONE III Ultrasound Technology</strong> to measure bearing dB levels in real time — ensuring every bearing receives exactly the right amount of lubricant, eliminating waste and preventing failures caused by over and under-greasing.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 30 }}>
              {heroStats.map(s => (
                <div key={s.label} className="lm-stat"><div className="lm-stat-num">{s.num}</div><div className="lm-stat-label">{s.label}</div></div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/contact" className="lm-btn-primary">Request a Demo <ArrowRight size={16} /></Link>
              {/* <Link to="/services/bearing-inspection" className="lm-btn-ghost">Vibration Monitoring →</Link> */}
            </div>
          </div>


        </div>
      </section>

      {/* ════ PROCESS ════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refProcess} className="fu" style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="lm-section-badge" style={{ margin: "0 auto 12px" }}><Settings size={11} /> Process</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, color: "#0f1117", marginBottom: 12 }}>5-Step Ultrasound Lubrication Process</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 560, margin: "0 auto" }}>A simple, repeatable process that makes every lubrication route measurable, documentable and optimised.</p>
          </div>
          <div className="lm-svg-label"><Settings size={11} /> Step-by-Step Process Flow</div>
          <div className="lm-svg-card"><ProcessSVG /></div>
        </div>
      </section>

      {/* ════ dB TREND + COMPARISON ════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refTrend} className="fu" style={{ marginBottom: 48 }}>
            <div className="lm-svg-label"><BarChart3 size={11} /> dB Level Trending — Lubrication Decision Points</div>
            <div className="lm-svg-card"><DbTrendSVG /></div>
          </div>
          <div ref={refComp} className="fu">
            <div className="lm-svg-label"><Zap size={11} /> Traditional vs Ultrasound Lubrication — Side by Side</div>
            <div className="lm-svg-card"><ComparisonSVG /></div>
          </div>
        </div>
      </section>

      {/* ════ BENEFITS ════ */}
      <section style={{ background: "#fffbeb", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refBenH} className="fu" style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="lm-section-badge" style={{ margin: "0 auto 12px" }}><CheckCircle2 size={11} /> Benefits</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, color: "#0f1117", marginBottom: 12 }}>Benefits of Condition-Based Lubrication</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "0 auto" }}>Switching from time-based to ultrasound-guided lubrication delivers measurable improvements across every bearing in your plant.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 18 }}>
            {benefits.map((b, i) => (
              <div key={b.title} ref={benRefs[i]} className="lm-benefit-card fu">
                <div style={{ fontSize: 28, marginBottom: 10 }}>{b.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f1117", marginBottom: 6 }}>{b.title}</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default LubricationManagement;