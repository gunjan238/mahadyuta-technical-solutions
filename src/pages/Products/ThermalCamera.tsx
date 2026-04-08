/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Thermometer, CheckCircle2, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

// ── Real product photos ──────────────────────────────────────────────────────
import camBasicHandheld    from "@/assets/thermalCam1.webp"; // Basic handheld  (Cat A)
import camAdvancedHandheld from "@/assets/thermalCam4.jpg";  // Advanced handheld (Cat B)
import camFixed            from "@/assets/thermalCam2.jpg";  // Fixed camera    (Cat C)
import camAutomation       from "@/assets/thermalCam3.jpg";  // Automation camera (Cat D)

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

/* ═══ DATA ═══ */
const categories = [
  {
    id:"a", label:"A", tag:"Entry Level",
    title:"Basic Handheld IR\nThermography Devices",
    color:"#f59e0b", bg:"linear-gradient(135deg,#f59e0b,#d97706)",
    image: camBasicHandheld,
    imageAlt: "Basic handheld IR thermography camera",
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
    image: camFixed,
    imageAlt: "Advanced professional handheld IR thermography camera in use",
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
    image: camAutomation,
    imageAlt: "Fixed thermal imaging camera for continuous monitoring",
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
    image: camAdvancedHandheld,
    imageAlt: "Compact thermal automation camera for industrial integration",
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

  /* Product image panel */
  .tc-card-img-wrap {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4/3;
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tc-card-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 24px;
    transition: transform .4s ease;
  }
  .tc-card:hover .tc-card-img { transform: scale(1.04); }

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
                  {/* Left: real product photo */}
                  <div className="tc-card-img-wrap">
                    <img
                      src={cat.image}
                      alt={cat.imageAlt}
                      className="tc-card-img"
                    />
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
            {/* ── Updated: redirects to Thermal Monitoring Solutions product category ── */}
            <Link to="/products/automated-thermal-monitoring" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.15)", color:"#fff", fontWeight:500, fontSize:15, padding:"14px 28px", borderRadius:12, textDecoration:"none", border:"1px solid rgba(255,255,255,.30)" }}>
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThermalCamerasProduct;