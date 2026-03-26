import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Droplets, Search, BarChart3, FileText,
  CheckCircle2, AlertTriangle, TrendingDown, Zap, ChevronRight,
  Shield, MapPin, Gauge, Radio, Layers,
} from "lucide-react";

import heroImg    from "@/assets/Leak-Detection.png"; // swap to underground image when available
import sectionImg from "@/assets/Leak-Detection.png";

/* ── Video: place at src/assets/videos/underground-leak.mp4 ── */
// let serviceVideo: string | null = null;
// try {
//   serviceVideo = new URL("@/assets/videos/underground-leak.mp4", import.meta.url).href;
// } catch { serviceVideo = null; }

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .ul-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .ul-page * { box-sizing: border-box; }

  /* ── Flicker ── */
  @keyframes ul-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% {
      opacity: 1;
      text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
    }
    20%,24%,55% { opacity: 0.35; text-shadow: none; }
  }
  @keyframes ul-fade-in {
    0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
    60%  { opacity: 0.85; }
    100% { opacity: 1; transform: translateY(0); letter-spacing: 0.04em; }
  }
  .ul-flicker {
    opacity: 0;
    animation:
      ul-fade-in  1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
      ul-flicker  4s  ease-in-out                   2s  infinite;
  }

  /* ── Hero ── */
  .ul-hero {
    position: relative; overflow: hidden;
    min-height: 88vh; display: flex; align-items: center;
  }
  .ul-hero-photo {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.62); pointer-events: none;
  }
  .ul-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.88) 0%,
      rgba(224,242,254,0.80) 55%,
      rgba(255,251,235,0.88) 100%);
  }
  .ul-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .ul-hero-burst {
    position: absolute; pointer-events: none;
    width: 70vw; height: 70vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .ul-hero-sky {
    position: absolute; pointer-events: none;
    width: 55vw; height: 55vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
    bottom: -15%; right: -5%;
  }

  /* ── Two-column hero grid ── */
  .ul-hero-inner {
    position: relative; max-width: 1280px; margin: 0 auto;
    padding: 80px 28px 72px; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
  }
  @media (max-width: 900px) {
    .ul-hero-inner { grid-template-columns: 1fr; }
    .ul-video-col { order: -1; }
  }

  /* ── Video / photo panel ── */
  .ul-video-wrap {
    position: relative; border-radius: 20px; overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.16);
    aspect-ratio: 16 / 10; background: #fef3c7;
  }
  .ul-video-wrap video,
  .ul-video-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ul-video-wrap::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(245,158,11,0.08), transparent 60%);
    pointer-events: none;
  }
  .ul-video-label {
    position: absolute; bottom: 16px; left: 16px; z-index: 2;
    background: rgba(255,255,255,0.92); backdrop-filter: blur(8px);
    border: 1px solid rgba(245,158,11,0.25); border-left: 4px solid #f59e0b;
    border-radius: 10px; padding: 10px 14px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
  @keyframes ul-pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.45;transform:scale(1.45);} }
  .ul-pulse { animation: ul-pulse 1.6s ease-in-out infinite; }

  /* ── 4-image mosaic in hero right ── */
  .ul-mosaic {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
    border-radius: 20px; overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.16);
    aspect-ratio: 16 / 10;
  }
  .ul-mosaic img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.4s ease;
  }
  .ul-mosaic img:hover { transform: scale(1.04); }
  .ul-mosaic-cell { overflow: hidden; border-radius: 10px; }

  /* ── Badge ── */
  .ul-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.35);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px;
  }

  /* ── Stat cards ── */
  .ul-stat {
    background: rgba(255,255,255,0.82); border: 1px solid rgba(251,191,36,0.28);
    border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .ul-stat:hover { border-color: rgba(245,158,11,0.5); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
  .ul-stat-num   { font-size: 26px; font-weight: 900; color: #ea580c; line-height: 1; }
  .ul-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }

  /* ── Breadcrumb ── */
  .ul-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
  .ul-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
  .ul-bread a:hover { color: #f59e0b; }
  .ul-bread-sep { color: #cbd5e1; }
  .ul-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

  /* ── Section badge ── */
  .ul-section-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
  }

  /* ── Two-col grids ── */
  .ul-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .ul-two-col { grid-template-columns: 1fr; gap: 36px; } }
  .ul-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 767px) { .ul-split { grid-template-columns: 1fr; } }

  /* ── Capability cards ── */
  .ul-cap-card {
    background: #fff; border: 1px solid #eef0f4; border-radius: 16px;
    padding: 24px 20px; position: relative; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .ul-cap-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f59e0b, transparent); opacity: 0; transition: opacity 0.2s;
  }
  .ul-cap-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.28); transform: translateY(-4px); }
  .ul-cap-card:hover::before { opacity: 1; }
  .ul-cap-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 14px; }

  /* ── Process steps ── */
  .ul-step {
    position: relative; background: #fff; border: 1px solid #eef0f4;
    border-radius: 16px; padding: 28px 24px; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .ul-step::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,transparent); opacity:0; transition:opacity 0.22s; }
  .ul-step:hover { box-shadow:0 10px 36px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.3); transform:translateY(-4px); }
  .ul-step:hover::before { opacity:1; }
  .ul-step-num { font-size:44px; font-weight:900; color:rgba(245,158,11,0.10); line-height:1; position:absolute; top:14px; right:16px; user-select:none; }
  .ul-step-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:16px; }

  /* ── Problem / solution ── */
  .ul-problem-card  { background:#fff8f4; border:1px solid rgba(245,158,11,0.18); border-left:4px solid #f59e0b; border-radius:14px; padding:24px 20px; }
  .ul-solution-card { background:#f0fdf4; border:1px solid rgba(22,163,74,0.15);  border-left:4px solid #16a34a; border-radius:14px; padding:24px 20px; }

  /* ── Image wrap ── */
  .ul-img-wrap { border-radius:20px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.12); position:relative; }
  .ul-img-wrap::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(245,158,11,0.07),transparent 60%); pointer-events:none; }
  .ul-img-placeholder { width:100%; background:linear-gradient(135deg,#fef3c7 0%,#fed7aa 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; }

  /* ── Highlight box ── */
  .ul-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:16px; padding:24px 28px; color:#fff; box-shadow:0 8px 28px rgba(245,158,11,0.28); }

  /* ── Pipeline type pills ── */
  .ul-pill {
    display:inline-flex; align-items:center; gap:8px;
    background:#fff; border:1px solid #eef0f4; border-radius:10px;
    padding:10px 16px; font-size:13px; font-weight:500; color:#334155;
    transition:border-color 0.15s, color 0.15s, background 0.15s;
  }
  .ul-pill:hover { border-color:#f59e0b; color:#b45309; background:#fffbeb; }
  .ul-pill-dot { width:7px; height:7px; border-radius:50%; background:#f59e0b; flex-shrink:0; }

  /* ── Buttons ── */
  .ul-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:15px; font-weight:700; padding:14px 28px; border-radius:12px; text-decoration:none; border:none; cursor:pointer; transition:transform 0.15s, box-shadow 0.2s; box-shadow:0 4px 20px rgba(245,158,11,0.35); }
  .ul-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.45); }
  .ul-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:15px; font-weight:500; padding:14px 28px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,0.25); cursor:pointer; transition:border-color 0.2s, background 0.2s, color 0.2s; }
  .ul-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  /* ── Related links ── */
  .ul-related { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; background:#fff; border:1px solid #eef0f4; border-radius:12px; text-decoration:none; color:#334155; font-size:13.5px; font-weight:500; transition:border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
  .ul-related:hover { border-color:rgba(245,158,11,0.3); color:#b45309; background:#fffbeb; transform:translateX(4px); }

  /* ── CTA ── */
  .ul-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .ul-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }

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
    <div className="ul-img-placeholder" style={{ height: fallbackHeight }}>
      <Droplets size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#94a3b8" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ── Video / Mosaic hero panel ── */
// const HeroPanel = () => {
//   const [videoFailed, setVideoFailed] = useState(false);

//   /* If a real video is available, show it; otherwise show the 4-cell mosaic */
//   if (serviceVideo && !videoFailed) {
//     return (
//       <div className="ul-video-wrap">
//         <video src={serviceVideo} autoPlay muted loop playsInline onError={() => setVideoFailed(true)} />
//         <div className="ul-video-label">
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <span className="ul-pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
//             <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8" }}>Service Highlight</span>
//           </div>
//           <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", marginTop: 4 }}>Underground Leak Detection</div>
//           <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>No Excavation · Advanced Engineering Technology</div>
//         </div>
//       </div>
//     );
//   }

  /* 4-cell image mosaic matching the screenshot layout */
//   return (
//     <div className="ul-mosaic">
//       {[heroImg, heroImg, heroImg, heroImg].map((src, i) => (
//         <div key={i} className="ul-mosaic-cell">
//           <img src={src} alt={`Underground leak detection ${i + 1}`} />
//         </div>
//       ))}
//     </div>
//   );
// };

/* ── Data ── */
const stats = [
  { num: "100%", label: "No excavation required"      },
  { num: "2+",   label: "Utility types covered"       },
  { num: "0",    label: "Pipeline exposure needed"     },
];

const capabilities = [
  { icon: <Droplets size={19} />, title: "Pressurised Water Lines",   desc: "Detects leaks in buried water mains, distribution pipes and service connections without any digging." },
  { icon: <Gauge size={19} />,    title: "Gas Pipeline Leak Detection", desc: "Identifies leakage in underground gas lines using advanced acoustic and tracer gas technology." },
  { icon: <MapPin size={19} />,   title: "Leak Source Localisation",  desc: "Precisely pinpoints the exact ground co-ordinate of the leak — minimising excavation scope." },
  { icon: <BarChart3 size={19}/>, title: "Loss Quantification",       desc: "Flow loss calculated in volume per hour and estimated annual monetary cost for management reporting." },
  { icon: <Radio size={19} />,    title: "Acoustic Correlation",      desc: "Correlator instruments deployed across pipe segments to triangulate leak position from ground surface." },
  { icon: <Layers size={19} />,   title: "Tracer Gas Application",    desc: "Safe tracer gas injected for stubborn or deep leaks — detected at surface with high-sensitivity sensors." },
];

const processSteps = [
  { icon: <Search size={20} />,   title: "Site Survey & Pipe Mapping", desc: "Above-ground survey maps the pipeline route and identifies access points before any detection work begins." },
  { icon: <Radio size={20} />,    title: "Acoustic Correlation",       desc: "Correlator sensors placed at access points — the instrument calculates leak position from acoustic signal travel time." },
  { icon: <Gauge size={20} />,    title: "Ground Microphone Scan",     desc: "Sensitive ground microphones confirm and refine leak position to within centimetres along the pipe route." },
  { icon: <FileText size={20} />, title: "Loss Report & Action Plan",  desc: "GPS co-ordinates of each leak, loss quantification, and a prioritised repair schedule delivered to your team." },
];

const problemPoints = [
  "Underground leaks produce no visible surface signs for weeks or months",
  "Undetected water main losses inflate utility bills continuously",
  "Gas line leaks are a safety hazard until the source is precisely located",
  "Traditional methods require extensive trench digging to find the leak",
  "Loss volume is unknown without measurement — making repair priority impossible",
];
const solutionPoints = [
  "Advanced Engineering Technology localises leaks without exposing the pipeline",
  "Acoustic correlators and ground microphones pinpoint source to within centimetres",
  "Both water lines and gas lines tested in a single site visit",
  "Loss quantified in flow rate and annual cost — ready for management reporting",
  "Minimal excavation — only the confirmed leak point needs to be opened",
];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Eliminate continuous water or gas loss from buried pipelines"        },
  { icon: <Shield size={15} />,       label: "Remove safety risk from undetected underground gas leaks"            },
  { icon: <MapPin size={15} />,       label: "Precise localisation reduces excavation cost by up to 80%"           },
  { icon: <CheckCircle2 size={15} />, label: "Clear ROI with loss quantification in monetary terms per leak point"  },
];
const pipelineTypes = [
  "Water Mains", "Gas Distribution Lines", "Service Connections",
  "Irrigation Pipelines", "District Heating Lines", "Industrial Process Pipes",
];
const relatedServices = [
  { label: "Compressed Air Leak Detection",               path: "/services/compressed-air"      },
  { label: "Internal Hydraulic/Pneumatic Leak Detection", path: "/services/hydraulic-pneumatic" },
  { label: "Steam Trap / Valve Pass Audit",               path: "/services/steam-trap"          },
  { label: "Air / Water Tight Integrity Assessment",      path: "/services/air-water-tight"     },
];

/* ── Sub-components ── */
const CapCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="ul-cap-card fu">
      <div className="ul-cap-icon">{item.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
};
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="ul-step fu">
      <div className="ul-step-num">0{index + 1}</div>
      <div className="ul-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const UndergroundLeak = () => {
  const refOverL  = useFU(0);
  const refOverR  = useFU(100);
  const refCapH   = useFU(0);
  const refProcH  = useFU(0);
  const refProbH  = useFU(0);
  const refProbL  = useFU(0);
  const refProbR  = useFU(100);
  const refPipeL  = useFU(0);
  const refImpR   = useFU(100);
  const refRel    = useFU(0);

  return (
    <div className="ul-page">
      <style>{css}</style>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="ul-hero">
        <img src={heroImg} alt="" className="ul-hero-photo" aria-hidden="true" />
        <div className="ul-hero-wash" />
        <div className="ul-hero-dots" />
        <div className="ul-hero-burst" />
        <div className="ul-hero-sky" />

        <div className="ul-hero-inner">

          {/* ── LEFT copy ── */}
          <div>
            <div className="ul-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="ul-bread-active">Underground Leak Detection</span>
            </div>

            <div className="ul-badge" style={{ marginBottom: 20 }}>
              <Droplets size={11} /> Energy Optimization
            </div>

            <h1 style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Underground<br />
              <span style={{
                background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Leak Detection
              </span>
            </h1>

            {/* Flickering sub-headline */}
            <p className="ul-flicker" style={{
              fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#062979",
              letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
            }}>
              ⚡ Leaks you can't see underground are the costliest of all
            </p>

            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Underground leakages in pressurised water and gas lines are very difficult to detect.{" "}
              <strong style={{ color: "#b45309" }}>Mahadyuta Technical Solutions</strong> specialises in underground water / gas loss detection{" "}
              <strong style={{ color: "#ea580c" }}>without exposing the pipeline</strong> — localising the source of leakage and quantifying the loss.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="ul-btn-primary">Request a Survey <ArrowRight size={16} /></Link>
              {/* <Link to="/services" className="ul-btn-ghost">All Services</Link> */}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="ul-stat" style={{ minWidth: 120 }}>
                  <div className="ul-stat-num">{s.num}</div>
                  <div className="ul-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT 4-image mosaic / video ── */}
          {/* <div className="ul-video-col">
            <HeroPanel />
          </div> */}
        </div>
      </section>

      {/* ═══════════════ OVERVIEW ═══════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="ul-two-col">
          <div ref={refOverL} className="fu">
            <div className="ul-section-badge"><Zap size={11} /> The Challenge</div>
            {/* <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117", lineHeight: 1.2, marginBottom: 20 }}>
              Underground leaks are the hardest losses to find
            </h2> */}
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              Underground leakages in pressurised water lines and gas lines are very difficult to detect. They leave no surface trace, continue silently for months, and are impossible to locate with visual inspection alone.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              <strong style={{ color: "#1e293b" }}>Mahadyuta Technical Solutions Pvt. Ltd.</strong> is specialised in underground water / gas loss detection{" "}
              <strong style={{ color: "#ea580c" }}>without exposing the underground pipeline.</strong>
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              With the help of our integrated Advance Engineering Technology application,{" "}
              <strong style={{ color: "#1e293b" }}>we are capable of localizing the source of leakage and also quantify the loss.</strong>
            </p>
            <div className="ul-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Zero Excavation Detection</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                Using <strong>acoustic correlation, ground microphone scanning and tracer gas technology</strong>, we locate the exact co-ordinate of the underground leak from the surface — no digging required until the repair point is confirmed.
              </p>
            </div>
          </div>

          <div ref={refOverR} className="fu">
            <div className="ul-img-wrap">
              <ImgFallback src={sectionImg} alt="Underground pipeline leak detection" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Technology Used</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Acoustic Correlation + Tracer Gas</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>No pipeline exposure · GPS-accurate results</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CAPABILITIES ═══════════════ */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refCapH} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="ul-section-badge" style={{ margin: "0 auto 12px" }}><Layers size={11} /> Capabilities</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>What We Detect & Measure</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>Comprehensive underground leak detection covering water mains, gas lines and all pressurised buried systems.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {capabilities.map((item, i) => <CapCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      

    </div>
  );
};

export default UndergroundLeak;