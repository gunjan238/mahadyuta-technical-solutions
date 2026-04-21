// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight, Zap, Search, BarChart3, FileText,
//   CheckCircle2, TrendingDown, ChevronRight,
//   Shield, Waves, Activity, Building2,
//   Thermometer, AlertTriangle, Cpu, Flame,
//   Eye, Radio, Factory,
// } from "lucide-react";

// import heroImg    from "@/assets/thermal_monitoring.webp";
// import sectionImg from "@/assets/thermal_monitoring.webp";

// /* ═══════════════════════════════════════════════════════════
//    STYLES  — same design tokens as all other service pages
// ═══════════════════════════════════════════════════════════ */
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

//   .tm-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
//   .tm-page * { box-sizing: border-box; }

//   /* ── Flicker ── */
//   @keyframes tm-flicker {
//     0%,19%,21%,23%,25%,54%,56%,100% {
//       opacity: 1;
//       text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
//     }
//     20%,24%,55% { opacity: 0.35; text-shadow: none; }
//   }
//   @keyframes tm-fade-in {
//     0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
//     60%  { opacity: 0.85; }
//     100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
//   }
//   .tm-flicker {
//     opacity: 0;
//     animation:
//       tm-fade-in  1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
//       tm-flicker  4s  ease-in-out                   2s  infinite;
//   }

//   /* ── Hero ── */
//   .tm-hero {
//     position: relative; overflow: hidden;
//     min-height: 88vh; display: flex; align-items: center;
//   }
//   .tm-hero-photo {
//     position: absolute; inset: 0;
//     width: 100%; height: 100%;
//     object-fit: cover; object-position: center;
//     filter: brightness(0.62); pointer-events: none;
//   }
//   .tm-hero-wash {
//     position: absolute; inset: 0;
//     background: linear-gradient(120deg,
//       rgba(255,251,235,0.88) 0%,
//       rgba(224,242,254,0.80) 55%,
//       rgba(255,251,235,0.88) 100%);
//   }
//   .tm-hero-dots {
//     position: absolute; inset: 0; opacity: 0.07;
//     background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
//     background-size: 40px 40px;
//   }
//   .tm-hero-burst {
//     position: absolute; pointer-events: none;
//     width: 70vw; height: 70vw; border-radius: 50%;
//     background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
//     top: -15%; left: -8%;
//   }
//   .tm-hero-sky {
//     position: absolute; pointer-events: none;
//     width: 55vw; height: 55vw; border-radius: 50%;
//     background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
//     bottom: -15%; right: -5%;
//   }

//   /* ── Two-column hero ── */
//   .tm-hero-inner {
//     position: relative; max-width: 1280px; margin: 0 auto;
//     padding: 80px 28px 72px; width: 100%;
//     display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
//   }
//   @media (max-width: 900px) {
//     .tm-hero-inner { grid-template-columns: 1fr; }
//     .tm-video-col { order: -1; }
//   }

//   /* ── Badge ── */
//   .tm-badge {
//     display: inline-flex; align-items: center; gap: 7px;
//     background: rgba(245,158,11,0.10); border: 1px solid rgba(245,158,11,0.35);
//     color: #b45309; font-size: 11px; font-weight: 700;
//     letter-spacing: 0.1em; text-transform: uppercase;
//     padding: 5px 14px; border-radius: 999px;
//   }

//   /* ── Stat cards ── */
//   .tm-stat {
//     background: rgba(255,255,255,0.82); border: 1px solid rgba(251,191,36,0.28);
//     border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(10px);
//     transition: border-color 0.2s, box-shadow 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
//   }
//   .tm-stat:hover { border-color: rgba(245,158,11,0.50); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
//   .tm-stat-num   { font-size: 26px; font-weight: 900; color: #ea580c; line-height: 1; }
//   .tm-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }

//   /* ── Breadcrumb ── */
//   .tm-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
//   .tm-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
//   .tm-bread a:hover { color: #f59e0b; }
//   .tm-bread-sep { color: #cbd5e1; }
//   .tm-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

//   /* ── Section badge ── */
//   .tm-section-badge {
//     display: inline-flex; align-items: center; gap: 6px;
//     background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
//     color: #b45309; font-size: 11px; font-weight: 700;
//     letter-spacing: 0.09em; text-transform: uppercase;
//     padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
//   }

//   /* ── Two-col grids ── */
//   .tm-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
//   @media (max-width: 900px) { .tm-two-col { grid-template-columns: 1fr; gap: 36px; } }
//   .tm-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
//   @media (max-width: 767px) { .tm-split { grid-template-columns: 1fr; } }

//   /* ── Application cards ── */
//   .tm-app-card {
//     background: #fff; border: 1px solid #eef0f4; border-radius: 16px;
//     padding: 24px 20px; position: relative; overflow: hidden;
//     transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
//   }
//   .tm-app-card::before {
//     content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
//     background: linear-gradient(90deg, #f59e0b, transparent); opacity: 0; transition: opacity 0.2s;
//   }
//   .tm-app-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.28); transform: translateY(-4px); }
//   .tm-app-card:hover::before { opacity: 1; }
//   .tm-app-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 14px; }

//   /* ── Process steps ── */
//   .tm-step {
//     position: relative; background: #fff; border: 1px solid #eef0f4;
//     border-radius: 16px; padding: 28px 24px; overflow: hidden;
//     transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
//   }
//   .tm-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#f59e0b,transparent); opacity: 0; transition: opacity 0.22s; }
//   .tm-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.35); transform: translateY(-4px); }
//   .tm-step:hover::before { opacity: 1; }
//   .tm-step-num { font-size: 44px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 14px; right: 16px; user-select: none; }
//   .tm-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }

//   /* ── Problem / solution ── */
//   .tm-problem-card  { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
//   .tm-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15);  border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }

//   /* ── Image wrap ── */
//   .tm-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
//   .tm-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(245,158,11,0.08),transparent 60%); pointer-events: none; }
//   .tm-img-placeholder { width: 100%; background: linear-gradient(135deg,#fffbeb 0%,#fde68a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

//   /* ── Highlight box ── */
//   .tm-highlight { background: linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }

//   /* ── Use-case pill grid ── */
//   .tm-usecase-grid { display: flex; flex-wrap: wrap; gap: 10px; }
//   .tm-usecase-pill {
//     display: inline-flex; align-items: center; gap: 8px;
//     background: #fff; border: 1px solid rgba(245,158,11,0.20); border-radius: 10px;
//     padding: 9px 14px; font-size: 13px; font-weight: 500; color: #334155;
//     transition: border-color 0.15s, color 0.15s, background 0.15s;
//   }
//   .tm-usecase-pill:hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
//   .tm-usecase-dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }

//   /* ── Industry pills ── */
//   .tm-industry-pill {
//     display: inline-flex; align-items: center; gap: 8px;
//     background: #fff; border: 1px solid #fffbeb; border-radius: 10px;
//     padding: 10px 16px; font-size: 13px; font-weight: 500; color: #334155;
//     transition: border-color 0.15s, color 0.15s, background 0.15s;
//   }
//   .tm-industry-pill:hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
//   .tm-industry-dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }

//   /* ── Buttons ── */
//   .tm-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#f59e0b,#b45309); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
//   .tm-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.50); }
//   .tm-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); color: #334155; font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(251,191,36,0.28); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
//   .tm-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }

//   /* ── Related links ── */
//   .tm-related { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border: 1px solid #eef0f4; border-radius: 12px; text-decoration: none; color: #334155; font-size: 13.5px; font-weight: 500; transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
//   .tm-related:hover { border-color: rgba(245,158,11,0.35); color: #b45309; background: #fffbeb; transform: translateX(4px); }

//   /* ── CTA ── */
//   .tm-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
//   .tm-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.20) 0%,transparent 65%); top: -200px; right: -100px; pointer-events: none; }

//   /* ── Fade up ── */
//   .fu { opacity: 0; transform: translateY(22px); transition: opacity 0.55s ease, transform 0.55s ease; }
//   .fu.vis { opacity: 1; transform: translateY(0); }
// `;

// /* ── Hooks ── */
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
//     <div className="tm-img-placeholder" style={{ height: fallbackHeight }}>
//       <Thermometer size={28} color="#f59e0b" />
//       <span style={{ fontSize: 13, color: "#64748b" }}>Image unavailable</span>
//     </div>
//   );
//   return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
// };

// /* ── Data ── */
// const stats = [
//   { num: "24/7",   label: "Continuous automated monitoring" },
//   { num: "±1°C",   label: "Thermal measurement accuracy"   },
//   { num: "100%",   label: "Non-contact temperature sensing" },
// ];

// const applications = [
//   { icon: <Factory size={19} />,     title: "Cement Kiln Shell Monitoring",     desc: "Continuous thermal scanning of rotating kiln shells to detect hot spots and refractory brick failures before a shell breach occurs." },
//   { icon: <Flame size={19} />,       title: "Coal Pile & Waste Bunker Monitoring", desc: "Automated thermal surveillance of coal stockpiles, waste bunkers and biomass stores to detect spontaneous combustion at its earliest stage." },
//   { icon: <Zap size={19} />,         title: "HT Electrical Yard & Sub-Station", desc: "Continuous overhead equipment (OHE) and sub-station thermal monitoring to identify hotspots on busbars, connections and switchgear." },
//   { icon: <Activity size={19} />,    title: "Critical Motor & Drive Monitoring", desc: "Automated thermal surveillance of AC/DC motors, drives and rotating equipment to catch overheating before failure." },
//   { icon: <Cpu size={19} />,         title: "Casting Unit & Ladle Monitoring",   desc: "Real-time thermal imaging of casting units and ladles in steel and foundry operations to ensure process quality and safety." },
//   { icon: <Eye size={19} />,         title: "Fire Sensitive Area Monitoring",    desc: "Perimeter and area thermal cameras for fire detection in warehouses, forests, fuel storage and other fire-sensitive environments." },
//   { icon: <Radio size={19} />,       title: "PCB & Electronics Manufacturing",   desc: "Thermal monitoring during PCB manufacturing and testing operations to detect solder joint defects and component overheating." },
//   { icon: <Thermometer size={19} />, title: "Food Processing & Human Temp",     desc: "Thermal solutions for food processing line temperature control, de-fogger testing and human body temperature screening." },
// ];

// const useCases = [
//   "OHE (Over-Head Equipment)", "Metal Thinning Operations", "Food Processing Operations",
//   "Coal Pile Monitoring", "Sub-Station Monitoring", "Waste Bunker Monitoring",
//   "Cement Kiln Shell Monitoring", "Casting Unit Monitoring", "Ladle Monitoring",
//   "PCB Manufacturing / Testing", "De-Fogger Testing", "Human Body Temperature Checking",
//   "AC / DC Motors Thermal Monitoring", "Fire Sensitive Area Monitoring",
// ];

// const processSteps = [
//   { icon: <Search size={20} />,    title: "Site Assessment & Camera Selection", desc: "We assess the monitoring requirement, environmental conditions and thermal targets to specify the correct fixed thermal camera system from our Tempsens-powered portfolio." },
//   { icon: <Cpu size={20} />,       title: "System Installation & Integration",  desc: "Thermal cameras are installed at optimal vantage points and integrated with plant control systems, PLCs or SCADA via Ethernet, Modbus or relay outputs." },
//   { icon: <BarChart3 size={20} />, title: "Automated Alarm & Alert Setup",      desc: "Temperature thresholds, zones of interest and alarm levels are configured — triggering real-time alerts to operators when any monitored surface exceeds set limits." },
//   { icon: <FileText size={20} />,  title: "Reporting & Trend Analysis",         desc: "Continuous temperature data is logged and trended, providing historical records, shift reports and actionable maintenance intelligence for each monitored asset." },
// ];

// const problemPoints = [
//   "Manual thermal surveys only capture a snapshot — critical hotspots develop between inspection rounds",
//   "Delayed detection of kiln shell hot spots leads to catastrophic refractory failures and unplanned shutdowns",
//   "Coal pile spontaneous combustion events are undetected until fire is already established",
//   "Electrical yard faults on OHE and sub-station equipment cause costly outages and safety incidents",
//   "Overheating motors and drives fail without warning, disrupting production lines",
// ];
// const solutionPoints = [
//   "Fixed thermal cameras provide continuous, automated 24/7 temperature monitoring",
//   "Instant alarm triggers alert operators the moment a hotspot crosses a set threshold",
//   "Non-contact sensing — no disruption to process, no personnel exposure to hazardous areas",
//   "Tempsens-powered systems deliver ±1°C accuracy across industrial temperature ranges",
//   "Scalable from a single camera to full plant-wide thermal automation networks",
// ];
// const impactPoints = [
//   { icon: <TrendingDown size={15} />, label: "Prevent catastrophic process failures through continuous hotspot detection"    },
//   { icon: <Flame size={15} />,        label: "Eliminate fire risk in coal, biomass and fire-sensitive storage areas"          },
//   { icon: <Shield size={15} />,       label: "Protect electrical infrastructure with automated OHE and sub-station monitoring" },
//   { icon: <CheckCircle2 size={15} />, label: "Extend equipment life and reduce unplanned downtime across all monitored assets" },
// ];
// const relatedServices = [
//   { label: "HT / HV Electrical Partial Discharge Detection",  path: "/services/partial-discharge"   },
//   { label: "Slow Speed Bearing Condition Assessment",          path: "/services/bearing-condition"   },
//   { label: "Hull Integrity Assessment — Life Boats / Yacht",  path: "/services/hull-integrity"      },
//   { label: "Steam Trap / Valve Pass Audit",                    path: "/services/steam-trap"          },
// ];
// const industries = [
//   "Cement & Lime", "Steel & Foundry", "Power Generation",
//   "Coal & Mining", "Food & Beverage", "Electronics / PCB",
//   "Petrochemical", "Ports & Logistics",
// ];

// /* ── Sub-components ── */
// const AppCard = ({ item, index }) => {
//   const ref = useFU(index * 80);
//   return (
//     <div ref={ref} className="tm-app-card fu">
//       <div className="tm-app-icon">{item.icon}</div>
//       <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
//       <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
//     </div>
//   );
// };
// const StepCard = ({ step, index }) => {
//   const ref = useFU(index * 90);
//   return (
//     <div ref={ref} className="tm-step fu">
//       <div className="tm-step-num">0{index + 1}</div>
//       <div className="tm-step-icon">{step.icon}</div>
//       <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
//       <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    PAGE
// ═══════════════════════════════════════════════════════════ */
// const ThermalMonitoringAutomation = () => {
//   const refOverviewL = useFU(0);
//   const refOverviewR = useFU(100);
//   const refAppHead   = useFU(0);
//   const refUseCases  = useFU(0);
//   const refProbHead  = useFU(0);
//   const refProbL     = useFU(0);
//   const refProbR     = useFU(100);
//   const refProcHead  = useFU(0);
//   const refIndL      = useFU(0);
//   const refIndR      = useFU(100);
//   const refRelated   = useFU(0);

//   return (
//     <div className="tm-page">
//       <style>{css}</style>

//       {/* ════════════════════ HERO ════════════════════ */}
//       <section className="tm-hero">
//         <img src={heroImg} alt="" className="tm-hero-photo" aria-hidden="true" />
//         <div className="tm-hero-wash" />
//         <div className="tm-hero-dots" />
//         <div className="tm-hero-burst" />
//         <div className="tm-hero-sky" />

