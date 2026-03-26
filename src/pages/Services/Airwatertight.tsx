import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wind, Search, BarChart3, FileText,
  CheckCircle2, AlertTriangle, TrendingDown, Zap, ChevronRight,
  Shield, Waves, Anchor, Building2, Truck, Thermometer,
} from "lucide-react";

import heroImg    from "@/assets/door-safe.webp"; // swap to air-water-tight image when available
import sectionImg from "@/assets/door-safe.webp";

/* ── Video: place at src/assets/videos/air-water-tight.mp4 ── */
// let serviceVideo: string | null = null;
// try {
//   serviceVideo = new URL("@/assets/videos/air-water-tight.mp4", import.meta.url).href;
// } catch { serviceVideo = null; }

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .aw-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .aw-page * { box-sizing: border-box; }

  /* ── Flicker ── */
  @keyframes aw-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% {
      opacity: 1;
      text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
    }
    20%,24%,55% { opacity: 0.35; text-shadow: none; }
  }
  @keyframes aw-fade-in {
    0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
    60%  { opacity: 0.85; }
    100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
  }
  .aw-flicker {
    opacity: 0;
    animation:
      aw-fade-in  1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
      aw-flicker  4s  ease-in-out                   2s  infinite;
  }

  /* ── Hero ── */
  .aw-hero {
    position: relative; overflow: hidden;
    min-height: 88vh; display: flex; align-items: center;
  }
  .aw-hero-photo {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.62); pointer-events: none;
  }
  .aw-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.88) 0%,
      rgba(224,242,254,0.80) 55%,
      rgba(255,251,235,0.88) 100%);
  }
  .aw-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .aw-hero-burst {
    position: absolute; pointer-events: none;
    width: 70vw; height: 70vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .aw-hero-sky {
    position: absolute; pointer-events: none;
    width: 55vw; height: 55vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
    bottom: -15%; right: -5%;
  }

  /* ── Two-column hero ── */
  .aw-hero-inner {
    position: relative; max-width: 1280px; margin: 0 auto;
    padding: 80px 28px 72px; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
  }
  @media (max-width: 900px) {
    .aw-hero-inner { grid-template-columns: 1fr; }
    .aw-video-col { order: -1; }
  }

  /* ── Video panel ── */
  .aw-video-wrap {
    position: relative; border-radius: 20px; overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.16);
    aspect-ratio: 16 / 10; background: #fffbeb;
  }
  .aw-video-wrap video,
  .aw-video-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .aw-video-wrap::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(245,158,11,0.10), transparent 60%);
    pointer-events: none;
  }
  .aw-video-label {
    position: absolute; bottom: 16px; left: 16px; z-index: 2;
    background: rgba(255,255,255,0.92); backdrop-filter: blur(8px);
    border: 1px solid rgba(245,158,11,0.25); border-left: 4px solid #f59e0b;
    border-radius: 10px; padding: 10px 14px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
  @keyframes aw-pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.45; transform:scale(1.45); } }
  .aw-pulse { animation: aw-pulse 1.6s ease-in-out infinite; }

  /* ── Badge ── */
  .aw-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.10); border: 1px solid rgba(245,158,11,0.35);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px;
  }

  /* ── Stat cards ── */
  .aw-stat {
    background: rgba(255,255,255,0.82); border: 1px solid rgba(251,191,36,0.28);
    border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .aw-stat:hover { border-color: rgba(245,158,11,0.50); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
  .aw-stat-num   { font-size: 26px; font-weight: 900; color: #ea580c; line-height: 1; }
  .aw-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }

  /* ── Breadcrumb ── */
  .aw-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
  .aw-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
  .aw-bread a:hover { color: #f59e0b; }
  .aw-bread-sep { color: #cbd5e1; }
  .aw-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

  /* ── Section badge ── */
  .aw-section-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
  }

  /* ── Two-col grids ── */
  .aw-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .aw-two-col { grid-template-columns: 1fr; gap: 36px; } }
  .aw-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 767px) { .aw-split { grid-template-columns: 1fr; } }

  /* ── Application cards ── */
  .aw-app-card {
    background: #fff; border: 1px solid #eef0f4; border-radius: 16px;
    padding: 24px 20px; position: relative; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .aw-app-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f59e0b, transparent); opacity: 0; transition: opacity 0.2s;
  }
  .aw-app-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.28); transform: translateY(-4px); }
  .aw-app-card:hover::before { opacity: 1; }
  .aw-app-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 14px; }

  /* ── Process steps ── */
  .aw-step {
    position: relative; background: #fff; border: 1px solid #eef0f4;
    border-radius: 16px; padding: 28px 24px; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .aw-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#f59e0b,transparent); opacity: 0; transition: opacity 0.22s; }
  .aw-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.35); transform: translateY(-4px); }
  .aw-step:hover::before { opacity: 1; }
  .aw-step-num { font-size: 44px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 14px; right: 16px; user-select: none; }
  .aw-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }

  /* ── Problem / solution ── */
  .aw-problem-card  { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
  .aw-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15);  border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }

  /* ── Image wrap ── */
  .aw-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
  .aw-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(245,158,11,0.08),transparent 60%); pointer-events: none; }
  .aw-img-placeholder { width: 100%; background: linear-gradient(135deg,#fffbeb 0%,#fde68a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

  /* ── Highlight box ── */
  .aw-highlight { background: linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }

  /* ── Industry grid pills ── */
  .aw-industry-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid #fffbeb; border-radius: 10px;
    padding: 10px 16px; font-size: 13px; font-weight: 500; color: #334155;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .aw-industry-pill:hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
  .aw-industry-dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }

  /* ── Buttons ── */
  .aw-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#f59e0b,#b45309); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
  .aw-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.50); }
  .aw-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); color: #334155; font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(245,158,11,0.25); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
  .aw-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }

  /* ── Related links ── */
  .aw-related { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border: 1px solid #eef0f4; border-radius: 12px; text-decoration: none; color: #334155; font-size: 13.5px; font-weight: 500; transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
  .aw-related:hover { border-color: rgba(245,158,11,0.35); color: #b45309; background: #fffbeb; transform: translateX(4px); }

  /* ── CTA ── */
  .aw-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .aw-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.20) 0%,transparent 65%); top: -200px; right: -100px; pointer-events: none; }

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
    <div className="aw-img-placeholder" style={{ height: fallbackHeight }}>
      <Waves size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#64748b" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ── Video panel ── */
