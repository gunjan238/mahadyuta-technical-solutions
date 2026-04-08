/* eslint-disable no-constant-condition */
// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight, Zap, Search, BarChart3, FileText,
//   CheckCircle2, TrendingDown, ChevronRight,
//   Shield, Waves, Activity, Building2, Radio, Cpu,
//   Thermometer, AlertTriangle,
// } from "lucide-react";

// import heroImg    from "@/assets/Electrical-Partial-Discharge.png"; // swap to actual PD image when available
// import sectionImg from "@/assets/Electrical-Partial-Discharge.png";

// /* ═══════════════════════════════════════════════════════════
//    STYLES  (same design tokens as AirWaterTight, accent = electric blue/amber)
// ═══════════════════════════════════════════════════════════ */
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
 
//   .pd-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
//   .pd-page * { box-sizing: border-box; }
 
//   /* ── Flicker ── */
//   @keyframes pd-flicker {
//     0%,19%,21%,23%,25%,54%,56%,100% {
//       opacity: 1;
//       text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
//     }
//     20%,24%,55% { opacity: 0.35; text-shadow: none; }
//   }
//   @keyframes pd-fade-in {
//     0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
//     60%  { opacity: 0.85; }
//     100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
//   }
//   .pd-flicker {
//     opacity: 0;
//     animation:
//       pd-fade-in  1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
//       pd-flicker  4s  ease-in-out                   2s  infinite;
//   }
 
//   /* ── Hero ── */
//   .pd-hero {
//     position: relative; overflow: hidden;
//     min-height: 88vh; display: flex; align-items: center;
//   }
//   .pd-hero-photo {
//     position: absolute; inset: 0;
//     width: 100%; height: 100%;
//     object-fit: cover; object-position: center;
//     filter: brightness(0.62); pointer-events: none;
//   }
//   .pd-hero-wash {
//     position: absolute; inset: 0;
//     background: linear-gradient(120deg,
//       rgba(239,246,255,0.90) 0%,
//       rgba(224,242,254,0.82) 55%,
//       rgba(255,251,235,0.88) 100%);
//   }
//   .pd-hero-dots {
//     position: absolute; inset: 0; opacity: 0.07;
//     background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
//     background-size: 40px 40px;
//   }
//   .pd-hero-burst {
//     position: absolute; pointer-events: none;
//     width: 70vw; height: 70vw; border-radius: 50%;
//     background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
//     top: -15%; left: -8%;
//   }
//   .pd-hero-sky {
//     position: absolute; pointer-events: none;
//     width: 55vw; height: 55vw; border-radius: 50%;
//     background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
//     bottom: -15%; right: -5%;
//   }
 
//   /* ── Two-column hero ── */
//   .pd-hero-inner {
//     position: relative; max-width: 1280px; margin: 0 auto;
//     padding: 80px 28px 72px; width: 100%;
//     display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
//   }
//   @media (max-width: 900px) {
//     .pd-hero-inner { grid-template-columns: 1fr; }
//     .pd-video-col { order: -1; }
//   }
 
//   /* ── Badge ── */
//   .pd-badge {
//     display: inline-flex; align-items: center; gap: 7px;
//     background: rgba(245,158,11,0.10); border: 1px solid rgba(245,158,11,0.35);
//     color: #b45309; font-size: 11px; font-weight: 700;
//     letter-spacing: 0.1em; text-transform: uppercase;
//     padding: 5px 14px; border-radius: 999px;
//   }
 
//   /* ── Stat cards ── */
//   .pd-stat {
//     background: rgba(255,255,255,0.82); border: 1px solid rgba(251,191,36,0.28);
//     border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(10px);
//     transition: border-color 0.2s, box-shadow 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
//   }
//   .pd-stat:hover { border-color: rgba(245,158,11,0.50); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
//   .pd-stat-num   { font-size: 26px; font-weight: 900; color: #b45309; line-height: 1; }
//   .pd-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }
 
//   /* ── Breadcrumb ── */
//   .pd-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
//   .pd-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
//   .pd-bread a:hover { color: #f59e0b; }
//   .pd-bread-sep { color: #cbd5e1; }
//   .pd-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }
 
//   /* ── Section badge ── */
//   .pd-section-badge {
//     display: inline-flex; align-items: center; gap: 6px;
//     background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
//     color: #b45309; font-size: 11px; font-weight: 700;
//     letter-spacing: 0.09em; text-transform: uppercase;
//     padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
//   }
 
//   /* ── Two-col grids ── */
//   .pd-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
//   @media (max-width: 900px) { .pd-two-col { grid-template-columns: 1fr; gap: 36px; } }
//   .pd-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
//   @media (max-width: 767px) { .pd-split { grid-template-columns: 1fr; } }
 
//   /* ── Application cards ── */
//   .pd-app-card {
//     background: #fff; border: 1px solid #eef0f4; border-radius: 16px;
//     padding: 24px 20px; position: relative; overflow: hidden;
//     transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
//   }
//   .pd-app-card::before {
//     content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
//     background: linear-gradient(90deg, #f59e0b, transparent); opacity: 0; transition: opacity 0.2s;
//   }
//   .pd-app-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.28); transform: translateY(-4px); }
//   .pd-app-card:hover::before { opacity: 1; }
//   .pd-app-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 14px; }
 
//   /* ── Process steps ── */
//   .pd-step {
//     position: relative; background: #fff; border: 1px solid #eef0f4;
//     border-radius: 16px; padding: 28px 24px; overflow: hidden;
//     transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
//   }
//   .pd-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#f59e0b,transparent); opacity: 0; transition: opacity 0.22s; }
//   .pd-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.35); transform: translateY(-4px); }
//   .pd-step:hover::before { opacity: 1; }
//   .pd-step-num { font-size: 44px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 14px; right: 16px; user-select: none; }
//   .pd-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }
 
//   /* ── Problem / solution ── */
//   .pd-problem-card  { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
//   .pd-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15);  border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }
 
//   /* ── Image wrap ── */
//   .pd-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
//   .pd-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(245,158,11,0.08),transparent 60%); pointer-events: none; }
//   .pd-img-placeholder { width: 100%; background: linear-gradient(135deg,#fffbeb 0%,#fde68a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }
 
//   /* ── Highlight box ── */
//   .pd-highlight { background: linear-gradient(135deg,#f59e0b 0%,#b45309 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }
 
//   /* ── Industry pills ── */
//   .pd-industry-pill {
//     display: inline-flex; align-items: center; gap: 8px;
//     background: #fff; border: 1px solid #fffbeb; border-radius: 10px;
//     padding: 10px 16px; font-size: 13px; font-weight: 500; color: #334155;
//     transition: border-color 0.15s, color 0.15s, background 0.15s;
//   }
//   .pd-industry-pill:hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
//   .pd-industry-dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }
 
//   /* ── Buttons ── */
//   .pd-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#f59e0b,#b45309); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
//   .pd-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.50); }
//   .pd-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); color: #334155; font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(251,191,36,0.28); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
//   .pd-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }
 
//   /* ── Related links ── */
//   .pd-related { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border: 1px solid #eef0f4; border-radius: 12px; text-decoration: none; color: #334155; font-size: 13.5px; font-weight: 500; transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
//   .pd-related:hover { border-color: rgba(245,158,11,0.35); color: #b45309; background: #fffbeb; transform: translateX(4px); }
 
//   /* ── CTA ── */
//   .pd-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
//   .pd-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.18) 0%,transparent 65%); top: -200px; right: -100px; pointer-events: none; }
 
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
//     <div className="pd-img-placeholder" style={{ height: fallbackHeight }}>
//       <Activity size={28} color="#3b82f6" />
//       <span style={{ fontSize: 13, color: "#64748b" }}>Image unavailable</span>
//     </div>
//   );
//   return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
// };

// /* ── Data ── */
// const stats = [
//   { num: "25 m",  label: "Safe detection distance"     },
//   { num: "100%",  label: "Non-contact inspection"      },
//   { num: "3-in-1",label: "Ultrasound + Thermography"   },
// ];

// const applications = [
//   { icon: <Zap size={19} />,        title: "High Voltage Transformers",      desc: "Early corona, tracking and arcing detection on HV power transformers before insulation failure occurs." },
//   { icon: <Radio size={19} />,      title: "Current / Potential Transformers", desc: "Non-contact PD scanning on CTs and PTs to verify insulation health without system shutdown." },
//   { icon: <Shield size={19} />,     title: "Surge Arresters & Lightning Arresters", desc: "Condition monitoring of surge protection devices to confirm proper functioning under live voltage." },
//   { icon: <Cpu size={19} />,        title: "Insulation Discs & Bushings",    desc: "Detection of partial discharges through insulation discs and high-voltage bushing assemblies." },
//   { icon: <Activity size={19} />,   title: "Transmission Lines",             desc: "Aerial and tower-level scanning of overhead HV transmission lines for corona and arcing defects." },
//   { icon: <Building2 size={19} />,  title: "Switch Gears & Electrical Panels", desc: "In-service inspection of MV/HV switchgear panels and bus-bar assemblies for internal discharge activity." },
// ];

// const processSteps = [
//   { icon: <Search size={20} />,    title: "Safe Stand-off Scanning",   desc: "Technician inspects energised equipment from a safe distance of up to 25 metres using a directional ultrasound detector." },
//   { icon: <Waves size={20} />,     title: "PD Signal Acquisition",     desc: "The detector captures airborne ultrasonic emissions produced by corona, tracking and arcing discharges across all phases." },
//   { icon: <Thermometer size={20}/>,title: "Thermographic Substantiation", desc: "Thermal imaging is combined with ultrasound data to confirm the defect, quantify severity and map heat signatures." },
//   { icon: <FileText size={20} />,  title: "Report & Maintenance Plan", desc: "Each identified defect is logged with photo evidence, severity rating and prioritised corrective action recommendations." },
// ];

// const problemPoints = [
//   "Partial discharges are invisible and silent to the naked eye",
//   "Undetected corona and tracking lead to progressive insulation breakdown",
//   "Catastrophic transformer failures cause unplanned outages and high replacement costs",
//   "Traditional tests require de-energisation, risking production loss",
//   "Equipment damage and arc-flash incidents pose serious safety hazards",
// ];
// const solutionPoints = [
//   "Ultrasound technology detects PD emissions from up to 25 metres safely",
//   "Equipment stays fully energised — zero production downtime",
//   "Thermography cross-validates findings for accurate severity assessment",
//   "Works on all HV assets: transformers, switchgear, lines and arresters",
//   "Early intervention prevents catastrophic failures and extends asset life",
// ];
// const impactPoints = [
//   { icon: <TrendingDown size={15} />, label: "Prevent catastrophic failures through early-stage PD detection"      },
//   { icon: <Shield size={15} />,       label: "Eliminate arc-flash risk with 25 m stand-off inspections"            },
//   { icon: <CheckCircle2 size={15} />, label: "Achieve regulatory compliance with documented condition reports"       },
//   { icon: <Activity size={15} />,     label: "Extend asset life and reduce unplanned maintenance spend"             },
// ];
// const relatedServices = [
//   { label: "Air / Water Tight Integrity Assessment",          path: "/services/air-water-tight"     },
//   { label: "Compressed Air Leak Detection",                   path: "/services/compressed-air"      },
//   { label: "Internal Hydraulic / Pneumatic Leak Detection",   path: "/services/hydraulic-pneumatic" },
//   { label: "Steam Trap / Valve Pass Audit",                   path: "/services/steam-trap"          },
// ];
// const industries = [
//   "Power Generation", "Transmission & Distribution", "Petrochemical Plants",
//   "Steel & Metal Works", "Cement Industry", "Pharmaceutical Plants",
//   "Data Centres", "Ports & Shipyards",
// ];

// /* ── Sub-components ── */
// const AppCard = ({ item, index }) => {
//   const ref = useFU(index * 80);
//   return (
//     <div ref={ref} className="pd-app-card fu">
//       <div className="pd-app-icon">{item.icon}</div>
//       <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
//       <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
//     </div>
//   );
// };
// const StepCard = ({ step, index }) => {
//   const ref = useFU(index * 90);
//   return (
//     <div ref={ref} className="pd-step fu">
//       <div className="pd-step-num">0{index + 1}</div>
//       <div className="pd-step-icon">{step.icon}</div>
//       <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
//       <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    PAGE
// ═══════════════════════════════════════════════════════════ */
// const PartialDischargeDetection = () => {
//   const refOverviewL = useFU(0);
//   const refOverviewR = useFU(100);
//   const refAppHead   = useFU(0);
//   const refProbHead  = useFU(0);
//   const refProbL     = useFU(0);
//   const refProbR     = useFU(100);
//   const refProcHead  = useFU(0);
//   const refIndL      = useFU(0);
//   const refIndR      = useFU(100);
//   const refRelated   = useFU(0);

//   return (
//     <div className="pd-page">
//       <style>{css}</style>

//       {/* ════════════════════ HERO ════════════════════ */}
//       <section className="pd-hero">
//         <img src={heroImg} alt="" className="pd-hero-photo" aria-hidden="true" />
//         <div className="pd-hero-wash" />
//         <div className="pd-hero-dots" />
//         <div className="pd-hero-burst" />
//         <div className="pd-hero-sky" />

//         <div className="pd-hero-inner">
//           {/* ── LEFT copy ── */}
//           <div>
//             <div className="pd-bread">
//               <Link to="/">Home</Link>
//               <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
//               <Link to="/services">Services</Link>
//               <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
//               <span className="pd-bread-active">HT / HV Electrical Partial Discharge Detection</span>
//             </div>

//             <div className="pd-badge" style={{ marginBottom: 20 }}>
//               <Zap size={11} /> Electrical Condition Monitoring
//             </div>

//             <h1
//   style={{
//     fontSize: "clamp(26px,4vw,50px)",
//     fontWeight: 800,
//     color: "#1e293b",
//     lineHeight: 1.08,
//     marginBottom: 16,
//   }}
// >
//   HT / HV Electrical<br />
//   <span
//     style={{
//       background: "linear-gradient(90deg, rgb(245, 158, 11) 0%, rgb(180, 83, 9) 60%, rgb(245, 158, 11) 100%)",
//       WebkitBackgroundClip: "text",
//       backgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//       position: "relative",
//       zIndex: 2,
//     }}
//   >
//     Partial Discharge Detection
//   </span>
// </h1>

//             {/* Flickering sub-headline */}
//             <p className="pd-flicker" style={{
//               fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#062979",
//               letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
//             }}>
//               ⚡ Silent discharge activity is destroying your insulation right now
//             </p>

//             <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
//               Early detection of{" "}
//               <strong style={{ color: "#b45309" }}>corona, tracking and arcing</strong> using reliable Ultrasound technology from a safe distance of{" "}
//               <strong style={{ color: "#b45309" }}>25 metres</strong> — substantiated with Thermography for increased operational reliability, cost savings and safety.
//             </p>

//             <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
//               <Link to="/contact" className="pd-btn-primary">Request an Assessment <ArrowRight size={16} /></Link>
//               {/* <Link to="/services" className="pd-btn-ghost">All Services</Link> */}
//             </div>

//             <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//               {stats.map((s) => (
//                 <div key={s.label} className="pd-stat" style={{ minWidth: 120 }}>
//                   <div className="pd-stat-num">{s.num}</div>
//                   <div className="pd-stat-label">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── RIGHT placeholder (swap with VideoPanel when video is available) ── */}
//           <div className="pd-video-col" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//             {/* <div style={{
//               position: "relative", borderRadius: 20, overflow: "hidden",
//               boxShadow: "0 24px 64px rgba(0,0,0,0.16)", aspectRatio: "16/10",
//               background: "#eff6ff", width: "100%",
//             }}>
//               <ImgWithFallback src={heroImg} alt="HV partial discharge inspection" fallbackHeight={340}
//                 style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
//               <div style={{
//                 position: "absolute", bottom: 16, left: 16, zIndex: 2,
//                 background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
//                 border: "1px solid rgba(59,130,246,0.25)", borderLeft: "4px solid #3b82f6",
//                 borderRadius: 10, padding: "10px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
//               }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                   <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6", display: "inline-block", animation: "pd-flicker 1.6s ease-in-out infinite" }} />
//                   <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8" }}>Live Inspection</span>
//                 </div>
//                 <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", marginTop: 4 }}>Partial Discharge Detection</div>
//                 <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Ultrasound · Thermography · Non-contact</div>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════ OVERVIEW ════════════════════ */}
//       <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#eff6ff 100%)", padding: "80px 28px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }} className="pd-two-col">
//           <div ref={refOverviewL} className="fu">
//             <div className="pd-section-badge"><Zap size={11} /> How It Works</div>
//             <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
//               This service uses <strong style={{ color: "#1e293b" }}>airborne ultrasound technology</strong> to detect partial discharges — a directional ultrasound instrument captures the high-frequency emissions produced by corona, tracking and arcing activity on live HT/HV equipment, from a safe stand-off distance of up to{" "}
//               <strong style={{ color: "#b45309" }}>25 metres</strong>.
//             </p>
//             <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
//               Highly appreciated for inspecting{" "}
//               <strong style={{ color: "#1e293b" }}>high voltage transformers, current and potential transformers, surge arresters, insulation discs, transmission lines, switchgear and electrical panels</strong> — all without de-energisation or production shutdown.
//             </p>
//             <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
//               Results are further substantiated with <strong style={{ color: "#1e293b" }}>thermographic imaging</strong> to confirm defect location, quantify heat signatures and deliver a complete, evidence-based condition report.
//             </p>
//             <div className="pd-highlight">
//               <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Why Ultrasound + Thermography?</p>
//               <p style={{ fontSize: 15, lineHeight: 1.65 }}>
//                 Ultrasound detects discharges that are <strong>invisible to thermal cameras alone</strong>. Combining both technologies eliminates false negatives and delivers the highest confidence in asset condition assessment.
//               </p>
//             </div>
//           </div>

//           <div ref={refOverviewR} className="fu">
//             <div className="pd-img-wrap">
//               <ImgWithFallback src={sectionImg} alt="Technician performing HV partial discharge inspection" fallbackHeight={440}
//                 style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
//             </div>
//             <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #b45309", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
//               <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Method</div>
//               <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Airborne Ultrasound + Thermography</div>
//               <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Non-contact · Equipment stays energised</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════ APPLICATIONS ════════════════════ */}
//       <section style={{ background: "#eff6ff", padding: "80px 28px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }}>
//           <div ref={refAppHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
//             <div className="pd-section-badge" style={{ margin: "0 auto 12px" }}><Cpu size={11} /> Applications</div>
//             <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Electrical Equipment We Inspect</h2>
//             <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>Trusted across power generation, transmission and industrial facilities for critical HT/HV asset inspection.</p>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
//             {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
//           </div>
//         </div>
//       </section>

      
//     </div>
//   );
// };

// export default PartialDischargeDetection;




import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, Search, BarChart3, FileText,
  CheckCircle2, TrendingDown, ChevronRight,
  Shield, Waves, Activity, Building2, Radio, Cpu,
  Thermometer, AlertTriangle,
} from "lucide-react";

import heroImg    from "@/assets/Electrical-Partial-Discharge.png";
import sectionImg from "@/assets/Electrical-Partial-Discharge.png";

/* ═══════════════════════════════════════════════════════════
   KEY CAPABILITY SVG — PD Detection System Schematic
═══════════════════════════════════════════════════════════ */

const PDCapabilitySVG = () => (
  <svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", borderRadius: 16 }}>
    <defs>
      <linearGradient id="pd-bg"        x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      <linearGradient id="pd-tx-body"   x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e3a5f"/><stop offset="100%" stopColor="#0f172a"/></linearGradient>
      <linearGradient id="pd-hot"       x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
      <linearGradient id="pd-detector"  x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#334155"/><stop offset="100%" stopColor="#1e293b"/></linearGradient>
      <radialGradient id="pd-corona-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#f59e0b" stopOpacity="0.6"/>
        <stop offset="40%"  stopColor="#ea580c" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
      </radialGradient>
      <marker id="pd-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/>
      </marker>
      <marker id="pd-arr-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6"/>
      </marker>
      <filter id="pd-glow-f">
        <feGaussianBlur stdDeviation="3" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    {/* ── Background ── */}
    <rect width="760" height="360" rx="16" fill="url(#pd-bg)"/>

    {/* ══════════════ TRANSFORMER (left asset) ══════════════ */}
    {/* Tank */}
    <rect x="48" y="80" width="100" height="160" rx="8" fill="url(#pd-tx-body)" style={{ filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.35))" }}/>
    {/* Amber accent top */}
    <rect x="48" y="80" width="100" height="6" rx="8" fill="url(#pd-hot)"/>
    {/* Cooling fins */}
    {[58,70,82,94,106,118,130].map(x => (
      <rect key={x} x={x} y="100" width="6" height="90" rx="2" fill="#334155" opacity="0.7"/>
    ))}
    {/* Bushings top */}
    {[68, 98, 128].map((x, i) => (
      <g key={i}>
        <rect x={x-6} y="58" width="12" height="28" rx="4" fill="#94a3b8"/>
        <rect x={x-8} y="62" width="16" height="6" rx="2" fill="#64748b"/>
        <rect x={x-8} y="72" width="16" height="6" rx="2" fill="#64748b"/>
      </g>
    ))}
    {/* HV label */}
    <rect x="58" y="208" width="80" height="20" rx="4" fill="rgba(245,158,11,0.15)"/>
    <text x="98" y="222" fill="#fbbf24" fontSize="9" fontWeight="700" textAnchor="middle">H.V. TRANSFORMER</text>
    {/* Rating plate */}
    <rect x="60" y="232" width="76" height="8" rx="2" fill="#1e3a5f"/>
    <text x="98" y="239" fill="#64748b" fontSize="6.5" textAnchor="middle">33 kV / 11 kV</text>

    {/* ── Corona discharge point on bushing ── */}
    <ellipse cx="98" cy="55" rx="18" ry="10" fill="url(#pd-corona-glow)">
      <animate attributeName="rx" values="18;26;18" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="ry" values="10;15;10" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
    </ellipse>
    {/* Discharge sparks */}
    <g style={{ filter:"url(#pd-glow-f)" }}>
      <polyline points="90,58 85,48 92,44 88,34" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round">
        <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite"/>
      </polyline>
      <polyline points="98,52 102,42 98,38 103,28" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.1s" repeatCount="indefinite" begin="0.2s"/>
      </polyline>
      <polyline points="106,58 111,46 106,42 112,32" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round">
        <animate attributeName="opacity" values="1;0.2;1" dur="0.9s" repeatCount="indefinite" begin="0.4s"/>
      </polyline>
    </g>
    {/* Alert badge */}
    <rect x="72" y="14" width="52" height="16" rx="8" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1"/>
    <text x="98" y="25.5" fill="#ef4444" fontSize="7.5" textAnchor="middle" fontWeight="700">⚠ PD ACTIVE</text>

    {/* ══════════════ SWITCHGEAR (middle asset) ══════════════ */}
    <rect x="310" y="110" width="90" height="130" rx="8" fill="#1e3a5f" style={{ filter:"drop-shadow(0 6px 18px rgba(0,0,0,0.30))" }}/>
    <rect x="310" y="110" width="90" height="6" rx="8" fill="url(#pd-hot)"/>
    {/* Panel doors */}
    {[0,1,2].map(i => (
      <g key={i}>
        <rect x="316" y={122+i*36} width="38" height="26" rx="3" fill="#172032" stroke="#334155" strokeWidth="1"/>
        <rect x="356" y={122+i*36} width="38" height="26" rx="3" fill="#172032" stroke="#334155" strokeWidth="1"/>
        {/* Indicators */}
        <circle cx="327" cy={135+i*36} r="3" fill={i===1 ? "#ef4444" : "#22c55e"} style={{ filter:"drop-shadow(0 0 3px currentColor)" }}>
          {i===1 && <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/>}
        </circle>
      </g>
    ))}
    <text x="355" y="254" fill="#fbbf24" fontSize="8" fontWeight="700" textAnchor="middle">SWITCHGEAR</text>

    {/* PD on switchgear */}
    <ellipse cx="355" cy="105" rx="14" ry="8" fill="url(#pd-corona-glow)" opacity="0.8">
      <animate attributeName="rx" values="14;20;14" dur="2.3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.3s" repeatCount="indefinite"/>
    </ellipse>

    {/* ══════════════ TRANSMISSION LINE (top right) ══════════════ */}
    {/* Tower */}
    <line x1="580" y1="320" x2="580" y2="80" stroke="#64748b" strokeWidth="3"/>
    <line x1="548" y1="120" x2="612" y2="120" stroke="#64748b" strokeWidth="2.5"/>
    <line x1="556" y1="100" x2="604" y2="100" stroke="#64748b" strokeWidth="2"/>
    <line x1="562" y1="84"  x2="598" y2="84"  stroke="#64748b" strokeWidth="1.5"/>
    {/* Cross arms */}
    <line x1="548" y1="120" x2="548" y2="140" stroke="#64748b" strokeWidth="2"/>
    <line x1="580" y1="120" x2="580" y2="140" stroke="#64748b" strokeWidth="2"/>
    <line x1="612" y1="120" x2="612" y2="140" stroke="#64748b" strokeWidth="2"/>
    {/* Insulators */}
    {[548, 580, 612].map(x => (
      <g key={x}>
        <rect x={x-3} y="140" width="6" height="16" rx="2" fill="#94a3b8"/>
        <ellipse cx={x} cy="159" rx="5" ry="3" fill="#64748b"/>
      </g>
    ))}
    {/* Conductors going left */}
    <path d="M548,162 Q480,170 420,165" fill="none" stroke="#334155" strokeWidth="2"/>
    <path d="M580,162 Q500,172 420,170" fill="none" stroke="#334155" strokeWidth="2"/>
    <path d="M612,162 Q530,174 420,175" fill="none" stroke="#334155" strokeWidth="2"/>
    {/* Corona on line */}
    <ellipse cx="490" cy="168" rx="12" ry="7" fill="url(#pd-corona-glow)" opacity="0.9">
      <animate attributeName="rx" values="12;18;12" dur="1.8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.8s" repeatCount="indefinite"/>
    </ellipse>
    <text x="580" y="335" fill="#64748b" fontSize="8" textAnchor="middle" fontWeight="600">HV TOWER</text>

    {/* ══════════════ ULTRASOUND DETECTOR (technician) ══════════════ */}
    {/* Detection beam cone from detector to transformer */}
    <path d="M240,230 L130,65 L155,55 Z" fill="#f59e0b" opacity="0.06"/>
    <path d="M240,230 L310,148 L320,170 Z" fill="#f59e0b" opacity="0.05"/>
    {/* Detector gun body */}
    <rect x="220" y="210" width="50" height="30" rx="8" fill="url(#pd-detector)" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.3))" }}/>
    <rect x="220" y="210" width="50" height="5" rx="8" fill="url(#pd-hot)"/>
    {/* Parabolic dish */}
    <ellipse cx="270" cy="225" rx="6" ry="15" fill="#334155" stroke="#f59e0b" strokeWidth="1.5"/>
    {/* Handle */}
    <rect x="232" y="238" width="14" height="26" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
    {/* Display screen */}
    <rect x="224" y="215" width="34" height="18" rx="3" fill="#0f172a"/>
    {/* Waveform on screen */}
    <polyline points="226,224 230,220 234,226 238,218 242,224 246,221 250,226 254,222 258,224" fill="none" stroke="#f59e0b" strokeWidth="1.2"/>
    {/* Headphone cable */}
    <path d="M235,238 Q228,252 222,258" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Person silhouette */}
    <circle cx="245" cy="278" r="10" fill="#475569"/>
    <path d="M234,295 Q234,320 245,320 Q256,320 256,295 L253,290 L237,290 Z" fill="#475569"/>
    <path d="M237,290 L230,310" stroke="#475569" strokeWidth="5" strokeLinecap="round"/>
    <path d="M253,290 L260,310" stroke="#475569" strokeWidth="5" strokeLinecap="round"/>
    {/* Tech label */}
    <text x="245" y="340" fill="#64748b" fontSize="8" textAnchor="middle" fontWeight="600">TECHNICIAN</text>

    {/* ══════════════ ULTRASOUND DETECTION WAVES ══════════════ */}
    {/* From transformer bushing to detector */}
    {[1,2,3].map(i => (
      <ellipse key={i} cx="98" cy="55" rx={20+i*14} ry={12+i*8}
        fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3"
        opacity={0.6-i*0.15}>
        <animate attributeName="rx" values={`${20+i*14};${28+i*14};${20+i*14}`} dur={`${1.4+i*0.3}s`} repeatCount="indefinite"/>
        <animate attributeName="opacity" values={`${0.6-i*0.15};0.1;${0.6-i*0.15}`} dur={`${1.4+i*0.3}s`} repeatCount="indefinite"/>
      </ellipse>
    ))}
    {/* Propagation arrow to detector */}
    <line x1="150" y1="120" x2="225" y2="190" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,4" markerEnd="url(#pd-arr)" opacity="0.7"/>
    <text x="185" y="148" fill="#b45309" fontSize="8" fontWeight="700" transform="rotate(-40 185 148)">Ultrasound</text>

    {/* From switchgear to detector */}
    <line x1="310" y1="170" x2="276" y2="220" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,4" markerEnd="url(#pd-arr)" opacity="0.6"/>

    {/* ══════════════ THERMOGRAPHY CAMERA ══════════════ */}
    <rect x="630" y="200" width="64" height="40" rx="10" fill="url(#pd-detector)" style={{ filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.25))" }}/>
    <rect x="630" y="200" width="64" height="5" rx="10" fill="#3b82f6"/>
    <circle cx="662" cy="225" r="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2"/>
    <circle cx="662" cy="225" r="7"  fill="#030a12"/>
    <circle cx="662" cy="225" r="3"  fill="#0ea5e9" opacity="0.5"/>
    <circle cx="658" cy="221" r="2"  fill="rgba(255,255,255,0.5)"/>
    {/* Thermography beam to switchgear */}
    <line x1="630" y1="218" x2="418" y2="165" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#pd-arr-blue)" opacity="0.6"/>
    <text x="524" y="186" fill="#3b82f6" fontSize="8" fontWeight="600">IR Thermography</text>
    <text x="662" y="252" fill="#64748b" fontSize="8" textAnchor="middle" fontWeight="600">THERMAL CAMERA</text>

    {/* ══════════════ MEASUREMENT DISTANCE ══════════════ */}
    <line x1="155" y1="240" x2="220" y2="240" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="155" y1="236" x2="155" y2="244" stroke="#94a3b8" strokeWidth="1.5"/>
    <line x1="220" y1="236" x2="220" y2="244" stroke="#94a3b8" strokeWidth="1.5"/>
    <rect x="160" y="246" width="54" height="14" rx="6" fill="#fff" stroke="rgba(245,158,11,0.30)" strokeWidth="1"/>
    <text x="187" y="256" fill="#b45309" fontSize="8" fontWeight="700" textAnchor="middle">Up to 25 m</text>

    {/* ══════════════ OUTPUT NODES (bottom row) ══════════════ */}
    {[
      { x:90,  emoji:"📊", label:"dBμV Reading",  border:"rgba(245,158,11,0.30)", bg:"#fffbeb" },
      { x:210, emoji:"🌡",  label:"Thermal Map",   border:"rgba(59,130,246,0.30)", bg:"#eff6ff" },
      { x:330, emoji:"⚠️", label:"Severity Rating",border:"rgba(239,68,68,0.30)",  bg:"#fff5f5" },
      { x:450, emoji:"📄", label:"Asset Report",   border:"rgba(34,197,94,0.30)",  bg:"#f0fdf4" },
    ].map(o => (
      <g key={o.label}>
        <rect x={o.x-42} y="280" width="84" height="52" rx="12" fill={o.bg} stroke={o.border} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.06))" }}/>
        <text x={o.x}    y="306" fontSize="18" textAnchor="middle">{o.emoji}</text>
        <text x={o.x}    y="324" fill="#334155" fontSize="8.5" fontWeight="700" textAnchor="middle">{o.label}</text>
        <line x1={o.x} y1="276" x2={o.x} y2="280" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2"/>
      </g>
    ))}

    {/* ── System live indicator ── */}
    <circle cx="24" cy="24" r="6" fill="#22c55e">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <text x="36" y="28" fill="#22c55e" fontSize="9" fontWeight="700">SYSTEM ACTIVE · Non-Contact · Equipment Stays Energised</text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   KEY CAPABILITY COMPARISON TABLE SVG
═══════════════════════════════════════════════════════════ */

const PDComparisonSVG = () => {
  const rows = [
    { label: "Detection Distance",   pd: "Up to 25 m",          trad: "Contact only",      pdGood: true  },
    { label: "Equipment Status",     pd: "Fully energised",      trad: "De-energised",      pdGood: true  },
    { label: "Production Impact",    pd: "Zero shutdown",        trad: "Full shutdown",      pdGood: true  },
    { label: "Corona Detection",     pd: "Yes — high accuracy",  trad: "Partial / manual",  pdGood: true  },
    { label: "Thermographic Proof",  pd: "Yes — combined",       trad: "Separate visit",     pdGood: true  },
    { label: "Arc-Flash Risk",       pd: "Eliminated (standoff)","trad":"High (contact)",   pdGood: true  },
    { label: "Report Output",        pd: "Per-asset dBμV + heat map","trad":"Visual only",  pdGood: true  },
  ];
  const rowH = 32, startY = 72;

  return (
    <svg viewBox="0 0 680 330" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", borderRadius: 14 }}>
      <defs>
        <linearGradient id="cmp-hdr-pd"   x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
        <linearGradient id="cmp-hdr-trad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#94a3b8"/><stop offset="100%" stopColor="#64748b"/></linearGradient>
        <linearGradient id="cmp-bg"       x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      </defs>

      <rect width="680" height="330" rx="14" fill="url(#cmp-bg)"/>

      {/* ── Column headers ── */}
      <rect x="10"  y="10" width="230" height="52" rx="10" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="125" y="42" fill="#64748b" fontSize="11" fontWeight="700" textAnchor="middle">Inspection Method</text>

      <rect x="250" y="10" width="200" height="52" rx="10" fill="url(#cmp-hdr-pd)" style={{ filter:"drop-shadow(0 3px 10px rgba(245,158,11,0.30))" }}/>
      <text x="275" y="30" fill="#fff" fontSize="9"  fontWeight="700">⚡ ULTRASOUND +</text>
      <text x="275" y="45" fill="#fff" fontSize="11" fontWeight="900">Thermography PD</text>

      <rect x="460" y="10" width="200" height="52" rx="10" fill="url(#cmp-hdr-trad)"/>
      <text x="485" y="30" fill="#e2e8f0" fontSize="9"  fontWeight="700">TRADITIONAL</text>
      <text x="485" y="45" fill="#fff"   fontSize="11" fontWeight="900">Contact Testing</text>

      {/* ── Rows ── */}
      {rows.map((row, i) => {
        const y = startY + i * rowH;
        const isEven = i % 2 === 0;
        return (
          <g key={row.label}>
            {/* Row bg */}
            <rect x="10"  y={y} width="230" height={rowH} rx="0" fill={isEven ? "#fff" : "#f8fafc"} opacity="0.9"/>
            <rect x="250" y={y} width="200" height={rowH} rx="0" fill={isEven ? "rgba(245,158,11,0.06)" : "rgba(245,158,11,0.03)"}/>
            <rect x="460" y={y} width="200" height={rowH} rx="0" fill={isEven ? "rgba(148,163,184,0.08)" : "rgba(148,163,184,0.04)"}/>

            {/* Row divider */}
            <line x1="10" y1={y+rowH} x2="660" y2={y+rowH} stroke="#eef0f4" strokeWidth="0.8"/>

            {/* Label */}
            <text x="22" y={y+rowH/2+4} fill="#334155" fontSize="11" fontWeight="600">{row.label}</text>

            {/* PD value */}
            <circle cx="265" cy={y+rowH/2} r="5" fill="#22c55e" opacity="0.9"/>
            <text x="277" y={y+rowH/2+4} fill="#15803d" fontSize="10.5" fontWeight="600">{row.pd}</text>

            {/* Traditional value */}
            <circle cx="475" cy={y+rowH/2} r="5" fill="#ef4444" opacity="0.7"/>
            <text x="487" y={y+rowH/2+4} fill="#94a3b8" fontSize="10.5">{row.trad}</text>
          </g>
        );
      })}

      {/* ── Round off row corners ── */}
      // eslint-disable-next-line no-constant-condition
      <rect x="10"  y={startY} width="230" height="4" fill={true ? "#fff" : "#f8fafc"} opacity="0.9"/>
      <rect x="250" y={startY} width="200" height="4" fill="rgba(245,158,11,0.06)"/>
      <rect x="460" y={startY} width="200" height="4" fill="rgba(148,163,184,0.08)"/>

      {/* ── Bottom border radius ── */}
      <rect x="10"  y={startY + rows.length * rowH - 4} width="660" height="8" rx="0" fill="transparent"/>

      {/* ── Outer border ── */}
      <rect x="10" y="10" width="650" height={startY + rows.length * rowH} rx="10" fill="none" stroke="rgba(245,158,11,0.20)" strokeWidth="1.5"/>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════
   STYLES
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

  /* ── Key capability section ── */
  .pd-capability-card {
    background: #fff;
    border: 1px solid rgba(245,158,11,0.20);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.07);
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .pd-capability-card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.11); transform: translateY(-3px); }

  .pd-kpi-chip {
    display: inline-flex; align-items: center; gap: 6px;
    border-radius: 10px; padding: 8px 14px;
    font-size: 12px; font-weight: 700; color: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }

  .pd-tech-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: #fff; border: 1px solid rgba(245,158,11,0.22);
    border-radius: 999px; padding: 6px 14px;
    font-size: 12.5px; font-weight: 600; color: #334155;
    transition: border-color 0.15s, background 0.15s, color 0.15s;
  }
  .pd-tech-pill:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }
  .pd-tech-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

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
  { num: "25 m",   label: "Safe detection distance"   },
  { num: "100%",   label: "Non-contact inspection"    },
  { num: "3-in-1", label: "Ultrasound + Thermography" },
];

