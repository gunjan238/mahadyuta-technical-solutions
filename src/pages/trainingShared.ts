/* ──────────────────────────────────────────────────────────
   Shared CSS string used by all Training sub-pages.
   Import as:  import { trainingCss, useFU } from "./trainingShared";
   ────────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";

export const trainingCss = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  .tr-page { font-family:'Roboto',sans-serif; color:#1e293b; }
  .tr-page * { box-sizing:border-box; }

  /* Hero */
  .tr-hero { position:relative; overflow:hidden; min-height:52vh; display:flex; align-items:center; }
  .tr-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
  .tr-hero-wash { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,0.90) 0%,rgba(224,242,254,0.82) 55%,rgba(255,251,235,0.90) 100%); }
  .tr-hero-dots { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .tr-hero-burst { position:absolute; pointer-events:none; width:65vw; height:65vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,0.24) 0%,rgba(251,191,36,0.08) 40%,transparent 70%); top:-15%; left:-8%; }
  .tr-hero-sky   { position:absolute; pointer-events:none; width:50vw; height:50vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.18) 0%,transparent 70%); bottom:-15%; right:-5%; }

  /* Badges */
  .tr-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }

  /* Stat cards */
  .tr-stat { background:rgba(255,255,255,0.82); border:1px solid rgba(251,191,36,0.28); border-radius:14px; padding:16px 22px; backdrop-filter:blur(10px); box-shadow:0 2px 12px rgba(0,0,0,0.06); transition:border-color 0.2s,box-shadow 0.2s; }
  .tr-stat:hover { border-color:rgba(245,158,11,0.5); box-shadow:0 6px 24px rgba(245,158,11,0.15); }
  .tr-stat-num   { font-size:28px; font-weight:900; color:#ea580c; line-height:1; }
  .tr-stat-label { font-size:11px; color:#64748b; font-weight:500; margin-top:4px; }

  /* Skill pill */
  .tr-skill-pill { display:inline-flex; align-items:center; gap:8px; background:#fff; border:1px solid #eef0f4; border-radius:10px; padding:9px 14px; font-size:13px; font-weight:500; color:#334155; transition:border-color 0.15s,color 0.15s,background 0.15s; }
  .tr-skill-pill:hover { border-color:#f59e0b; color:#b45309; background:#fffbeb; }
  .tr-skill-dot { width:7px; height:7px; border-radius:50%; background:#f59e0b; flex-shrink:0; }

  /* Course accordion */
  .tr-course-card { background:#fff; border:1px solid #eef0f4; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.05); transition:border-color 0.2s,box-shadow 0.2s; }
  .tr-course-card:hover { border-color:rgba(245,158,11,0.28); box-shadow:0 6px 24px rgba(0,0,0,0.08); }
  .tr-course-head { display:flex; align-items:center; gap:14px; padding:20px 22px; cursor:pointer; user-select:none; }
  .tr-course-icon { width:42px; height:42px; border-radius:10px; flex-shrink:0; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; }
  .tr-course-body { padding:0 22px 18px; }
  .tr-day-block   { margin-bottom:12px; }
  .tr-day-label   { font-size:11px; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:#b45309; margin-bottom:6px; }
  .tr-bullet { display:flex; align-items:flex-start; gap:8px; font-size:13px; color:#64748b; line-height:1.55; margin-bottom:4px; }

  /* Feature cards */
  .tr-feature { background:#fff; border:1px solid #eef0f4; border-radius:14px; padding:22px 20px; transition:box-shadow 0.2s,border-color 0.2s,transform 0.2s; }
  .tr-feature:hover { box-shadow:0 8px 28px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.28); transform:translateY(-3px); }
  .tr-feature-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:14px; }

  /* App cards (capability / application) */
  .tr-app-card { background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:22px 20px; position:relative; overflow:hidden; transition:box-shadow 0.22s,border-color 0.22s,transform 0.22s; }
  .tr-app-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,transparent); opacity:0; transition:opacity 0.2s; }
  .tr-app-card:hover { box-shadow:0 10px 36px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.28); transform:translateY(-4px); }
  .tr-app-card:hover::before { opacity:1; }
  .tr-app-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:14px; }

  /* Cert card */
  .tr-cert { background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:24px; text-align:center; box-shadow:0 4px 16px rgba(0,0,0,0.06); transition:box-shadow 0.2s,border-color 0.2s; }
  .tr-cert:hover { box-shadow:0 8px 28px rgba(0,0,0,0.10); border-color:rgba(245,158,11,0.28); }

  /* Audience pill */
  .tr-audience-pill { display:inline-flex; align-items:center; gap:8px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.20); border-radius:10px; padding:10px 16px; font-size:13.5px; font-weight:500; color:#1e293b; }

  /* Program card */
  .tr-program-card { background:#fff; border:1px solid #eef0f4; border-radius:20px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06); transition:box-shadow 0.22s,transform 0.22s,border-color 0.22s; display:flex; flex-direction:column; }
  .tr-program-card:hover { box-shadow:0 12px 40px rgba(0,0,0,0.11); transform:translateY(-4px); border-color:rgba(245,158,11,0.3); }
  .tr-program-item { display:flex; align-items:flex-start; gap:10px; font-size:13.5px; color:#475569; line-height:1.55; padding:6px 0; border-bottom:1px solid #f8fafc; }
  .tr-program-item:last-child { border-bottom:none; }

  /* Highlight */
  .tr-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:16px; padding:24px 28px; color:#fff; box-shadow:0 8px 28px rgba(245,158,11,0.28); }

  /* Buttons */
  .tr-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:15px; font-weight:700; padding:14px 28px; border-radius:12px; text-decoration:none; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 20px rgba(245,158,11,0.35); }
  .tr-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.45); }
  .tr-btn-ghost  { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:15px; font-weight:500; padding:14px 28px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,0.25); transition:border-color 0.2s,background 0.2s,color 0.2s; }
  .tr-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  /* Two-col */
  .tr-two-col { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }
  @media(max-width:900px){ .tr-two-col { grid-template-columns:1fr; gap:36px; } }

  /* CTA */
  .tr-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .tr-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }

  /* Fade up */
  .fu { opacity:0; transform:translateY(22px); transition:opacity 0.55s ease,transform 0.55s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }
`;

export const useFU = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("vis"), delay); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};
