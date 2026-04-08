// /* eslint-disable react-hooks/rules-of-hooks */
// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight, Zap, CheckCircle2, ChevronRight,
//   Thermometer, Bell, Activity, Monitor,
//   Factory, Flame, Building2, TrendingDown, Shield,
// } from "lucide-react";
// import heroBg      from "@/assets/hero-bg.jpg";
// import dashboardImg from "@/assets/products/thermal2.jpg";
// import installImg   from "@/assets/products/thermal3.png";
// import appImg1      from "@/assets/products/thermal4.jpg";
// import appImg2      from "@/assets/products/thermal6.jpg";
// import appImg3      from "@/assets/products/thermal7.jpg";


// /* ─── useFU ─── */
// const useFU = (delay = 0) => {
//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) { setTimeout(() => el.classList.add("vis"), delay); obs.disconnect(); }
//     }, { threshold: 0.08 });
//     obs.observe(el); return () => obs.disconnect();
//   }, [delay]);
//   return ref;
// };

// const ImgFallback = ({
//   src, alt, style = {}, height = 200, bg = "#fff7ed",
//   icon = <Thermometer size={28} color="#f59e0b" />,
// }: {
//   src: string; alt: string; style?: React.CSSProperties;
//   height?: number; bg?: string; icon?: React.ReactNode;
// }) => {
//   const [failed, setFailed] = useState(false);
//   if (failed) return (
//     <div style={{ height, background:bg, display:"flex", alignItems:"center", justifyContent:"center", ...style }}>{icon}</div>
//   );
//   return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
// };

// /* ═══════════════════════════════════════
//    SVG ILLUSTRATIONS
// ═══════════════════════════════════════ */
// const BasicHandheldSVG = () => (
//   <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block" }}>
//     <defs>
//       <linearGradient id="bh-bg"     x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
//       <linearGradient id="bh-body"   x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#334155"/><stop offset="100%" stopColor="#1e293b"/></linearGradient>
//       <linearGradient id="bh-screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0f172a"/><stop offset="100%" stopColor="#1e293b"/></linearGradient>
//     </defs>
//     <rect width="400" height="320" rx="20" fill="url(#bh-bg)"/>
//     <rect x="130" y="40" width="140" height="210" rx="18" fill="url(#bh-body)" style={{ filter:"drop-shadow(0 12px 32px rgba(0,0,0,0.35))" }}/>
//     <rect x="142" y="52" width="116" height="86" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
//     <rect x="144" y="54" width="112" height="82" rx="6" fill="url(#bh-screen)"/>
//     <ellipse cx="188" cy="82" rx="28" ry="22" fill="#ef4444" opacity="0.75"/>
//     <ellipse cx="188" cy="82" rx="18" ry="14" fill="#f97316" opacity="0.8"/>
//     <ellipse cx="188" cy="82" rx="10" ry="8"  fill="#fbbf24" opacity="0.9"/>
//     <ellipse cx="220" cy="95" rx="18" ry="14" fill="#22c55e" opacity="0.45"/>
//     <ellipse cx="245" cy="75" rx="12" ry="10" fill="#3b82f6" opacity="0.4"/>
//     <rect x="148" y="116" width="68" height="14" rx="3" fill="rgba(245,158,11,0.20)"/>
//     <text x="152" y="127" fill="#fbbf24" fontSize="9" fontWeight="700">247.3 °C  ALERT</text>
//     <line x1="185" y1="74" x2="185" y2="90" stroke="#fff" strokeWidth="1" opacity="0.7"/>
//     <line x1="178" y1="82" x2="194" y2="82" stroke="#fff" strokeWidth="1" opacity="0.7"/>
//     <circle cx="185" cy="82" r="4" fill="none" stroke="#fff" strokeWidth="1" opacity="0.7"/>
//     <circle cx="200" cy="158" r="20" fill="#0a1628" stroke="#475569" strokeWidth="2"/>
//     <circle cx="200" cy="158" r="14" fill="#060e1a" stroke="#334155" strokeWidth="1"/>
//     <circle cx="200" cy="158" r="8"  fill="#0ea5e9" opacity="0.3"/>
//     <circle cx="196" cy="154" r="3"  fill="rgba(255,255,255,0.4)"/>
//     <rect x="155" y="185" width="90" height="50" rx="10" fill="#2d3f57"/>
//     {[0,1,2,3,4].map(i=><line key={i} x1="160" y1={193+i*8} x2="240" y2={193+i*8} stroke="#475569" strokeWidth="1"/>)}
//     <rect x="138" y="205" width="20" height="32" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
//     <rect x="268" y="90" width="6" height="20" rx="3" fill="#475569"/>
//     <rect x="268" y="116" width="6" height="14" rx="3" fill="#475569"/>
//     <rect x="183" y="244" width="34" height="6" rx="3" fill="#475569"/>
//     {[
//       {x:16,  y:60,  val:"< 0.1°C",   label:"Sensitivity", c:"#f59e0b"},
//       {x:16,  y:140, val:"160×120",   label:"Resolution",  c:"#3b82f6"},
//       {x:280, y:60,  val:"-20–650°C", label:"Range",       c:"#ef4444"},
//       {x:280, y:140, val:"Non-Contact",label:"Method",     c:"#22c55e"},
//     ].map(b=>(
//       <g key={b.label}>
//         <rect x={b.x} y={b.y} width="96" height="48" rx="12" fill="#fff" stroke={`${b.c}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
//         <text x={b.x+48} y={b.y+20} fill={b.c} fontSize="11" fontWeight="900" textAnchor="middle">{b.val}</text>
//         <text x={b.x+48} y={b.y+36} fill="#64748b" fontSize="8.5" textAnchor="middle">{b.label}</text>
//       </g>
//     ))}
//     <rect x="100" y="276" width="200" height="28" rx="14" fill="url(#bh-body)"/>
//     <text x="200" y="294" fill="#fbbf24" fontSize="10" fontWeight="700" textAnchor="middle">BASIC HANDHELD IR THERMOGRAPHY</text>
//   </svg>
// );

// const AdvancedHandheldSVG = () => (
//   <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block" }}>
//     <defs>
//       <linearGradient id="ah-bg"     x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f0f9ff"/><stop offset="100%" stopColor="#fffbeb"/></linearGradient>
//       <linearGradient id="ah-body"   x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e293b"/><stop offset="100%" stopColor="#0f172a"/></linearGradient>
//       <linearGradient id="ah-accent" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
//       <linearGradient id="ah-scale"  x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3b82f6"/><stop offset="50%" stopColor="#22c55e"/><stop offset="75%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ef4444"/></linearGradient>
//     </defs>
//     <rect width="400" height="320" rx="20" fill="url(#ah-bg)"/>
//     <rect x="100" y="30" width="200" height="230" rx="20" fill="url(#ah-body)" style={{ filter:"drop-shadow(0 16px 40px rgba(0,0,0,0.40))" }}/>
//     <rect x="100" y="30" width="200" height="8" rx="20" fill="url(#ah-accent)"/>
//     <rect x="100" y="34" width="200" height="4" fill="url(#ah-accent)"/>
//     <rect x="112" y="46" width="176" height="128" rx="10" fill="#060e1a" stroke="rgba(245,158,11,0.30)" strokeWidth="1.5"/>
//     <rect x="114" y="48" width="172" height="124" rx="8" fill="#030a12"/>
//     {[[86,88,50,44,"#ef4444",0.9],[146,100,38,30,"#f97316",0.75],[180,78,32,26,"#f59e0b",0.7],[114,110,30,24,"#22c55e",0.5],[200,110,26,20,"#3b82f6",0.45],[240,80,20,16,"#22c55e",0.4]].map(([cx,cy,rx,ry,c,o],i)=>(
//       <ellipse key={i} cx={Number(cx)} cy={Number(cy)} rx={Number(rx)} ry={Number(ry)} fill={String(c)} opacity={Number(o)}/>
//     ))}
//     <rect x="118" y="156" width="80" height="8" rx="4" fill="url(#ah-scale)"/>
//     <text x="118" y="174" fill="#64748b" fontSize="7">0°C</text>
//     <text x="196" y="174" fill="#ef4444" fontSize="7" textAnchor="end">650°C</text>
//     <rect x="204" y="152" width="76" height="18" rx="4" fill="rgba(245,158,11,0.18)"/>
//     <text x="242" y="164" fill="#fbbf24" fontSize="9" fontWeight="700" textAnchor="middle">MAX: 412.7°C</text>
//     <g transform="translate(130,196)">
//       <circle cx="0" cy="0" r="18" fill="#060e1a" stroke="#f59e0b" strokeWidth="2"/>
//       <circle cx="0" cy="0" r="12" fill="#0a1628" stroke="#475569" strokeWidth="1"/>
//       <circle cx="0" cy="0" r="6"  fill="#0ea5e9" opacity="0.4"/>
//       <circle cx="-4" cy="-4" r="2.5" fill="rgba(255,255,255,0.5)"/>
//       <text x="0" y="26" fill="#94a3b8" fontSize="7" textAnchor="middle">IR Lens</text>
//     </g>
//     <g transform="translate(180,196)">
//       <circle cx="0" cy="0" r="14" fill="#060e1a" stroke="#64748b" strokeWidth="1.5"/>
//       <circle cx="0" cy="0" r="9"  fill="#0a1628" stroke="#334155" strokeWidth="1"/>
//       <circle cx="0" cy="0" r="4"  fill="#94a3b8" opacity="0.3"/>
//       <text x="0" y="22" fill="#94a3b8" fontSize="7" textAnchor="middle">Visual</text>
//     </g>
//     <rect x="115" y="218" width="170" height="36" rx="10" fill="#172032"/>
//     {[0,1,2,3].map(i=><line key={i} x1="120" y1={226+i*7} x2="280" y2={226+i*7} stroke="#2d3f57" strokeWidth="1"/>)}
//     <rect x="101" y="222" width="16" height="28" rx="7" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
//     <rect x="240" y="42" width="50" height="16" rx="8" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.30)" strokeWidth="1"/>
//     <text x="265" y="53" fill="#f59e0b" fontSize="7.5" fontWeight="700" textAnchor="middle">Wi-Fi  BT</text>
//     {[
//       {x:8,   y:50,  val:"≤0.04°C",    label:"Sensitivity", c:"#f59e0b"},
//       {x:8,   y:120, val:"640×480",    label:"Resolution",  c:"#3b82f6"},
//       {x:308, y:50,  val:"−40–2000°C", label:"Range",       c:"#ef4444"},
//       {x:308, y:120, val:"Wi-Fi/BT",   label:"Wireless",    c:"#22c55e"},
//     ].map(b=>(
//       <g key={b.label}>
//         <rect x={b.x} y={b.y} width="86" height="46" rx="12" fill="#fff" stroke={`${b.c}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
//         <text x={b.x+43} y={b.y+19} fill={b.c} fontSize="10" fontWeight="900" textAnchor="middle">{b.val}</text>
//         <text x={b.x+43} y={b.y+34} fill="#64748b" fontSize="8.5" textAnchor="middle">{b.label}</text>
//       </g>
//     ))}
//     <rect x="100" y="276" width="200" height="28" rx="14" fill="url(#ah-body)"/>
//     <text x="200" y="294" fill="#fbbf24" fontSize="9.5" fontWeight="700" textAnchor="middle">ADVANCED HANDHELD IR THERMOGRAPHY</text>
//   </svg>
// );

// const FixedCameraSVG = () => (
//   <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block" }}>
//     <defs>
//       <linearGradient id="fc-bg"   x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
//       <linearGradient id="fc-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#334155"/><stop offset="100%" stopColor="#1e293b"/></linearGradient>
//       <linearGradient id="fc-acc"  x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
//     </defs>
//     <rect width="400" height="320" rx="20" fill="url(#fc-bg)"/>
//     <rect x="186" y="40" width="28" height="50" rx="4" fill="#94a3b8"/>
//     <rect x="174" y="34" width="52" height="12" rx="6" fill="#64748b"/>
//     {[178,200,222].map(x=><circle key={x} cx={x} cy="40" r="3" fill="#475569"/>)}
//     <rect x="110" y="88" width="180" height="120" rx="16" fill="url(#fc-body)" style={{ filter:"drop-shadow(0 12px 32px rgba(0,0,0,0.35))" }}/>
//     <rect x="110" y="88" width="180" height="6" rx="16" fill="url(#fc-acc)"/>
//     <rect x="110" y="90" width="180" height="4" fill="url(#fc-acc)"/>
//     <circle cx="190" cy="148" r="36" fill="#0a1628" stroke="rgba(245,158,11,0.40)" strokeWidth="2.5"/>
//     <circle cx="190" cy="148" r="28" fill="#060e1a" stroke="#334155" strokeWidth="1.5"/>
//     <circle cx="190" cy="148" r="20" fill="#030a12" stroke="#475569" strokeWidth="1"/>
//     <circle cx="190" cy="148" r="10" fill="#0ea5e9" opacity="0.25"/>
//     <circle cx="183" cy="141" r="5"  fill="rgba(255,255,255,0.35)"/>
//     <circle cx="130" cy="100" r="5" fill="#22c55e" style={{ filter:"drop-shadow(0 0 4px #22c55e)" }}>
//       <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
//     </circle>
//     <circle cx="148" cy="100" r="5" fill="#f59e0b"/>
//     <text x="128" y="114" fill="#64748b" fontSize="7">LIVE</text>
//     <rect x="258" y="140" width="22" height="16" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
//     <text x="269" y="162" fill="#94a3b8" fontSize="6.5" textAnchor="middle">LAN</text>
//     <rect x="258" y="108" width="20" height="10" rx="3" fill="#1e3a5f"/>
//     <rect x="260" y="110" width="12" height="6" rx="2" fill="#22c55e" opacity="0.8"/>
//     <rect x="126" y="208" width="148" height="14" rx="4" fill="#2d3f57"/>
//     {[136,160,184,208,232,256].map(x=><rect key={x} x={x} y="208" width="10" height="14" rx="2" fill="#475569" opacity="0.5"/>)}
//     {[1,2,3].map(i=>(<line key={i}   x1="156" y1="148" x2={156-i*40} y2={148-i*15} stroke="#f59e0b" strokeWidth={1.5-i*0.3} strokeDasharray="5,3" opacity={0.4-i*0.1}/>))}
//     {[1,2,3].map(i=>(<line key={i+3} x1="156" y1="148" x2={156-i*40} y2={148+i*15} stroke="#f59e0b" strokeWidth={1.5-i*0.3} strokeDasharray="5,3" opacity={0.4-i*0.1}/>))}
//     {[
//       {x:8,   y:90,  val:"IP67",      label:"Protection", c:"#3b82f6"},
//       {x:8,   y:160, val:"-40–2000°C",label:"Range",      c:"#ef4444"},
//       {x:308, y:90,  val:"24/7",      label:"Continuous", c:"#22c55e"},
//       {x:308, y:160, val:"Ethernet",  label:"Connection", c:"#f59e0b"},
//     ].map(b=>(
//       <g key={b.label}>
//         <rect x={b.x} y={b.y} width="90" height="48" rx="12" fill="#fff" stroke={`${b.c}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
//         <text x={b.x+45} y={b.y+20} fill={b.c} fontSize="12" fontWeight="900" textAnchor="middle">{b.val}</text>
//         <text x={b.x+45} y={b.y+36} fill="#64748b" fontSize="8.5" textAnchor="middle">{b.label}</text>
//       </g>
//     ))}
//     <rect x="118" y="250" width="164" height="44" rx="12" fill="#fff" stroke="rgba(245,158,11,0.20)" strokeWidth="1"/>
//     <text x="170" y="268" fontSize="16">🏭</text>
//     <text x="192" y="266" fill="#334155" fontSize="9" fontWeight="700">Permanently Mounted</text>
//     <text x="192" y="279" fill="#64748b" fontSize="8.5">Kiln · Sub-Station · Coal Pile</text>
//     <rect x="100" y="300" width="200" height="18" rx="9" fill="url(#fc-body)"/>
//     <text x="200" y="313" fill="#fbbf24" fontSize="9" fontWeight="700" textAnchor="middle">FIXED THERMAL IMAGING CAMERA</text>
//   </svg>
// );

// const AutomationCameraSVG = () => (
//   <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block" }}>
//     <defs>
//       <linearGradient id="ac-bg"   x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9"/><stop offset="100%" stopColor="#f0f9ff"/></linearGradient>
//       <linearGradient id="ac-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0f172a"/><stop offset="100%" stopColor="#1e293b"/></linearGradient>
//       <linearGradient id="ac-acc"  x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ea580c"/><stop offset="100%" stopColor="#f59e0b"/></linearGradient>
//       <marker id="ac-arr" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#f59e0b"/></marker>
//     </defs>
//     <rect width="400" height="320" rx="20" fill="url(#ac-bg)"/>
//     <rect x="138" y="50" width="124" height="110" rx="14" fill="url(#ac-body)" style={{ filter:"drop-shadow(0 10px 28px rgba(0,0,0,0.38))" }}/>
//     <rect x="138" y="50" width="124" height="6" rx="14" fill="url(#ac-acc)"/>
//     <rect x="138" y="52" width="124" height="3" fill="url(#ac-acc)"/>
//     <circle cx="185" cy="105" r="22" fill="#060e1a" stroke="rgba(234,88,12,0.40)" strokeWidth="2"/>
//     <circle cx="185" cy="105" r="15" fill="#030a12" stroke="#334155" strokeWidth="1"/>
//     <circle cx="185" cy="105" r="8"  fill="#0ea5e9" opacity="0.3"/>
//     <circle cx="180" cy="100" r="3"  fill="rgba(255,255,255,0.45)"/>
//     <text x="185" y="136" fill="#64748b" fontSize="7" textAnchor="middle">IR Sensor</text>
//     <circle cx="231" cy="105" r="16" fill="#060e1a" stroke="#475569" strokeWidth="1.5"/>
//     <circle cx="231" cy="105" r="10" fill="#030a12" stroke="#334155" strokeWidth="1"/>
//     <circle cx="231" cy="105" r="5"  fill="#94a3b8" opacity="0.3"/>
//     <text x="231" y="130" fill="#64748b" fontSize="7" textAnchor="middle">Visual</text>
//     <rect x="148" y="145" width="104" height="12" rx="4" fill="#172032"/>
//     {[154,168,182,196,210,224,236].map(x=><rect key={x} x={x} y="147" width="6" height="8" rx="2" fill="#0ea5e9" opacity="0.5"/>)}
//     <text x="200" y="166" fill="#64748b" fontSize="7" textAnchor="middle">I/O + Ethernet</text>
//     <line x1="200" y1="160" x2="200" y2="190" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ac-arr)"/>
//     <rect x="136" y="192" width="128" height="44" rx="12" fill="#fff" stroke="rgba(245,158,11,0.30)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.07))" }}/>
//     <text x="200" y="210" fill="#0f1117" fontSize="9" fontWeight="700" textAnchor="middle">Edge Processing Unit</text>
//     <text x="200" y="224" fill="#64748b" fontSize="8.5" textAnchor="middle">Alarm · Analytics · Control</text>
//     <line x1="136" y1="214" x2="80"  y2="252" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#ac-arr)"/>
//     <line x1="200" y1="236" x2="200" y2="256" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#ac-arr)"/>
//     <line x1="264" y1="214" x2="318" y2="252" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#ac-arr)"/>
//     {[
//       {x:50,  y:254, emoji:"⚙️", label:"PLC",       border:"rgba(59,130,246,0.28)"},
//       {x:166, y:258, emoji:"🔔", label:"Alarm",     border:"rgba(239,68,68,0.28)"},
//       {x:284, y:254, emoji:"🌐", label:"Dashboard", border:"rgba(34,197,94,0.28)"},
//     ].map(o=>(
//       <g key={o.label}>
//         <rect x={o.x-42} y={o.y} width="84" height="44" rx="10" fill="#fff" stroke={o.border} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.06))" }}/>
//         <text x={o.x} y={o.y+22} fontSize="18" textAnchor="middle">{o.emoji}</text>
//         <text x={o.x} y={o.y+38} fill="#334155" fontSize="9" fontWeight="700" textAnchor="middle">{o.label}</text>
//       </g>
//     ))}
//     {[
//       {x:8,   y:52,  val:"Compact",   label:"Form Factor", c:"#f59e0b"},
//       {x:308, y:52,  val:"Modbus",    label:"Protocol",    c:"#3b82f6"},
//       {x:8,   y:120, val:"IP66",      label:"Protection",  c:"#22c55e"},
//       {x:308, y:120, val:"Auto Alarm",label:"System",      c:"#ef4444"},
//     ].map(b=>(
//       <g key={b.label}>
//         <rect x={b.x} y={b.y} width="90" height="48" rx="12" fill="#fff" stroke={`${b.c}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
//         <text x={b.x+45} y={b.y+20} fill={b.c} fontSize="11" fontWeight="900" textAnchor="middle">{b.val}</text>
//         <text x={b.x+45} y={b.y+36} fill="#64748b" fontSize="8.5" textAnchor="middle">{b.label}</text>
//       </g>
//     ))}
//     <rect x="100" y="308" width="200" height="14" rx="7" fill="url(#ac-body)"/>
//     <text x="200" y="319.5" fill="#fbbf24" fontSize="9" fontWeight="700" textAnchor="middle">THERMAL AUTOMATION CAMERA</text>
//   </svg>
// );

// const ThermalSystemSVG = () => (
//   <svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:20 }}>
//     <defs>
//       <linearGradient id="ts-bg"  x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
//       <linearGradient id="ts-cam" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
//       <radialGradient id="ts-heat" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.4"/><stop offset="60%" stopColor="#f97316" stopOpacity="0.2"/><stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/></radialGradient>
//       <filter id="ts-glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
//       <marker id="ts-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/></marker>
//     </defs>
//     <rect width="520" height="400" rx="20" fill="url(#ts-bg)"/>
//     <rect x="24" y="120" width="140" height="160" rx="16" fill="#fff" stroke="#eef0f4" strokeWidth="2" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.08))" }}/>
//     <text x="94" y="148" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle">INDUSTRIAL</text>
//     <text x="94" y="162" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle">EQUIPMENT</text>
//     <ellipse cx="94" cy="210" rx="38" ry="38" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
//     <ellipse cx="94" cy="210" rx="24" ry="24" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5"/>
//     <ellipse cx="94" cy="210" rx="10" ry="10" fill="url(#ts-cam)" opacity="0.5"/>
//     <ellipse cx="94" cy="210" rx="52" ry="52" fill="url(#ts-heat)">
//       <animate attributeName="rx" values="52;60;52" dur="2.5s" repeatCount="indefinite"/>
//       <animate attributeName="ry" values="52;60;52" dur="2.5s" repeatCount="indefinite"/>
//       <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite"/>
//     </ellipse>
//     <circle cx="112" cy="192" r="8" fill="#ef4444" style={{ filter:"url(#ts-glow)" }}>
//       <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite"/>
//       <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
//     </circle>
//     <text x="94" y="264" fill="#ef4444" fontSize="8" fontWeight="700" textAnchor="middle">⚠ HOTSPOT DETECTED</text>
//     <text x="94" y="276" fill="#f97316" fontSize="8" textAnchor="middle">Temp: 186°C — ALERT</text>
//     <rect x="196" y="158" width="88" height="60" rx="12" fill="url(#ts-cam)" style={{ filter:"drop-shadow(0 6px 20px rgba(245,158,11,0.45))" }}/>
//     <rect x="204" y="166" width="52" height="36" rx="8" fill="rgba(255,255,255,0.20)"/>
//     <circle cx="230" cy="184" r="13" fill="rgba(0,0,0,0.30)"/>
//     <circle cx="230" cy="184" r="9"  fill="rgba(0,0,0,0.50)"/>
//     <circle cx="230" cy="184" r="5"  fill="#0ea5e9" opacity="0.6"/>
//     <circle cx="227" cy="181" r="2"  fill="rgba(255,255,255,0.6)"/>
//     <text x="240" y="232" fill="#b45309" fontSize="8.5" fontWeight="700" textAnchor="middle">IR THERMAL CAMERA</text>
//     <text x="240" y="245" fill="#64748b" fontSize="7.5" textAnchor="middle">Fixed Mounted · 24/7</text>
//     <line x1="196" y1="188" x2="168" y2="188" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3"/>
//     <polygon points="170,183 170,193 160,188" fill="#f59e0b" opacity="0.6"/>
//     <line x1="288" y1="188" x2="332" y2="188" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#ts-arr)"/>
//     <text x="310" y="181" fill="#b45309" fontSize="7.5" textAnchor="middle" fontWeight="600">Ethernet</text>
//     <rect x="334" y="136" width="120" height="104" rx="14" fill="#fff" stroke="rgba(245,158,11,0.28)" strokeWidth="2" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.08))" }}/>
//     <rect x="344" y="148" width="100" height="64" rx="8" fill="#0f172a"/>
//     {[[0,"#ef4444",0.9],[1,"#f97316",0.7],[2,"#f59e0b",0.5],[3,"#22c55e",0.3],[4,"#3b82f6",0.2]].map(([i,c,o])=>(
//       <ellipse key={String(i)} cx="394" cy="180" rx={String(8+Number(i)*8)} ry={String(5+Number(i)*5)} fill={String(c)} opacity={Number(o)}/>
//     ))}
//     <text x="394" y="220" fill="#334155" fontSize="8.5" fontWeight="700" textAnchor="middle">PROCESSING UNIT</text>
//     <text x="394" y="233" fill="#64748b" fontSize="7.5" textAnchor="middle">Multi-Camera Platform</text>
//     <line x1="394" y1="240" x2="394" y2="276" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ts-arr)"/>
//     {[
//       {x:280,emoji:"🔔",label:"SMS Alert"},{x:356,emoji:"📧",label:"Email"},
//       {x:432,emoji:"📱",label:"Dashboard"},{x:496,emoji:"🖥",label:"SCADA"},
//     ].map(o=>(
//       <g key={o.label}>
//         <rect x={o.x-30} y="284" width="60" height="50" rx="12" fill="#fff" stroke="rgba(245,158,11,0.25)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
//         <text x={o.x} y="308" fontSize="16" textAnchor="middle">{o.emoji}</text>
//         <text x={o.x} y="326" fill="#334155" fontSize="8.5" fontWeight="700" textAnchor="middle">{o.label}</text>
//       </g>
//     ))}
//     <circle cx="30" cy="30" r="7" fill="#22c55e">
//       <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
//     </circle>
//     <text x="44" y="35" fill="#22c55e" fontSize="9.5" fontWeight="700">SYSTEM LIVE · 24/7 Monitoring Active</text>
//   </svg>
// );

// const HowItWorksSVG = () => (
//   <svg viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
//     <defs>
//       <linearGradient id="hw-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
//       <marker id="hw-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/></marker>
//     </defs>
//     <rect width="760" height="230" rx="16" fill="url(#hw-bg)"/>
//     <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">How the Thermal Monitoring System Works</text>
//     {[
//       {x:18,  color:"#f59e0b", step:"STEP 01", emoji:"📷", t1:"IR Camera",   t2:"Captures Image",  d1:"Continuous thermal",  d2:"image stream, 24/7"},
//       {x:200, color:"#ea580c", step:"STEP 02", emoji:"🧠", t1:"AI Software", t2:"Analyses Data",   d1:"Real-time temp",      d2:"comparison & trending"},
//       {x:382, color:"#ef4444", step:"STEP 03", emoji:"⚠️", t1:"Hotspot",     t2:"Detected",        d1:"Threshold breached,", d2:"alarm triggered"},
//       {x:564, color:"#22c55e", step:"STEP 04", emoji:"🔔", t1:"Alert Sent",  t2:"Instantly",       d1:"SMS, Email, PLC,",    d2:"SCADA notified", wide:true},
//     ].map((s,i)=>(
//       <g key={s.step}>
//         <rect x={s.x} y="42" width={s.wide?178:158} height="172" rx="16" fill="#fff" stroke={`${s.color}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.07))" }}/>
//         <rect x={s.x} y="42" width={s.wide?178:158} height="32" rx="16" fill={s.color} opacity="0.12"/>
//         <rect x={s.x} y="58" width={s.wide?178:158} height="16" fill={s.color} opacity="0.12"/>
//         <text x={s.x+(s.wide?89:79)} y="62"  fill={s.color} fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.08em">{s.step}</text>
//         <text x={s.x+(s.wide?89:79)} y="110" fontSize="32" textAnchor="middle">{s.emoji}</text>
//         <text x={s.x+(s.wide?89:79)} y="140" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">{s.t1}</text>
//         <text x={s.x+(s.wide?89:79)} y="156" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">{s.t2}</text>
//         <text x={s.x+(s.wide?89:79)} y="176" fill="#64748b" fontSize="10" textAnchor="middle">{s.d1}</text>
//         <text x={s.x+(s.wide?89:79)} y="189" fill="#64748b" fontSize="10" textAnchor="middle">{s.d2}</text>
//         {i < 3 && <line x1={s.x+(s.wide?178:158)} y1="128" x2={s.x+(s.wide?198:180)} y2="128" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#hw-arr)"/>}
//       </g>
//     ))}
//   </svg>
// );

// /* ═══════════════════════════════════════
//    DATA
// ═══════════════════════════════════════ */
// const categories = [
//   {
//     id:"a", label:"A", tag:"Entry Level",
//     title:"Basic Handheld IR Thermography Devices",
//     color:"#f59e0b", bg:"linear-gradient(135deg,#f59e0b,#d97706)",
//     Icon:BasicHandheldSVG,
//     points:["Spot temperature measurement","160×120 IR resolution","–20°C to 650°C range","Built-in laser pointer","Rugged handheld design","Data logging & report export"],
//     use:"Electrical panels · HVAC · Predictive maintenance",
//   },
//   {
//     id:"b", label:"B", tag:"Professional",
//     title:"Advanced Handheld IR Thermography Devices",
//     color:"#ea580c", bg:"linear-gradient(135deg,#ea580c,#c2410c)",
//     Icon:AdvancedHandheldSVG,
//     points:["Up to 640×480 resolution","NETD ≤ 0.04°C sensitivity","–40°C to 2000°C range","Fusion visual + thermal image","Wi-Fi, Bluetooth & USB-C","Advanced analytics software"],
//     use:"Mechanical inspection · R&D · High-precision surveys",
//   },
//   {
//     id:"c", label:"C", tag:"Permanent Monitoring",
//     title:"Fixed Thermal Imaging Cameras",
//     color:"#f97316", bg:"linear-gradient(135deg,#f97316,#ea580c)",
//     Icon:FixedCameraSVG,
//     points:["24/7 continuous monitoring","IP67 weatherproof housing","Ethernet / Modbus TCP output","Configurable alarm zones","Remote access via web","No operator intervention"],
//     use:"Kilns · Sub-stations · Coal piles · Conveyor systems",
//   },
//   {
//     id:"d", label:"D", tag:"Automation & Control",
//     title:"Thermal Automation Cameras",
//     color:"#ef4444", bg:"linear-gradient(135deg,#ef4444,#ea580c)",
//     Icon:AutomationCameraSVG,
//     points:["PLC / SCADA / DCS integration","Relay & digital I/O outputs","Modbus RTU/TCP + OPC-UA","Multi-zone alarm management","Edge processing on-board","Compact industrial housing"],
//     use:"Process control · Production lines · Safety interlocks",
//   },
// ];

// const heroStats = [
//   {num:"4",    label:"Product families"},
//   {num:"24/7", label:"Monitoring capable"},
//   {num:"±1°C", label:"Measurement accuracy"},
//   {num:"IP67", label:"Industrial rated"},
// ];

// const automationFeatures = [
//   {icon:<Monitor size={17}/>,      title:"Customised IR Thermal Monitoring & Automation",  desc:"Bespoke fixed thermal camera systems designed and configured specifically for your process requirements."},
//   {icon:<Activity size={17}/>,     title:"24/7 Real-Time Temperature Surveillance",         desc:"Continuous automated monitoring with instant detection of temperature anomalies as they develop."},
//   {icon:<Bell size={17}/>,         title:"Custom Alarm & Email / SMS Alerts",               desc:"Configurable multi-level alarm thresholds with automated email and SMS notifications to operators."},
//   {icon:<Zap size={17}/>,          title:"Integrates with PLC, SCADA, DCS & BMS",          desc:"Compatible with all major control platforms via Modbus TCP/RTU, OPC-UA, Ethernet or relay outputs."},
//   {icon:<TrendingDown size={17}/>, title:"Data-Driven Proactive Maintenance Analytics",     desc:"Historical temperature trending and analytics that reduce unplanned downtime and extend equipment life."},
// ];

// const appCards = [
//   {icon:<Flame size={19}/>,    title:"Kiln Shell & Metal Casting",  desc:"Real-time shell temperature mapping on cement kilns and ladle thermal monitoring in steel foundries.",          img:appImg1},
//   {icon:<Factory size={19}/>,  title:"Coal Pile & HT Sub-Station",  desc:"Automated thermal surveillance of coal stockpiles and HT electrical switchyard equipment — 24/7.",            img:appImg2},
//   {icon:<Building2 size={19}/>,title:"Critical Machinery",          desc:"Continuous motor, drive and critical production line monitoring — detecting overheating before failure occurs.", img:appImg3},
// ];

// const whyChoose = [
//   {icon:<TrendingDown size={16}/>,label:"Prevent Catastrophic Failures",   desc:"Detect hotspots hours before they cause damage — saving equipment, product and production time.",  color:"#f59e0b"},
//   {icon:<Flame size={16}/>,       label:"Eliminate Fire Risk",              desc:"24/7 thermal surveillance of coal piles, bunkers and fire-sensitive areas prevents disasters.",       color:"#ef4444"},
//   {icon:<Shield size={16}/>,      label:"Protect Electrical Infrastructure",desc:"Continuous sub-station and OHE monitoring prevents costly outages and arc-flash incidents.",         color:"#3b82f6"},
//   {icon:<CheckCircle2 size={16}/>,label:"Reduce Maintenance Costs",         desc:"Data-driven analytics replace reactive maintenance with planned, targeted interventions.",             color:"#22c55e"},
// ];

// /* ═══════════════════════════════════════
//    CSS
// ═══════════════════════════════════════ */
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
//   .ath { font-family:'Roboto',sans-serif; color:#1e293b; }
//   .ath * { box-sizing:border-box; margin:0; padding:0; }

//   .fu { opacity:0; transform:translateY(22px); transition:opacity .55s ease,transform .55s ease; }
//   .fu.vis { opacity:1; transform:translateY(0); }

//   /* Hero */
//   .ath-hero { position:relative; overflow:hidden; min-height:100svh; display:flex; align-items:center; }
//   .ath-hero-photo  { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
//   .ath-hero-wash   { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,.90) 0%,rgba(224,242,254,.82) 55%,rgba(255,251,235,.90) 100%); }
//   .ath-hero-dots   { position:absolute; inset:0; opacity:.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
//   .ath-hero-burst  { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,.26) 0%,rgba(251,191,36,.09) 40%,transparent 70%); top:-15%; left:-8%; }
//   .ath-hero-sky    { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,.20) 0%,rgba(56,189,248,.06) 45%,transparent 70%); bottom:-15%; right:-5%; }
//   .ath-hero-inner  { position:relative; max-width:1280px; margin:0 auto; padding:80px 28px 72px; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
//   @media(max-width:900px){ .ath-hero-inner{ grid-template-columns:1fr; gap:32px; padding:56px 20px 48px; } }

//   @keyframes ath-fadein  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes ath-flicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1} 20%,24%,55%{opacity:.3} }
//   .ath-flicker { animation:ath-fadein 1.4s ease .3s both,ath-flicker 4s ease-in-out 2s infinite; font-size:clamp(12px,1.1vw,15px); font-weight:600; background:linear-gradient(90deg,#f59e0b,#ea580c); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:block; margin-top:10px; margin-bottom:18px; }

//   .ath-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
//   .ath-bread a { font-size:12px; color:#64748b; text-decoration:none; } .ath-bread a:hover { color:#f59e0b; }

//   .ath-badge         { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:18px; }
//   .ath-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,.08); border:1px solid rgba(245,158,11,.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }

//   .ath-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:28px; }
//   @media(max-width:640px){ .ath-stats-grid{ grid-template-columns:repeat(2,1fr); } }
//   .ath-stat { background:rgba(255,255,255,.82); border:1px solid rgba(245,158,11,.28); border-radius:14px; padding:12px 16px; backdrop-filter:blur(10px); }
//   .ath-stat-num { font-size:22px; font-weight:900; color:#ea580c; line-height:1; }
//   .ath-stat-label { font-size:10px; color:#64748b; font-weight:500; margin-top:3px; }

//   .ath-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:14px; font-weight:700; padding:13px 26px; border-radius:12px; text-decoration:none; transition:transform .15s,box-shadow .2s; box-shadow:0 4px 20px rgba(245,158,11,.38); white-space:nowrap; }
//   .ath-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,.52); }
//   .ath-btn-ghost   { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,.72); backdrop-filter:blur(8px); color:#334155; font-size:14px; font-weight:500; padding:13px 24px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,.25); transition:border-color .2s,background .2s; white-space:nowrap; }
//   .ath-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

//   .ath-section { padding:72px 28px; }
//   @media(max-width:640px){ .ath-section{ padding:48px 16px; } }
//   .ath-inner { max-width:1280px; margin:0 auto; }

//   .ath-svg-card { border-radius:20px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,.09); border:1px solid rgba(245,158,11,.14); transition:transform .3s,box-shadow .3s; }
//   .ath-svg-card:hover { transform:translateY(-5px) scale(1.005); box-shadow:0 20px 56px rgba(0,0,0,.14); }
//   .ath-svg-label { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,.10); border:1px solid rgba(245,158,11,.25); color:#b45309; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; padding:5px 12px; border-radius:999px; margin-bottom:10px; }

//   /* Product card */
//   .ath-product-card { background:#fff; border:1px solid #eef0f4; border-radius:24px; overflow:hidden; transition:box-shadow .25s,transform .25s,border-color .25s; box-shadow:0 4px 20px rgba(0,0,0,.06); display:grid; grid-template-columns:1fr 1fr; align-items:start; }
//   @media(max-width:860px){ .ath-product-card{ grid-template-columns:1fr; } }
//   .ath-product-card:hover { box-shadow:0 16px 48px rgba(0,0,0,.12); transform:translateY(-4px); border-color:rgba(245,158,11,.25); }

//   .ath-tag    { display:inline-flex; align-items:center; gap:6px; border-radius:999px; padding:5px 14px; font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; }
//   .ath-bullet { display:flex; align-items:flex-start; gap:9px; margin-bottom:9px; font-size:13.5px; color:#334155; line-height:1.55; }

//   .ath-feature { display:flex; gap:12px; align-items:flex-start; padding:14px 0; border-bottom:1px solid #f1f5f9; }
//   .ath-feature:last-child { border-bottom:none; }
//   .ath-feat-icon { width:36px; height:36px; border-radius:10px; background:rgba(245,158,11,.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; flex-shrink:0; }

//   .ath-app-card { background:#fff; border:1px solid #eef0f4; border-radius:16px; overflow:hidden; transition:box-shadow .22s,border-color .22s,transform .22s; position:relative; }
//   .ath-app-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,#ea580c); opacity:0; transition:opacity .2s; }
//   .ath-app-card:hover { box-shadow:0 12px 36px rgba(0,0,0,.10); border-color:rgba(245,158,11,.28); transform:translateY(-5px); }
//   .ath-app-card:hover::before { opacity:1; }

//   .ath-app-pill { display:inline-flex; align-items:center; gap:7px; background:#fff; border:1px solid rgba(245,158,11,.20); border-radius:10px; padding:8px 14px; font-size:13px; color:#334155; font-weight:500; }
//   .ath-app-dot  { width:6px; height:6px; border-radius:50%; background:linear-gradient(135deg,#f59e0b,#ea580c); flex-shrink:0; }

//   .ath-photo-card { border-radius:20px; overflow:hidden; box-shadow:0 16px 48px rgba(0,0,0,.11); border:1px solid #eef0f4; transition:transform .3s,box-shadow .3s; }
//   .ath-photo-card:hover { transform:translateY(-5px) scale(1.01); box-shadow:0 24px 64px rgba(0,0,0,.15); }

//   .ath-two-col { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }
//   @media(max-width:900px){ .ath-two-col{ grid-template-columns:1fr; gap:36px; } }

//   .ath-app-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
//   .ath-int-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:16px; }
//   .ath-why-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:16px; }

//   .ath-install-chips { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-top:16px; }
//   @media(max-width:640px){ .ath-install-chips{ grid-template-columns:repeat(2,1fr); } }
//   .ath-install-chip { display:flex; align-items:center; gap:6px; background:#fff; border:1px solid rgba(245,158,11,.22); border-radius:10px; padding:8px 10px; font-size:12px; font-weight:600; color:#334155; }

//   .ath-pill-list { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-bottom:40px; }
//   .ath-divider   { width:100%; height:4px; background:linear-gradient(90deg,#f59e0b,#ea580c,#f59e0b); opacity:.16; border:none; margin:0; }

//   @keyframes ath-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.6} }
//   .ath-live-dot { width:9px; height:9px; border-radius:50%; background:#22c55e; animation:ath-pulse 2s infinite; display:inline-block; margin-right:6px; }

//   .ath-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
//   .ath-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }
// `;

// /* ═══════════════════════════════════════
//    PAGE
// ═══════════════════════════════════════ */
// export default function AdvancedThermalHotspotMonitoring() {
//   const catRefs  = categories.map((_,i) => useFU(i * 100));
//   const appRefs  = appCards.map((_,i)   => useFU(i * 100));
//   const whyRefs  = whyChoose.map((_,i)  => useFU(i * 80));
//   const intRefs  = [useFU(0), useFU(80), useFU(160), useFU(240)];
//   const refHow   = useFU(0);
//   const refProd  = useFU(0);
//   const refFeat  = useFU(0);
//   const refInst  = useFU(100);
//   const refApps  = useFU(0);
//   const refInt   = useFU(0);
//   const refWhy   = useFU(0);

//   return (
//     <div className="ath">
//       <style>{css}</style>

//       {/* ─── HERO ─── */}
//       <section className="ath-hero">
//         <img src={heroBg} alt="" className="ath-hero-photo" aria-hidden="true"/>
//         <div className="ath-hero-wash"/><div className="ath-hero-dots"/>
//         <div className="ath-hero-burst"/><div className="ath-hero-sky"/>

//         <div className="ath-hero-inner">
//           <div>
//             <div className="ath-bread">
//               <Link to="/">Home</Link>
//               <ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
//               <Link to="/products">Products</Link>
//               <ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
//               <span style={{ fontSize:12, color:"#334155", fontWeight:500 }}>Thermal Cameras & Monitoring</span>
//             </div>

//             <div className="ath-badge"><Thermometer size={11}/> Infrared Thermography & Automation</div>

//             <h1 style={{ fontSize:"clamp(26px,4.5vw,54px)", fontWeight:900, color:"#1e293b", lineHeight:1.05 }}>
//               Thermal Cameras &amp;{" "}
//               <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
//                 Monitoring Solutions
//               </span>
//             </h1>

//             <span className="ath-flicker">🔥 Detect hotspots before they become catastrophic failures</span>

//             <p style={{ fontSize:"clamp(14px,1.3vw,16px)", color:"#475569", lineHeight:1.8, marginBottom:10, maxWidth:510 }}>
//               A complete thermal imaging range — from handheld spot inspections to{" "}
//               <strong style={{ color:"#1e293b" }}>fully automated 24/7 fixed monitoring systems</strong> — engineered for every industrial application.
//             </p>
//             <p style={{ fontSize:"clamp(14px,1.3vw,16px)", color:"#475569", lineHeight:1.8, marginBottom:24, maxWidth:510 }}>
//               Detect hotspots instantly. Send automated alarms. Integrate with your plant control systems —{" "}
//               <strong style={{ color:"#1e293b" }}>no rip-and-replace required</strong>.
//             </p>

//             <div className="ath-stats-grid">
//               {heroStats.map(s=>(
//                 <div key={s.label} className="ath-stat">
//                   <div className="ath-stat-num">{s.num}</div>
//                   <div className="ath-stat-label">{s.label}</div>
//                 </div>
//               ))}
//             </div>

//             <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
//               <Link to="/contact" className="ath-btn-primary">Request a Demo <ArrowRight size={16}/></Link>
//               <Link to="/contact" className="ath-btn-ghost">Talk to a Specialist</Link>
//             </div>
//           </div>

//           <div>
//             <div className="ath-svg-label"><span className="ath-live-dot"/>Live Thermal Monitoring System</div>
//             <div className="ath-svg-card"><ThermalSystemSVG/></div>
//           </div>
//         </div>
//       </section>

//       <hr className="ath-divider"/>

//       {/* ─── HOW IT WORKS ─── */}
//       <section className="ath-section" style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)" }}>
//         <div className="ath-inner">
//           <div ref={refHow} className="fu" style={{ textAlign:"center", marginBottom:24 }}>
//             <div className="ath-section-badge" style={{ margin:"0 auto 12px" }}><Zap size={11}/> Detection Process</div>
//             <h2 style={{ fontSize:"clamp(20px,3vw,32px)", fontWeight:800, color:"#0f1117", marginBottom:24 }}>
//               From Capture to Alert in Seconds
//             </h2>
//             <div className="ath-svg-card"><HowItWorksSVG/></div>
//           </div>
//         </div>
//       </section>

//       <hr className="ath-divider"/>

//       {/* ─── PRODUCT LINE ─── */}
//       <section className="ath-section" style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)" }}>
//         <div className="ath-inner">
//           <div ref={refProd} className="fu" style={{ textAlign:"center", marginBottom:48 }}>
//             <div className="ath-section-badge" style={{ margin:"0 auto 12px" }}><Thermometer size={11}/> Product Range</div>
//             <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:10 }}>
//               Thermal Camera Product Line
//             </h2>
//             <p style={{ fontSize:15, color:"#64748b", maxWidth:540, margin:"0 auto" }}>
//               Handheld, portable, fixed and fully automated — our four product families cover every thermal imaging requirement across industrial operations.
//             </p>
//           </div>

//           {/* Summary tabs */}
//           <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center", marginBottom:48 }}>
//             {categories.map(c=>(
//               <div key={c.id} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:999, border:"1.5px solid #eef0f4", background:"#fff", fontSize:13, fontWeight:700, color:"#64748b", boxShadow:"0 2px 8px rgba(0,0,0,.05)" }}>
//                 <span style={{ width:22, height:22, borderRadius:999, background:c.bg, display:"inline-flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:11, fontWeight:900, flexShrink:0 }}>{c.label}</span>
//                 {c.title.split(" ").slice(0,3).join(" ")}
//               </div>
//             ))}
//           </div>

//           <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
//             {categories.map((cat,i)=>(
//               <div key={cat.id} ref={catRefs[i]} className="fu">
//                 <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16, flexWrap:"wrap" }}>
//                   <div style={{ width:36, height:36, borderRadius:12, background:cat.bg, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:16, fontWeight:900, boxShadow:`0 4px 14px ${cat.color}50` }}>{cat.label}</div>
//                   <h3 style={{ fontSize:"clamp(16px,2vw,20px)", fontWeight:800, color:"#0f1117" }}>{cat.title}</h3>
//                   <div className="ath-tag" style={{ background:`${cat.color}18`, border:`1px solid ${cat.color}44`, color:cat.color }}>{cat.tag}</div>
//                 </div>

