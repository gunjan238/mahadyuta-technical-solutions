/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, CheckCircle2,
  Eye, Settings, AlertTriangle, BarChart3,
} from "lucide-react";
import heroBg        from "@/assets/hero-bg.jpg";
import endoscopyHero from "@/assets/endoscopy-hero.jpg";
import endoscopyInsp from "@/assets/endoscopy-1.jpeg";

/* ─── useFU hook ─── */
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
   SVG ILLUSTRATIONS (content sections only)
═══════════════════════════════════════════════════════════ */

/* 1 ── Process: 4-step */
const ProcessSVG = () => (
  <svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
    <defs>
      <linearGradient id="p-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffbeb"/><stop offset="100%" stopColor="#fef3c7"/></linearGradient>
      <marker id="p-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/></marker>
    </defs>
    <rect width="760" height="220" rx="16" fill="url(#p-bg)"/>
    <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">Industrial Endoscopy Inspection — Step by Step</text>
    {[
      {x:82,  emoji:"🔍", step:"01", title:"Site\nAssessment",       color:"#f59e0b"},
      {x:262, emoji:"🔧", step:"02", title:"Probe\nInsertion",        color:"#ea580c"},
      {x:442, emoji:"📷", step:"03", title:"Live Visual\nInspection", color:"#f97316"},
      {x:622, emoji:"📋", step:"04", title:"Report &\nRecommendation",color:"#22c55e"},
    ].map((s,i,arr)=>(
      <g key={s.step}>
        <rect x={s.x-62} y="42" width="124" height="162" rx="16" fill="#fff" stroke={`${s.color}33`} strokeWidth="1.5"
          style={{ filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.07))" }}/>
        <rect x={s.x-62} y="42" width="124" height="28" rx="16" fill={s.color} opacity="0.13"/>
        <rect x={s.x-62} y="56" width="124" height="14" fill={s.color} opacity="0.13"/>
        <text x={s.x} y="60" fill={s.color} fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.08em">STEP {s.step}</text>
        <text x={s.x} y="108" fontSize="30" textAnchor="middle">{s.emoji}</text>
        {s.title.split("\n").map((l,j)=>(
          <text key={j} x={s.x} y={136+j*16} fill="#0f1117" fontSize="11.5" fontWeight="700" textAnchor="middle">{l}</text>
        ))}
        {i < arr.length-1 && (
          <line x1={s.x+64} y1="123" x2={s.x+116} y2="123"
            stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#p-arr)"/>
        )}
      </g>
    ))}
  </svg>
);

/* 2 ── Applications: 5×2 grid */
const ApplicationsSVG = () => {
  const apps = [
    {emoji:"⚙️",label:"Gearboxes"},
    {emoji:"🔩",label:"Pipelines"},
    {emoji:"⚡",label:"Motors & Drives"},
    {emoji:"🚂",label:"Engines"},
    {emoji:"🏗", label:"Pressure Vessels"},
    {emoji:"🔧",label:"Turbines"},
    {emoji:"🛢", label:"Heat Exchangers"},
    {emoji:"🏭",label:"Industrial Boilers"},
    {emoji:"⛽",label:"Storage Tanks"},
    {emoji:"🔬",label:"Weld Inspection"},
  ];
  return (
    <svg viewBox="0 0 760 290" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
      <defs>
        <linearGradient id="ap-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9"/><stop offset="100%" stopColor="#fff7ed"/></linearGradient>
      </defs>
      <rect width="760" height="290" rx="16" fill="url(#ap-bg)"/>
      <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">10+ Inspection Applications</text>
      {apps.map((a,i)=>{
        const cols=5, cW=124, cH=82, gX=16, gY=12;
        const col=i%cols, row=Math.floor(i/cols);
        const startX=(760-(cols*cW+(cols-1)*gX))/2;
        const x=startX+col*(cW+gX), y=42+row*(cH+gY);
        const colors=["#f59e0b","#ea580c","#ef4444","#f97316","#22c55e","#3b82f6","#8b5cf6","#f59e0b","#ea580c","#22c55e"];
        const c=colors[i];
        return (
          <g key={a.label}>
            <rect x={x} y={y} width={cW} height={cH} rx="12" fill="#fff" stroke={`${c}33`} strokeWidth="1.5"
              style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.07))" }}/>
            <rect x={x} y={y} width={cW} height="22" rx="12" fill={c} opacity="0.12"/>
            <rect x={x} y={y+11} width={cW} height="11" fill={c} opacity="0.12"/>
            <text x={x+cW/2} y={y+38} fontSize="22" textAnchor="middle">{a.emoji}</text>
            <text x={x+cW/2} y={y+60} fill="#334155" fontSize="10" fontWeight="700" textAnchor="middle">{a.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

/* 3 ── Defects: 5 circles */
const DefectsSVG = () => (
  <svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block", borderRadius:16 }}>
    <defs>
      <linearGradient id="df-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fafaf9"/><stop offset="100%" stopColor="#f0f9ff"/></linearGradient>
    </defs>
    <rect width="760" height="200" rx="16" fill="url(#df-bg)"/>
    <text x="380" y="26" fill="#0f1117" fontSize="13" fontWeight="800" textAnchor="middle">What Endoscopy Detects — Early Warning Indicators</text>
    {[
      {x:72,  emoji:"🔴",label:"Wear &\nAbrasion",   color:"#ef4444"},
      {x:212, emoji:"🟠",label:"Corrosion &\nRust",  color:"#f97316"},
      {x:352, emoji:"🟡",label:"Cracks &\nFractures",color:"#eab308"},
      {x:492, emoji:"🔵",label:"Blockages &\nDeposits",color:"#3b82f6"},
      {x:632, emoji:"🟢",label:"Weld\nDefects",      color:"#22c55e"},
    ].map(d=>(
      <g key={d.label}>
        <circle cx={d.x} cy="108" r="48" fill="#fff" stroke={`${d.color}33`} strokeWidth="2"
          style={{ filter:"drop-shadow(0 3px 12px rgba(0,0,0,0.08))" }}/>
        <circle cx={d.x} cy="108" r="36" fill={d.color} opacity="0.09"/>
        <text x={d.x} y="97"  fontSize="26" textAnchor="middle">{d.emoji}</text>
        <text x={d.x} y="114" fill={d.color} fontSize="8.5" fontWeight="700" textAnchor="middle">●</text>
        {d.label.split("\n").map((l,j)=>(
          <text key={j} x={d.x} y={135+j*14} fill="#334155" fontSize="11" fontWeight="700" textAnchor="middle">{l}</text>
        ))}
      </g>
    ))}
  </svg>
);

/* ─── Data ─── */
const benefits = [
  {icon:"👁",  title:"Visual Access to Hard-to-Reach Areas",  desc:"Inspect inside gearboxes, pipelines, motors and engines without disassembly — saving time and cost."},
  {icon:"⚡",  title:"Early Detection of Wear & Defects",     desc:"Identify corrosion, cracks and wear marks months before they lead to catastrophic failure."},
  {icon:"⏱",  title:"Reduce Unplanned Downtime",             desc:"Diagnose issues quickly and plan maintenance during scheduled windows — not emergency shutdowns."},
  {icon:"📋",  title:"Detailed Inspection Reports",          desc:"Every inspection delivered with HD video footage, annotated images and actionable recommendations."},
  {icon:"🔒",  title:"Non-Destructive Testing",              desc:"Zero damage to equipment — endoscopy inspects without disassembly or modification of any kind."},
  {icon:"💰",  title:"Lower Maintenance Cost",               desc:"Targeted repairs based on real evidence replace expensive blanket overhauls and guesswork."},
];

const offerings = [
  "Portable Industrial Borescopes with HD imaging",
  "Video borescope with recording & reporting",
  "Flexible probe for curved and angled access",
  "Articulating tip for 360° directional viewing",
  "On-site inspection with live display",
  "Full HD video and photo documentation",
  "Written inspection reports with findings",
  "Defect severity assessment and recommendations",
];

const heroStats = [
  {num:"HD",   label:"High-resolution imaging"},
  {num:"NDT",  label:"Non-destructive testing"},
  {num:"360°", label:"Articulation range"},
  {num:"IP67", label:"Waterproof probe"},
];

/* ═══════════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  .en-page { font-family:'Roboto',sans-serif; color:#1e293b; }
  .en-page * { box-sizing:border-box; }

  .fu { opacity:0; transform:translateY(22px); transition:opacity .55s ease,transform .55s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }

  /* ── Hero ── */
  .en-hero { position:relative; overflow:hidden; min-height:92vh; display:flex; align-items:center; }
  .en-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
  .en-hero-wash  { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,.92) 0%,rgba(224,242,254,.84) 55%,rgba(255,251,235,.92) 100%); }
  .en-hero-dots  { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .en-hero-burst { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,.28) 0%,rgba(251,191,36,.10) 40%,transparent 70%); top:-15%; left:-8%; }
  .en-hero-sky   { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,.22) 0%,rgba(56,189,248,.06) 45%,transparent 70%); bottom:-15%; right:-5%; }

  /* Flicker tagline */
  @keyframes en-fadein { 0%{opacity:0;transform:translateY(6px);letter-spacing:.13em} 60%{opacity:.85} 100%{opacity:1;transform:translateY(0);letter-spacing:.04em} }
  @keyframes en-flicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1;text-shadow:0 0 8px rgba(245,158,11,.85),0 0 20px rgba(234,88,12,.5)} 20%,24%,55%{opacity:.35;text-shadow:none} }
  .en-flicker { opacity:0; animation:en-fadein 1.4s cubic-bezier(.22,1,.36,1) .3s forwards, en-flicker 4s ease-in-out 2s infinite; font-size:clamp(13px,1.2vw,15px); font-weight:600; color:#062979; display:block; margin-top:10px; margin-bottom:18px; }

  /* Breadcrumb */
  .en-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:24px; }
  .en-bread a { font-size:12.5px; color:#64748b; text-decoration:none; transition:color .15s; }
  .en-bread a:hover { color:#f59e0b; }

  /* Badges */
  .en-badge         { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:18px; }
  .en-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,.08); border:1px solid rgba(245,158,11,.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }

  /* Stats */
  .en-stat     { background:rgba(255,255,255,.82); border:1px solid rgba(245,158,11,.28); border-radius:14px; padding:14px 18px; backdrop-filter:blur(10px); box-shadow:0 2px 12px rgba(0,0,0,.06); }
  .en-stat-num { font-size:22px; font-weight:900; color:#ea580c; line-height:1; }
  .en-stat-lbl { font-size:11px; color:#64748b; font-weight:500; margin-top:3px; }

  /* Buttons */
  .en-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:15px; font-weight:700; padding:14px 28px; border-radius:12px; text-decoration:none; transition:transform .15s,box-shadow .2s; box-shadow:0 4px 20px rgba(245,158,11,.38); }
  .en-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,.52); }
  .en-btn-ghost  { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,.72); backdrop-filter:blur(8px); color:#334155; font-size:15px; font-weight:500; padding:14px 28px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,.25); transition:border-color .2s,background .2s; }
  .en-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  /* SVG card wrapper */
  .en-svg-card { border-radius:20px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,.09),0 2px 8px rgba(0,0,0,.05); border:1px solid rgba(245,158,11,.14); transition:transform .3s,box-shadow .3s; }
  .en-svg-card:hover { transform:translateY(-4px) scale(1.005); box-shadow:0 20px 56px rgba(0,0,0,.14); }
  .en-svg-label { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,.10); border:1px solid rgba(245,158,11,.25); color:#b45309; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; padding:5px 12px; border-radius:999px; margin-bottom:10px; }

  /* Layout helpers */
  .en-hero-grid    { position:relative; max-width:1280px; margin:0 auto; padding:80px 28px 72px; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
  .en-two-col      { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }
  @media(max-width:900px){
    .en-hero-grid  { grid-template-columns:1fr; gap:36px; padding:60px 20px 52px; }
    .en-two-col    { grid-template-columns:1fr; gap:36px; }
  }

  /* Hero image card */
  .en-hero-img-wrap {
    position:relative; border-radius:24px; overflow:hidden;
    box-shadow:0 24px 72px rgba(0,0,0,0.22), 0 6px 20px rgba(0,0,0,0.14);
    border:3px solid rgba(245,158,11,0.30);
    transition:transform .4s, box-shadow .4s;
  }
  .en-hero-img-wrap:hover { transform:translateY(-6px) scale(1.01); box-shadow:0 32px 88px rgba(0,0,0,0.28); }
  .en-hero-img-wrap img { width:100%; height:420px; object-fit:cover; display:block; }
  @media(max-width:900px){ .en-hero-img-wrap img{ height:280px; } }

  /* Floating badge on hero image */
  .en-img-badge {
    position:absolute; bottom:16px; left:16px; right:16px;
    background:rgba(15,23,42,0.82); backdrop-filter:blur(12px);
    border:1px solid rgba(245,158,11,0.30); border-radius:14px;
    padding:12px 16px; display:flex; align-items:center; gap:12px;
  }
  .en-live-dot { width:9px; height:9px; border-radius:50%; background:#22c55e; flex-shrink:0; }
  @keyframes en-pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.6);opacity:0.5;} }
  .en-live-dot { animation:en-pulse 1.5s infinite; }

  /* Content image */
  .en-content-img-wrap {
    border-radius:20px; overflow:hidden;
    box-shadow:0 16px 56px rgba(0,0,0,0.14), 0 4px 14px rgba(0,0,0,0.08);
    border:1px solid #eef0f4;
    transition:transform .3s, box-shadow .3s;
  }
  .en-content-img-wrap:hover { transform:translateY(-5px) scale(1.01); box-shadow:0 24px 68px rgba(0,0,0,0.18); }
  .en-content-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; }

  /* Benefit card */
  .en-benefit { background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:22px 20px; transition:box-shadow .2s,border-color .2s,transform .2s; position:relative; overflow:hidden; }
  .en-benefit::after { content:''; position:absolute; top:0; left:0; bottom:0; width:3px; background:linear-gradient(to bottom,#f59e0b,#ea580c); opacity:0; transition:opacity .2s; }
  .en-benefit:hover { box-shadow:0 8px 28px rgba(0,0,0,.09); border-color:rgba(245,158,11,.28); transform:translateY(-3px); }
  .en-benefit:hover::after { opacity:1; }

  /* Offering pill */
  .en-offering { display:flex; align-items:center; gap:10px; background:#fff; border:1px solid #eef0f4; border-radius:12px; padding:12px 16px; font-size:13.5px; font-weight:500; color:#334155; transition:border-color .2s,box-shadow .2s; }
  .en-offering:hover { border-color:rgba(245,158,11,.30); box-shadow:0 4px 14px rgba(0,0,0,.06); }

  /* Highlight */
  .en-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:20px; padding:32px 36px; color:#fff; box-shadow:0 12px 40px rgba(245,158,11,.32); position:relative; overflow:hidden; }
  .en-highlight::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 0%,rgba(255,255,255,.18) 0%,transparent 60%); pointer-events:none; }

  /* CTA */
  .en-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .en-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }
`;

const IndustrialEndoscopy = () => {
  const refProcess = useFU(0);
  const refApps    = useFU(100);
  const refDefects = useFU(0);
  const refBenHead = useFU(0);
  const refOffHead = useFU(0);
  const refContent = useFU(100);
  const benRefs    = benefits.map((_,i)=>useFU(i*70));
  const offRefs    = offerings.map((_,i)=>useFU(i*50));

  return (
    <div className="en-page">
      <style>{css}</style>

      {/* ════ HERO ════ */}
      <section className="en-hero">
        <img src={heroBg} alt="" className="en-hero-photo" aria-hidden="true"/>
        <div className="en-hero-wash"/><div className="en-hero-dots"/>
        <div className="en-hero-burst"/><div className="en-hero-sky"/>

        <div className="en-hero-grid">

          {/* Left — copy */}
          <div>
            <div className="en-bread">
              <Link to="/">Home</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
              <Link to="/services">Services</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
              <span style={{ fontSize:12.5, color:"#334155", fontWeight:500 }}>Industrial Endoscopy</span>
            </div>

            <div className="en-badge"><Eye size={11}/> Non-Destructive Inspection</div>

            <h1 style={{ fontSize:"clamp(26px,4.5vw,54px)", fontWeight:900, color:"#1e293b", lineHeight:1.05, marginBottom:0 }}>
              Industrial{" "}
              <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Endoscopy
              </span>
              <br/>Inspection Services
            </h1>

            <span className="en-flicker">🔍 See inside your equipment — without disassembly</span>

            <p style={{ fontSize:"clamp(13px,1.3vw,16px)", color:"#475569", lineHeight:1.85, marginBottom:12, maxWidth:500 }}>
              Industrial Endoscopy Services are customised to gain <strong style={{ color:"#1e293b" }}>clear visual access to hard-to-reach areas</strong> in gearboxes, pipelines, motors, and engines.
            </p>
            <p style={{ fontSize:"clamp(13px,1.3vw,16px)", color:"#475569", lineHeight:1.85, marginBottom:28, maxWidth:500 }}>
              This technology enables <strong style={{ color:"#1e293b" }}>early detection of wear, corrosion and defects</strong> — reducing unplanned downtime and improving maintenance planning.
            </p>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:28 }}>
              {heroStats.map(s=>(
                <div key={s.label} className="en-stat"><div className="en-stat-num">{s.num}</div><div className="en-stat-lbl">{s.label}</div></div>
              ))}
            </div>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Link to="/contact" className="en-btn-primary">Book an Inspection <ArrowRight size={16}/></Link>
              <Link to="/services" className="en-btn-ghost">All Services</Link>
            </div>
          </div>

          {/* Right — real photo */}
          <div>
            <div className="en-svg-label" style={{ marginBottom:14 }}>
              <Eye size={11}/> Live Field Inspection
            </div>
            <div className="en-hero-img-wrap">
              <img src={endoscopyHero} alt="Technician performing industrial endoscopy inspection on engine"/>
              {/* Floating overlay strip */}
              <div className="en-img-badge">
                <div className="en-live-dot"/>
                <div>
                  <div style={{ fontSize:11, fontWeight:700, color:"#fbbf24", letterSpacing:"0.07em", textTransform:"uppercase" }}>Live Borescope View</div>
                  <div style={{ fontSize:10.5, color:"#94a3b8", marginTop:2 }}>HD real-time internal imaging · On-site inspection</div>
                </div>
                <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
                  {["HD","360°","IP67"].map(t=>(
                    <span key={t} style={{ background:"rgba(245,158,11,0.20)", border:"1px solid rgba(245,158,11,0.40)", borderRadius:6, padding:"2px 8px", fontSize:10, fontWeight:700, color:"#fbbf24" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ WHAT WE DO — 2-col with 2nd photo ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding:"80px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }} className="en-two-col">

          {/* Text left */}
          <div>
            <div className="en-section-badge"><Eye size={11}/> Our Offering</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,36px)", fontWeight:800, color:"#0f1117", lineHeight:1.15, marginBottom:18 }}>
              Portable Industrial Borescopes<br/>with High-Resolution Imaging
            </h2>
            <p style={{ fontSize:15.5, color:"#475569", lineHeight:1.85, marginBottom:20 }}>
              Mahadyuta uses professional-grade articulating borescopes with high-definition cameras — providing crystal-clear visual evidence of every internal condition, captured as video and photos for your maintenance records.
            </p>
            <p style={{ fontSize:15.5, color:"#475569", lineHeight:1.85, marginBottom:28 }}>
              From gearboxes and turbines to pressure vessels and pipeline interiors — our team brings specialist inspection capability directly to your facility, with minimal disruption.
            </p>

            {/* Offering pills */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
              {offerings.map((o,i)=>(
                <div key={o} ref={offRefs[i]} className="en-offering fu">
                  <CheckCircle2 size={15} style={{ color:"#f59e0b", flexShrink:0 }}/>{o}
                </div>
              ))}
            </div>

            <Link to="/contact" className="en-btn-primary">Request an On-Site Inspection <ArrowRight size={16}/></Link>
          </div>

          {/* Photo right */}
          <div ref={refContent} className="fu">
            <div className="en-svg-label" style={{ marginBottom:14 }}>
              <Settings size={11}/> Industrial Turbine Endoscopy
            </div>
            <div className="en-content-img-wrap" style={{ height:480 }}>
              <img src={endoscopyInsp} alt="Engineer inspecting industrial turbine blades with borescope"/>
            </div>
            {/* Caption strip */}
            <div style={{ marginTop:14, display:"flex", gap:10, flexWrap:"wrap" }}>
              {["🔬 Turbine Blade Inspection","⚙️ Zero Disassembly","📋 Immediate Report"].map(t=>(
                <div key={t} style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#fff", border:"1px solid rgba(245,158,11,0.22)", borderRadius:10, padding:"7px 12px", fontSize:12.5, fontWeight:600, color:"#334155" }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ PROCESS ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding:"72px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refProcess} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
            <div className="en-section-badge" style={{ margin:"0 auto 12px" }}><Settings size={11}/> Process</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:10 }}>Inspection Process — 4 Simple Steps</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>Fast, non-invasive and fully documented — completed on-site with zero downtime.</p>
          </div>
          <div className="en-svg-card"><ProcessSVG/></div>
        </div>
      </section>

      {/* ════ APPLICATIONS ════ */}
      <section style={{ background:"#fffbeb", padding:"72px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refApps} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
            <div className="en-section-badge" style={{ margin:"0 auto 12px" }}><Settings size={11}/> Applications</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:10 }}>Where We Inspect</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>Any asset with internal spaces too tight or complex for direct visual inspection.</p>
          </div>
          <div className="en-svg-card"><ApplicationsSVG/></div>
        </div>
      </section>

      {/* ════ DEFECTS DETECTED ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding:"72px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refDefects} className="fu" style={{ textAlign:"center", marginBottom:36 }}>
            <div className="en-section-badge" style={{ margin:"0 auto 12px" }}><AlertTriangle size={11}/> Detection</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:10 }}>What Endoscopy Detects</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>Catch these critical failure indicators before they escalate to costly breakdowns.</p>
          </div>
          <div className="en-svg-card"><DefectsSVG/></div>
        </div>
      </section>

      {/* ════ BENEFITS ════ */}
      <section style={{ background:"#fffbeb", padding:"72px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refBenHead} className="fu" style={{ textAlign:"center", marginBottom:40 }}>
            <div className="en-section-badge" style={{ margin:"0 auto 12px" }}><CheckCircle2 size={11}/> Benefits</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:800, color:"#0f1117", marginBottom:10 }}>Why Choose Endoscopy Inspection</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"0 auto" }}>Evidence-based, non-invasive and fast — six reasons maintenance teams choose endoscopy first.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:18 }}>
            {benefits.map((b,i)=>(
              <div key={b.title} ref={benRefs[i]} className="en-benefit fu">
                <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                  <span style={{ fontSize:28, flexShrink:0 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:5 }}>{b.title}</div>
                    <div style={{ fontSize:13, color:"#64748b", lineHeight:1.65 }}>{b.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default IndustrialEndoscopy;