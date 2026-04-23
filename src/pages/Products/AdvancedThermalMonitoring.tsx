

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

/* ── FIX 1: Import motor / industrial equipment photo for hero SVG ── */
import motorImg     from "@/assets/products/motor.webp";   /* ← place your motor photo here */

import camBasic    from "@/assets/thermalCam4.jpg";
import camAdvanced from "@/assets/thermalCam3.jpg";
import camFixed    from "@/assets/thermalCam1.webp";
import camAuto     from "@/assets/thermalCam2.jpg";

/* ─── useFU ─── */
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

const ImgFallback = ({
  src, alt, style = {}, height = 200, bg = "#fff7ed",
  icon = <Thermometer size={28} color="#f59e0b" />,
}) => {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div style={{ height, background:bg, display:"flex", alignItems:"center", justifyContent:"center", ...style }}>{icon}</div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

const ProductPhoto = ({ src, alt, covers = [], imgStyle = {} }) => {
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
            ...imgStyle,
          }}
        />
      )}
      {/* ── FIX 2: Logo / branding cover rects (was commented out) ── */}
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
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"20%",
                    background:"linear-gradient(to top,rgba(241,245,249,0.5),transparent)",
                    pointerEvents:"none", zIndex:1 }}/>
    </div>
  );
};

/*
  ═══════════════════════════════════════════════════════════
  ThermalSystemSVG — REALIGNED VERSION
  All three cards share a common centre Y = 195.

  Layout grid (viewBox 0 0 520 400):
    Equipment   x:24   y:115  w:140  h:160   centre-y:195
    Camera      x:192  y:145  w:96   h:100   centre-y:195
    ProcessUnit x:334  y:143  w:120  h:104   centre-y:195
    Arrows (horizontal) all at y:195
    Down arrow from proc-unit bottom (247) → chips (278)
    Output chips row at y:286
  ═══════════════════════════════════════════════════════════
*/
const ThermalSystemSVG = ({ motorSrc, cameraSrc, processingUnitSrc }) => (
  <svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg"
       xmlnsXlink="http://www.w3.org/1999/xlink"
       style={{ width:"100%", display:"block", borderRadius:20 }}>
    <defs>
      <linearGradient id="ts-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/>
      </linearGradient>
      <linearGradient id="ts-cam-accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/>
      </linearGradient>
      <radialGradient id="ts-heat" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#ef4444" stopOpacity="0.55"/>
        <stop offset="55%"  stopColor="#f97316" stopOpacity="0.22"/>
        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
      </radialGradient>
      <filter id="ts-glow">
        <feGaussianBlur stdDeviation="4" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <marker id="ts-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/>
      </marker>

      {/* Equipment panel clip (covers image area only) */}
      <clipPath id="ts-equip-clip">
        <rect x="26" y="117" width="136" height="136" rx="11"/>
      </clipPath>
      {/* Heat-pulse circle, centred on motor image */}
      <clipPath id="ts-heat-clip">
        <circle cx="94" cy="195" r="54"/>
      </clipPath>
      {/* Camera card clip — exact card bounds */}
      <clipPath id="ts-cam-clip">
        <rect x="192" y="145" width="96" height="100" rx="12"/>
      </clipPath>
      {/* Processing unit clip — full card bounds */}
      <clipPath id="ts-proc-clip">
        <rect x="334" y="143" width="120" height="104" rx="13"/>
      </clipPath>
    </defs>

    {/* ── Background ── */}
    <rect width="520" height="400" rx="20" fill="url(#ts-bg)"/>

    {/* ══════════════════════════════════
        EQUIPMENT PANEL  y:115  h:160  centre:195
    ══════════════════════════════════ */}
    <rect x="24" y="115" width="140" height="160" rx="16"
          fill="#fff" stroke="#eef0f4" strokeWidth="2"
          style={{ filter:"drop-shadow(0 4px 16px rgba(0,0,0,0.10))" }}/>
    {/* Amber header tint */}
    <rect x="24" y="115" width="140" height="28" rx="16" fill="#f97316" opacity="0.10"/>
    <rect x="24" y="131" width="140" height="12"          fill="#f97316" opacity="0.10"/>
    <text x="94" y="132" fill="#b45309" fontSize="8.5" fontWeight="800"
          textAnchor="middle" letterSpacing="0.06em">INDUSTRIAL EQUIPMENT</text>

    {/* Motor photo */}
    {motorSrc ? (
      <image href={motorSrc} x="26" y="145" width="136" height="106"
             preserveAspectRatio="xMidYMid slice" clipPath="url(#ts-equip-clip)"/>
    ) : (
      <>
        <ellipse cx="94" cy="195" rx="38" ry="38" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
        <ellipse cx="94" cy="195" rx="22" ry="22" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5"/>
      </>
    )}

    {/* Pulsing heat overlay */}
    <ellipse cx="94" cy="195" rx="54" ry="54" fill="url(#ts-heat)" clipPath="url(#ts-heat-clip)">
      <animate attributeName="rx" values="54;68;54" dur="2.5s" repeatCount="indefinite"/>
      <animate attributeName="ry" values="54;68;54" dur="2.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.85;0.25;0.85" dur="2.5s" repeatCount="indefinite"/>
    </ellipse>
    {/* Hotspot blip */}
    <circle cx="112" cy="170" r="8" fill="#ef4444" style={{ filter:"url(#ts-glow)" }}>
      <animate attributeName="r"       values="8;13;8"  dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>

    {/* Alert labels — 10px below card bottom (115+160=275) */}
    <text x="94" y="260" fill="#ef4444" fontSize="8" fontWeight="700" textAnchor="middle">⚠ HOTSPOT DETECTED</text>
    <text x="94" y="270" fill="#f97316" fontSize="8" textAnchor="middle">Temp: 186°C — ALERT</text>

    {/* ══════════════════════════════════
        IR CAMERA  x:192  y:145  w:96  h:100  centre:195
    ══════════════════════════════════ */}
    <rect x="192" y="145" width="96" height="100" rx="12"
          fill="#fff" stroke="rgba(245,158,11,0.42)" strokeWidth="2"
          style={{ filter:"drop-shadow(0 6px 20px rgba(245,158,11,0.28))" }}/>

    {cameraSrc ? (
      <image href={cameraSrc} x="192" y="145" width="96" height="100"
             preserveAspectRatio="xMidYMid meet" clipPath="url(#ts-cam-clip)"/>
    ) : (
      <rect x="193" y="146" width="94" height="98" rx="11" fill="#f59e0b" opacity="0.18"/>
    )}

    {/* Subtle amber tint + accent bar */}
    <rect x="192" y="145" width="96" height="100" rx="12"
          fill="rgba(245,158,11,0.04)" pointerEvents="none"/>
    <rect x="192" y="145" width="96" height="4" rx="2"
          fill="url(#ts-cam-accent)"/>

    {/* Labels — 10px below card bottom (145+100=245) */}
    <text x="240" y="256" fill="#b45309" fontSize="8.5" fontWeight="700" textAnchor="middle">IR THERMAL CAMERA</text>
    <text x="240" y="268" fill="#64748b" fontSize="7.5" textAnchor="middle">Fixed Mounted · 24/7</text>

    {/* ── Horizontal arrows, all at y=195 ── */}
    {/* Back-arrow: camera ← equipment */}
    <line x1="192" y1="195" x2="168" y2="195"
          stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3"/>
    <polygon points="170,190 170,200 160,195" fill="#f59e0b" opacity="0.65"/>
    {/* Forward-arrow: camera → processing unit */}
    <line x1="288" y1="195" x2="332" y2="195"
          stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#ts-arr)"/>
    <text x="310" y="188" fill="#b45309" fontSize="7.5" textAnchor="middle" fontWeight="600">Ethernet</text>

    {/* ══════════════════════════════════
        PROCESSING UNIT  x:334  y:143  w:120  h:104  centre:195
    ══════════════════════════════════ */}
    <rect x="334" y="143" width="120" height="104" rx="14"
          fill="#fff" stroke="rgba(245,158,11,0.30)" strokeWidth="2"
          style={{ filter:"drop-shadow(0 4px 16px rgba(0,0,0,0.10))" }}/>

    {processingUnitSrc ? (
      <image href={processingUnitSrc} x="334" y="143" width="120" height="104"
             preserveAspectRatio="xMidYMid slice" clipPath="url(#ts-proc-clip)"/>
    ) : (
      <>
        <rect x="342" y="151" width="104" height="68" rx="8" fill="#0f172a"/>
        {[[0,"#ef4444",0.9],[1,"#f97316",0.7],[2,"#f59e0b",0.5],[3,"#22c55e",0.3]].map(([i,c,o])=>(
          <ellipse key={String(i)} cx="394" cy="185"
                   rx={String(10+Number(i)*9)} ry={String(6+Number(i)*6)}
                   fill={String(c)} opacity={Number(o)}/>
        ))}
      </>
    )}

    {/* Frosted label strip at bottom of card */}
    <rect x="334" y="203" width="120" height="44" rx="13"
          fill="rgba(255,255,255,0.90)" pointerEvents="none"/>
    <text x="394" y="222" fill="#334155" fontSize="8.5" fontWeight="700" textAnchor="middle">PROCESSING UNIT</text>
    <text x="394" y="235" fill="#64748b" fontSize="7.5" textAnchor="middle">Multi-Camera Platform</text>

    {/* Down arrow: from bottom of proc-unit (143+104=247) → chips row */}
    <line x1="394" y1="247" x2="394" y2="278"
          stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ts-arr)"/>

    {/* ══ OUTPUT CHIPS ══ */}
    {[
      {x:270,emoji:"🔔",label:"SMS Alert"},
      {x:335,emoji:"📧",label:"Email"},
      {x:400,emoji:"📱",label:"Dashboard"},
      {x:465,emoji:"🖥",label:"SCADA"},
    ].map(o=>(
      <g key={o.label}>
        <rect x={o.x-30} y="286" width="60" height="50" rx="12" fill="#fff"
              stroke="rgba(245,158,11,0.25)" strokeWidth="1.5"
              style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
        <text x={o.x} y="310" fontSize="16" textAnchor="middle">{o.emoji}</text>
        <text x={o.x} y="328" fill="#334155" fontSize="8.5" fontWeight="700" textAnchor="middle">{o.label}</text>
      </g>
    ))}

    {/* Live indicator */}
    <circle cx="30" cy="30" r="7" fill="#22c55e">
      <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <text x="44" y="35" fill="#22c55e" fontSize="9.5" fontWeight="700">SYSTEM LIVE · 24/7 Monitoring Active</text>
  </svg>
);

const HowItWorksSVG = () => (
  <svg viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
    <defs>
      <linearGradient id="hw-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/>
      </linearGradient>
      <marker id="hw-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/>
      </marker>
    </defs>
    <rect width="760" height="230" rx="16" fill="url(#hw-bg)"/>
    <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">How the Thermal Monitoring System Works</text>
    {[
      {x:18,  color:"#f59e0b", step:"STEP 01", emoji:"📷", t1:"IR Camera",   t2:"Captures Image",  d1:"Continuous thermal",  d2:"image stream, 24/7"},
      {x:200, color:"#ea580c", step:"STEP 02", emoji:"🧠", t1:"AI Software", t2:"Analyses Data",   d1:"Real-time temp",      d2:"comparison & trending"},
      {x:380, color:"#ef4444", step:"STEP 03", emoji:"⚠️", t1:"Hotspot",     t2:"Detected",        d1:"Threshold breached,", d2:"alarm triggered"},
      {x:564, color:"#22c55e", step:"STEP 04", emoji:"🔔", t1:"Alert Sent",  t2:"Instantly",       d1:"SMS, Email, PLC,",    d2:"SCADA notified", wide:true},
    ].map((s,i)=>(
      <g key={s.step}>
        <rect x={s.x} y="42" width={s.wide?178:158} height="172" rx="16" fill="#fff"
              stroke={`${s.color}33`} strokeWidth="1.5"
              style={{ filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.07))" }}/>
        <rect x={s.x}    y="42" width={s.wide?178:158} height="32" rx="16" fill={s.color} opacity="0.12"/>
        <rect x={s.x}    y="58" width={s.wide?178:158} height="16"         fill={s.color} opacity="0.12"/>
        <text x={s.x+(s.wide?89:79)} y="62"  fill={s.color} fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.08em">{s.step}</text>
        <text x={s.x+(s.wide?89:79)} y="110" fontSize="32" textAnchor="middle">{s.emoji}</text>
        <text x={s.x+(s.wide?89:79)} y="140" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">{s.t1}</text>
        <text x={s.x+(s.wide?89:79)} y="156" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">{s.t2}</text>
        <text x={s.x+(s.wide?89:79)} y="176" fill="#64748b" fontSize="10" textAnchor="middle">{s.d1}</text>
        <text x={s.x+(s.wide?89:79)} y="189" fill="#64748b" fontSize="10" textAnchor="middle">{s.d2}</text>
        {i < 3 && <line x1={s.x+(s.wide?178:158)} y1="128" x2={s.x+(s.wide?198:180)} y2="128"
                        stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#hw-arr)"/>}
      </g>
    ))}
  </svg>
);

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const categories = [
  {
    id:"a", label:"A", tag:"Entry Level",
    title:"Basic Handheld IR Thermography Devices",
    color:"#f59e0b", bg:"linear-gradient(135deg,#f59e0b,#d97706)",
    photo: camFixed,
    photoCovers: [
      { top:"4%", left:"4%", width:"28%", height:"8%", bg:"#ffffff" },
    ],
    points:["Spot temperature measurement","160×120 IR resolution","–20°C to 650°C range","Built-in laser pointer","Rugged handheld design","Data logging & report export"],
    use:"Electrical panels · HVAC · Predictive maintenance",
  },
  {
    id:"b", label:"B", tag:"Professional",
    title:"Advanced Handheld IR Thermography Devices",
    color:"#ea580c", bg:"linear-gradient(135deg,#ea580c,#c2410c)",
    photo: camAuto,
    photoCovers: [
      { top:"46%", left:"36%", width:"22%", height:"9%", bg:"rgba(40,30,20,0.82)", blur:true },
    ],
    imgStyle: { objectFit:"cover", padding:"0px", objectPosition:"center" },
    points:["Up to 640×480 resolution","NETD ≤ 0.04°C sensitivity","–40°C to 2000°C range","Fusion visual + thermal image","Wi-Fi, Bluetooth & USB-C","Advanced analytics software"],
    use:"Mechanical inspection · R&D · High-precision surveys",
  },
  {
    id:"c", label:"C", tag:"Permanent Monitoring",
    title:"Fixed Thermal Imaging Cameras",
    color:"#f97316", bg:"linear-gradient(135deg,#f97316,#ea580c)",
    photo: camAdvanced,
    photoCovers: [
      { top:"54%", right:"6%", width:"22%", height:"7%", bg:"rgba(185,185,185,0.92)" },
      { bottom:"4%", left:"4%", width:"30%", height:"8%", bg:"rgba(185,185,185,0.92)" },
    ],
    imgStyle: { padding:"16px" },
    points:["24/7 continuous monitoring","IP67 weatherproof housing","Ethernet / Modbus TCP output","Configurable alarm zones","Remote access via web","No operator intervention"],
    use:"Kilns · Sub-stations · Coal piles · Conveyor systems",
  },
  {
    id:"d", label:"D", tag:"Automation & Control",
    title:"Thermal Automation Cameras",
    color:"#ef4444", bg:"linear-gradient(135deg,#ef4444,#ea580c)",
    photo: camBasic,
    /* ── FIX 2: covers now active — hides "IRtech" logo on camera body ── */
    photoCovers: [
      { bottom:"18%", left:"18%", width:"26%", height:"8%", bg:"#ffffff" },
    ],
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
  @keyframes ath-pulse   { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.6} }
  @keyframes ath-flicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1} 20%,24%,55%{opacity:.3} }
  .ath-flicker { animation:ath-fadein 1.4s ease .3s both,ath-flicker 4s ease-in-out 2s infinite; font-size:clamp(12px,1.1vw,15px); font-weight:600; color: #062979; margin-top:12px; margin-bottom:18px; }

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

  /* ── FIX 3: Product card — true 50/50 side-by-side, equal height halves ── */
  .ath-product-card {
    background:#fff;
    border:1px solid #eef0f4;
    border-radius:20px;
    overflow:hidden;
    transition:box-shadow .25s,transform .25s,border-color .25s;
    box-shadow:0 4px 20px rgba(0,0,0,.06);
    display:grid;
    grid-template-columns:1fr 1fr;   /* equal columns */
    align-items:stretch;             /* both columns fill the full card height */
    min-height:360px;
  }
  @media(max-width:860px){
    .ath-product-card {
      grid-template-columns:1fr;
      min-height:unset;
    }
  }
  .ath-product-card:hover { box-shadow:0 16px 48px rgba(0,0,0,.12); transform:translateY(-4px); border-color:rgba(245,158,11,.25); }

  /* ── Photo panel: fills its grid cell completely ── */
  .ath-photo-panel {
    position:relative;
    overflow:hidden;
    border-radius:20px 0 0 20px;
    background:#f8fafc;
    border-right:1px solid #eef0f4;
  }
  .ath-photo-panel img { transition:transform 0.5s ease; }
  .ath-product-card:hover .ath-photo-panel img { transform:scale(1.04); }
  @media(max-width:860px){
    .ath-photo-panel {
      border-radius:20px 20px 0 0;
      border-right:none;
      border-bottom:1px solid #eef0f4;
      height:280px;
    }
  }

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

          {/* RIGHT — SVG now receives real motor image */}
          <div>
            <div className="ath-svg-label"><span className="ath-live-dot"/>Live Thermal Monitoring System</div>
            <div className="ath-svg-card">
              {/* Real photos for all three SVG panels */}
              <ThermalSystemSVG
                motorSrc={motorImg}
                cameraSrc={camFixed}          /* thermalCam1.webp — silver fixed camera */
                processingUnitSrc={dashboardImg} /* thermal2.jpg — multi-camera dashboard */
              />
            </div>
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
                  {/* ── LEFT: product photo with logo covers active ── */}
                  <div className="ath-photo-panel">
                    {/* accent bar */}
                    <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${cat.color},${cat.color}66)`, zIndex:3 }}/>
                    {/* ── FIX 2: covers prop now passed through (was commented out) ── */}
                    <ProductPhoto
                      src={cat.photo}
                      alt={cat.title}
                      // covers={cat.photoCovers}
                      imgStyle={cat.imgStyle ?? {}}
                    />
                  </div>

                  {/* ── RIGHT: details ── */}
                  <div style={{ padding:"32px 36px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
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