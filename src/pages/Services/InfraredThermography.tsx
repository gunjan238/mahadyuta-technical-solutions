import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Thermometer, Search, BarChart3, FileText,
  CheckCircle2, AlertTriangle, TrendingDown, Zap, ChevronRight,
  Shield, Eye, Activity, Flame, Settings, Sun,
} from "lucide-react";

import heroImg    from "@/assets/Thermography.png";
import sectionImg from "@/assets/Thermography.png";

/* ── Video: place at src/assets/videos/thermography.mp4 ── */
let serviceVideo: string | null = null;
try {
  serviceVideo = new URL("@/assets/videos/thermography.mp4", import.meta.url).href;
} catch { serviceVideo = null; }

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .ir-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .ir-page * { box-sizing: border-box; }

  /* ── Flicker ── */
  @keyframes ir-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% {
      opacity: 1;
      text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
    }
    20%,24%,55% { opacity: 0.35; text-shadow: none; }
  }
  @keyframes ir-fade-in {
    0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
    60%  { opacity: 0.85; }
    100% { opacity: 1; transform: translateY(0); letter-spacing: 0.04em; }
  }
  .ir-flicker {
    opacity: 0;
    animation:
      ir-fade-in 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
      ir-flicker  4s ease-in-out                    2s infinite;
  }

  /* ── Hero ── */
  .ir-hero {
    position: relative; overflow: hidden;
    min-height: 88vh; display: flex; align-items: center;
  }
  .ir-hero-photo {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.62); pointer-events: none;
  }
  .ir-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.88) 0%,
      rgba(224,242,254,0.80) 55%,
      rgba(255,251,235,0.88) 100%);
  }
  .ir-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .ir-hero-burst {
    position: absolute; pointer-events: none;
    width: 70vw; height: 70vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .ir-hero-sky {
    position: absolute; pointer-events: none;
    width: 55vw; height: 55vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
    bottom: -15%; right: -5%;
  }

  /* ── Two-column hero grid ── */
  .ir-hero-inner {
    position: relative; max-width: 1280px; margin: 0 auto;
    padding: 80px 28px 72px; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
  }
  @media (max-width: 900px) {
    .ir-hero-inner { grid-template-columns: 1fr; }
    .ir-video-col { order: -1; }
  }

  /* ── Video panel ── */
  .ir-video-wrap {
    position: relative; border-radius: 20px; overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.18);
    aspect-ratio: 16 / 10; background: #1a0a2e;
  }
  .ir-video-wrap video,
  .ir-video-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ir-video-wrap::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(245,158,11,0.08), transparent 60%);
    pointer-events: none;
  }

  /* ── Hot / Cold spot badge overlay ── */
  .ir-spot-badge {
    position: absolute; top: 14px; right: 14px; z-index: 2;
    display: flex; flex-direction: column; gap: 6px;
  }
  .ir-spot-hot {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(239,68,68,0.88); backdrop-filter: blur(6px);
    color: #fff; font-size: 11px; font-weight: 700;
    padding: 5px 10px; border-radius: 6px;
  }
  .ir-spot-cold {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(14,165,233,0.88); backdrop-filter: blur(6px);
    color: #fff; font-size: 11px; font-weight: 700;
    padding: 5px 10px; border-radius: 6px;
  }

  /* ── Floating video label ── */
  .ir-video-label {
    position: absolute; bottom: 16px; left: 16px; z-index: 2;
    background: rgba(255,255,255,0.92); backdrop-filter: blur(8px);
    border: 1px solid rgba(245,158,11,0.25); border-left: 4px solid #f59e0b;
    border-radius: 10px; padding: 10px 14px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
  @keyframes ir-pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.45;transform:scale(1.45);} }
  .ir-pulse { animation: ir-pulse 1.6s ease-in-out infinite; }

  /* ── Badge ── */
  .ir-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.35);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px;
  }

  /* ── Stat cards ── */
  .ir-stat {
    background: rgba(255,255,255,0.82); border: 1px solid rgba(251,191,36,0.28);
    border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .ir-stat:hover { border-color: rgba(245,158,11,0.5); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
  .ir-stat-num   { font-size: 26px; font-weight: 900; color: #ea580c; line-height: 1; }
  .ir-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }

  /* ── Breadcrumb ── */
  .ir-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
  .ir-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
  .ir-bread a:hover { color: #f59e0b; }
  .ir-bread-sep { color: #cbd5e1; }
  .ir-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

  /* ── Section badge ── */
  .ir-section-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
  }

  /* ── Two-col grids ── */
  .ir-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .ir-two-col { grid-template-columns: 1fr; gap: 36px; } }
  .ir-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 767px) { .ir-split { grid-template-columns: 1fr; } }

  /* ── Application cards ── */
  .ir-app-card {
    background: #fff; border: 1px solid #eef0f4; border-radius: 16px;
    padding: 24px 20px; position: relative; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .ir-app-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg,#f59e0b,transparent); opacity:0; transition:opacity 0.2s;
  }
  .ir-app-card:hover { box-shadow:0 10px 36px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.28); transform:translateY(-4px); }
  .ir-app-card:hover::before { opacity:1; }
  .ir-app-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:14px; }

  /* ── Hot / cold spot cards ── */
  .ir-hot-card {
    background: linear-gradient(135deg, #fff7ed 0%, #fff 100%);
    border: 1px solid rgba(239,68,68,0.20); border-left: 4px solid #ef4444;
    border-radius: 14px; padding: 22px 20px;
  }
  .ir-cold-card {
    background: linear-gradient(135deg, #f0f9ff 0%, #fff 100%);
    border: 1px solid rgba(14,165,233,0.20); border-left: 4px solid #0ea5e9;
    border-radius: 14px; padding: 22px 20px;
  }

  /* ── Process steps ── */
  .ir-step {
    position:relative; background:#fff; border:1px solid #eef0f4;
    border-radius:16px; padding:28px 24px; overflow:hidden;
    transition:box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .ir-step::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,transparent); opacity:0; transition:opacity 0.22s; }
  .ir-step:hover { box-shadow:0 10px 36px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.3); transform:translateY(-4px); }
  .ir-step:hover::before { opacity:1; }
  .ir-step-num { font-size:44px; font-weight:900; color:rgba(245,158,11,0.10); line-height:1; position:absolute; top:14px; right:16px; user-select:none; }
  .ir-step-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:16px; }

  /* ── Problem / solution ── */
  .ir-problem-card  { background:#fff8f4; border:1px solid rgba(245,158,11,0.18); border-left:4px solid #f59e0b; border-radius:14px; padding:24px 20px; }
  .ir-solution-card { background:#f0fdf4; border:1px solid rgba(22,163,74,0.15);  border-left:4px solid #16a34a; border-radius:14px; padding:24px 20px; }

  /* ── Image wrap ── */
  .ir-img-wrap { border-radius:20px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.14); position:relative; }
  .ir-img-wrap::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(245,158,11,0.07),transparent 60%); pointer-events:none; }
  .ir-img-placeholder { width:100%; background:linear-gradient(135deg,#1a0a2e 0%,#2d1b69 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; }

  /* ── Highlight box ── */
  .ir-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:16px; padding:24px 28px; color:#fff; box-shadow:0 8px 28px rgba(245,158,11,0.28); }

  /* ── Discipline pills ── */
  .ir-pill {
    display:inline-flex; align-items:center; gap:8px;
    background:#fff; border:1px solid #eef0f4; border-radius:10px;
    padding:10px 16px; font-size:13px; font-weight:500; color:#334155;
    transition:border-color 0.15s, color 0.15s, background 0.15s;
  }
  .ir-pill:hover { border-color:#f59e0b; color:#b45309; background:#fffbeb; }
  .ir-pill-dot { width:7px; height:7px; border-radius:50%; background:#f59e0b; flex-shrink:0; }

  /* ── Buttons ── */
  .ir-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:15px; font-weight:700; padding:14px 28px; border-radius:12px; text-decoration:none; border:none; cursor:pointer; transition:transform 0.15s, box-shadow 0.2s; box-shadow:0 4px 20px rgba(245,158,11,0.35); }
  .ir-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.45); }
  .ir-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:15px; font-weight:500; padding:14px 28px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,0.25); cursor:pointer; transition:border-color 0.2s, background 0.2s, color 0.2s; }
  .ir-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  /* ── Related links ── */
  .ir-related { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; background:#fff; border:1px solid #eef0f4; border-radius:12px; text-decoration:none; color:#334155; font-size:13.5px; font-weight:500; transition:border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
  .ir-related:hover { border-color:rgba(245,158,11,0.3); color:#b45309; background:#fffbeb; transform:translateX(4px); }

  /* ── CTA ── */
  .ir-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .ir-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }

  /* ── Fade up ── */
  .fu { opacity:0; transform:translateY(22px); transition:opacity 0.55s ease, transform 0.55s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }
`;

/* ── Hooks ── */
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
const ImgFallback = ({ src, alt, style, fallbackHeight = 440 }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="ir-img-placeholder" style={{ height: fallbackHeight }}>
      <Thermometer size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ── Hero panel — thermal image with hot/cold badges ── */
const HeroPanel = () => {
  const [videoFailed, setVideoFailed] = useState(false);
  return (
    <div className="ir-video-wrap">
      {serviceVideo && !videoFailed
        ? <video src={serviceVideo} autoPlay muted loop playsInline onError={() => setVideoFailed(true)} />
        : <img src={heroImg} alt="Infrared thermography electrical application" />
      }

      {/* Hot / Cold spot badges from screenshot */}
      {/* <div className="ir-spot-badge">
        <span className="ir-spot-hot">🔴 Hot Spots Detected</span>
        <span className="ir-spot-cold">🔵 Cold Spots Detected</span>
      </div>

      <div className="ir-video-label">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="ir-pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8" }}>Live Thermal Imaging</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", marginTop: 4 }}>Infrared Thermography Camera</div>
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Electrical · Mechanical · Steam Trap Applications</div>
      </div> */}
    </div>
  );
};

/* ── Data ── */
const stats = [
  { num: "100%", label: "Non-contact inspection"      },
  { num: "3+",   label: "Application disciplines"     },
  { num: "0",    label: "Production shutdown needed"   },
];

const applications = [
  { icon: <Zap size={19} />,         title: "HT/HV Electrical Systems",    desc: "Detects overloaded connections, loose joints, failing insulation and unbalanced phases in high-voltage switchgear and panels." },
  { icon: <Activity size={19} />,    title: "Mechanical Equipment",        desc: "Identifies bearing overheating, shaft misalignment, belt tension issues and motor insulation degradation before failure occurs." },
  { icon: <Flame size={19} />,       title: "Steam Trap Inspection",       desc: "Thermal imaging used alongside ultrasound to confirm passing or blocked steam traps — complementary dual-technology approach." },
  { icon: <Settings size={19} />,    title: "Electrical Panel Audits",     desc: "Full panel thermal survey detects hot connections, overloaded breakers and corroded bus bars without live-work exposure." },
  { icon: <Shield size={19} />,      title: "Building & Structural",       desc: "Identifies heat loss, moisture ingress, insulation voids and air leakage in building envelopes and roofing systems." },
  { icon: <Sun size={19} />,         title: "Solar PV Inspection",         desc: "Aerial and ground-level thermal surveys detect failed cells, string faults and hot-spot defects across PV arrays." },
];

const processSteps = [
  { icon: <Eye size={20} />,          title: "Pre-Survey Assessment",    desc: "Equipment operating conditions and thermal load are confirmed before the survey — all targets must be under normal operating load." },
  { icon: <Thermometer size={20} />,  title: "Thermal Image Capture",    desc: "A calibrated infrared camera scans all target equipment — capturing absolute temperatures and temperature differentials." },
  { icon: <Search size={20} />,       title: "Hot & Cold Spot Analysis", desc: "Anomalies are identified, classified by severity and cross-referenced with emissivity values for accurate temperature readings." },
  { icon: <FileText size={20} />,     title: "Detailed Thermal Report",  desc: "Full report with infrared images, visible-light photos, temperature data, severity ratings and prioritised repair actions." },
];

const problemPoints = [
  "Electrical faults are invisible to the eye until insulation fails or fire starts",
  "Overheated connections cause unplanned shutdowns and equipment damage",
  "Mechanical bearing failures give no warning until vibration is severe",
  "Steam trap conditions are ambiguous without dual-technology confirmation",
  "Standard inspection methods require isolation and shutdown to be safe",
];
const solutionPoints = [
  "Thermal imaging detects temperature anomalies from a safe non-contact distance",
  "Hot spots in electrical panels identified while fully energised and live",
  "Bearing and motor overheating pinpointed before mechanical failure occurs",
  "Combines with ultrasound analysis for confirmed steam trap classification",
  "All inspections performed under normal operating conditions — zero downtime",
];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Prevent electrical fires by finding overloaded connections early"      },
  { icon: <Shield size={15} />,       label: "Protect personnel with non-contact inspection of live equipment"        },
  { icon: <Activity size={15} />,     label: "Extend bearing and motor life through early thermal anomaly detection"  },
  { icon: <CheckCircle2 size={15} />, label: "Confirm steam trap condition — complementing ultrasound with thermal data" },
];
const disciplines = [
  "HT / LT Electrical Panels", "Switchgear & Transformers", "MCC & Control Panels",
  "Motors & Drives", "Bearings & Couplings", "Steam Traps & Valves",
  "Solar PV Arrays", "Building Envelopes", "Refractory & Insulation",
];
const relatedServices = [
  { label: "Compressed Air Leak Detection",               path: "/services/compressed-air"      },
  { label: "Internal Hydraulic/Pneumatic Leak Detection", path: "/services/hydraulic-pneumatic" },
  { label: "Steam Trap / Valve Pass Audit",               path: "/services/steam-trap"          },
  { label: "Bearing Inspection",                          path: "/services/bearing-inspection"  },
];

/* ── Sub-components ── */
const AppCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="ir-app-card fu">
      <div className="ir-app-icon">{item.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
};
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="ir-step fu">
      <div className="ir-step-num">0{index + 1}</div>
      <div className="ir-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const InfraredThermography = () => {
  const refOverL  = useFU(0);
  const refOverR  = useFU(100);
  const refAppH   = useFU(0);
  const refSpotH  = useFU(0);
  const refProcH  = useFU(0);
  const refProbH  = useFU(0);
  const refProbL  = useFU(0);
  const refProbR  = useFU(100);
  const refDiscL  = useFU(0);
  const refImpR   = useFU(100);
  const refRel    = useFU(0);

  return (
    <div className="ir-page">
      <style>{css}</style>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="ir-hero">
        <img src={heroImg} alt="" className="ir-hero-photo" aria-hidden="true" />
        <div className="ir-hero-wash" />
        <div className="ir-hero-dots" />
        <div className="ir-hero-burst" />
        <div className="ir-hero-sky" />

        <div className="ir-hero-inner">

          {/* ── LEFT copy ── */}
          <div>
            <div className="ir-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="ir-bread-active">Infrared Thermography</span>
            </div>

            <div className="ir-badge" style={{ marginBottom: 20 }}>
              <Thermometer size={11} /> Predictive Analytics
            </div>

            <h1 style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Infrared<br />
              <span style={{
                background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Thermography
              </span>
            </h1>

            {/* Flickering sub-headline — from screenshot */}
            <p className="ir-flicker" style={{
              fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#062979",
              letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
            }}>
              🌡️ Detect hot spots & cold spots before they become failures
            </p>

            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 14, maxWidth: 480 }}>
              Infrared thermography, also known as{" "}
              <strong style={{ color: "#1e293b" }}>thermal imaging</strong>, is complementary to ultrasound analysis — especially in{" "}
              <strong style={{ color: "#b45309" }}>electrical and steam trap testing</strong>, but also for mechanical applications.
            </p>
            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Thermal imaging is sensitive to{" "}
              <strong style={{ color: "#ea580c" }}>temperature change</strong> — helping detect{" "}
              <strong style={{ color: "#ef4444" }}>Hot Spots</strong> and{" "}
              <strong style={{ color: "#0369a1" }}>Cold Spots</strong> across electrical, mechanical and process equipment.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="ir-btn-primary">Request a Survey <ArrowRight size={16} /></Link>
              {/* <Link to="/services" className="ir-btn-ghost">All Services</Link> */}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="ir-stat" style={{ minWidth: 120 }}>
                  <div className="ir-stat-num">{s.num}</div>
                  <div className="ir-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT thermal image panel ── */}
          {/* <div className="ir-video-col">
            <HeroPanel />
          </div> */}
        </div>
      </section>

      {/* ═══════════════ OVERVIEW ═══════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="ir-two-col">
          <div ref={refOverL} className="fu">
            <div className="ir-section-badge"><Zap size={11} /> Electrical Application</div>
            {/* <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117", lineHeight: 1.2, marginBottom: 20 }}>
              See what standard inspection misses
            </h2> */}
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              Infrared thermography, also known as <strong style={{ color: "#1e293b" }}>thermal imaging</strong>, is complementary to ultrasound analysis, especially in <strong style={{ color: "#b45309" }}>electrical and steam trap testing</strong>, but also for mechanical applications.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              Thermal imaging is sensitive to temperature change — making it the most effective non-contact method for identifying <strong style={{ color: "#ef4444" }}>hot spots</strong> (overloaded connections, failing components) and <strong style={{ color: "#0369a1" }}>cold spots</strong> (blocked traps, moisture ingress, insulation voids).
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              When combined with ultrasound analysis, thermography provides a comprehensive condition assessment of both electrical and mechanical systems in a single site visit.
            </p>
            <div className="ir-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Complementary Dual Technology</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                <strong>Ultrasound</strong> detects the acoustic signature of leaks and electrical discharge. <strong>Infrared thermography</strong> confirms the thermal consequence. Together they eliminate false negatives and deliver definitive diagnosis.
              </p>
            </div>
          </div>

          <div ref={refOverR} className="fu">
            <div className="ir-img-wrap">
              <ImgFallback src={sectionImg} alt="Thermal imaging of electrical panel" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Method</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Infrared Thermography Camera</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Non-contact · Live equipment · No shutdown</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ HOT & COLD SPOTS ═══════════════ */}
      <section style={{ background: "#fffbeb", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refSpotH} className="fu" style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="ir-section-badge" style={{ margin: "0 auto 12px" }}><Eye size={11} /> What We Detect</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Hot Spots & Cold Spots — Explained</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 540, margin: "12px auto 0" }}>
              Thermography helps in detecting two critical anomaly types — each indicating a different failure mode.
            </p>
          </div>
          <div className="ir-split">
            {/* Hot spot card */}
            <div className="ir-hot-card fu" style={{ opacity: 1, transform: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Flame size={20} color="#ef4444" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ef4444", margin: 0 }}>🔴 Hot Spots</h3>
              </div>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 14 }}>
                Elevated temperatures above the expected baseline — indicating energy loss, stress concentration or imminent failure.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {["Overloaded electrical connections", "Loose or corroded terminals", "Failing motor insulation", "Overheated bearings and couplings", "Steam traps passing live steam"].map(i => (
                  <li key={i} style={{ display: "flex", gap: 8, fontSize: 13.5, color: "#475569" }}>
                    <span style={{ color: "#ef4444", flexShrink: 0, marginTop: 2 }}>●</span>{i}
                  </li>
                ))}
              </ul>
            </div>
            {/* Cold spot card */}
            <div className="ir-cold-card fu" style={{ opacity: 1, transform: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(14,165,233,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Thermometer size={20} color="#0ea5e9" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0369a1", margin: 0 }}>🔵 Cold Spots</h3>
              </div>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 14 }}>
                Temperatures below expected baseline — indicating blockage, moisture ingress, insulation void or loss of heat transfer.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {["Blocked steam traps and valves", "Moisture ingress behind cladding", "Insulation voids in building fabric", "Coolant flow restrictions", "Cold joints in process piping"].map(i => (
                  <li key={i} style={{ display: "flex", gap: 8, fontSize: 13.5, color: "#475569" }}>
                    <span style={{ color: "#0ea5e9", flexShrink: 0, marginTop: 2 }}>●</span>{i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ APPLICATIONS ═══════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refAppH} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="ir-section-badge" style={{ margin: "0 auto 12px" }}><Zap size={11} /> Applications</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Where We Apply Thermography</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>Electrical, mechanical, steam and building applications — all surveyed with calibrated infrared cameras.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default InfraredThermography;