
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, CheckCircle2, Wifi, Cloud,
  Cpu, Activity, Zap, BarChart3, Monitor, Thermometer,
  Eye, Bell, TrendingUp, Shield,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

import imgEnergy      from "@/assets/monitoring/energy.png";
import imgWater       from "@/assets/monitoring/water.png";
import imgDG          from "@/assets/monitoring/dg.png";
import imgAQI         from "@/assets/monitoring/aqi.png";
import imgFire        from "@/assets/monitoring/fire.png";
import imgUPS         from "@/assets/monitoring/ups.png";
import imgHVAC        from "@/assets/monitoring/hvac.png";
import imgVibration   from "@/assets/monitoring/vibration.png";
import imgCompressor  from "@/assets/monitoring/compressor.png";
import imgGas         from "@/assets/monitoring/gas.png";
import imgTransformer from "@/assets/monitoring/transformer.png";
import imgSteam       from "@/assets/monitoring/steam.png";
import imgSolar       from "@/assets/monitoring/solar.png";
import imgElectrical  from "@/assets/monitoring/electrical.png";

import iiot from "@/assets/iiot.png";
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

/* ═══════════════════════════════════════════════════════
   IIOT DEVICE SVG — hero right panel
═══════════════════════════════════════════════════════ */
const IIoTDeviceSVG = () => (
  <svg viewBox="0 0 420 340" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block" }}>
    
    <defs>
      <linearGradient id="dev-bg"     x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      <linearGradient id="dev-body"   x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e3a5f"/><stop offset="100%" stopColor="#0f172a"/></linearGradient>
      <linearGradient id="dev-screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0f172a"/><stop offset="100%" stopColor="#1e293b"/></linearGradient>
      <linearGradient id="dev-amber"  x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ea580c"/></linearGradient>
      <linearGradient id="dev-wifi"   x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#38bdf8"/><stop offset="100%" stopColor="#0ea5e9"/></linearGradient>
      <filter id="dev-glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <marker id="dev-arr" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#f59e0b"/></marker>
    </defs>

    {/* ── Background ── */}
    <rect width="420" height="340" rx="20" fill="url(#dev-bg)"/>

    {/* ── Cloud (top centre) ── */}
    <ellipse cx="210" cy="38" rx="40" ry="18" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1.5"/>
    <ellipse cx="188" cy="44" rx="28" ry="16" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1"/>
    <ellipse cx="232" cy="44" rx="28" ry="16" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1"/>
    <text x="210" y="42" fill="#0369a1" fontSize="8" fontWeight="700" textAnchor="middle">ioEYE CLOUD</text>

    {/* ── Gateway device (centre) ── */}
    <rect x="145" y="100" width="130" height="100" rx="12" fill="url(#dev-body)" style={{ filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.35))" }}/>
    {/* Amber top accent */}
    <rect x="145" y="100" width="130" height="6" rx="12" fill="url(#dev-amber)"/>
    <rect x="145" y="103" width="130" height="3" fill="url(#dev-amber)"/>
    {/* Screen */}
    <rect x="157" y="114" width="106" height="56" rx="6" fill="url(#dev-screen)" stroke="rgba(245,158,11,0.30)" strokeWidth="1"/>
    {/* Waveform on screen */}
    <polyline points="162,142 170,132 178,148 186,128 194,144 202,134 210,146 218,130 226,142 234,136 242,145 250,133 258,141 262,141" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Screen grid lines */}
    {[128,136,144].map(y=><line key={y} x1="162" y1={y} x2="262" y2={y} stroke="#334155" strokeWidth="0.5"/>)}
    {/* Status LEDs */}
    <circle cx="158" cy="108" r="3" fill="#22c55e"><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/></circle>
    <circle cx="167" cy="108" r="3" fill="#f59e0b"/>
    <circle cx="176" cy="108" r="3" fill="#3b82f6"/>
    {/* Port row bottom */}
    <rect x="155" y="176" width="110" height="16" rx="4" fill="#172032"/>
    {[162,174,186,198,210,222,234,246].map(x=><rect key={x} x={x} y="179" width="7" height="10" rx="2" fill="#0ea5e9" opacity="0.6"/>)}
    {/* Device label */}
    <text x="210" y="210" fill="#fbbf24" fontSize="8.5" fontWeight="700" textAnchor="middle">IIoT GATEWAY</text>
    <text x="210" y="222" fill="#64748b" fontSize="7" textAnchor="middle">GPRS · LAN · WiFi</text>

    {/* ── WiFi signal rings ── */}
    {[1,2,3].map(i=>(
      <path key={i} d={`M${210-i*18},${96-i*6} Q210,${72-i*10} ${210+i*18},${96-i*6}`}
        fill="none" stroke="url(#dev-wifi)" strokeWidth={2-i*0.4} strokeLinecap="round" opacity={1-i*0.25}>
        <animate attributeName="opacity" values={`${1-i*0.25};${0.2-i*0.05};${1-i*0.25}`} dur={`${1.2+i*0.3}s`} repeatCount="indefinite"/>
      </path>
    ))}

    {/* ── Cloud connection line ── */}
    <line x1="210" y1="100" x2="210" y2="62" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#dev-arr)"/>

    {/* ── Left sensors ── */}
    {[
      {y:115, label:"Vibration", color:"#8b5cf6", val:"2.4 mm/s"},
      {y:155, label:"Temperature", color:"#ef4444", val:"68.2°C"},
      {y:195, label:"Current",  color:"#f59e0b", val:"24.1 A"},
    ].map(s=>(
      <g key={s.label}>
        <rect x="20" y={s.y} width="108" height="30" rx="8" fill="#fff" stroke={`${s.color}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.07))" }}/>
        <rect x="20" y={s.y} width="4" height="30" rx="2" fill={s.color} style={{ borderRadius:"8px 0 0 8px" }}/>
        <text x="34" y={s.y+11} fill={s.color} fontSize="8" fontWeight="700">{s.label}</text>
        <text x="34" y={s.y+23} fill="#334155" fontSize="9" fontWeight="900">{s.val}</text>
        {/* Connector line to gateway */}
        <line x1="128" y1={s.y+15} x2="145" y2={150} stroke={s.color} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" markerEnd="url(#dev-arr)"/>
      </g>
    ))}

    {/* ── Right sensors ── */}
    {[
      {y:115, label:"Ultrasound",  color:"#22c55e", val:"42 dBμV"},
      {y:155, label:"Voltage",     color:"#3b82f6", val:"415 V"},
      {y:195, label:"Pressure",    color:"#f97316", val:"6.2 Bar"},
    ].map(s=>(
      <g key={s.label}>
        <rect x="292" y={s.y} width="108" height="30" rx="8" fill="#fff" stroke={`${s.color}33`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.07))" }}/>
        <rect x="396" y={s.y} width="4" height="30" rx="2" fill={s.color}/>
        <text x="302" y={s.y+11} fill={s.color} fontSize="8" fontWeight="700">{s.label}</text>
        <text x="302" y={s.y+23} fill="#334155" fontSize="9" fontWeight="900">{s.val}</text>
        {/* Connector to gateway */}
        <line x1="292" y1={s.y+15} x2="275" y2={150} stroke={s.color} strokeWidth="1" strokeDasharray="4,3" opacity="0.5"/>
      </g>
    ))}

    {/* ── Output nodes (bottom) ── */}
    {[
      {x:70,  emoji:"📊", label:"Dashboard",  color:"#f59e0b"},
      {x:160, emoji:"🔔", label:"Alerts",      color:"#ef4444"},
      {x:250, emoji:"📱", label:"Mobile App",  color:"#3b82f6"},
      {x:340, emoji:"⚙️", label:"PLC / SCADA", color:"#22c55e"},
    ].map(o=>(
      <g key={o.label}>
        <rect x={o.x-38} y="250" width="76" height="50" rx="12" fill="#fff" stroke={`${o.color}28`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.06))" }}/>
        <text x={o.x} y="274" fontSize="18" textAnchor="middle">{o.emoji}</text>
        <text x={o.x} y="292" fill="#334155" fontSize="8.5" fontWeight="700" textAnchor="middle">{o.label}</text>
        <line x1={o.x} y1="248" x2={o.x} y2="235" stroke={o.color} strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#dev-arr)"/>
      </g>
    ))}
    {/* Connection from gateway to outputs */}
    <line x1="210" y1="200" x2="210" y2="230" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3"/>
    <line x1="70" y1="230" x2="340" y2="230" stroke="#f59e0b" strokeWidth="1" opacity="0.4"/>

    {/* ── Live badge ── */}
    <circle cx="22" cy="22" r="5" fill="#22c55e"><animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite"/></circle>
    <text x="33" y="26" fill="#22c55e" fontSize="8.5" fontWeight="700">LIVE · 24×7 Autonomous Monitoring</text>
  </svg>
);

/* ═══════════════════════════════════════════════════════
   DATA — monitoring systems with parameters
═══════════════════════════════════════════════════════ */
const monitoringSystems = [
  { img:imgEnergy,      emoji:"",   label:"Energy Monitoring",               color:"#f59e0b", bg:"#fffbeb",  params:["kWh","kVAh","kW","Power Factor","Current","Voltage"] },
  { img:imgWater,       emoji:"",   label:"Water Monitoring",                color:"#3b82f6", bg:"#eff6ff",  params:["Flow Rate","Total Volume","Pressure","pH Level","Turbidity"] },
  { img:imgDG,          emoji:"",   label:"DG Monitoring",                   color:"#f97316", bg:"#fff7ed",  params:["Run Hours","kWh","Fuel Level","Load %","Temperature","Current"] },
  { img:imgAQI,         emoji:"",   label:"AQI Monitoring",                  color:"#22c55e", bg:"#f0fdf4",  params:["PM2.5","PM10","CO₂","NO₂","SO₂","Temperature","Humidity"] },
  { img:imgFire,        emoji:"",   label:"Fire Fighting Monitoring",        color:"#ef4444", bg:"#fef2f2",  params:["Smoke Level","Heat","Water Pressure","Tank Level","Alarm Status"] },
  { img:imgUPS,         emoji:"",   label:"UPS Monitoring",                  color:"#f59e0b", bg:"#fffbeb",  params:["Battery %","Input V","Output V","Load %","Temperature","Runtime"] },
  { img:imgHVAC,        emoji:"",   label:"HVAC Monitoring",                 color:"#0ea5e9", bg:"#f0f9ff",  params:["Temperature","Humidity","Airflow","kWh","Chiller Status","COP"] },
  { img:imgVibration,   emoji:"",   label:"Vibration Monitoring",            color:"#8b5cf6", bg:"#f5f3ff",  params:["Velocity mm/s","Acceleration g","Displacement","Frequency","Bearing Temp"] },
  { img:imgCompressor,  emoji:"",   label:"Compressor Monitoring",           color:"#64748b", bg:"#f8fafc",  params:["Inlet Pressure","Outlet Pressure","Temperature","Current","kWh","Run Hours"] },
  { img:imgGas,         emoji:"",   label:"Gas System Monitoring",           color:"#f97316", bg:"#fff7ed",  params:["Gas Flow","Pressure","Leakage","LPG Level","Consumption","Alerts"] },
  { img:imgTransformer, emoji:"",   label:"Transformer Monitoring",          color:"#f59e0b", bg:"#fffbeb",  params:["Oil Temp","Winding Temp","Load %","Voltage","Current","Cooling Status"] },
  { img:imgSteam,       emoji:"",   label:"Steam & Valves Monitoring",       color:"#6366f1", bg:"#eef2ff",  params:["Steam Pressure","Temperature","Flow Rate","Valve Status","Trap Condition"] },
  { img:imgSolar,       emoji:"",   label:"Solar Monitoring",                color:"#eab308", bg:"#fefce8",  params:["Generation kWh","Irradiance","Panel Temp","Inverter Status","PR Ratio"] },
  { img:imgElectrical,  emoji:"",   label:"Electrical Signature Monitoring", color:"#ea580c", bg:"#fff7ed",  params:["Current Signature","Voltage Signature","Power Factor","Harmonics","Motor Faults"] },
  { img:null,           emoji:"🌾", label:"Agriculture Monitoring",          color:"#22c55e", bg:"#f0fdf4",  params:["Soil Moisture","Temperature","Humidity","pH","Fertiliser Level","Rain"] },
  { img:null,           emoji:"📊", label:"FLMS Monitoring",                 color:"#ef4444", bg:"#fef2f2",  params:["Flow Rate","Level","Pressure","Temperature","Consumption","Alerts"] },
  { img:null,           emoji:"☁️", label:"Remote Monitoring & Alerts",      color:"#475569", bg:"#f8fafc",  params:["Any Parameter","SMS Alerts","Email Alerts","Mobile App","Dashboard","Reports"] },
  { img:null,           emoji:"📡", label:"Gas Monitoring System",           color:"#f97316", bg:"#fff7ed",  params:["Gas Concentration","LEL %","O₂ Level","H₂S","CO","Alarm Status"] },
];

/* ── Thermal monitoring data ── */
const thermalSystems = [
  { icon:"🔆", title:"Fixed Thermal Cameras",        color:"#ef4444", params:["Surface Temp","Hotspot Detection","Alarm Zones","Trend Logging"],     desc:"24/7 continuous thermal surveillance of kilns, coal piles, sub-stations and process equipment. Alerts on configurable temperature thresholds." },
  { icon:"🤚", title:"Handheld IR Thermography",     color:"#f97316", params:["Min / Max Temp","Delta-T","Emissivity","Thermal Image"],              desc:"Portable inspections of electrical panels, motors, bearings and building structures using SONOTEC THERMEYE 256 and advanced handheld cameras." },
  { icon:"🏭", title:"Industrial Process Monitoring", color:"#f59e0b", params:["Belt / Roll Temp","Shell Temp","Melt Temp","Zone Mapping"],           desc:"Non-contact temperature mapping of rolling mills, dryer rolls, ladle mouths, conveyor belts and continuous casting processes." },
  { icon:"⚡", title:"HT Electrical Thermal Audit",  color:"#eab308", params:["Bus-Bar Temp","Connection Temp","Panel Temp","PD Correlation"],       desc:"Thermal imaging combined with partial discharge detection on HT switchgear, transformers and cable terminations for full electrical health assessment." },
  { icon:"🔥", title:"Fire Risk & Coal Pile",         color:"#dc2626", params:["Self-Heating Zones","Temp Rise Rate","Area Mapping","SMS Alerts"],   desc:"Automated thermal surveillance of coal stockpiles, waste bunkers and fire-sensitive storage areas to prevent spontaneous combustion incidents." },
  { icon:"🌡", title:"Building & HVAC Thermal",       color:"#0ea5e9", params:["Wall Temp","Air Leakage","Insulation Loss","HVAC Performance"],      desc:"Thermal imaging for building energy audits, insulation defects, moisture ingress, HVAC duct leaks and cold bridge identification." },
];

const iiotSteps = [
  { letter:"A", icon:Cpu,   title:"Smart IIoT Sensors",  desc:"Battery-powered smart sensors acquire vibration and other machine health data from rotating equipment." },
  { letter:"B", icon:Wifi,  title:"IIoT Gateway",         desc:"Secure GPRS / LAN / WiFi communication channel between field sensors and the cloud platform." },
  { letter:"C", icon:Cloud, title:"ioEYE Predict Cloud",  desc:"Collects and analyses sensor data using machine learning algorithms to predict machine failures before they occur." },
];

const mlFeatures = [
  { title:"24×7 Autonomous Monitoring",  desc:"Continuous machine health monitoring without manual intervention." },
  { title:"ML Fault Identification",     desc:"Automatic fault categorisation — Unbalance, Misalignment, Looseness, Motor faults." },
  { title:"Failure Risk Estimation",     desc:"Probability of failure score and failure risk rated High / Medium / Low." },
  { title:"ISO 10816 Trending & Alerts", desc:"Velocity, acceleration, displacement trending with configurable threshold alerts." },
  { title:"Anomaly Detection",           desc:"Machine learning detects abnormal patterns before they escalate to failures." },
  { title:"Email & Mobile App Alerts",   desc:"Instant notifications via email and mobile app the moment an anomaly is detected." },
];

const bearingBenefits = ["Predictive Maintenance","Real-Time Monitoring","Cost Savings","Remote Monitoring & Alerts","Seamless Integration","Enhanced Operational Efficiency"];
const esaInsights     = ["Stator and rotor faults","Phase imbalance and electrical issues","Power consumption and power factor","Duty cycle and inrush current behavior"];
const heroStats       = [
  {num:"18+",label:"Monitoring Systems"},{num:"24×7",label:"Autonomous Monitoring"},{num:"IIoT 4.0",label:"Technology"},
];

/* ═══════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  .ms-page{font-family:'Roboto',sans-serif;color:#1e293b;}
  .ms-page *{box-sizing:border-box;}

  .fu{opacity:0;transform:translateY(22px);transition:opacity 0.55s ease,transform 0.55s ease;}
  .fu.vis{opacity:1;transform:translateY(0);}

  /* ── Hero ── */
  .ms-hero{position:relative;overflow:hidden;min-height:80vh;display:flex;align-items:center;}
  .ms-hero-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(0.62);pointer-events:none;}
  .ms-hero-wash{position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,251,235,0.90) 0%,rgba(224,242,254,0.82) 55%,rgba(255,251,235,0.90) 100%);}
  .ms-hero-dots{position:absolute;inset:0;opacity:0.07;background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0);background-size:40px 40px;}
  .ms-hero-burst{position:absolute;pointer-events:none;width:70vw;height:70vw;border-radius:50%;background:radial-gradient(circle,rgba(251,191,36,0.26) 0%,rgba(251,191,36,0.09) 40%,transparent 70%);top:-15%;left:-8%;}
  .ms-hero-sky{position:absolute;pointer-events:none;width:55vw;height:55vw;border-radius:50%;background:radial-gradient(circle,rgba(56,189,248,0.20) 0%,rgba(56,189,248,0.06) 45%,transparent 70%);bottom:-15%;right:-5%;}

  /* ── Hero two-col ── */
  .ms-hero-grid{
    position:relative; max-width:1280px; margin:0 auto;
    padding:80px 28px 72px; width:100%;
    display:grid; grid-template-columns:1fr 1fr; gap:52px; align-items:center;
  }
  @media(max-width:900px){ .ms-hero-grid{ grid-template-columns:1fr; } }

  /* ── IIoT device card (hero right) ── */
  .ms-iiot-device-card{
    background:rgba(255,255,255,0.88);
    border:1px solid rgba(245,158,11,0.28);
    border-radius:24px;
    overflow:hidden;
    box-shadow:0 16px 56px rgba(0,0,0,0.12), 0 2px 8px rgba(245,158,11,0.14);
    backdrop-filter:blur(8px);
  }
  .ms-iiot-device-card::before{
    content:''; display:block; width:100%; height:4px;
    background:linear-gradient(90deg,#f59e0b,#ea580c);
  }
  .ms-iiot-label{
    display:flex; align-items:center; gap:8px;
    padding:10px 16px;
    background:rgba(15,23,42,0.94);
    font-size:11px; font-weight:700; text-transform:uppercase;
    letter-spacing:0.08em; color:#94a3b8;
  }
  .ms-iiot-live{width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0;animation:ms-pulse 1.6s ease-in-out infinite;}

  .ms-bread{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:24px;}
  .ms-bread a{font-size:12.5px;color:#64748b;text-decoration:none;transition:color 0.15s;}
  .ms-bread a:hover{color:#f59e0b;}

  .ms-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.35);color:#b45309;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:5px 14px;border-radius:999px;margin-bottom:20px;}
  .ms-section-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.22);color:#b45309;font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;padding:5px 14px;border-radius:999px;margin-bottom:12px;}

  .ms-stat{background:rgba(255,255,255,0.82);border:1px solid rgba(245,158,11,0.28);border-radius:14px;padding:14px 18px;backdrop-filter:blur(10px);box-shadow:0 2px 12px rgba(0,0,0,0.06);}
  .ms-stat-num{font-size:24px;font-weight:900;color:#ea580c;line-height:1;}
  .ms-stat-label{font-size:11px;color:#64748b;font-weight:500;margin-top:3px;}

  .ms-btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#f59e0b,#ea580c);color:#fff;font-size:15px;font-weight:700;padding:14px 28px;border-radius:12px;text-decoration:none;transition:transform 0.15s,box-shadow 0.2s;box-shadow:0 4px 20px rgba(245,158,11,0.38);}
  .ms-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(245,158,11,0.52);}
  .ms-btn-ghost{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.72);backdrop-filter:blur(8px);color:#334155;font-size:15px;font-weight:500;padding:14px 28px;border-radius:12px;text-decoration:none;border:1px solid rgba(245,158,11,0.25);transition:border-color 0.2s,background 0.2s;}
  .ms-btn-ghost:hover{border-color:#f59e0b;background:#fffbeb;color:#b45309;}

  /* ════ MONITORING CARD GRID ════ */
  .ms-monitor-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:18px;}

  .ms-monitor-card{
    background:#fff; border:1px solid #eef0f4; border-radius:20px; overflow:hidden;
    box-shadow:0 3px 14px rgba(0,0,0,0.06);
    transition:border-color 0.22s,box-shadow 0.22s,transform 0.22s;
    display:flex; flex-direction:column;
  }
  .ms-monitor-card:hover{
    border-color:rgba(245,158,11,0.40);
    box-shadow:0 12px 36px rgba(245,158,11,0.16);
    transform:translateY(-5px) scale(1.02);
  }
  .ms-monitor-img-zone{
    width:100%; height:120px;
    display:flex; align-items:center; justify-content:center;
    padding:14px 14px 10px; overflow:hidden; flex-shrink:0;
  }
  .ms-monitor-img-zone img{
    max-height:100%; max-width:100%; object-fit:contain;
    transition:transform 0.3s ease;
    filter:drop-shadow(0 4px 12px rgba(0,0,0,0.14));
  }
  .ms-monitor-card:hover .ms-monitor-img-zone img{transform:scale(1.10) translateY(-3px);}
  .ms-monitor-emoji-zone{
    width:100%; height:120px;
    display:flex; align-items:center; justify-content:center;
    font-size:48px; flex-shrink:0;
  }
  .ms-monitor-label-band{
    width:100%; padding:10px 12px 6px;
    border-top:1px solid #f1f5f9; text-align:center;
  }
  .ms-monitor-label{font-size:12.5px;font-weight:700;color:#1e293b;line-height:1.3;}

  /* ── Parameter tags ── */
  .ms-params{
    display:flex; flex-wrap:wrap; gap:4px;
    padding:6px 10px 12px; justify-content:center;
  }
  .ms-param-tag{
    font-size:9.5px; font-weight:600;
    padding:2px 7px; border-radius:999px;
    white-space:nowrap; line-height:1.5;
  }

  /* ── Thermal section ── */
  .ms-thermal-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
    gap:20px;
  }
  .ms-thermal-card{
    background:#fff; border:1px solid #eef0f4; border-radius:18px;
    overflow:hidden; transition:box-shadow 0.22s,border-color 0.22s,transform 0.22s;
    position:relative;
  }
  .ms-thermal-card::before{
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    opacity:0; transition:opacity 0.2s;
  }
  .ms-thermal-card:hover{box-shadow:0 12px 36px rgba(0,0,0,0.10);border-color:rgba(245,158,11,0.28);transform:translateY(-4px);}
  .ms-thermal-card:hover::before{opacity:1;}
  .ms-thermal-header{padding:20px 20px 12px;display:flex;align-items:center;gap:12px;}
  .ms-thermal-icon{font-size:28px;flex-shrink:0;}
  .ms-thermal-body{padding:0 20px 20px;}
  .ms-thermal-params{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px;}
  .ms-thermal-param{
    font-size:10px; font-weight:700;
    padding:3px 9px; border-radius:999px;
    background:#fef3c7; border:1px solid rgba(245,158,11,0.28);
    color:#92400e;
  }

  /* Steps */
  .ms-steps-row{display:flex;justify-content:center;gap:22px;flex-wrap:wrap;}
  .ms-step-card{background:#fff;border:1px solid #eef0f4;border-radius:20px;padding:28px 24px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.06);transition:box-shadow 0.22s,border-color 0.22s,transform 0.22s;position:relative;overflow:hidden;width:280px;flex-shrink:0;}
  .ms-step-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#f59e0b,#ea580c);opacity:0;transition:opacity 0.2s;}
  .ms-step-card:hover{box-shadow:0 14px 40px rgba(0,0,0,0.10);border-color:rgba(245,158,11,0.30);transform:translateY(-5px);}
  .ms-step-card:hover::before{opacity:1;}
  .ms-step-letter{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#f59e0b,#ea580c);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#fff;margin:0 auto 16px;box-shadow:0 6px 20px rgba(245,158,11,0.32);}

  .ms-ml-card{background:#fff;border:1px solid #eef0f4;border-radius:16px;padding:22px 20px;transition:box-shadow 0.2s,border-color 0.2s,transform 0.2s;position:relative;overflow:hidden;}
  .ms-ml-card::after{content:'';position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(to bottom,#f59e0b,#ea580c);opacity:0;transition:opacity 0.2s;}
  .ms-ml-card:hover{box-shadow:0 8px 28px rgba(0,0,0,0.09);border-color:rgba(245,158,11,0.28);transform:translateY(-3px);}
  .ms-ml-card:hover::after{opacity:1;}

  .ms-two-col{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start;}
  @media(max-width:900px){.ms-two-col{grid-template-columns:1fr;gap:36px;}}

  .ms-benefit-pill{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #eef0f4;border-radius:12px;padding:12px 16px;transition:border-color 0.2s,box-shadow 0.2s;}
  .ms-benefit-pill:hover{border-color:rgba(245,158,11,0.30);box-shadow:0 4px 14px rgba(0,0,0,0.06);}

  .ms-esa-box{background:#fff;border:1px solid #eef0f4;border-radius:20px;padding:32px 36px;box-shadow:0 8px 32px rgba(0,0,0,0.06);position:relative;overflow:hidden;}
  .ms-esa-box::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#f59e0b,#ea580c);}

  .ms-cta{position:relative;overflow:hidden;background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%);}
  .ms-cta-burst{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%);top:-200px;right:-100px;pointer-events:none;}

  @keyframes ms-pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.5);opacity:0.6;}}
  .ms-pulse-dot{width:10px;height:10px;border-radius:50%;background:#16a34a;animation:ms-pulse 2s infinite;flex-shrink:0;}

  .ms-flow-node{display:flex;flex-direction:column;align-items:center;gap:8px;background:#fff;border:1px solid rgba(245,158,11,0.25);border-radius:16px;padding:18px 20px;min-width:110px;box-shadow:0 4px 16px rgba(0,0,0,0.06);}
  .ms-flow-icon{width:44px;height:44px;border-radius:12px;background:rgba(245,158,11,0.10);display:flex;align-items:center;justify-content:center;color:#f59e0b;}
  .ms-flow-label{font-size:11px;font-weight:700;color:#334155;text-align:center;line-height:1.3;}
  .ms-flow-line{width:40px;height:2px;background:linear-gradient(90deg,rgba(245,158,11,0.5),rgba(234,88,12,0.5));flex-shrink:0;position:relative;}
  .ms-flow-line::after{content:'▶';position:absolute;right:-5px;top:-7px;font-size:10px;color:#f59e0b;}

  /* ── Thermal highlight box ── */
  .ms-thermal-highlight{
    background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);
    border-radius:20px; padding:32px 36px; color:#fff;
    box-shadow:0 12px 40px rgba(15,23,42,0.28);
    position:relative; overflow:hidden;
    border:1px solid rgba(245,158,11,0.20);
  }
  .ms-thermal-highlight::before{
    content:''; position:absolute; top:0; left:0; right:0; height:4px;
    background:linear-gradient(90deg,#ef4444,#f97316,#f59e0b);
  }
  .ms-thermal-highlight::after{
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse at 80% 0%,rgba(239,68,68,0.12) 0%,transparent 60%);
    pointer-events:none;
  }

  /* ── Section divider ── */
  .ms-divider{width:100%;height:3px;background:linear-gradient(90deg,#f59e0b,#ea580c,#f59e0b);opacity:0.15;border:none;margin:0;}
`;

/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
const MonitoringSystems = () => {
  const refGrid     = useFU(0);
  const refIIoT     = useFU(0);
  const refML       = useFU(0);
  const refBearing  = useFU(0);
  const refESA      = useFU(0);
  const refThermal  = useFU(0);

  const stepRefs    = [useFU(0), useFU(120), useFU(240)];
  const mlRefs      = [useFU(0), useFU(80), useFU(160), useFU(240), useFU(320), useFU(400)];
  const sysRefs     = monitoringSystems.map((_, i) => useFU(i * 35));
  const thermalRefs = thermalSystems.map((_, i) => useFU(i * 80));

  return (
    <div className="ms-page">
      <style>{css}</style>

      {/* ════ HERO — two-col with IIoT device SVG ════ */}
      <section className="ms-hero">
        <img src={heroBg} alt="" className="ms-hero-photo" aria-hidden="true"/>
        <div className="ms-hero-wash"/><div className="ms-hero-dots"/>
        <div className="ms-hero-burst"/><div className="ms-hero-sky"/>

        <div className="ms-hero-grid">
          {/* ── Left copy ── */}
          <div>
            <div className="ms-bread">
              <Link to="/">Home</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
              <Link to="/products">Products</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
              <span style={{ fontSize:12.5, color:"#334155", fontWeight:500 }}>Monitoring Systems</span>
            </div>

            <div className="ms-badge"><Wifi size={11}/> IIoT 4.0 Technology</div>

            <h1 style={{ fontSize:"clamp(26px,4.5vw,54px)", fontWeight:900, color:"#1e293b", lineHeight:1.05, marginBottom:18, maxWidth:560 }}>
              IIoT Based{" "}
              <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Monitoring Solutions
              </span>
            </h1>

            <p style={{ fontSize:"clamp(14px,1.4vw,17px)", color:"#475569", lineHeight:1.75, marginBottom:32, maxWidth:500 }}>
              <em style={{ color:"#b45309", fontWeight:600 }}>Empowering Sustainability with Smart Solutions.</em>
              {" "}Connected IIoT sensors, gateway and cloud analytics — 18+ monitoring systems for energy, water, vibration, thermal, electrical, gas and more.
            </p>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:32 }}>
              {heroStats.map(s=>(
                <div key={s.label} className="ms-stat">
                  <div className="ms-stat-num">{s.num}</div>
                  <div className="ms-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Link to="/contact" className="ms-btn-primary">Request a Demo <ArrowRight size={16}/></Link>
            </div>
          </div>

          {/* ── Right — IIoT device SVG ── */}
          <div>
            <div className="ms-iiot-device-card">
              <div className="ms-iiot-label">
                <span className="ms-iiot-live"/>
                IIoT Platform — Live System Overview
                <span style={{ marginLeft:"auto", background:"rgba(245,158,11,0.15)", border:"1px solid rgba(245,158,11,0.30)", color:"#fbbf24", fontSize:9.5, fontWeight:700, padding:"2px 9px", borderRadius:999 }}>
                  MONITORING ACTIVE
                </span>
              </div>
              <div style={{ padding:"12px", background:"#fff" }}>
  <img
    src={iiot}
    alt="IIoT Monitoring System"
    style={{
      width: "100%",
      height: "auto",
      objectFit: "contain",
      borderRadius: "12px"
    }}
  />
</div>
            </div>
          </div>
        </div>
      </section>

      <hr className="ms-divider"/>

      {/* ════ MONITORING PORTFOLIO — CARDS WITH PARAMETERS ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding:"72px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refGrid} className="fu" style={{ textAlign:"center", marginBottom:52 }}>
            <div className="ms-section-badge" style={{ margin:"0 auto 12px" }}><Wifi size={11}/> 18+ Systems</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>
              Complete IIoT Monitoring Portfolio
            </h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>
              Every system connects field sensors to real-time dashboards — instant visibility and predictive alerts across your entire facility.
            </p>
          </div>

          <div className="ms-monitor-grid">
            {monitoringSystems.map((s, i) => (
              <div key={s.label + i} ref={sysRefs[i]} className="ms-monitor-card fu">
                {/* Accent top stripe */}
                <div style={{ width:"100%", height:4, background:`linear-gradient(90deg,${s.color},${s.color}88)`, borderRadius:"20px 20px 0 0", flexShrink:0 }}/>

                {/* Image or emoji */}
                {s.img ? (
                  <div className="ms-monitor-img-zone" style={{ background:s.bg }}>
                    <img src={s.img} alt={s.label}/>
                  </div>
                ) : (
                  <div className="ms-monitor-emoji-zone" style={{ background:s.bg }}>
                    {s.emoji}
                  </div>
                )}

                {/* Label */}
                <div className="ms-monitor-label-band">
                  <span className="ms-monitor-label">{s.label}</span>
                </div>

                {/* ── Parameter tags ── */}
                <div className="ms-params">
                  {s.params.slice(0, 4).map(p => (
                    <span
                      key={p}
                      className="ms-param-tag"
                      style={{ background:`${s.color}12`, border:`1px solid ${s.color}30`, color:s.color }}
                    >
                      {p}
                    </span>
                  ))}
                  {s.params.length > 4 && (
                    <span className="ms-param-tag" style={{ background:"#f1f5f9", border:"1px solid #e2e8f0", color:"#64748b" }}>
                      +{s.params.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="ms-divider"/>

      {/* ════ THERMAL MONITORING SOLUTIONS ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fff7ed 100%)", padding:"72px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refThermal} className="fu" style={{ textAlign:"center", marginBottom:52 }}>
            <div className="ms-section-badge" style={{ margin:"0 auto 12px" }}><Thermometer size={11}/> Thermal Monitoring</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,36px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>
              Thermal Monitoring Solutions
            </h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:560, margin:"0 auto" }}>
              Non-contact infrared thermography and fixed thermal camera systems for 24/7 hotspot detection, fire prevention and industrial process temperature surveillance.
            </p>
          </div>

          {/* Thermal highlight banner */}
          <div className="ms-thermal-highlight" style={{ marginBottom:40 }}>
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, flexWrap:"wrap" }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(239,68,68,0.18)", border:"1px solid rgba(239,68,68,0.30)", color:"#fca5a5", fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", padding:"4px 12px", borderRadius:999 }}>
                  <Thermometer size={11}/> Infrared Thermography
                </div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(245,158,11,0.18)", border:"1px solid rgba(245,158,11,0.30)", color:"#fbbf24", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:999 }}>
                  <Eye size={11}/> Fixed Camera Systems
                </div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(34,197,94,0.18)", border:"1px solid rgba(34,197,94,0.30)", color:"#86efac", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:999 }}>
                  <Bell size={11}/> Automated Alerts
                </div>
              </div>
              <h3 style={{ fontSize:"clamp(18px,2.5vw,26px)", fontWeight:800, color:"#fff", marginBottom:10, lineHeight:1.2 }}>
                24/7 Automated Thermal Surveillance — Detect Hotspots Before They Become Failures
              </h3>
              <p style={{ fontSize:14.5, color:"rgba(255,255,255,0.78)", lineHeight:1.75, maxWidth:680 }}>
                From handheld IR cameras for periodic surveys to permanently fixed thermal cameras with real-time alarm outputs — our thermal monitoring solutions cover every application from HT sub-stations and coal piles to rolling mills and building energy audits.
              </p>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:20 }}>
                {["Non-Contact Sensing","±1°C Accuracy","IP67 Weatherproof","PLC / SCADA Integration","SMS + Email Alerts","Up to 25 m Standoff"].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:8, padding:"5px 12px", fontSize:11.5, fontWeight:600, color:"rgba(255,255,255,0.90)" }}>
                    <CheckCircle2 size={11} style={{ color:"#fbbf24", flexShrink:0 }}/>{f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Six thermal solution cards */}
          <div className="ms-thermal-grid">
            {thermalSystems.map((t, i) => (
              <div key={t.title} ref={thermalRefs[i]} className="ms-thermal-card fu"
                style={{ boxShadow:"0 3px 14px rgba(0,0,0,0.06)" }}>
                {/* Top accent bar */}
                <div style={{ height:3, background:`linear-gradient(90deg,${t.color},${t.color}88)`, borderRadius:"18px 18px 0 0" }}/>
                {/* Header */}
                <div className="ms-thermal-header">
                  <span className="ms-thermal-icon">{t.icon}</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#0f1117", lineHeight:1.2 }}>{t.title}</div>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:4, background:`${t.color}12`, border:`1px solid ${t.color}30`, color:t.color, fontSize:9.5, fontWeight:700, padding:"2px 8px", borderRadius:999, marginTop:4 }}>
                      <span style={{ width:5, height:5, borderRadius:"50%", background:t.color, display:"inline-block" }}/>
                      Thermal Solution
                    </div>
                  </div>
                </div>
                {/* Body */}
                <div className="ms-thermal-body">
                  {/* Parameters */}
                  <div className="ms-thermal-params">
                    {t.params.map(p=>(
                      <span key={p} className="ms-thermal-param" style={{ background:`${t.color}10`, border:`1px solid ${t.color}28`, color:t.color }}>
                        {p}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize:13, color:"#64748b", lineHeight:1.65 }}>{t.desc}</p>
                 
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <hr className="ms-divider"/>

      {/* ════ IIoT ARCHITECTURE ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding:"72px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refIIoT} className="fu" style={{ textAlign:"center", marginBottom:52 }}>
            <div className="ms-section-badge" style={{ margin:"0 auto 12px" }}><Cloud size={11}/> ioEYE PREDICT</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>
              How the IIoT Platform Works
            </h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:540, margin:"0 auto" }}>
              Three components working seamlessly — from sensor to cloud — making machine failure predictable, affordable and less stressful.
            </p>
          </div>

          {/* Flow */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0, flexWrap:"wrap", marginBottom:52 }}>
            {[
              {icon:Activity, label:"Rotating Equipment"},
              {icon:Cpu,      label:"IIoT Sensors (Battery Powered)"},
              {icon:Wifi,     label:"Gateway GPRS / LAN / WiFi"},
              {icon:Cloud,    label:"ioEYE Predict Cloud"},
              {icon:Monitor,  label:"Web / Mobile Dashboard"},
            ].map((node,i,arr)=>(
              <div key={node.label} style={{ display:"flex", alignItems:"center" }}>
                <div className="ms-flow-node">
                  <div className="ms-flow-icon"><node.icon size={20}/></div>
                  <div className="ms-flow-label">{node.label}</div>
                </div>
                {i < arr.length-1 && <div className="ms-flow-line"/>}
              </div>
            ))}
          </div>

          <div className="ms-steps-row">
            {iiotSteps.map((step,i)=>(
              <div key={step.letter} ref={stepRefs[i]} className="ms-step-card fu">
                <div className="ms-step-letter">{step.letter}</div>
                <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
                  <div style={{ width:44,height:44,borderRadius:12,background:"rgba(245,158,11,0.10)",display:"flex",alignItems:"center",justifyContent:"center",color:"#f59e0b" }}>
                    <step.icon size={20}/>
                  </div>
                </div>
                <h3 style={{ fontSize:16,fontWeight:700,color:"#0f1117",marginBottom:8 }}>{step.title}</h3>
                <p style={{ fontSize:13.5,color:"#64748b",lineHeight:1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="ms-divider"/>

      {/* ════ ML FEATURES ════ */}
      <section style={{ background:"#fffbeb", padding:"72px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refML} className="fu" style={{ textAlign:"center", marginBottom:48 }}>
            <div className="ms-section-badge" style={{ margin:"0 auto 12px" }}><BarChart3 size={11}/> Software Features</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>
              Powerful Features in a Subscription Model
            </h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>
              Sensors and cloud software detect early signs of machine failure and reduce losses due to unexpected downtime.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:18 }}>
            {mlFeatures.map((f,i)=>(
              <div key={f.title} ref={mlRefs[i]} className="ms-ml-card fu">
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <CheckCircle2 size={17} style={{ color:"#f59e0b", flexShrink:0, marginTop:2 }}/>
                  <div>
                    <div style={{ fontSize:14.5, fontWeight:700, color:"#0f1117", marginBottom:5 }}>{f.title}</div>
                    <div style={{ fontSize:13.5, color:"#64748b", lineHeight:1.65 }}>{f.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="ms-divider"/>

      {/* ════ BEARING + ESA ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding:"72px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }} className="ms-two-col">
          <div ref={refBearing} className="fu">
            <div className="ms-section-badge"><Activity size={11}/> Bearing Condition</div>
            <h2 style={{ fontSize:"clamp(20px,2.8vw,30px)", fontWeight:800, color:"#0f1117", marginBottom:16, lineHeight:1.2 }}>
              IIoT Solution for Bearing Condition Monitoring
            </h2>
            <p style={{ fontSize:14.5, color:"#64748b", lineHeight:1.75, marginBottom:24 }}>
              IIoT 4.0 Technology Based sensors and data analytics track the health of bearings in industrial equipment — enabling predictive maintenance, reducing downtime and optimising performance.
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24, padding:"12px 16px", background:"#f0fdf4", border:"1px solid rgba(22,163,74,0.20)", borderRadius:12 }}>
              <div className="ms-pulse-dot"/>
              <span style={{ fontSize:13.5, fontWeight:600, color:"#15803d" }}>24×7 Autonomous Machine Health Monitoring Active</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {bearingBenefits.map(b=>(
                <div key={b} className="ms-benefit-pill">
                  <CheckCircle2 size={15} style={{ color:"#f59e0b", flexShrink:0 }}/>
                  <span style={{ fontSize:13.5, fontWeight:500, color:"#334155" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={refESA} className="fu">
            <div className="ms-esa-box">
              <div className="ms-section-badge" style={{ marginBottom:16 }}><Zap size={11}/> ESA Technology</div>
              <h2 style={{ fontSize:"clamp(18px,2.5vw,26px)", fontWeight:800, color:"#0f1117", marginBottom:16, lineHeight:1.2 }}>
                Advanced Motor Diagnostics with ESA
              </h2>
              <p style={{ fontSize:14, color:"#64748b", lineHeight:1.75, marginBottom:24 }}>
                Electrical Signature Analysis (ESA) provides online condition monitoring of rotary machines — analysing current &amp; voltage patterns to predict faults in prime mover machines.
              </p>
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#b45309", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12 }}>
                  Motor Health &amp; Energy Insights
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                  {esaInsights.map(item=>(
                    <div key={item} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                      <CheckCircle2 size={14} style={{ color:"#f59e0b", flexShrink:0, marginTop:2 }}/>
                      <span style={{ fontSize:13.5, color:"#475569", lineHeight:1.55 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {[
                  {label:"High Risk",   bg:"#fef2f2", border:"rgba(239,68,68,0.25)",   dot:"#ef4444"},
                  {label:"Medium Risk", bg:"#fffbeb", border:"rgba(245,158,11,0.30)",  dot:"#f59e0b"},
                  {label:"Low Risk",    bg:"#f0fdf4", border:"rgba(22,163,74,0.25)",   dot:"#16a34a"},
                ].map(r=>(
                  <div key={r.label} style={{ display:"flex",alignItems:"center",gap:6,background:r.bg,border:`1px solid ${r.border}`,borderRadius:8,padding:"6px 12px",fontSize:12.5,fontWeight:600,color:"#334155" }}>
                    <div style={{ width:8,height:8,borderRadius:"50%",background:r.dot }}/>{r.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default MonitoringSystems;