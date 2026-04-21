/* eslint-disable @typescript-eslint/no-explicit-any */


// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight, Droplets, Search, BarChart3, FileText,
//   CheckCircle2, AlertTriangle, TrendingDown, Zap, ChevronRight,
//   Shield, Settings, Activity,
// } from "lucide-react";

// import heroImg    from "@/assets/Internal-Hydraulic.png";
// import sectionImg from "@/assets/Internal-Hydraulic.png";

// /* ── Video asset — place at src/assets/videos/hydraulic-pneumatic.mp4
//    Falls back to heroImg automatically if file is absent.            ── */
// let serviceVideo: string | null = null;
// try {
//   serviceVideo = new URL("@/assets/videos/hydraulic-pneumatic.mp4", import.meta.url).href;
// } catch { serviceVideo = null; }

// /* ═══════════════════════════════════════════════════════════
//    STYLES
// ═══════════════════════════════════════════════════════════ */
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

//   .hp-page { font-family: 'Roboto', sans-serif; color: #1e293b; }

//   /* ── Flicker ── */
//   @keyframes hp-flicker {
//     0%,19%,21%,23%,25%,54%,56%,100% {
//       opacity: 1;
//       text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
//     }
//     20%,24%,55% { opacity: 0.35; text-shadow: none; }
//   }
//   @keyframes hp-fade-in-text {
//     0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
//     60%  { opacity: 0.85; }
//     100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
//   }
//   .hp-flicker {
//     opacity: 0;
//     animation:
//       hp-fade-in-text 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
//       hp-flicker       4s ease-in-out                    2s infinite;
//   }

//   /* ── Hero ── */
//   .hp-hero {
//     position: relative; overflow: hidden;
//     min-height: 88vh;
//     display: flex; align-items: center;
//   }
//   .hp-hero-photo {
//     position: absolute; inset: 0;
//     width: 100%; height: 100%;
//     object-fit: cover; object-position: center;
//     filter: brightness(0.62);
//     pointer-events: none;
//   }
//   /* Warm-sky overlay — same values across all pages */
//   .hp-hero-wash {
//     position: absolute; inset: 0;
//     background: linear-gradient(120deg,
//       rgba(255,251,235,0.88) 0%,
//       rgba(224,242,254,0.80) 55%,
//       rgba(255,251,235,0.88) 100%);
//   }
//   .hp-hero-dots {
//     position: absolute; inset: 0; opacity: 0.07;
//     background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
//     background-size: 40px 40px;
//   }
//   .hp-hero-burst {
//     position: absolute; pointer-events: none;
//     width: 70vw; height: 70vw; border-radius: 50%;
//     background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
//     top: -15%; left: -8%;
//   }
//   .hp-hero-sky {
//     position: absolute; pointer-events: none;
//     width: 55vw; height: 55vw; border-radius: 50%;
//     background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
//     bottom: -15%; right: -5%;
//   }

//   /* ── Two-column hero grid ── */
//   .hp-hero-inner {
//     position: relative;
//     max-width: 1280px; margin: 0 auto;
//     padding: 80px 28px 72px; width: 100%;
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 48px;
//     align-items: center;
//   }
//   @media (max-width: 900px) {
//     .hp-hero-inner { grid-template-columns: 1fr; }
//     .hp-hero-video-col { order: -1; }
//   }

//   /* ── Video panel ── */
//   .hp-video-wrap {
//     position: relative;
//     border-radius: 20px; overflow: hidden;
//     box-shadow: 0 24px 64px rgba(0,0,0,0.16);
//     aspect-ratio: 16 / 10;
//     background: #f1f5f9;
//   }
//   .hp-video-wrap video,
//   .hp-video-wrap img {
//     width: 100%; height: 100%;
//     object-fit: cover; display: block;
//   }
//   .hp-video-wrap::after {
//     content: '';
//     position: absolute; inset: 0;
//     background: linear-gradient(135deg, rgba(245,158,11,0.08), transparent 60%);
//     pointer-events: none;
//   }
//   .hp-video-label {
//     position: absolute; bottom: 16px; left: 16px; z-index: 2;
//     background: rgba(255,255,255,0.92);
//     backdrop-filter: blur(8px);
//     border: 1px solid rgba(245,158,11,0.25);
//     border-left: 4px solid #f59e0b;
//     border-radius: 10px;
//     padding: 10px 14px;
//     box-shadow: 0 4px 16px rgba(0,0,0,0.08);
//   }
//   @keyframes hp-pulse-dot {
//     0%,100% { opacity: 1; transform: scale(1); }
//     50%     { opacity: 0.45; transform: scale(1.45); }
//   }
//   .hp-pulse { animation: hp-pulse-dot 1.6s ease-in-out infinite; }

//   /* ── Badge ── */
//   .hp-badge {
//     display: inline-flex; align-items: center; gap: 7px;
//     background: rgba(245,158,11,0.12);
//     border: 1px solid rgba(245,158,11,0.35);
//     color: #b45309; font-size: 11px; font-weight: 700;
//     letter-spacing: 0.1em; text-transform: uppercase;
//     padding: 5px 14px; border-radius: 999px;
//   }

