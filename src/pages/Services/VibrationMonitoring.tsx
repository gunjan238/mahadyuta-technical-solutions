/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, CheckCircle2,
  Activity, BarChart3, Wifi, Cpu, Cloud,
  AlertTriangle, Shield, Monitor, Zap,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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
   SVG ILLUSTRATIONS
═══════════════════════════════════════════════════════ */

/* 1 ── Hero: Vibration dashboard with live waveform */
const HeroSVG = () => {
  const waveA = Array.from({length:20},(_,i)=>({ x:20+i*30, y:160+Math.sin(i*0.9)*28+Math.cos(i*0.5)*12 }));
  const waveB = Array.from({length:20},(_,i)=>({ x:20+i*30, y:155+Math.sin(i*1.3)*20+Math.cos(i*0.7)*10 }));
  return (
    <svg viewBox="0 0 540 420" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:20 }}>
      <defs>
        <linearGradient id="vb-h-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1e293b"/><stop offset="100%" stopColor="#0f172a"/></linearGradient>
        <linearGradient id="vb-h-panel" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#162033"/><stop offset="100%" stopColor="#0c1626"/></linearGradient>
        <linearGradient id="vb-h-areaA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b" stopOpacity="0.40"/><stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/></linearGradient>
        <linearGradient id="vb-h-areaB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.30"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient>
        <filter id="vb-glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="540" height="420" rx="20" fill="url(#vb-h-bg)"/>

      {/* Top nav bar */}
      <rect width="540" height="42" fill="#1a2744" rx="20"/>
      <rect y="28" width="540" height="14" fill="#1a2744"/>
      <circle cx="22" cy="21" r="10" fill="#f59e0b"/>
      <text x="22" y="25" fill="#1e293b" fontSize="9" fontWeight="900" textAnchor="middle">VB</text>
      <text x="46" y="26" fill="#e2e8f0" fontSize="10" fontWeight="700">VIBRATION MONITORING</text>
      <circle cx="430" cy="21" r="4" fill="#22c55e"><animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/></circle>
      <text x="440" y="25" fill="#22c55e" fontSize="9" fontWeight="600">LIVE</text>

      {/* Left sidebar */}
      <rect x="0" y="42" width="44" height="378" fill="#132030"/>
      {[68,108,148,188,228].map((y,i)=><rect key={i} x="12" y={y} width="20" height="20" rx="5" fill={i===0?"#f59e0b":"#2a3e57"} opacity={i===0?1:0.5}/>)}

      {/* Asset summary cards top */}
      {[
        {x:52,  label:"Motor-01", rpm:"1480",  val:"2.8",  status:"GOOD",    c:"#22c55e"},
        {x:190, label:"Pump-03",  rpm:"2960",  val:"5.2",  status:"WATCH",   c:"#f59e0b"},
        {x:328, label:"Fan-02",   rpm:"740",   val:"7.8",  status:"ALERT",   c:"#ef4444"},
        {x:466, label:"Comp-01",  rpm:"3600",  val:"1.4",  status:"GOOD",    c:"#22c55e"},
      ].map(a=>(
        <g key={a.label}>
          <rect x={a.x} y="50" width="126" height="72" rx="10" fill="url(#vb-h-panel)" stroke={`${a.c}44`} strokeWidth="1.5"/>
          <text x={a.x+10} y="68"  fill="#94a3b8" fontSize="8.5" fontWeight="600">{a.label}</text>
          <text x={a.x+10} y="82"  fill="#64748b" fontSize="7.5">{a.rpm} RPM</text>
          <text x={a.x+10} y="100" fill={a.c} fontSize="18" fontWeight="900">{a.val}</text>
          <text x={a.x+46} y="100" fill="#475569" fontSize="8" fontWeight="500"> mm/s</text>
          <rect x={a.x+74} y="90"  width="44" height="16" rx="8" fill={a.c} opacity="0.18" stroke={a.c} strokeWidth="0.8"/>
          <text x={a.x+96} y="101" fill={a.c} fontSize="7.5" fontWeight="700" textAnchor="middle">{a.status}</text>
        </g>
      ))}

      {/* Waveform panel */}
      <rect x="52" y="130" width="480" height="130" rx="10" fill="url(#vb-h-panel)"/>
      <text x="64" y="148" fill="#f59e0b" fontSize="9" fontWeight="700" letterSpacing="0.07em">TIME WAVEFORM — Motor-01 Drive End Bearing</text>
      <line x1="52" y1="170" x2="532" y2="170" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="3,4"/>
      <polygon points={`20,205 ${waveA.map(p=>`${p.x+32},${p.y-25}`).join(" ")} 612,205`} fill="url(#vb-h-areaA)"/>
      <polyline points={waveA.map(p=>`${p.x+32},${p.y-25}`).join(" ")} fill="none" stroke="#f59e0b" strokeWidth="2" filter="url(#vb-glow)"/>
      <polygon points={`20,205 ${waveB.map(p=>`${p.x+32},${p.y-20}`).join(" ")} 612,205`} fill="url(#vb-h-areaB)"/>
      <polyline points={waveB.map(p=>`${p.x+32},${p.y-20}`).join(" ")} fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.7"/>
      <text x="64" y="252" fill="#f59e0b" fontSize="8" fontWeight="600">Velocity</text>
      <text x="110" y="252" fill="#3b82f6" fontSize="8" fontWeight="600">Acceleration</text>
      {/* Alert threshold */}
      <line x1="52" y1="150" x2="532" y2="150" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,3" opacity="0.5"/>
      <text x="536" y="153" fill="#ef4444" fontSize="7" fontWeight="700">ALERT</text>

      {/* Frequency spectrum panel */}
      <rect x="52" y="270" width="480" height="90" rx="10" fill="url(#vb-h-panel)"/>
      <text x="64" y="288" fill="#ea580c" fontSize="9" fontWeight="700" letterSpacing="0.07em">FREQUENCY SPECTRUM — Fault Identification</text>
      {[
        {x:80, h:55,c:"#ef4444",label:"1× BPFO"},
        {x:130,h:22,c:"#475569"},
        {x:180,h:38,c:"#f59e0b",label:"2× BPFO"},
        {x:230,h:18,c:"#475569"},
        {x:280,h:48,c:"#ef4444",label:"BPFI"},
        {x:330,h:15,c:"#475569"},
        {x:380,h:28,c:"#8b5cf6",label:"FTF"},
        {x:430,h:12,c:"#475569"},
        {x:480,h:20,c:"#3b82f6",label:"1× RPM"},
        {x:520,h:10,c:"#475569"},
      ].map((b,i)=>(
        <g key={i}>
          <rect x={b.x} y={350-b.h} width="18" height={b.h} rx="2" fill={b.c} opacity={b.c==="#475569"?0.35:0.85}/>
          {b.label && <text x={b.x+9} y={350-b.h-4} fill={b.c} fontSize="6.5" textAnchor="middle" fontWeight="700">{b.label}</text>}
        </g>
      ))}

      {/* Bottom ISO zones */}
      {[{c:"#22c55e",l:"Zone A — Good"},{c:"#f59e0b",l:"Zone B — Acceptable"},{c:"#f97316",l:"Zone C — Alert"},{c:"#ef4444",l:"Zone D — Danger"}].map((z,i)=>(
        <g key={z.l}>
          <rect x={52+i*122} y="370" width="118" height="20" rx="8" fill={z.c} opacity="0.14" stroke={z.c} strokeWidth="0.8"/>
          <text x={52+i*122+59} y="384" fill={z.c} fontSize="8" fontWeight="700" textAnchor="middle">{z.l}</text>
        </g>
      ))}

      {/* Pulse on Alert bearing */}
      <circle cx="400" cy="87" r="4" fill="#ef4444"><animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/></circle>
    </svg>
  );
};

/* 2 ── Online IIoT Architecture */
const OnlineArchSVG = () => (
  <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
    <defs>
      <linearGradient id="oa-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      <linearGradient id="oa-dark" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e293b"/><stop offset="100%" stopColor="#0f172a"/></linearGradient>
      <marker id="oa-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/></marker>
    </defs>
    <rect width="760" height="300" rx="16" fill="url(#oa-bg)"/>
    <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">Online Bearing Condition Monitoring — IIoT Architecture</text>

    {/* Motor */}
    <rect x="18" y="70" width="118" height="160" rx="14" fill="#fff" stroke="rgba(245,158,11,0.25)" strokeWidth="2" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.08))" }}/>
    <text x="77" y="91" fill="#64748b" fontSize="9" fontWeight="700" textAnchor="middle">MOTOR / PUMP</text>
    <rect x="30" y="96" width="94" height="80" rx="8" fill="#e2e8f0"/>
    {[0,1,2,3,4,5,6].map(i=><line key={i} x1={34+i*12} y1="96" x2={34+i*12} y2="176" stroke="#94a3b8" strokeWidth="2"/>)}
    <rect x="108" y="125" width="30" height="14" rx="4" fill="#94a3b8"/>
    {/* Bearing points */}
    {[{x:38,label:"NDE"},{x:92,label:"DE"}].map(b=>(
      <g key={b.label}>
        <circle cx={b.x+8} cy="200" r="13" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
        <circle cx={b.x+8} cy="200" r="8"  fill="#fff7ed"/>
        <circle cx={b.x+8} cy="200" r="4"  fill="#f59e0b" opacity="0.6"/>
        <text x={b.x+8} y="220" fill="#b45309" fontSize="7.5" fontWeight="700" textAnchor="middle">{b.label}</text>
      </g>
    ))}
    {/* Sensor nodes */}
    {[{bx:55,by:92,label:"Vibration",icon:"📳",c:"#f59e0b"},{bx:100,by:92,label:"Temp",icon:"🌡",c:"#ef4444"},{bx:133,by:138,label:"Ultrasound",icon:"🔊",c:"#8b5cf6"}].map((s,i)=>(
      <g key={i}>
        <line x1={s.bx} y1={s.by} x2={s.bx} y2={s.by-26} stroke={s.c} strokeWidth="1.5" strokeDasharray="3,2"/>
        <rect x={s.bx-18} y={s.by-50} width="38" height="26" rx="8" fill="#fff" stroke={`${s.c}55`} strokeWidth="1.5" style={{ filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.08))" }}/>
        <text x={s.bx+1} y={s.by-38} fontSize="11" textAnchor="middle">{s.icon}</text>
        <text x={s.bx+1} y={s.by-27} fill={s.c} fontSize="7" fontWeight="700" textAnchor="middle">{s.label}</text>
        <circle cx={s.bx} cy={s.by} r="4" fill={s.c}><animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" begin={`${i*0.7}s`}/></circle>
      </g>
    ))}

    {/* Arrow chain */}
    <line x1="140" y1="150" x2="185" y2="150" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#oa-arr)"/>
    <text x="163" y="143" fill="#b45309" fontSize="7.5" textAnchor="middle" fontWeight="600">RS485</text>

    {/* IoT Node */}
    <rect x="187" y="112" width="94" height="76" rx="12" fill="#fff" stroke="rgba(245,158,11,0.28)" strokeWidth="2" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.07))" }}/>
    <text x="234" y="135" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle">IIoT NODE</text>
    <text x="234" y="149" fill="#64748b" fontSize="8" textAnchor="middle">Data Acquisition</text>
    {[0,1,2].map(i=><rect key={i} x={197+i*22} y="162" width="16" height="10" rx="3" fill="#eef0f4" stroke="#f59e0b" strokeWidth="0.8"/>)}
    <text x="234" y="182" fill="#b45309" fontSize="7" fontWeight="700" textAnchor="middle">Modbus TCP/IP</text>
    {/* Waves */}
    {[8,16,24].map(r=><ellipse key={r} cx="283" cy="150" rx={r} ry={r*0.4} fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.22"/>)}

    <line x1="285" y1="150" x2="330" y2="150" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#oa-arr)"/>
    <text x="307" y="143" fill="#b45309" fontSize="7.5" textAnchor="middle" fontWeight="600">WiFi/LAN</text>

    {/* Gateway */}
    <rect x="332" y="112" width="84" height="76" rx="12" fill="#fff" stroke="rgba(245,158,11,0.28)" strokeWidth="2" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.07))" }}/>
    <text x="374" y="135" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle">GATEWAY</text>
    <text x="374" y="149" fill="#64748b" fontSize="8" textAnchor="middle">Edge Processing</text>
    {[0,1,2].map(i=><rect key={i} x={342+i*18} y="162" width="12" height="8" rx="2" fill="#eef0f4" stroke="#f59e0b" strokeWidth="0.5"/>)}
    <text x="374" y="182" fill="#b45309" fontSize="7" fontWeight="700" textAnchor="middle">GPRS/4G/LAN</text>

    <line x1="420" y1="150" x2="462" y2="150" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#oa-arr)"/>
    <text x="441" y="143" fill="#b45309" fontSize="7.5" textAnchor="middle" fontWeight="600">INTERNET</text>

    {/* Cloud */}
    <ellipse cx="508" cy="150" rx="44" ry="32" fill="#fff" stroke="rgba(245,158,11,0.28)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.07))" }}/>
    <ellipse cx="494" cy="141" rx="22" ry="17" fill="#fff" stroke="rgba(245,158,11,0.18)" strokeWidth="1"/>
    <ellipse cx="518" cy="139" rx="19" ry="15" fill="#fff" stroke="rgba(245,158,11,0.18)" strokeWidth="1"/>
    <text x="508" y="148" fill="#b45309" fontSize="8.5" fontWeight="800" textAnchor="middle">AI / ML</text>
    <text x="508" y="161" fill="#64748b" fontSize="7.5" textAnchor="middle">Cloud Analytics</text>

    <line x1="554" y1="150" x2="592" y2="150" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#oa-arr)"/>

    {/* Dashboard */}
    <rect x="594" y="75" width="148" height="150" rx="12" fill="url(#oa-dark)" style={{ filter:"drop-shadow(0 6px 20px rgba(0,0,0,0.16))" }}/>
    <rect x="594" y="75" width="148" height="26" rx="12" fill="#f59e0b" opacity="0.14"/>
    <rect x="594" y="88" width="148" height="13" fill="#f59e0b" opacity="0.14"/>
    <text x="668" y="92" fill="#fbbf24" fontSize="8" fontWeight="800" textAnchor="middle">LIVE DASHBOARD</text>
    {[18,30,22,44,28,38].map((h,i)=><rect key={i} x={602+i*20} y={154-h} width="14" height={h} rx="2" fill={i===3?"#ef4444":i===4?"#f59e0b":"#3b82f6"} opacity="0.8"/>)}
    <line x1="600" y1="154" x2="734" y2="154" stroke="#334155" strokeWidth="1"/>
    <rect x="600" y="162" width="134" height="16" rx="7" fill="rgba(239,68,68,0.20)"/>
    <text x="667" y="174" fill="#ef4444" fontSize="7.5" fontWeight="700" textAnchor="middle">⚠ FAN-02 — ZONE C ALERT</text>
    <rect x="600" y="182" width="134" height="16" rx="7" fill="rgba(34,197,94,0.14)"/>
    <text x="667" y="194" fill="#22c55e" fontSize="7.5" fontWeight="700" textAnchor="middle">✓ MOTOR-01 — ZONE A</text>
    {/* Mobile + Web */}
    <rect x="600" y="204" width="58" height="18" rx="6" fill="#1a2438" stroke="#334155" strokeWidth="0.8"/>
    <text x="629" y="217" fill="#fbbf24" fontSize="9" textAnchor="middle">📱 App</text>
    <rect x="668" y="204" width="64" height="18" rx="6" fill="#1a2438" stroke="#334155" strokeWidth="0.8"/>
    <text x="700" y="217" fill="#fbbf24" fontSize="9" textAnchor="middle">🖥 Web</text>
    <circle cx="600" cy="87" r="4" fill="#22c55e"><animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/></circle>

    {/* Benefit strip */}
    {[{x:18,icon:"🔁",l:"24×7 Continuous"},{x:210,icon:"🚨",l:"Instant Alerts"},{x:402,icon:"🧠",l:"AI Fault ID"},{x:590,icon:"📊",l:"ISO 10816-3"}].map(b=>(
      <g key={b.l}>
        <rect x={b.x} y="252" width="175" height="28" rx="9" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.22)" strokeWidth="1"/>
        <text x={b.x+12} y="270" fontSize="12">{b.icon}</text>
        <text x={b.x+30} y="270" fill="#334155" fontSize="10" fontWeight="600">{b.l}</text>
      </g>
    ))}
  </svg>
);

/* 3 ── Vibration waveform + spectrum */
const VibrationSVG = () => {
  const mkPts = (seed:number,base:number,range:number) =>
    Array.from({length:14},(_,i)=>({ x:60+i*48, y:base+Math.sin(i*seed*0.9)*range+Math.cos(i*0.7)*range*0.4 }));
  const timeWave = mkPts(1.1,110,32);
  const faults = [{x:108,y:200,l:"1× RPM\nUNBALANCE",c:"#ef4444"},{x:252,y:235,l:"BPFO\nOUTER RACE",c:"#f97316"},{x:396,y:228,l:"BPFI\nINNER RACE",c:"#8b5cf6"}];
  return (
    <svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
      <defs>
        <linearGradient id="vs-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9"/><stop offset="100%" stopColor="#f0f9ff"/></linearGradient>
        <linearGradient id="vs-areaA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b" stopOpacity="0.32"/><stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/></linearGradient>
      </defs>
      <rect width="760" height="360" rx="16" fill="url(#vs-bg)"/>
      <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">Vibration Analysis — Time Waveform &amp; Frequency Spectrum</text>
      <text x="380" y="44" fill="#64748b" fontSize="9.5" textAnchor="middle">ISO 10816-3 severity assessment for rotating equipment</text>

      {/* Time waveform */}
      <rect x="24" y="56" width="712" height="122" rx="10" fill="#fff" stroke="#eef0f4" strokeWidth="1" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.05))" }}/>
      <rect x="24" y="56" width="712" height="22" rx="10" fill="#f59e0b" opacity="0.10"/>
      <rect x="24" y="66" width="712" height="12" fill="#f59e0b" opacity="0.10"/>
      <text x="38" y="71" fill="#f59e0b" fontSize="9" fontWeight="900" letterSpacing="0.07em">TIME WAVEFORM</text>
      <text x="730" y="71" fill="#94a3b8" fontSize="8" textAnchor="end">mm/s</text>
      <line x1="36" y1="118" x2="720" y2="118" stroke="#eef0f4" strokeWidth="1" strokeDasharray="4,4"/>
      <polygon points={`60,178 ${timeWave.map(p=>`${p.x},${p.y}`).join(" ")} 684,178`} fill="url(#vs-areaA)"/>
      <polyline points={timeWave.map(p=>`${p.x},${p.y}`).join(" ")} fill="none" stroke="#f59e0b" strokeWidth="2.5"/>
      {timeWave.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="3" fill="#f59e0b" stroke="#fff" strokeWidth="1.5"/>)}
      <line x1="60" y1="92" x2="690" y2="92" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,3" opacity="0.6"/>
      <text x="696" y="95" fill="#ef4444" fontSize="7.5" fontWeight="700">ALERT</text>
      <text x="18" y="120" fill="#64748b" fontSize="9" textAnchor="middle" transform="rotate(-90 18 120)" fontWeight="600">Amplitude</text>

      {/* Spectrum */}
      <rect x="24" y="190" width="712" height="118" rx="10" fill="#fff" stroke="#eef0f4" strokeWidth="1" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.05))" }}/>
      <rect x="24" y="190" width="712" height="22" rx="10" fill="#ea580c" opacity="0.10"/>
      <rect x="24" y="200" width="712" height="12" fill="#ea580c" opacity="0.10"/>
      <text x="38" y="205" fill="#ea580c" fontSize="9" fontWeight="900" letterSpacing="0.07em">FREQUENCY SPECTRUM — Fault Identification</text>
      {[
        {x:80, h:75,c:"#ef4444"},{x:124,h:20,c:"#475569"},{x:168,h:36,c:"#f59e0b"},
        {x:212,h:14,c:"#475569"},{x:256,h:58,c:"#ef4444"},{x:300,h:18,c:"#475569"},
        {x:344,h:28,c:"#8b5cf6"},{x:388,h:44,c:"#f97316"},{x:432,h:12,c:"#475569"},
        {x:476,h:20,c:"#3b82f6"},{x:520,h:16,c:"#475569"},{x:564,h:12,c:"#475569"},
        {x:608,h:10,c:"#475569"},{x:652,h:8, c:"#475569"},
      ].map((b,i)=><rect key={i} x={b.x} y={298-b.h} width="26" height={b.h} rx="3" fill={b.c} opacity={b.c==="#475569"?0.30:0.85}/>)}
      {faults.map(f=>(
        <g key={f.l}>
          <line x1={f.x+13} y1={f.y+10} x2={f.x+13} y2={f.y+5} stroke={f.c} strokeWidth="1.5"/>
          <rect x={f.x-12} y={f.y-22} width="52" height="22" rx="6" fill={f.c} opacity="0.14" stroke={f.c} strokeWidth="1"/>
          {f.l.split("\n").map((l,j)=><text key={j} x={f.x+14} y={f.y-12+j*9} fill={f.c} fontSize="7" fontWeight="700" textAnchor="middle">{l}</text>)}
        </g>
      ))}
      <text x="18" y="256" fill="#64748b" fontSize="9" textAnchor="middle" transform="rotate(-90 18 256)" fontWeight="600">Amplitude</text>

      {/* ISO zones strip */}
      {[{w:158,c:"#22c55e",l:"Zone A — Good < 2.3 mm/s"},{w:158,c:"#f59e0b",l:"Zone B — Acceptable < 4.5"},{w:158,c:"#f97316",l:"Zone C — Alert < 7.1"},{w:172,c:"#ef4444",l:"Zone D — Danger > 7.1"}].map((z,i)=>(
        <g key={z.l}>
          <rect x={24+i*(z.w+8)} y="322" width={z.w} height="24" rx="8" fill={z.c} opacity="0.13" stroke={z.c} strokeWidth="1"/>
          <text x={24+i*(z.w+8)+z.w/2} y="337.5" fill={z.c} fontSize="8.5" fontWeight="700" textAnchor="middle">{z.l}</text>
        </g>
      ))}
    </svg>
  );
};

/* 4 ── Fault Detection Matrix */
const FaultMatrixSVG = () => {
  const modes = [
    {mode:"Outer Race Fault (BPFO)",   tech:["Vibration","Ultrasound","Temp"], severity:"High",   c:"#ef4444"},
    {mode:"Inner Race Fault (BPFI)",   tech:["Vibration","Ultrasound"],        severity:"High",   c:"#ef4444"},
    {mode:"Rolling Element Fault (BSF)",tech:["Vibration","Ultrasound"],       severity:"Medium", c:"#f59e0b"},
    {mode:"Cage Fault (FTF)",          tech:["Vibration","Temp"],              severity:"Medium", c:"#f59e0b"},
    {mode:"Unbalance (1× RPM)",        tech:["Vibration"],                     severity:"High",   c:"#ef4444"},
    {mode:"Misalignment (2× RPM)",     tech:["Vibration"],                     severity:"High",   c:"#ef4444"},
    {mode:"Looseness (3× RPM+)",       tech:["Vibration","Ultrasound"],        severity:"Medium", c:"#f59e0b"},
    {mode:"Early Wear / Pitting",      tech:["Ultrasound","Vibration"],        severity:"Low",    c:"#22c55e"},
  ];
  return (
    <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
      <defs>
        <linearGradient id="fm-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      </defs>
      <rect width="760" height="300" rx="16" fill="url(#fm-bg)"/>
      <text x="380" y="24" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">Bearing Fault Detection Matrix</text>
      <rect x="22" y="34" width="716" height="26" rx="8" fill="#f59e0b" opacity="0.14"/>
      {["Failure Mode","Detection Technology","Severity"].map((h,i)=>(
        <text key={h} x={[105,400,648][i]} y="51" fill="#b45309" fontSize="10" fontWeight="700" textAnchor="middle">{h}</text>
      ))}
      {modes.map((m,i)=>(
        <g key={m.mode}>
          <rect x="22" y={60+i*29} width="716" height="29" fill={i%2===0?"rgba(245,158,11,0.04)":"#fff"}/>
          <text x="34" y={78+i*29} fill="#334155" fontSize="10" fontWeight="500">{m.mode}</text>
          {m.tech.map((t,j)=>(
            <g key={t}>
              <rect x={294+j*115} y={64+i*29} width={t.length*6+16} height="18" rx="9" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.25)" strokeWidth="1"/>
              <text x={294+j*115+t.length*3+8} y={77+i*29} fill="#b45309" fontSize="8.5" fontWeight="600" textAnchor="middle">{t}</text>
            </g>
          ))}
          <circle cx="620" cy={74+i*29} r="5" fill={m.c}/>
          <rect x="628" y={64+i*29} width="68" height="18" rx="9" fill={m.c} opacity="0.14" stroke={m.c} strokeWidth="1"/>
          <text x="662" y={77+i*29} fill={m.c} fontSize="9" fontWeight="700" textAnchor="middle">{m.severity}</text>
          <line x1="22" y1={89+i*29} x2="738" y2={89+i*29} stroke="#eef0f4" strokeWidth="1"/>
        </g>
      ))}
    </svg>
  );
};

/* 5 ── P-F Curve */
const PFCurveSVG = () => (
  <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
    <defs>
      <linearGradient id="pf-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9"/><stop offset="100%" stopColor="#fffbeb"/></linearGradient>
      <linearGradient id="pf-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.18"/><stop offset="100%" stopColor="#ef4444" stopOpacity="0.04"/></linearGradient>
    </defs>
    <rect width="760" height="300" rx="16" fill="url(#pf-bg)"/>
    <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">P–F Curve — Predictive Maintenance Window</text>
    <text x="380" y="44" fill="#64748b" fontSize="9.5" textAnchor="middle">Detect failure potential point 4–6 weeks before functional failure</text>

    {/* Y axis */}
    {["NORMAL","WATCH","ALERT","DANGER"].map((l,i)=>(
      <text key={l} x="50" y={75+i*52} fill={["#22c55e","#f59e0b","#f97316","#ef4444"][i]} fontSize="8.5" textAnchor="end" fontWeight="700">{l}</text>
    ))}
    <line x1="58" y1="58"  x2="58"  y2="258" stroke="#eef0f4" strokeWidth="1.5"/>
    <line x1="58" y1="258" x2="720" y2="258" stroke="#eef0f4" strokeWidth="1.5"/>

    {/* Failure curve */}
    <polygon points="60,258 80,256 140,255 200,253 280,248 360,238 440,218 500,188 540,158 570,118 590,78 600,62 620,258" fill="url(#pf-area)"/>
    <polyline points="80,256 140,255 200,253 280,248 360,238 440,218 500,188 540,158 570,118 590,78 600,62" fill="none" stroke="#ef4444" strokeWidth="2.5"/>

    {/* P point */}
    <circle cx="440" cy="218" r="10" fill="#f59e0b" stroke="#fff" strokeWidth="2.5" style={{ filter:"drop-shadow(0 0 8px rgba(245,158,11,0.6))" }}/>
    <text x="440" y="222" fill="#fff" fontSize="9" fontWeight="900" textAnchor="middle">P</text>
    <line x1="440" y1="210" x2="440" y2="170" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3"/>
    <rect x="348" y="150" width="88" height="22" rx="8" fill="rgba(245,158,11,0.14)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="392" y="165" fill="#b45309" fontSize="9" fontWeight="700" textAnchor="middle">Potential Failure</text>

    {/* F point */}
    <circle cx="600" cy="62" r="10" fill="#ef4444" stroke="#fff" strokeWidth="2.5" style={{ filter:"drop-shadow(0 0 8px rgba(239,68,68,0.6))" }}/>
    <text x="600" y="66" fill="#fff" fontSize="9" fontWeight="900" textAnchor="middle">F</text>
    <line x1="600" y1="54" x2="600" y2="26" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3"/>
    <rect x="556" y="16" width="90" height="22" rx="8" fill="rgba(239,68,68,0.14)" stroke="#ef4444" strokeWidth="1"/>
    <text x="601" y="31" fill="#ef4444" fontSize="9" fontWeight="700" textAnchor="middle">Functional Failure</text>

    {/* P-F interval arrow */}
    <line x1="440" y1="240" x2="600" y2="240" stroke="#3b82f6" strokeWidth="2"/>
    <line x1="440" y1="236" x2="440" y2="244" stroke="#3b82f6" strokeWidth="2"/>
    <line x1="600" y1="236" x2="600" y2="244" stroke="#3b82f6" strokeWidth="2"/>
    <rect x="476" y="229" width="88" height="18" rx="9" fill="rgba(59,130,246,0.14)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="520" y="242" fill="#3b82f6" fontSize="9" fontWeight="700" textAnchor="middle">P-F Interval: 4–6 wks</text>

    {/* Detection milestones */}
    {[
      {x:200, y:253, label:"Baseline\nNormal", c:"#22c55e"},
      {x:360, y:238, label:"Ultrasound\nElevation", c:"#f59e0b"},
      {x:440, y:218, label:"P-Point\nDetected", c:"#f97316"},
      {x:540, y:158, label:"Vibration\nAlert Zone", c:"#ea580c"},
      {x:600, y:62,  label:"Functional\nFailure", c:"#ef4444"},
    ].map(m=>(
      <g key={m.label}>
        <circle cx={m.x} cy={m.y} r="5" fill={m.c} stroke="#fff" strokeWidth="1.5"/>
        <text x={m.x} y={m.y+18} fill={m.c} fontSize="7" textAnchor="middle" fontWeight="600">{m.label.split("\n")[0]}</text>
        <text x={m.x} y={m.y+27} fill="#94a3b8" fontSize="6.5" textAnchor="middle">{m.label.split("\n")[1]}</text>
      </g>
    ))}

    {/* Detection window shading */}
    <rect x="440" y="58" width="160" height="200" fill="#3b82f6" opacity="0.04" rx="4"/>
    <rect x="440" y="58" width="2"   height="200" fill="#3b82f6" opacity="0.30"/>
    <rect x="598" y="58" width="2"   height="200" fill="#ef4444" opacity="0.30"/>
    <text x="520" y="72" fill="#3b82f6" fontSize="9" textAnchor="middle" fontWeight="600" fontStyle="italic">Maintenance Window</text>
    <text x="520" y="84" fill="#3b82f6" fontSize="8" textAnchor="middle">Plan &amp; schedule repair here</text>
    <text x="14" y="165" fill="#64748b" fontSize="9" textAnchor="middle" transform="rotate(-90 14 165)" fontWeight="600">Severity</text>
    <text x="390" y="278" fill="#64748b" fontSize="9" textAnchor="middle" fontWeight="600">Time →</text>
  </svg>
);

