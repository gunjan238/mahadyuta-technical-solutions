

/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight, CheckCircle2, Wifi, Cloud,
  Cpu, Activity, Zap, AlertTriangle, BarChart3, Shield,
  Monitor,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

/* ── Place these images in src/assets/monitoring/ ── */
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
   DATA  — 18 systems, first 14 use real photos
═══════════════════════════════════════════════════════ */
const monitoringSystems = [
  { img: imgEnergy,     emoji:"",    label:"Energy Monitoring",          color:"#f59e0b", bg:"#fffbeb" },
  { img: imgWater,      emoji:"",    label:"Water Monitoring",           color:"#3b82f6", bg:"#eff6ff" },
  { img: imgDG,         emoji:"",    label:"DG Monitoring",              color:"#f97316", bg:"#fff7ed" },
  { img: imgAQI,        emoji:"",    label:"AQI Monitoring",             color:"#22c55e", bg:"#f0fdf4" },
  { img: imgFire,       emoji:"",    label:"Fire Fighting Monitoring",   color:"#ef4444", bg:"#fef2f2" },
  { img: imgUPS,        emoji:"",    label:"UPS Monitoring",             color:"#f59e0b", bg:"#fffbeb" },
  { img: imgHVAC,       emoji:"",    label:"HVAC Monitoring",            color:"#0ea5e9", bg:"#f0f9ff" },
  { img: imgVibration,  emoji:"",    label:"Vibration Monitoring",       color:"#8b5cf6", bg:"#f5f3ff" },
  { img: imgCompressor, emoji:"",    label:"Compressor Monitoring",      color:"#64748b", bg:"#f8fafc" },
  { img: imgGas,        emoji:"",    label:"Gas System Monitoring",      color:"#f97316", bg:"#fff7ed" },
  { img: imgTransformer,emoji:"",    label:"Transformer Monitoring",     color:"#f59e0b", bg:"#fffbeb" },
  { img: imgSteam,      emoji:"",    label:"Steam & Valves Monitoring",  color:"#6366f1", bg:"#eef2ff" },
  { img: imgSolar,      emoji:"",    label:"Solar Monitoring",           color:"#eab308", bg:"#fefce8" },
  { img: imgElectrical, emoji:"",    label:"Electrical Signature Monitoring", color:"#ea580c", bg:"#fff7ed" },
  { img: null,          emoji:"🌾",  label:"Agriculture Monitoring",     color:"#22c55e", bg:"#f0fdf4" },
  { img: null,          emoji:"📊",  label:"FLMS Monitoring",            color:"#ef4444", bg:"#fef2f2" },
  { img: null,          emoji:"☁️",  label:"Remote Monitoring & Alerts", color:"#475569", bg:"#f8fafc" },
  { img: null,          emoji:"📡",  label:"Gas Monitoring System",      color:"#f97316", bg:"#fff7ed" },
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

const esaInsights = ["Stator and rotor faults","Phase imbalance and electrical issues","Power consumption and power factor","Duty cycle and inrush current behavior"];

const heroStats = [
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

  /* Hero */
  .ms-hero{position:relative;overflow:hidden;min-height:60vh;display:flex;align-items:center;}
  .ms-hero-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(0.62);pointer-events:none;}
  .ms-hero-wash{position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,251,235,0.90) 0%,rgba(224,242,254,0.82) 55%,rgba(255,251,235,0.90) 100%);}
  .ms-hero-dots{position:absolute;inset:0;opacity:0.07;background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0);background-size:40px 40px;}
  .ms-hero-burst{position:absolute;pointer-events:none;width:70vw;height:70vw;border-radius:50%;background:radial-gradient(circle,rgba(251,191,36,0.26) 0%,rgba(251,191,36,0.09) 40%,transparent 70%);top:-15%;left:-8%;}
  .ms-hero-sky{position:absolute;pointer-events:none;width:55vw;height:55vw;border-radius:50%;background:radial-gradient(circle,rgba(56,189,248,0.20) 0%,rgba(56,189,248,0.06) 45%,transparent 70%);bottom:-15%;right:-5%;}

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

  /* ════ PHOTO MONITORING GRID ════ */
  .ms-monitor-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(190px,1fr));
    gap:18px;
  }
  .ms-monitor-card{
    background:#fff;
    border:1px solid #eef0f4;
    border-radius:20px;
    overflow:hidden;
    box-shadow:0 3px 14px rgba(0,0,0,0.06);
    transition:border-color 0.22s,box-shadow 0.22s,transform 0.22s;
    cursor:default;
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  .ms-monitor-card:hover{
    border-color:rgba(245,158,11,0.40);
    box-shadow:0 12px 36px rgba(245,158,11,0.16);
    transform:translateY(-6px) scale(1.02);
  }
  /* Image zone */
  .ms-monitor-img-zone{
    width:100%;
    height:130px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:18px 18px 12px;
    position:relative;
    overflow:hidden;
    flex-shrink:0;
  }
  .ms-monitor-img-zone img{
    max-height:100%;
    max-width:100%;
    object-fit:contain;
    transition:transform 0.3s ease;
    filter:drop-shadow(0 4px 12px rgba(0,0,0,0.14));
  }
  .ms-monitor-card:hover .ms-monitor-img-zone img{
    transform:scale(1.10) translateY(-3px);
  }
  /* Emoji fallback zone */
  .ms-monitor-emoji-zone{
    width:100%;
    height:130px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:52px;
    flex-shrink:0;
  }
  /* Bottom label band */
  .ms-monitor-label-band{
    width:100%;
    padding:11px 14px 14px;
    border-top:1px solid #f1f5f9;
    text-align:center;
  }
  .ms-monitor-label{
    font-size:12.5px;
    font-weight:700;
    color:#1e293b;
    line-height:1.35;
  }
  /* Accent line top */
  .ms-monitor-card::before{
    content:'';
    display:block;
    width:100%;
    height:3px;
    flex-shrink:0;
    border-radius:20px 20px 0 0;
    transition:background 0.2s;
  }

  /* Steps centred */
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

  .ms-highlight{background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%);border-radius:20px;padding:32px 36px;color:#fff;box-shadow:0 12px 40px rgba(245,158,11,0.32);position:relative;overflow:hidden;}
  .ms-highlight::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 80% 0%,rgba(255,255,255,0.18) 0%,transparent 60%);pointer-events:none;}

  .ms-cta{position:relative;overflow:hidden;background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%);}
  .ms-cta-burst{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%);top:-200px;right:-100px;pointer-events:none;}

  @keyframes ms-pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.5);opacity:0.6;}}
  .ms-pulse-dot{width:10px;height:10px;border-radius:50%;background:#16a34a;animation:ms-pulse 2s infinite;flex-shrink:0;}

  .ms-flow{display:flex;align-items:center;gap:0;flex-wrap:wrap;justify-content:center;}
  .ms-flow-node{display:flex;flex-direction:column;align-items:center;gap:8px;background:#fff;border:1px solid rgba(245,158,11,0.25);border-radius:16px;padding:18px 20px;min-width:110px;box-shadow:0 4px 16px rgba(0,0,0,0.06);}
  .ms-flow-icon{width:44px;height:44px;border-radius:12px;background:rgba(245,158,11,0.10);display:flex;align-items:center;justify-content:center;color:#f59e0b;}
  .ms-flow-label{font-size:11px;font-weight:700;color:#334155;text-align:center;line-height:1.3;}
  .ms-flow-line{width:40px;height:2px;background:linear-gradient(90deg,rgba(245,158,11,0.5),rgba(234,88,12,0.5));flex-shrink:0;position:relative;}
  .ms-flow-line::after{content:'▶';position:absolute;right:-5px;top:-7px;font-size:10px;color:#f59e0b;}
`;

/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
const MonitoringSystems = () => {
  const refGrid    = useFU(0);
  const refIIoT    = useFU(0);
  const refML      = useFU(0);
  const refBearing = useFU(0);
  const refESA     = useFU(0);

  const stepRefs = [useFU(0), useFU(120), useFU(240)];
  const mlRefs   = [useFU(0), useFU(80), useFU(160), useFU(240), useFU(320), useFU(400)];
  const sysRefs  = monitoringSystems.map((_, i) => useFU(i * 40));

  return (
    <div className="ms-page">
      <style>{css}</style>

      {/* ════ HERO ════ */}
      <section className="ms-hero">
        <img src={heroBg} alt="" className="ms-hero-photo" aria-hidden="true"/>
        <div className="ms-hero-wash"/><div className="ms-hero-dots"/>
        <div className="ms-hero-burst"/><div className="ms-hero-sky"/>

        <div style={{ position:"relative", maxWidth:1280, margin:"0 auto", padding:"80px 28px 72px", width:"100%" }}>
          <div className="ms-bread">
            <Link to="/">Home</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
            <Link to="/products">Products</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
            <span style={{ fontSize:12.5, color:"#334155", fontWeight:500 }}>Monitoring Systems</span>
          </div>

          <div className="ms-badge"><Wifi size={11}/> IIoT 4.0 Technology</div>

          <h1 style={{ fontSize:"clamp(26px,4.5vw,54px)", fontWeight:900, color:"#1e293b", lineHeight:1.05, marginBottom:18, maxWidth:620 }}>
            IIoT Based{" "}
            <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Monitoring Solutions
            </span>
          </h1>

          <p style={{ fontSize:"clamp(14px,1.4vw,17px)", color:"#475569", lineHeight:1.75, marginBottom:32, maxWidth:560 }}>
            <em style={{ color:"#b45309", fontWeight:600 }}>Empowering Sustainability with Smart Solutions.</em>
            {" "}Connected IIoT sensors, gateway and cloud analytics — 18+ monitoring systems for energy, water, vibration, electrical, gas and more.
          </p>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:32 }}>
            {heroStats.map(s=>(
              <div key={s.label} className="ms-stat"><div className="ms-stat-num">{s.num}</div><div className="ms-stat-label">{s.label}</div></div>
            ))}
          </div>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Link to="/contact" className="ms-btn-primary">Request a Demo <ArrowRight size={16}/></Link>
            {/* <Link to="/services" className="ms-btn-ghost">Our Services</Link> */}
          </div>
        </div>
      </section>

      {/* ════ MONITORING PORTFOLIO — PHOTO CARDS ════ */}
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
              <div
                key={s.label + i}
                ref={sysRefs[i]}
                className="ms-monitor-card fu"
                style={{ "--accent": s.color } as React.CSSProperties}
              >
                {/* Top colour accent line */}
                <div style={{ width:"100%", height:4, background:`linear-gradient(90deg,${s.color},${s.color}88)`, borderRadius:"20px 20px 0 0", flexShrink:0 }}/>

                {/* Image or emoji zone */}
                {s.img ? (
                  <div className="ms-monitor-img-zone" style={{ background:s.bg }}>
                    <img src={s.img} alt={s.label}/>
                  </div>
                ) : (
                  <div className="ms-monitor-emoji-zone" style={{ background:s.bg }}>
                    {s.emoji}
                  </div>
                )}

                {/* Label band */}
                <div className="ms-monitor-label-band">
                  <span className="ms-monitor-label">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

          {/* Flow diagram */}
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

          {/* A/B/C step cards — centred */}
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
                {[{label:"High Risk",bg:"#fef2f2",border:"rgba(239,68,68,0.25)",dot:"#ef4444"},{label:"Medium Risk",bg:"#fffbeb",border:"rgba(245,158,11,0.30)",dot:"#f59e0b"},{label:"Low Risk",bg:"#f0fdf4",border:"rgba(22,163,74,0.25)",dot:"#16a34a"}].map(r=>(
                  <div key={r.label} style={{ display:"flex",alignItems:"center",gap:6,background:r.bg,border:`1px solid ${r.border}`,borderRadius:8,padding:"6px 12px",fontSize:12.5,fontWeight:600,color:"#334155" }}>
                    <div style={{ width:8,height:8,borderRadius:"50%",background:r.dot }}/>{r.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="ms-cta" style={{ padding:"80px 28px", textAlign:"center" }}>
        <div className="ms-cta-burst"/>
        <div style={{ position:"relative", maxWidth:680, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(24px,3.5vw,40px)", fontWeight:800, color:"#fff", marginBottom:16 }}>
            Ready to Monitor Your Plant in Real Time?
          </h2>
          <p style={{ fontSize:16, color:"rgba(255,255,255,0.88)", lineHeight:1.7, marginBottom:36 }}>
            Our team will design the right IIoT monitoring solution for your facility — from a single energy meter to a full 18-system plant-wide deployment.
          </p>
          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/contact" style={{ display:"inline-flex",alignItems:"center",gap:8,background:"#fff",color:"#b45309",fontWeight:700,fontSize:15,padding:"14px 32px",borderRadius:12,textDecoration:"none",boxShadow:"0 4px 20px rgba(0,0,0,0.15)" }}>
              Talk to a Specialist <ArrowRight size={16}/>
            </Link>
            <Link to="/services" style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.15)",color:"#fff",fontWeight:500,fontSize:15,padding:"14px 28px",borderRadius:12,textDecoration:"none",border:"1px solid rgba(255,255,255,0.30)" }}>
              View Related Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MonitoringSystems;