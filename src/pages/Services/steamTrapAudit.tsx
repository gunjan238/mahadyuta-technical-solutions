import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Flame, Search, BarChart3, FileText,
  CheckCircle2, AlertTriangle, TrendingDown, Zap, ChevronRight,
  Thermometer, Activity, Shield, Settings,
} from "lucide-react";

import heroImg    from "@/assets/steam-trap-inspection.jpg";
import sectionImg from "@/assets/steam-trap-inspection.jpg";

/* ── Video asset — place at src/assets/videos/steam-trap.mp4
   Falls back to heroImg automatically if file is absent.    ── */
// let serviceVideo: string | null = null;
// try {
//   serviceVideo = new URL("@/assets/videos/steam-trap.mp4", import.meta.url).href;
// } catch { serviceVideo = null; }

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .st-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .st-page * { box-sizing: border-box; }

  /* ── Flicker ── */
  @keyframes st-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% {
      opacity: 1;
      text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
    }
    20%,24%,55% { opacity: 0.35; text-shadow: none; }
  }
  @keyframes st-fade-in-text {
    0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
    60%  { opacity: 0.85; }
    100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
  }
  .st-flicker {
    opacity: 0;
    animation:
      st-fade-in-text 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
      st-flicker       4s ease-in-out                    2s infinite;
  }

  /* ── Hero ── */
  .st-hero {
    position: relative; overflow: hidden;
    min-height: 88vh;
    display: flex; align-items: center;
  }
  .st-hero-photo {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.62);
    pointer-events: none;
  }
  /* Warm-sky overlay — consistent across all service pages */
  .st-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.88) 0%,
      rgba(224,242,254,0.80) 55%,
      rgba(255,251,235,0.88) 100%);
  }
  .st-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .st-hero-burst {
    position: absolute; pointer-events: none;
    width: 70vw; height: 70vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .st-hero-sky {
    position: absolute; pointer-events: none;
    width: 55vw; height: 55vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
    bottom: -15%; right: -5%;
  }

  /* ── Two-column hero grid ── */
  .st-hero-inner {
    position: relative;
    max-width: 1280px; margin: 0 auto;
    padding: 80px 28px 72px; width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
  @media (max-width: 900px) {
    .st-hero-inner { grid-template-columns: 1fr; }
    .st-hero-video-col { order: -1; }
  }

  /* ── Video panel ── */
  .st-video-wrap {
    position: relative;
    border-radius: 20px; overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.16);
    aspect-ratio: 16 / 10;
    background: #fef3c7;
  }
  .st-video-wrap video,
  .st-video-wrap img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
  }
  .st-video-wrap::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(245,158,11,0.08), transparent 60%);
    pointer-events: none;
  }
  .st-video-label {
    position: absolute; bottom: 16px; left: 16px; z-index: 2;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(245,158,11,0.25);
    border-left: 4px solid #f59e0b;
    border-radius: 10px;
    padding: 10px 14px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
  @keyframes st-pulse-dot {
    0%,100% { opacity: 1; transform: scale(1); }
    50%     { opacity: 0.45; transform: scale(1.45); }
  }
  .st-pulse { animation: st-pulse-dot 1.6s ease-in-out infinite; }

  /* ── Badge ── */
  .st-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.12);
    border: 1px solid rgba(245,158,11,0.35);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px;
  }

  /* ── Stat cards ── */
  .st-stat {
    background: rgba(255,255,255,0.82);
    border: 1px solid rgba(251,191,36,0.28);
    border-radius: 14px; padding: 16px 20px;
    backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .st-stat:hover { border-color: rgba(245,158,11,0.5); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
  .st-stat-num   { font-size: 26px; font-weight: 900; color: #ea580c; line-height: 1; }
  .st-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }

  /* ── Breadcrumb ── */
  .st-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
  .st-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
  .st-bread a:hover { color: #f59e0b; }
  .st-bread-sep { color: #cbd5e1; }
  .st-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

  /* ── Section badge ── */
  .st-section-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(245,158,11,0.08);
    border: 1px solid rgba(245,158,11,0.22);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
  }

  /* ── Two-col grids ── */
  .st-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .st-two-col { grid-template-columns: 1fr; gap: 36px; } }
  .st-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 767px) { .st-split { grid-template-columns: 1fr; } }

  /* ── Trap type cards ── */
  .st-trap-card {
    background: #fff; border: 1px solid #eef0f4; border-radius: 14px;
    padding: 24px 22px; position: relative; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .st-trap-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f59e0b, transparent);
    opacity: 0; transition: opacity 0.2s;
  }
  .st-trap-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.28); transform: translateY(-3px); }
  .st-trap-card:hover::before { opacity: 1; }
  .st-trap-icon {
    width: 44px; height: 44px; border-radius: 10px;
    background: rgba(245,158,11,0.10);
    display: flex; align-items: center; justify-content: center;
    color: #f59e0b; margin-bottom: 14px;
  }

  /* ── Problem / solution ── */
  .st-problem-card  { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
  .st-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15);  border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }

  /* ── Process steps ── */
  .st-step {
    position: relative; background: #fff; border: 1px solid #eef0f4;
    border-radius: 16px; padding: 28px 24px; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .st-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#f59e0b,transparent); opacity: 0; transition: opacity 0.22s; }
  .st-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.3); transform: translateY(-4px); }
  .st-step:hover::before { opacity: 1; }
  .st-step-num  { font-size: 44px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 14px; right: 16px; user-select: none; }
  .st-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }

  /* ── Image wrap ── */
  .st-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
  .st-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(245,158,11,0.07),transparent 60%); pointer-events: none; }
  .st-img-placeholder { width: 100%; background: linear-gradient(135deg,#fef3c7 0%,#fed7aa 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

  /* ── Highlight box ── */
  .st-highlight { background: linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }

  /* ── CTA ── */
  .st-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .st-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%); top: -200px; right: -100px; pointer-events: none; }

  /* ── Buttons ── */
  .st-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#f59e0b,#ea580c); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
  .st-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.45); }
  .st-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); color: #334155; font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(245,158,11,0.25); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
  .st-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }

  /* ── Related links ── */
  .st-related { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border: 1px solid #eef0f4; border-radius: 12px; text-decoration: none; color: #334155; font-size: 13.5px; font-weight: 500; transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
  .st-related:hover { border-color: rgba(245,158,11,0.3); color: #b45309; background: #fffbeb; transform: translateX(4px); }

  /* ── Fade up ── */
  .fu { opacity: 0; transform: translateY(22px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .fu.vis { opacity: 1; transform: translateY(0); }
`;

/* ── Fade-up hook ── */
const useFU = (delay = 0) => {
  const ref = useRef(null);
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

/* ── Image fallback ── */
const ImgWithFallback = ({ src, alt, style, fallbackHeight = 440 }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="st-img-placeholder" style={{ height: fallbackHeight }}>
      <Flame size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#94a3b8" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ── Video panel — fills the blank right side of hero ── */
// const VideoPanel = () => {
//   const [videoFailed, setVideoFailed] = useState(false);
//   return (
//     <div className="st-video-wrap">
//       {serviceVideo && !videoFailed ? (
//         <video src={serviceVideo} autoPlay muted loop playsInline onError={() => setVideoFailed(true)} />
//       ) : (
//         <img src={heroImg} alt="Steam trap inspection service" />
//       )}
//       <div className="st-video-label">
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           <span className="st-pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
//           <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8" }}>Service Highlight</span>
//         </div>
//         <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", marginTop: 4 }}>Steam Trap & Valve Audit</div>
//         <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Ultrasound + Infrared · No Shutdown</div>
//       </div>
//     </div>
//   );
// };

/* ── Data ── */
const stats = [
  { num: "3+",   label: "Steam trap types covered"    },
  { num: "100%", label: "Non-invasive inspection"      },
  { num: "0",    label: "Production shutdown needed"   },
];

const trapTypes = [
  { icon: <Flame size={20} />,       title: "Float Steam Traps",       desc: "Tests continuous drainage float traps for proper seating, stuck-open and stuck-closed conditions using ultrasound signature analysis." },
  { icon: <Activity size={20} />,    title: "Thermodynamic Traps",     desc: "Identifies disc failure modes — rapid cycling, blowing live steam, or blocked condition — by combining acoustic and temperature data." },
  { icon: <Thermometer size={20} />, title: "Thermostatic Traps",      desc: "Detects bellows or capsule failures causing live steam loss or waterlogging in balanced-pressure and bimetallic trap types." },
  { icon: <Settings size={20} />,    title: "Control & Isolating Valves", desc: "Tests valve seat leakage in live steam and condensate lines, identifying passing valves that waste energy continuously." },
];

const processSteps = [
  { icon: <Search size={20} />,      title: "Trap & Valve Mapping",  desc: "All steam traps and valves in the system are identified, tagged and recorded before inspection begins." },
  { icon: <Activity size={20} />,    title: "Ultrasound Analysis",   desc: "Each trap is scanned with an ultrasonic detector to pick up the acoustic signature of turbulent steam flow." },
  { icon: <Thermometer size={20} />, title: "Thermal Correlation",   desc: "Surface temperature readings confirm trap condition — differentiating between a cold-blocked trap and a passing trap." },
  { icon: <FileText size={20} />,    title: "Loss Estimation & Report", desc: "Steam loss in kg/hr and annual cost are calculated per failed trap. A prioritised repair plan is delivered." },
];

const problemPoints = [
  "Failed traps have no visible external sign — they look identical to working traps",
  "A single passing trap can waste thousands of rupees in steam annually",
  "Blocked traps cause waterlogging, water hammer and heat exchanger damage",
  "Manual temperature-only checks miss marginal failures and intermittent faults",
  "Without regular audits, up to 30% of traps in a plant may be failing at any time",
];
const solutionPoints = [
  "Ultrasound + temperature combination accurately classifies each trap condition",
  "Works on all trap types: float, thermodynamic, thermostatic and inverted bucket",
  "Non-invasive — no pipe cutting, no system isolation, no production loss",
  "Steam loss quantified per trap in monetary terms for management reporting",
  "Bearing condition assessments conducted in the same plant visit",
];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Eliminate continuous steam losses from passing traps and valves" },
  { icon: <Shield size={15} />,       label: "Prevent water hammer and pipe damage caused by blocked traps"    },
  { icon: <Activity size={15} />,     label: "Increased operational reliability and heat exchanger efficiency"  },
  { icon: <BarChart3 size={15} />,    label: "Clear ROI with per-trap energy loss quantification in cost terms" },
];
const relatedServices = [
  { label: "Compressed Air Leak Detection",                  path: "/services/compressed-air"      },
  { label: "Internal Hydraulic/Pneumatic Leak Detection",    path: "/services/hydraulic-pneumatic" },
  { label: "Air / Water Tight Integrity Assessment",         path: "/services/air-water-tight"     },
  { label: "Underground Leak Detection",                     path: "/services/underground-leak"    },
];

/* ── Sub-components ── */
const TrapCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="st-trap-card fu">
      <div className="st-trap-icon">{item.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
};
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="st-step fu">
      <div className="st-step-num">0{index + 1}</div>
      <div className="st-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const SteamTrap = () => {
  const refOverviewL = useFU(0);
  const refOverviewR = useFU(100);
  const refTrapHead  = useFU(0);
  const refProbHead  = useFU(0);
  const refProbL     = useFU(0);
  const refProbR     = useFU(100);
  const refProcHead  = useFU(0);
  const refImpactL   = useFU(0);
  const refImpactR   = useFU(100);
  const refRelated   = useFU(0);

  return (
    <div className="st-page">
      <style>{css}</style>

      {/* ════════════════════ HERO — two-column ════════════════════ */}
      <section className="st-hero">
        <img src={heroImg} alt="" className="st-hero-photo" aria-hidden="true" />
        <div className="st-hero-wash" />
        <div className="st-hero-dots" />
        <div className="st-hero-burst" />
        <div className="st-hero-sky" />

        <div className="st-hero-inner">

          {/* ── LEFT — copy ── */}
          <div>
            <div className="st-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="st-bread-active">Steam Trap / Valve Pass Audit</span>
            </div>

            <div className="st-badge" style={{ marginBottom: 20 }}>
              <Flame size={11} /> Energy Optimization
            </div>

            <h1 style={{ fontSize: "clamp(28px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Steam Trap &amp;<br />
              <span style={{
                background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Valve Pass Audit
              </span>
            </h1>

            {/* ── Flickering sub-headline — fades in on load, then flickers ── */}
            <p className="st-flicker" style={{
              fontSize: "clamp(12px,1.3vw,15px)", fontWeight: 700, color: "#062979",
              letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
            }}>
              ⚡ A failed trap costs more than you realise
            </p>

            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Regular inspection of steam traps and valves is essential for preventive maintenance. Early detection of failures leads to{" "}
              <strong style={{ color: "#ea580c" }}>increased operational reliability and considerable cost savings</strong> — without any production shutdown.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="st-btn-primary">Request an Audit <ArrowRight size={16} /></Link>
              {/* <Link to="/services" className="st-btn-ghost">All Services</Link> */}
            </div>

            {/* Stat cards */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="st-stat" style={{ minWidth: 120 }}>
                  <div className="st-stat-num">{s.num}</div>
                  <div className="st-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — video fills blank space ── */}
          <div className="st-hero-video-col">
            {/* <VideoPanel /> */}
          </div>
        </div>
      </section>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="st-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="st-section-badge"><Zap size={11} /> The Challenge</div>
            {/* <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117", lineHeight: 1.2, marginBottom: 20 }}>
              A failed trap costs more<br />than you realise
            </h2> */}
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              The regular inspection of valves and steam traps is essential for preventive maintenance. Early detection of steam trap leaks or fails and signs of wear leads to increased operational reliability and considerable cost savings.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              <strong style={{ color: "#1e293b" }}>The functionality of steam traps and valves is tested by analysing the typical ultrasound and temperature of the respective installation.</strong>
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              We specialise in testing any type of steam trap — for{" "}
              <strong style={{ color: "#1e293b" }}>float, thermodynamic and thermostatic traps</strong> — or for valves in systems with a flow of steam. We are also capable of{" "}
              <strong style={{ color: "#ea580c" }}>estimation of any losses of steam within the system.</strong>
            </p>
            <div className="st-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Dual Technology Approach</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                By combining <strong>ultrasound acoustic analysis</strong> with <strong>surface temperature readings</strong>, we accurately classify every trap as working correctly, passing live steam, or blocked — eliminating guesswork and missed failures.
              </p>
            </div>
          </div>

          <div ref={refOverviewR} className="fu">
            <div className="st-img-wrap">
              <ImgWithFallback src={sectionImg} alt="Engineer inspecting steam trap" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Inspection Method</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Ultrasound + Infrared Thermography</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>All trap types · No system shutdown</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ TRAP TYPES ════════════════════ */}
      <section style={{ background: "#fffbeb", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refTrapHead} className="fu" style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="st-section-badge" style={{ margin: "0 auto 12px" }}><Flame size={11} /> Coverage</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Trap & Valve Types We Test</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {trapTypes.map((item, i) => <TrapCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ════════════════════ PROCESS ════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refProcHead} className="fu" style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="st-section-badge" style={{ margin: "0 auto 12px" }}><Search size={11} /> Our Process</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>How We Audit Steam Traps & Valves</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
            {processSteps.map((s, i) => <StepCard key={s.title} step={s} index={i} />)}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default SteamTrap;