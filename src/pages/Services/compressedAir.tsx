import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wind, Search, BarChart3, FileText,
  CheckCircle2, TrendingDown, Zap, ChevronRight,
  AlertTriangle,
} from "lucide-react";

import heroImg    from "@/assets/Leak-Detection.png";
import sectionImg from "@/assets/Leak-Detection.png";

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .ca-page { font-family: 'Roboto', sans-serif; color: #1e293b; }

  @keyframes flicker {
    0%,19%,21%,23%,25%,54%,56%,100% { opacity: 1; text-shadow: 0 0 8px rgba(245,158,11,0.8), 0 0 20px rgba(245,158,11,0.4); }
    20%,24%,55%                      { opacity: 0.4; text-shadow: none; }
  }
  @keyframes flicker {
  0%,19%,21%,23%,25%,54%,56%,100% { opacity: 1; text-shadow: 0 0 8px rgba(233, 245, 11, 0.8), 0 0 20px rgba(245,158,11,0.4); }
  20%,24%,55%                      { opacity: 0.4; text-shadow: none; }
}
.ca-flicker {
  opacity: 0;
  animation:
    fade-in-text 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards,
    flicker       4s ease-in-out                        2s infinite;
}
@keyframes fade-in-text {
  0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.12em; }
  60%  { opacity: 0.85; }
  100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
}

  /* ── Hero ── */
  .ca-hero {
    position: relative; overflow: hidden;
    min-height: 88vh;
    display: flex; align-items: center;
  }
  .ca-hero-photo {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.62);
    pointer-events: none;
  }
  .ca-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.84) 0%,
      rgba(224,242,254,0.76) 55%,
      rgba(255,251,235,0.84) 100%);
  }
  .ca-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .ca-hero-burst {
    position: absolute; pointer-events: none;
    width: 70vw; height: 70vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .ca-hero-sky {
    position: absolute; pointer-events: none;
    width: 55vw; height: 55vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
    bottom: -15%; right: -5%;
  }

  /* ── Hero two-column — ONLY NEW CSS ADDED ── */
  .ca-hero-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
  }
  @media (max-width: 960px) {
    .ca-hero-inner { grid-template-columns: 1fr; }
    .ca-hero-right-col { display: none; }
  }

  /* ── Badge ── */
  .ca-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.12);
    border: 1px solid rgba(245,158,11,0.35);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px;
  }

  /* ── Stat cards ── */
  .ca-stat {
    background: rgba(255,255,255,0.78);
    border: 1px solid rgba(251,191,36,0.28);
    border-radius: 14px; padding: 18px 22px;
    backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .ca-stat:hover { border-color: rgba(245,158,11,0.5); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
  .ca-stat-num  { font-size: 30px; font-weight: 900; color: #ea580c; line-height: 1; }
  .ca-stat-label{ font-size: 12px; color: #64748b; font-weight: 500; margin-top: 5px; }

  /* ── Breadcrumb ── */
  .ca-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .ca-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
  .ca-bread a:hover { color: #f59e0b; }
  .ca-bread-sep { font-size: 12.5px; color: #cbd5e1; }
  .ca-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

  /* ── Section badge ── */
  .ca-section-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(245,158,11,0.08);
    border: 1px solid rgba(245,158,11,0.22);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
  }

  /* ── Overview grid ── */
  .ca-overview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .ca-overview-grid { grid-template-columns: 1fr; } }

  /* ── Process steps ── */
  .ca-step {
    position: relative;
    background: #fff; border: 1px solid #eef0f4;
    border-radius: 16px; padding: 28px 24px;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
    overflow: hidden;
  }
  .ca-step::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f59e0b, transparent);
    opacity: 0; transition: opacity 0.22s;
  }
  .ca-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.3); transform: translateY(-4px); }
  .ca-step:hover::before { opacity: 1; }
  .ca-step-num  { font-size: 42px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 16px; right: 18px; user-select: none; }
  .ca-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }

  /* ── Problem / solution ── */
  .ca-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 767px) { .ca-split { grid-template-columns: 1fr; } }
  .ca-problem-card { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
  .ca-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15); border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }

  /* ── Gas pills ── */
  .ca-gas-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: #fff; border: 1px solid #e8ebf0; border-radius: 8px;
    padding: 8px 14px; font-size: 13px; font-weight: 500; color: #334155;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .ca-gas-pill:hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
  .ca-gas-dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }
  .ca-gas-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .ca-gas-grid { grid-template-columns: 1fr; } }

  /* ── Section image ── */
  .ca-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
  .ca-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(245,158,11,0.07), transparent 60%); pointer-events: none; }
  .ca-img-placeholder { width: 100%; height: 420px; background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

  /* ── Highlight box ── */
  .ca-highlight { background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }

  /* ── CTA section ── */
  .ca-cta { position: relative; overflow: hidden; background: linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ea580c 100%); }
  .ca-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.22) 0%, transparent 65%); top: -200px; right: -100px; pointer-events: none; }

  /* ── Buttons ── */
  .ca-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #f59e0b, #ea580c);
    color: #fff; font-size: 15px; font-weight: 700;
    padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer;
    transition: transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(245,158,11,0.35);
  }
  .ca-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.45); }
  .ca-btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.72); backdrop-filter: blur(8px);
    color: #334155; font-size: 15px; font-weight: 500;
    padding: 14px 28px; border-radius: 12px; text-decoration: none;
    border: 1px solid rgba(245,158,11,0.25); cursor: pointer;
    transition: border-color 0.2s, background 0.2s, color 0.2s;
  }
  .ca-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }

  /* ── Related links ── */
  .ca-related {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 18px; background: #fff; border: 1px solid #eef0f4;
    border-radius: 12px; text-decoration: none; color: #334155;
    font-size: 13.5px; font-weight: 500;
    transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s;
  }
  .ca-related:hover { border-color: rgba(245,158,11,0.3); color: #b45309; background: #fffbeb; transform: translateX(4px); }

  /* ── Fade-up reveal ── */
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

/* ── Image with fallback ── */
const ImgWithFallback = ({ src, alt, style, fallbackHeight = 420 }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="ca-img-placeholder" style={{ height: fallbackHeight }}>
      <Wind size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#94a3b8" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ══════════════════════════════════════════
   LEAK VISUALISER — hero right column only
══════════════════════════════════════════ */
const LeakVisualiser = () => {
  const [cost, setCost] = useState(0);
  const costRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      costRef.current += 4.2;
      setCost(Math.floor(costRef.current));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCost = (n) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
    if (n >= 1000)   return `₹${(n / 1000).toFixed(1)}k`;
    return `₹${n}`;
  };

 
};

/* ── Data ── */
const stats = [
  { num: "35%",  label: "Avg. energy saving potential"  },
  { num: "30%",  label: "Compressed air lost to leaks"  },
  { num: "100%", label: "Detailed loss quantification"  },
];

const processSteps = [
  { icon: <Search size={20} />, title: "Ultrasonic Scanning", desc: "High-frequency ultrasonic instruments pinpoint leaks invisible to the naked eye — even in noisy industrial environments." },
  { icon: <Wind size={20} />,   title: "Leak Source Pinpointing", desc: "Precise localisation of every leak source across the compressed air distribution network, including joints, valves and fittings." },
  { icon: <BarChart3 size={20} />, title: "Loss Quantification", desc: "Each leak is measured and its energy loss calculated in flow-rate (L/min) and annual monetary cost equivalent." },
  { icon: <FileText size={20} />,  title: "Detailed Reporting", desc: "A comprehensive report with photographic evidence, priority ranking, and a clear action plan for the maintenance team." },
];

const gasSystems = ["Compressed Air", "Nitrogen (N₂)", "Oxygen (O₂)", "Argon", "CO₂ Systems", "Steam Lines", "Hydraulic Lines", "Pneumatic Lines"];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Reduce compressed air system energy bills by up to 35%" },
  { icon: <Zap size={15} />,          label: "Cut compressor runtime and extend equipment life" },
  { icon: <BarChart3 size={15} />,    label: "Clear ROI — most audits pay for themselves within weeks" },
  { icon: <CheckCircle2 size={15} />, label: "Compliance with ISO 50001 energy management standards" },
];
const problemPoints = [
  "Leaks are inaudible at normal operating noise levels",
  "Energy wastage is gradual and not immediately visible on bills",
  "Precious gases like N₂ and O₂ escape silently — increasing production costs",
  "Undetected leaks accelerate wear on compressors and downstream equipment",
  "Maintenance teams lack the specialised tools for accurate detection",
];
const solutionPoints = [
  "High-sensitivity ultrasonic scanners detect leaks at frequencies beyond human hearing",
  "Every leak source precisely located and tagged on a site layout",
  "Flow rate and annual energy cost calculated per leak",
  "Priority-ranked action plan handed to your maintenance department",
  "Post-repair verification audits available to confirm savings achieved",
];
const relatedServices = [
  { label: "Internal Hydraulic/Pneumatic Leak Detection", path: "/services/hydraulic-pneumatic" },
  { label: "Steam Trap / Valve Pass Audit",               path: "/services/steam-trap"           },
  { label: "Air / Water Tight Integrity Assessment",      path: "/services/air-water-tight"      },
  { label: "Underground Leak Detection",                  path: "/services/underground-leak"     },
];

/* ── Step card (hooks-safe) ── */
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 100);
  return (
    <div ref={ref} className="ca-step fu">
      <div className="ca-step-num">0{index + 1}</div>
      <div className="ca-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const CompressedAir = () => {
  const refOverviewL = useFU(0);
  const refOverviewR = useFU(100);
  const refProbHead  = useFU(0);
  const refProbL     = useFU(0);
  const refProbR     = useFU(100);
  const refGasL      = useFU(0);
  const refGasR      = useFU(100);
  const refRelated   = useFU(0);

  return (
    <div className="ca-page">
      <style>{css}</style>

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section className="ca-hero">
        {/* Background photo — unchanged */}
        <img src={heroImg} alt="" className="ca-hero-photo" aria-hidden="true" />
        <div className="ca-hero-wash" />
        <div className="ca-hero-dots" />
        <div className="ca-hero-burst" />
        <div className="ca-hero-sky" />

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "80px 28px 72px", width: "100%" }}>

          {/* Breadcrumb — unchanged */}
          <div className="ca-bread" style={{ marginBottom: 32 }}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
            <Link to="/services">Services</Link>
            <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
            <span className="ca-bread-active">Compressed Air Leak Detection</span>
          </div>

          {/* ── Two-column grid — left is original, right is new ── */}
          <div className="ca-hero-inner">

            {/* LEFT COL — original content, zero changes */}
            <div style={{ maxWidth: 680 }}>
              <div className="ca-badge" style={{ marginBottom: 20 }}>
                <Wind size={11} /> Energy Optimization
              </div>

              <h1 style={{
                fontSize: "clamp(32px,5vw,56px)", fontWeight: 800,
                color: "#1e293b", lineHeight: 1.08, marginBottom: 20,
              }}>
                Compressed Air<br />
                <span style={{
                  background: "linear-gradient(90deg, #f59e0b 0%, #ea580c 60%, #f59e0b 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Leak Detection
                </span>
              </h1>

              <p
                className="ca-flicker"
                style={{
                  fontSize: "clamp(15px, 1.5vw, 18px)",
                  fontWeight: 900,
                  color: "#062979",
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                ⚡ Leaks cost you more than you think
              </p>

              <p style={{ fontSize: "clamp(14px,1.5vw,17px)", color: "#475569", lineHeight: 1.75, marginBottom: 36, maxWidth: 540 }}>
                Regular ultrasonic inspection can achieve up to{" "}
                <strong style={{ color: "#ea580c" }}>35% energy savings</strong> — we pinpoint every leak, quantify the loss, and deliver a clear maintenance action plan.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
                <Link to="/contact" className="ca-btn-primary">Request an Audit <ArrowRight size={16} /></Link>
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {stats.map((s) => (
                  <div key={s.label} className="ca-stat" style={{ minWidth: 140 }}>
                    <div className="ca-stat-num">{s.num}</div>
                    <div className="ca-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            

          </div>
        </div>
      </section>

      {/* ══════════════════════════ OVERVIEW ══════════════════════════ */}
      {/* Everything below here is 100% original — not a single character changed */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="ca-overview-grid">

          <div ref={refOverviewL} className="fu">
            <div className="ca-section-badge"><Zap size={11} /> The Challenge</div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              Any form of leak in an industrial system is a <strong style={{ color: "#1e293b" }}>direct loss to pocket.</strong> It is generally estimated that a considerable{" "}
              <strong style={{ color: "#ea580c" }}>energy saving of 35% can be achieved</strong> if regular inspection of the compressed air system is undertaken.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              Some manufacturing processes use precious gases like{" "}
              <strong style={{ color: "#1e293b" }}>Nitrogen, Oxygen</strong> etc. and leakages in these systems increase the cost of production.
            </p>
            <div className="ca-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Our Specialisation</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                Mahadyuta Technical Solutions is specialised in compressed air / gas leak detection — pinpointing the source, quantifying the loss, and calculating the monetary cost. We submit a detailed report so that the maintenance department gets a clear way ahead.
              </p>
            </div>
          </div>

          <div ref={refOverviewR} className="fu">
            <div className="ca-img-wrap">
              <ImgWithFallback
                src={sectionImg}
                alt="Ultrasonic leak detection in use"
                fallbackHeight={420}
                style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={{
              marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2,
              background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b",
              borderRadius: 14, padding: "14px 18px", display: "inline-block",
              boxShadow: "0 8px 28px rgba(0,0,0,0.08)"
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Instrument Used</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>SONAPHONE — Ultrasonic Testing Device</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>by SONOTEC, Germany</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ PROCESS ══════════════════════════ */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={useFU(0)} className="fu" style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="ca-section-badge" style={{ margin: "0 auto 12px" }}><Search size={11} /> Our Process</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>How We Detect & Quantify Leaks</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
            {processSteps.map((s, i) => <StepCard key={s.title} step={s} index={i} />)}
          </div>
        </div>
      </section>

    </div>
  );
};

export default CompressedAir;