//                 <div className="ath-product-card">
//                   <div style={{ background:"linear-gradient(135deg,#fffbeb,#fef3c7)", padding:"8px 0" }}>
//                     <cat.Icon/>
//                   </div>
//                   <div style={{ padding:"32px 36px" }}>
//                     <div className="ath-tag" style={{ background:`${cat.color}12`, border:`1.5px solid ${cat.color}33`, color:cat.color, marginBottom:16 }}>
//                       <Thermometer size={10}/> {cat.tag}
//                     </div>
//                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 20px", marginBottom:20 }}>
//                       {cat.points.map(p=>(
//                         <div key={p} className="ath-bullet">
//                           <CheckCircle2 size={14} style={{ color:cat.color, flexShrink:0, marginTop:1 }}/>
//                           {p}
//                         </div>
//                       ))}
//                     </div>
//                     <div style={{ display:"flex", alignItems:"center", gap:10, borderRadius:12, padding:"10px 16px", marginBottom:20, background:`${cat.color}08`, border:`1px solid ${cat.color}22`, fontSize:12.5, fontWeight:600, color:"#334155" }}>
//                       <Zap size={13} style={{ color:cat.color, flexShrink:0 }}/>
//                       <span><strong style={{ color:cat.color }}>Typical use:</strong> {cat.use}</span>
//                     </div>
//                     <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
//                       <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:7, background:cat.bg, color:"#fff", fontWeight:700, fontSize:13.5, padding:"10px 20px", borderRadius:10, textDecoration:"none", boxShadow:`0 4px 14px ${cat.color}40` }}>
//                         Get a Quote <ArrowRight size={14}/>
//                       </Link>
//                       <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#fff", border:`1.5px solid ${cat.color}44`, color:cat.color, fontWeight:600, fontSize:13.5, padding:"10px 20px", borderRadius:10, textDecoration:"none" }}>
//                         Request Demo
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <hr className="ath-divider"/>

//       {/* ─── AUTOMATION FEATURES + INSTALL ─── */}
//       <section className="ath-section" style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)" }}>
//         <div className="ath-inner">
//           <div style={{ textAlign:"center", marginBottom:40 }}>
//             <div className="ath-section-badge" style={{ margin:"0 auto 12px" }}><Zap size={11}/> Fixed & Automated Systems</div>
//             <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:10 }}>
//               Continuous Monitoring — Built Around Your Process
//             </h2>
//             <p style={{ fontSize:15, color:"#64748b", maxWidth:540, margin:"0 auto" }}>
//               Bespoke fixed camera systems engineered for your exact application — from kiln shells to electrical sub-stations.
//             </p>
//           </div>
//           <div className="ath-two-col">
//             <div ref={refFeat} className="fu">
//               {automationFeatures.map(f=>(
//                 <div key={f.title} className="ath-feature">
//                   <div className="ath-feat-icon">{f.icon}</div>
//                   <div>
//                     <p style={{ fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:3 }}>{f.title}</p>
//                     <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{f.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div ref={refInst} className="fu">
//               <div className="ath-svg-label" style={{ marginBottom:10 }}><Monitor size={11}/> Multi-Camera Dashboard Platform</div>
//               <div className="ath-photo-card" style={{ marginBottom:20 }}>
//                 <ImgFallback src={dashboardImg} alt="Thermal monitoring dashboard" style={{ width:"100%", height:220, objectFit:"cover", display:"block" }} height={220} bg="#fef3c7"/>
//               </div>
//               <div className="ath-svg-label" style={{ marginBottom:10 }}><Thermometer size={11}/> Fixed IR Camera Installation</div>
//               <div className="ath-photo-card">
//                 <ImgFallback src={installImg} alt="Thermal camera installation" style={{ width:"100%", height:190, objectFit:"cover", display:"block" }} height={190} bg="#fff7ed"/>
//               </div>
//               <div className="ath-install-chips">
//                 {["📡 Fixed Mounted","⚙️ PLC Integration","🔔 Auto Alerts","🌐 Remote Access"].map(t=>(
//                   <div key={t} className="ath-install-chip">{t}</div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <hr className="ath-divider"/>

//       {/* ─── APPLICATIONS ─── */}
//       <section className="ath-section" style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)" }}>
//         <div className="ath-inner">
//           <div ref={refApps} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
//             <div className="ath-section-badge" style={{ margin:"0 auto 12px" }}><Factory size={11}/> Applications</div>
//             <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>Where We Deploy Thermal Monitoring</h2>
//             <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>Trusted across heavy industry for continuous thermal protection of the most critical assets and processes.</p>
//           </div>
//           <div className="ath-pill-list">
//             {["HT Electrical Sub Station","Coal Pile Monitoring","Waste Bunker Monitoring","Critical Machine Monitoring","Kiln Shell Monitoring","Ladle Monitoring","Metal Casting Process","Critical Production Monitoring","Overhead Equipment Monitoring","Food Processing & Packaging"].map(a=>(
//               <span key={a} className="ath-app-pill"><span className="ath-app-dot"/>{a}</span>
//             ))}
//           </div>
//           <div className="ath-app-grid">
//             {appCards.map((item,i)=>(
//               <div ref={appRefs[i]} key={item.title} className="ath-app-card fu">
//                 <ImgFallback src={item.img} alt={item.title} style={{ width:"100%", height:180, objectFit:"cover", display:"block" }} height={180} bg="#fef3c7"/>
//                 <div style={{ padding:"18px 20px" }}>
//                   <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8 }}>
//                     <div style={{ width:32, height:32, borderRadius:8, background:"rgba(245,158,11,0.10)", display:"flex", alignItems:"center", justifyContent:"center", color:"#f59e0b" }}>{item.icon}</div>
//                     <h3 style={{ fontSize:15, fontWeight:700, color:"#0f1117" }}>{item.title}</h3>
//                   </div>
//                   <p style={{ fontSize:13.5, color:"#64748b", lineHeight:1.65 }}>{item.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <hr className="ath-divider"/>

//       {/* ─── INTEGRATION ─── */}
//       <section className="ath-section" style={{ background:"#fffbeb" }}>
//         <div className="ath-inner">
//           <div ref={refInt} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
//             <div className="ath-section-badge" style={{ margin:"0 auto 12px" }}><Zap size={11}/> Integration</div>
//             <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>Seamlessly Integrates with Your Plant Systems</h2>
//             <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>Connects directly to your existing control infrastructure — no rip-and-replace required.</p>
//           </div>
//           <div className="ath-int-grid">
//             {[
//               {label:"PLC Integration",      icon:<Zap size={18}/>,     desc:"Direct alarm relays and digital I/O to any PLC platform.",                  color:"#f59e0b"},
//               {label:"SCADA / DCS (Modbus)", icon:<Monitor size={18}/>,  desc:"Modbus TCP/RTU and OPC-UA for real-time data to your SCADA system.",        color:"#3b82f6"},
//               {label:"Email & SMS Alerts",   icon:<Bell size={18}/>,     desc:"Instant multi-recipient alerts triggered by temperature thresholds.",        color:"#ef4444"},
//               {label:"Remote Web Dashboard", icon:<Activity size={18}/>, desc:"Secure web access from any device — anywhere, anytime.",                    color:"#22c55e"},
//             ].map((item,i)=>(
//               <div key={item.label} ref={intRefs[i]} className="fu" style={{ background:"#fff", border:`1px solid ${item.color}22`, borderLeft:`4px solid ${item.color}`, borderRadius:14, padding:"20px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
//                 <div style={{ width:40, height:40, borderRadius:10, background:`${item.color}18`, display:"flex", alignItems:"center", justifyContent:"center", color:item.color, marginBottom:12 }}>{item.icon}</div>
//                 <h4 style={{ fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:5 }}>{item.label}</h4>
//                 <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <hr className="ath-divider"/>

//       {/* ─── WHY INVEST ─── */}
//       <section className="ath-section" style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)" }}>
//         <div className="ath-inner">
//           <div ref={refWhy} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
//             <div className="ath-section-badge" style={{ margin:"0 auto 12px" }}><Shield size={11}/> Business Case</div>
//             <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>Why Continuous Thermal Monitoring Pays for Itself</h2>
//           </div>
//           <div className="ath-why-grid">
//             {whyChoose.map((item,i)=>(
//               <div key={item.label} ref={whyRefs[i]} className="fu" style={{ display:"flex", gap:14, alignItems:"flex-start", background:"#fff", border:"1px solid #eef0f4", borderLeft:`4px solid ${item.color}`, borderRadius:14, padding:"18px 20px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
//                 <div style={{ width:34, height:34, borderRadius:9, background:`${item.color}18`, display:"flex", alignItems:"center", justifyContent:"center", color:item.color, flexShrink:0 }}>{item.icon}</div>
//                 <div>
//                   <h4 style={{ fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:4 }}>{item.label}</h4>
//                   <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{item.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── CTA ─── */}
//       <section className="ath-cta" style={{ padding:"72px 28px", textAlign:"center" }}>
//         <div className="ath-cta-burst"/>
//         <div style={{ position:"relative", maxWidth:620, margin:"0 auto" }}>
//           <h2 style={{ fontSize:"clamp(24px,3.5vw,38px)", fontWeight:800, color:"#fff", marginBottom:14 }}>
//             Ready to Deploy Thermal Intelligence?
//           </h2>
//           <p style={{ fontSize:16, color:"rgba(255,255,255,.88)", lineHeight:1.7, marginBottom:32 }}>
//             Our thermal imaging specialists will assess your application and recommend the right product and system design for your requirements and budget.
//           </p>
//           <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
//             <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", color:"#b45309", fontWeight:700, fontSize:15, padding:"14px 32px", borderRadius:12, textDecoration:"none", boxShadow:"0 4px 20px rgba(0,0,0,.15)" }}>
//               Talk to a Specialist <ArrowRight size={16}/>
//             </Link>
//             <Link to="/products" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.15)", color:"#fff", fontWeight:500, fontSize:15, padding:"14px 28px", borderRadius:12, textDecoration:"none", border:"1px solid rgba(255,255,255,.30)" }}>
//               View All Products
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, CheckCircle2, ChevronRight,
  Thermometer, Bell, Activity, Monitor,
  Factory, Flame, Building2, TrendingDown, Shield,
} from "lucide-react";
import heroBg      from "@/assets/hero-bg.jpg";
import dashboardImg from "@/assets/products/thermal2.jpg";
import installImg   from "@/assets/products/thermal3.png";
import appImg1      from "@/assets/products/thermal4.jpg";
import appImg2      from "@/assets/products/thermal6.jpg";
import appImg3      from "@/assets/products/thermal7.jpg";

/* ── Real product photos (place files in @/assets/products/) ── */
import camBasic    from "@/assets/thermalCam4.jpg";   /* red/black handheld    → A */
import camAdvanced from "@/assets/thermalCam3.jpg";   /* yellow handheld in use → B */
import camFixed    from "@/assets/thermalCam1.webp";  /* silver fixed camera   → C */
import camAuto     from "@/assets/thermalCam2.jpg";   /* silver cube camera    → D */

/* ─── useFU ─── */
const useFU = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("vis"), delay); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
};

const ImgFallback = ({
  src, alt, style = {}, height = 200, bg = "#fff7ed",
  icon = <Thermometer size={28} color="#f59e0b" />,
}: {
  src: string; alt: string; style?: React.CSSProperties;
  height?: number; bg?: string; icon?: React.ReactNode;
}) => {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div style={{ height, background:bg, display:"flex", alignItems:"center", justifyContent:"center", ...style }}>{icon}</div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ═══════════════════════════════════════
   PRODUCT PHOTO with logo masking
   Each camera image has branding/text
   that needs to be hidden neutrally.
═══════════════════════════════════════ */

/**
 * Renders a product photo in a clean, neutral frame.
 * `covers` is an array of {top,left,width,height,bg} rectangles
 * that are placed on top of logo / branding areas.
 */
interface CoverRect {
  top?: string; bottom?: string;
  left?: string; right?: string;
  width: string; height: string;
  bg?: string;
  blur?: boolean;
}

const ProductPhoto = ({
  src, alt, covers = [], imgStyle = {},
}: {
  src: string; alt: string;
  covers?: CoverRect[];
  imgStyle?: React.CSSProperties;
}) => {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{ position:"relative", width:"100%", height:"100%", overflow:"hidden",
                  background:"linear-gradient(135deg,#f8fafc,#f1f5f9)" }}>
      {failed ? (
        <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center",
                      justifyContent:"center", background:"linear-gradient(135deg,#fffbeb,#fef3c7)" }}>
          <Thermometer size={36} color="#f59e0b" opacity={0.4}/>
        </div>
      ) : (
        <img
          src={src} alt={alt}
          onError={() => setFailed(true)}
          style={{
            width:"100%", height:"100%",
            objectFit:"contain", objectPosition:"center",
            padding:"24px",
            filter:"none",
            ...imgStyle,
          }}
        />
      )}

      {/* Logo / branding covers — neutral colour-matched rectangles */}
      {!failed && covers.map((c, i) => (
        <div
          key={i}
          style={{
            position:"absolute",
            top: c.top, bottom: c.bottom,
            left: c.left, right: c.right,
            width: c.width, height: c.height,
            background: c.bg ?? "transparent",
            backdropFilter: c.blur ? "blur(6px)" : undefined,
            borderRadius: 4,
            pointerEvents:"none",
            zIndex: 2,
          }}
        />
      ))}

      {/* Subtle bottom-edge vignette for polish */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"20%",
                    background:"linear-gradient(to top,rgba(241,245,249,0.5),transparent)",
                    pointerEvents:"none", zIndex:1 }}/>
    </div>
  );
};