/* ─── Data ─── */
const benefits = [
  {icon:"🔁", title:"Continuous 24×7 Monitoring",       desc:"Online sensors mounted permanently — never miss a fault even between manual inspection rounds or shift changes."},
  {icon:"📈", title:"ISO 10816-3 Severity Zones",        desc:"Automatic Zone A/B/C/D classification — good, acceptable, alert and danger thresholds for every machine class."},
  {icon:"🧠", title:"AI-Based Fault Classification",     desc:"Machine learning identifies unbalance, misalignment, looseness, BPFO, BPFI, FTF and rolling element defects."},
  {icon:"📡", title:"Wireless IIoT Integration",        desc:"GPRS / WiFi / 4G gateway transmits data to cloud dashboard accessible from web browser and mobile app."},
  {icon:"🔔", title:"Instant SMS / Email Alerts",       desc:"Immediate notifications via SMS, email and mobile app the moment a bearing crosses its alert threshold."},
  {icon:"📉", title:"P-F Curve Based Maintenance",      desc:"Catch failures at the Potential failure point — 4–6 weeks before functional failure — giving time to plan."},
];

const heroStats = [
  {num:"4–6 wk", label:"P-F maintenance window"},
  {num:"24×7",   label:"Continuous monitoring"  },
  {num:"ISO",    label:"10816-3 certified"       },
  {num:"0",      label:"Shutdown required"       },
];

const measurementParams = [
  "Overall RMS Velocity (mm/s)",
  "Peak Acceleration (g)",
  "Displacement (μm)",
  "High-Frequency Energy Band (dB)",
  "Bearing Defect Frequencies (BPFO/BPFI/BSF/FTF)",
  "Machine Speed (RPM)",
  "Operating Temperature (°C)",
  "Crest Factor",
];