const applications = [
  { icon: <Zap size={19}/>,       title: "High Voltage Transformers",         desc: "Early corona, tracking and arcing detection on HV power transformers before insulation failure occurs." },
  { icon: <Radio size={19}/>,     title: "Current / Potential Transformers",   desc: "Non-contact PD scanning on CTs and PTs to verify insulation health without system shutdown." },
  { icon: <Shield size={19}/>,    title: "Surge Arresters & Lightning Arresters", desc: "Condition monitoring of surge protection devices to confirm proper functioning under live voltage." },
  { icon: <Cpu size={19}/>,       title: "Insulation Discs & Bushings",       desc: "Detection of partial discharges through insulation discs and high-voltage bushing assemblies." },
  { icon: <Activity size={19}/>,  title: "Transmission Lines",                desc: "Aerial and tower-level scanning of overhead HV transmission lines for corona and arcing defects." },
  { icon: <Building2 size={19}/>, title: "Switch Gears & Electrical Panels",  desc: "In-service inspection of MV/HV switchgear panels and bus-bar assemblies for internal discharge activity." },
];

const processSteps = [
  { icon: <Search size={20}/>,     title: "Safe Stand-off Scanning",      desc: "Technician inspects energised equipment from a safe distance of up to 25 metres using a directional ultrasound detector." },
  { icon: <Waves size={20}/>,      title: "PD Signal Acquisition",        desc: "The detector captures airborne ultrasonic emissions produced by corona, tracking and arcing discharges across all phases." },
  { icon: <Thermometer size={20}/>,title: "Thermographic Substantiation", desc: "Thermal imaging is combined with ultrasound data to confirm the defect, quantify severity and map heat signatures." },
  { icon: <FileText size={20}/>,   title: "Report & Maintenance Plan",    desc: "Each identified defect is logged with photo evidence, severity rating and prioritised corrective action recommendations." },
];

const pdCapabilityKPIs = [
  { value: "25 m",    label: "Safe standoff",      color: "#f59e0b" },
  { value: "0",       label: "Downtime required",  color: "#22c55e" },
  { value: "3-in-1",  label: "Detection modes",    color: "#3b82f6" },
  { value: "100%",    label: "Non-contact",         color: "#ea580c" },
];

const pdCapabilityPoints = [
  { icon: <Zap size={14}/>,          color: "#f59e0b", label: "Corona discharge on HV insulators and bushings" },
  { icon: <Activity size={14}/>,     color: "#ef4444", label: "Surface tracking across transmission line strings" },
  { icon: <Waves size={14}/>,        color: "#3b82f6", label: "Arcing activity inside switchgear enclosures" },
  { icon: <Shield size={14}/>,       color: "#22c55e", label: "Failing surge arresters before flashover" },
  { icon: <Thermometer size={14}/>,  color: "#8b5cf6", label: "Thermal anomalies confirming PD defect location" },
  { icon: <AlertTriangle size={14}/>,color: "#ea580c", label: "Early-stage insulation degradation trending" },
];

const techPills = [
  { label: "Airborne Ultrasound",   dot: "#f59e0b" },
  { label: "IR Thermography",       dot: "#3b82f6" },
  { label: "dBμV Measurement",      dot: "#22c55e" },
  { label: "Non-Contact, 25 m",     dot: "#ea580c" },
  { label: "Live Equipment",        dot: "#8b5cf6" },
  { label: "Evidence Reports",      dot: "#64748b" },
];