//   /* ── Stat cards ── */
//   .hp-stat {
//     background: rgba(255,255,255,0.82);
//     border: 1px solid rgba(251,191,36,0.28);
//     border-radius: 14px; padding: 16px 20px;
//     backdrop-filter: blur(10px);
//     transition: border-color 0.2s, box-shadow 0.2s;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.06);
//   }
//   .hp-stat:hover { border-color: rgba(245,158,11,0.5); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
//   .hp-stat-num   { font-size: 26px; font-weight: 900; color: #ea580c; line-height: 1; }
//   .hp-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }

//   /* ── Breadcrumb ── */
//   .hp-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
//   .hp-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
//   .hp-bread a:hover { color: #f59e0b; }
//   .hp-bread-sep { color: #cbd5e1; }
//   .hp-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

//   /* ── Section badge ── */
//   .hp-section-badge {
//     display: inline-flex; align-items: center; gap: 6px;
//     background: rgba(245,158,11,0.08);
//     border: 1px solid rgba(245,158,11,0.22);
//     color: #b45309; font-size: 11px; font-weight: 700;
//     letter-spacing: 0.09em; text-transform: uppercase;
//     padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
//   }

//   /* ── Two-col grids ── */
//   .hp-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
//   @media (max-width: 900px) { .hp-two-col { grid-template-columns: 1fr; gap: 36px; } }
//   .hp-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
//   @media (max-width: 767px) { .hp-split { grid-template-columns: 1fr; } }

//   /* ── Problem / solution ── */
//   .hp-problem-card  { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
//   .hp-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15);  border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }

//   /* ── Component cards ── */
//   .hp-comp-card {
//     background: #fff; border: 1px solid #eef0f4; border-radius: 14px;
//     padding: 20px 18px; display: flex; align-items: flex-start; gap: 14px;
//     transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
//   }
//   .hp-comp-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.28); transform: translateY(-3px); }
//   .hp-comp-icon { width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; }

//   /* ── Process steps ── */
//   .hp-step {
//     position: relative; background: #fff; border: 1px solid #eef0f4;
//     border-radius: 16px; padding: 28px 24px;
//     transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s; overflow: hidden;
//   }
//   .hp-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#f59e0b,transparent); opacity: 0; transition: opacity 0.22s; }
//   .hp-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.3); transform: translateY(-4px); }
//   .hp-step:hover::before { opacity: 1; }
//   .hp-step-num  { font-size: 44px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 14px; right: 16px; user-select: none; }
//   .hp-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }

//   /* ── Image wrap ── */
//   .hp-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
//   .hp-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(245,158,11,0.07),transparent 60%); pointer-events: none; }
//   .hp-img-placeholder { width: 100%; background: linear-gradient(135deg,#fef3c7 0%,#fed7aa 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

//   /* ── Highlight box ── */
//   .hp-highlight { background: linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }

//   /* ── CTA ── */
//   .hp-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
//   .hp-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%); top: -200px; right: -100px; pointer-events: none; }

//   /* ── Buttons ── */
//   .hp-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#f59e0b,#ea580c); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
//   .hp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.45); }
//   .hp-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); color: #334155; font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(245,158,11,0.25); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
//   .hp-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }

//   /* ── Related links ── */
//   .hp-related { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border: 1px solid #eef0f4; border-radius: 12px; text-decoration: none; color: #334155; font-size: 13.5px; font-weight: 500; transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
//   .hp-related:hover { border-color: rgba(245,158,11,0.3); color: #b45309; background: #fffbeb; transform: translateX(4px); }

//   /* ── Fade up ── */
//   .fu { opacity: 0; transform: translateY(22px); transition: opacity 0.55s ease, transform 0.55s ease; }
//   .fu.vis { opacity: 1; transform: translateY(0); }
// `;

// /* ── Fade-up hook ── */
// const useFU = (delay = 0) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) { setTimeout(() => el.classList.add("vis"), delay); obs.disconnect(); }
//     }, { threshold: 0.1 });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [delay]);
//   return ref;
// };

// /* ── Image fallback ── */
// const ImgWithFallback = ({ src, alt, style, fallbackHeight = 440 }) => {
//   const [failed, setFailed] = useState(false);
//   if (failed) return (
//     <div className="hp-img-placeholder" style={{ height: fallbackHeight }}>
//       <Droplets size={28} color="#f59e0b" />
//       <span style={{ fontSize: 13, color: "#94a3b8" }}>Image unavailable</span>
//     </div>
//   );
//   return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
// };


// /* ── Data ── */
// const stats = [
//   { num: "100%", label: "Non-invasive detection"   },
//   { num: "6+",   label: "Component types covered"  },
//   { num: "0",    label: "System shutdown required"  },
// ];

