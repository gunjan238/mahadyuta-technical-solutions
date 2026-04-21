

// /* eslint-disable react-hooks/rules-of-hooks */
// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   ChevronRight, Zap, ArrowRight, CheckCircle2,
//   Droplets, Thermometer, Wind, Factory, Waves,
//   TrendingDown, Shield, Activity,
// } from "lucide-react";

// import deviceImg       from "@/assets/products/Nano water converter.jpg";
// import controlPanelImg from "@/assets/products/Nano water converter 2.png";
// import heroBg          from "@/assets/hero-bg.jpg";

// /* ═══════════════════════════════════════════════════════════
//    useFU hook
// ═══════════════════════════════════════════════════════════ */
// const useFU = (delay = 0) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) { setTimeout(() => el.classList.add("vis"), delay); obs.disconnect(); }
//     }, { threshold: 0.08 });
//     obs.observe(el); return () => obs.disconnect();
//   }, [delay]);
//   return ref;
// };

// const ImgWithFallback = ({
//   src, alt, style, fallbackHeight = 320,
// }) => {
//   const [failed, setFailed] = useState(false);
//   if (failed) return (
//     <div style={{ height: fallbackHeight, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 16 }}>
//       <Droplets size={36} color="#f59e0b" />
//     </div>
//   );
//   return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
// };

// /* ═══════════════════════════════════════════════════════════
//    SVG ILLUSTRATIONS
// ═══════════════════════════════════════════════════════════ */

// /* 1 ── Hero right: Device system schematic */
// const DeviceSchematicSVG = () => (
//   <svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:20 }}>
//     <defs>
//       <linearGradient id="ds-bg"   x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
//       <linearGradient id="ds-pipe" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#bae6fd"/><stop offset="100%" stopColor="#0ea5e9"/></linearGradient>
//       <linearGradient id="ds-clean" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#22c55e"/><stop offset="100%" stopColor="#16a34a"/></linearGradient>
//       <linearGradient id="ds-dev"  x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
//       <filter id="ds-glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
//       <marker id="ds-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#0ea5e9"/></marker>
//       <marker id="ds-arr-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#22c55e"/></marker>
//     </defs>
//     <rect width="520" height="400" rx="20" fill="url(#ds-bg)"/>

//     {/* ── BEFORE side ── */}
//     <text x="88" y="32" fill="#ef4444" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="0.07em">BEFORE</text>
//     <text x="88" y="46" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Hard Water In</text>

//     {/* Dirty pipe */}
//     <rect x="24" y="60" width="128" height="36" rx="18" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2"/>
//     <rect x="36" y="66" width="104" height="24" rx="12" fill="#94a3b8" opacity="0.4"/>
//     {[40,60,80,100,120].map(x=><ellipse key={x} cx={x} cy="78" rx="7" ry="5" fill="#ef4444" opacity="0.35"/>)}
//     <text x="88" y="82" fill="#475569" fontSize="8" textAnchor="middle" fontWeight="600">SCALE DEPOSITS</text>
//     {[44,68,92,116,140].map((x,i)=><circle key={i} cx={x} cy="115" r="5" fill="#64748b" opacity="0.3"/>)}
//     <text x="88" y="130" fill="#ef4444" fontSize="9" fontWeight="700" textAnchor="middle">⚠ Mineral Clusters</text>
//     <text x="88" y="143" fill="#64748b" fontSize="8" textAnchor="middle">(bond to surfaces)</text>

//     {/* ── DEVICE in centre ── */}
//     {[48,62,76,90].map((r,i)=>(
//       <circle key={i} cx="260" cy="150" r={r} fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity={0.08+i*0.04}
//         strokeDasharray={i%2===0?"6,4":"4,6"}/>
//     ))}
//     <radialGradient id="ds-field-rad" cx="50%" cy="50%" r="50%">
//       <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18"/>
//       <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
//     </radialGradient>
//     <circle cx="260" cy="150" r="88" fill="url(#ds-field-rad)"/>

//     <rect x="218" y="80" width="84" height="140" rx="18" fill="url(#ds-dev)" style={{ filter:"drop-shadow(0 8px 28px rgba(245,158,11,0.50))" }}/>
//     <rect x="228" y="92" width="64" height="100" rx="12" fill="rgba(255,255,255,0.18)"/>
//     {[0,1,2].map(i=>(
//       <circle key={i} cx="244" cy={108+i*20} r="5" fill="#fff" opacity={0.9}>
//         <animate attributeName="opacity" values={`${0.9-i*0.2};0.3;${0.9-i*0.2}`} dur={`${1.5+i*0.5}s`} repeatCount="indefinite"/>
//       </circle>
//     ))}
//     <rect x="256" y="104" width="28" height="8" rx="4" fill="rgba(255,255,255,0.35)"/>
//     <rect x="256" y="118" width="20" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
//     <rect x="256" y="132" width="24" height="8" rx="4" fill="rgba(255,255,255,0.30)"/>
//     <text x="260" y="170" fill="#fff" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.06em">NANO</text>
//     <text x="260" y="182" fill="#fff" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.06em">WATER</text>
//     <text x="260" y="194" fill="rgba(255,255,255,0.75)" fontSize="7" textAnchor="middle">CONVERTER</text>
//     <circle cx="260" cy="150" r="50" fill="none" stroke="#f59e0b" strokeWidth="2" style={{ filter:"url(#ds-glow)" }}>
//       <animate attributeName="r" values="50;62;50" dur="2.5s" repeatCount="indefinite"/>
//       <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite"/>
//     </circle>
//     <text x="260" y="248" fill="#b45309" fontSize="9" fontWeight="700" textAnchor="middle">⚡ Electronic Field Active</text>

//     {/* ── AFTER side ── */}
//     <text x="432" y="32" fill="#22c55e" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="0.07em">AFTER</text>
//     <text x="432" y="46" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Treated Water Out</text>

//     <rect x="368" y="60" width="128" height="36" rx="18" fill="#dcfce7" stroke="#86efac" strokeWidth="2"/>
//     <rect x="380" y="66" width="104" height="24" rx="12" fill="url(#ds-clean)" opacity="0.6"/>
//     <text x="432" y="82" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="700">SCALE FREE ✓</text>
//     {[390,410,430,450,470].map((x,i)=><circle key={i} cx={x} cy="115" r="5" fill="#22c55e" opacity="0.5"/>)}
//     <text x="432" y="130" fill="#22c55e" fontSize="9" fontWeight="700" textAnchor="middle">✓ Modified Minerals</text>
//     <text x="432" y="143" fill="#64748b" fontSize="8" textAnchor="middle">(pass through freely)</text>

//     <line x1="152" y1="78" x2="212" y2="100" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ds-arr)"/>
//     <line x1="308" y1="100" x2="368" y2="78" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ds-arr-g)"/>

//     {[
//       {x:60,  color:"#ef4444", icon:"✗", label:"No Chemicals"},
//       {x:180, color:"#22c55e", icon:"✓", label:"Scale Prevention"},
//       {x:300, color:"#3b82f6", icon:"⚡", label:"Energy Savings"},
//       {x:420, color:"#f59e0b", icon:"∞", label:"Maintenance Free"},
//     ].map(p=>(
//       <g key={p.label}>
//         <rect x={p.x-50} y="300" width="100" height="30" rx="15" fill="#fff" stroke={`${p.color}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
//         <text x={p.x} y="319" fill={p.color} fontSize="9.5" fontWeight="700" textAnchor="middle">{p.icon} {p.label}</text>
//       </g>
//     ))}

//     <rect x="24"  y="342" width="214" height="40" rx="12" fill="#fef2f2" stroke="rgba(239,68,68,0.25)" strokeWidth="1.5"/>
//     <rect x="282" y="342" width="214" height="40" rx="12" fill="#f0fdf4" stroke="rgba(34,197,94,0.25)" strokeWidth="1.5"/>
//     <text x="131" y="357" fill="#ef4444" fontSize="9" fontWeight="800" textAnchor="middle">⚠  Hard Scale · Energy Loss</text>
//     <text x="131" y="371" fill="#ef4444" fontSize="8.5" textAnchor="middle">Equipment Damage · High Maintenance</text>
//     <text x="389" y="357" fill="#22c55e" fontSize="9" fontWeight="800" textAnchor="middle">✓  Scale-Free · Energy Efficient</text>
//     <text x="389" y="371" fill="#22c55e" fontSize="8.5" textAnchor="middle">Equipment Protected · Zero Maintenance</text>
//     <text x="260" y="365" fill="#b45309" fontSize="11" fontWeight="900" textAnchor="middle">→</text>
//   </svg>
// );

// /* 2 ── How it works — 4-step flow */
// const HowItWorksSVG = () => (
//   <svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
//     <defs>
//       <linearGradient id="hw-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
//       <linearGradient id="hw-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
//       <marker id="hw-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/></marker>
//     </defs>
//     <rect width="760" height="220" rx="16" fill="url(#hw-bg)"/>
//     <text x="380" y="28" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">How the Nano Water Converter Works</text>
//     {[
//       {x:82,  emoji:"⚡",  step:"01", title:"Electronic Field\nGenerated",    color:"#f59e0b"},
//       {x:262, emoji:"⚛️", step:"02", title:"Crystal Structure\nModified",    color:"#ea580c"},
//       {x:442, emoji:"🌊",  step:"03", title:"Scale Prevented\n& Removed",    color:"#f97316"},
//       {x:622, emoji:"🛡",  step:"04", title:"Continuous\n24×7 Protection",   color:"#22c55e"},
//     ].map((s,i,arr)=>(
//       <g key={s.step}>
//         <circle cx={s.x} cy="110" r="48" fill="#fff" stroke={`${s.color}33`} strokeWidth="2" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.08))" }}/>
//         <circle cx={s.x} cy="110" r="36" fill={s.color} opacity="0.10"/>
//         <text x={s.x} y="96" fontSize="24" textAnchor="middle">{s.emoji}</text>
//         <text x={s.x} y="114" fill={s.color} fontSize="10" fontWeight="900" textAnchor="middle">STEP {s.step}</text>
//         {s.title.split("\n").map((l,j)=><text key={j} x={s.x} y={145+j*15} fill="#334155" fontSize="11" fontWeight="700" textAnchor="middle">{l}</text>)}
//         <text x={s.x+28} y="88" fill={s.color} fontSize="28" fontWeight="900" opacity="0.12" textAnchor="middle">{s.step}</text>
//         {i < arr.length-1 && <line x1={s.x+50} y1="110" x2={s.x+128} y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#hw-arr)"/>}
//       </g>
//     ))}
//   </svg>
// );

// /* 3 ── Applications radial */
// const ApplicationsSVG = () => (
//   <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
//     <defs>
//       <linearGradient id="ap-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9"/><stop offset="100%" stopColor="#f0f9ff"/></linearGradient>
//       <linearGradient id="ap-hub" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
//     </defs>
//     <rect width="760" height="300" rx="16" fill="url(#ap-bg)"/>
//     <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">Where the Nano Water Converter is Applied</text>
//     <circle cx="380" cy="158" r="48" fill="url(#ap-hub)" style={{ filter:"drop-shadow(0 6px 22px rgba(245,158,11,0.42))" }}/>
//     <text x="380" y="150" fill="#fff" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">NANO WATER</text>
//     <text x="380" y="163" fill="#fff" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">CONVERTER</text>
//     <text x="380" y="176" fill="rgba(255,255,255,0.75)" fontSize="7.5" textAnchor="middle">All water systems</text>
//     <circle cx="380" cy="158" r="105" fill="none" stroke="rgba(245,158,11,0.12)" strokeWidth="1.5" strokeDasharray="6,4"/>
//     {[
//       {a:-Math.PI/2,       emoji:"🏭", label:"Cooling Towers &\nHeat Exchangers"},
//       {a:-Math.PI/2+Math.PI/3, emoji:"⚡",  label:"Boilers &\nChillers"},
//       {a:-Math.PI/2+2*Math.PI/3,emoji:"💧", label:"RO & Water\nTreatment Plants"},
//       {a:-Math.PI/2+Math.PI,   emoji:"❄️",  label:"HVAC\nSystems"},
//       {a:-Math.PI/2+4*Math.PI/3,emoji:"🌊", label:"Process\nWater Lines"},
//       {a:-Math.PI/2+5*Math.PI/3,emoji:"🏗", label:"Industrial\nUtilities"},
//     ].map((n,i)=>{
//       const nx = 380+105*Math.cos(n.a), ny = 158+105*Math.sin(n.a);
//       return (
//         <g key={i}>
//           <line x1={380+50*Math.cos(n.a)} y1={158+50*Math.sin(n.a)} x2={nx-26*Math.cos(n.a)} y2={ny-26*Math.sin(n.a)} stroke="rgba(245,158,11,0.22)" strokeWidth="1.5"/>
//           <circle cx={nx} cy={ny} r="24" fill="#fff" stroke="rgba(245,158,11,0.28)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }}/>
//           <text x={nx} y={ny+2} fontSize="14" textAnchor="middle" dominantBaseline="middle">{n.emoji}</text>
//           {n.label.split("\n").map((l,j)=>{
//             const offset = Math.abs(Math.cos(n.a)) < 0.3 ? (Math.sin(n.a) > 0 ? 42 : -36) : (Math.cos(n.a) > 0 ? 42 : -42);
//             const textX  = Math.abs(Math.cos(n.a)) < 0.3 ? nx : nx + offset;
//             const textY  = Math.abs(Math.cos(n.a)) < 0.3 ? ny + Math.sign(Math.sin(n.a))*(36+j*14) : ny + (j-0.5)*13;
//             return <text key={j} x={textX} y={textY} fill="#334155" fontSize="9" fontWeight="700" textAnchor={Math.abs(Math.cos(n.a)) < 0.3 ? "middle" : (Math.cos(n.a) > 0 ? "start" : "end")}>{l}</text>;
//           })}
//         </g>
//       );
//     })}
//   </svg>
// );

// /* 4 ── Before / After energy impact */
// const ImpactSVG = () => (
//   <svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
//     <defs>
//       <linearGradient id="im-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9"/><stop offset="100%" stopColor="#fffbeb"/></linearGradient>
//     </defs>
//     <rect width="760" height="240" rx="16" fill="url(#im-bg)"/>
//     <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">The Cost of Scaling vs The Nano Water Converter Solution</text>

//     <rect x="24" y="44" width="336" height="176" rx="14" fill="#fff" stroke="rgba(239,68,68,0.20)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.06))" }}/>
//     <rect x="24" y="44" width="336" height="32" rx="14" fill="#ef4444" opacity="0.10"/>
//     <rect x="24" y="60" width="336" height="16" fill="#ef4444" opacity="0.10"/>
//     <text x="192" y="64" fill="#ef4444" fontSize="11" fontWeight="900" textAnchor="middle">⚠  WITHOUT Nano Water Converter</text>
//     {[
//       "Scale insulates pipes — up to 30% energy wasted",
//       "Equipment failures due to overheating",
//       "Regular chemical descaling shutdowns",
//       "Chemical procurement, handling & disposal cost",
//       "Reduced equipment life & high maintenance cost",
//     ].map((t,i)=>(
//       <g key={t}>
//         <circle cx="44" cy={92+i*26} r="5" fill="#ef4444" opacity="0.7"/>
//         <text x="56" y={97+i*26} fill="#475569" fontSize="11">{t}</text>
//       </g>
//     ))}

//     <rect x="368" y="114" width="24" height="24" rx="12" fill="#f59e0b" style={{ filter:"drop-shadow(0 2px 8px rgba(245,158,11,0.40))" }}/>
//     <text x="380" y="130" fill="#fff" fontSize="12" fontWeight="900" textAnchor="middle">→</text>

//     <rect x="400" y="44" width="336" height="176" rx="14" fill="#fff" stroke="rgba(34,197,94,0.22)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.06))" }}/>
//     <rect x="400" y="44" width="336" height="32" rx="14" fill="#22c55e" opacity="0.10"/>
//     <rect x="400" y="60" width="336" height="16" fill="#22c55e" opacity="0.10"/>
//     <text x="568" y="64" fill="#22c55e" fontSize="11" fontWeight="900" textAnchor="middle">✓  WITH Nano Water Converter</text>
//     {[
//       "Scale-free surfaces — full thermal efficiency restored",
//       "No overheating — equipment runs at design conditions",
//       "Zero descaling shutdowns — continuous operation",
//       "Zero chemicals — one-time installation, no ongoing cost",
//       "Extended equipment life — 100% environment friendly",
//     ].map((t,i)=>(
//       <g key={t}>
//         <circle cx="420" cy={92+i*26} r="5" fill="#22c55e" opacity="0.8"/>
//         <text x="432" y={97+i*26} fill="#334155" fontSize="11" fontWeight="500">{t}</text>
//       </g>
//     ))}
//   </svg>
// );

// /* ═══════════════════════════════════════════════════════════
//    DATA
// ═══════════════════════════════════════════════════════════ */
// const applications = [
//   { icon: <Thermometer size={18} />, title: "Cooling Towers & Heat Exchangers", desc: "Prevents scale build-up on heat transfer surfaces, maintaining thermal efficiency and reducing energy consumption." },
//   { icon: <Zap size={18} />,         title: "Boilers & Chillers",               desc: "Keeps boiler tubes and chiller coils scale-free, protecting equipment from overheating and premature failure." },
//   { icon: <Droplets size={18} />,    title: "RO & Water Treatment Plants",      desc: "Protects reverse osmosis membranes and treatment plant components from scaling and fouling." },
//   { icon: <Wind size={18} />,        title: "HVAC Systems",                     desc: "Maintains peak HVAC performance by eliminating scale deposits in chilled and condenser water circuits." },
//   { icon: <Waves size={18} />,       title: "Process Water Lines",              desc: "Ensures unobstructed flow and optimal heat transfer in all process water piping and equipment." },
//   { icon: <Factory size={18} />,     title: "Industrial Utilities",             desc: "Applicable across all industrial sectors wherever hard water causes scaling problems in equipment or pipelines." },
// ];

// const benefits = [
//   "100% Environment Friendly — no chemicals, no salt",
//   "FIT & FORGET — Maintenance Free Technology",
//   "Lifetime efficient for scale-free applications",
//   "Prevents scale deposition and removes existing scales",
//   "Reduces Power Consumption by ensuring free flow",
//   "Ensures effective Heat Transfer in Heat Exchangers",
//   "Hassle-free installation — no pipe cutting required",
//   "Reduces system downtime for maintenance",
//   "Applicable in all types of industrial facilities",
// ];

// const howItWorks = [
//   { icon: <Zap size={20} />,      title: "Electronic Field Generation",   desc: "The Nano Water Converter generates a precisely controlled electronic field around the pipe using its electronic control panel — no chemicals added to the water." },
//   { icon: <Droplets size={20} />, title: "Crystal Structure Modification", desc: "The electronic field alters the crystalline structure of dissolved minerals, preventing them from bonding to pipe walls and equipment surfaces as hard scale." },
//   { icon: <Waves size={20} />,    title: "Scale Prevention & Removal",    desc: "New scale formation is blocked and existing scale deposits are progressively softened and removed — carried away safely in the water flow." },
//   { icon: <Shield size={20} />,   title: "Continuous Protection",         desc: "The device operates continuously with zero maintenance — protecting all downstream equipment around the clock for the lifetime of the installation." },
// ];

// const heroStats = [
//   { num:"0",    label:"Chemicals used"          },
//   { num:"100%", label:"Environment friendly"    },
//   { num:"FIT",  label:"& Forget — maintenance free" },
//   { num:"24/7", label:"Continuous protection"   },
// ];

// /* ═══════════════════════════════════════════════════════════
//    STYLES
// ═══════════════════════════════════════════════════════════ */
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
//   .nw-page { font-family:'Roboto',sans-serif; color:#1e293b; }
//   .nw-page * { box-sizing:border-box; }

//   /* ── fade up ── */
//   .fu { opacity:0; transform:translateY(22px); transition:opacity 0.55s ease,transform 0.55s ease; }
//   .fu.vis { opacity:1; transform:translateY(0); }

//   /* ── Hero ── */
//   .nw-hero { position:relative; overflow:hidden; min-height:100svh; display:flex; align-items:center; }
//   .nw-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
//   .nw-hero-wash  { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,0.90) 0%,rgba(224,242,254,0.82) 55%,rgba(255,251,235,0.90) 100%); }
//   .nw-hero-dots  { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
//   .nw-hero-burst { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,0.26) 0%,rgba(251,191,36,0.09) 40%,transparent 70%); top:-15%; left:-8%; }
//   .nw-hero-sky   { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.20) 0%,rgba(56,189,248,0.06) 45%,transparent 70%); bottom:-15%; right:-5%; }

//   /* ── Hero inner grid ── */
//   .nw-hero-inner {
//     position:relative;
//     max-width:1280px;
//     margin:0 auto;
//     padding:72px 20px 64px;
//     width:100%;
//     display:grid;
//     grid-template-columns:1fr 1fr;
//     gap:48px;
//     align-items:center;
//   }
//   @media(max-width:900px){
//     .nw-hero-inner {
//       grid-template-columns:1fr;
//       gap:32px;
//       padding:56px 16px 48px;
//     }
//   }

//   /* ── Flicker animation ── */
//   @keyframes nw-fadein { 0%{opacity:0;transform:translateY(6px);letter-spacing:.13em} 60%{opacity:.85} 100%{opacity:1;transform:translateY(0);letter-spacing:.04em} }
//   @keyframes nw-flicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1;text-shadow:0 0 8px rgba(245,158,11,.85),0 0 20px rgba(234,88,12,.5)} 20%,24%,55%{opacity:.35;text-shadow:none} }
//   .nw-flicker { opacity:0; animation:nw-fadein 1.4s cubic-bezier(.22,1,.36,1) .3s forwards, nw-flicker 4s ease-in-out 2s infinite; font-size:clamp(12px,1.1vw,15px); font-weight:600; background:linear-gradient(90deg,#f59e0b,#ea580c); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:block; margin-top:10px; margin-bottom:18px; }

//   /* ── Breadcrumb ── */
//   .nw-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
//   .nw-bread a { font-size:12px; color:#64748b; text-decoration:none; transition:color .15s; }
//   .nw-bread a:hover { color:#f59e0b; }

//   /* ── Badges ── */
//   .nw-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:18px; }
//   .nw-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }

//   /* ── Stat chips ── */
//   .nw-stats-grid {
//     display:grid;
//     grid-template-columns:repeat(2, 1fr);
//     gap:10px;
//     margin-bottom:28px;
//   }
//   @media(min-width:540px){
//     .nw-stats-grid { grid-template-columns:repeat(4,1fr); }
//   }
//   .nw-stat { background:rgba(255,255,255,0.82); border:1px solid rgba(245,158,11,0.28); border-radius:14px; padding:12px 14px; backdrop-filter:blur(10px); box-shadow:0 2px 12px rgba(0,0,0,0.06); }
//   .nw-stat-num { font-size:20px; font-weight:900; color:#ea580c; line-height:1; }
//   .nw-stat-label { font-size:10px; color:#64748b; font-weight:500; margin-top:3px; }

//   /* ── Buttons ── */
//   .nw-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:14px; font-weight:700; padding:13px 24px; border-radius:12px; text-decoration:none; transition:transform .15s,box-shadow .2s; box-shadow:0 4px 20px rgba(245,158,11,0.38); white-space:nowrap; }
//   .nw-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.52); }
//   .nw-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:14px; font-weight:500; padding:13px 24px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,0.25); transition:border-color .2s,background .2s; white-space:nowrap; }
//   .nw-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

//   /* ── Hero CTA buttons row ── */
//   .nw-hero-btns {
//     display:flex;
//     gap:12px;
//     flex-wrap:wrap;
//   }

//   /* ── SVG card frame ── */
//   .nw-svg-card { border-radius:20px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.09),0 2px 8px rgba(0,0,0,0.05); border:1px solid rgba(245,158,11,0.14); transition:transform .3s,box-shadow .3s; }
//   .nw-svg-card:hover { transform:translateY(-5px) scale(1.005); box-shadow:0 20px 56px rgba(0,0,0,0.14); }
//   .nw-svg-label { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.10); border:1px solid rgba(245,158,11,0.25); color:#b45309; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; padding:5px 12px; border-radius:999px; margin-bottom:10px; }

//   /* ── Two col layout ── */
//   .nw-two-col {
//     display:grid;
//     grid-template-columns:1fr 1fr;
//     gap:56px;
//     align-items:start;
//   }
//   @media(max-width:900px){
//     .nw-two-col {
//       grid-template-columns:1fr;
//       gap:36px;
//     }
//   }

//   /* ── App card ── */
//   .nw-app-card { background:#fff; border:1px solid #eef0f4; border-radius:14px; padding:16px 18px; display:flex; align-items:flex-start; gap:14px; transition:box-shadow .2s,border-color .2s,transform .2s; }
//   .nw-app-card:hover { box-shadow:0 8px 28px rgba(0,0,0,0.08); border-color:rgba(245,158,11,0.28); transform:translateY(-3px); }
//   .nw-app-icon { width:40px; height:40px; border-radius:10px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; flex-shrink:0; }

//   /* ── Step card ── */
//   .nw-step { background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:24px 20px; overflow:hidden; position:relative; transition:box-shadow .22s,border-color .22s,transform .22s; }
//   .nw-step::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,#ea580c); opacity:0; transition:opacity .22s; }
//   .nw-step:hover { box-shadow:0 10px 36px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.35); transform:translateY(-4px); }
//   .nw-step:hover::before { opacity:1; }
//   .nw-step-num { font-size:44px; font-weight:900; color:rgba(245,158,11,0.10); line-height:1; position:absolute; top:14px; right:16px; user-select:none; }
//   .nw-step-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:16px; }

//   /* ── Steps grid ── */
//   .nw-steps-grid {
//     display:grid;
//     grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
//     gap:18px;
//   }

//   /* ── Benefit item ── */
//   .nw-benefit { display:flex; gap:10px; align-items:flex-start; padding:12px 16px; background:#fff; border:1px solid #eef0f4; border-radius:12px; margin-bottom:10px; transition:border-color .2s,box-shadow .2s; }
//   .nw-benefit:hover { border-color:rgba(245,158,11,0.28); box-shadow:0 4px 14px rgba(0,0,0,0.06); }

//   /* ── Device image card ── */
//   .nw-device-card { background:#fff; border-radius:24px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.12); border:1px solid #eef0f4; transition:transform .3s,box-shadow .3s; }
//   .nw-device-card:hover { transform:translateY(-6px) scale(1.01); box-shadow:0 28px 72px rgba(0,0,0,0.16); }

//   /* ── Highlight ── */
//   .nw-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:16px; padding:24px 28px; color:#fff; box-shadow:0 8px 28px rgba(245,158,11,0.30); position:relative; overflow:hidden; }
//   .nw-highlight::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 0%,rgba(255,255,255,0.18) 0%,transparent 60%); pointer-events:none; }

//   /* ── CTA ── */
//   .nw-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
//   .nw-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }

//   /* ── Pulse dot ── */
//   @keyframes nw-pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.5);opacity:0.6;} }
//   .nw-pulse-dot { width:10px; height:10px; border-radius:50%; background:#22c55e; animation:nw-pulse 2s infinite; display:inline-block; }

//   /* ── Status strip on control panel ── */
//   .nw-status-strip {
//     margin-top:16px;
//     display:grid;
//     grid-template-columns:repeat(2,1fr);
//     gap:8px;
//   }
//   @media(min-width:540px){
//     .nw-status-strip { grid-template-columns:repeat(4,1fr); }
//   }
//   .nw-status-chip {
//     display:flex;
//     align-items:center;
//     gap:6px;
//     background:#fff;
//     border:1px solid rgba(245,158,11,0.22);
//     border-radius:10px;
//     padding:8px 10px;
//     font-size:12px;
//     font-weight:600;
//     color:#334155;
//   }

//   /* ── Section padding ── */
//   .nw-section { padding:64px 20px; }
//   @media(max-width:640px){ .nw-section { padding:48px 16px; } }

//   /* ── Impact cards container ── */
//   .nw-impact-list { display:flex; flex-direction:column; gap:14px; }
//   .nw-impact-card {
//     background:#fff;
//     border:1px solid #eef0f4;
//     border-radius:14px;
//     padding:18px;
//     display:flex;
//     gap:14px;
//     align-items:flex-start;
//     box-shadow:0 2px 8px rgba(0,0,0,0.04);
//     transition:box-shadow 0.2s,transform 0.2s;
//   }
//   .nw-impact-card:hover { box-shadow:0 8px 24px rgba(0,0,0,0.08); transform:translateY(-2px); }
//   .nw-impact-icon {
//     width:42px;
//     height:42px;
//     border-radius:10px;
//     display:flex;
//     align-items:center;
//     justify-content:center;
//     flex-shrink:0;
//   }

//   /* ── App cards grid ── */
//   .nw-app-grid {
//     display:grid;
//     grid-template-columns:1fr;
//     gap:14px;
//   }
//   @media(min-width:480px){
//     .nw-app-grid { grid-template-columns:1fr 1fr; }
//   }
//   @media(min-width:900px){
//     .nw-app-grid { grid-template-columns:1fr; }
//   }

//   /* ── Section inner wrapper ── */
//   .nw-inner { max-width:1280px; margin:0 auto; }

//   /* ── h1 mobile ── */
//   @media(max-width:480px){
//     .nw-hero-btns { flex-direction:column; align-items:flex-start; }
//   }
// `;

// /* ═══════════════════════════════════════════════════════════
//    PAGE
// ═══════════════════════════════════════════════════════════ */
// const NanoWaterConverterDevice = () => {
//   const refOverview  = useFU(0);
//   const refSchematic = useFU(100);
//   const refAppHead   = useFU(0);
//   const refAppSvg    = useFU(100);
//   const refBenHead   = useFU(0);
//   const refHowHead   = useFU(0);
//   const refHowSvg    = useFU(100);
//   const refImpact    = useFU(0);
//   const refPanel     = useFU(100);
//   const appRefs      = applications.map((_,i) => useFU(i*70));
//   const stepRefs     = howItWorks.map((_,i) => useFU(i*90));
//   const benRefs      = benefits.map((_,i) => useFU(i*50));
//   const impRefs      = [useFU(0),useFU(80),useFU(160),useFU(240)];

//   return (
//     <div className="nw-page">
//       <style>{css}</style>

//       {/* ════════════════════ HERO ════════════════════ */}
//       <section className="nw-hero">
//         <img src={heroBg} alt="" className="nw-hero-photo" aria-hidden="true"/>
//         <div className="nw-hero-wash"/><div className="nw-hero-dots"/>
//         <div className="nw-hero-burst"/><div className="nw-hero-sky"/>

//         <div className="nw-hero-inner">

//           {/* LEFT */}
//           <div>
//             <div className="nw-bread">
//               <Link to="/">Home</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
//               <Link to="/products">Products</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
//               <span style={{ fontSize:12, color:"#334155", fontWeight:500 }}>Nano Water Converter</span>
//             </div>

//             <div className="nw-badge"><Droplets size={11}/> Chemical-Less Anti-Scaling Technology</div>

//             <h1 style={{ fontSize:"clamp(26px,5vw,54px)", fontWeight:900, color:"#1e293b", lineHeight:1.05, marginBottom:0 }}>
//               Nano Water{" "}
//               <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
//                 Converter Device
//               </span>
//             </h1>

//             <span className="nw-flicker">⚡ Scale-Free Water Systems — Without a Single Chemical</span>

//             <p style={{ fontSize:"clamp(14px,1.3vw,16px)", color:"#475569", lineHeight:1.8, marginBottom:12, maxWidth:500 }}>
//               An advanced, environmentally friendly solution designed to{" "}
//               <strong style={{ color:"#1e293b" }}>prevent and remove scale formation</strong> in industrial water systems — without the use of chemicals or salt.
//             </p>
//             <p style={{ fontSize:"clamp(14px,1.3vw,16px)", color:"#475569", lineHeight:1.8, marginBottom:24, maxWidth:500 }}>
//               <strong style={{ color:"#1e293b" }}>FIT &amp; FORGET technology</strong> — installed once, operating 24/7 for the lifetime of your system. No maintenance. No chemicals. No ongoing cost.
//             </p>

//             <div className="nw-stats-grid">
//               {heroStats.map(s=>(
//                 <div key={s.label} className="nw-stat">
//                   <div className="nw-stat-num">{s.num}</div>
//                   <div className="nw-stat-label">{s.label}</div>
//                 </div>
//               ))}
//             </div>

//             <div className="nw-hero-btns">
//               <Link to="/contact" className="nw-btn-primary">Request a Consultation <ArrowRight size={16}/></Link>
//             </div>
//           </div>

//           {/* RIGHT — device photo */}
//           <div>
//             <div className="nw-svg-label"><Droplets size={11}/> Nano Water Converter — Anti-Scaling System</div>
//             <div className="nw-device-card" style={{ background:"linear-gradient(135deg,#fffbeb,#fef3c7)", display:"flex", alignItems:"center", justifyContent:"center", minHeight:300, padding:20 }}>
//               <ImgWithFallback
//                 src={deviceImg}
//                 alt="Nano Water Converter Device"
//                 style={{ maxHeight:360, maxWidth:"100%", objectFit:"contain", filter:"drop-shadow(0 16px 40px rgba(0,0,0,0.20))", transition:"transform 0.4s", display:"block" }}
//                 fallbackHeight={300}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════ SCHEMATIC ════════════════════ */}
//       <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)" }} className="nw-section">
//         <div className="nw-inner">
//           <div ref={refSchematic} className="fu">
//             <div className="nw-svg-label"><Zap size={11}/> How It Works — Before &amp; After Comparison</div>
//             <div className="nw-svg-card"><DeviceSchematicSVG/></div>
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════ OVERVIEW ════════════════════ */}
//       <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)" }} className="nw-section">
//         <div className="nw-inner nw-two-col">
//           <div ref={refOverview} className="fu">
//             <div className="nw-section-badge"><Zap size={11}/> About the Device</div>
//             <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:700, color:"#0f1117", lineHeight:1.2, marginBottom:20 }}>
//               Scale-Free Water Systems.<br/>Without a Single Chemical.
//             </h2>
//             <p style={{ fontSize:15, color:"#64748b", lineHeight:1.8, marginBottom:16 }}>
//               The <strong style={{ color:"#1e293b" }}>Nano Water Converter</strong> uses advanced electronic field technology to modify the crystalline structure of dissolved minerals in water — preventing them from adhering to pipe walls and equipment surfaces as hard scale.
//             </p>
//             <p style={{ fontSize:15, color:"#64748b", lineHeight:1.8, marginBottom:16 }}>
//               Unlike chemical dosing systems that require ongoing purchases, maintenance and disposal, the Nano Water Converter is a <strong style={{ color:"#1e293b" }}>FIT &amp; FORGET device</strong> — installed once and operating continuously for the life of the system.
//             </p>
//             <p style={{ fontSize:15, color:"#64748b", lineHeight:1.8, marginBottom:28 }}>
//               Existing scale deposits are progressively softened and removed over time — restoring heat transfer efficiency, reducing energy consumption and extending the working life of all downstream equipment.
//             </p>
//             <div className="nw-highlight">
//               <div style={{ position:"relative", zIndex:1 }}>
//                 <p style={{ fontSize:14, fontWeight:700, opacity:0.9, marginBottom:8 }}>Chemical-Less. Maintenance-Free. Lifetime Performance.</p>
//                 <p style={{ fontSize:14, lineHeight:1.7 }}>One installation protects your entire water system — <strong>no chemicals, no salt, no ongoing cost</strong>. Delivers scale prevention for the full operational life of your plant.</p>
//               </div>
//             </div>
//           </div>

//           {/* Control panel image */}
//           <div ref={refPanel} className="fu">
//             <div className="nw-svg-label"><Zap size={11}/> Electronic Control Panel</div>
//             <div style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.10)", border:"1px solid #eef0f4" }}>
//               <ImgWithFallback
//                 src={controlPanelImg}
//                 alt="Nano Water Converter Electronic Control Panel"
//                 style={{ width:"100%", height:300, objectFit:"cover", display:"block" }}
//                 fallbackHeight={300}
//               />
//             </div>
//             <div className="nw-status-strip">
//               {[{icon:"💧",l:"Zero Chemicals"},{icon:"🔋",l:"Low Power"},{icon:"🛠",l:"No Maintenance"},{icon:"∞",l:"Lifetime Use"}].map(t=>(
//                 <div key={t.l} className="nw-status-chip">
//                   <span>{t.icon}</span>{t.l}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════ HOW IT WORKS ════════════════════ */}
//       <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)" }} className="nw-section">
//         <div className="nw-inner">
//           <div ref={refHowHead} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
//             <div className="nw-section-badge" style={{ margin:"0 auto 12px" }}><Zap size={11}/> Technology</div>
//             <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:700, color:"#0f1117", marginBottom:12 }}>How the Nano Water Converter Works</h2>
//             <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>A four-stage electronic process that eliminates scale formation without any chemicals or ongoing intervention.</p>
//           </div>

//           {/* Step cards */}
//           <div className="nw-steps-grid">
//             {howItWorks.map((step, i) => (
//               <div ref={stepRefs[i]} key={step.title} className="nw-step fu">
//                 <div className="nw-step-num">0{i+1}</div>
//                 <div className="nw-step-icon">{step.icon}</div>
//                 <h3 style={{ fontSize:16, fontWeight:700, color:"#0f1117", marginBottom:10 }}>{step.title}</h3>
//                 <p style={{ fontSize:13.5, color:"#64748b", lineHeight:1.65 }}>{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════ BENEFITS ════════════════════ */}
//       <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)" }} className="nw-section">
//         <div className="nw-inner nw-two-col">
//           <div ref={refBenHead} className="fu">
//             <div className="nw-section-badge"><CheckCircle2 size={11}/> Key Benefits</div>
//             <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:700, color:"#0f1117", lineHeight:1.2, marginBottom:24 }}>Benefits of the Nano Water Converter Device</h2>
//             {benefits.map((b, i) => (
//               <div ref={benRefs[i]} key={b} className="nw-benefit fu">
//                 <CheckCircle2 size={15} style={{ color:"#f59e0b", flexShrink:0, marginTop:2 }}/>
//                 <span style={{ fontSize:14, color:"#334155", lineHeight:1.65 }}>{b}</span>
//               </div>
//             ))}
//           </div>

//           {/* Impact cards */}
//           <div className="nw-impact-list">
//             {[
//               { icon:<TrendingDown size={20}/>, title:"Reduced Energy Consumption",  desc:"Scale on heat exchanger surfaces acts as an insulator. Removing it can reduce energy consumption by 15–30% in affected systems.", color:"#22c55e" },
//               { icon:<Shield size={20}/>,       title:"Extended Equipment Life",      desc:"Scale-free operation dramatically reduces mechanical stress, corrosion and overheating — extending equipment operational life.", color:"#3b82f6" },
//               { icon:<Activity size={20}/>,     title:"Zero Downtime for Descaling",  desc:"Eliminates the need for scheduled chemical descaling shutdowns — keeping your plant running continuously.", color:"#f59e0b" },
//               { icon:<Droplets size={20}/>,     title:"No Chemical Procurement",      desc:"Removes the cost, logistics and safety risks associated with chemical water treatment programmes entirely.", color:"#ea580c" },
//             ].map((item, i) => (
//               <div
//                 key={item.title}
//                 ref={impRefs[i]}
//                 className="nw-impact-card fu"
//                 style={{ borderLeft:`4px solid ${item.color}` }}
//               >
//                 <div className="nw-impact-icon" style={{ background:`${item.color}18`, color:item.color }}>{item.icon}</div>
//                 <div>
//                   <h4 style={{ fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:5 }}>{item.title}</h4>
//                   <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{item.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default NanoWaterConverterDevice;




/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, Zap, ArrowRight, CheckCircle2,
  Droplets, Thermometer, Wind, Factory, Waves,
  TrendingDown, Shield, Activity,
} from "lucide-react";

import deviceImg       from "@/assets/products/Nano water converter.jpg";
import controlPanelImg from "@/assets/products/Nano water converter 2.png";
import heroBg          from "@/assets/hero-bg.jpg";

/* ═══════════════════════════════════════════════════════════
   useFU hook
═══════════════════════════════════════════════════════════ */
const useFU = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("vis"), delay); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
};