/* ═══════════════════════════════════════
   SVG DIAGRAMS (hero + how-it-works)
═══════════════════════════════════════ */
const ThermalSystemSVG = () => (
  <svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:20 }}>
    <defs>
      <linearGradient id="ts-bg"  x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      <linearGradient id="ts-cam" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
      <radialGradient id="ts-heat" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.4"/><stop offset="60%" stopColor="#f97316" stopOpacity="0.2"/><stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/></radialGradient>
      <filter id="ts-glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <marker id="ts-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/></marker>
    </defs>
    <rect width="520" height="400" rx="20" fill="url(#ts-bg)"/>
    <rect x="24" y="120" width="140" height="160" rx="16" fill="#fff" stroke="#eef0f4" strokeWidth="2" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.08))" }}/>
    <text x="94" y="148" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle">INDUSTRIAL</text>
    <text x="94" y="162" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle">EQUIPMENT</text>
    <ellipse cx="94" cy="210" rx="38" ry="38" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
    <ellipse cx="94" cy="210" rx="24" ry="24" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5"/>
    <ellipse cx="94" cy="210" rx="10" ry="10" fill="url(#ts-cam)" opacity="0.5"/>
    <ellipse cx="94" cy="210" rx="52" ry="52" fill="url(#ts-heat)">
      <animate attributeName="rx" values="52;60;52" dur="2.5s" repeatCount="indefinite"/>
      <animate attributeName="ry" values="52;60;52" dur="2.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite"/>
    </ellipse>
    <circle cx="112" cy="192" r="8" fill="#ef4444" style={{ filter:"url(#ts-glow)" }}>
      <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <text x="94" y="264" fill="#ef4444" fontSize="8" fontWeight="700" textAnchor="middle">⚠ HOTSPOT DETECTED</text>
    <text x="94" y="276" fill="#f97316" fontSize="8" textAnchor="middle">Temp: 186°C — ALERT</text>
    <rect x="196" y="158" width="88" height="60" rx="12" fill="url(#ts-cam)" style={{ filter:"drop-shadow(0 6px 20px rgba(245,158,11,0.45))" }}/>
    <rect x="204" y="166" width="52" height="36" rx="8" fill="rgba(255,255,255,0.20)"/>
    <circle cx="230" cy="184" r="13" fill="rgba(0,0,0,0.30)"/>
    <circle cx="230" cy="184" r="9"  fill="rgba(0,0,0,0.50)"/>
    <circle cx="230" cy="184" r="5"  fill="#0ea5e9" opacity="0.6"/>
    <circle cx="227" cy="181" r="2"  fill="rgba(255,255,255,0.6)"/>
    <text x="240" y="232" fill="#b45309" fontSize="8.5" fontWeight="700" textAnchor="middle">IR THERMAL CAMERA</text>
    <text x="240" y="245" fill="#64748b" fontSize="7.5" textAnchor="middle">Fixed Mounted · 24/7</text>
    <line x1="196" y1="188" x2="168" y2="188" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3"/>
    <polygon points="170,183 170,193 160,188" fill="#f59e0b" opacity="0.6"/>
    <line x1="288" y1="188" x2="332" y2="188" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#ts-arr)"/>
    <text x="310" y="181" fill="#b45309" fontSize="7.5" textAnchor="middle" fontWeight="600">Ethernet</text>
    <rect x="334" y="136" width="120" height="104" rx="14" fill="#fff" stroke="rgba(245,158,11,0.28)" strokeWidth="2" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.08))" }}/>
    <rect x="344" y="148" width="100" height="64" rx="8" fill="#0f172a"/>
    {[[0,"#ef4444",0.9],[1,"#f97316",0.7],[2,"#f59e0b",0.5],[3,"#22c55e",0.3],[4,"#3b82f6",0.2]].map(([i,c,o])=>(
      <ellipse key={String(i)} cx="394" cy="180" rx={String(8+Number(i)*8)} ry={String(5+Number(i)*5)} fill={String(c)} opacity={Number(o)}/>
    ))}
    <text x="394" y="220" fill="#334155" fontSize="8.5" fontWeight="700" textAnchor="middle">PROCESSING UNIT</text>
    <text x="394" y="233" fill="#64748b" fontSize="7.5" textAnchor="middle">Multi-Camera Platform</text>
    <line x1="394" y1="240" x2="394" y2="276" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ts-arr)"/>
    {[
      {x:280,emoji:"🔔",label:"SMS Alert"},{x:356,emoji:"📧",label:"Email"},
      {x:432,emoji:"📱",label:"Dashboard"},{x:496,emoji:"🖥",label:"SCADA"},
    ].map(o=>(
      <g key={o.label}>
        <rect x={o.x-30} y="284" width="60" height="50" rx="12" fill="#fff" stroke="rgba(245,158,11,0.25)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
        <text x={o.x} y="308" fontSize="16" textAnchor="middle">{o.emoji}</text>
        <text x={o.x} y="326" fill="#334155" fontSize="8.5" fontWeight="700" textAnchor="middle">{o.label}</text>
      </g>
    ))}
    <circle cx="30" cy="30" r="7" fill="#22c55e">
      <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <text x="44" y="35" fill="#22c55e" fontSize="9.5" fontWeight="700">SYSTEM LIVE · 24/7 Monitoring Active</text>
  </svg>
);