// const componentTypes = [
//   { icon: <Settings size={17} />, title: "Pressure Cylinders",     desc: "Detect internal bypass leakage causing loss of force and inconsistent actuation." },
//   { icon: <Shield size={17} />,   title: "Valves & Relief Valves", desc: "Identify passing valves and PRVs that leak internally, wasting energy and pressure." },
//   { icon: <Activity size={17} />, title: "Counter Balance Valves", desc: "Pinpoint internal leakage causing load drift and safety risks in hydraulic circuits." },
//   { icon: <Droplets size={17} />, title: "Isolating Valves",       desc: "Detect seat leakage across isolation valves that compromise system integrity." },
//   { icon: <Zap size={17} />,      title: "Steam Traps",            desc: "Test functionality using ultrasound and temperature for float, thermodynamic and thermostatic traps." },
//   { icon: <BarChart3 size={17} />,title: "Pneumatic Actuators",    desc: "Assess seal condition and internal leakage in pneumatic actuator assemblies." },
// ];

// const processSteps = [
//   { icon: <Search size={20} />,    title: "System Assessment",       desc: "Map of all hydraulic and pneumatic components is prepared before inspection begins." },
//   { icon: <Activity size={20} />,  title: "Ultrasound Analysis",     desc: "Each component is scanned using ultrasound technology to detect internal leakage signatures beyond normal operating noise." },
//   { icon: <Zap size={20} />,       title: "Temperature Correlation", desc: "Thermal data combined with ultrasound readings confirms leakage, especially for steam traps and valves." },
//   { icon: <FileText size={20} />,  title: "Detailed Report",         desc: "Every leaking component documented with severity rating, photo evidence, and a prioritised repair plan." },
// ];

// const problemPoints = [
//   "Internal leaks produce no visible signs — no puddle, no mist",
//   "Pressure cylinders lose force silently, impacting production quality",
//   "Passing PRVs waste energy continuously, driving up operational costs",
//   "Steam trap failures go undetected for months",
//   "Standard maintenance tools cannot identify internal valve leakage",
// ];
// const solutionPoints = [
//   "Ultrasound technology detects turbulent flow caused by internal leakage",
//   "Inspection is fully non-invasive — no disassembly or shutdown required",
//   "Steam traps tested for float, thermodynamic and thermostatic trap types",
//   "Losses of steam within the system are estimated and quantified",
//   "Bearing condition assessments delivered alongside leak detection services",
// ];
// const impactPoints = [
//   { icon: <TrendingDown size={15} />, label: "Eliminate hidden energy losses in hydraulic and pneumatic circuits" },
//   { icon: <Shield size={15} />,       label: "Prevent downtime caused by failing valves and actuators"           },
//   { icon: <Activity size={15} />,     label: "Increased operational reliability through early defect detection"    },
//   { icon: <CheckCircle2 size={15} />, label: "Considerable cost savings from steam trap and valve optimisation"   },
// ];
// const relatedServices = [
//   { label: "Compressed Air Leak Detection",          path: "/services/compressed-air"      },
//   { label: "Steam Trap / Valve Pass Audit",          path: "/services/steam-trap"          },
//   { label: "Air / Water Tight Integrity Assessment", path: "/services/air-water-tight"     },
//   { label: "Underground Leak Detection",             path: "/services/underground-leak"    },
// ];

// /* ── Step card ── */
// const StepCard = ({ step, index }) => {
//   const ref = useFU(index * 90);
//   return (
//     <div ref={ref} className="hp-step fu">
//       <div className="hp-step-num">0{index + 1}</div>
//       <div className="hp-step-icon">{step.icon}</div>
//       <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
//       <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
//     </div>
//   );
// };

// /* ── Component card ── */
// const CompCard = ({ item, index }) => {
//   const ref = useFU(index * 70);
//   return (
//     <div ref={ref} className="hp-comp-card fu">
//       <div className="hp-comp-icon">{item.icon}</div>
//       <div>
//         <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 5 }}>{item.title}</div>
//         <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{item.desc}</div>
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    PAGE
// ═══════════════════════════════════════════════════════════ */
// const HydraulicPneumatic = () => {
//   const refOverviewL = useFU(0);
//   const refOverviewR = useFU(100);
//   const refCompHead  = useFU(0);
//   const refProbHead  = useFU(0);
//   const refProbL     = useFU(0);
//   const refProbR     = useFU(100);
//   const refImpactL   = useFU(0);
//   const refImpactR   = useFU(100);
//   const refRelated   = useFU(0);

//   return (
//     <div className="hp-page">
//       <style>{css}</style>

//       {/* ════════════════════ HERO — two-column ════════════════════ */}
//       <section className="hp-hero">
//         <img src={heroImg} alt="" className="hp-hero-photo" aria-hidden="true" />
//         <div className="hp-hero-wash" />
//         <div className="hp-hero-dots" />
//         <div className="hp-hero-burst" />
//         <div className="hp-hero-sky" />

//         <div className="hp-hero-inner">

//           {/* ── LEFT — copy ── */}
//           <div>
//             <div className="hp-bread">
//               <Link to="/">Home</Link>
//               <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
//               <Link to="/services">Services</Link>
//               <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
//               <span className="hp-bread-active">Internal Hydraulic / Pneumatic Leak Detection</span>
//             </div>

//             <div className="hp-badge" style={{ marginBottom: 20 }}>
//               <Droplets size={11} /> Energy Optimization
//             </div>

//             <h1 style={{ fontSize: "clamp(28px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
//               Internal Hydraulic &amp;<br />
//               <span style={{
//                 background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)",
//                 WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
//               }}>
//                 Pneumatic Leak Detection
//               </span>
//             </h1>

//             {/* ── Flickering sub-headline ── */}
//             <p className="hp-flicker" style={{
//               fontSize: "clamp(12px,1.3vw,15px)", fontWeight: 700, color: "#062979",
//               letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
//             }}>
//               ⚡ Leaks you can't see are costing you the most
//             </p>

//             <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
//               Internal leakages leave no visible trace. We detect them using{" "}
//               <strong style={{ color: "#ea580c" }}>Ultrasound Technology</strong> — preventing downtime and delivering measurable cost savings without any system shutdown.
//             </p>

//             <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
//               <Link to="/contact" className="hp-btn-primary">Request an Inspection <ArrowRight size={16} /></Link>
//               {/* <Link to="/services" className="hp-btn-ghost">All Services</Link> */}
//             </div>

//             {/* Stats */}
//             <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//               {stats.map((s) => (
//                 <div key={s.label} className="hp-stat" style={{ minWidth: 120 }}>
//                   <div className="hp-stat-num">{s.num}</div>
//                   <div className="hp-stat-label">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── RIGHT — video panel fills blank space ── */}
//           <div className="hp-hero-video-col">
//             {/* <VideoPanel /> */}
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════ OVERVIEW ════════════════════ */}
//       <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }} className="hp-two-col">
//           <div ref={refOverviewL} className="fu">
//             <div className="hp-section-badge"><Zap size={11} /> The Challenge</div>
//             {/* <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117", lineHeight: 1.2, marginBottom: 20 }}>
//               Leaks you can't see are<br />costing you the most
//             </h2> */}
//             <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
//               Internal leakages in hydraulic / pneumatic components like{" "}
//               <strong style={{ color: "#1e293b" }}>Pressure Cylinders, Valves, Relief Valves, PRVs, Counter Balance Valves, Isolating Valves</strong> are difficult to identify. We detect them using{" "}
//               <strong style={{ color: "#ea580c" }}>Ultrasound Technology Applications.</strong>
//             </p>
//             <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
//               Regular inspection of valves and steam traps is essential for preventive maintenance. Early detection of steam trap leaks leads to increased operational reliability and considerable cost savings.
//             </p>
//             <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
//               <strong style={{ color: "#1e293b" }}>Functionality is tested by analysing the typical ultrasound and temperature of the installation.</strong>{" "}
//               We test any type of steam trap — float, thermodynamic, and thermostatic — or valves in systems with a flow of steam.
//             </p>
//             <div className="hp-highlight">
//               <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Also: Bearing Condition Monitoring</p>
//               <p style={{ fontSize: 15, lineHeight: 1.65 }}>
//                 Regular condition-based monitoring of bearings is essential for successful preventative maintenance. Early detection of damage or wear in friction and non-friction bearings helps{" "}
//                 <strong>prevent downtime, increase reliability, and generate considerable cost savings.</strong>
//               </p>
//             </div>
//           </div>

//           <div ref={refOverviewR} className="fu">
//             <div className="hp-img-wrap">
//               <ImgWithFallback src={sectionImg} alt="Engineer inspecting hydraulic components" fallbackHeight={440}
//                 style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
//             </div>
//             <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
//               <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Method</div>
//               <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Ultrasound + Thermal Analysis</div>
//               <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Non-invasive · No Shutdown Required</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════ COMPONENT TYPES ════════════════════ */}
//       <section style={{ background: "#f4f4f4", padding: "80px 28px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }}>
//           <div ref={refCompHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
//             <div className="hp-section-badge" style={{ margin: "0 auto 12px" }}><Settings size={11} /> Coverage</div>
//             <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Components We Inspect</h2>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
//             {componentTypes.map((item, i) => <CompCard key={item.title} item={item} index={i} />)}
//           </div>
//         </div>
//       </section>

      
//     </div>
//   );
// };

// export default HydraulicPneumatic;





import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Droplets, Search, BarChart3, FileText,
  CheckCircle2, AlertTriangle, TrendingDown, Zap, ChevronRight,
  Shield, Settings, Activity,
} from "lucide-react";

import heroImg    from "@/assets/Internal-Hydraulic.png";
import sectionImg from "@/assets/Internal-Hydraulic.png";

let serviceVideo: string | null = null;
try {
  serviceVideo = new URL("@/assets/videos/hydraulic-pneumatic.mp4", import.meta.url).href;
} catch { serviceVideo = null; }

/* ═══════════════════════════════════════════════════════════
   CUSTOM SVG ICONS — one per component type
═══════════════════════════════════════════════════════════ */

