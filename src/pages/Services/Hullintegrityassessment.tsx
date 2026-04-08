import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, Search, BarChart3, FileText,
  CheckCircle2, TrendingDown, ChevronRight,
  Shield, Waves, Activity, Building2,
  Anchor, AlertTriangle, Navigation, Layers,
} from "lucide-react";

import heroImg    from "@/assets/Hull Integrity Assessment.png";
import sectionImg from "@/assets/Hull Integrity Assessment.png";

/* ═══════════════════════════════════════════════════════════
   STYLES  — same design tokens as AirWaterTight / PD / BC pages
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .hi-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .hi-page * { box-sizing: border-box; }

  /* ── Flicker ── */
  @keyframes hi-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% {
      opacity: 1;
      text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
    }
    20%,24%,55% { opacity: 0.35; text-shadow: none; }
  }
  @keyframes hi-fade-in {
    0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
    60%  { opacity: 0.85; }
    100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
  }
  .hi-flicker {
    opacity: 0;
    animation:
      hi-fade-in  1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
      hi-flicker  4s  ease-in-out                   2s  infinite;
  }

  /* ── Hero ── */
  .hi-hero {
    position: relative; overflow: hidden;
    min-height: 88vh; display: flex; align-items: center;
  }
  .hi-hero-photo {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.62); pointer-events: none;
  }
  .hi-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.88) 0%,
      rgba(224,242,254,0.80) 55%,
      rgba(255,251,235,0.88) 100%);
  }
  .hi-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .hi-hero-burst {
    position: absolute; pointer-events: none;
    width: 70vw; height: 70vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .hi-hero-sky {
    position: absolute; pointer-events: none;
    width: 55vw; height: 55vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
    bottom: -15%; right: -5%;
  }

  /* ── Two-column hero ── */
  .hi-hero-inner {
    position: relative; max-width: 1280px; margin: 0 auto;
    padding: 80px 28px 72px; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
  }
  @media (max-width: 900px) {
    .hi-hero-inner { grid-template-columns: 1fr; }
    .hi-video-col { order: -1; }
  }

  /* ── Badge ── */
  .hi-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.10); border: 1px solid rgba(245,158,11,0.35);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px;
  }

  /* ── Stat cards ── */
  .hi-stat {
    background: rgba(255,255,255,0.82); border: 1px solid rgba(251,191,36,0.28);
    border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .hi-stat:hover { border-color: rgba(245,158,11,0.50); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
  .hi-stat-num   { font-size: 26px; font-weight: 900; color: #ea580c; line-height: 1; }
  .hi-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }

  /* ── Breadcrumb ── */
  .hi-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
  .hi-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
  .hi-bread a:hover { color: #f59e0b; }
  .hi-bread-sep { color: #cbd5e1; }
  .hi-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

  /* ── Section badge ── */
  .hi-section-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
  }

  /* ── Two-col grids ── */
  .hi-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .hi-two-col { grid-template-columns: 1fr; gap: 36px; } }
  .hi-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 767px) { .hi-split { grid-template-columns: 1fr; } }

  /* ── Application cards ── */
  .hi-app-card {
    background: #fff; border: 1px solid #eef0f4; border-radius: 16px;
    padding: 24px 20px; position: relative; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .hi-app-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f59e0b, transparent); opacity: 0; transition: opacity 0.2s;
  }
  .hi-app-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.28); transform: translateY(-4px); }
  .hi-app-card:hover::before { opacity: 1; }
  .hi-app-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 14px; }

  /* ── Process steps ── */
  .hi-step {
    position: relative; background: #fff; border: 1px solid #eef0f4;
    border-radius: 16px; padding: 28px 24px; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .hi-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#f59e0b,transparent); opacity: 0; transition: opacity 0.22s; }
  .hi-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.35); transform: translateY(-4px); }
  .hi-step:hover::before { opacity: 1; }
  .hi-step-num { font-size: 44px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 14px; right: 16px; user-select: none; }
  .hi-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }

  /* ── Problem / solution ── */
  .hi-problem-card  { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
  .hi-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15);  border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }

  /* ── Image wrap ── */
  .hi-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
  .hi-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(245,158,11,0.08),transparent 60%); pointer-events: none; }
  .hi-img-placeholder { width: 100%; background: linear-gradient(135deg,#fffbeb 0%,#fde68a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

  /* ── Highlight box ── */
  .hi-highlight { background: linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }

  /* ── Industry pills ── */
  .hi-industry-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid #fffbeb; border-radius: 10px;
    padding: 10px 16px; font-size: 13px; font-weight: 500; color: #334155;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .hi-industry-pill:hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
  .hi-industry-dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }

  /* ── Buttons ── */
  .hi-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#f59e0b,#b45309); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
  .hi-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.50); }
  .hi-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); color: #334155; font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(251,191,36,0.28); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
  .hi-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }

  /* ── Related links ── */
  .hi-related { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border: 1px solid #eef0f4; border-radius: 12px; text-decoration: none; color: #334155; font-size: 13.5px; font-weight: 500; transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
  .hi-related:hover { border-color: rgba(245,158,11,0.35); color: #b45309; background: #fffbeb; transform: translateX(4px); }

  /* ── CTA ── */
  .hi-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .hi-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.20) 0%,transparent 65%); top: -200px; right: -100px; pointer-events: none; }

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
    <div className="hi-img-placeholder" style={{ height: fallbackHeight }}>
      <Anchor size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#64748b" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ── Data ── */
const stats = [
  { num: "NDT",   label: "Advanced engineering technology" },
  { num: "360°",  label: "Full hull perimeter coverage"    },
  { num: "0",     label: "Dry-dock required"               },
];

const applications = [
  { icon: <Anchor size={19} />,     title: "Life Boats",                    desc: "Structural integrity and watertightness assessment of lifeboat hulls, hatch seals and propeller shaft sealing arrangements." },
  { icon: <Navigation size={19} />, title: "Yachts & Pleasure Craft",       desc: "Hull soundness evaluation for yachts, identifying delamination, osmotic blistering and structural weak points below the waterline." },
  { icon: <Waves size={19} />,      title: "Propeller Shaft Seals",         desc: "Assessment of propeller shaft seal and stern tube sealing arrangements for water ingress risk and seal integrity." },
  { icon: <Layers size={19} />,     title: "Underwater Hatch Covers",       desc: "Tightness verification of hatches and access points leading to underwater compartments and bilge spaces." },
  { icon: <Shield size={19} />,     title: "FRP & GRP Hull Structures",     desc: "Detection of delamination, voids and water ingress within fibre-reinforced and glass-reinforced plastic hull laminates." },
  { icon: <Building2 size={19} />,  title: "Workboats & Patrol Vessels",    desc: "Hull integrity surveys for commercial workboats, pilot boats and patrol vessels requiring regulatory compliance." },
];

const processSteps = [
  { icon: <Search size={20} />,   title: "External Hull Survey",        desc: "Advanced engineering technology is applied to scan the external hull surface, mapping structural condition, wall thickness and any areas of concern." },
  { icon: <Waves size={20} />,    title: "Shaft Seal & Hatch Inspection", desc: "Propeller shaft seals, stern tube arrangements and all underwater hatch sealing surfaces are individually assessed for soundness and water ingress risk." },
  { icon: <BarChart3 size={20}/>, title: "Defect Mapping & Analysis",   desc: "All identified anomalies — delamination, voids, thinning or seal failures — are mapped to a hull diagram with GPS-referenced locations and severity ratings." },
  { icon: <FileText size={20} />, title: "Report & Recommendations",    desc: "A comprehensive condition report is issued with photographic evidence, defect locations, severity ratings and prioritised remediation recommendations." },
];

const problemPoints = [
  "Hull delamination and osmotic blistering are invisible to visual inspection above the waterline",
  "Propeller shaft seal failures lead to undetected water ingress into machinery spaces",
  "Compromised underwater hatch seals pose a serious flooding and safety risk",
  "Traditional surveys require dry-docking, causing costly downtime and scheduling delays",
  "FRP and GRP hulls can harbour internal voids that weaken structural integrity without any visible signs",
];
const solutionPoints = [
  "Advanced engineering technology assesses hull condition without dry-docking",
  "Full 360° coverage of hull, shaft seals and underwater hatch arrangements in one mobilisation",
  "Delamination, voids and water ingress detected within composite hull laminates",
  "Propeller shaft and stern tube sealing soundness verified non-invasively",
  "Detailed condition report with defect map enables targeted, cost-effective repairs",
];
const impactPoints = [
  { icon: <Shield size={15} />,       label: "Ensure vessel seaworthiness and crew safety with verified hull integrity"  },
  { icon: <TrendingDown size={15} />, label: "Avoid costly emergency repairs by identifying defects at an early stage"   },
  { icon: <CheckCircle2 size={15} />, label: "Meet class society and flag state regulatory survey requirements"           },
  { icon: <Anchor size={15} />,       label: "Eliminate dry-docking cost with in-water hull condition assessment"         },
];
const relatedServices = [
  { label: "Air / Water Tight Integrity Assessment",          path: "/services/air-water-tight"     },
  { label: "HT / HV Electrical Partial Discharge Detection",  path: "/services/partial-discharge"   },
  { label: "Slow Speed Bearing Condition Assessment",         path: "/services/bearing-condition"   },
  { label: "Compressed Air Leak Detection",                   path: "/services/compressed-air"      },
];
const industries = [
  "Merchant Shipping", "Yacht & Marina", "Defence & Coast Guard",
  "Offshore & Oil & Gas", "Port Authorities", "Fishing Industry",
  "Passenger Ferries", "Shipbuilding & Repair",
];