//         <div className="tm-hero-inner">
//           {/* ── LEFT copy ── */}
//           <div>
//             <div className="tm-bread">
//               <Link to="/">Home</Link>
//               <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
//               <Link to="/services">Services</Link>
//               <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
//               <span className="tm-bread-active">Thermal Monitoring & Automation Solutions</span>
//             </div>

//             <div className="tm-badge" style={{ marginBottom: 20 }}>
//               <Thermometer size={11} /> Thermal Automation
//             </div>

//             <h1 style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
//               Thermal Monitoring &<br />
//               <span style={{
//                 background: "linear-gradient(90deg,#f59e0b 0%,#b45309 60%,#f59e0b 100%)",
//                 WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
//               }}>
//                 Automation Solutions
//               </span>
//             </h1>

//             <p className="tm-flicker" style={{
//               fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#062979",
//               letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
//             }}>
//               ⚡ Hotspots developing right now could shut down your plant tomorrow
//             </p>

//             <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
//               Continuous, automated thermal surveillance for{" "}
//               <strong style={{ color: "#b45309" }}>kilns, coal piles, electrical yards, critical motors, casting units</strong> and more — powered by{" "}
//               <strong style={{ color: "#b45309" }}>Tempsens</strong> fixed thermal camera technology for 24/7 hotspot detection and fire prevention.
//             </p>

//             <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
//               <Link to="/contact" className="tm-btn-primary">Request a Consultation <ArrowRight size={16} /></Link>
//               {/* <Link to="/services" className="tm-btn-ghost">All Services</Link> */}
//             </div>

//             <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//               {stats.map((s) => (
//                 <div key={s.label} className="tm-stat" style={{ minWidth: 120 }}>
//                   <div className="tm-stat-num">{s.num}</div>
//                   <div className="tm-stat-label">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── RIGHT col placeholder ── */}
//           <div className="tm-video-col" />
//         </div>
//       </section>

//       {/* ════════════════════ OVERVIEW ════════════════════ */}
//       <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding: "80px 28px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }} className="tm-two-col">
//           <div ref={refOverviewL} className="fu">
//             <div className="tm-section-badge"><Zap size={11} /> How It Works</div>
//             <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
//               This service deploys <strong style={{ color: "#1e293b" }}>fixed thermal imaging cameras</strong> at strategic points across your plant or facility, providing continuous, automated temperature monitoring of critical assets and areas — without any operator intervention.
//             </p>
//             <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
//               When a monitored surface exceeds a preset temperature threshold, the system triggers{" "}
//               <strong style={{ color: "#1e293b" }}>real-time alarms to operators</strong>, enabling immediate action before a hotspot develops into a failure, fire or safety incident.
//             </p>
//             <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
//               All systems are powered by <strong style={{ color: "#b45309" }}>Tempsens</strong> thermal camera technology, covering applications from{" "}
//               <strong style={{ color: "#1e293b" }}>cement kiln shell and coal pile monitoring to sub-station surveillance, casting unit inspection and human body temperature screening.</strong>
//             </p>
//             <div className="tm-highlight">
//               <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Why Fixed Thermal Automation?</p>
//               <p style={{ fontSize: 15, lineHeight: 1.65 }}>
//                 Manual surveys miss the moment a hotspot develops between rounds. Fixed thermal cameras watch <strong>every second of every shift</strong> — delivering the early warning that prevents catastrophic failures and unplanned shutdowns.
//               </p>
//             </div>
//           </div>

//           <div ref={refOverviewR} className="fu">
//             <div className="tm-img-wrap">
//               <ImgWithFallback src={sectionImg} alt="Thermal monitoring automation system in operation" fallbackHeight={440}
//                 style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
//             </div>
//             <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
//               <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Technology Partner</div>
//               <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Tempsens Fixed Thermal Camera Systems</div>
//               <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>24/7 Automated · Non-contact · ±1°C Accuracy</div>
//             </div>
//           </div>
//         </div>
//       </section>

      
//       {/* ════════════════════ APPLICATIONS ════════════════════ */}
//       <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }}>
//           <div ref={refAppHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
//             <div className="tm-section-badge" style={{ margin: "0 auto 12px" }}><Eye size={11} /> Key Applications</div>
//             <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Critical Assets We Monitor</h2>
//             <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>From cement kilns and coal piles to electrical yards and food processing lines — automated thermal protection across every critical asset.</p>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
//             {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
//           </div>
//         </div>
//       </section>

     
//     </div>
//   );
// };

// export default ThermalMonitoringAutomation;





import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, Search, BarChart3, FileText,
  CheckCircle2, TrendingDown, ChevronRight,
  Shield, Activity, Building2,
  Thermometer, AlertTriangle, Cpu, Flame,
  Eye, Radio, Factory,
} from "lucide-react";

import heroImg    from "@/assets/thermal_monitoring.webp";
import sectionImg from "@/assets/thermal_monitoring.webp";
import cementKiln from "@/assets/cement_kiln.jpg";
import coalBunker from "@/assets/coal_bunker.webp";
import htElectrical from "@/assets/ht_electrical.jpg";
import criticalMotor from "@/assets/criticalMotor.webp";
import casting from "@/assets/dieCasting.jpg";
import fire from "@/assets/fireMonitoring.webp";
import pcb from "@/assets/pcbManufacture.jpg";
import food from "@/assets/foodProcessing.jpg";

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .tm-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .tm-page * { box-sizing: border-box; }

  /* ── Flicker ── */
  @keyframes tm-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% {
      opacity: 1;
      text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
    }
    20%,24%,55% { opacity: 0.35; text-shadow: none; }
  }
  @keyframes tm-fade-in {
    0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
    60%  { opacity: 0.85; }
    100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
  }
  .tm-flicker {
    opacity: 0;
    animation:
      tm-fade-in  1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
      tm-flicker  4s  ease-in-out                   2s  infinite;
  }

  /* ── Hero ── */
  .tm-hero {
    position: relative; overflow: hidden;
    min-height: 88vh; display: flex; align-items: center;
  }
  .tm-hero-photo {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.62); pointer-events: none;
  }
  .tm-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.88) 0%,
      rgba(224,242,254,0.80) 55%,
      rgba(255,251,235,0.88) 100%);
  }
  .tm-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .tm-hero-burst {
    position: absolute; pointer-events: none;
    width: 70vw; height: 70vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .tm-hero-sky {
    position: absolute; pointer-events: none;
    width: 55vw; height: 55vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
    bottom: -15%; right: -5%;
  }

  /* ── Two-column hero ── */
  .tm-hero-inner {
    position: relative; max-width: 1280px; margin: 0 auto;
    padding: 80px 28px 72px; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
  }
  @media (max-width: 900px) {
    .tm-hero-inner { grid-template-columns: 1fr; }
    .tm-video-col { order: -1; }
  }

  /* ── Badge ── */
  .tm-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.10); border: 1px solid rgba(245,158,11,0.35);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px;
  }

  /* ── Stat cards ── */
  .tm-stat {
    background: rgba(255,255,255,0.82); border: 1px solid rgba(251,191,36,0.28);
    border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .tm-stat:hover { border-color: rgba(245,158,11,0.50); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
  .tm-stat-num   { font-size: 26px; font-weight: 900; color: #ea580c; line-height: 1; }
  .tm-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }

  /* ── Breadcrumb ── */
  .tm-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
  .tm-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
  .tm-bread a:hover { color: #f59e0b; }
  .tm-bread-sep { color: #cbd5e1; }
  .tm-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

  /* ── Section badge ── */
  .tm-section-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
  }

  /* ── Two-col grids ── */
  .tm-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .tm-two-col { grid-template-columns: 1fr; gap: 36px; } }
  .tm-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 767px) { .tm-split { grid-template-columns: 1fr; } }

  /* ── Application cards ── */
  .tm-app-card {
    background: #fff; border: 1px solid #eef0f4; border-radius: 16px;
    overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .tm-app-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f59e0b, transparent); opacity: 0; transition: opacity 0.2s;
  }
  .tm-app-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.28); transform: translateY(-4px); }
  .tm-app-card:hover::before { opacity: 1; }

  /* ── App card photo ── */
  .tm-app-card-photo-wrap {
    position: relative; width: 100%; height: 160px; overflow: hidden;
  }
  .tm-app-card-photo-wrap img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.4s ease;
  }
  .tm-app-card:hover .tm-app-card-photo-wrap img { transform: scale(1.05); }
  .tm-app-card-photo-wrap::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.22) 100%);
    pointer-events: none;
  }
  .tm-app-icon-badge {
    position: absolute; bottom: 10px; left: 12px; z-index: 2;
    width: 36px; height: 36px; border-radius: 10px;
    background: rgba(245,158,11,0.92);
    display: flex; align-items: center; justify-content: center;
    color: #fff;
  }
  .tm-app-card-body { padding: 18px 18px 20px; }

  /* ── Process steps ── */
  .tm-step {
    position: relative; background: #fff; border: 1px solid #eef0f4;
    border-radius: 16px; padding: 28px 24px; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .tm-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#f59e0b,transparent); opacity: 0; transition: opacity 0.22s; }
  .tm-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.35); transform: translateY(-4px); }
  .tm-step:hover::before { opacity: 1; }
  .tm-step-num { font-size: 44px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 14px; right: 16px; user-select: none; }
  .tm-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }

  /* ── Problem / solution ── */
  .tm-problem-card  { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
  .tm-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15);  border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }

  /* ── Image wrap ── */
  .tm-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
  .tm-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(245,158,11,0.08),transparent 60%); pointer-events: none; }
  .tm-img-placeholder { width: 100%; background: linear-gradient(135deg,#fffbeb 0%,#fde68a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

  /* ── Highlight box ── */
  .tm-highlight { background: linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }

  /* ── Use-case pill grid ── */
  .tm-usecase-grid { display: flex; flex-wrap: wrap; gap: 10px; }
  .tm-usecase-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid rgba(245,158,11,0.20); border-radius: 10px;
    padding: 9px 14px; font-size: 13px; font-weight: 500; color: #334155;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .tm-usecase-pill:hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
  .tm-usecase-dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }

  /* ── Industry pills ── */
  .tm-industry-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid #fffbeb; border-radius: 10px;
    padding: 10px 16px; font-size: 13px; font-weight: 500; color: #334155;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .tm-industry-pill:hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
  .tm-industry-dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }

  /* ── Buttons ── */
  .tm-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#f59e0b,#b45309); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
  .tm-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.50); }
  .tm-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); color: #334155; font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(251,191,36,0.28); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
  .tm-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }

  /* ── Related links ── */
  .tm-related { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border: 1px solid #eef0f4; border-radius: 12px; text-decoration: none; color: #334155; font-size: 13.5px; font-weight: 500; transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
  .tm-related:hover { border-color: rgba(245,158,11,0.35); color: #b45309; background: #fffbeb; transform: translateX(4px); }

  /* ── CTA ── */
  .tm-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .tm-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.20) 0%,transparent 65%); top: -200px; right: -100px; pointer-events: none; }

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
    <div className="tm-img-placeholder" style={{ height: fallbackHeight }}>
      <Thermometer size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#64748b" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ── Data ── */
const stats = [
  { num: "24/7",   label: "Continuous automated monitoring" },
  { num: "±1°C",   label: "Thermal measurement accuracy"   },
  { num: "100%",   label: "Non-contact temperature sensing" },
];

const applications = [
  {
    icon: <Factory size={19} />,
    title: "Cement Kiln Shell Monitoring",
    desc: "Continuous thermal scanning of rotating kiln shells to detect hot spots and refractory brick failures before a shell breach occurs.",
    photo: cementKiln,
    photoAlt: "Cement kiln industrial facility",
  },
  {
    icon: <Flame size={19} />,
    title: "Coal Pile & Waste Bunker Monitoring",
    desc: "Automated thermal surveillance of coal stockpiles, waste bunkers and biomass stores to detect spontaneous combustion at its earliest stage.",
    photo: coalBunker,
    photoAlt: "Coal pile storage yard",
  },
  {
    icon: <Zap size={19} />,
    title: "HT Electrical Yard & Sub-Station",
    desc: "Continuous overhead equipment (OHE) and sub-station thermal monitoring to identify hotspots on busbars, connections and switchgear.",
    photo: htElectrical,
    photoAlt: "High voltage electrical substation",
  },
  {
    icon: <Activity size={19} />,
    title: "Critical Motor & Drive Monitoring",
    desc: "Automated thermal surveillance of AC/DC motors, drives and rotating equipment to catch overheating before failure.",
    photo: criticalMotor,
    photoAlt: "Industrial motor and drive unit",
  },
  {
    icon: <Cpu size={19} />,
    title: "Casting Unit & Ladle Monitoring",
    desc: "Real-time thermal imaging of casting units and ladles in steel and foundry operations to ensure process quality and safety.",
    photo: casting,
    photoAlt: "Steel casting foundry ladle operation",
  },
  {
    icon: <Eye size={19} />,
    title: "Fire Sensitive Area Monitoring",
    desc: "Perimeter and area thermal cameras for fire detection in warehouses, forests, fuel storage and other fire-sensitive environments.",
    photo: fire,
    photoAlt: "Large warehouse fire-sensitive storage area",
  },
  {
    icon: <Radio size={19} />,
    title: "PCB & Electronics Manufacturing",
    desc: "Thermal monitoring during PCB manufacturing and testing operations to detect solder joint defects and component overheating.",
    photo: pcb,
    photoAlt: "PCB electronics manufacturing close-up",
  },
  {
    icon: <Thermometer size={19} />,
    title: "Food Processing & Human Temp",
    desc: "Thermal solutions for food processing line temperature control, de-fogger testing and human body temperature screening.",
    photo: food,
    photoAlt: "Food processing production line",
  },
];

const useCases = [
  "OHE (Over-Head Equipment)", "Metal Thinning Operations", "Food Processing Operations",
  "Coal Pile Monitoring", "Sub-Station Monitoring", "Waste Bunker Monitoring",
  "Cement Kiln Shell Monitoring", "Casting Unit Monitoring", "Ladle Monitoring",
  "PCB Manufacturing / Testing", "De-Fogger Testing", "Human Body Temperature Checking",
  "AC / DC Motors Thermal Monitoring", "Fire Sensitive Area Monitoring",
];

const processSteps = [
  { icon: <Search size={20} />,    title: "Site Assessment & Camera Selection", desc: "We assess the monitoring requirement, environmental conditions and thermal targets to specify the correct fixed thermal camera system from our Tempsens-powered portfolio." },
  { icon: <Cpu size={20} />,       title: "System Installation & Integration",  desc: "Thermal cameras are installed at optimal vantage points and integrated with plant control systems, PLCs or SCADA via Ethernet, Modbus or relay outputs." },
  { icon: <BarChart3 size={20} />, title: "Automated Alarm & Alert Setup",      desc: "Temperature thresholds, zones of interest and alarm levels are configured — triggering real-time alerts to operators when any monitored surface exceeds set limits." },
  { icon: <FileText size={20} />,  title: "Reporting & Trend Analysis",         desc: "Continuous temperature data is logged and trended, providing historical records, shift reports and actionable maintenance intelligence for each monitored asset." },
];

const problemPoints = [
  "Manual thermal surveys only capture a snapshot — critical hotspots develop between inspection rounds",
  "Delayed detection of kiln shell hot spots leads to catastrophic refractory failures and unplanned shutdowns",
  "Coal pile spontaneous combustion events are undetected until fire is already established",
  "Electrical yard faults on OHE and sub-station equipment cause costly outages and safety incidents",
  "Overheating motors and drives fail without warning, disrupting production lines",
];
const solutionPoints = [
  "Fixed thermal cameras provide continuous, automated 24/7 temperature monitoring",
  "Instant alarm triggers alert operators the moment a hotspot crosses a set threshold",
  "Non-contact sensing — no disruption to process, no personnel exposure to hazardous areas",
  "Tempsens-powered systems deliver ±1°C accuracy across industrial temperature ranges",
  "Scalable from a single camera to full plant-wide thermal automation networks",
];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Prevent catastrophic process failures through continuous hotspot detection"    },
  { icon: <Flame size={15} />,        label: "Eliminate fire risk in coal, biomass and fire-sensitive storage areas"          },
  { icon: <Shield size={15} />,       label: "Protect electrical infrastructure with automated OHE and sub-station monitoring" },
  { icon: <CheckCircle2 size={15} />, label: "Extend equipment life and reduce unplanned downtime across all monitored assets" },
];
const relatedServices = [
  { label: "HT / HV Electrical Partial Discharge Detection",  path: "/services/partial-discharge"   },
  { label: "Slow Speed Bearing Condition Assessment",          path: "/services/bearing-condition"   },
  { label: "Hull Integrity Assessment — Life Boats / Yacht",  path: "/services/hull-integrity"      },
  { label: "Steam Trap / Valve Pass Audit",                    path: "/services/steam-trap"          },
];
const industries = [
  "Cement & Lime", "Steel & Foundry", "Power Generation",
  "Coal & Mining", "Food & Beverage", "Electronics / PCB",
  "Petrochemical", "Ports & Logistics",
];

/* ── Sub-components ── */
const AppCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div ref={ref} className="tm-app-card fu" style={{ position: "relative" }}>
      {/* Photo section */}
      <div className="tm-app-card-photo-wrap">
        {!imgFailed ? (
          <img
            src={item.photo}
            alt={item.photoAlt || item.title}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg,#fffbeb 0%,#fde68a 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Thermometer size={32} color="#f59e0b" />
          </div>
        )}
        <div className="tm-app-icon-badge">{item.icon}</div>
      </div>

      {/* Text body */}
      <div className="tm-app-card-body">
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8, marginTop: 0 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65, margin: 0 }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
};

