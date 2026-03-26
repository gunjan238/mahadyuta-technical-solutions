import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, Search, BarChart3, FileText,
  CheckCircle2, TrendingDown, ChevronRight,
  Shield, Waves, Activity, Building2, Radio, Cpu,
  Thermometer, AlertTriangle,
} from "lucide-react";

import heroImg    from "@/assets/Electrical-Partial-Discharge.png"; // swap to actual PD image when available
import sectionImg from "@/assets/Electrical-Partial-Discharge.png";

/* ═══════════════════════════════════════════════════════════
   STYLES  (same design tokens as AirWaterTight, accent = electric blue/amber)
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
 
  .pd-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .pd-page * { box-sizing: border-box; }
 
  /* ── Flicker ── */
  @keyframes pd-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% {
      opacity: 1;
      text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
    }
    20%,24%,55% { opacity: 0.35; text-shadow: none; }
  }
  @keyframes pd-fade-in {
    0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
    60%  { opacity: 0.85; }
    100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
  }
  .pd-flicker {
    opacity: 0;
    animation:
      pd-fade-in  1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
      pd-flicker  4s  ease-in-out                   2s  infinite;
  }
 
  /* ── Hero ── */
  .pd-hero {
    position: relative; overflow: hidden;
    min-height: 88vh; display: flex; align-items: center;
  }
  .pd-hero-photo {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.62); pointer-events: none;
  }
  .pd-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(239,246,255,0.90) 0%,
      rgba(224,242,254,0.82) 55%,
      rgba(255,251,235,0.88) 100%);
  }
  .pd-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .pd-hero-burst {
    position: absolute; pointer-events: none;
    width: 70vw; height: 70vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .pd-hero-sky {
    position: absolute; pointer-events: none;
    width: 55vw; height: 55vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
    bottom: -15%; right: -5%;
  }
 
  /* ── Two-column hero ── */
  .pd-hero-inner {
    position: relative; max-width: 1280px; margin: 0 auto;
    padding: 80px 28px 72px; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
  }
  @media (max-width: 900px) {
    .pd-hero-inner { grid-template-columns: 1fr; }
    .pd-video-col { order: -1; }
  }
 
  /* ── Badge ── */
  .pd-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.10); border: 1px solid rgba(245,158,11,0.35);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px;
  }
 
  /* ── Stat cards ── */
  .pd-stat {
    background: rgba(255,255,255,0.82); border: 1px solid rgba(251,191,36,0.28);
    border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .pd-stat:hover { border-color: rgba(245,158,11,0.50); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
  .pd-stat-num   { font-size: 26px; font-weight: 900; color: #b45309; line-height: 1; }
  .pd-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }
 
  /* ── Breadcrumb ── */
  .pd-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
  .pd-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
  .pd-bread a:hover { color: #f59e0b; }
  .pd-bread-sep { color: #cbd5e1; }
  .pd-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }
 
  /* ── Section badge ── */
  .pd-section-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
  }
 
  /* ── Two-col grids ── */
  .pd-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .pd-two-col { grid-template-columns: 1fr; gap: 36px; } }
  .pd-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 767px) { .pd-split { grid-template-columns: 1fr; } }
 
  /* ── Application cards ── */
  .pd-app-card {
    background: #fff; border: 1px solid #eef0f4; border-radius: 16px;
    padding: 24px 20px; position: relative; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .pd-app-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f59e0b, transparent); opacity: 0; transition: opacity 0.2s;
  }
  .pd-app-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.28); transform: translateY(-4px); }
  .pd-app-card:hover::before { opacity: 1; }
  .pd-app-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 14px; }
 
  /* ── Process steps ── */
  .pd-step {
    position: relative; background: #fff; border: 1px solid #eef0f4;
    border-radius: 16px; padding: 28px 24px; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .pd-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#f59e0b,transparent); opacity: 0; transition: opacity 0.22s; }
  .pd-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.35); transform: translateY(-4px); }
  .pd-step:hover::before { opacity: 1; }
  .pd-step-num { font-size: 44px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 14px; right: 16px; user-select: none; }
  .pd-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }
 
  /* ── Problem / solution ── */
  .pd-problem-card  { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
  .pd-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15);  border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }
 
  /* ── Image wrap ── */
  .pd-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
  .pd-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(245,158,11,0.08),transparent 60%); pointer-events: none; }
  .pd-img-placeholder { width: 100%; background: linear-gradient(135deg,#fffbeb 0%,#fde68a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }
 
  /* ── Highlight box ── */
  .pd-highlight { background: linear-gradient(135deg,#f59e0b 0%,#b45309 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }
 
  /* ── Industry pills ── */
  .pd-industry-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid #fffbeb; border-radius: 10px;
    padding: 10px 16px; font-size: 13px; font-weight: 500; color: #334155;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .pd-industry-pill:hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
  .pd-industry-dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }
 
  /* ── Buttons ── */
  .pd-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#f59e0b,#b45309); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
  .pd-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.50); }
  .pd-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); color: #334155; font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(251,191,36,0.28); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
  .pd-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }
 
  /* ── Related links ── */
  .pd-related { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border: 1px solid #eef0f4; border-radius: 12px; text-decoration: none; color: #334155; font-size: 13.5px; font-weight: 500; transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
  .pd-related:hover { border-color: rgba(245,158,11,0.35); color: #b45309; background: #fffbeb; transform: translateX(4px); }
 
  /* ── CTA ── */
  .pd-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .pd-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.18) 0%,transparent 65%); top: -200px; right: -100px; pointer-events: none; }
 
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
    <div className="pd-img-placeholder" style={{ height: fallbackHeight }}>
      <Activity size={28} color="#3b82f6" />
      <span style={{ fontSize: 13, color: "#64748b" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ── Data ── */
const stats = [
  { num: "25 m",  label: "Safe detection distance"     },
  { num: "100%",  label: "Non-contact inspection"      },
  { num: "3-in-1",label: "Ultrasound + Thermography"   },
];

const applications = [
  { icon: <Zap size={19} />,        title: "High Voltage Transformers",      desc: "Early corona, tracking and arcing detection on HV power transformers before insulation failure occurs." },
  { icon: <Radio size={19} />,      title: "Current / Potential Transformers", desc: "Non-contact PD scanning on CTs and PTs to verify insulation health without system shutdown." },
  { icon: <Shield size={19} />,     title: "Surge Arresters & Lightning Arresters", desc: "Condition monitoring of surge protection devices to confirm proper functioning under live voltage." },
  { icon: <Cpu size={19} />,        title: "Insulation Discs & Bushings",    desc: "Detection of partial discharges through insulation discs and high-voltage bushing assemblies." },
  { icon: <Activity size={19} />,   title: "Transmission Lines",             desc: "Aerial and tower-level scanning of overhead HV transmission lines for corona and arcing defects." },
  { icon: <Building2 size={19} />,  title: "Switch Gears & Electrical Panels", desc: "In-service inspection of MV/HV switchgear panels and bus-bar assemblies for internal discharge activity." },
];

const processSteps = [
  { icon: <Search size={20} />,    title: "Safe Stand-off Scanning",   desc: "Technician inspects energised equipment from a safe distance of up to 25 metres using a directional ultrasound detector." },
  { icon: <Waves size={20} />,     title: "PD Signal Acquisition",     desc: "The detector captures airborne ultrasonic emissions produced by corona, tracking and arcing discharges across all phases." },
  { icon: <Thermometer size={20}/>,title: "Thermographic Substantiation", desc: "Thermal imaging is combined with ultrasound data to confirm the defect, quantify severity and map heat signatures." },
  { icon: <FileText size={20} />,  title: "Report & Maintenance Plan", desc: "Each identified defect is logged with photo evidence, severity rating and prioritised corrective action recommendations." },
];

const problemPoints = [
  "Partial discharges are invisible and silent to the naked eye",
  "Undetected corona and tracking lead to progressive insulation breakdown",
  "Catastrophic transformer failures cause unplanned outages and high replacement costs",
  "Traditional tests require de-energisation, risking production loss",
  "Equipment damage and arc-flash incidents pose serious safety hazards",
];
const solutionPoints = [
  "Ultrasound technology detects PD emissions from up to 25 metres safely",
  "Equipment stays fully energised — zero production downtime",
  "Thermography cross-validates findings for accurate severity assessment",
  "Works on all HV assets: transformers, switchgear, lines and arresters",
  "Early intervention prevents catastrophic failures and extends asset life",
];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Prevent catastrophic failures through early-stage PD detection"      },
  { icon: <Shield size={15} />,       label: "Eliminate arc-flash risk with 25 m stand-off inspections"            },
  { icon: <CheckCircle2 size={15} />, label: "Achieve regulatory compliance with documented condition reports"       },
  { icon: <Activity size={15} />,     label: "Extend asset life and reduce unplanned maintenance spend"             },
];
const relatedServices = [
  { label: "Air / Water Tight Integrity Assessment",          path: "/services/air-water-tight"     },
  { label: "Compressed Air Leak Detection",                   path: "/services/compressed-air"      },
  { label: "Internal Hydraulic / Pneumatic Leak Detection",   path: "/services/hydraulic-pneumatic" },
  { label: "Steam Trap / Valve Pass Audit",                   path: "/services/steam-trap"          },
];
const industries = [
  "Power Generation", "Transmission & Distribution", "Petrochemical Plants",
  "Steel & Metal Works", "Cement Industry", "Pharmaceutical Plants",
  "Data Centres", "Ports & Shipyards",
];

/* ── Sub-components ── */
const AppCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="pd-app-card fu">
      <div className="pd-app-icon">{item.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
};
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="pd-step fu">
      <div className="pd-step-num">0{index + 1}</div>
      <div className="pd-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const PartialDischargeDetection = () => {
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
    <div className="pd-page">
      <style>{css}</style>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="pd-hero">
        <img src={heroImg} alt="" className="pd-hero-photo" aria-hidden="true" />
        <div className="pd-hero-wash" />
        <div className="pd-hero-dots" />
        <div className="pd-hero-burst" />
        <div className="pd-hero-sky" />

        <div className="pd-hero-inner">
          {/* ── LEFT copy ── */}
          <div>
            <div className="pd-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="pd-bread-active">HT / HV Electrical Partial Discharge Detection</span>
            </div>

            <div className="pd-badge" style={{ marginBottom: 20 }}>
              <Zap size={11} /> Electrical Condition Monitoring
            </div>

            <h1
  style={{
    fontSize: "clamp(26px,4vw,50px)",
    fontWeight: 800,
    color: "#1e293b",
    lineHeight: 1.08,
    marginBottom: 16,
  }}
>
  HT / HV Electrical<br />
  <span
    style={{
      background: "linear-gradient(90deg, rgb(245, 158, 11) 0%, rgb(180, 83, 9) 60%, rgb(245, 158, 11) 100%)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      position: "relative",
      zIndex: 2,
    }}
  >
    Partial Discharge Detection
  </span>
</h1>

            {/* Flickering sub-headline */}
            <p className="pd-flicker" style={{
              fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#062979",
              letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
            }}>
              ⚡ Silent discharge activity is destroying your insulation right now
            </p>

            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Early detection of{" "}
              <strong style={{ color: "#b45309" }}>corona, tracking and arcing</strong> using reliable Ultrasound technology from a safe distance of{" "}
              <strong style={{ color: "#b45309" }}>25 metres</strong> — substantiated with Thermography for increased operational reliability, cost savings and safety.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="pd-btn-primary">Request an Assessment <ArrowRight size={16} /></Link>
              {/* <Link to="/services" className="pd-btn-ghost">All Services</Link> */}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="pd-stat" style={{ minWidth: 120 }}>
                  <div className="pd-stat-num">{s.num}</div>
                  <div className="pd-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT placeholder (swap with VideoPanel when video is available) ── */}
          <div className="pd-video-col" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* <div style={{
              position: "relative", borderRadius: 20, overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.16)", aspectRatio: "16/10",
              background: "#eff6ff", width: "100%",
            }}>
              <ImgWithFallback src={heroImg} alt="HV partial discharge inspection" fallbackHeight={340}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", bottom: 16, left: 16, zIndex: 2,
                background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(59,130,246,0.25)", borderLeft: "4px solid #3b82f6",
                borderRadius: 10, padding: "10px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6", display: "inline-block", animation: "pd-flicker 1.6s ease-in-out infinite" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8" }}>Live Inspection</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", marginTop: 4 }}>Partial Discharge Detection</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Ultrasound · Thermography · Non-contact</div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#eff6ff 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="pd-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="pd-section-badge"><Zap size={11} /> How It Works</div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              This service uses <strong style={{ color: "#1e293b" }}>airborne ultrasound technology</strong> to detect partial discharges — a directional ultrasound instrument captures the high-frequency emissions produced by corona, tracking and arcing activity on live HT/HV equipment, from a safe stand-off distance of up to{" "}
              <strong style={{ color: "#b45309" }}>25 metres</strong>.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              Highly appreciated for inspecting{" "}
              <strong style={{ color: "#1e293b" }}>high voltage transformers, current and potential transformers, surge arresters, insulation discs, transmission lines, switchgear and electrical panels</strong> — all without de-energisation or production shutdown.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              Results are further substantiated with <strong style={{ color: "#1e293b" }}>thermographic imaging</strong> to confirm defect location, quantify heat signatures and deliver a complete, evidence-based condition report.
            </p>
            <div className="pd-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Why Ultrasound + Thermography?</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                Ultrasound detects discharges that are <strong>invisible to thermal cameras alone</strong>. Combining both technologies eliminates false negatives and delivers the highest confidence in asset condition assessment.
              </p>
            </div>
          </div>

          <div ref={refOverviewR} className="fu">
            <div className="pd-img-wrap">
              <ImgWithFallback src={sectionImg} alt="Technician performing HV partial discharge inspection" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #b45309", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Method</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Airborne Ultrasound + Thermography</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Non-contact · Equipment stays energised</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ APPLICATIONS ════════════════════ */}
      <section style={{ background: "#eff6ff", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refAppHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="pd-section-badge" style={{ margin: "0 auto 12px" }}><Cpu size={11} /> Applications</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Electrical Equipment We Inspect</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>Trusted across power generation, transmission and industrial facilities for critical HT/HV asset inspection.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default PartialDischargeDetection;