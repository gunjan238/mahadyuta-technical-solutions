

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

/* ─── useFU hook ─── */
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
    <div style={{ height, background: bg, display:"flex", alignItems:"center", justifyContent:"center", ...style }}>
      {icon}
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ═══════════════════════════════════════════════════════════
   SVG ILLUSTRATIONS
═══════════════════════════════════════════════════════════ */

const ThermalSystemSVG = () => (
  <svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:20 }}>
    <defs>
      <linearGradient id="ts-bg"  x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      <linearGradient id="ts-hot" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ef4444"/><stop offset="100%" stopColor="#f97316"/></linearGradient>
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
    <rect x="260" y="170" width="20" height="4" rx="2" fill="rgba(255,255,255,0.4)"/>
    <rect x="260" y="178" width="14" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
    <rect x="260" y="186" width="18" height="4" rx="2" fill="rgba(255,255,255,0.4)"/>
    <text x="240" y="232" fill="#b45309" fontSize="8.5" fontWeight="700" textAnchor="middle">IR THERMAL CAMERA</text>
    <text x="240" y="245" fill="#64748b" fontSize="7.5" textAnchor="middle">Fixed Mounted · 24/7</text>
    <line x1="196" y1="188" x2="168" y2="188" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3"/>
    <polygon points="170,183 170,193 160,188" fill="#f59e0b" opacity="0.6"/>
    <line x1="196" y1="175" x2="164" y2="155" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
    <line x1="196" y1="202" x2="164" y2="222" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
    <line x1="288" y1="188" x2="332" y2="188" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#ts-arr)"/>
    <text x="310" y="181" fill="#b45309" fontSize="7.5" textAnchor="middle" fontWeight="600">Ethernet</text>
    <rect x="334" y="136" width="120" height="104" rx="14" fill="#fff" stroke="rgba(245,158,11,0.28)" strokeWidth="2" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.08))" }}/>
    <rect x="344" y="148" width="100" height="64" rx="8" fill="#0f172a"/>
    {[[0,"#ef4444",0.9],[1,"#f97316",0.7],[2,"#f59e0b",0.5],[3,"#22c55e",0.3],[4,"#3b82f6",0.2]].map(([i,c,o])=>(
      <ellipse key={String(i)} cx="394" cy="180" rx={String(8+Number(i)*8)} ry={String(5+Number(i)*5)} fill={String(c)} opacity={Number(o)} style={{ mixBlendMode:"screen" }}/>
    ))}
    <text x="394" y="168" fill="#fff" fontSize="7" textAnchor="middle" fontWeight="600">THERMAL VIEW</text>
    <text x="394" y="220" fill="#334155" fontSize="8.5" fontWeight="700" textAnchor="middle">PROCESSING UNIT</text>
    <text x="394" y="233" fill="#64748b" fontSize="7.5" textAnchor="middle">Multi-Camera Platform</text>
    <line x1="394" y1="240" x2="394" y2="276" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ts-arr)"/>
    <line x1="458" y1="188" x2="494" y2="188" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#ts-arr)"/>
    <rect x="496" y="170" width="18" height="36" rx="4" fill="#334155"/>
    <text x="505" y="184" fill="#f59e0b" fontSize="6.5" textAnchor="middle" fontWeight="700" transform="rotate(-90 505 184)">PLC</text>
    {[
      {x:280, emoji:"🔔", label:"SMS Alert"},
      {x:356, emoji:"📧", label:"Email"},
      {x:432, emoji:"📱", label:"Dashboard"},
      {x:496, emoji:"🖥", label:"SCADA"},
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
    <text x="480" y="30" fill="#64748b" fontSize="8.5" textAnchor="end">±1°C Accuracy</text>
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
    <g>
      <rect x="18" y="42" width="158" height="172" rx="16" fill="#fff" stroke="#f59e0b33" strokeWidth="1.5" style={{ filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.07))" }}/>
      <rect x="18" y="42" width="158" height="32" rx="16" fill="#f59e0b" opacity="0.12"/>
      <rect x="18" y="58" width="158" height="16" fill="#f59e0b" opacity="0.12"/>
      <text x="97" y="62" fill="#f59e0b" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.08em">STEP 01</text>
      <text x="97" y="110" fontSize="32" textAnchor="middle">📷</text>
      <text x="97" y="140" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">IR Camera</text>
      <text x="97" y="156" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">Captures Image</text>
      <text x="97" y="176" fill="#64748b" fontSize="10" textAnchor="middle">Continuous thermal</text>
      <text x="97" y="189" fill="#64748b" fontSize="10" textAnchor="middle">image stream, 24/7</text>
    </g>
    <line x1="178" y1="128" x2="198" y2="128" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#hw-arr)"/>
    <g>
      <rect x="200" y="42" width="158" height="172" rx="16" fill="#fff" stroke="#ea580c33" strokeWidth="1.5" style={{ filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.07))" }}/>
      <rect x="200" y="42" width="158" height="32" rx="16" fill="#ea580c" opacity="0.12"/>
      <rect x="200" y="58" width="158" height="16" fill="#ea580c" opacity="0.12"/>
      <text x="279" y="62" fill="#ea580c" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.08em">STEP 02</text>
      <text x="279" y="110" fontSize="32" textAnchor="middle">🧠</text>
      <text x="279" y="140" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">AI Software</text>
      <text x="279" y="156" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">Analyses Data</text>
      <text x="279" y="176" fill="#64748b" fontSize="10" textAnchor="middle">Real-time temp</text>
      <text x="279" y="189" fill="#64748b" fontSize="10" textAnchor="middle">comparison & trending</text>
    </g>
    <line x1="360" y1="128" x2="380" y2="128" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#hw-arr)"/>
    <g>
      <rect x="382" y="42" width="158" height="172" rx="16" fill="#fff" stroke="#ef444433" strokeWidth="1.5" style={{ filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.07))" }}/>
      <rect x="382" y="42" width="158" height="32" rx="16" fill="#ef4444" opacity="0.12"/>
      <rect x="382" y="58" width="158" height="16" fill="#ef4444" opacity="0.12"/>
      <text x="461" y="62" fill="#ef4444" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.08em">STEP 03</text>
      <text x="461" y="110" fontSize="32" textAnchor="middle">⚠️</text>
      <text x="461" y="140" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">Hotspot</text>
      <text x="461" y="156" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">Detected</text>
      <text x="461" y="176" fill="#64748b" fontSize="10" textAnchor="middle">Threshold breached,</text>
      <text x="461" y="189" fill="#64748b" fontSize="10" textAnchor="middle">alarm triggered</text>
    </g>
    <line x1="542" y1="128" x2="562" y2="128" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#hw-arr)"/>
    <g>
      <rect x="564" y="42" width="178" height="172" rx="16" fill="#fff" stroke="#22c55e33" strokeWidth="1.5" style={{ filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.07))" }}/>
      <rect x="564" y="42" width="178" height="32" rx="16" fill="#22c55e" opacity="0.12"/>
      <rect x="564" y="58" width="178" height="16" fill="#22c55e" opacity="0.12"/>
      <text x="653" y="62" fill="#22c55e" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.08em">STEP 04</text>
      <text x="653" y="110" fontSize="32" textAnchor="middle">🔔</text>
      <text x="653" y="140" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">Alert Sent</text>
      <text x="653" y="156" fill="#0f1117" fontSize="12" fontWeight="700" textAnchor="middle">Instantly</text>
      <text x="653" y="176" fill="#64748b" fontSize="10" textAnchor="middle">SMS, Email, PLC,</text>
      <text x="653" y="189" fill="#64748b" fontSize="10" textAnchor="middle">SCADA notified</text>
    </g>
  </svg>
);

const ApplicationsSVG = () => {
  const apps = [
    {emoji:"⚡", label:"HT Electrical Sub-Station"},
    {emoji:"🏭", label:"Coal Pile Monitoring"},
    {emoji:"🗑", label:"Waste Bunker Monitoring"},
    {emoji:"⚙️", label:"Critical Machine Monitoring"},
    {emoji:"🔥", label:"Kiln Shell Monitoring"},
    {emoji:"🏗", label:"Ladle Monitoring"},
    {emoji:"🪣", label:"Metal Casting Process"},
    {emoji:"🏭", label:"Critical Production Monitoring"},
    {emoji:"🔌", label:"Overhead Equipment Monitoring"},
    {emoji:"🍱", label:"Food Processing & Packaging"},
  ];
  const cols = 5;
  return (
    <svg viewBox="0 0 760 310" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
      <defs>
        <linearGradient id="ap-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9"/><stop offset="100%" stopColor="#fff7ed"/></linearGradient>
      </defs>
      <rect width="760" height="310" rx="16" fill="url(#ap-bg)"/>
      <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">10+ Industrial Applications — Continuous Thermal Protection</text>
      {apps.map((a, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cardW = 132, cardH = 88, gapX = 18, gapY = 14;
        const totalW = cols * cardW + (cols - 1) * gapX;
        const startX = (760 - totalW) / 2;
        const x = startX + col * (cardW + gapX);
        const y = 44 + row * (cardH + gapY);
        const colors = ["#f59e0b","#ea580c","#ef4444","#f97316","#22c55e","#3b82f6","#8b5cf6","#f59e0b","#ea580c","#22c55e"];
        const c = colors[i];
        return (
          <g key={a.label}>
            <rect x={x} y={y} width={cardW} height={cardH} rx="12" fill="#fff" stroke={`${c}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
            <rect x={x} y={y} width={cardW} height="24" rx="12" fill={c} opacity="0.12"/>
            <rect x={x} y={y+12} width={cardW} height="12" fill={c} opacity="0.12"/>
            <text x={x + cardW/2} y={y + 44} fontSize="22" textAnchor="middle">{a.emoji}</text>
            {(() => {
              const words = a.label.split(" ");
              const mid = Math.ceil(words.length / 2);
              const line1 = words.slice(0, mid).join(" ");
              const line2 = words.slice(mid).join(" ");
              return (
                <>
                  <text x={x + cardW/2} y={y + 64} fill="#334155" fontSize="9.5" fontWeight="700" textAnchor="middle">{line1}</text>
                  {line2 && <text x={x + cardW/2} y={y + 77} fill="#334155" fontSize="9.5" fontWeight="700" textAnchor="middle">{line2}</text>}
                </>
              );
            })()}
          </g>
        );
      })}
    </svg>
  );
};

const ImpactSVG = () => (
  <svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
    <defs>
      <linearGradient id="im-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9"/><stop offset="100%" stopColor="#fffbeb"/></linearGradient>
    </defs>
    <rect width="760" height="200" rx="16" fill="url(#im-bg)"/>
    <text x="380" y="24" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">Reactive vs Preventive — The Business Case for Thermal Monitoring</text>
    <rect x="20"  y="40" width="340" height="144" rx="14" fill="#fff" stroke="rgba(239,68,68,0.20)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.06))" }}/>
    <rect x="20"  y="40" width="340" height="28" rx="14" fill="#ef4444" opacity="0.10"/>
    <rect x="20"  y="54" width="340" height="14" fill="#ef4444" opacity="0.10"/>
    <text x="190" y="58" fill="#ef4444" fontSize="10" fontWeight="900" textAnchor="middle">⚠  REACTIVE — No Thermal Monitoring</text>
    {["Hotspot grows undetected until catastrophic failure","Unplanned shutdowns — hours to days of lost production","Fire risk in coal piles, waste bunkers & sub-stations","High emergency repair costs + equipment replacement","Safety incidents and potential personnel hazards"].map((t,i)=>(
      <g key={t}><circle cx="38" cy={80+i*22} r="4" fill="#ef4444" opacity="0.7"/><text x="50" y={85+i*22} fill="#475569" fontSize="10">{t}</text></g>
    ))}
    <rect x="351" y="100" width="58" height="24" rx="12" fill="#f59e0b" style={{ filter:"drop-shadow(0 2px 8px rgba(245,158,11,0.40))" }}/>
    <text x="380" y="116" fill="#fff" fontSize="14" fontWeight="900" textAnchor="middle">→</text>
    <rect x="400" y="40" width="340" height="144" rx="14" fill="#fff" stroke="rgba(34,197,94,0.22)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.06))" }}/>
    <rect x="400" y="40" width="340" height="28" rx="14" fill="#22c55e" opacity="0.10"/>
    <rect x="400" y="54" width="340" height="14" fill="#22c55e" opacity="0.10"/>
    <text x="570" y="58" fill="#22c55e" fontSize="10" fontWeight="900" textAnchor="middle">✓  PREVENTIVE — With Thermal Monitoring</text>
    {["Hotspot detected within seconds — alert sent instantly","Maintenance planned in advance — zero unplanned shutdown","24/7 coal pile & bunker fire surveillance — zero incidents","Low planned maintenance cost — damage prevented","Full compliance with safety regulations and audit trails"].map((t,i)=>(
      <g key={t}><circle cx="418" cy={80+i*22} r="4" fill="#22c55e" opacity="0.8"/><text x="430" y={85+i*22} fill="#334155" fontSize="10" fontWeight="500">{t}</text></g>
    ))}
  </svg>
);

/* ─── Data ─── */
const features = [
  { icon:<Monitor size={17}/>,     title:"Customised IR Thermal Monitoring & Automation",  desc:"Bespoke fixed thermal camera systems designed and configured specifically for your process requirements." },
  { icon:<Activity size={17}/>,    title:"24/7 Real-Time Temperature Surveillance",         desc:"Continuous automated monitoring with instant detection of temperature anomalies as they develop." },
  { icon:<Bell size={17}/>,        title:"Custom Alarm & Email / SMS Alerts",               desc:"Configurable multi-level alarm thresholds with automated email and SMS notifications to operators." },
  { icon:<Zap size={17}/>,         title:"Integrates with PLC, SCADA, DCS & BMS",          desc:"Compatible with all major control platforms via Modbus TCP/RTU, OPC-UA, Ethernet or relay outputs." },
  { icon:<TrendingDown size={17}/>,title:"Data-Driven Proactive Maintenance Analytics",     desc:"Historical temperature trending and analytics that reduce unplanned downtime and extend equipment life." },
];

const appCards = [
  { icon:<Flame size={19}/>,    title:"Kiln Shell & Metal Casting",  desc:"Real-time shell temperature mapping on cement kilns and ladle thermal monitoring in steel foundries.",          img:appImg1 },
  { icon:<Factory size={19}/>,  title:"Coal Pile & HT Sub-Station",  desc:"Automated thermal surveillance of coal stockpiles and HT electrical switchyard equipment — 24/7.",            img:appImg2 },
  { icon:<Building2 size={19}/>,title:"Critical Machinery",          desc:"Continuous motor, drive and critical production line monitoring — detecting overheating before failure occurs.", img:appImg3 },
];

const heroStats = [
  {num:"24/7",  label:"Continuous monitoring"},
  {num:"±1°C",  label:"Measurement accuracy" },
  {num:"100%",  label:"Non-contact sensing"  },
  {num:"Auto",  label:"Alarm & alert system" },
];

const whyChoose = [
  { icon:<TrendingDown size={16}/>, label:"Prevent Catastrophic Failures",    desc:"Detect hotspots hours before they cause damage — saving equipment, product and production time.",        color:"#f59e0b" },
  { icon:<Flame size={16}/>,        label:"Eliminate Fire Risk",               desc:"24/7 thermal surveillance of coal piles, bunkers and fire-sensitive areas prevents disasters.",            color:"#ef4444" },
  { icon:<Shield size={16}/>,       label:"Protect Electrical Infrastructure", desc:"Continuous sub-station and OHE monitoring prevents costly outages and arc-flash incidents.",             color:"#3b82f6" },
  { icon:<CheckCircle2 size={16}/>, label:"Reduce Maintenance Costs",         desc:"Data-driven analytics replace reactive maintenance with planned, targeted interventions.",                 color:"#22c55e" },
];

/* ═══════════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  .tm2-page { font-family:'Roboto',sans-serif; color:#1e293b; }
  .tm2-page * { box-sizing:border-box; }

  .fu { opacity:0; transform:translateY(22px); transition:opacity .55s ease,transform .55s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }

  /* ── Hero ── */
  .tm2-hero { position:relative; overflow:hidden; min-height:100svh; display:flex; align-items:center; }
  .tm2-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
  .tm2-hero-wash  { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,0.90) 0%,rgba(224,242,254,0.82) 55%,rgba(255,251,235,0.90) 100%); }
  .tm2-hero-dots  { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .tm2-hero-burst { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,0.26) 0%,rgba(251,191,36,0.09) 40%,transparent 70%); top:-15%; left:-8%; }
  .tm2-hero-sky   { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.20) 0%,rgba(56,189,248,0.06) 45%,transparent 70%); bottom:-15%; right:-5%; }

  /* ── Hero inner grid ── */
  .tm2-hero-inner {
    position:relative;
    max-width:1280px;
    margin:0 auto;
    padding:72px 20px 64px;
    width:100%;
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:52px;
    align-items:center;
  }
  @media(max-width:900px){
    .tm2-hero-inner {
      grid-template-columns:1fr;
      gap:32px;
      padding:56px 16px 48px;
    }
  }

  /* ── Flicker ── */
  @keyframes tm2-fadein { 0%{opacity:0;transform:translateY(6px);letter-spacing:.13em} 60%{opacity:.85} 100%{opacity:1;transform:translateY(0);letter-spacing:.04em} }
  @keyframes tm2-flicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1;text-shadow:0 0 8px rgba(245,158,11,.85),0 0 20px rgba(234,88,12,.5)} 20%,24%,55%{opacity:.35;text-shadow:none} }
  .tm2-flicker { opacity:0; animation:tm2-fadein 1.4s cubic-bezier(.22,1,.36,1) .3s forwards,tm2-flicker 4s ease-in-out 2s infinite; font-size:clamp(12px,1.1vw,15px); font-weight:600; background:linear-gradient(90deg,#f59e0b,#ea580c); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:block; margin-top:10px; margin-bottom:18px; }

  /* ── Breadcrumb ── */
  .tm2-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
  .tm2-bread a { font-size:12px; color:#64748b; text-decoration:none; transition:color .15s; }
  .tm2-bread a:hover { color:#f59e0b; }

  /* ── Badges ── */
  .tm2-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:18px; }
  .tm2-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }

  /* ── Stats grid ── */
  .tm2-stats-grid {
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:10px;
    margin-bottom:24px;
  }
  @media(min-width:540px){
    .tm2-stats-grid { grid-template-columns:repeat(4,1fr); }
  }
  .tm2-stat { background:rgba(255,255,255,0.82); border:1px solid rgba(245,158,11,0.28); border-radius:14px; padding:12px 14px; backdrop-filter:blur(10px); box-shadow:0 2px 12px rgba(0,0,0,0.06); }
  .tm2-stat-num { font-size:20px; font-weight:900; color:#ea580c; line-height:1; }
  .tm2-stat-label { font-size:10px; color:#64748b; font-weight:500; margin-top:3px; }

  /* ── Buttons ── */
  .tm2-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:14px; font-weight:700; padding:13px 24px; border-radius:12px; text-decoration:none; transition:transform .15s,box-shadow .2s; box-shadow:0 4px 20px rgba(245,158,11,0.38); white-space:nowrap; }
  .tm2-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.52); }
  .tm2-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:14px; font-weight:500; padding:13px 24px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,0.25); transition:border-color .2s,background .2s; white-space:nowrap; }
  .tm2-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  /* ── Hero buttons row ── */
  .tm2-hero-btns { display:flex; gap:12px; flex-wrap:wrap; }
  @media(max-width:480px){ .tm2-hero-btns { flex-direction:column; align-items:flex-start; } }

  /* ── SVG card ── */
  .tm2-svg-card { border-radius:20px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.09),0 2px 8px rgba(0,0,0,0.05); border:1px solid rgba(245,158,11,0.14); transition:transform .3s,box-shadow .3s; }
  .tm2-svg-card:hover { transform:translateY(-5px) scale(1.005); box-shadow:0 20px 56px rgba(0,0,0,0.14); }
  .tm2-svg-label { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.10); border:1px solid rgba(245,158,11,0.25); color:#b45309; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; padding:5px 12px; border-radius:999px; margin-bottom:10px; }

  /* ── Two-col layout ── */
  .tm2-two-col { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }
  @media(max-width:900px){ .tm2-two-col { grid-template-columns:1fr; gap:36px; } }

  /* ── Feature item ── */
  .tm2-feature { display:flex; gap:12px; align-items:flex-start; padding:14px 0; border-bottom:1px solid #f1f5f9; }
  .tm2-feature:last-child { border-bottom:none; }
  .tm2-feat-icon { width:36px; height:36px; border-radius:10px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; flex-shrink:0; }

  /* ── App card ── */
  .tm2-app-card { background:#fff; border:1px solid #eef0f4; border-radius:16px; overflow:hidden; transition:box-shadow .22s,border-color .22s,transform .22s; position:relative; }
  .tm2-app-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,#ea580c); opacity:0; transition:opacity .2s; }
  .tm2-app-card:hover { box-shadow:0 12px 36px rgba(0,0,0,0.10); border-color:rgba(245,158,11,0.28); transform:translateY(-5px); }
  .tm2-app-card:hover::before { opacity:1; }

  /* ── App cards grid ── */
  .tm2-app-cards-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
    gap:20px;
  }

  /* ── App pill ── */
  .tm2-app-pill { display:inline-flex; align-items:center; gap:7px; background:#fff; border:1px solid rgba(245,158,11,0.20); border-radius:10px; padding:8px 14px; font-size:13px; color:#334155; font-weight:500; transition:border-color .15s,color .15s,background .15s; }
  .tm2-app-pill:hover { border-color:#f59e0b; color:#b45309; background:#fffbeb; }
  .tm2-app-dot { width:6px; height:6px; border-radius:50%; background:linear-gradient(135deg,#f59e0b,#ea580c); flex-shrink:0; }

  /* ── Pill list ── */
  .tm2-pill-list { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-bottom:40px; }

  /* ── Highlight ── */
  .tm2-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:16px; padding:24px 28px; color:#fff; box-shadow:0 8px 28px rgba(245,158,11,0.28); position:relative; overflow:hidden; }
  .tm2-highlight::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 0%,rgba(255,255,255,0.18) 0%,transparent 60%); pointer-events:none; }

  /* ── Photo card ── */
  .tm2-photo-card { border-radius:20px; overflow:hidden; box-shadow:0 16px 48px rgba(0,0,0,0.11); border:1px solid #eef0f4; transition:transform .3s,box-shadow .3s; }
  .tm2-photo-card:hover { transform:translateY(-5px) scale(1.01); box-shadow:0 24px 64px rgba(0,0,0,0.15); }

  /* ── Install chips ── */
  .tm2-install-chips {
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:8px;
    margin-top:16px;
  }
  @media(min-width:540px){
    .tm2-install-chips { grid-template-columns:repeat(4,1fr); }
  }
  .tm2-install-chip {
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

  /* ── Integration grid ── */
  .tm2-integration-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
    gap:16px;
  }

  /* ── Why choose grid ── */
  .tm2-why-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
    gap:16px;
    margin-bottom:48px;
  }

  /* ── Section padding ── */
  .tm2-section { padding:64px 20px; }
  @media(max-width:640px){ .tm2-section { padding:48px 16px; } }

  /* ── Inner wrapper ── */
  .tm2-inner { max-width:1280px; margin:0 auto; }

  /* ── Pulse dot ── */
  @keyframes tm2-pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.5);opacity:0.6;} }
  .tm2-live-dot { width:9px; height:9px; border-radius:50%; background:#22c55e; animation:tm2-pulse 2s infinite; display:inline-block; margin-right:6px; }
`;

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const ThermalMonitoringAutomationProduct = () => {
  const refFeat    = useFU(0);
  const refInstall = useFU(100);
  const refHow     = useFU(0);
  const refAppHead = useFU(0);
  const refAppSvg  = useFU(100);
  const refIntSvg  = useFU(0);
  const refWhy     = useFU(0);
  const appCardRefs= appCards.map((_,i)=>useFU(i*100));
  const whyRefs    = whyChoose.map((_,i)=>useFU(i*80));
  const intRefs    = [useFU(0),useFU(80),useFU(160),useFU(240)];

  return (
    <div className="tm2-page">
      <style>{css}</style>

      {/* ════ HERO ════ */}
      <section className="tm2-hero">
        <img src={heroBg} alt="" className="tm2-hero-photo" aria-hidden="true"/>
        <div className="tm2-hero-wash"/><div className="tm2-hero-dots"/>
        <div className="tm2-hero-burst"/><div className="tm2-hero-sky"/>

        <div className="tm2-hero-inner">
          {/* Left */}
          <div>
            <div className="tm2-bread">
              <Link to="/">Home</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
              <Link to="/products">Products</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
              <span style={{ fontSize:12, color:"#334155", fontWeight:500 }}>Thermal Monitoring & Automation</span>
            </div>

            <div className="tm2-badge"><Thermometer size={11}/> Industrial Thermal Automation</div>

            <h1 style={{ fontSize:"clamp(26px,4.5vw,54px)", fontWeight:900, color:"#1e293b", lineHeight:1.05, marginBottom:0 }}>
              Thermal Monitoring &amp;{" "}
              <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Automation Solutions
              </span>
            </h1>

            <span className="tm2-flicker">🔥 Detect hotspots before they become catastrophic failures</span>

            <p style={{ fontSize:"clamp(14px,1.3vw,16px)", color:"#475569", lineHeight:1.8, marginBottom:12, maxWidth:500 }}>
              Customised IR thermal monitoring and automation systems for{" "}
              <strong style={{ color:"#1e293b" }}>24/7 real-time temperature surveillance</strong> of kilns, coal piles, electrical sub-stations, critical machinery and industrial processes.
            </p>
            <p style={{ fontSize:"clamp(14px,1.3vw,16px)", color:"#475569", lineHeight:1.8, marginBottom:24, maxWidth:500 }}>
              Detect hotspots instantly. Send automated alarms. Integrate with your plant control systems — <strong style={{ color:"#1e293b" }}>no rip-and-replace required</strong>.
            </p>

            <div className="tm2-stats-grid">
              {heroStats.map(s=>(
                <div key={s.label} className="tm2-stat">
                  <div className="tm2-stat-num">{s.num}</div>
                  <div className="tm2-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="tm2-hero-btns">
              <Link to="/contact" className="tm2-btn-primary">Request a Demo <ArrowRight size={16}/></Link>
            </div>
          </div>

          {/* Right: system schematic SVG */}
          <div>
            <div className="tm2-svg-label"><span className="tm2-live-dot"/>&nbsp;Live Thermal Monitoring System</div>
            <div className="tm2-svg-card"><ThermalSystemSVG/></div>
          </div>
        </div>
      </section>

      {/* ════ HOW IT WORKS ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", paddingBottom:16 }} className="tm2-section">
        <div className="tm2-inner">
          <div ref={refHow} className="fu">
            <div className="tm2-svg-label"><Zap size={11}/> 4-Step Detection Process</div>
            <div className="tm2-svg-card"><HowItWorksSVG/></div>
          </div>
        </div>
      </section>

      {/* ════ FEATURES + INSTALL IMAGE ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)" }} className="tm2-section">
        <div className="tm2-inner tm2-two-col">
          <div ref={refFeat} className="fu">
            <div className="tm2-section-badge"><Zap size={11}/> Key Features</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:700, color:"#0f1117", lineHeight:1.2, marginBottom:24 }}>
              What Our Thermal Automation Solution Delivers
            </h2>
            {features.map(f=>(
              <div key={f.title} className="tm2-feature">
                <div className="tm2-feat-icon">{f.icon}</div>
                <div>
                  <p style={{ fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:3 }}>{f.title}</p>
                  <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div ref={refInstall} className="fu">
            <div className="tm2-svg-label" style={{ marginBottom:10 }}><Monitor size={11}/> Multi-Camera Dashboard Platform</div>
            <div className="tm2-photo-card" style={{ marginBottom:20 }}>
              <ImgFallback src={dashboardImg} alt="Thermal monitoring dashboard"
                style={{ width:"100%", height:220, objectFit:"cover", display:"block" }}
                height={220} bg="#fef3c7"/>
            </div>
            <div className="tm2-svg-label" style={{ marginBottom:10 }}><Thermometer size={11}/> Fixed IR Camera Installation</div>
            <div className="tm2-photo-card">
              <ImgFallback src={installImg} alt="Thermal camera installation"
                style={{ width:"100%", height:200, objectFit:"cover", display:"block" }}
                height={200} bg="#fff7ed"/>
            </div>
            <div className="tm2-install-chips">
              {["📡 Fixed Mounted","⚙️ PLC Integration","🔔 Auto Alerts","🌐 Remote Access"].map(t=>(
                <div key={t} className="tm2-install-chip">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ APPLICATIONS ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)" }} className="tm2-section">
        <div className="tm2-inner">
          <div ref={refAppHead} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
            <div className="tm2-section-badge" style={{ margin:"0 auto 12px" }}><Factory size={11}/> Applications</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:700, color:"#0f1117", marginBottom:12 }}>Where We Deploy Thermal Monitoring</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>Trusted across heavy industry for continuous thermal protection of the most critical assets and processes.</p>
          </div>

          <div ref={refAppSvg} className="fu" style={{ marginBottom:36 }}>
            <div className="tm2-svg-card"><ApplicationsSVG/></div>
          </div>

          <div className="tm2-pill-list">
            {["HT Electrical Sub Station","Coal Pile Monitoring","Waste Bunker Monitoring","Critical Machine Monitoring","Kiln Shell Monitoring","Ladle Monitoring","Metal Casting Process","Critical Production Monitoring","Overhead Equipment Monitoring","Food Processing & Packaging"].map(a=>(
              <span key={a} className="tm2-app-pill"><span className="tm2-app-dot"/>{a}</span>
            ))}
          </div>

          <div className="tm2-app-cards-grid">
            {appCards.map((item,i)=>(
              <div ref={appCardRefs[i]} key={item.title} className="tm2-app-card fu">
                <ImgFallback src={item.img} alt={item.title}
                  style={{ width:"100%", height:180, objectFit:"cover", display:"block" }}
                  height={180} bg="#fef3c7"/>
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

      {/* ════ INTEGRATION ════ */}
      <section style={{ background:"#fffbeb" }} className="tm2-section">
        <div className="tm2-inner">
          <div ref={refIntSvg} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
            <div className="tm2-section-badge" style={{ margin:"0 auto 12px" }}><Zap size={11}/> Integration</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:700, color:"#0f1117", marginBottom:12 }}>Seamlessly Integrates with Your Plant Systems</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>Connects directly to your existing control infrastructure — no rip-and-replace required.</p>
          </div>

          <div className="tm2-integration-grid">
            {[
              {label:"PLC Integration",        icon:<Zap size={18}/>,      desc:"Direct alarm relays and digital I/O to any PLC platform.",                   color:"#f59e0b"},
              {label:"SCADA / DCS (Modbus)",   icon:<Monitor size={18}/>,   desc:"Modbus TCP/RTU and OPC-UA for real-time data to your SCADA system.",         color:"#3b82f6"},
              {label:"Email & SMS Alerts",     icon:<Bell size={18}/>,      desc:"Instant multi-recipient alerts triggered by temperature thresholds.",         color:"#ef4444"},
              {label:"Remote Web Dashboard",   icon:<Activity size={18}/>,  desc:"Secure web access from any device — anywhere, anytime.",                     color:"#22c55e"},
            ].map((item,i)=>(
              <div key={item.label} ref={intRefs[i]} className="fu" style={{ background:"#fff", border:`1px solid ${item.color}22`, borderLeft:`4px solid ${item.color}`, borderRadius:14, padding:"20px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", transition:"box-shadow 0.2s,transform 0.2s" }}>
                <div style={{ width:40, height:40, borderRadius:10, background:`${item.color}18`, display:"flex", alignItems:"center", justifyContent:"center", color:item.color, marginBottom:12 }}>{item.icon}</div>
                <h4 style={{ fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:5 }}>{item.label}</h4>
                <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ WHY CHOOSE ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)" }} className="tm2-section">
        <div className="tm2-inner">
          <div ref={refWhy} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
            <div className="tm2-section-badge" style={{ margin:"0 auto 12px" }}><Shield size={11}/> Why Choose</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:700, color:"#0f1117", marginBottom:12 }}>Why Continuous Thermal Monitoring Pays for Itself</h2>
          </div>
          <div className="tm2-why-grid">
            {whyChoose.map((item,i)=>(
              <div key={item.label} ref={whyRefs[i]} className="fu" style={{ display:"flex", gap:14, alignItems:"flex-start", background:"#fff", border:"1px solid #eef0f4", borderLeft:`4px solid ${item.color}`, borderRadius:14, padding:"18px 20px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", transition:"box-shadow 0.2s,transform 0.2s" }}>
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
};

export default ThermalMonitoringAutomationProduct;