/* ═══ CSS ═══ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  .vm-page { font-family:'Roboto',sans-serif; color:#1e293b; }
  .vm-page * { box-sizing:border-box; }

  @keyframes vm-fadein { 0%{opacity:0;transform:translateY(6px);letter-spacing:0.13em;} 60%{opacity:0.85;} 100%{opacity:1;transform:translateY(0);letter-spacing:0.04em;} }
  @keyframes vm-flicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1;text-shadow:0 0 8px rgba(245,158,11,0.85),0 0 20px rgba(234,88,12,0.5);} 20%,24%,55%{opacity:0.35;text-shadow:none;} }
  .vm-flicker { opacity:0; animation:vm-fadein 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards, vm-flicker 4s ease-in-out 2s infinite; font-size:clamp(13px,1.2vw,15px); font-weight:600; background:linear-gradient(90deg,#f59e0b,#ea580c); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:block; margin-top:10px; margin-bottom:18px; }

  .fu { opacity:0; transform:translateY(22px); transition:opacity 0.55s ease,transform 0.55s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }

  .vm-hero { position:relative; overflow:hidden; min-height:90vh; display:flex; align-items:center; }
  .vm-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
  .vm-hero-wash  { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,0.90) 0%,rgba(224,242,254,0.82) 55%,rgba(255,251,235,0.90) 100%); }
  .vm-hero-dots  { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .vm-hero-burst { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,0.26) 0%,rgba(251,191,36,0.09) 40%,transparent 70%); top:-15%; left:-8%; }
  .vm-hero-sky   { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.20) 0%,rgba(56,189,248,0.06) 45%,transparent 70%); bottom:-15%; right:-5%; }

  .vm-stat { background:rgba(255,255,255,0.82); border:1px solid rgba(245,158,11,0.28); border-radius:14px; padding:14px 18px; backdrop-filter:blur(10px); box-shadow:0 2px 12px rgba(0,0,0,0.06); }
  .vm-stat-num { font-size:20px; font-weight:900; color:#ea580c; line-height:1; }
  .vm-stat-label { font-size:11px; color:#64748b; font-weight:500; margin-top:3px; }

  .vm-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:18px; }
  .vm-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }
  .vm-bread { display:flex; align-items:center; gap:6px; margin-bottom:24px; }
  .vm-bread a { font-size:12.5px; color:#64748b; text-decoration:none; } .vm-bread a:hover { color:#f59e0b; }

  .vm-svg-card { border-radius:20px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.09),0 2px 8px rgba(0,0,0,0.05); border:1px solid rgba(245,158,11,0.14); transition:transform 0.3s,box-shadow 0.3s; }
  .vm-svg-card:hover { transform:translateY(-5px) scale(1.005); box-shadow:0 20px 56px rgba(0,0,0,0.14); }
  .vm-svg-label { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.10); border:1px solid rgba(245,158,11,0.25); color:#b45309; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; padding:5px 12px; border-radius:999px; margin-bottom:10px; }

  .vm-benefit-card { background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:22px 20px; transition:box-shadow 0.2s,border-color 0.2s,transform 0.2s; position:relative; overflow:hidden; }
  .vm-benefit-card::after { content:''; position:absolute; top:0; left:0; bottom:0; width:3px; background:linear-gradient(to bottom,#f59e0b,#ea580c); opacity:0; transition:opacity 0.2s; }
  .vm-benefit-card:hover { box-shadow:0 8px 28px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.28); transform:translateY(-3px); }
  .vm-benefit-card:hover::after { opacity:1; }

  .vm-param-pill { display:flex; align-items:center; gap:10px; background:#fff; border:1px solid #eef0f4; border-radius:12px; padding:11px 15px; font-size:13px; font-weight:500; color:#334155; transition:border-color 0.2s,box-shadow 0.2s; }
  .vm-param-pill:hover { border-color:rgba(245,158,11,0.30); box-shadow:0 4px 14px rgba(0,0,0,0.06); }

  .vm-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:15px; font-weight:700; padding:14px 28px; border-radius:12px; text-decoration:none; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 20px rgba(245,158,11,0.38); }
  .vm-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.52); }
  .vm-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:15px; font-weight:500; padding:14px 28px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,0.25); transition:border-color 0.2s,background 0.2s; }
  .vm-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  .vm-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:20px; padding:32px 36px; color:#fff; box-shadow:0 12px 40px rgba(245,158,11,0.32); position:relative; overflow:hidden; }
  .vm-highlight::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 0%,rgba(255,255,255,0.18) 0%,transparent 60%); pointer-events:none; }

  .vm-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .vm-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }

  @keyframes vm-pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.5);opacity:0.6;} }
  .vm-pulse-dot { width:10px; height:10px; border-radius:50%; background:#16a34a; animation:vm-pulse 2s infinite; flex-shrink:0; }
`;

const VibrationMonitoring = () => {
  const refArch    = useFU(0);
  const refVibSvg  = useFU(100);
  const refMatrix  = useFU(0);
  const refPF      = useFU(100);
  const refBenH    = useFU(0);
  const refParamH  = useFU(0);
  const benRefs    = benefits.map((_,i)=>useFU(i*70));
  const paramRefs  = measurementParams.map((_,i)=>useFU(i*50));

  return (
    <div className="vm-page">
      <style>{css}</style>

      {/* ════ HERO ════ */}
      <section className="vm-hero">
        <img src={heroBg} alt="" className="vm-hero-photo" aria-hidden="true"/>
        <div className="vm-hero-wash"/><div className="vm-hero-dots"/>
        <div className="vm-hero-burst"/><div className="vm-hero-sky"/>

        <div style={{position:"relative",maxWidth:1280,margin:"0 auto",padding:"80px 28px 72px",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"center"}}>

          <div>
            <div className="vm-bread">
              <Link to="/">Home</Link><ChevronRight size={12} style={{color:"#cbd5e1"}}/>
              <Link to="/services">Services</Link><ChevronRight size={12} style={{color:"#cbd5e1"}}/>
              <span style={{fontSize:12.5,color:"#334155",fontWeight:500}}>Vibration &amp; Online Bearing Monitoring</span>
            </div>

            <div className="vm-badge"><Activity size={11}/> ISO 10816-3 Vibration Analysis</div>

            <h1 style={{fontSize:"clamp(26px,4vw,52px)",fontWeight:900,color:"#1e293b",lineHeight:1.05,marginBottom:0,maxWidth:560}}>
              Vibration Analysis &amp;{" "}
              <span style={{background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                Online Bearing Monitoring
              </span>
            </h1>

            <span className="vm-flicker">📡 24×7 continuous monitoring — catch failure 4–6 weeks early</span>

            <p style={{fontSize:"clamp(13px,1.3vw,16px)",color:"#475569",lineHeight:1.75,marginBottom:28,maxWidth:500}}>
              Permanently mounted <strong style={{color:"#b45309"}}>IIoT sensors</strong> continuously capture vibration, temperature and ultrasound data — feeding an AI cloud platform that classifies bearing faults and alerts your team long before a functional failure occurs.
            </p>

            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:30}}>
              {heroStats.map(s=>(
                <div key={s.label} className="vm-stat"><div className="vm-stat-num">{s.num}</div><div className="vm-stat-label">{s.label}</div></div>
              ))}
            </div>

            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <Link to="/contact" className="vm-btn-primary">Request an Assessment <ArrowRight size={16}/></Link>
              {/* <Link to="/services/lubrication-management" className="vm-btn-ghost">← Lubrication Management</Link> */}
            </div>
          </div>

         
          
        </div>
      </section>

      {/* ════ ARCHITECTURE ════ */}
      <section style={{background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)",padding:"72px 28px"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div ref={refArch} className="fu" style={{textAlign:"center",marginBottom:40}}>
            <div className="vm-section-badge" style={{margin:"0 auto 12px"}}><Wifi size={11}/> IIoT Architecture</div>
            <h2 style={{fontSize:"clamp(22px,3vw,34px)",fontWeight:800,color:"#0f1117",marginBottom:12}}>Online IIoT Bearing Monitoring Architecture</h2>
            <p style={{fontSize:15,color:"#64748b",maxWidth:560,margin:"0 auto"}}>Permanently installed sensors connected to a cloud analytics platform — continuous monitoring with no manual intervention required.</p>
          </div>
          <div className="vm-svg-label"><Wifi size={11}/> Sensor → IIoT Node → Gateway → Cloud → Dashboard</div>
          <div className="vm-svg-card"><OnlineArchSVG/></div>
        </div>
      </section>

      {/* ════ VIBRATION ANALYSIS ════ */}
      <section style={{background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)",padding:"72px 28px"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div ref={refVibSvg} className="fu" style={{marginBottom:48}}>
            <div className="vm-svg-label"><BarChart3 size={11}/> Time Waveform, Frequency Spectrum &amp; ISO 10816-3 Zones</div>
            <div className="vm-svg-card"><VibrationSVG/></div>
          </div>
          <div ref={refMatrix} className="fu">
            <div className="vm-svg-label"><AlertTriangle size={11}/> Bearing Fault Detection Matrix</div>
            <div className="vm-svg-card"><FaultMatrixSVG/></div>
          </div>
        </div>
      </section>

      {/* ════ P-F CURVE ════ */}
      <section style={{background:"#fffbeb",padding:"72px 28px"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div ref={refPF} className="fu" style={{textAlign:"center",marginBottom:36}}>
            <div className="vm-section-badge" style={{margin:"0 auto 12px"}}><Shield size={11}/> P-F Interval</div>
            <h2 style={{fontSize:"clamp(22px,3vw,30px)",fontWeight:800,color:"#0f1117",marginBottom:10}}>P–F Curve — Your Maintenance Planning Window</h2>
            <p style={{fontSize:15,color:"#64748b",maxWidth:540,margin:"0 auto"}}>Online monitoring detects the Potential failure point 4–6 weeks before functional failure — giving your team a planned maintenance window instead of an emergency.</p>
          </div>
          <div className="vm-svg-label"><Shield size={11}/> P-F Curve — Potential vs Functional Failure</div>
          <div className="vm-svg-card"><PFCurveSVG/></div>
        </div>
      </section>

      {/* ════ BENEFITS ════ */}
      <section style={{background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)",padding:"72px 28px"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div ref={refBenH} className="fu" style={{textAlign:"center",marginBottom:40}}>
            <div className="vm-section-badge" style={{margin:"0 auto 12px"}}><CheckCircle2 size={11}/> Benefits</div>
            <h2 style={{fontSize:"clamp(22px,3vw,34px)",fontWeight:800,color:"#0f1117",marginBottom:12}}>Benefits of Online Bearing Condition Monitoring</h2>
            <p style={{fontSize:15,color:"#64748b",maxWidth:520,margin:"0 auto"}}>Replace reactive maintenance with data-driven predictive maintenance — plan repairs instead of fighting unplanned stoppages.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:18}}>
            {benefits.map((b,i)=>(
              <div key={b.title} ref={benRefs[i]} className="vm-benefit-card fu">
                <div style={{fontSize:28,marginBottom:10}}>{b.icon}</div>
                <div style={{fontSize:14,fontWeight:700,color:"#0f1117",marginBottom:6}}>{b.title}</div>
                <div style={{fontSize:13,color:"#64748b",lineHeight:1.65}}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ MEASUREMENT PARAMETERS ════ */}
      <section style={{background:"#fffbeb",padding:"64px 28px"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div ref={refParamH} className="fu" style={{textAlign:"center",marginBottom:32}}>
            <div className="vm-section-badge" style={{margin:"0 auto 12px"}}><Monitor size={11}/> Parameters</div>
            <h2 style={{fontSize:"clamp(20px,2.5vw,28px)",fontWeight:800,color:"#0f1117",marginBottom:8}}>What We Measure</h2>
            <p style={{fontSize:14,color:"#64748b",maxWidth:400,margin:"0 auto"}}>Comprehensive multi-parameter monitoring covering every bearing failure mode.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
            {measurementParams.map((p,i)=>(
              <div key={p} ref={paramRefs[i]} className="vm-param-pill fu">
                <CheckCircle2 size={15} style={{color:"#f59e0b",flexShrink:0}}/>{p}
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default VibrationMonitoring;