const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="tm-step fu">
      <div className="tm-step-num">0{index + 1}</div>
      <div className="tm-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const ThermalMonitoringAutomation = () => {
  const refOverviewL = useFU(0);
  const refOverviewR = useFU(100);
  const refAppHead   = useFU(0);
  const refUseCases  = useFU(0);
  const refProbHead  = useFU(0);
  const refProbL     = useFU(0);
  const refProbR     = useFU(100);
  const refProcHead  = useFU(0);
  const refIndL      = useFU(0);
  const refIndR      = useFU(100);
  const refRelated   = useFU(0);

  return (
    <div className="tm-page">
      <style>{css}</style>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="tm-hero">
        <img src={heroImg} alt="" className="tm-hero-photo" aria-hidden="true" />
        <div className="tm-hero-wash" />
        <div className="tm-hero-dots" />
        <div className="tm-hero-burst" />
        <div className="tm-hero-sky" />

        <div className="tm-hero-inner">
          {/* ── LEFT copy ── */}
          <div>
            <div className="tm-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="tm-bread-active">Thermal Monitoring & Automation Solutions</span>
            </div>

            <div className="tm-badge" style={{ marginBottom: 20 }}>
              <Thermometer size={11} /> Thermal Automation
            </div>

            <h1 style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Thermal Monitoring &<br />
              <span style={{
                background: "linear-gradient(90deg,#f59e0b 0%,#b45309 60%,#f59e0b 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Automation Solutions
              </span>
            </h1>

            <p className="tm-flicker" style={{
              fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#062979",
              letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
            }}>
              ⚡ Hotspots developing right now could shut down your plant tomorrow
            </p>

            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Continuous, automated thermal surveillance for{" "}
              <strong style={{ color: "#b45309" }}>kilns, coal piles, electrical yards, critical motors, casting units</strong> and more — powered by{" "}
              <strong style={{ color: "#b45309" }}>Tempsens</strong> fixed thermal camera technology for 24/7 hotspot detection and fire prevention.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="tm-btn-primary">Request a Consultation <ArrowRight size={16} /></Link>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="tm-stat" style={{ minWidth: 120 }}>
                  <div className="tm-stat-num">{s.num}</div>
                  <div className="tm-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT col placeholder ── */}
          <div className="tm-video-col" />
        </div>
      </section>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="tm-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="tm-section-badge"><Zap size={11} /> How It Works</div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              This service deploys <strong style={{ color: "#1e293b" }}>fixed thermal imaging cameras</strong> at strategic points across your plant or facility, providing continuous, automated temperature monitoring of critical assets and areas — without any operator intervention.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              When a monitored surface exceeds a preset temperature threshold, the system triggers{" "}
              <strong style={{ color: "#1e293b" }}>real-time alarms to operators</strong>, enabling immediate action before a hotspot develops into a failure, fire or safety incident.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              All systems are powered by <strong style={{ color: "#b45309" }}>Tempsens</strong> thermal camera technology, covering applications from{" "}
              <strong style={{ color: "#1e293b" }}>cement kiln shell and coal pile monitoring to sub-station surveillance, casting unit inspection and human body temperature screening.</strong>
            </p>
            <div className="tm-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Why Fixed Thermal Automation?</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                Manual surveys miss the moment a hotspot develops between rounds. Fixed thermal cameras watch <strong>every second of every shift</strong> — delivering the early warning that prevents catastrophic failures and unplanned shutdowns.
              </p>
            </div>
          </div>

          <div ref={refOverviewR} className="fu">
            <div className="tm-img-wrap">
              <ImgWithFallback src={sectionImg} alt="Thermal monitoring automation system in operation" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Technology Partner</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Tempsens Fixed Thermal Camera Systems</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>24/7 Automated · Non-contact · ±1°C Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ APPLICATIONS ════════════════════ */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refAppHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="tm-section-badge" style={{ margin: "0 auto 12px" }}><Eye size={11} /> Key Applications</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Critical Assets We Monitor</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>From cement kilns and coal piles to electrical yards and food processing lines — automated thermal protection across every critical asset.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ════════════════════ USE CASES ════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fff 0%,#fffbeb 100%)", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refUseCases} className="fu" style={{ marginBottom: 32 }}>
            <div className="tm-section-badge"><AlertTriangle size={11} /> Use Cases</div>
            <h2 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>Where We Apply Thermal Automation</h2>
            <p style={{ fontSize: 14, color: "#64748b", maxWidth: 520 }}>Every thermal monitoring scenario we have delivered — across industries and asset types.</p>
          </div>
          <div ref={refUseCases} className="tm-usecase-grid fu">
            {useCases.map((u) => (
              <div key={u} className="tm-usecase-pill">
                <span className="tm-usecase-dot" />
                {u}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ PROBLEM / SOLUTION ════════════════════ */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refProbHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="tm-section-badge" style={{ margin: "0 auto 12px" }}><Shield size={11} /> The Case for Automation</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Problem → Solution → Impact</h2>
          </div>
          <div className="tm-two-col" style={{ gap: 32, alignItems: "start" }}>
            <div ref={refProbL} className="fu">
              <div className="tm-problem-card">
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#b45309", marginBottom: 16, marginTop: 0 }}>Without Continuous Thermal Monitoring</h3>
                {problemPoints.map((p) => (
                  <div key={p} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                    <AlertTriangle size={14} style={{ color: "#f59e0b", marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div ref={refProbR} className="fu" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="tm-solution-card">
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#15803d", marginBottom: 16, marginTop: 0 }}>With Fixed Thermal Camera Automation</h3>
                {solutionPoints.map((s) => (
                  <div key={s} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                    <CheckCircle2 size={14} style={{ color: "#16a34a", marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6 }}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: 14, padding: "20px" }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 12, marginTop: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>Business Impact</h4>
                {impactPoints.map((ip) => (
                  <div key={ip.label} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#f59e0b", marginTop: 2, flexShrink: 0 }}>{ip.icon}</span>
                    <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>{ip.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ PROCESS ════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fff 0%,#fffbeb 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refProcHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="tm-section-badge" style={{ margin: "0 auto 12px" }}><Search size={11} /> Our Process</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>How We Deliver Your System</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 480, margin: "12px auto 0" }}>From site assessment to continuous reporting — a structured four-step deployment process.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 18 }}>
            {processSteps.map((step, i) => <StepCard key={step.title} step={step} index={i} />)}
          </div>
        </div>
      </section>

      {/* ════════════════════ INDUSTRIES + RELATED ════════════════════ */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", alignItems: "start", gap: 56 }} className="tm-two-col">
          {/* Industries */}
          <div ref={refIndL} className="fu">
            <div className="tm-section-badge"><Building2 size={11} /> Industries Served</div>
            <h2 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: "#0f1117", marginBottom: 20 }}>Sectors We Work In</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {industries.map((ind) => (
                <div key={ind} className="tm-industry-pill">
                  <span className="tm-industry-dot" />
                  {ind}
                </div>
              ))}
            </div>
          </div>

          {/* Related services */}
          <div ref={refIndR} className="fu">
            <div className="tm-section-badge"><ArrowRight size={11} /> Related Services</div>
            <h2 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: "#0f1117", marginBottom: 20 }}>You May Also Need</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {relatedServices.map((rs) => (
                <Link key={rs.path} to={rs.path} className="tm-related">
                  <span>{rs.label}</span>
                  <ChevronRight size={15} style={{ color: "#94a3b8", flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section className="tm-cta" style={{ padding: "80px 28px" }}>
        <div className="tm-cta-burst" />
        <div ref={refRelated} className="fu" style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>
            Stop Hotspots Before They Stop Your Plant
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, marginBottom: 32 }}>
            Talk to our thermal automation specialists about the right fixed camera system for your facility — from a single kiln to a full plant-wide network.
          </p>
          <Link to="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#fff", color: "#b45309", fontWeight: 700, fontSize: 16,
            padding: "15px 32px", borderRadius: 12, textDecoration: "none",
            boxShadow: "0 8px 28px rgba(0,0,0,0.15)", transition: "transform 0.15s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(0,0,0,0.22)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.15)"; }}
          >
            Request a Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ThermalMonitoringAutomation;