/** Hydraulic cylinder with piston rod */
const IconPressureCylinder = ({ size = 28, color = "#f59e0b" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* cylinder body */}
    <rect x="4" y="16" width="30" height="16" rx="3" stroke={color} strokeWidth="2.4" fill="none"/>
    {/* end cap left */}
    <rect x="4" y="14" width="5" height="20" rx="2" fill={color} opacity="0.18"/>
    <rect x="4" y="14" width="5" height="20" rx="2" stroke={color} strokeWidth="2"/>
    {/* piston rod extending right */}
    <line x1="34" y1="24" x2="46" y2="24" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    {/* piston inside */}
    <rect x="20" y="17" width="5" height="14" rx="1.5" fill={color} opacity="0.35"/>
    {/* pressure arrows */}
    <path d="M10 20 L14 24 L10 28" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
  </svg>
);

/** Gate/ball valve cross-section */
const IconValve = ({ size = 28, color = "#f59e0b" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* pipe left */}
    <rect x="2" y="20" width="12" height="8" rx="2" stroke={color} strokeWidth="2.2" fill="none"/>
    {/* pipe right */}
    <rect x="34" y="20" width="12" height="8" rx="2" stroke={color} strokeWidth="2.2" fill="none"/>
    {/* valve body (circle) */}
    <circle cx="24" cy="24" r="10" stroke={color} strokeWidth="2.2" fill="none"/>
    <circle cx="24" cy="24" r="10" fill={color} opacity="0.08"/>
    {/* ball with bore */}
    <circle cx="24" cy="24" r="6" stroke={color} strokeWidth="1.8" fill="none" opacity="0.5"/>
    <line x1="14" y1="24" x2="34" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
    {/* actuator stem top */}
    <line x1="24" y1="14" x2="24" y2="8" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
    <rect x="20" y="4" width="8" height="5" rx="1.5" fill={color} opacity="0.25" stroke={color} strokeWidth="1.6"/>
  </svg>
);