// const VideoPanel = () => {
//   const [videoFailed, setVideoFailed] = useState(false);
//   return (
//     <div className="aw-video-wrap">
//       {serviceVideo && !videoFailed
//         ? <video src={serviceVideo} autoPlay muted loop playsInline onError={() => setVideoFailed(true)} />
//         : <img src={heroImg} alt="Air water tight integrity assessment" />
//       }
//       <div className="aw-video-label">
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           <span className="aw-pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
//           <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8" }}>Service Highlight</span>
//         </div>
//         <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", marginTop: 4 }}>Air / Water Tight Testing</div>
//         <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Ultrasound Transmission · Non-destructive</div>
//       </div>
//     </div>
//   );
// };

/* ── Data ── */
const stats = [
  { num: "100%", label: "Non-destructive testing" },
  { num: "360°", label: "Full perimeter coverage" },
  { num: "0",    label: "Disassembly required"    },
];

const applications = [
  { icon: <Anchor size={19} />,    title: "Marine & Shipbuilding",     desc: "Hatch covers, watertight doors, windows, hull penetrations and rubber profile seals on ships and boats." },
  { icon: <Truck size={19} />,     title: "Vehicles & Containers",     desc: "Doors, windows, cabins and sealing surfaces of road vehicles, rail cars and shipping containers." },
  { icon: <Building2 size={19} />, title: "Fire Safety Doors",         desc: "Integrity testing of fire-rated doors and frames to verify seal performance under regulatory standards." },
  { icon: <Thermometer size={19}/>,title: "Climatic Chambers",         desc: "Tightness verification for environmental test chambers, clean rooms and controlled atmosphere enclosures." },
  { icon: <Shield size={19} />,    title: "Industrial Enclosures",     desc: "Cabins, control rooms, and equipment housings where air or water ingress must be eliminated." },
  { icon: <Waves size={19} />,     title: "Vacuum Leak Detection",     desc: "Rapid detection of leaks in vacuum systems, pressure vessels and sealed industrial assemblies." },
];

const processSteps = [
  { icon: <Search size={20} />,   title: "Transmitter Placement",  desc: "An ultrasound transmitter is placed inside the enclosure, emitting a consistent ultrasonic signal across the full perimeter." },
  { icon: <Waves size={20} />,    title: "Perimeter Scanning",     desc: "A technician scans all sealing surfaces — frames, hinges, gaskets, rubber profiles — from the outside with a directional receiver." },
  { icon: <BarChart3 size={20}/>, title: "Leak Localisation",      desc: "Signal intensity spikes pinpoint the exact location of seal failures, gaps or deteriorated rubber profiles in real time." },
  { icon: <FileText size={20} />, title: "Report & Action Plan",   desc: "Every defect is photographed, mapped and severity-rated. A prioritised maintenance report is delivered to your team." },
];

const problemPoints = [
  "Visual inspection misses hairline seal failures and micro-gaps",
  "Water ingress causes corrosion damage that is only discovered weeks later",
  "Failed hatch seals on ships risk cargo damage or safety incidents",
  "Pressure test methods require production shutdown and specialised setups",
  "Deteriorated rubber profiles are impossible to detect without the right tools",
];
const solutionPoints = [
  "Ultrasound transmission detects the smallest seal gap instantly",
  "Full perimeter tested in a single pass — no area missed",
  "Completely non-destructive — no pressure, no disassembly, no downtime",
  "Works on all seal types: rubber profiles, foam, brush seals and gaskets",
  "Ship-ready: tested under normal vessel conditions with no sail delay",
];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Prevent water damage and corrosion caused by undetected seal failures" },
  { icon: <Shield size={15} />,       label: "Verify fire door integrity and regulatory compliance"                    },
  { icon: <Waves size={15} />,        label: "Protect cargo and equipment from water and air ingress"                  },
  { icon: <CheckCircle2 size={15} />, label: "Eliminate costly disassembly with non-invasive testing method"           },
];
const relatedServices = [
  { label: "Compressed Air Leak Detection",               path: "/services/compressed-air"      },
  { label: "Internal Hydraulic/Pneumatic Leak Detection", path: "/services/hydraulic-pneumatic" },
  { label: "Steam Trap / Valve Pass Audit",               path: "/services/steam-trap"          },
  { label: "Underground Leak Detection",                  path: "/services/underground-leak"    },
];
const industries = [
  "Marine / Shipbuilding", "Automotive & Rail", "Aerospace",
  "Pharmaceuticals", "Food & Beverage", "Power Generation",
  "Chemical Plants", "Cold Storage / Clean Rooms",
];

/* ── Sub-components ── */
const AppCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="aw-app-card fu">
      <div className="aw-app-icon">{item.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
};
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="aw-step fu">
      <div className="aw-step-num">0{index + 1}</div>
      <div className="aw-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const AirWaterTight = () => {
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
    <div className="aw-page">
      <style>{css}</style>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="aw-hero">
        <img src={heroImg} alt="" className="aw-hero-photo" aria-hidden="true" />
        <div className="aw-hero-wash" />
        <div className="aw-hero-dots" />
        <div className="aw-hero-burst" />
        <div className="aw-hero-sky" />

        <div className="aw-hero-inner">

          {/* ── LEFT copy ── */}
          <div>
            <div className="aw-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="aw-bread-active">Air / Water Tight Integrity Assessment</span>
            </div>

            <div className="aw-badge" style={{ marginBottom: 20 }}>
              <Waves size={11} /> Leak Detection
            </div>

            <h1 style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Air / Water Tight<br />
              <span style={{
                background: "linear-gradient(90deg,#f59e0b 0%,#b45309 60%,#f59e0b 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Integrity Assessment
              </span>
            </h1>

            {/* Flickering sub-headline */}
            <p className="aw-flicker" style={{
              fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#062979",
              letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
            }}>
              ⚡ Seal failures you can't see are costing you more than you think
            </p>

            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Highly appreciated for{" "}
              <strong style={{ color: "#b45309" }}>vacuum leak detection and tightness testing</strong> — fast and reliable detection of leaks and seal failures around windows, doors, cabins, hatch covers, vehicles and containers with sealing surfaces or rubber profile seals.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="aw-btn-primary">Request an Assessment <ArrowRight size={16} /></Link>
              {/* <Link to="/services" className="aw-btn-ghost">All Services</Link> */}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="aw-stat" style={{ minWidth: 120 }}>
                  <div className="aw-stat-num">{s.num}</div>
                  <div className="aw-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT video ── */}
          {/* <div className="aw-video-col"><VideoPanel /></div> */}
        </div>
      </section>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="aw-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="aw-section-badge"><Zap size={11} /> How It Works</div>
            {/* <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117", lineHeight: 1.2, marginBottom: 20 }}>
              Ultrasound transmission —<br />the fastest seal test available
            </h2> */}
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              This service uses <strong style={{ color: "#1e293b" }}>ultrasound transmission technology</strong> — a transmitter placed inside an enclosure emits an inaudible signal, while a receiver scans the external perimeter to detect where the signal escapes through a seal failure.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              This is highly appreciated for <strong style={{ color: "#1e293b" }}>vacuum leak detection and tightness testing</strong> in various industries for fast and reliable detection of leaks and seal failures around{" "}
              <strong style={{ color: "#b45309" }}>windows, doors, cabins, hatch covers, vehicles and containers</strong> with sealing surfaces or rubber profile seals.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              The service can also be used in the <strong style={{ color: "#1e293b" }}>ship and boat building industry</strong> and for testing <strong style={{ color: "#1e293b" }}>fire safety doors, climatic chambers and clean rooms.</strong>
            </p>
            <div className="aw-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Why Ultrasound Transmission?</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                Unlike pressure or spray tests, ultrasound transmission requires <strong>no pressurisation, no chemicals, and no shutdown</strong>. The entire seal perimeter is tested in a single scan — delivering results immediately on-site.
              </p>
            </div>
          </div>

          <div ref={refOverviewR} className="fu">
            <div className="aw-img-wrap">
              <ImgWithFallback src={sectionImg} alt="Technician testing door seal integrity" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Method</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Ultrasound Transmission Testing</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Non-destructive · No pressure required</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ APPLICATIONS ════════════════════ */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refAppHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="aw-section-badge" style={{ margin: "0 auto 12px" }}><Anchor size={11} /> Applications</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Where We Apply This Service</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>Tested and trusted across marine, industrial, automotive and safety-critical applications.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default AirWaterTight;