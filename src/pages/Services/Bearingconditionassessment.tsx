import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, Search, BarChart3, FileText,
  CheckCircle2, TrendingDown, ChevronRight,
  Shield, Waves, Activity, Building2, Wind,
  Settings, Gauge, AlertTriangle, Droplets,
} from "lucide-react";

import heroImg    from "@/assets/Bearing-Condition-Assessment.png";
import sectionImg from "@/assets/Bearing-Condition-Assessment.png";

/* ═══════════════════════════════════════════════════════════
   STYLES  — same design tokens as AirWaterTight / PD pages
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .bc-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .bc-page * { box-sizing: border-box; }

  /* ── Flicker ── */
  @keyframes bc-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% {
      opacity: 1;
      text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
    }
    20%,24%,55% { opacity: 0.35; text-shadow: none; }
  }
  @keyframes bc-fade-in {
    0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
    60%  { opacity: 0.85; }
    100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
  }
  .bc-flicker {
    opacity: 0;
    animation:
      bc-fade-in  1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
      bc-flicker  4s  ease-in-out                   2s  infinite;
  }

  /* ── Hero ── */
  .bc-hero {
    position: relative; overflow: hidden;
    min-height: 88vh; display: flex; align-items: center;
  }
  .bc-hero-photo {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.62); pointer-events: none;
  }
  .bc-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.88) 0%,
      rgba(224,242,254,0.80) 55%,
      rgba(255,251,235,0.88) 100%);
  }
  .bc-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .bc-hero-burst {
    position: absolute; pointer-events: none;
    width: 70vw; height: 70vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .bc-hero-sky {
    position: absolute; pointer-events: none;
    width: 55vw; height: 55vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
    bottom: -15%; right: -5%;
  }

  /* ── Two-column hero ── */
  .bc-hero-inner {
    position: relative; max-width: 1280px; margin: 0 auto;
    padding: 80px 28px 72px; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
  }
  @media (max-width: 900px) {
    .bc-hero-inner { grid-template-columns: 1fr; }
    .bc-video-col { order: -1; }
  }

  /* ── Badge ── */
  .bc-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.10); border: 1px solid rgba(245,158,11,0.35);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px;
  }

  /* ── Stat cards ── */
  .bc-stat {
    background: rgba(255,255,255,0.82); border: 1px solid rgba(251,191,36,0.28);
    border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .bc-stat:hover { border-color: rgba(245,158,11,0.50); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
  .bc-stat-num   { font-size: 26px; font-weight: 900; color: #ea580c; line-height: 1; }
  .bc-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }

  /* ── Breadcrumb ── */
  .bc-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
  .bc-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
  .bc-bread a:hover { color: #f59e0b; }
  .bc-bread-sep { color: #cbd5e1; }
  .bc-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

  /* ── Section badge ── */
  .bc-section-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
  }

  /* ── Two-col grids ── */
  .bc-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .bc-two-col { grid-template-columns: 1fr; gap: 36px; } }
  .bc-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 767px) { .bc-split { grid-template-columns: 1fr; } }

  /* ── Application cards ── */
  .bc-app-card {
    background: #fff; border: 1px solid #eef0f4; border-radius: 16px;
    padding: 24px 20px; position: relative; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .bc-app-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f59e0b, transparent); opacity: 0; transition: opacity 0.2s;
  }
  .bc-app-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.28); transform: translateY(-4px); }
  .bc-app-card:hover::before { opacity: 1; }
  .bc-app-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 14px; }

  /* ── Process steps ── */
  .bc-step {
    position: relative; background: #fff; border: 1px solid #eef0f4;
    border-radius: 16px; padding: 28px 24px; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .bc-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#f59e0b,transparent); opacity: 0; transition: opacity 0.22s; }
  .bc-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.35); transform: translateY(-4px); }
  .bc-step:hover::before { opacity: 1; }
  .bc-step-num { font-size: 44px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 14px; right: 16px; user-select: none; }
  .bc-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }

  /* ── Problem / solution ── */
  .bc-problem-card  { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
  .bc-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15);  border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }

  /* ── Image wrap ── */
  .bc-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
  .bc-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(245,158,11,0.08),transparent 60%); pointer-events: none; }
  .bc-img-placeholder { width: 100%; background: linear-gradient(135deg,#fffbeb 0%,#fde68a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

  /* ── Highlight box ── */
  .bc-highlight { background: linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }

  /* ── Industry pills ── */
  .bc-industry-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid #fffbeb; border-radius: 10px;
    padding: 10px 16px; font-size: 13px; font-weight: 500; color: #334155;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .bc-industry-pill:hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
  .bc-industry-dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }

  /* ── Buttons ── */
  .bc-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#f59e0b,#b45309); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
  .bc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.50); }
  .bc-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); color: #334155; font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(251,191,36,0.28); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
  .bc-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }

  /* ── Related links ── */
  .bc-related { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border: 1px solid #eef0f4; border-radius: 12px; text-decoration: none; color: #334155; font-size: 13.5px; font-weight: 500; transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
  .bc-related:hover { border-color: rgba(245,158,11,0.35); color: #b45309; background: #fffbeb; transform: translateX(4px); }

  /* ── CTA ── */
  .bc-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .bc-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.20) 0%,transparent 65%); top: -200px; right: -100px; pointer-events: none; }

  /* ── Fade up ── */
  .fu { opacity: 0; transform: translateY(22px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .fu.vis { opacity: 1; transform: translateY(0); }
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
const ImgWithFallback = ({ src, alt, style, fallbackHeight = 440 }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="bc-img-placeholder" style={{ height: fallbackHeight }}>
      <Settings size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#64748b" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ── Data ── */
const stats = [
  { num: "2-in-1", label: "Ultrasound + Vibration analysis" },
  { num: "100%",   label: "Non-invasive monitoring"         },
  { num: "Early",  label: "Pre-failure detection"           },
];

const applications = [
  { icon: <Wind size={19} />,      title: "Wind Turbines",              desc: "Slow-speed main shaft and gearbox bearing monitoring on wind turbines — detecting faults before catastrophic failure." },
  { icon: <Settings size={19} />,  title: "Gearboxes & Reducers",       desc: "Condition assessment of low-RPM gearbox bearings in heavy industrial drives and speed reducers." },
  { icon: <Gauge size={19} />,     title: "Conveyor & Crusher Bearings", desc: "Monitoring of slow-speed conveyor head/tail pulleys and crusher bearings in mining and bulk handling." },
  { icon: <Activity size={19} />,  title: "Rolling Mills & Presses",    desc: "Bearing health assessment on rolling mill rolls, press drives and calendar rolls operating at low speeds." },
  { icon: <Building2 size={19} />, title: "Paper & Pulp Machinery",     desc: "Detection of lubrication deficiencies and early bearing wear on dryer rolls and slow-speed paper machines." },
  { icon: <Droplets size={19} />,  title: "Pump & Compressor Bearings", desc: "Lubrication pattern analysis and bearing condition monitoring on slow-running pumps and reciprocating compressors." },
];

const processSteps = [
  { icon: <Search size={20} />,   title: "Ultrasound Data Capture",    desc: "A contact ultrasound probe is applied directly to the bearing housing, capturing high-frequency acoustic emissions produced by the bearing at its early defect stage." },
  { icon: <Activity size={20} />, title: "Vibration Analysis",         desc: "Vibration measurements are taken simultaneously, providing amplitude and frequency data to cross-validate the ultrasound findings and characterise defect severity." },
  { icon: <BarChart3 size={20}/>, title: "Software-Based Assessment",  desc: "Recorded ultrasound signals are analysed with specialist software to assess bearing condition, identify abnormalities and evaluate lubrication patterns." },
  { icon: <FileText size={20} />, title: "Report & Lubrication Plan",  desc: "A condition report is issued with severity rating, trend data, lubrication recommendations and a prioritised maintenance action plan." },
];

const problemPoints = [
  "Slow-speed bearings produce very low vibration signals — traditional vibration analysis often misses early faults",
  "Inadequate or excessive lubrication is invisible without the right diagnostic tool",
  "Bearing failure on critical equipment like wind turbines leads to extremely costly unplanned downtime",
  "Visual inspection cannot detect sub-surface fatigue or lubrication film breakdown",
  "Waiting for audible noise means the bearing is already in an advanced failure stage",
];
const solutionPoints = [
  "Ultrasound technology detects bearing anomalies at the earliest possible stage",
  "Vibration analysis confirms and characterises the defect for accurate severity grading",
  "Electronic recording of ultrasound data enables trending and condition history",
  "Lubrication pattern assessment prevents both over- and under-lubrication",
  "Early intervention reverses bearing deterioration and avoids replacement costs",
];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Prevent costly bearing failures through pre-failure detection"         },
  { icon: <Droplets size={15} />,     label: "Optimise lubrication intervals and quantities with data-driven insight" },
  { icon: <CheckCircle2 size={15} />, label: "Extend bearing life through timely corrective maintenance"              },
  { icon: <Shield size={15} />,       label: "Reduce unplanned downtime on critical slow-speed machinery"             },
];
const relatedServices = [
  { label: "HT / HV Electrical Partial Discharge Detection", path: "/services/partial-discharge"   },
  { label: "Air / Water Tight Integrity Assessment",          path: "/services/air-water-tight"     },
  { label: "Compressed Air Leak Detection",                   path: "/services/compressed-air"      },
  { label: "Steam Trap / Valve Pass Audit",                   path: "/services/steam-trap"          },
];
const industries = [
  "Wind Energy", "Mining & Quarrying", "Paper & Pulp",
  "Steel & Rolling Mills", "Cement Plants", "Sugar Industry",
  "Ports & Material Handling", "Power Generation",
];

/* ── Sub-components ── */
const AppCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="bc-app-card fu">
      <div className="bc-app-icon">{item.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
};
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="bc-step fu">
      <div className="bc-step-num">0{index + 1}</div>
      <div className="bc-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const BearingConditionAssessment = () => {
  const refOverviewL = useFU(0);
  const refOverviewR = useFU(100);
  const refAppHead   = useFU(0);
  const refProbHead  = useFU(0);
  const refProbL     = useFU(0);
  const refProbR     = useFU(100);
  const refProcHead  = useFU(0);
  const refIndL      = useFU(0);
  const refIndR      = useFU(100);
  const refRelated   = useFU(0);

  return (
    <div className="bc-page">
      <style>{css}</style>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="bc-hero">
        <img src={heroImg} alt="" className="bc-hero-photo" aria-hidden="true" />
        <div className="bc-hero-wash" />
        <div className="bc-hero-dots" />
        <div className="bc-hero-burst" />
        <div className="bc-hero-sky" />

        <div className="bc-hero-inner">
          {/* ── LEFT copy ── */}
          <div>
            <div className="bc-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="bc-bread-active">Slow Speed Bearing Condition Assessment & Lubrication Management</span>
            </div>

            <div className="bc-badge" style={{ marginBottom: 20 }}>
              <Settings size={11} /> Bearing Condition Monitoring
            </div>

            <h1 style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Slow Speed Bearing<br />
              <span style={{
                
                WebkitBackgroundClip: "text", WebkitTextFillColor: "#1e293b", backgroundClip: "text",
              }}>
                Condition Assessment<br />
                <span style={{
                  background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>& <br />Lubrication Management</span>
                
              </span>
            </h1>

            <p className="bc-flicker" style={{
              fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#062979",
              letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
            }}>
              ⚡ Bearing failures that could have been prevented are costing you more than you think
            </p>

            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Regular monitoring of bearing condition and lubrication using both{" "}
              <strong style={{ color: "#b45309" }}>Ultrasound detection technology and Vibration analysis</strong> — any abnormality produces ultrasound at its earliest stage, making reversal of bearing deterioration possible before failure occurs.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="bc-btn-primary">Request an Assessment <ArrowRight size={16} /></Link>
              {/* <Link to="/services" className="bc-btn-ghost">All Services</Link> */}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="bc-stat" style={{ minWidth: 120 }}>
                  <div className="bc-stat-num">{s.num}</div>
                  <div className="bc-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT (video col placeholder) ── */}
          <div className="bc-video-col" />
        </div>
      </section>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="bc-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="bc-section-badge"><Zap size={11} /> How It Works</div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              This service uses <strong style={{ color: "#1e293b" }}>Ultrasound detection technology and Vibration analysis</strong> to determine the condition of slow-speed bearings. Any abnormality occurring in a bearing produces ultrasound at its early stage — long before it is detectable by vibration or audible noise alone.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              The ultrasound signal is <strong style={{ color: "#1e293b" }}>recorded electronically and analysed with sophisticated software</strong> to assess the bearing condition and lubrication pattern — providing accurate, repeatable trending data for each asset.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              Particularly effective for <strong style={{ color: "#b45309" }}>wind turbines, gearboxes, conveyor drives, rolling mills and any machinery operating at low rotational speeds</strong> where conventional vibration analysis underperforms.
            </p>
            <div className="bc-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Why Ultrasound + Vibration Analysis?</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                Ultrasound captures the <strong>first acoustic signature of bearing distress</strong> — vibration analysis then characterises severity. Together they deliver certainty that neither technology achieves alone.
              </p>
            </div>
          </div>

          <div ref={refOverviewR} className="fu">
            <div className="bc-img-wrap">
              <ImgWithFallback src={sectionImg} alt="Technician performing slow speed bearing condition assessment" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Method</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Ultrasound + Vibration Analysis</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Non-invasive · Software-assisted assessment</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ APPLICATIONS ════════════════════ */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refAppHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="bc-section-badge" style={{ margin: "0 auto 12px" }}><Settings size={11} /> Applications</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Machinery & Equipment We Assess</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>Trusted across heavy industry and renewable energy for slow-speed bearing condition monitoring and lubrication management.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default BearingConditionAssessment;