/** Counter balance valve — spring + ball symbol */
const IconCounterBalance = ({ size = 28, color = "#f59e0b" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* housing */}
    <rect x="8" y="10" width="32" height="28" rx="4" stroke={color} strokeWidth="2.2" fill="none"/>
    <rect x="8" y="10" width="32" height="28" rx="4" fill={color} opacity="0.05"/>
    {/* spring coil (zigzag) */}
    <polyline points="18,36 18,30 22,26 18,22 22,18 18,14" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" strokeLinecap="round" opacity="0.65"/>
    {/* ball seat */}
    <circle cx="30" cy="24" r="5" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="30" cy="24" r="2.5" fill={color} opacity="0.4"/>
    {/* flow arrows */}
    <path d="M3 24 L8 24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M40 24 L45 24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M43 21 L46 24 L43 27" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/** Isolation gate valve — gate cross-section */
const IconIsolatingValve = ({ size = 28, color = "#f59e0b" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* pipe body */}
    <rect x="2" y="19" width="44" height="10" rx="2.5" stroke={color} strokeWidth="2.2" fill="none"/>
    {/* gate (vertical obstruction) */}
    <rect x="21" y="10" width="6" height="28" rx="2" fill={color} opacity="0.22" stroke={color} strokeWidth="2"/>
    {/* handwheel */}
    <circle cx="24" cy="7" r="5" stroke={color} strokeWidth="2" fill="none"/>
    <line x1="24" y1="2" x2="24" y2="12" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="19" y1="7" x2="29" y2="7" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    {/* leak indicator dots */}
    <circle cx="10" cy="24" r="1.5" fill={color} opacity="0.5"/>
    <circle cx="38" cy="24" r="1.5" fill={color} opacity="0.5"/>
  </svg>
);

/** Steam trap — float trap cross-section */
const IconSteamTrap = ({ size = 28, color = "#f59e0b" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* trap body */}
    <rect x="10" y="14" width="28" height="24" rx="4" stroke={color} strokeWidth="2.2" fill="none"/>
    <rect x="10" y="14" width="28" height="24" rx="4" fill={color} opacity="0.06"/>
    {/* inlet pipe top */}
    <line x1="24" y1="4" x2="24" y2="14" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    {/* outlet pipe bottom */}
    <line x1="24" y1="38" x2="24" y2="46" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    {/* float ball */}
    <circle cx="24" cy="28" r="7" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="24" cy="28" r="7" fill={color} opacity="0.14"/>
    {/* condensate level line */}
    <line x1="10" y1="30" x2="38" y2="30" stroke={color} strokeWidth="1.4" strokeDasharray="3 2" opacity="0.5"/>
    {/* steam wisps */}
    <path d="M18 10 Q16 7 18 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.55"/>
    <path d="M24 9  Q22 6 24 3" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.55"/>
    <path d="M30 10 Q28 7 30 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.55"/>
  </svg>
);

/** Pneumatic actuator — diaphragm/spring return */
const IconPneumaticActuator = ({ size = 28, color = "#f59e0b" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* upper chamber (diaphragm cap) */}
    <path d="M8 6 Q8 2 24 2 Q40 2 40 6 L40 22 Q40 26 24 26 Q8 26 8 22 Z" stroke={color} strokeWidth="2.2" fill="none"/>
    <path d="M8 6 Q8 2 24 2 Q40 2 40 6 L40 22 Q40 26 24 26 Q8 26 8 22 Z" fill={color} opacity="0.07"/>
    {/* diaphragm line */}
    <ellipse cx="24" cy="18" rx="14" ry="4" stroke={color} strokeWidth="1.8" fill={color} opacity="0.18"/>
    {/* actuator stem */}
    <line x1="24" y1="26" x2="24" y2="42" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    {/* spring coil around stem */}
    <path d="M20 28 L28 30 L20 33 L28 36 L20 39" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
    {/* air inlet port */}
    <rect x="36" y="10" width="8" height="4" rx="2" fill={color} opacity="0.25" stroke={color} strokeWidth="1.6"/>
    {/* output disc / flange */}
    <rect x="18" y="41" width="12" height="5" rx="2" fill={color} opacity="0.25" stroke={color} strokeWidth="1.8"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .hp-page { font-family: 'Roboto', sans-serif; color: #1e293b; }

  @keyframes hp-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% {
      opacity: 1;
      text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
    }
    20%,24%,55% { opacity: 0.35; text-shadow: none; }
  }
  @keyframes hp-fade-in-text {
    0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
    60%  { opacity: 0.85; }
    100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
  }
  .hp-flicker {
    opacity: 0;
    animation:
      hp-fade-in-text 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
      hp-flicker       4s ease-in-out                    2s infinite;
  }

  .hp-hero {
    position: relative; overflow: hidden;
    min-height: 88vh;
    display: flex; align-items: center;
  }
  .hp-hero-photo {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.62);
    pointer-events: none;
  }
  .hp-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.88) 0%,
      rgba(224,242,254,0.80) 55%,
      rgba(255,251,235,0.88) 100%);
  }
  .hp-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .hp-hero-burst {
    position: absolute; pointer-events: none;
    width: 70vw; height: 70vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .hp-hero-sky {
    position: absolute; pointer-events: none;
    width: 55vw; height: 55vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
    bottom: -15%; right: -5%;
  }
  .hp-hero-inner {
    position: relative;
    max-width: 1280px; margin: 0 auto;
    padding: 80px 28px 72px; width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
  @media (max-width: 900px) {
    .hp-hero-inner { grid-template-columns: 1fr; }
    .hp-hero-video-col { order: -1; }
  }

  .hp-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.12);
    border: 1px solid rgba(245,158,11,0.35);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px;
  }
  .hp-stat {
    background: rgba(255,255,255,0.82);
    border: 1px solid rgba(251,191,36,0.28);
    border-radius: 14px; padding: 16px 20px;
    backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .hp-stat:hover { border-color: rgba(245,158,11,0.5); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
  .hp-stat-num   { font-size: 26px; font-weight: 900; color: #ea580c; line-height: 1; }
  .hp-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }

  .hp-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
  .hp-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
  .hp-bread a:hover { color: #f59e0b; }
  .hp-bread-sep { color: #cbd5e1; }
  .hp-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

  .hp-section-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(245,158,11,0.08);
    border: 1px solid rgba(245,158,11,0.22);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
  }
  .hp-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .hp-two-col { grid-template-columns: 1fr; gap: 36px; } }

  /* ── Component cards — upgraded ── */
  .hp-comp-card {
    background: #fff;
    border: 1px solid #eef0f4;
    border-radius: 18px;
    padding: 28px 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
    cursor: default;
  }
  .hp-comp-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f59e0b, #ea580c, transparent);
    opacity: 0;
    transition: opacity 0.22s;
  }
  .hp-comp-card:hover {
    box-shadow: 0 12px 36px rgba(245,158,11,0.13), 0 2px 8px rgba(0,0,0,0.06);
    border-color: rgba(245,158,11,0.32);
    transform: translateY(-5px);
  }
  .hp-comp-card:hover::before { opacity: 1; }

  /* large icon container */
  .hp-comp-icon-wrap {
    width: 64px; height: 64px;
    border-radius: 16px;
    background: rgba(245,158,11,0.09);
    border: 1.5px solid rgba(245,158,11,0.18);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 18px;
    transition: background 0.2s, border-color 0.2s;
    flex-shrink: 0;
  }
  .hp-comp-card:hover .hp-comp-icon-wrap {
    background: rgba(245,158,11,0.16);
    border-color: rgba(245,158,11,0.35);
  }

  /* ghost watermark number top-right */
  .hp-comp-num {
    position: absolute; top: 14px; right: 18px;
    font-size: 40px; font-weight: 900; line-height: 1;
    color: rgba(245,158,11,0.07);
    user-select: none; pointer-events: none;
  }

  /* tag pill */
  .hp-comp-tag {
    display: inline-flex; align-items: center;
    font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: #b45309;
    background: rgba(245,158,11,0.08);
    border: 1px solid rgba(245,158,11,0.18);
    padding: 3px 9px; border-radius: 999px;
    margin-bottom: 10px;
    width: fit-content;
  }

  .hp-step {
    position: relative; background: #fff; border: 1px solid #eef0f4;
    border-radius: 16px; padding: 28px 24px;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s; overflow: hidden;
  }
  .hp-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#f59e0b,transparent); opacity: 0; transition: opacity 0.22s; }
  .hp-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.3); transform: translateY(-4px); }
  .hp-step:hover::before { opacity: 1; }
  .hp-step-num  { font-size: 44px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 14px; right: 16px; user-select: none; }
  .hp-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }

  .hp-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
  .hp-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(245,158,11,0.07),transparent 60%); pointer-events: none; }
  .hp-img-placeholder { width: 100%; background: linear-gradient(135deg,#fef3c7 0%,#fed7aa 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

  .hp-highlight { background: linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }
  .hp-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .hp-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%); top: -200px; right: -100px; pointer-events: none; }

  .hp-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#f59e0b,#ea580c); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
  .hp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.45); }
  .hp-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); color: #334155; font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(245,158,11,0.25); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
  .hp-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }

  .hp-related { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border: 1px solid #eef0f4; border-radius: 12px; text-decoration: none; color: #334155; font-size: 13.5px; font-weight: 500; transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
  .hp-related:hover { border-color: rgba(245,158,11,0.3); color: #b45309; background: #fffbeb; transform: translateX(4px); }

  .hp-problem-card  { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
  .hp-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15);  border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }

  .fu { opacity: 0; transform: translateY(22px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .fu.vis { opacity: 1; transform: translateY(0); }

  .hp-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 767px) { .hp-split { grid-template-columns: 1fr; } }
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

const ImgWithFallback = ({ src, alt, style, fallbackHeight = 440 }: any) => {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="hp-img-placeholder" style={{ height: fallbackHeight }}>
      <Droplets size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#94a3b8" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ── Data — now with custom SVG icons + tags ── */
const componentTypes = [
  {
    icon: <IconPressureCylinder size={32} />,
    // tag: "Hydraulic",
    title: "Pressure Cylinders",
    desc: "Detect internal bypass leakage causing loss of force and inconsistent actuation.",
  },
  {
    icon: <IconValve size={32} />,
    // tag: "Hydraulic",
    title: "Valves & Relief Valves",
    desc: "Identify passing valves and PRVs that leak internally, wasting energy and pressure.",
  },
  {
    icon: <IconCounterBalance size={32} />,
    // tag: "Hydraulic",
    title: "Counter Balance Valves",
    desc: "Pinpoint internal leakage causing load drift and safety risks in hydraulic circuits.",
  },
  {
    icon: <IconIsolatingValve size={32} />,
    // tag: "Process",
    title: "Isolating Valves",
    desc: "Detect seat leakage across isolation valves that compromise system integrity.",
  },
  {
    icon: <IconSteamTrap size={32} />,
    // tag: "Steam",
    title: "Steam Traps",
    desc: "Test functionality using ultrasound and temperature for float, thermodynamic and thermostatic traps.",
  },
  {
    icon: <IconPneumaticActuator size={32} />,
    // tag: "Pneumatic",
    title: "Pneumatic Actuators",
    desc: "Assess seal condition and internal leakage in pneumatic actuator assemblies.",
  },
];

const stats = [
  { num: "100%", label: "Non-invasive detection"   },
  { num: "6+",   label: "Component types covered"  },
  { num: "0",    label: "System shutdown required"  },
];

const processSteps = [
  { icon: <Search size={20} />,    title: "System Assessment",       desc: "Map of all hydraulic and pneumatic components is prepared before inspection begins." },
  { icon: <Activity size={20} />,  title: "Ultrasound Analysis",     desc: "Each component is scanned using ultrasound technology to detect internal leakage signatures beyond normal operating noise." },
  { icon: <Zap size={20} />,       title: "Temperature Correlation", desc: "Thermal data combined with ultrasound readings confirms leakage, especially for steam traps and valves." },
  { icon: <FileText size={20} />,  title: "Detailed Report",         desc: "Every leaking component documented with severity rating, photo evidence, and a prioritised repair plan." },
];

const problemPoints = [
  "Internal leaks produce no visible signs — no puddle, no mist",
  "Pressure cylinders lose force silently, impacting production quality",
  "Passing PRVs waste energy continuously, driving up operational costs",
  "Steam trap failures go undetected for months",
  "Standard maintenance tools cannot identify internal valve leakage",
];
const solutionPoints = [
  "Ultrasound technology detects turbulent flow caused by internal leakage",
  "Inspection is fully non-invasive — no disassembly or shutdown required",
  "Steam traps tested for float, thermodynamic and thermostatic trap types",
  "Losses of steam within the system are estimated and quantified",
  "Bearing condition assessments delivered alongside leak detection services",
];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Eliminate hidden energy losses in hydraulic and pneumatic circuits" },
  { icon: <Shield size={15} />,       label: "Prevent downtime caused by failing valves and actuators"           },
  { icon: <Activity size={15} />,     label: "Increased operational reliability through early defect detection"    },
  { icon: <CheckCircle2 size={15} />, label: "Considerable cost savings from steam trap and valve optimisation"   },
];
const relatedServices = [
  { label: "Compressed Air Leak Detection",          path: "/services/compressed-air"  },
  { label: "Steam Trap / Valve Pass Audit",          path: "/services/steam-trap"      },
  { label: "Air / Water Tight Integrity Assessment", path: "/services/air-water-tight" },
  { label: "Underground Leak Detection",             path: "/services/underground-leak"},
];

/* ── Step card ── */
const StepCard = ({ step, index }: any) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="hp-step fu">
      <div className="hp-step-num">0{index + 1}</div>
      <div className="hp-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

/* ── Component card — upgraded with custom SVG icon ── */
const CompCard = ({ item, index }: any) => {
  const ref = useFU(index * 70);
  return (
    <div ref={ref} className="hp-comp-card fu">
      <div className="hp-comp-num">0{index + 1}</div>
      <div className="hp-comp-icon-wrap">{item.icon}</div>
      {/* <div className="hp-comp-tag">{item.tag}</div> */}
      <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", marginBottom: 8, lineHeight: 1.3 }}>{item.title}</div>
      <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const HydraulicPneumatic = () => {
  const refOverviewL = useFU(0);
  const refOverviewR = useFU(100);
  const refCompHead  = useFU(0);
  const refProbHead  = useFU(0);
  const refProbL     = useFU(0);
  const refProbR     = useFU(100);
  const refImpactL   = useFU(0);
  const refImpactR   = useFU(100);
  const refRelated   = useFU(0);

  return (
    <div className="hp-page">
      <style>{css}</style>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="hp-hero">
        <img src={heroImg} alt="" className="hp-hero-photo" aria-hidden="true" />
        <div className="hp-hero-wash" />
        <div className="hp-hero-dots" />
        <div className="hp-hero-burst" />
        <div className="hp-hero-sky" />

        <div className="hp-hero-inner">
          <div>
            <div className="hp-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="hp-bread-active">Internal Hydraulic / Pneumatic Leak Detection</span>
            </div>

            <div className="hp-badge" style={{ marginBottom: 20 }}>
              <Droplets size={11} /> Energy Optimization
            </div>

            <h1 style={{ fontSize: "clamp(28px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Internal Hydraulic &amp;<br />
              <span style={{
                background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Pneumatic Leak Detection
              </span>
            </h1>

            <p className="hp-flicker" style={{
              fontSize: "clamp(12px,1.3vw,15px)", fontWeight: 700, color: "#062979",
              letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
            }}>
              ⚡ Leaks you can't see are costing you the most
            </p>

            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Internal leakages leave no visible trace. We detect them using{" "}
              <strong style={{ color: "#ea580c" }}>Ultrasound Technology</strong> — preventing downtime and delivering measurable cost savings without any system shutdown.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="hp-btn-primary">Request an Inspection <ArrowRight size={16} /></Link>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="hp-stat" style={{ minWidth: 120 }}>
                  <div className="hp-stat-num">{s.num}</div>
                  <div className="hp-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hp-hero-video-col" />
        </div>
      </section>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="hp-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="hp-section-badge"><Zap size={11} /> The Challenge</div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              Internal leakages in hydraulic / pneumatic components like{" "}
              <strong style={{ color: "#1e293b" }}>Pressure Cylinders, Valves, Relief Valves, PRVs, Counter Balance Valves, Isolating Valves</strong> are difficult to identify. We detect them using{" "}
              <strong style={{ color: "#ea580c" }}>Ultrasound Technology Applications.</strong>
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              Regular inspection of valves and steam traps is essential for preventive maintenance. Early detection of steam trap leaks leads to increased operational reliability and considerable cost savings.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              <strong style={{ color: "#1e293b" }}>Functionality is tested by analysing the typical ultrasound and temperature of the installation.</strong>{" "}
              We test any type of steam trap — float, thermodynamic, and thermostatic — or valves in systems with a flow of steam.
            </p>
            <div className="hp-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Also: Bearing Condition Monitoring</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                Regular condition-based monitoring of bearings is essential for successful preventative maintenance. Early detection of damage or wear in friction and non-friction bearings helps{" "}
                <strong>prevent downtime, increase reliability, and generate considerable cost savings.</strong>
              </p>
            </div>
          </div>

          <div ref={refOverviewR} className="fu">
            <div className="hp-img-wrap">
              <ImgWithFallback src={sectionImg} alt="Engineer inspecting hydraulic components" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Method</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Ultrasound + Thermal Analysis</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Non-invasive · No Shutdown Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ COMPONENT TYPES ════════════════════ */}
      <section style={{ background: "#f4f6fa", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refCompHead} className="fu" style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="hp-section-badge" style={{ margin: "0 auto 12px" }}>
              <Settings size={11} /> Coverage
            </div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>
              Components We Inspect
            </h2>
            <p style={{ fontSize: 14, color: "#94a3b8", maxWidth: 480, margin: "0 auto" }}>
              Each component type demands a distinct diagnostic approach — our ultrasound specialists are trained on all six.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {componentTypes.map((item, i) => <CompCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HydraulicPneumatic;