const HowItWorksSVG = () => (
  <svg viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
    <defs>
      <linearGradient id="hw-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      <marker id="hw-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/></marker>
    </defs>
    <rect width="760" height="230" rx="16" fill="url(#hw-bg)"/>
    <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">How the Thermal Monitoring System Works</text>
    {[
      {x:18,  color:"#f59e0b", step:"STEP 01", emoji:"📷", t1:"IR Camera",   t2:"Captures Image",  d1:"Continuous thermal",  d2:"image stream, 24/7"},
      {x:200, color:"#ea580c", step:"STEP 02", emoji:"🧠", t1:"AI Software", t2:"Analyses Data",   d1:"Real-time temp",      d2:"comparison & trending"},
      {x:382, color:"#ef4444", step:"STEP 03", emoji:"⚠️", t1:"Hotspot",     t2:"Detected",        d1:"Threshold breached,", d2:"alarm triggered"},
      {x:564, color:"#22c55e", step:"STEP 04", emoji:"🔔", t1:"Alert Sent",  t2:"Instantly",       d1:"SMS, Email, PLC,",    d2:"SCADA notified", wide:true},
    ].map((s,i)=>(
      <g key={s.step}>
        <rect x={s.x} y="42" width={s.wide?178:158} height="172" rx="16" fill="#fff" stroke={`${s.color}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.07))" }}/>
        <rect x={s.x} y="42" width={s.wide?178:158} height="32" rx="16" fill={s.color} opacity="0.12"/>
        <rect x={s.x} y="58" width={s.wide?178:158} height="16" fill={s.color} opacity="0.12"/>
        <text x={s.x+(s.wide?89:79)} y="62"  fill={s.color} fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.08em">{s.step}</text>
        <text x={s.x+(s.wide?89:79)} y="110" fontSize="32" textAnchor="middle">{s.emoji}</text>
        <text x={s.x+(s.wide?89:79)} y="140" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">{s.t1}</text>
        <text x={s.x+(s.wide?89:79)} y="156" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">{s.t2}</text>
        <text x={s.x+(s.wide?89:79)} y="176" fill="#64748b" fontSize="10" textAnchor="middle">{s.d1}</text>
        <text x={s.x+(s.wide?89:79)} y="189" fill="#64748b" fontSize="10" textAnchor="middle">{s.d2}</text>
        {i < 3 && <line x1={s.x+(s.wide?178:158)} y1="128" x2={s.x+(s.wide?198:180)} y2="128" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#hw-arr)"/>}
      </g>
    ))}
  </svg>
);

/* ═══════════════════════════════════════
   DATA — real images + targeted logo covers
   Cover rects use percentages relative to
   the image container for responsiveness.
═══════════════════════════════════════ */
const categories = [
  {
    id:"a", label:"A", tag:"Entry Level",
    title:"Basic Handheld IR Thermography Devices",
    color:"#f59e0b", bg:"linear-gradient(135deg,#f59e0b,#d97706)",
    /* thermalCam4.jpg — red/black pistol-grip handheld, white background.
       Small brand text near top of handle — covered with white rect.       */
    photo: camFixed,
    photoCovers: [
      { top:"4%", left:"4%", width:"28%", height:"8%", bg:"#ffffff" }, // top-left brand text
    ] as CoverRect[],
    points:["Spot temperature measurement","160×120 IR resolution","–20°C to 650°C range","Built-in laser pointer","Rugged handheld design","Data logging & report export"],
    use:"Electrical panels · HVAC · Predictive maintenance",
  },
  {
    id:"b", label:"B", tag:"Professional",
    title:"Advanced Handheld IR Thermography Devices",
    color:"#ea580c", bg:"linear-gradient(135deg,#ea580c,#c2410c)",
    /* thermalCam3.jpg — yellow handheld in field use, dark industrial background.
       Fluke branding on the body — covered with a blur-darkened overlay.    */
    photo: camAuto,
    photoCovers: [
      { top:"46%", left:"36%", width:"22%", height:"9%", bg:"rgba(40,30,20,0.82)", blur:true }, // brand on body
    ] as CoverRect[],
    imgStyle: { objectFit:"cover" as const, padding:"0px", objectPosition:"center" },
    points:["Up to 640×480 resolution","NETD ≤ 0.04°C sensitivity","–40°C to 2000°C range","Fusion visual + thermal image","Wi-Fi, Bluetooth & USB-C","Advanced analytics software"],
    use:"Mechanical inspection · R&D · High-precision surveys",
  },
  {
    id:"c", label:"C", tag:"Permanent Monitoring",
    title:"Fixed Thermal Imaging Cameras",
    color:"#f97316", bg:"linear-gradient(135deg,#f97316,#ea580c)",
    /* thermalCam1.webp — silver fixed camera with thermal preview, dark bg.
       Brand name on camera front face — covered with grey to match chassis.  */
    photo: camAdvanced,
    photoCovers: [
      { top:"54%", right:"6%", width:"22%", height:"7%", bg:"rgba(185,185,185,0.92)" }, // brand on camera face
      { bottom:"4%", left:"4%", width:"30%", height:"8%", bg:"rgba(185,185,185,0.92)" }, // text label at base
    ] as CoverRect[],
    imgStyle: { padding:"16px" as const },
    points:["24/7 continuous monitoring","IP67 weatherproof housing","Ethernet / Modbus TCP output","Configurable alarm zones","Remote access via web","No operator intervention"],
    use:"Kilns · Sub-stations · Coal piles · Conveyor systems",
  },
  {
    id:"d", label:"D", tag:"Automation & Control",
    title:"Thermal Automation Cameras",
    color:"#ef4444", bg:"linear-gradient(135deg,#ef4444,#ea580c)",
    /* thermalCam2.jpg — silver cube/box camera, pure white background.
       "IRtech" text on bottom-left of camera body — covered with white rect. */
    photo: camBasic,
    photoCovers: [
      { bottom:"18%", left:"18%", width:"26%", height:"8%", bg:"#ffffff" }, // IRtech logo on body
    ] as CoverRect[],
    points:["PLC / SCADA / DCS integration","Relay & digital I/O outputs","Modbus RTU/TCP + OPC-UA","Multi-zone alarm management","Edge processing on-board","Compact industrial housing"],
    use:"Process control · Production lines · Safety interlocks",
  },
];

const heroStats = [
  {num:"4",    label:"Product families"},
  {num:"24/7", label:"Monitoring capable"},
  {num:"±1°C", label:"Measurement accuracy"},
  {num:"IP67", label:"Industrial rated"},
];

const automationFeatures = [
  {icon:<Monitor size={17}/>,      title:"Customised IR Thermal Monitoring & Automation",  desc:"Bespoke fixed thermal camera systems designed and configured specifically for your process requirements."},
  {icon:<Activity size={17}/>,     title:"24/7 Real-Time Temperature Surveillance",         desc:"Continuous automated monitoring with instant detection of temperature anomalies as they develop."},
  {icon:<Bell size={17}/>,         title:"Custom Alarm & Email / SMS Alerts",               desc:"Configurable multi-level alarm thresholds with automated email and SMS notifications to operators."},
  {icon:<Zap size={17}/>,          title:"Integrates with PLC, SCADA, DCS & BMS",          desc:"Compatible with all major control platforms via Modbus TCP/RTU, OPC-UA, Ethernet or relay outputs."},
  {icon:<TrendingDown size={17}/>, title:"Data-Driven Proactive Maintenance Analytics",     desc:"Historical temperature trending and analytics that reduce unplanned downtime and extend equipment life."},
];

const appCards = [
  {icon:<Flame size={19}/>,    title:"Kiln Shell & Metal Casting",  desc:"Real-time shell temperature mapping on cement kilns and ladle thermal monitoring in steel foundries.",          img:appImg1},
  {icon:<Factory size={19}/>,  title:"Coal Pile & HT Sub-Station",  desc:"Automated thermal surveillance of coal stockpiles and HT electrical switchyard equipment — 24/7.",            img:appImg2},
  {icon:<Building2 size={19}/>,title:"Critical Machinery",          desc:"Continuous motor, drive and critical production line monitoring — detecting overheating before failure occurs.", img:appImg3},
];

const whyChoose = [
  {icon:<TrendingDown size={16}/>,label:"Prevent Catastrophic Failures",   desc:"Detect hotspots hours before they cause damage — saving equipment, product and production time.",  color:"#f59e0b"},
  {icon:<Flame size={16}/>,       label:"Eliminate Fire Risk",              desc:"24/7 thermal surveillance of coal piles, bunkers and fire-sensitive areas prevents disasters.",       color:"#ef4444"},
  {icon:<Shield size={16}/>,      label:"Protect Electrical Infrastructure",desc:"Continuous sub-station and OHE monitoring prevents costly outages and arc-flash incidents.",         color:"#3b82f6"},
  {icon:<CheckCircle2 size={16}/>,label:"Reduce Maintenance Costs",         desc:"Data-driven analytics replace reactive maintenance with planned, targeted interventions.",             color:"#22c55e"},
];

/* ═══════════════════════════════════════
   CSS
═══════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  .ath { font-family:'Roboto',sans-serif; color:#1e293b; }
  .ath * { box-sizing:border-box; margin:0; padding:0; }

  .fu { opacity:0; transform:translateY(22px); transition:opacity .55s ease,transform .55s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }

  /* Hero */
  .ath-hero { position:relative; overflow:hidden; min-height:100svh; display:flex; align-items:center; }
  .ath-hero-photo  { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
  .ath-hero-wash   { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,.90) 0%,rgba(224,242,254,.82) 55%,rgba(255,251,235,.90) 100%); }
  .ath-hero-dots   { position:absolute; inset:0; opacity:.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .ath-hero-burst  { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,.26) 0%,rgba(251,191,36,.09) 40%,transparent 70%); top:-15%; left:-8%; }
  .ath-hero-sky    { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,.20) 0%,rgba(56,189,248,.06) 45%,transparent 70%); bottom:-15%; right:-5%; }
  .ath-hero-inner  { position:relative; max-width:1280px; margin:0 auto; padding:80px 28px 72px; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
  @media(max-width:900px){ .ath-hero-inner{ grid-template-columns:1fr; gap:32px; padding:56px 20px 48px; } }

  @keyframes ath-fadein  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ath-flicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1} 20%,24%,55%{opacity:.3} }
  .ath-flicker { animation:ath-fadein 1.4s ease .3s both,ath-flicker 4s ease-in-out 2s infinite; font-size:clamp(12px,1.1vw,15px); font-weight:600; background:linear-gradient(90deg,#f59e0b,#ea580c); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:block; margin-top:10px; margin-bottom:18px; }

  .ath-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
  .ath-bread a { font-size:12px; color:#64748b; text-decoration:none; } .ath-bread a:hover { color:#f59e0b; }

  .ath-badge         { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:18px; }
  .ath-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,.08); border:1px solid rgba(245,158,11,.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }

  .ath-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:28px; }
  @media(max-width:640px){ .ath-stats-grid{ grid-template-columns:repeat(2,1fr); } }
  .ath-stat { background:rgba(255,255,255,.82); border:1px solid rgba(245,158,11,.28); border-radius:14px; padding:12px 16px; backdrop-filter:blur(10px); }
  .ath-stat-num { font-size:22px; font-weight:900; color:#ea580c; line-height:1; }
  .ath-stat-label { font-size:10px; color:#64748b; font-weight:500; margin-top:3px; }

  .ath-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:14px; font-weight:700; padding:13px 26px; border-radius:12px; text-decoration:none; transition:transform .15s,box-shadow .2s; box-shadow:0 4px 20px rgba(245,158,11,.38); white-space:nowrap; }
  .ath-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,.52); }
  .ath-btn-ghost   { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,.72); backdrop-filter:blur(8px); color:#334155; font-size:14px; font-weight:500; padding:13px 24px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,.25); transition:border-color .2s,background .2s; white-space:nowrap; }
  .ath-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  .ath-section { padding:72px 28px; }
  @media(max-width:640px){ .ath-section{ padding:48px 16px; } }
  .ath-inner { max-width:1280px; margin:0 auto; }

  .ath-svg-card { border-radius:20px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,.09); border:1px solid rgba(245,158,11,.14); transition:transform .3s,box-shadow .3s; }
  .ath-svg-card:hover { transform:translateY(-5px) scale(1.005); box-shadow:0 20px 56px rgba(0,0,0,.14); }
  .ath-svg-label { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,.10); border:1px solid rgba(245,158,11,.25); color:#b45309; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; padding:5px 12px; border-radius:999px; margin-bottom:10px; }

  /* ── Product photo panel ── */
  .ath-photo-panel {
    position:relative; overflow:hidden;
    border-radius:20px 0 0 20px;
    background:#f8fafc;
    border-right:1px solid #eef0f4;
    min-height:340px;
    /* hover: subtle scale on the img inside */
  }
  .ath-photo-panel img { transition:transform 0.5s ease; }
  .ath-product-card:hover .ath-photo-panel img { transform:scale(1.04); }
  @media(max-width:860px){ .ath-photo-panel{ border-radius:20px 20px 0 0; border-right:none; border-bottom:1px solid #eef0f4; min-height:260px; } }

  /* Product card */
  .ath-product-card { background:#fff; border:1px solid #eef0f4; border-radius:20px; overflow:hidden; transition:box-shadow .25s,transform .25s,border-color .25s; box-shadow:0 4px 20px rgba(0,0,0,.06); display:grid; grid-template-columns:1fr 1fr; align-items:stretch; }
  @media(max-width:860px){ .ath-product-card{ grid-template-columns:1fr; } }
  .ath-product-card:hover { box-shadow:0 16px 48px rgba(0,0,0,.12); transform:translateY(-4px); border-color:rgba(245,158,11,.25); }

  /* Amber left accent bar on product card */
  .ath-product-card::before { content:''; position:absolute; }

  .ath-tag    { display:inline-flex; align-items:center; gap:6px; border-radius:999px; padding:5px 14px; font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; }
  .ath-bullet { display:flex; align-items:flex-start; gap:9px; margin-bottom:9px; font-size:13.5px; color:#334155; line-height:1.55; }

  .ath-feature { display:flex; gap:12px; align-items:flex-start; padding:14px 0; border-bottom:1px solid #f1f5f9; }
  .ath-feature:last-child { border-bottom:none; }
  .ath-feat-icon { width:36px; height:36px; border-radius:10px; background:rgba(245,158,11,.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; flex-shrink:0; }

  .ath-app-card { background:#fff; border:1px solid #eef0f4; border-radius:16px; overflow:hidden; transition:box-shadow .22s,border-color .22s,transform .22s; position:relative; }
  .ath-app-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,#ea580c); opacity:0; transition:opacity .2s; }
  .ath-app-card:hover { box-shadow:0 12px 36px rgba(0,0,0,.10); border-color:rgba(245,158,11,.28); transform:translateY(-5px); }
  .ath-app-card:hover::before { opacity:1; }

  .ath-app-pill { display:inline-flex; align-items:center; gap:7px; background:#fff; border:1px solid rgba(245,158,11,.20); border-radius:10px; padding:8px 14px; font-size:13px; color:#334155; font-weight:500; }
  .ath-app-dot  { width:6px; height:6px; border-radius:50%; background:linear-gradient(135deg,#f59e0b,#ea580c); flex-shrink:0; }

  .ath-photo-card { border-radius:20px; overflow:hidden; box-shadow:0 16px 48px rgba(0,0,0,.11); border:1px solid #eef0f4; transition:transform .3s,box-shadow .3s; }
  .ath-photo-card:hover { transform:translateY(-5px) scale(1.01); box-shadow:0 24px 64px rgba(0,0,0,.15); }

  .ath-two-col { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }
  @media(max-width:900px){ .ath-two-col{ grid-template-columns:1fr; gap:36px; } }

  .ath-app-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
  .ath-int-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:16px; }
  .ath-why-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:16px; }

  .ath-install-chips { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-top:16px; }
  @media(max-width:640px){ .ath-install-chips{ grid-template-columns:repeat(2,1fr); } }
  .ath-install-chip { display:flex; align-items:center; gap:6px; background:#fff; border:1px solid rgba(245,158,11,.22); border-radius:10px; padding:8px 10px; font-size:12px; font-weight:600; color:#334155; }

  .ath-pill-list { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-bottom:40px; }
  .ath-divider   { width:100%; height:4px; background:linear-gradient(90deg,#f59e0b,#ea580c,#f59e0b); opacity:.16; border:none; margin:0; }

  @keyframes ath-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.6} }
  .ath-live-dot { width:9px; height:9px; border-radius:50%; background:#22c55e; animation:ath-pulse 2s infinite; display:inline-block; margin-right:6px; }

  .ath-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .ath-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }
`;

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
export default function AdvancedThermalHotspotMonitoring() {
  const catRefs  = categories.map((_,i) => useFU(i * 100));
  const appRefs  = appCards.map((_,i)   => useFU(i * 100));
  const whyRefs  = whyChoose.map((_,i)  => useFU(i * 80));
  const intRefs  = [useFU(0), useFU(80), useFU(160), useFU(240)];
  const refHow   = useFU(0);
  const refProd  = useFU(0);
  const refFeat  = useFU(0);
  const refInst  = useFU(100);
  const refApps  = useFU(0);
  const refInt   = useFU(0);
  const refWhy   = useFU(0);

  return (
    <div className="ath">
      <style>{css}</style>

      {/* ─── HERO ─── */}
      <section className="ath-hero">
        <img src={heroBg} alt="" className="ath-hero-photo" aria-hidden="true"/>
        <div className="ath-hero-wash"/><div className="ath-hero-dots"/>
        <div className="ath-hero-burst"/><div className="ath-hero-sky"/>

        <div className="ath-hero-inner">
          <div>
            <div className="ath-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
              <Link to="/products">Products</Link>
              <ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
              <span style={{ fontSize:12, color:"#334155", fontWeight:500 }}>Thermal Cameras & Monitoring</span>
            </div>

            <div className="ath-badge"><Thermometer size={11}/> Infrared Thermography & Automation</div>

            <h1 style={{ fontSize:"clamp(26px,4.5vw,54px)", fontWeight:900, color:"#1e293b", lineHeight:1.05 }}>
              Thermal Cameras &amp;{" "}
              <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Monitoring Solutions
              </span>
            </h1>

            <span className="ath-flicker">🔥 Detect hotspots before they become catastrophic failures</span>

            <p style={{ fontSize:"clamp(14px,1.3vw,16px)", color:"#475569", lineHeight:1.8, marginBottom:10, maxWidth:510 }}>
              A complete thermal imaging range — from handheld spot inspections to{" "}
              <strong style={{ color:"#1e293b" }}>fully automated 24/7 fixed monitoring systems</strong> — engineered for every industrial application.
            </p>
            <p style={{ fontSize:"clamp(14px,1.3vw,16px)", color:"#475569", lineHeight:1.8, marginBottom:24, maxWidth:510 }}>
              Detect hotspots instantly. Send automated alarms. Integrate with your plant control systems —{" "}
              <strong style={{ color:"#1e293b" }}>no rip-and-replace required</strong>.
            </p>

            <div className="ath-stats-grid">
              {heroStats.map(s=>(
                <div key={s.label} className="ath-stat">
                  <div className="ath-stat-num">{s.num}</div>
                  <div className="ath-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Link to="/contact" className="ath-btn-primary">Request a Demo <ArrowRight size={16}/></Link>
              <Link to="/contact" className="ath-btn-ghost">Talk to a Specialist</Link>
            </div>
          </div>

          <div>
            <div className="ath-svg-label"><span className="ath-live-dot"/>Live Thermal Monitoring System</div>
            <div className="ath-svg-card"><ThermalSystemSVG/></div>
          </div>
        </div>
      </section>

      <hr className="ath-divider"/>

      {/* ─── HOW IT WORKS ─── */}
      <section className="ath-section" style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)" }}>
        <div className="ath-inner">
          <div ref={refHow} className="fu" style={{ textAlign:"center", marginBottom:24 }}>
            <div className="ath-section-badge" style={{ margin:"0 auto 12px" }}><Zap size={11}/> Detection Process</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,32px)", fontWeight:800, color:"#0f1117", marginBottom:24 }}>
              From Capture to Alert in Seconds
            </h2>
            <div className="ath-svg-card"><HowItWorksSVG/></div>
          </div>
        </div>
      </section>

      <hr className="ath-divider"/>

      {/* ─── PRODUCT LINE ─── */}
      <section className="ath-section" style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)" }}>
        <div className="ath-inner">
          <div ref={refProd} className="fu" style={{ textAlign:"center", marginBottom:48 }}>
            <div className="ath-section-badge" style={{ margin:"0 auto 12px" }}><Thermometer size={11}/> Product Range</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:10 }}>
              Thermal Camera Product Line
            </h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:540, margin:"0 auto" }}>
              Handheld, portable, fixed and fully automated — our four product families cover every thermal imaging requirement across industrial operations.
            </p>
          </div>

          {/* Summary tabs */}
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center", marginBottom:48 }}>
            {categories.map(c=>(
              <div key={c.id} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:999, border:"1.5px solid #eef0f4", background:"#fff", fontSize:13, fontWeight:700, color:"#64748b", boxShadow:"0 2px 8px rgba(0,0,0,.05)" }}>
                <span style={{ width:22, height:22, borderRadius:999, background:c.bg, display:"inline-flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:11, fontWeight:900, flexShrink:0 }}>{c.label}</span>
                {c.title.split(" ").slice(0,3).join(" ")}
              </div>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
            {categories.map((cat,i)=>(
              <div key={cat.id} ref={catRefs[i]} className="fu">
                {/* Row label */}
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16, flexWrap:"wrap" }}>
                  <div style={{ width:36, height:36, borderRadius:12, background:cat.bg, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:16, fontWeight:900, boxShadow:`0 4px 14px ${cat.color}50`, flexShrink:0 }}>{cat.label}</div>
                  <h3 style={{ fontSize:"clamp(16px,2vw,20px)", fontWeight:800, color:"#0f1117" }}>{cat.title}</h3>
                  <div className="ath-tag" style={{ background:`${cat.color}18`, border:`1px solid ${cat.color}44`, color:cat.color }}>{cat.tag}</div>
                </div>

                <div className="ath-product-card">
                  {/* ── LEFT: real product photo with logo masking ── */}
                  <div className="ath-photo-panel">
                    {/* amber top accent bar */}
                    <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${cat.color},${cat.color}66)`, zIndex:3 }}/>
                    <ProductPhoto
                      src={cat.photo}
                      alt={cat.title}
                      // covers={cat.photoCovers}
                      imgStyle={cat.imgStyle ?? {}}
                    />
                  </div>

                  {/* ── RIGHT: details ── */}
                  <div style={{ padding:"32px 36px" }}>
                    <div className="ath-tag" style={{ background:`${cat.color}12`, border:`1.5px solid ${cat.color}33`, color:cat.color, marginBottom:16 }}>
                      <Thermometer size={10}/> {cat.tag}
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 20px", marginBottom:20 }}>
                      {cat.points.map(p=>(
                        <div key={p} className="ath-bullet">
                          <CheckCircle2 size={14} style={{ color:cat.color, flexShrink:0, marginTop:1 }}/>
                          {p}
                        </div>
                      ))}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:10, borderRadius:12, padding:"10px 16px", marginBottom:20, background:`${cat.color}08`, border:`1px solid ${cat.color}22`, fontSize:12.5, fontWeight:600, color:"#334155" }}>
                      <Zap size={13} style={{ color:cat.color, flexShrink:0 }}/>
                      <span><strong style={{ color:cat.color }}>Typical use:</strong> {cat.use}</span>
                    </div>
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                      <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:7, background:cat.bg, color:"#fff", fontWeight:700, fontSize:13.5, padding:"10px 20px", borderRadius:10, textDecoration:"none", boxShadow:`0 4px 14px ${cat.color}40` }}>
                        Get a Quote <ArrowRight size={14}/>
                      </Link>
                      <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#fff", border:`1.5px solid ${cat.color}44`, color:cat.color, fontWeight:600, fontSize:13.5, padding:"10px 20px", borderRadius:10, textDecoration:"none" }}>
                        Request Demo
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="ath-divider"/>

      {/* ─── AUTOMATION FEATURES + INSTALL ─── */}
      <section className="ath-section" style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)" }}>
        <div className="ath-inner">
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div className="ath-section-badge" style={{ margin:"0 auto 12px" }}><Zap size={11}/> Fixed & Automated Systems</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:10 }}>
              Continuous Monitoring — Built Around Your Process
            </h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:540, margin:"0 auto" }}>
              Bespoke fixed camera systems engineered for your exact application — from kiln shells to electrical sub-stations.
            </p>
          </div>
          <div className="ath-two-col">
            <div ref={refFeat} className="fu">
              {automationFeatures.map(f=>(
                <div key={f.title} className="ath-feature">
                  <div className="ath-feat-icon">{f.icon}</div>
                  <div>
                    <p style={{ fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:3 }}>{f.title}</p>
                    <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div ref={refInst} className="fu">
              <div className="ath-svg-label" style={{ marginBottom:10 }}><Monitor size={11}/> Multi-Camera Dashboard Platform</div>
              <div className="ath-photo-card" style={{ marginBottom:20 }}>
                <ImgFallback src={dashboardImg} alt="Thermal monitoring dashboard" style={{ width:"100%", height:220, objectFit:"cover", display:"block" }} height={220} bg="#fef3c7"/>
              </div>
              <div className="ath-svg-label" style={{ marginBottom:10 }}><Thermometer size={11}/> Fixed IR Camera Installation</div>
              <div className="ath-photo-card">
                <ImgFallback src={installImg} alt="Thermal camera installation" style={{ width:"100%", height:190, objectFit:"cover", display:"block" }} height={190} bg="#fff7ed"/>
              </div>
              <div className="ath-install-chips">
                {["📡 Fixed Mounted","⚙️ PLC Integration","🔔 Auto Alerts","🌐 Remote Access"].map(t=>(
                  <div key={t} className="ath-install-chip">{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="ath-divider"/>

      {/* ─── APPLICATIONS ─── */}
      <section className="ath-section" style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)" }}>
        <div className="ath-inner">
          <div ref={refApps} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
            <div className="ath-section-badge" style={{ margin:"0 auto 12px" }}><Factory size={11}/> Applications</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>Where We Deploy Thermal Monitoring</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>Trusted across heavy industry for continuous thermal protection of the most critical assets and processes.</p>
          </div>
          <div className="ath-pill-list">
            {["HT Electrical Sub Station","Coal Pile Monitoring","Waste Bunker Monitoring","Critical Machine Monitoring","Kiln Shell Monitoring","Ladle Monitoring","Metal Casting Process","Critical Production Monitoring","Overhead Equipment Monitoring","Food Processing & Packaging"].map(a=>(
              <span key={a} className="ath-app-pill"><span className="ath-app-dot"/>{a}</span>
            ))}
          </div>
          <div className="ath-app-grid">
            {appCards.map((item,i)=>(
              <div ref={appRefs[i]} key={item.title} className="ath-app-card fu">
                <ImgFallback src={item.img} alt={item.title} style={{ width:"100%", height:180, objectFit:"cover", display:"block" }} height={180} bg="#fef3c7"/>
                <div style={{ padding:"18px 20px" }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8 }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:"rgba(245,158,11,0.10)", display:"flex", alignItems:"center", justifyContent:"center", color:"#f59e0b" }}>{item.icon}</div>
                    <h3 style={{ fontSize:15, fontWeight:700, color:"#0f1117" }}>{item.title}</h3>
                  </div>
                  <p style={{ fontSize:13.5, color:"#64748b", lineHeight:1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="ath-divider"/>

      {/* ─── INTEGRATION ─── */}
      <section className="ath-section" style={{ background:"#fffbeb" }}>
        <div className="ath-inner">
          <div ref={refInt} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
            <div className="ath-section-badge" style={{ margin:"0 auto 12px" }}><Zap size={11}/> Integration</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>Seamlessly Integrates with Your Plant Systems</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>Connects directly to your existing control infrastructure — no rip-and-replace required.</p>
          </div>
          <div className="ath-int-grid">
            {[
              {label:"PLC Integration",      icon:<Zap size={18}/>,     desc:"Direct alarm relays and digital I/O to any PLC platform.",                  color:"#f59e0b"},
              {label:"SCADA / DCS (Modbus)", icon:<Monitor size={18}/>,  desc:"Modbus TCP/RTU and OPC-UA for real-time data to your SCADA system.",        color:"#3b82f6"},
              {label:"Email & SMS Alerts",   icon:<Bell size={18}/>,     desc:"Instant multi-recipient alerts triggered by temperature thresholds.",        color:"#ef4444"},
              {label:"Remote Web Dashboard", icon:<Activity size={18}/>, desc:"Secure web access from any device — anywhere, anytime.",                    color:"#22c55e"},
            ].map((item,i)=>(
              <div key={item.label} ref={intRefs[i]} className="fu" style={{ background:"#fff", border:`1px solid ${item.color}22`, borderLeft:`4px solid ${item.color}`, borderRadius:14, padding:"20px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ width:40, height:40, borderRadius:10, background:`${item.color}18`, display:"flex", alignItems:"center", justifyContent:"center", color:item.color, marginBottom:12 }}>{item.icon}</div>
                <h4 style={{ fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:5 }}>{item.label}</h4>
                <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="ath-divider"/>

      {/* ─── WHY INVEST ─── */}
      <section className="ath-section" style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)" }}>
        <div className="ath-inner">
          <div ref={refWhy} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
            <div className="ath-section-badge" style={{ margin:"0 auto 12px" }}><Shield size={11}/> Business Case</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>Why Continuous Thermal Monitoring Pays for Itself</h2>
          </div>
          <div className="ath-why-grid">
            {whyChoose.map((item,i)=>(
              <div key={item.label} ref={whyRefs[i]} className="fu" style={{ display:"flex", gap:14, alignItems:"flex-start", background:"#fff", border:"1px solid #eef0f4", borderLeft:`4px solid ${item.color}`, borderRadius:14, padding:"18px 20px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ width:34, height:34, borderRadius:9, background:`${item.color}18`, display:"flex", alignItems:"center", justifyContent:"center", color:item.color, flexShrink:0 }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:4 }}>{item.label}</h4>
                  <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}