const relatedServices = [
  { label: "Air / Water Tight Integrity Assessment",         path: "/services/air-water-tight"     },
  { label: "Compressed Air Leak Detection",                  path: "/services/compressed-air"      },
  { label: "Internal Hydraulic / Pneumatic Leak Detection",  path: "/services/hydraulic-pneumatic" },
  { label: "Steam Trap / Valve Pass Audit",                  path: "/services/steam-trap"          },
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
  const refOverviewL  = useFU(0);
  const refOverviewR  = useFU(100);
  const refAppHead    = useFU(0);
  const refCapHead    = useFU(0);
  const refCapSVG     = useFU(0);
  const refCapPoints  = useFU(100);
  const refCapTable   = useFU(0);
  const refProcHead   = useFU(0);
  const refRelated    = useFU(0);

  return (
    <div className="pd-page">
      <style>{css}</style>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="pd-hero">
        <img src={heroImg} alt="" className="pd-hero-photo" aria-hidden="true"/>
        <div className="pd-hero-wash"/>
        <div className="pd-hero-dots"/>
        <div className="pd-hero-burst"/>
        <div className="pd-hero-sky"/>

        <div className="pd-hero-inner">
          <div>
            <div className="pd-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
              <span className="pd-bread-active">HT / HV Electrical Partial Discharge Detection</span>
            </div>

            <div className="pd-badge" style={{ marginBottom: 20 }}>
              <Zap size={11}/> Electrical Condition Monitoring
            </div>

            <h1 style={{ fontSize:"clamp(26px,4vw,50px)", fontWeight:800, color:"#1e293b", lineHeight:1.08, marginBottom:16 }}>
              HT / HV Electrical<br/>
              <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#b45309 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Partial Discharge Detection
              </span>
            </h1>

            <p className="pd-flicker" style={{ fontSize:"clamp(11px,1.2vw,14px)", fontWeight:700, color:"#062979", letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:14 }}>
              ⚡ Silent discharge activity is destroying your insulation right now
            </p>

            <p style={{ fontSize:"clamp(14px,1.4vw,16px)", color:"#475569", lineHeight:1.75, marginBottom:32, maxWidth:480 }}>
              Early detection of{" "}
              <strong style={{ color:"#b45309" }}>corona, tracking and arcing</strong> using reliable Ultrasound technology from a safe distance of{" "}
              <strong style={{ color:"#b45309" }}>25 metres</strong> — substantiated with Thermography for increased operational reliability, cost savings and safety.
            </p>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:40 }}>
              <Link to="/contact" className="pd-btn-primary">Request Survey <ArrowRight size={16}/></Link>
            </div>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="pd-stat" style={{ minWidth:120 }}>
                  <div className="pd-stat-num">{s.num}</div>
                  <div className="pd-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pd-video-col"/>
        </div>
      </section>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#eff6ff 100%)", padding:"80px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }} className="pd-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="pd-section-badge"><Zap size={11}/> How It Works</div>
            <p style={{ fontSize:15, color:"#64748b", lineHeight:1.75, marginBottom:16 }}>
              This service uses <strong style={{ color:"#1e293b" }}>airborne ultrasound technology</strong> to detect partial discharges — a directional ultrasound instrument captures the high-frequency emissions produced by corona, tracking and arcing activity on live HT/HV equipment, from a safe stand-off distance of up to{" "}
              <strong style={{ color:"#b45309" }}>25 metres</strong>.
            </p>
            <p style={{ fontSize:15, color:"#64748b", lineHeight:1.75, marginBottom:16 }}>
              Highly appreciated for inspecting{" "}
              <strong style={{ color:"#1e293b" }}>high voltage transformers, current and potential transformers, surge arresters, insulation discs, transmission lines, switchgear and electrical panels</strong> — all without de-energisation or production shutdown.
            </p>
            <p style={{ fontSize:15, color:"#64748b", lineHeight:1.75, marginBottom:24 }}>
              Results are further substantiated with <strong style={{ color:"#1e293b" }}>thermographic imaging</strong> to confirm defect location, quantify heat signatures and deliver a complete, evidence-based condition report.
            </p>
            <div className="pd-highlight">
              <p style={{ fontSize:14, fontWeight:600, opacity:0.9, marginBottom:6 }}>Why Ultrasound + Thermography?</p>
              <p style={{ fontSize:15, lineHeight:1.65 }}>
                Ultrasound detects discharges that are <strong>invisible to thermal cameras alone</strong>. Combining both technologies eliminates false negatives and delivers the highest confidence in asset condition assessment.
              </p>
            </div>
          </div>

          <div ref={refOverviewR} className="fu">
            <div className="pd-img-wrap">
              <ImgWithFallback src={sectionImg} alt="HV PD inspection" fallbackHeight={440}
                style={{ width:"100%", height:440, objectFit:"cover", display:"block" }}/>
            </div>
            <div style={{ marginTop:-28, marginLeft:24, position:"relative", zIndex:2, background:"#fff", border:"1px solid #eef0f4", borderLeft:"4px solid #b45309", borderRadius:14, padding:"14px 18px", display:"inline-block", boxShadow:"0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase", color:"#94a3b8", marginBottom:4 }}>Method</div>
              <div style={{ fontSize:14, fontWeight:600, color:"#1e293b" }}>Airborne Ultrasound + Thermography</div>
              <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>Non-contact · Equipment stays energised</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ APPLICATIONS ════════════════════ */}
      <section style={{ background:"#eff6ff", padding:"80px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refAppHead} className="fu" style={{ textAlign:"center", marginBottom:48 }}>
            <div className="pd-section-badge" style={{ margin:"0 auto 12px" }}><Cpu size={11}/> Applications</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:700, color:"#0f1117" }}>Electrical Equipment We Inspect</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"12px auto 0" }}>Trusted across power generation, transmission and industrial facilities for critical HT/HV asset inspection.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:18 }}>
            {applications.map((item, i) => <AppCard key={item.title} item={item} index={i}/>)}
          </div>
        </div>
      </section>

      {/* ════════════════════ KEY CAPABILITY — PD DETECTION ════════════════════ */}
      <section style={{ background:"linear-gradient(160deg,#fffbeb 0%,#fef3c7 100%)", padding:"80px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>

          {/* Section header */}
          <div ref={refCapHead} className="fu" style={{ textAlign:"center", marginBottom:48 }}>
            <div className="pd-section-badge" style={{ margin:"0 auto 12px" }}>
              <Zap size={11}/> Key Capability
            </div>
            <h2 style={{ fontSize:"clamp(22px,3vw,36px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>
              Partial Discharge Detection as a Key Capability
            </h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:580, margin:"0 auto" }}>
              Our PD detection service sits at the intersection of electrical safety, asset reliability and energy efficiency — identifying invisible defects before they escalate into catastrophic failures, arc-flash incidents or unplanned outages.
            </p>
          </div>

          {/* KPI chips row */}
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", marginBottom:40 }}>
            {pdCapabilityKPIs.map(k => (
              <div key={k.label} className="pd-kpi-chip" style={{ background:`linear-gradient(135deg,${k.color},${k.color}cc)` }}>
                <span style={{ fontSize:18, fontWeight:900 }}>{k.value}</span>
                <span style={{ fontSize:11, opacity:0.9 }}>{k.label}</span>
              </div>
            ))}
          </div>

          {/* Main capability card: SVG schematic left + capability points right */}
          <div ref={refCapSVG} className="fu pd-capability-card" style={{ marginBottom:28 }}>
            <div style={{ background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)", padding:"4px 0 0", borderRadius:"20px 20px 0 0" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 20px" }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:"#22c55e", display:"inline-block", boxShadow:"0 0 6px #22c55e" }}/>
                <span style={{ fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.08em" }}>
                  Live Detection Schematic — Electrical Asset Monitoring
                </span>
                <span style={{ marginLeft:"auto", background:"rgba(245,158,11,0.15)", border:"1px solid rgba(245,158,11,0.30)", color:"#fbbf24", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:999 }}>
                  PD DETECTION ACTIVE
                </span>
              </div>
            </div>
            <div style={{ padding:"0 20px 20px", background:"#fff" }}>
              <PDCapabilitySVG/>
            </div>
          </div>

          {/* Two-col: what we detect + comparison table */}
          <div className="pd-two-col" style={{ alignItems:"start" }}>

            {/* Left: What PD Detection identifies */}
            <div ref={refCapPoints} className="fu">
              <h3 style={{ fontSize:18, fontWeight:700, color:"#0f1117", marginBottom:6 }}>
                What Partial Discharge Detection Identifies
              </h3>
              <p style={{ fontSize:14, color:"#64748b", lineHeight:1.7, marginBottom:20 }}>
                Each discharge type has a distinct ultrasonic signature. Our detection methodology classifies the discharge, quantifies its intensity in dBμV and maps the thermal signature — giving your team actionable data, not just a pass/fail result.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
                {pdCapabilityPoints.map(p => (
                  <div key={p.label} style={{ display:"flex", alignItems:"flex-start", gap:10, background:"#fff", border:`1px solid ${p.color}22`, borderLeft:`4px solid ${p.color}`, borderRadius:10, padding:"12px 14px", boxShadow:"0 2px 6px rgba(0,0,0,0.04)" }}>
                    <div style={{ width:28, height:28, borderRadius:7, background:`${p.color}14`, display:"flex", alignItems:"center", justifyContent:"center", color:p.color, flexShrink:0 }}>{p.icon}</div>
                    <span style={{ fontSize:13.5, color:"#334155", fontWeight:500, lineHeight:1.5, paddingTop:6 }}>{p.label}</span>
                  </div>
                ))}
              </div>

              {/* Technology pills */}
              <div style={{ marginBottom:8 }}>
                <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#94a3b8", marginBottom:10 }}>Technologies Combined</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {techPills.map(t => (
                    <div key={t.label} className="pd-tech-pill">
                      <span className="pd-tech-dot" style={{ background:t.dot }}/>
                      {t.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: comparison table */}
            <div ref={refCapTable} className="fu">
              <h3 style={{ fontSize:18, fontWeight:700, color:"#0f1117", marginBottom:6 }}>
                Why This Method Outperforms Traditional Testing
              </h3>
              <p style={{ fontSize:14, color:"#64748b", lineHeight:1.7, marginBottom:20 }}>
                Conventional contact-based electrical testing requires de-energisation, creates arc-flash exposure and misses in-service PD activity entirely. Our non-contact approach eliminates every one of those constraints.
              </p>
              <div style={{ borderRadius:14, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.07)", border:"1px solid rgba(245,158,11,0.18)" }}>
                <PDComparisonSVG/>
              </div>
              <div style={{ marginTop:20 }}>
                <Link to="/contact" className="pd-btn-primary" style={{ width:"100%", justifyContent:"center" }}>
                  Request a PD Assessment <ArrowRight size={16}/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ PROCESS ════════════════════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#eff6ff 100%)", padding:"80px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refProcHead} className="fu" style={{ textAlign:"center", marginBottom:52 }}>
            <div className="pd-section-badge" style={{ margin:"0 auto 12px" }}><Search size={11}/> Our Process</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:700, color:"#0f1117" }}>How We Detect Partial Discharges</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
            {processSteps.map((s, i) => <StepCard key={s.title} step={s} index={i}/>)}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PartialDischargeDetection;