const ImgWithFallback = ({
  src, alt, style, fallbackHeight = 320,
}) => {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div style={{ height: fallbackHeight, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 16 }}>
      <Droplets size={36} color="#f59e0b" />
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ═══════════════════════════════════════════════════════════
   SVG ILLUSTRATIONS
═══════════════════════════════════════════════════════════ */

/* 1 ── Hero right: Device system schematic */
const DeviceSchematicSVG = () => (
  <svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:20 }}>
    <defs>
      <linearGradient id="ds-bg"   x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      <linearGradient id="ds-pipe" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#bae6fd"/><stop offset="100%" stopColor="#0ea5e9"/></linearGradient>
      <linearGradient id="ds-clean" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#22c55e"/><stop offset="100%" stopColor="#16a34a"/></linearGradient>
      <linearGradient id="ds-dev"  x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
      <filter id="ds-glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <marker id="ds-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#0ea5e9"/></marker>
      <marker id="ds-arr-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#22c55e"/></marker>
    </defs>
    <rect width="520" height="400" rx="20" fill="url(#ds-bg)"/>

    {/* ── BEFORE side ── */}
    <text x="88" y="32" fill="#ef4444" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="0.07em">BEFORE</text>
    <text x="88" y="46" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Hard Water In</text>

    {/* Dirty pipe */}
    <rect x="24" y="60" width="128" height="36" rx="18" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2"/>
    <rect x="36" y="66" width="104" height="24" rx="12" fill="#94a3b8" opacity="0.4"/>
    {[40,60,80,100,120].map(x=><ellipse key={x} cx={x} cy="78" rx="7" ry="5" fill="#ef4444" opacity="0.35"/>)}
    <text x="88" y="82" fill="#475569" fontSize="8" textAnchor="middle" fontWeight="600">SCALE DEPOSITS</text>
    {[44,68,92,116,140].map((x,i)=><circle key={i} cx={x} cy="115" r="5" fill="#64748b" opacity="0.3"/>)}
    <text x="88" y="130" fill="#ef4444" fontSize="9" fontWeight="700" textAnchor="middle">⚠ Mineral Clusters</text>
    <text x="88" y="143" fill="#64748b" fontSize="8" textAnchor="middle">(bond to surfaces)</text>

    {/* ── DEVICE in centre ── */}
    {[48,62,76,90].map((r,i)=>(
      <circle key={i} cx="260" cy="150" r={r} fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity={0.08+i*0.04}
        strokeDasharray={i%2===0?"6,4":"4,6"}/>
    ))}
    <radialGradient id="ds-field-rad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18"/>
      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
    </radialGradient>
    <circle cx="260" cy="150" r="88" fill="url(#ds-field-rad)"/>

    <rect x="218" y="80" width="84" height="140" rx="18" fill="url(#ds-dev)" style={{ filter:"drop-shadow(0 8px 28px rgba(245,158,11,0.50))" }}/>
    <rect x="228" y="92" width="64" height="100" rx="12" fill="rgba(255,255,255,0.18)"/>
    {[0,1,2].map(i=>(
      <circle key={i} cx="244" cy={108+i*20} r="5" fill="#fff" opacity={0.9}>
        <animate attributeName="opacity" values={`${0.9-i*0.2};0.3;${0.9-i*0.2}`} dur={`${1.5+i*0.5}s`} repeatCount="indefinite"/>
      </circle>
    ))}
    <rect x="256" y="104" width="28" height="8" rx="4" fill="rgba(255,255,255,0.35)"/>
    <rect x="256" y="118" width="20" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>
    <rect x="256" y="132" width="24" height="8" rx="4" fill="rgba(255,255,255,0.30)"/>
    <text x="260" y="170" fill="#fff" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.06em">NANO</text>
    <text x="260" y="182" fill="#fff" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.06em">WATER</text>
    <text x="260" y="194" fill="rgba(255,255,255,0.75)" fontSize="7" textAnchor="middle">CONVERTER</text>
    <circle cx="260" cy="150" r="50" fill="none" stroke="#f59e0b" strokeWidth="2" style={{ filter:"url(#ds-glow)" }}>
      <animate attributeName="r" values="50;62;50" dur="2.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <text x="260" y="248" fill="#b45309" fontSize="9" fontWeight="700" textAnchor="middle">⚡ Electronic Field Active</text>

    {/* ── AFTER side ── */}
    <text x="432" y="32" fill="#22c55e" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="0.07em">AFTER</text>
    <text x="432" y="46" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Treated Water Out</text>

    <rect x="368" y="60" width="128" height="36" rx="18" fill="#dcfce7" stroke="#86efac" strokeWidth="2"/>
    <rect x="380" y="66" width="104" height="24" rx="12" fill="url(#ds-clean)" opacity="0.6"/>
    <text x="432" y="82" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="700">SCALE FREE ✓</text>
    {[390,410,430,450,470].map((x,i)=><circle key={i} cx={x} cy="115" r="5" fill="#22c55e" opacity="0.5"/>)}
    <text x="432" y="130" fill="#22c55e" fontSize="9" fontWeight="700" textAnchor="middle">✓ Modified Minerals</text>
    <text x="432" y="143" fill="#64748b" fontSize="8" textAnchor="middle">(pass through freely)</text>

    <line x1="152" y1="78" x2="212" y2="100" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ds-arr)"/>
    <line x1="308" y1="100" x2="368" y2="78" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ds-arr-g)"/>

    {[
      {x:60,  color:"#ef4444", icon:"✗", label:"No Chemicals"},
      {x:180, color:"#22c55e", icon:"✓", label:"Scale Prevention"},
      {x:300, color:"#3b82f6", icon:"⚡", label:"Energy Savings"},
      {x:420, color:"#f59e0b", icon:"∞", label:"Maintenance Free"},
    ].map(p=>(
      <g key={p.label}>
        <rect x={p.x-50} y="300" width="100" height="30" rx="15" fill="#fff" stroke={`${p.color}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
        <text x={p.x} y="319" fill={p.color} fontSize="9.5" fontWeight="700" textAnchor="middle">{p.icon} {p.label}</text>
      </g>
    ))}

    <rect x="24"  y="342" width="214" height="40" rx="12" fill="#fef2f2" stroke="rgba(239,68,68,0.25)" strokeWidth="1.5"/>
    <rect x="282" y="342" width="214" height="40" rx="12" fill="#f0fdf4" stroke="rgba(34,197,94,0.25)" strokeWidth="1.5"/>
    <text x="131" y="357" fill="#ef4444" fontSize="9" fontWeight="800" textAnchor="middle">⚠  Hard Scale · Energy Loss</text>
    <text x="131" y="371" fill="#ef4444" fontSize="8.5" textAnchor="middle">Equipment Damage · High Maintenance</text>
    <text x="389" y="357" fill="#22c55e" fontSize="9" fontWeight="800" textAnchor="middle">✓  Scale-Free · Energy Efficient</text>
    <text x="389" y="371" fill="#22c55e" fontSize="8.5" textAnchor="middle">Equipment Protected · Zero Maintenance</text>
    <text x="260" y="365" fill="#b45309" fontSize="11" fontWeight="900" textAnchor="middle">→</text>
  </svg>
);

/* 2 ── How it works — 4-step flow */
const HowItWorksSVG = () => (
  <svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
    <defs>
      <linearGradient id="hw-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      <linearGradient id="hw-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
      <marker id="hw-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/></marker>
    </defs>
    <rect width="760" height="220" rx="16" fill="url(#hw-bg)"/>
    <text x="380" y="28" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">How the Nano Water Converter Works</text>
    {[
      {x:82,  emoji:"⚡",  step:"01", title:"Electronic Field\nGenerated",    color:"#f59e0b"},
      {x:262, emoji:"⚛️", step:"02", title:"Crystal Structure\nModified",    color:"#ea580c"},
      {x:442, emoji:"🌊",  step:"03", title:"Scale Prevented\n& Removed",    color:"#f97316"},
      {x:622, emoji:"🛡",  step:"04", title:"Continuous\n24×7 Protection",   color:"#22c55e"},
    ].map((s,i,arr)=>(
      <g key={s.step}>
        <circle cx={s.x} cy="110" r="48" fill="#fff" stroke={`${s.color}33`} strokeWidth="2" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.08))" }}/>
        <circle cx={s.x} cy="110" r="36" fill={s.color} opacity="0.10"/>
        <text x={s.x} y="96" fontSize="24" textAnchor="middle">{s.emoji}</text>
        <text x={s.x} y="114" fill={s.color} fontSize="10" fontWeight="900" textAnchor="middle">STEP {s.step}</text>
        {s.title.split("\n").map((l,j)=><text key={j} x={s.x} y={145+j*15} fill="#334155" fontSize="11" fontWeight="700" textAnchor="middle">{l}</text>)}
        <text x={s.x+28} y="88" fill={s.color} fontSize="28" fontWeight="900" opacity="0.12" textAnchor="middle">{s.step}</text>
        {i < arr.length-1 && <line x1={s.x+50} y1="110" x2={s.x+128} y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#hw-arr)"/>}
      </g>
    ))}
  </svg>
);

/* 3 ── Applications radial */
const ApplicationsSVG = () => (
  <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
    <defs>
      <linearGradient id="ap-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9"/><stop offset="100%" stopColor="#f0f9ff"/></linearGradient>
      <linearGradient id="ap-hub" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
    </defs>
    <rect width="760" height="300" rx="16" fill="url(#ap-bg)"/>
    <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">Where the Nano Water Converter is Applied</text>
    <circle cx="380" cy="158" r="48" fill="url(#ap-hub)" style={{ filter:"drop-shadow(0 6px 22px rgba(245,158,11,0.42))" }}/>
    <text x="380" y="150" fill="#fff" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">NANO WATER</text>
    <text x="380" y="163" fill="#fff" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">CONVERTER</text>
    <text x="380" y="176" fill="rgba(255,255,255,0.75)" fontSize="7.5" textAnchor="middle">All water systems</text>
    <circle cx="380" cy="158" r="105" fill="none" stroke="rgba(245,158,11,0.12)" strokeWidth="1.5" strokeDasharray="6,4"/>
    {[
      {a:-Math.PI/2,       emoji:"🏭", label:"Cooling Towers &\nHeat Exchangers"},
      {a:-Math.PI/2+Math.PI/3, emoji:"⚡",  label:"Boilers &\nChillers"},
      {a:-Math.PI/2+2*Math.PI/3,emoji:"💧", label:"RO & Water\nTreatment Plants"},
      {a:-Math.PI/2+Math.PI,   emoji:"❄️",  label:"HVAC\nSystems"},
      {a:-Math.PI/2+4*Math.PI/3,emoji:"🌊", label:"Process\nWater Lines"},
      {a:-Math.PI/2+5*Math.PI/3,emoji:"🏗", label:"Industrial\nUtilities"},
    ].map((n,i)=>{
      const nx = 380+105*Math.cos(n.a), ny = 158+105*Math.sin(n.a);
      return (
        <g key={i}>
          <line x1={380+50*Math.cos(n.a)} y1={158+50*Math.sin(n.a)} x2={nx-26*Math.cos(n.a)} y2={ny-26*Math.sin(n.a)} stroke="rgba(245,158,11,0.22)" strokeWidth="1.5"/>
          <circle cx={nx} cy={ny} r="24" fill="#fff" stroke="rgba(245,158,11,0.28)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }}/>
          <text x={nx} y={ny+2} fontSize="14" textAnchor="middle" dominantBaseline="middle">{n.emoji}</text>
          {n.label.split("\n").map((l,j)=>{
            const offset = Math.abs(Math.cos(n.a)) < 0.3 ? (Math.sin(n.a) > 0 ? 42 : -36) : (Math.cos(n.a) > 0 ? 42 : -42);
            const textX  = Math.abs(Math.cos(n.a)) < 0.3 ? nx : nx + offset;
            const textY  = Math.abs(Math.cos(n.a)) < 0.3 ? ny + Math.sign(Math.sin(n.a))*(36+j*14) : ny + (j-0.5)*13;
            return <text key={j} x={textX} y={textY} fill="#334155" fontSize="9" fontWeight="700" textAnchor={Math.abs(Math.cos(n.a)) < 0.3 ? "middle" : (Math.cos(n.a) > 0 ? "start" : "end")}>{l}</text>;
          })}
        </g>
      );
    })}
  </svg>
);

/* 4 ── Before / After energy impact */
const ImpactSVG = () => (
  <svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
    <defs>
      <linearGradient id="im-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9"/><stop offset="100%" stopColor="#fffbeb"/></linearGradient>
    </defs>
    <rect width="760" height="240" rx="16" fill="url(#im-bg)"/>
    <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">The Cost of Scaling vs The Nano Water Converter Solution</text>

    <rect x="24" y="44" width="336" height="176" rx="14" fill="#fff" stroke="rgba(239,68,68,0.20)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.06))" }}/>
    <rect x="24" y="44" width="336" height="32" rx="14" fill="#ef4444" opacity="0.10"/>
    <rect x="24" y="60" width="336" height="16" fill="#ef4444" opacity="0.10"/>
    <text x="192" y="64" fill="#ef4444" fontSize="11" fontWeight="900" textAnchor="middle">⚠  WITHOUT Nano Water Converter</text>
    {[
      "Scale insulates pipes — up to 30% energy wasted",
      "Equipment failures due to overheating",
      "Regular chemical descaling shutdowns",
      "Chemical procurement, handling & disposal cost",
      "Reduced equipment life & high maintenance cost",
    ].map((t,i)=>(
      <g key={t}>
        <circle cx="44" cy={92+i*26} r="5" fill="#ef4444" opacity="0.7"/>
        <text x="56" y={97+i*26} fill="#475569" fontSize="11">{t}</text>
      </g>
    ))}

    <rect x="368" y="114" width="24" height="24" rx="12" fill="#f59e0b" style={{ filter:"drop-shadow(0 2px 8px rgba(245,158,11,0.40))" }}/>
    <text x="380" y="130" fill="#fff" fontSize="12" fontWeight="900" textAnchor="middle">→</text>

    <rect x="400" y="44" width="336" height="176" rx="14" fill="#fff" stroke="rgba(34,197,94,0.22)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.06))" }}/>
    <rect x="400" y="44" width="336" height="32" rx="14" fill="#22c55e" opacity="0.10"/>
    <rect x="400" y="60" width="336" height="16" fill="#22c55e" opacity="0.10"/>
    <text x="568" y="64" fill="#22c55e" fontSize="11" fontWeight="900" textAnchor="middle">✓  WITH Nano Water Converter</text>
    {[
      "Scale-free surfaces — full thermal efficiency restored",
      "No overheating — equipment runs at design conditions",
      "Zero descaling shutdowns — continuous operation",
      "Zero chemicals — one-time installation, no ongoing cost",
      "Extended equipment life — 100% environment friendly",
    ].map((t,i)=>(
      <g key={t}>
        <circle cx="420" cy={92+i*26} r="5" fill="#22c55e" opacity="0.8"/>
        <text x="432" y={97+i*26} fill="#334155" fontSize="11" fontWeight="500">{t}</text>
      </g>
    ))}
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const applications = [
  { icon: <Thermometer size={18} />, title: "Cooling Towers & Heat Exchangers", desc: "Prevents scale build-up on heat transfer surfaces, maintaining thermal efficiency and reducing energy consumption." },
  { icon: <Zap size={18} />,         title: "Boilers & Chillers",               desc: "Keeps boiler tubes and chiller coils scale-free, protecting equipment from overheating and premature failure." },
  { icon: <Droplets size={18} />,    title: "RO & Water Treatment Plants",      desc: "Protects reverse osmosis membranes and treatment plant components from scaling and fouling." },
  { icon: <Wind size={18} />,        title: "HVAC Systems",                     desc: "Maintains peak HVAC performance by eliminating scale deposits in chilled and condenser water circuits." },
  { icon: <Waves size={18} />,       title: "Process Water Lines",              desc: "Ensures unobstructed flow and optimal heat transfer in all process water piping and equipment." },
  { icon: <Factory size={18} />,     title: "Industrial Utilities",             desc: "Applicable across all industrial sectors wherever hard water causes scaling problems in equipment or pipelines." },
];

const benefits = [
  "100% Environment Friendly — no chemicals, no salt",
  "FIT & FORGET — Maintenance Free Technology",
  "Lifetime efficient for scale-free applications",
  "Prevents scale deposition and removes existing scales",
  "Reduces Power Consumption by ensuring free flow",
  "Ensures effective Heat Transfer in Heat Exchangers",
  "Hassle-free installation — no pipe cutting required",
  "Reduces system downtime for maintenance",
  "Applicable in all types of industrial facilities",
];

const howItWorks = [
  { icon: <Zap size={20} />,      title: "Electronic Field Generation",   desc: "The Nano Water Converter generates a precisely controlled electronic field around the pipe using its electronic control panel — no chemicals added to the water." },
  { icon: <Droplets size={20} />, title: "Crystal Structure Modification", desc: "The electronic field alters the crystalline structure of dissolved minerals, preventing them from bonding to pipe walls and equipment surfaces as hard scale." },
  { icon: <Waves size={20} />,    title: "Scale Prevention & Removal",    desc: "New scale formation is blocked and existing scale deposits are progressively softened and removed — carried away safely in the water flow." },
  { icon: <Shield size={20} />,   title: "Continuous Protection",         desc: "The device operates continuously with zero maintenance — protecting all downstream equipment around the clock for the lifetime of the installation." },
];

const heroStats = [
  { num:"0",    label:"Chemicals used"          },
  { num:"100%", label:"Environment friendly"    },
  { num:"FIT",  label:"& Forget — maintenance free" },
  { num:"24/7", label:"Continuous protection"   },
];

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  .nw-page { font-family:'Roboto',sans-serif; color:#1e293b; }
  .nw-page * { box-sizing:border-box; }

  /* ── fade up ── */
  .fu { opacity:0; transform:translateY(22px); transition:opacity 0.55s ease,transform 0.55s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }

  /* ── Hero ── */
  .nw-hero { position:relative; overflow:hidden; min-height:100svh; display:flex; align-items:center; }
  .nw-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
  .nw-hero-wash  { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,0.90) 0%,rgba(224,242,254,0.82) 55%,rgba(255,251,235,0.90) 100%); }
  .nw-hero-dots  { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .nw-hero-burst { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,0.26) 0%,rgba(251,191,36,0.09) 40%,transparent 70%); top:-15%; left:-8%; }
  .nw-hero-sky   { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.20) 0%,rgba(56,189,248,0.06) 45%,transparent 70%); bottom:-15%; right:-5%; }

  /* ── Hero inner grid ── */
  .nw-hero-inner {
    position:relative;
    max-width:1280px;
    margin:0 auto;
    padding:72px 20px 64px;
    width:100%;
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:48px;
    align-items:center;
  }
  @media(max-width:900px){
    .nw-hero-inner {
      grid-template-columns:1fr;
      gap:32px;
      padding:56px 16px 48px;
    }
  }

  /* ── Flicker animation ── */
  @keyframes nw-fadein { 0%{opacity:0;transform:translateY(6px);letter-spacing:.13em} 60%{opacity:.85} 100%{opacity:1;transform:translateY(0);letter-spacing:.04em} }
  @keyframes nw-flicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1;text-shadow:0 0 8px rgba(245,158,11,.85),0 0 20px rgba(234,88,12,.5)} 20%,24%,55%{opacity:.35;text-shadow:none} }
  .nw-flicker { opacity:0; animation:nw-fadein 1.4s cubic-bezier(.22,1,.36,1) .3s forwards, nw-flicker 4s ease-in-out 2s infinite; font-size:clamp(12px,1.1vw,15px); font-weight:600; background:linear-gradient(90deg,#f59e0b,#ea580c); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:block; margin-top:10px; margin-bottom:18px; }

  /* ── Breadcrumb ── */
  .nw-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
  .nw-bread a { font-size:12px; color:#64748b; text-decoration:none; transition:color .15s; }
  .nw-bread a:hover { color:#f59e0b; }

  /* ── Badges ── */
  .nw-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:18px; }
  .nw-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }

  /* ── Stat chips ── */
  .nw-stats-grid {
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    gap:10px;
    margin-bottom:28px;
  }
  @media(min-width:540px){
    .nw-stats-grid { grid-template-columns:repeat(4,1fr); }
  }
  .nw-stat { background:rgba(255,255,255,0.82); border:1px solid rgba(245,158,11,0.28); border-radius:14px; padding:12px 14px; backdrop-filter:blur(10px); box-shadow:0 2px 12px rgba(0,0,0,0.06); }
  .nw-stat-num { font-size:20px; font-weight:900; color:#ea580c; line-height:1; }
  .nw-stat-label { font-size:10px; color:#64748b; font-weight:500; margin-top:3px; }

  /* ── Buttons ── */
  .nw-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:14px; font-weight:700; padding:13px 24px; border-radius:12px; text-decoration:none; transition:transform .15s,box-shadow .2s; box-shadow:0 4px 20px rgba(245,158,11,0.38); white-space:nowrap; }
  .nw-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.52); }
  .nw-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:14px; font-weight:500; padding:13px 24px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,0.25); transition:border-color .2s,background .2s; white-space:nowrap; }
  .nw-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  /* ── Hero CTA buttons row ── */
  .nw-hero-btns {
    display:flex;
    gap:12px;
    flex-wrap:wrap;
  }

  /* ── SVG card frame ── */
  .nw-svg-card { border-radius:20px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.09),0 2px 8px rgba(0,0,0,0.05); border:1px solid rgba(245,158,11,0.14); transition:transform .3s,box-shadow .3s; }
  .nw-svg-card:hover { transform:translateY(-5px) scale(1.005); box-shadow:0 20px 56px rgba(0,0,0,0.14); }
  .nw-svg-label { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.10); border:1px solid rgba(245,158,11,0.25); color:#b45309; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; padding:5px 12px; border-radius:999px; margin-bottom:10px; }

  /* ── Two col layout ── */
  .nw-two-col {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:56px;
    align-items:start;
  }
  @media(max-width:900px){
    .nw-two-col {
      grid-template-columns:1fr;
      gap:36px;
    }
  }

  /* ── App card ── */
  .nw-app-card { background:#fff; border:1px solid #eef0f4; border-radius:14px; padding:16px 18px; display:flex; align-items:flex-start; gap:14px; transition:box-shadow .2s,border-color .2s,transform .2s; }
  .nw-app-card:hover { box-shadow:0 8px 28px rgba(0,0,0,0.08); border-color:rgba(245,158,11,0.28); transform:translateY(-3px); }
  .nw-app-icon { width:40px; height:40px; border-radius:10px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; flex-shrink:0; }

  /* ── Step card ── */
  .nw-step { background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:24px 20px; overflow:hidden; position:relative; transition:box-shadow .22s,border-color .22s,transform .22s; }
  .nw-step::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,#ea580c); opacity:0; transition:opacity .22s; }
  .nw-step:hover { box-shadow:0 10px 36px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.35); transform:translateY(-4px); }
  .nw-step:hover::before { opacity:1; }
  .nw-step-num { font-size:44px; font-weight:900; color:rgba(245,158,11,0.10); line-height:1; position:absolute; top:14px; right:16px; user-select:none; }
  .nw-step-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:16px; }

  /* ── Steps grid — FIX 1: centred & max-width constrained ── */
  .nw-steps-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
    gap:18px;
    max-width:960px;
    margin:0 auto;
    justify-items:stretch;
  }

  /* ── Benefit item ── */
  .nw-benefit { display:flex; gap:10px; align-items:flex-start; padding:12px 16px; background:#fff; border:1px solid #eef0f4; border-radius:12px; margin-bottom:10px; transition:border-color .2s,box-shadow .2s; }
  .nw-benefit:hover { border-color:rgba(245,158,11,0.28); box-shadow:0 4px 14px rgba(0,0,0,0.06); }

  /* ── Device image card ── */
  .nw-device-card { background:#fff; border-radius:24px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.12); border:1px solid #eef0f4; transition:transform .3s,box-shadow .3s; }
  .nw-device-card:hover { transform:translateY(-6px) scale(1.01); box-shadow:0 28px 72px rgba(0,0,0,0.16); }

  /* ── Highlight ── */
  .nw-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:16px; padding:24px 28px; color:#fff; box-shadow:0 8px 28px rgba(245,158,11,0.30); position:relative; overflow:hidden; }
  .nw-highlight::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 0%,rgba(255,255,255,0.18) 0%,transparent 60%); pointer-events:none; }

  /* ── CTA ── */
  .nw-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .nw-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }

  /* ── Pulse dot ── */
  @keyframes nw-pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.5);opacity:0.6;} }
  .nw-pulse-dot { width:10px; height:10px; border-radius:50%; background:#22c55e; animation:nw-pulse 2s infinite; display:inline-block; }

  /* ── Status strip on control panel ── */
  .nw-status-strip {
    margin-top:16px;
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:8px;
  }
  @media(min-width:540px){
    .nw-status-strip { grid-template-columns:repeat(4,1fr); }
  }
  .nw-status-chip {
    display:flex;
    align-items:center;
    gap:6px;
    background:#fff;
    border:1px solid rgba(245,158,11,0.22);
    border-radius:10px;
    padding:8px 10px;
    font-size:12px;
    font-weight:600;
    color:#334155;
  }

  /* ── Section padding ── */
  .nw-section { padding:64px 20px; }
  @media(max-width:640px){ .nw-section { padding:48px 16px; } }

  /* ── Impact cards container ── */
  .nw-impact-list { display:flex; flex-direction:column; gap:14px; }
  .nw-impact-card {
    background:#fff;
    border:1px solid #eef0f4;
    border-radius:14px;
    padding:18px;
    display:flex;
    gap:14px;
    align-items:flex-start;
    box-shadow:0 2px 8px rgba(0,0,0,0.04);
    transition:box-shadow 0.2s,transform 0.2s;
  }
  .nw-impact-card:hover { box-shadow:0 8px 24px rgba(0,0,0,0.08); transform:translateY(-2px); }
  .nw-impact-icon {
    width:42px;
    height:42px;
    border-radius:10px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-shrink:0;
  }

  /* ── App cards grid ── */
  .nw-app-grid {
    display:grid;
    grid-template-columns:1fr;
    gap:14px;
  }
  @media(min-width:480px){
    .nw-app-grid { grid-template-columns:1fr 1fr; }
  }
  @media(min-width:900px){
    .nw-app-grid { grid-template-columns:1fr; }
  }

  /* ── Section inner wrapper ── */
  .nw-inner { max-width:1280px; margin:0 auto; }

  /* ── h1 mobile ── */
  @media(max-width:480px){
    .nw-hero-btns { flex-direction:column; align-items:flex-start; }
  }
`;

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const NanoWaterConverterDevice = () => {
  const refOverview  = useFU(0);
  const refSchematic = useFU(100);
  const refAppHead   = useFU(0);
  const refAppSvg    = useFU(100);
  const refBenHead   = useFU(0);
  const refHowHead   = useFU(0);
  const refHowSvg    = useFU(100);
  const refImpact    = useFU(0);
  const refPanel     = useFU(100);
  const appRefs      = applications.map((_,i) => useFU(i*70));
  const stepRefs     = howItWorks.map((_,i) => useFU(i*90));
  const benRefs      = benefits.map((_,i) => useFU(i*50));
  const impRefs      = [useFU(0),useFU(80),useFU(160),useFU(240)];

  return (
    <div className="nw-page">
      <style>{css}</style>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="nw-hero">
        <img src={heroBg} alt="" className="nw-hero-photo" aria-hidden="true"/>
        <div className="nw-hero-wash"/><div className="nw-hero-dots"/>
        <div className="nw-hero-burst"/><div className="nw-hero-sky"/>

        <div className="nw-hero-inner">

          {/* LEFT */}
          <div>
            <div className="nw-bread">
              <Link to="/">Home</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
              <Link to="/products">Products</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
              <span style={{ fontSize:12, color:"#334155", fontWeight:500 }}>Nano Water Converter</span>
            </div>

            <div className="nw-badge"><Droplets size={11}/> Chemical-Less Anti-Scaling Technology</div>

            <h1 style={{ fontSize:"clamp(26px,5vw,54px)", fontWeight:900, color:"#1e293b", lineHeight:1.05, marginBottom:0 }}>
              Nano Water{" "}
              <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Converter Device
              </span>
            </h1>

            <span className="nw-flicker">⚡ Scale-Free Water Systems — Without a Single Chemical</span>

            <p style={{ fontSize:"clamp(14px,1.3vw,16px)", color:"#475569", lineHeight:1.8, marginBottom:12, maxWidth:500 }}>
              An advanced, environmentally friendly solution designed to{" "}
              <strong style={{ color:"#1e293b" }}>prevent and remove scale formation</strong> in industrial water systems — without the use of chemicals or salt.
            </p>
            <p style={{ fontSize:"clamp(14px,1.3vw,16px)", color:"#475569", lineHeight:1.8, marginBottom:24, maxWidth:500 }}>
              <strong style={{ color:"#1e293b" }}>FIT &amp; FORGET technology</strong> — installed once, operating 24/7 for the lifetime of your system. No maintenance. No chemicals. No ongoing cost.
            </p>

            <div className="nw-stats-grid">
              {heroStats.map(s=>(
                <div key={s.label} className="nw-stat">
                  <div className="nw-stat-num">{s.num}</div>
                  <div className="nw-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="nw-hero-btns">
              <Link to="/contact" className="nw-btn-primary">Request a Consultation <ArrowRight size={16}/></Link>
            </div>
          </div>

          {/* RIGHT — device photo */}
          <div>
            <div className="nw-svg-label"><Droplets size={11}/> Nano Water Converter — Anti-Scaling System</div>
            <div className="nw-device-card" style={{ background:"linear-gradient(135deg,#fffbeb,#fef3c7)", display:"flex", alignItems:"center", justifyContent:"center", minHeight:300, padding:20 }}>
              <ImgWithFallback
                src={deviceImg}
                alt="Nano Water Converter Device"
                style={{ maxHeight:360, maxWidth:"100%", objectFit:"contain", filter:"drop-shadow(0 16px 40px rgba(0,0,0,0.20))", transition:"transform 0.4s", display:"block" }}
                fallbackHeight={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ SCHEMATIC ════════════════════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)" }} className="nw-section">
        <div className="nw-inner">
          <div ref={refSchematic} className="fu">
            <div className="nw-svg-label"><Zap size={11}/> How It Works — Before &amp; After Comparison</div>
            <div className="nw-svg-card"><DeviceSchematicSVG/></div>
          </div>
        </div>
      </section>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)" }} className="nw-section">
        <div className="nw-inner nw-two-col">
          <div ref={refOverview} className="fu">
            <div className="nw-section-badge"><Zap size={11}/> About the Device</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:700, color:"#0f1117", lineHeight:1.2, marginBottom:20 }}>
              Scale-Free Water Systems.<br/>Without a Single Chemical.
            </h2>
            <p style={{ fontSize:15, color:"#64748b", lineHeight:1.8, marginBottom:16 }}>
              The <strong style={{ color:"#1e293b" }}>Nano Water Converter</strong> uses advanced electronic field technology to modify the crystalline structure of dissolved minerals in water — preventing them from adhering to pipe walls and equipment surfaces as hard scale.
            </p>
            <p style={{ fontSize:15, color:"#64748b", lineHeight:1.8, marginBottom:16 }}>
              Unlike chemical dosing systems that require ongoing purchases, maintenance and disposal, the Nano Water Converter is a <strong style={{ color:"#1e293b" }}>FIT &amp; FORGET device</strong> — installed once and operating continuously for the life of the system.
            </p>
            <p style={{ fontSize:15, color:"#64748b", lineHeight:1.8, marginBottom:28 }}>
              Existing scale deposits are progressively softened and removed over time — restoring heat transfer efficiency, reducing energy consumption and extending the working life of all downstream equipment.
            </p>
            <div className="nw-highlight">
              <div style={{ position:"relative", zIndex:1 }}>
                <p style={{ fontSize:14, fontWeight:700, opacity:0.9, marginBottom:8 }}>Chemical-Less. Maintenance-Free. Lifetime Performance.</p>
                <p style={{ fontSize:14, lineHeight:1.7 }}>One installation protects your entire water system — <strong>no chemicals, no salt, no ongoing cost</strong>. Delivers scale prevention for the full operational life of your plant.</p>
              </div>
            </div>
          </div>

          {/* Control panel image */}
          <div ref={refPanel} className="fu">
            <div className="nw-svg-label"><Zap size={11}/> Electronic Control Panel</div>
            <div style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.10)", border:"1px solid #eef0f4" }}>
              <ImgWithFallback
                src={controlPanelImg}
                alt="Nano Water Converter Electronic Control Panel"
                style={{ width:"100%", height:300, objectFit:"cover", display:"block" }}
                fallbackHeight={300}
              />
            </div>
            <div className="nw-status-strip">
              {[{icon:"💧",l:"Zero Chemicals"},{icon:"🔋",l:"Low Power"},{icon:"🛠",l:"No Maintenance"},{icon:"∞",l:"Lifetime Use"}].map(t=>(
                <div key={t.l} className="nw-status-chip">
                  <span>{t.icon}</span>{t.l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)" }} className="nw-section">
        <div className="nw-inner">
          <div ref={refHowHead} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
            <div className="nw-section-badge" style={{ margin:"0 auto 12px" }}><Zap size={11}/> Technology</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:700, color:"#0f1117", marginBottom:12 }}>How the Nano Water Converter Works</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>A four-stage electronic process that eliminates scale formation without any chemicals or ongoing intervention.</p>
          </div>

          {/* ── FIX 1: Step cards grid is now centred via .nw-steps-grid (max-width:960px + margin:0 auto) ── */}
          <div className="nw-steps-grid">
            {howItWorks.map((step, i) => (
              <div ref={stepRefs[i]} key={step.title} className="nw-step fu">
                <div className="nw-step-num">0{i+1}</div>
                <div className="nw-step-icon">{step.icon}</div>
                <h3 style={{ fontSize:16, fontWeight:700, color:"#0f1117", marginBottom:10 }}>{step.title}</h3>
                <p style={{ fontSize:13.5, color:"#64748b", lineHeight:1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ BENEFITS ════════════════════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)" }} className="nw-section">
        <div className="nw-inner nw-two-col">
          <div ref={refBenHead} className="fu">
            <div className="nw-section-badge"><CheckCircle2 size={11}/> Key Benefits</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:700, color:"#0f1117", lineHeight:1.2, marginBottom:24 }}>Benefits of the Nano Water Converter Device</h2>
            {benefits.map((b, i) => (
              <div ref={benRefs[i]} key={b} className="nw-benefit fu">
                <CheckCircle2 size={15} style={{ color:"#f59e0b", flexShrink:0, marginTop:2 }}/>
                <span style={{ fontSize:14, color:"#334155", lineHeight:1.65 }}>{b}</span>
              </div>
            ))}
          </div>

          {/* ── FIX 2: Impact cards column shifted down 148px so green card
                       aligns with the first benefit checkmark row ── */}
          <div className="nw-impact-list" style={{ paddingTop: 148 }}>
            {[
              { icon:<TrendingDown size={20}/>, title:"Reduced Energy Consumption",  desc:"Scale on heat exchanger surfaces acts as an insulator. Removing it can reduce energy consumption by 15–30% in affected systems.", color:"#22c55e" },
              { icon:<Shield size={20}/>,       title:"Extended Equipment Life",      desc:"Scale-free operation dramatically reduces mechanical stress, corrosion and overheating — extending equipment operational life.", color:"#3b82f6" },
              { icon:<Activity size={20}/>,     title:"Zero Downtime for Descaling",  desc:"Eliminates the need for scheduled chemical descaling shutdowns — keeping your plant running continuously.", color:"#f59e0b" },
              { icon:<Droplets size={20}/>,     title:"No Chemical Procurement",      desc:"Removes the cost, logistics and safety risks associated with chemical water treatment programmes entirely.", color:"#ea580c" },
            ].map((item, i) => (
              <div
                key={item.title}
                ref={impRefs[i]}
                className="nw-impact-card fu"
                style={{ borderLeft:`4px solid ${item.color}` }}
              >
                <div className="nw-impact-icon" style={{ background:`${item.color}18`, color:item.color }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:5 }}>{item.title}</h4>
                  <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default NanoWaterConverterDevice;