/* ── Sub-components ── */
const AppCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="hi-app-card fu">
      <div className="hi-app-icon">{item.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
};
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="hi-step fu">
      <div className="hi-step-num">0{index + 1}</div>
      <div className="hi-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const HullIntegrityAssessment = () => {
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
    <div className="hi-page">
      <style>{css}</style>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="hi-hero">
        <img src={heroImg} alt="" className="hi-hero-photo" aria-hidden="true" />
        <div className="hi-hero-wash" />
        <div className="hi-hero-dots" />
        <div className="hi-hero-burst" />
        <div className="hi-hero-sky" />

        <div className="hi-hero-inner">
          {/* ── LEFT copy ── */}
          <div>
            <div className="hi-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="hi-bread-active">Hull Integrity Assessment — Life Boats / Yacht</span>
            </div>

            <div className="hi-badge" style={{ marginBottom: 20 }}>
              <Anchor size={11} /> Marine Hull Inspection
            </div>

            <h1 style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Hull Integrity Assessment<br />
              <span style={{
                background: "linear-gradient(90deg,#f59e0b 0%,#b45309 60%,#f59e0b 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                for Life Boats / Yacht
              </span>
            </h1>

            <p className="hi-flicker" style={{
              fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#062979",
              letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
            }}>
              ⚡ Hidden hull damage and seal failures are a risk you cannot afford to ignore
            </p>

            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Hull Integrity Assessment conducted with{" "}
              <strong style={{ color: "#b45309" }}>Advanced Engineering Technologies</strong> — assessing the state of the boat's hull, soundness of{" "}
              <strong style={{ color: "#b45309" }}>propeller shaft seals</strong> and sealing arrangements of hatches leading to underwater compartments.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="hi-btn-primary">Request an Assessment <ArrowRight size={16} /></Link>
              {/* <Link to="/services" className="hi-btn-ghost">All Services</Link> */}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="hi-stat" style={{ minWidth: 120 }}>
                  <div className="hi-stat-num">{s.num}</div>
                  <div className="hi-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT (video col placeholder) ── */}
          <div className="hi-video-col" />
        </div>
      </section>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="hi-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="hi-section-badge"><Zap size={11} /> How It Works</div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              This service uses <strong style={{ color: "#1e293b" }}>Advanced Engineering Technologies</strong> to conduct a comprehensive hull integrity assessment — evaluating the structural soundness of the boat's hull, detecting internal delamination, voids and water ingress within composite laminates.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              The assessment also covers <strong style={{ color: "#1e293b" }}>propeller shaft seals and stern tube arrangements</strong>, as well as the sealing integrity of all hatches and access points leading to underwater compartments — areas where undetected failures pose the greatest safety risk.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              Applicable to <strong style={{ color: "#b45309" }}>life boats, yachts, pleasure craft, workboats and patrol vessels</strong> — delivering regulatory-grade condition data without the time and cost of a dry-dock survey.
            </p>
            <div className="hi-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Why Advanced Engineering Technology?</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                Unlike visual surveys, these technologies detect <strong>sub-surface anomalies invisible to the naked eye</strong> — providing verified hull condition data that supports informed maintenance decisions and regulatory compliance.
              </p>
            </div>
          </div>

          <div ref={refOverviewR} className="fu">
            <div className="hi-img-wrap">
              <ImgWithFallback src={sectionImg} alt="Technician performing hull integrity assessment" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Method</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Advanced Engineering Technology Survey</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Non-destructive · No dry-dock required</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ APPLICATIONS ════════════════════ */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refAppHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="hi-section-badge" style={{ margin: "0 auto 12px" }}><Anchor size={11} /> Applications</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Vessels & Structures We Assess</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>Trusted across the marine sector for hull integrity surveys on life-safety and commercial vessels.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default HullIntegrityAssessment;