/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Thermometer, CheckCircle2, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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

/* ═══════════════════════════════════════════════════════════
   SVG ILLUSTRATIONS — one per category
═══════════════════════════════════════════════════════════ */

/* A — Basic Handheld */
const BasicHandheldSVG = () => (
  <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block" }}>
    <defs>
      <linearGradient id="bh-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      <linearGradient id="bh-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#334155"/><stop offset="100%" stopColor="#1e293b"/></linearGradient>
      <linearGradient id="bh-screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0f172a"/><stop offset="100%" stopColor="#1e293b"/></linearGradient>
      <radialGradient id="bh-hot" cx="40%" cy="40%"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.9"/><stop offset="40%" stopColor="#f97316" stopOpacity="0.7"/><stop offset="70%" stopColor="#f59e0b" stopOpacity="0.4"/><stop offset="100%" stopColor="#22c55e" stopOpacity="0.2"/></radialGradient>
      <filter id="bh-glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="400" height="320" rx="20" fill="url(#bh-bg)"/>

    {/* ── Device body ── */}
    <rect x="130" y="40" width="140" height="210" rx="18" fill="url(#bh-body)" style={{ filter:"drop-shadow(0 12px 32px rgba(0,0,0,0.35))" }}/>
    {/* Screen bezel */}
    <rect x="142" y="52" width="116" height="86" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    {/* Thermal display on screen */}
    <rect x="144" y="54" width="112" height="82" rx="6" fill="url(#bh-screen)"/>
    <ellipse cx="188" cy="82" rx="28" ry="22" fill="#ef4444" opacity="0.75"/>
    <ellipse cx="188" cy="82" rx="18" ry="14" fill="#f97316" opacity="0.8"/>
    <ellipse cx="188" cy="82" rx="10" ry="8"  fill="#fbbf24" opacity="0.9"/>
    <ellipse cx="220" cy="95" rx="18" ry="14" fill="#22c55e" opacity="0.45"/>
    <ellipse cx="245" cy="75" rx="12" ry="10" fill="#3b82f6" opacity="0.4"/>
    {/* Temp readout */}
    <rect x="148" y="116" width="68" height="14" rx="3" fill="rgba(245,158,11,0.20)"/>
    <text x="152" y="127" fill="#fbbf24" fontSize="9" fontWeight="700">247.3 °C  ALERT</text>
    {/* Crosshair */}
    <line x1="185" y1="74" x2="185" y2="90" stroke="#fff" strokeWidth="1" opacity="0.7"/>
    <line x1="178" y1="82" x2="194" y2="82" stroke="#fff" strokeWidth="1" opacity="0.7"/>
    <circle cx="185" cy="82" r="4" fill="none" stroke="#fff" strokeWidth="1" opacity="0.7"/>
    {/* Lens */}
    <circle cx="200" cy="158" r="20" fill="#0a1628" stroke="#475569" strokeWidth="2"/>
    <circle cx="200" cy="158" r="14" fill="#060e1a" stroke="#334155" strokeWidth="1"/>
    <circle cx="200" cy="158" r="8"  fill="#0ea5e9" opacity="0.3"/>
    <circle cx="196" cy="154" r="3"  fill="rgba(255,255,255,0.4)"/>
    {/* Grip */}
    <rect x="155" y="185" width="90" height="50" rx="10" fill="#2d3f57"/>
    {[0,1,2,3,4].map(i=><line key={i} x1="160" y1={193+i*8} x2="240" y2={193+i*8} stroke="#475569" strokeWidth="1"/>)}
    {/* Trigger */}
    <rect x="138" y="205" width="20" height="32" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
    {/* Side buttons */}
    <rect x="268" y="90"  width="6" height="20" rx="3" fill="#475569"/>
    <rect x="268" y="116" width="6" height="14" rx="3" fill="#475569"/>
    {/* USB port */}
    <rect x="183" y="244" width="34" height="6" rx="3" fill="#475569"/>

    {/* ── Spec badges ── */}
    {[
      {x:16,  y:60,  val:"< 0.1°C", label:"Sensitivity", c:"#f59e0b"},
      {x:16,  y:140, val:"160×120", label:"Resolution",  c:"#3b82f6"},
      {x:280, y:60,  val:"-20–650°C",label:"Range",      c:"#ef4444"},
      {x:280, y:140, val:"Non-Contact",label:"Method",   c:"#22c55e"},
    ].map(b=>(
      <g key={b.label}>
        <rect x={b.x} y={b.y} width="96" height="48" rx="12" fill="#fff" stroke={`${b.c}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
        <text x={b.x+48} y={b.y+20} fill={b.c} fontSize="11" fontWeight="900" textAnchor="middle">{b.val}</text>
        <text x={b.x+48} y={b.y+36} fill="#64748b" fontSize="8.5" textAnchor="middle">{b.label}</text>
      </g>
    ))}

    {/* ── Bottom label ── */}
    <rect x="100" y="276" width="200" height="28" rx="14" fill="url(#bh-body)"/>
    <text x="200" y="294" fill="#fbbf24" fontSize="10" fontWeight="700" textAnchor="middle">BASIC HANDHELD IR THERMOGRAPHY</text>
  </svg>
);

/* B — Advanced Handheld */
const AdvancedHandheldSVG = () => (
  <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block" }}>
    <defs>
      <linearGradient id="ah-bg"    x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f0f9ff"/><stop offset="100%" stopColor="#fffbeb"/></linearGradient>
      <linearGradient id="ah-body"  x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e293b"/><stop offset="100%" stopColor="#0f172a"/></linearGradient>
      <linearGradient id="ah-accent" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
    </defs>
    <rect width="400" height="320" rx="20" fill="url(#ah-bg)"/>

    {/* ── Device body (wider, professional) ── */}
    <rect x="100" y="30" width="200" height="230" rx="20" fill="url(#ah-body)" style={{ filter:"drop-shadow(0 16px 40px rgba(0,0,0,0.40))" }}/>
    {/* Amber accent stripe top */}
    <rect x="100" y="30" width="200" height="8" rx="20" fill="url(#ah-accent)"/>
    <rect x="100" y="34" width="200" height="4" fill="url(#ah-accent)"/>

    {/* Large colour touchscreen */}
    <rect x="112" y="46" width="176" height="128" rx="10" fill="#060e1a" stroke="rgba(245,158,11,0.30)" strokeWidth="1.5"/>
    {/* Multi-layer thermal image */}
    <rect x="114" y="48" width="172" height="124" rx="8" fill="#030a12"/>
    {/* Thermal gradient map */}
    {[[86,88,50,44,"#ef4444",0.9],[146,100,38,30,"#f97316",0.75],[180,78,32,26,"#f59e0b",0.7],[114,110,30,24,"#22c55e",0.5],[200,110,26,20,"#3b82f6",0.45],[240,80,20,16,"#22c55e",0.4]].map(([cx,cy,rx,ry,c,o],i)=>(
      <ellipse key={i} cx={Number(cx)} cy={Number(cy)} rx={Number(rx)} ry={Number(ry)} fill={String(c)} opacity={Number(o)}/>
    ))}
    {/* Scale bar */}
    <defs><linearGradient id="ah-scale" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3b82f6"/><stop offset="50%" stopColor="#22c55e"/><stop offset="75%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ef4444"/></linearGradient></defs>
    <rect x="118" y="156" width="80" height="8" rx="4" fill="url(#ah-scale)"/>
    <text x="118" y="174" fill="#64748b" fontSize="7">0°C</text>
    <text x="196" y="174" fill="#ef4444" fontSize="7" textAnchor="end">650°C</text>
    {/* Temp overlay */}
    <rect x="204" y="152" width="76" height="18" rx="4" fill="rgba(245,158,11,0.18)"/>
    <text x="242" y="164" fill="#fbbf24" fontSize="9" fontWeight="700" textAnchor="middle">MAX: 412.7°C</text>
    {/* Crosshair on hotspot */}
    <line x1="83" y1="82" x2="83" y2="96" stroke="#fff" strokeWidth="1.5" opacity="0.8"/>
    <line x1="76" y1="89" x2="90" y2="89" stroke="#fff" strokeWidth="1.5" opacity="0.8"/>
    <circle cx="83" cy="89" r="5" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.8"/>

    {/* Dual lens (visual + thermal) */}
    <g transform="translate(130,196)">
      <circle cx="0" cy="0" r="18" fill="#060e1a" stroke="#f59e0b" strokeWidth="2"/>
      <circle cx="0" cy="0" r="12" fill="#0a1628" stroke="#475569" strokeWidth="1"/>
      <circle cx="0" cy="0" r="6"  fill="#0ea5e9" opacity="0.4"/>
      <circle cx="-4" cy="-4" r="2.5" fill="rgba(255,255,255,0.5)"/>
      <text x="0" y="26" fill="#94a3b8" fontSize="7" textAnchor="middle">IR Lens</text>
    </g>
    <g transform="translate(180,196)">
      <circle cx="0" cy="0" r="14" fill="#060e1a" stroke="#64748b" strokeWidth="1.5"/>
      <circle cx="0" cy="0" r="9"  fill="#0a1628" stroke="#334155" strokeWidth="1"/>
      <circle cx="0" cy="0" r="4"  fill="#94a3b8" opacity="0.3"/>
      <text x="0" y="22" fill="#94a3b8" fontSize="7" textAnchor="middle">Visual</text>
    </g>
    {/* Grip */}
    <rect x="115" y="218" width="170" height="36" rx="10" fill="#172032"/>
    {[0,1,2,3].map(i=><line key={i} x1="120" y1={226+i*7} x2="280" y2={226+i*7} stroke="#2d3f57" strokeWidth="1"/>)}
    {/* Trigger */}
    <rect x="101" y="222" width="16" height="28" rx="7" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
    {/* Wi-Fi badge */}
    <rect x="240" y="42" width="50" height="16" rx="8" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.30)" strokeWidth="1"/>
    <text x="265" y="53" fill="#f59e0b" fontSize="7.5" fontWeight="700" textAnchor="middle">Wi-Fi  BT</text>

    {/* ── Spec badges ── */}
    {[
      {x:8,   y:50,  val:"≤0.04°C", label:"Sensitivity", c:"#f59e0b"},
      {x:8,   y:120, val:"640×480", label:"Resolution",  c:"#3b82f6"},
      {x:308, y:50,  val:"−40–2000°C",label:"Range",     c:"#ef4444"},
      {x:308, y:120, val:"Wi-Fi/BT",   label:"Wireless", c:"#22c55e"},
    ].map(b=>(
      <g key={b.label}>
        <rect x={b.x} y={b.y} width="86" height="46" rx="12" fill="#fff" stroke={`${b.c}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
        <text x={b.x+43} y={b.y+19} fill={b.c} fontSize="10" fontWeight="900" textAnchor="middle">{b.val}</text>
        <text x={b.x+43} y={b.y+34} fill="#64748b" fontSize="8.5" textAnchor="middle">{b.label}</text>
      </g>
    ))}

    <rect x="100" y="276" width="200" height="28" rx="14" fill="url(#ah-body)"/>
    <text x="200" y="294" fill="#fbbf24" fontSize="9.5" fontWeight="700" textAnchor="middle">ADVANCED HANDHELD IR THERMOGRAPHY</text>
  </svg>
);

/* C — Fixed Thermal Imaging Camera */
const FixedCameraSVG = () => (
  <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block" }}>
    <defs>
      <linearGradient id="fc-bg"   x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      <linearGradient id="fc-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#334155"/><stop offset="100%" stopColor="#1e293b"/></linearGradient>
      <linearGradient id="fc-acc"  x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
    </defs>
    <rect width="400" height="320" rx="20" fill="url(#fc-bg)"/>

    {/* ── Mounting bracket ── */}
    <rect x="186" y="40" width="28" height="50" rx="4" fill="#94a3b8"/>
    <rect x="174" y="34" width="52" height="12" rx="6" fill="#64748b"/>
    {[178,200,222].map(x=><circle key={x} cx={x} cy="40" r="3" fill="#475569"/>)}

    {/* ── Camera body ── */}
    <rect x="110" y="88" width="180" height="120" rx="16" fill="url(#fc-body)" style={{ filter:"drop-shadow(0 12px 32px rgba(0,0,0,0.35))" }}/>
    {/* Top accent */}
    <rect x="110" y="88" width="180" height="6" rx="16" fill="url(#fc-acc)"/>
    <rect x="110" y="90" width="180" height="4" fill="url(#fc-acc)"/>

    {/* Front face */}
    {/* Large front lens */}
    <circle cx="190" cy="148" r="36" fill="#0a1628" stroke="rgba(245,158,11,0.40)" strokeWidth="2.5"/>
    <circle cx="190" cy="148" r="28" fill="#060e1a" stroke="#334155" strokeWidth="1.5"/>
    <circle cx="190" cy="148" r="20" fill="#030a12" stroke="#475569" strokeWidth="1"/>
    <circle cx="190" cy="148" r="10" fill="#0ea5e9" opacity="0.25"/>
    <circle cx="183" cy="141" r="5"  fill="rgba(255,255,255,0.35)"/>
    {/* Lens reflections */}
    <circle cx="190" cy="148" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
    <circle cx="190" cy="148" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>

    {/* Status LEDs */}
    <circle cx="130" cy="100" r="5" fill="#22c55e" style={{ filter:"drop-shadow(0 0 4px #22c55e)" }}>
      <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="148" cy="100" r="5" fill="#f59e0b"/>
    <text x="128" y="114" fill="#64748b" fontSize="7">LIVE</text>

    {/* Ethernet port */}
    <rect x="258" y="140" width="22" height="16" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1"/>
    <text x="269" y="162" fill="#94a3b8" fontSize="6.5" textAnchor="middle">LAN</text>

    {/* Power indicator */}
    <rect x="258" y="108" width="20" height="10" rx="3" fill="#1e3a5f"/>
    <rect x="260" y="110" width="12" height="6" rx="2" fill="#22c55e" opacity="0.8"/>

    {/* ── Mounting rail bottom ── */}
    <rect x="126" y="208" width="148" height="14" rx="4" fill="#2d3f57"/>
    {[136,160,184,208,232,256].map(x=><rect key={x} x={x} y="208" width="10" height="14" rx="2" fill="#475569" opacity="0.5"/>)}

    {/* ── Scan beam ── */}
    {[1,2,3].map(i=>(
      <line key={i} x1="156" y1="148" x2={156-i*40} y2={148-i*15} stroke="#f59e0b" strokeWidth={1.5-i*0.3} strokeDasharray="5,3" opacity={0.4-i*0.1}/>
    ))}
    {[1,2,3].map(i=>(
      <line key={i+3} x1="156" y1="148" x2={156-i*40} y2={148+i*15} stroke="#f59e0b" strokeWidth={1.5-i*0.3} strokeDasharray="5,3" opacity={0.4-i*0.1}/>
    ))}

    {/* ── Spec badges ── */}
    {[
      {x:8,   y:90,  val:"IP67",     label:"Protection",  c:"#3b82f6"},
      {x:8,   y:160, val:"-40–2000°C",label:"Range",      c:"#ef4444"},
      {x:308, y:90,  val:"24/7",     label:"Continuous",  c:"#22c55e"},
      {x:308, y:160, val:"Ethernet", label:"Connection",  c:"#f59e0b"},
    ].map(b=>(
      <g key={b.label}>
        <rect x={b.x} y={b.y} width="90" height="48" rx="12" fill="#fff" stroke={`${b.c}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
        <text x={b.x+45} y={b.y+20} fill={b.c} fontSize="12" fontWeight="900" textAnchor="middle">{b.val}</text>
        <text x={b.x+45} y={b.y+36} fill="#64748b" fontSize="8.5" textAnchor="middle">{b.label}</text>
      </g>
    ))}

    {/* ── Deployment scene (small) ── */}
    <rect x="118" y="250" width="164" height="44" rx="12" fill="#fff" stroke="rgba(245,158,11,0.20)" strokeWidth="1"/>
    <text x="170" y="268" fontSize="16">🏭</text>
    <text x="192" y="266" fill="#334155" fontSize="9" fontWeight="700">Permanently Mounted</text>
    <text x="192" y="279" fill="#64748b" fontSize="8.5">Kiln · Sub-Station · Coal Pile</text>

    <rect x="100" y="300" width="200" height="18" rx="9" fill="url(#fc-body)"/>
    <text x="200" y="313" fill="#fbbf24" fontSize="9" fontWeight="700" textAnchor="middle">FIXED THERMAL IMAGING CAMERA</text>
  </svg>
);

/* D — Thermal Automation Camera */
const AutomationCameraSVG = () => (
  <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block" }}>
    <defs>
      <linearGradient id="ac-bg"   x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9"/><stop offset="100%" stopColor="#f0f9ff"/></linearGradient>
      <linearGradient id="ac-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0f172a"/><stop offset="100%" stopColor="#1e293b"/></linearGradient>
      <linearGradient id="ac-acc"  x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ea580c"/><stop offset="100%" stopColor="#f59e0b"/></linearGradient>
      <marker id="ac-arr" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#f59e0b"/></marker>
    </defs>
    <rect width="400" height="320" rx="20" fill="url(#ac-bg)"/>

    {/* ── Compact automation camera body ── */}
    <rect x="138" y="50" width="124" height="110" rx="14" fill="url(#ac-body)" style={{ filter:"drop-shadow(0 10px 28px rgba(0,0,0,0.38))" }}/>
    {/* Accent stripe */}
    <rect x="138" y="50" width="124" height="6" rx="14" fill="url(#ac-acc)"/>
    <rect x="138" y="52" width="124" height="3" fill="url(#ac-acc)"/>

    {/* Lens group — 2 sensors */}
    <circle cx="185" cy="105" r="22" fill="#060e1a" stroke="rgba(234,88,12,0.40)" strokeWidth="2"/>
    <circle cx="185" cy="105" r="15" fill="#030a12" stroke="#334155" strokeWidth="1"/>
    <circle cx="185" cy="105" r="8"  fill="#0ea5e9" opacity="0.3"/>
    <circle cx="180" cy="100" r="3"  fill="rgba(255,255,255,0.45)"/>
    <text x="185" y="136" fill="#64748b" fontSize="7" textAnchor="middle">IR Sensor</text>

    <circle cx="231" cy="105" r="16" fill="#060e1a" stroke="#475569" strokeWidth="1.5"/>
    <circle cx="231" cy="105" r="10" fill="#030a12" stroke="#334155" strokeWidth="1"/>
    <circle cx="231" cy="105" r="5"  fill="#94a3b8" opacity="0.3"/>
    <text x="231" y="130" fill="#64748b" fontSize="7" textAnchor="middle">Visual</text>

    {/* Connectors panel on back */}
    <rect x="148" y="145" width="104" height="12" rx="4" fill="#172032"/>
    {[154,168,182,196,210,224,236].map(x=><rect key={x} x={x} y="147" width="6" height="8" rx="2" fill="#0ea5e9" opacity="0.5"/>)}
    <text x="200" y="166" fill="#64748b" fontSize="7" textAnchor="middle">I/O + Ethernet</text>

    {/* ── System integration diagram ── */}
    {/* Camera → Processing box */}
    <line x1="200" y1="160" x2="200" y2="190" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ac-arr)"/>

    <rect x="136" y="192" width="128" height="44" rx="12" fill="#fff" stroke="rgba(245,158,11,0.30)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.07))" }}/>
    <text x="200" y="210" fill="#0f1117" fontSize="9" fontWeight="700" textAnchor="middle">Edge Processing Unit</text>
    <text x="200" y="224" fill="#64748b" fontSize="8.5" textAnchor="middle">Alarm · Analytics · Control</text>

    {/* Outputs row */}
    <line x1="136" y1="214" x2="80" y2="252" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#ac-arr)"/>
    <line x1="200" y1="236" x2="200" y2="256" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#ac-arr)"/>
    <line x1="264" y1="214" x2="318" y2="252" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#ac-arr)"/>

    {/* Output nodes */}
    {[
      {x:50,  y:254, emoji:"⚙️", label:"PLC",      border:"rgba(59,130,246,0.28)"},
      {x:166, y:258, emoji:"🔔", label:"Alarm",    border:"rgba(239,68,68,0.28)"},
      {x:284, y:254, emoji:"🌐", label:"Dashboard",border:"rgba(34,197,94,0.28)"},
    ].map(o=>(
      <g key={o.label}>
        <rect x={o.x-42} y={o.y} width="84" height="44" rx="10" fill="#fff" stroke={o.border} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.06))" }}/>
        <text x={o.x} y={o.y+22} fontSize="18" textAnchor="middle">{o.emoji}</text>
        <text x={o.x} y={o.y+38} fill="#334155" fontSize="9" fontWeight="700" textAnchor="middle">{o.label}</text>
      </g>
    ))}

    {/* ── Spec badges top ── */}
    {[
      {x:8,   y:52,  val:"Compact",  label:"Form Factor", c:"#f59e0b"},
      {x:308, y:52,  val:"Modbus",   label:"Protocol",    c:"#3b82f6"},
      {x:8,   y:120, val:"IP66",     label:"Protection",  c:"#22c55e"},
      {x:308, y:120, val:"Auto Alarm",label:"System",     c:"#ef4444"},
    ].map(b=>(
      <g key={b.label}>
        <rect x={b.x} y={b.y} width="90" height="48" rx="12" fill="#fff" stroke={`${b.c}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
        <text x={b.x+45} y={b.y+20} fill={b.c} fontSize="11" fontWeight="900" textAnchor="middle">{b.val}</text>
        <text x={b.x+45} y={b.y+36} fill="#64748b" fontSize="8.5" textAnchor="middle">{b.label}</text>
      </g>
    ))}

    <rect x="100" y="308" width="200" height="14" rx="7" fill="url(#ac-body)"/>
    <text x="200" y="319.5" fill="#fbbf24" fontSize="9" fontWeight="700" textAnchor="middle">THERMAL AUTOMATION CAMERA</text>
  </svg>
);

/* ═══ DATA ═══ */
const categories = [
  {
    id:"a", label:"A", tag:"Entry Level",
    title:"Basic Handheld IR\nThermography Devices",
    color:"#f59e0b", bg:"linear-gradient(135deg,#f59e0b,#d97706)",
    Icon: BasicHandheldSVG,
    points:[
      "Spot temperature measurement",
      "160×120 IR resolution",
      "–20°C to 650°C range",
      "Built-in laser pointer",
      "Rugged handheld design",
      "Data logging & report export",
    ],
    use:"Electrical panels · HVAC · Predictive maintenance",
  },
  {
    id:"b", label:"B", tag:"Professional",
    title:"Advanced Handheld IR\nThermography Devices",
    color:"#ea580c", bg:"linear-gradient(135deg,#ea580c,#c2410c)",
    Icon: AdvancedHandheldSVG,
    points:[
      "Up to 640×480 resolution",
      "NETD ≤ 0.04°C sensitivity",
      "–40°C to 2000°C range",
      "Fusion visual + thermal image",
      "Wi-Fi, Bluetooth & USB-C",
      "Advanced analytics software",
    ],
    use:"Mechanical inspection · R&D · High-precision surveys",
  },
  {
    id:"c", label:"C", tag:"Permanent Monitoring",
    title:"Fixed Thermal\nImaging Cameras",
    color:"#f97316", bg:"linear-gradient(135deg,#f97316,#ea580c)",
    Icon: FixedCameraSVG,
    points:[
      "24/7 continuous monitoring",
      "IP67 weatherproof housing",
      "Ethernet / Modbus TCP output",
      "Configurable alarm zones",
      "Remote access via web",
      "No operator intervention",
    ],
    use:"Kilns · Sub-stations · Coal piles · Conveyor systems",
  },
  {
    id:"d", label:"D", tag:"Automation & Control",
    title:"Thermal Automation\nCameras",
    color:"#ef4444", bg:"linear-gradient(135deg,#ef4444,#ea580c)",
    Icon: AutomationCameraSVG,
    points:[
      "PLC / SCADA / DCS integration",
      "Relay & digital I/O outputs",
      "Modbus RTU/TCP + OPC-UA",
      "Multi-zone alarm management",
      "Edge processing on-board",
      "Compact industrial housing",
    ],
    use:"Process control · Production lines · Safety interlocks",
  },
];

const heroStats = [
  {num:"4",    label:"Product categories"},
  {num:"24/7", label:"Monitoring capable"},
  {num:"±1°C", label:"High accuracy"},
  {num:"IP67", label:"Industrial rated"},
];

/* ═══ CSS ═══ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  .tc-page { font-family:'Roboto',sans-serif; color:#1e293b; }
  .tc-page * { box-sizing:border-box; }

  .fu { opacity:0; transform:translateY(22px); transition:opacity .55s ease,transform .55s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }

  /* Hero */
  .tc-hero { position:relative; overflow:hidden; min-height:56vh; display:flex; align-items:center; }
  .tc-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
  .tc-hero-wash  { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,.90) 0%,rgba(224,242,254,.82) 55%,rgba(255,251,235,.90) 100%); }
  .tc-hero-dots  { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .tc-hero-burst { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,.26) 0%,rgba(251,191,36,.09) 40%,transparent 70%); top:-15%; left:-8%; }
  .tc-hero-sky   { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,.20) 0%,rgba(56,189,248,.06) 45%,transparent 70%); bottom:-15%; right:-5%; }

  .tc-bread { display:flex; align-items:center; gap:6px; margin-bottom:20px; }
  .tc-bread a { font-size:12.5px; color:#64748b; text-decoration:none; } .tc-bread a:hover { color:#f59e0b; }

  .tc-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:18px; }
  .tc-stat  { background:rgba(255,255,255,.82); border:1px solid rgba(245,158,11,.28); border-radius:14px; padding:14px 18px; backdrop-filter:blur(10px); box-shadow:0 2px 12px rgba(0,0,0,.06); }
  .tc-stat-num { font-size:22px; font-weight:900; color:#ea580c; line-height:1; }
  .tc-stat-label { font-size:11px; color:#64748b; font-weight:500; margin-top:3px; }

  .tc-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:15px; font-weight:700; padding:14px 28px; border-radius:12px; text-decoration:none; transition:transform .15s,box-shadow .2s; box-shadow:0 4px 20px rgba(245,158,11,.38); }
  .tc-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,.52); }
  .tc-btn-ghost  { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,.72); backdrop-filter:blur(8px); color:#334155; font-size:15px; font-weight:500; padding:14px 28px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,.25); transition:border-color .2s,background .2s; }
  .tc-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  /* Category selector pills */
  .tc-tabs { display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-bottom:56px; }
  .tc-tab  { display:inline-flex; align-items:center; gap:8px; padding:10px 22px; border-radius:999px; border:1.5px solid #eef0f4; background:#fff; font-size:13px; font-weight:700; color:#64748b; cursor:default; transition:all .2s; box-shadow:0 2px 8px rgba(0,0,0,.05); }
  .tc-tab:hover { border-color:rgba(245,158,11,.4); color:#b45309; background:#fffbeb; }

  /* Product card */
  .tc-card { background:#fff; border:1px solid #eef0f4; border-radius:24px; overflow:hidden; transition:box-shadow .25s,transform .25s,border-color .25s; box-shadow:0 4px 20px rgba(0,0,0,.06); display:grid; grid-template-columns:1fr 1fr; align-items:start; }
  @media(max-width:860px){ .tc-card{ grid-template-columns:1fr; } }
  .tc-card:hover { box-shadow:0 16px 48px rgba(0,0,0,.12); transform:translateY(-4px); border-color:rgba(245,158,11,.25); }

  /* Tag badge */
  .tc-tag { display:inline-flex; align-items:center; gap:6px; border-radius:999px; padding:5px 14px; font-size:11px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; margin-bottom:14px; }

  /* Bullet list */
  .tc-bullet { display:flex; align-items:flex-start; gap:9px; margin-bottom:9px; font-size:13.5px; color:#334155; line-height:1.55; }

  /* Use-case strip */
  .tc-use { display:flex; align-items:center; gap:10px; border-radius:12px; padding:10px 16px; margin-top:20px; font-size:12.5px; font-weight:600; color:#334155; }

  /* CTA */
  .tc-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .tc-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }
`;

const ThermalCamerasProduct = () => {
  const refs = categories.map((_,i) => useFU(i * 100));
  const refHead = useFU(0);

  return (
    <div className="tc-page">
      <style>{css}</style>

      {/* ════ HERO ════ */}
      <section className="tc-hero">
        <img src={heroBg} alt="" className="tc-hero-photo" aria-hidden="true"/>
        <div className="tc-hero-wash"/><div className="tc-hero-dots"/>
        <div className="tc-hero-burst"/><div className="tc-hero-sky"/>

        <div style={{ position:"relative", maxWidth:1280, margin:"0 auto", padding:"72px 28px 64px", width:"100%" }}>
          <div className="tc-bread">
            <Link to="/">Home</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
            <Link to="/products">Products</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
            <span style={{ fontSize:12.5, color:"#334155", fontWeight:500 }}>Thermal Cameras</span>
          </div>

          <div className="tc-badge"><Thermometer size={11}/> Infrared Thermography</div>

          <h1 style={{ fontSize:"clamp(28px,4.5vw,56px)", fontWeight:900, color:"#1e293b", lineHeight:1.05, marginBottom:12, maxWidth:660 }}>
            Thermal{" "}
            <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Camera Range
            </span>
          </h1>
          <p style={{ fontSize:"clamp(14px,1.4vw,17px)", color:"#475569", lineHeight:1.75, marginBottom:28, maxWidth:540 }}>
            From handheld spot inspections to fully automated 24/7 process monitoring — four product families covering every thermal imaging requirement.
          </p>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:28 }}>
            {heroStats.map(s=>(
              <div key={s.label} className="tc-stat"><div className="tc-stat-num">{s.num}</div><div className="tc-stat-label">{s.label}</div></div>
            ))}
          </div>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Link to="/contact" className="tc-btn-primary">Request a Demo <ArrowRight size={16}/></Link>
            {/* <Link to="/contact" className="tc-btn-ghost">Download Brochure</Link> */}
          </div>
        </div>
      </section>

      {/* ════ PRODUCT CATEGORIES ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding:"72px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>

          <div ref={refHead} className="fu" style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.22)", color:"#b45309", fontSize:11, fontWeight:700, letterSpacing:".09em", textTransform:"uppercase", padding:"5px 14px", borderRadius:999, marginBottom:12 }}>
              <Thermometer size={11}/> 4 Product Families
            </div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:10 }}>Choose the Right Thermal Camera</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>Select by application — from portable spot checks to permanent automated monitoring.</p>
          </div>

          {/* Category selector tabs */}
          <div className="tc-tabs">
            {categories.map(c=>(
              <div key={c.id} className="tc-tab">
                <span style={{ width:22, height:22, borderRadius:999, background:c.bg, display:"inline-flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:11, fontWeight:900, flexShrink:0 }}>{c.label}</span>
                {c.title.split("\n")[0]}
              </div>
            ))}
          </div>

          {/* Product cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
            {categories.map((cat, i) => (
              <div key={cat.id} ref={refs[i]} className="fu">
                {/* Section label */}
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                  <div style={{ width:36, height:36, borderRadius:12, background:cat.bg, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:16, fontWeight:900, boxShadow:`0 4px 14px ${cat.color}50` }}>{cat.label}</div>
                  <h3 style={{ fontSize:"clamp(16px,2vw,20px)", fontWeight:800, color:"#0f1117", margin:0 }}>
                    {cat.title.replace("\n"," ")}
                  </h3>
                  <div className="tc-tag" style={{ background:`${cat.color}18`, border:`1px solid ${cat.color}44`, color:cat.color, marginBottom:0 }}>
                    {cat.tag}
                  </div>
                </div>

                <div className="tc-card">
                  {/* Left: SVG illustration */}
                  <div style={{ background:`linear-gradient(135deg,#fffbeb,#fef3c7)`, padding:"8px 0" }}>
                    <cat.Icon />
                  </div>

                  {/* Right: details */}
                  <div style={{ padding:"32px 36px" }}>
                    <div className="tc-tag" style={{ background:`${cat.color}12`, border:`1.5px solid ${cat.color}33`, color:cat.color }}>
                      <Thermometer size={10}/> {cat.tag}
                    </div>

                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 20px", marginBottom:20 }}>
                      {cat.points.map(p=>(
                        <div key={p} className="tc-bullet">
                          <CheckCircle2 size={14} style={{ color:cat.color, flexShrink:0, marginTop:1 }}/>
                          {p}
                        </div>
                      ))}
                    </div>

                    <div className="tc-use" style={{ background:`${cat.color}08`, border:`1px solid ${cat.color}22` }}>
                      <Zap size={13} style={{ color:cat.color, flexShrink:0 }}/>
                      <span><strong style={{ color:cat.color }}>Typical use:</strong> {cat.use}</span>
                    </div>

                    <div style={{ marginTop:22, display:"flex", gap:10, flexWrap:"wrap" }}>
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

      {/* ════ CTA ════ */}
      <section className="tc-cta" style={{ padding:"72px 28px", textAlign:"center" }}>
        <div className="tc-cta-burst"/>
        <div style={{ position:"relative", maxWidth:620, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(24px,3.5vw,38px)", fontWeight:800, color:"#fff", marginBottom:14 }}>Not Sure Which Camera?</h2>
          <p style={{ fontSize:16, color:"rgba(255,255,255,.88)", lineHeight:1.7, marginBottom:32 }}>Our thermal imaging specialists will assess your application and recommend the right product for your requirements and budget.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", color:"#b45309", fontWeight:700, fontSize:15, padding:"14px 32px", borderRadius:12, textDecoration:"none", boxShadow:"0 4px 20px rgba(0,0,0,.15)" }}>
              Talk to a Specialist <ArrowRight size={16}/>
            </Link>
            <Link to="/products" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.15)", color:"#fff", fontWeight:500, fontSize:15, padding:"14px 28px", borderRadius:12, textDecoration:"none", border:"1px solid rgba(255,255,255,.30)" }}>
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThermalCamerasProduct;