// import { useEffect, useRef, useState, useCallback } from "react";
// import { Link } from "react-router-dom";
// import {
//   ChevronRight, ChevronLeft, Zap, ArrowRight, CheckCircle2, Star,
// } from "lucide-react";
// import heroBg from "@/assets/hero-bg.jpg";

// import sonaphoneIII    from "@/assets/products/sonaphone-iii.jpg";
// import sonascreen2     from "@/assets/products/sonascreen-2.jpg";
// import sonaphonePocket from "@/assets/products/sonaphone-pocket.jpg";
// import sonaphoneT      from "@/assets/products/sonaphone-t-sonosphere.jpg";
// import thermeye256     from "@/assets/products/thermeye-256.jpg";
// import borescope       from "@/assets/products/borescope.jpg";
// import ultrasonic from "@/assets/ultrasonictesting.png";

// /* ═══════════════════════════════════════════════════════════
//    STYLES
// ═══════════════════════════════════════════════════════════ */
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
//   .ud-page { font-family:'Roboto',sans-serif; color:#1e293b; }
//   .ud-page * { box-sizing:border-box; }

//   /* ── Fade up ── */
//   .fu { opacity:0; transform:translateY(22px); transition:opacity 0.55s ease,transform 0.55s ease; }
//   .fu.vis { opacity:1; transform:translateY(0); }

//   /* ════ HERO ════ */
//   .ud-hero {
//     position:relative; overflow:hidden;
//     min-height:60vh; display:flex; align-items:center;
//   }
//   .ud-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
//   .ud-hero-wash  { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,0.90) 0%,rgba(224,242,254,0.82) 55%,rgba(255,251,235,0.90) 100%); }
//   .ud-hero-dots  { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
//   .ud-hero-burst { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,0.26) 0%,rgba(251,191,36,0.09) 40%,transparent 70%); top:-15%; left:-8%; }
//   .ud-hero-sky   { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.20) 0%,rgba(56,189,248,0.06) 45%,transparent 70%); bottom:-15%; right:-5%; }

//   .ud-hero-inner {
//     position:relative; max-width:1280px; margin:0 auto;
//     padding:80px 28px 72px; width:100%;
//     display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center;
//   }
//   @media(max-width:900px){ .ud-hero-inner{ grid-template-columns:1fr; } }

//   /* ════ HERO SLIDER ════ */
//   .ud-slider {
//     position:relative;
//     background:rgba(255,255,255,0.88);
//     border:1px solid rgba(245,158,11,0.28);
//     border-radius:24px;
//     overflow:hidden;
//     box-shadow:0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(245,158,11,0.12);
//     min-height:340px;
//   }

//   .ud-slider::before {
//     content:''; position:absolute; top:0; left:0; right:0; height:4px;
//     background:linear-gradient(90deg,#f59e0b,#ea580c); z-index:2;
//   }

//   .ud-slider-track {
//     display:flex;
//     transition:transform 0.55s cubic-bezier(0.45,0,0.15,1);
//     will-change:transform;
//   }

//   .ud-slide {
//     min-width:100%; display:flex; flex-direction:column; align-items:center;
//     padding:28px 28px 24px; gap:16px; user-select:none;
//   }

//   .ud-slide-img {
//     width:100%; height:200px;
//     display:flex; align-items:center; justify-content:center;
//     background:linear-gradient(135deg,#fffbeb,#fef3c7);
//     border-radius:16px; overflow:hidden;
//     border:1px solid rgba(245,158,11,0.15);
//   }
//   .ud-slide-img img { width:100%; height:100%; object-fit:contain; padding:18px; }

//   .ud-slide-body { width:100%; text-align:center; }
//   .ud-slide-make { font-size:10px; font-weight:700; color:#b45309; text-transform:uppercase; letter-spacing:0.09em; margin-bottom:4px; }
//   .ud-slide-name { font-size:16px; font-weight:800; color:#0f1117; line-height:1.2; margin-bottom:6px; }
//   .ud-slide-desc { font-size:12.5px; color:#64748b; line-height:1.6; }

//   .ud-slider-arrow {
//     position:absolute; top:50%; transform:translateY(-50%); z-index:3;
//     width:36px; height:36px; border-radius:50%;
//     background:rgba(255,255,255,0.92); border:1px solid rgba(245,158,11,0.30);
//     display:flex; align-items:center; justify-content:center;
//     cursor:pointer; color:#b45309;
//     box-shadow:0 2px 10px rgba(0,0,0,0.10);
//     transition:background 0.15s, box-shadow 0.15s, transform 0.15s;
//   }
//   .ud-slider-arrow:hover { background:#fffbeb; box-shadow:0 4px 18px rgba(245,158,11,0.22); transform:translateY(-50%) scale(1.08); }
//   .ud-slider-arrow.prev { left:10px; }
//   .ud-slider-arrow.next { right:10px; }

//   .ud-slider-dots { display:flex; gap:7px; justify-content:center; padding:0 0 18px; position:absolute; bottom:0; left:0; right:0; z-index:3; }
//   .ud-slider-dot {
//     width:7px; height:7px; border-radius:50%;
//     background:rgba(245,158,11,0.25); border:none; padding:0; cursor:pointer;
//     transition:background 0.2s, transform 0.2s, width 0.25s;
//   }
//   .ud-slider-dot.active { background:#f59e0b; transform:scale(1.2); width:20px; border-radius:4px; }

//   .ud-slider-progress {
//     position:absolute; bottom:0; left:0; height:3px; z-index:4;
//     background:linear-gradient(90deg,#f59e0b,#ea580c);
//     transition:width 0.1s linear;
//   }

//   /* ── Most Selling badge (card) ── */
//   .ud-most-selling {
//     position:absolute; top:12px; left:12px;
//     background:linear-gradient(135deg,#f59e0b,#ea580c);
//     color:#fff; font-size:10px; font-weight:800;
//     letter-spacing:0.08em; text-transform:uppercase;
//     padding:4px 10px; border-radius:999px;
//     display:inline-flex; align-items:center; gap:5px;
//     box-shadow:0 2px 10px rgba(245,158,11,0.45);
//     z-index:2;
//   }
//   .ud-most-selling::before { content:'★'; font-size:9px; }

//   /* ── Most Selling badge (slider) ── */
//   .ud-slide-best {
//     display:inline-flex; align-items:center; gap:4px;
//     background:linear-gradient(135deg,#f59e0b,#ea580c);
//     color:#fff; font-size:9px; font-weight:800;
//     letter-spacing:0.08em; text-transform:uppercase;
//     padding:3px 9px; border-radius:999px;
//     margin-bottom:6px;
//   }

//   /* ── Breadcrumb ── */
//   .ud-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:24px; }
//   .ud-bread a { font-size:12.5px; color:#64748b; text-decoration:none; transition:color 0.15s; }
//   .ud-bread a:hover { color:#f59e0b; }
//   .ud-bread-sep { color:#cbd5e1; }
//   .ud-bread-active { font-size:12.5px; color:#334155; font-weight:500; }

//   /* ── Badges ── */
//   .ud-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:20px; }
//   .ud-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }

//   /* ── Hero stat ── */
//   .ud-hero-stat { background:rgba(255,255,255,0.82); border:1px solid rgba(245,158,11,0.28); border-radius:14px; padding:14px 18px; backdrop-filter:blur(10px); box-shadow:0 2px 12px rgba(0,0,0,0.06); }
//   .ud-hero-stat-num { font-size:24px; font-weight:900; color:#ea580c; line-height:1; }
//   .ud-hero-stat-label { font-size:11px; color:#64748b; font-weight:500; margin-top:3px; }

//   /* ── Intro ── */
//   .ud-intro { background:linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%); padding:72px 28px; }

//   /* ── Feature card ── */
//   .ud-feature-card { display:flex; align-items:flex-start; gap:10px; background:#fff; border:1px solid #eef0f4; border-radius:12px; padding:14px 16px; transition:border-color 0.2s,box-shadow 0.2s,transform 0.2s; }
//   .ud-feature-card:hover { border-color:rgba(245,158,11,0.30); box-shadow:0 4px 16px rgba(0,0,0,0.07); transform:translateY(-2px); }

//   /* ── Product grid ── */
//   .ud-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:28px; }
//   @media(max-width:768px){ .ud-grid{ grid-template-columns:1fr; } }

//   /* ── Product card ── */
//   .ud-card { background:#fff; border:1px solid #eef0f4; border-radius:20px; overflow:hidden; display:flex; flex-direction:column; transition:box-shadow 0.25s,transform 0.25s,border-color 0.25s; position:relative; }
//   .ud-card::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(90deg,#f59e0b,#ea580c); opacity:0; transition:opacity 0.25s; }
//   .ud-card:hover { box-shadow:0 20px 56px rgba(0,0,0,0.11); transform:translateY(-7px); border-color:rgba(245,158,11,0.32); }
//   .ud-card:hover::before { opacity:1; }

//   .ud-card-img { width:100%; height:240px; background:linear-gradient(135deg,#fffbeb,#fef3c7); display:flex; align-items:center; justify-content:center; overflow:hidden; border-bottom:1px solid #eef0f4; position:relative; }
//   .ud-card-img img { width:100%; height:100%; object-fit:contain; padding:20px; transition:transform 0.4s ease; }
//   .ud-card:hover .ud-card-img img { transform:scale(1.07); }
//   .ud-card-img-placeholder { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; color:#94a3b8; font-size:13px; width:100%; height:100%; background:linear-gradient(135deg,#fef3c7,#fffbeb); }

//   .ud-make-tag { position:absolute; top:12px; right:12px; background:rgba(255,255,255,0.92); border:1px solid rgba(245,158,11,0.35); color:#b45309; font-size:10px; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; padding:4px 10px; border-radius:999px; backdrop-filter:blur(8px); }

//   @keyframes ud-shimmer { 0%{transform:translateX(-100%) skewX(-15deg);} 100%{transform:translateX(250%) skewX(-15deg);} }
//   .ud-card:hover .ud-shimmer { animation:ud-shimmer 0.8s ease forwards; }
//   .ud-shimmer { position:absolute; inset:0; pointer-events:none; background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.45) 50%,transparent 100%); z-index:1; }

//   .ud-card-body { padding:24px; flex:1; display:flex; flex-direction:column; gap:14px; }
//   .ud-card-title { font-size:18px; font-weight:800; color:#0f1117; line-height:1.2; }
//   .ud-card-desc { font-size:13.5px; color:#64748b; line-height:1.7; }

//   .ud-apps-label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#b45309; margin-bottom:6px; }
//   .ud-apps-list  { display:flex; flex-wrap:wrap; gap:6px; }
//   .ud-app-pill { display:inline-flex; align-items:center; gap:5px; background:#fffbeb; border:1px solid rgba(245,158,11,0.22); border-radius:8px; padding:4px 10px; font-size:12px; color:#92400e; font-weight:500; }
//   .ud-app-dot { width:5px; height:5px; border-radius:50%; background:#f59e0b; flex-shrink:0; }

//   .ud-card-cta { display:inline-flex; align-items:center; gap:7px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:13px; font-weight:700; padding:11px 20px; border-radius:10px; text-decoration:none; margin-top:auto; border:none; cursor:pointer; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 16px rgba(245,158,11,0.32); width:fit-content; }
//   .ud-card-cta:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(245,158,11,0.48); }

//   /* ── Highlight ── */
//   .ud-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:20px; padding:32px 36px; color:#fff; box-shadow:0 12px 40px rgba(245,158,11,0.32); position:relative; overflow:hidden; }
//   .ud-highlight::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 0%,rgba(255,255,255,0.18) 0%,transparent 60%); pointer-events:none; }

//   /* ── Buttons ── */
//   .ud-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:15px; font-weight:700; padding:14px 28px; border-radius:12px; text-decoration:none; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 20px rgba(245,158,11,0.38); }
//   .ud-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.52); }
//   .ud-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:15px; font-weight:500; padding:14px 28px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,0.25); transition:border-color 0.2s,background 0.2s; }
//   .ud-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

//   /* ── CTA ── */
//   .ud-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
//   .ud-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }
// `;

// /* ── Data ── */
// const slides = [
//   { img: ultrasonic,      make: "SONOTEC · Germany", name: "SONAPHONE III",            desc: "Advanced portable ultrasound device with data recording, analysis and report generation.", isBest: true },
//   { img: sonascreen2,     make: "SONOTEC · Germany", name: "SONASCREEN 2",             desc: "Acoustic camera with integrated IR thermal imaging for PD detection and leak visualisation." },
//   { img: sonaphonePocket, make: "SONOTEC · Germany", name: "SONAPHONE POCKET",         desc: "Compact ultrasound instrument for preventive maintenance and energy saving inspections." },
//   { img: sonaphoneT,      make: "SONOTEC · Germany", name: "SONAPHONE-T & SONOSPHERE", desc: "Tightness testing system for enclosed spaces, vessels and cable trench integrity." },
//   { img: thermeye256,     make: "SONOTEC · Germany", name: "THERMEYE 256",             desc: "Portable thermal imaging camera for electrical panels, motors and building diagnostics." },
//   { img: borescope,       make: "Industrial",         name: "BORESCOPE",                desc: "Visual inspection inside inaccessible machine areas, pipelines and heat exchangers." },
// ];

// const products = [
//   { id:"sonaphone-iii",    name:"SONAPHONE III",            make:"SONOTEC · Germany", img:ultrasonic,    isBest: true,  desc:"A portable ultrasound testing device with advanced software for data recording, data analysis and report generation.",                                                       apps:["Pressure & vacuum leak detection","Bearing analysis & lubrication management","Electrical PD detection","Steam trap testing","Valve pass inspection"] },
//   { id:"sonascreen-2",     name:"SONASCREEN 2",             make:"SONOTEC · Germany", img:sonascreen2,                  desc:"A portable acoustic camera with IR thermal imaging capability and advanced software for effective data analysis and report generation.",                                   apps:["HT Electrical partial discharge detection","Substation & transmission line inspection","Compressed air leak detection","Energy saving evaluation"] },
//   { id:"sonaphone-pocket", name:"SONAPHONE POCKET",         make:"SONOTEC · Germany", img:sonaphonePocket,              desc:"A basic ultrasound testing device for industrial preventive maintenance and energy saving.",                                                                               apps:["Pressure & vacuum leak detection","Bearing analysis & lubrication management","Electrical PD detection","Steam trap testing"] },
//   { id:"sonaphone-t",      name:"SONAPHONE-T & SONOSPHERE", make:"SONOTEC · Germany", img:sonaphoneT,                   desc:"Portable ultrasound transmitter for tightness testing and integrity assessment of enclosed spaces.",                                                                      apps:["Leak testing of rooms & tanks","Vessel & clean room tightness","Cable trench inspection","Sealed enclosure assessment"] },
//   { id:"thermeye-256",     name:"THERMEYE 256",             make:"SONOTEC · Germany", img:thermeye256,                  desc:"A portable thermal imaging camera with accurate temperature measurement and clear thermal imaging for reliable fault detection.",                                          apps:["Electrical panel inspection","Mechanical equipment & motors","Bearing thermal monitoring","Building diagnostics","Preventive maintenance"] },
//   { id:"borescope",        name:"BORESCOPE",                make:"Industrial",        img:borescope,                    desc:"Industrial Borescope for internal inspection of inaccessible areas, providing clear, high-quality images for accurate fault detection.",                                   apps:["Machine gearbox internal imaging","Pipeline inspection","Engine & motor inspection","Heat exchanger videography"] },
// ];

// const features = [
//   "Trusted SONOTEC Germany technology",
//   "Non-contact & non-destructive inspection",
//   "Advanced data recording & report generation",
//   "Thermal imaging + ultrasound combined",
//   "Wide range of industrial applications",
//   "Portable field-ready instruments",
// ];

// const heroStats = [
//   { num:"6",       label:"Instruments"       },
//   { num:"50+",     label:"Applications"      },
//   { num:"SONOTEC", label:"Germany Partner"   },
// ];

// /* ─── useFU hook ─── */
// const useFU = (delay = 0) => {
//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) { setTimeout(() => el.classList.add("vis"), delay); obs.disconnect(); }
//     }, { threshold: 0.1 });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [delay]);
//   return ref;
// };

// /* ─── Product Image with fallback ─── */
// const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
//   const [failed, setFailed] = useState(false);
//   if (failed) return <div className="ud-card-img-placeholder"><Zap size={32} color="#f59e0b" /><span>{alt}</span></div>;
//   return <><img src={src} alt={alt} onError={() => setFailed(true)} /><div className="ud-shimmer" /></>;
// };

// /* ══════════════════════════════════════════════════════════
//    HERO SLIDER
// ══════════════════════════════════════════════════════════ */
// const INTERVAL = 3000;

// const HeroSlider = () => {
//   const [active,   setActive]   = useState(0);
//   const [paused,   setPaused]   = useState(false);
//   const [progress, setProgress] = useState(0);
//   const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
//   const progRef    = useRef<ReturnType<typeof setInterval> | null>(null);
//   const total      = slides.length;

//   const goTo = useCallback((idx: number) => {
//     setActive(idx);
//     setProgress(0);
//   }, []);

//   const next = useCallback(() => goTo((active + 1) % total), [active, goTo, total]);
//   const prev = useCallback(() => goTo((active - 1 + total) % total), [active, goTo, total]);

//   useEffect(() => {
//     if (paused) return;
//     timerRef.current = setInterval(() => setActive(a => (a + 1) % total), INTERVAL);
//     return () => clearInterval(timerRef.current!);
//   }, [paused, total]);

//   useEffect(() => {
//     if (paused) { setProgress(0); return; }
//     setProgress(0);
//     const step = 100 / (INTERVAL / 80);
//     progRef.current = setInterval(() => setProgress(p => Math.min(p + step, 100)), 80);
//     return () => clearInterval(progRef.current!);
//   }, [active, paused]);

//   return (
//     <div
//       className="ud-slider"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       <div
//         className="ud-slider-track"
//         style={{ transform: `translateX(-${active * 100}%)` }}
//       >
//         {slides.map((s, i) => (
//           <div key={s.name} className="ud-slide" aria-hidden={i !== active}>
//             <div className="ud-slide-img">
//               <img
//                 src={s.img}
//                 alt={s.name}
//                 onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
//               />
//             </div>
//             <div className="ud-slide-body">
//               <div className="ud-slide-make">{s.make}</div>
//               {/* ── Most Selling badge in slider ── */}
//               {s.isBest && (
//                 <div className="ud-slide-best">★ Most Selling</div>
//               )}
//               <div className="ud-slide-name">{s.name}</div>
//               <div className="ud-slide-desc">{s.desc}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button className="ud-slider-arrow prev" onClick={prev} aria-label="Previous product">
//         <ChevronLeft size={16} />
//       </button>
//       <button className="ud-slider-arrow next" onClick={next} aria-label="Next product">
//         <ChevronRight size={16} />
//       </button>

//       <div className="ud-slider-dots">
//         {slides.map((_, i) => (
//           <button
//             key={i}
//             className={`ud-slider-dot ${i === active ? "active" : ""}`}
//             onClick={() => goTo(i)}
//             aria-label={`Go to slide ${i + 1}`}
//           />
//         ))}
//       </div>

//       {!paused && (
//         <div className="ud-slider-progress" style={{ width: `${progress}%` }} />
//       )}
//     </div>
//   );
// };

// /* ─── Product Card ─── */
// const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
//   const ref = useFU(index * 80);
//   return (
//     <div ref={ref} className="ud-card fu">
//       <div className="ud-card-img">
//         <ProductImage src={product.img} alt={product.name} />
//         {/* ── Most Selling badge on card ── */}
//         {product.isBest && (
//           <span className="ud-most-selling">Most Selling</span>
//         )}
//         <span className="ud-make-tag">{product.make}</span>
//       </div>
//       <div className="ud-card-body">
//         <div className="ud-card-title">{product.name}</div>
//         <p className="ud-card-desc">{product.desc}</p>
//         <div>
//           <div className="ud-apps-label">Applications</div>
//           <div className="ud-apps-list">
//             {product.apps.map((a) => (
//               <span key={a} className="ud-app-pill"><span className="ud-app-dot" />{a}</span>
//             ))}
//           </div>
//         </div>
//         <Link to="/contact" className="ud-card-cta">Enquire <ArrowRight size={14} /></Link>
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    PAGE
// ═══════════════════════════════════════════════════════════ */
// const UltrasonicTestingDevices = () => {
//   const refIntro    = useFU(0);
//   const refFeatures = useFU(100);
//   const refGridHead = useFU(0);

//   return (
//     <div className="ud-page">
//       <style>{css}</style>

//       {/* ════════ HERO ════════ */}
//       <section className="ud-hero">
//         <img src={heroBg} alt="" className="ud-hero-photo" aria-hidden="true" />
//         <div className="ud-hero-wash" /><div className="ud-hero-dots" />
//         <div className="ud-hero-burst" /><div className="ud-hero-sky" />

//         <div className="ud-hero-inner">
//           <div>
//             <div className="ud-bread">
//               <Link to="/">Home</Link>
//               <ChevronRight size={12} className="ud-bread-sep" />
//               <Link to="/products">Products</Link>
//               <ChevronRight size={12} className="ud-bread-sep" />
//               <span className="ud-bread-active">Ultrasound Testing Devices</span>
//             </div>

//             <div className="ud-badge"><Zap size={11} /> SONOTEC, Germany</div>

//             <h1 style={{ fontSize:"clamp(26px,4.5vw,54px)", fontWeight:900, color:"#1e293b", lineHeight:1.05, marginBottom:18, maxWidth:560 }}>
//               Ultrasound Testing{" "}
//               <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
//                 Devices
//               </span>
//             </h1>

//             <p style={{ fontSize:"clamp(14px,1.4vw,17px)", color:"#475569", lineHeight:1.75, marginBottom:32, maxWidth:500 }}>
//               Professional-grade ultrasound, thermal imaging and visual inspection instruments from{" "}
//               <strong style={{ color:"#b45309" }}>SONOTEC, Germany</strong> — engineered for industrial condition monitoring, leak detection, electrical PD testing and predictive maintenance.
//             </p>

//             <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:32 }}>
//               {heroStats.map((s) => (
//                 <div key={s.label} className="ud-hero-stat">
//                   <div className="ud-hero-stat-num">{s.num}</div>
//                   <div className="ud-hero-stat-label">{s.label}</div>
//                 </div>
//               ))}
//             </div>

//             <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
//               <Link to="/contact" className="ud-btn-primary">Request a Demo <ArrowRight size={16} /></Link>
//             </div>
//           </div>

//           <HeroSlider />
//         </div>
//       </section>

//       {/* ════════ INTRO ════════ */}
//       <section className="ud-intro">
//         <div ref={refIntro} className="fu" style={{ maxWidth:860, margin:"0 auto", textAlign:"center" }}>
//           <div className="ud-section-badge" style={{ margin:"0 auto 16px" }}><Star size={11} /> Why SONOTEC</div>
//           <h2 style={{ fontSize:"clamp(20px,3vw,32px)", fontWeight:700, color:"#0f1117", marginBottom:16 }}>
//             The Industry Standard in Ultrasound Inspection Technology
//           </h2>
//           <p style={{ fontSize:15, color:"#64748b", lineHeight:1.8, marginBottom:36 }}>
//             SONOTEC instruments combine airborne ultrasound detection, contact measurement, thermal imaging and visual inspection into a portfolio of portable field instruments — trusted by maintenance professionals across power generation, manufacturing, marine and process industries worldwide.
//           </p>
//           <div ref={refFeatures} className="fu" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12, textAlign:"left" }}>
//             {features.map((f) => (
//               <div key={f} className="ud-feature-card">
//                 <CheckCircle2 size={15} style={{ color:"#f59e0b", flexShrink:0, marginTop:2 }} />
//                 <span style={{ fontSize:13.5, color:"#334155", fontWeight:500, lineHeight:1.5 }}>{f}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ════════ PRODUCT GRID ════════ */}
//       <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding:"80px 28px" }}>
//         <div style={{ maxWidth:1280, margin:"0 auto" }}>
//           <div ref={refGridHead} className="fu" style={{ textAlign:"center", marginBottom:52 }}>
//             <div className="ud-section-badge" style={{ margin:"0 auto 12px" }}><Zap size={11} /> Product Range</div>
//             <h2 style={{ fontSize:"clamp(22px,3vw,36px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>Our Ultrasound Testing Device Range</h2>
//             <p style={{ fontSize:15, color:"#64748b", maxWidth:500, margin:"0 auto" }}>Six specialist instruments covering leak detection, bearing analysis, electrical PD testing, tightness assessment, thermal imaging and internal visual inspection.</p>
//           </div>
//           <div className="ud-grid">
//             {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default UltrasonicTestingDevices;





import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ChevronLeft, Zap, ArrowRight, CheckCircle2, Star,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

import sonaphoneIII    from "@/assets/products/sonaphone-iii.jpg";
import sonascreen2     from "@/assets/products/sonascreen-2.jpg";
import sonaphonePocket from "@/assets/products/sonaphone-pocket.jpg";
import sonaphoneT      from "@/assets/products/sonaphone-t-sonosphere.jpg";
import ultrasonic      from "@/assets/ultrasonictesting.png";

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  .ud-page { font-family:'Roboto',sans-serif; color:#1e293b; }
  .ud-page * { box-sizing:border-box; }

  /* ── Fade up ── */
  .fu { opacity:0; transform:translateY(22px); transition:opacity 0.55s ease,transform 0.55s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }

  /* ════ HERO ════ */
  .ud-hero { position:relative; overflow:hidden; min-height:60vh; display:flex; align-items:center; }
  .ud-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
  .ud-hero-wash  { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,0.90) 0%,rgba(224,242,254,0.82) 55%,rgba(255,251,235,0.90) 100%); }
  .ud-hero-dots  { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .ud-hero-burst { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,0.26) 0%,rgba(251,191,36,0.09) 40%,transparent 70%); top:-15%; left:-8%; }
  .ud-hero-sky   { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.20) 0%,rgba(56,189,248,0.06) 45%,transparent 70%); bottom:-15%; right:-5%; }

  .ud-hero-inner {
    position:relative; max-width:1280px; margin:0 auto;
    padding:80px 28px 72px; width:100%;
    display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center;
  }
  @media(max-width:900px){ .ud-hero-inner{ grid-template-columns:1fr; } }

  /* ════ HERO SLIDER ════ */
  .ud-slider {
    position:relative;
    background:rgba(255,255,255,0.88);
    border:1px solid rgba(245,158,11,0.28);
    border-radius:24px;
    overflow:hidden;
    box-shadow:0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(245,158,11,0.12);
    min-height:340px;
  }
  .ud-slider::before {
    content:''; position:absolute; top:0; left:0; right:0; height:4px;
    background:linear-gradient(90deg,#f59e0b,#ea580c); z-index:2;
  }

  .ud-slider-track { display:flex; transition:transform 0.55s cubic-bezier(0.45,0,0.15,1); will-change:transform; }

  .ud-slide { min-width:100%; display:flex; flex-direction:column; align-items:center; padding:28px 28px 24px; gap:16px; user-select:none; }

  .ud-slide-img {
    width:100%; height:200px;
    display:flex; align-items:center; justify-content:center;
    background:linear-gradient(135deg,#fffbeb,#fef3c7);
    border-radius:16px; overflow:hidden;
    border:1px solid rgba(245,158,11,0.15);
  }
  /* ── No blur on slide images ── */
  .ud-slide-img img { width:100%; height:100%; object-fit:contain; padding:18px; filter:none; }

  .ud-slide-body { width:100%; text-align:center; }
  .ud-slide-make { font-size:10px; font-weight:700; color:#b45309; text-transform:uppercase; letter-spacing:0.09em; margin-bottom:4px; }
  .ud-slide-name { font-size:16px; font-weight:800; color:#0f1117; line-height:1.2; margin-bottom:6px; }
  .ud-slide-desc { font-size:12.5px; color:#64748b; line-height:1.6; }

  .ud-slider-arrow {
    position:absolute; top:50%; transform:translateY(-50%); z-index:3;
    width:36px; height:36px; border-radius:50%;
    background:rgba(255,255,255,0.92); border:1px solid rgba(245,158,11,0.30);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; color:#b45309;
    box-shadow:0 2px 10px rgba(0,0,0,0.10);
    transition:background 0.15s,box-shadow 0.15s,transform 0.15s;
  }
  .ud-slider-arrow:hover { background:#fffbeb; box-shadow:0 4px 18px rgba(245,158,11,0.22); transform:translateY(-50%) scale(1.08); }
  .ud-slider-arrow.prev { left:10px; }
  .ud-slider-arrow.next { right:10px; }

  .ud-slider-dots { display:flex; gap:7px; justify-content:center; padding:0 0 18px; position:absolute; bottom:0; left:0; right:0; z-index:3; }
  .ud-slider-dot { width:7px; height:7px; border-radius:50%; background:rgba(245,158,11,0.25); border:none; padding:0; cursor:pointer; transition:background 0.2s,transform 0.2s,width 0.25s; }
  .ud-slider-dot.active { background:#f59e0b; transform:scale(1.2); width:20px; border-radius:4px; }

  .ud-slider-progress { position:absolute; bottom:0; left:0; height:3px; z-index:4; background:linear-gradient(90deg,#f59e0b,#ea580c); transition:width 0.1s linear; }

  /* ── Most Selling badges ── */
  .ud-most-selling { position:absolute; top:12px; left:12px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:10px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; padding:4px 10px; border-radius:999px; display:inline-flex; align-items:center; gap:5px; box-shadow:0 2px 10px rgba(245,158,11,0.45); z-index:2; }
  .ud-most-selling::before { content:'★'; font-size:9px; }
  .ud-slide-best { display:inline-flex; align-items:center; gap:4px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:9px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; padding:3px 9px; border-radius:999px; margin-bottom:6px; }

  /* ── Breadcrumb ── */
  .ud-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:24px; }
  .ud-bread a { font-size:12.5px; color:#64748b; text-decoration:none; transition:color 0.15s; } .ud-bread a:hover { color:#f59e0b; }
  .ud-bread-sep { color:#cbd5e1; }
  .ud-bread-active { font-size:12.5px; color:#334155; font-weight:500; }

  /* ── Badges ── */
  .ud-badge         { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:20px; }
  .ud-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }

  /* ── Hero stat ── */
  .ud-hero-stat { background:rgba(255,255,255,0.82); border:1px solid rgba(245,158,11,0.28); border-radius:14px; padding:14px 18px; backdrop-filter:blur(10px); box-shadow:0 2px 12px rgba(0,0,0,0.06); }
  .ud-hero-stat-num   { font-size:24px; font-weight:900; color:#ea580c; line-height:1; }
  .ud-hero-stat-label { font-size:11px; color:#64748b; font-weight:500; margin-top:3px; }

  /* ── Intro ── */
  .ud-intro { background:linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%); padding:72px 28px; }

  /* ── Feature card ── */
  .ud-feature-card { display:flex; align-items:flex-start; gap:10px; background:#fff; border:1px solid #eef0f4; border-radius:12px; padding:14px 16px; transition:border-color 0.2s,box-shadow 0.2s,transform 0.2s; }
  .ud-feature-card:hover { border-color:rgba(245,158,11,0.30); box-shadow:0 4px 16px rgba(0,0,0,0.07); transform:translateY(-2px); }

  /* ── Product grid ── */
  .ud-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:28px; }
  @media(max-width:768px){ .ud-grid{ grid-template-columns:1fr; } }

  /* ── Product card ── */
  .ud-card { background:#fff; border:1px solid #eef0f4; border-radius:20px; overflow:hidden; display:flex; flex-direction:column; transition:box-shadow 0.25s,transform 0.25s,border-color 0.25s; position:relative; }
  .ud-card::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(90deg,#f59e0b,#ea580c); opacity:0; transition:opacity 0.25s; }
  .ud-card:hover { box-shadow:0 20px 56px rgba(0,0,0,0.11); transform:translateY(-7px); border-color:rgba(245,158,11,0.32); }
  .ud-card:hover::before { opacity:1; }

  /* ── Product image — NO blur, clean display at all times ── */
  .ud-card-img {
    width:100%; height:240px;
    background:linear-gradient(135deg,#fffbeb,#fef3c7);
    display:flex; align-items:center; justify-content:center;
    overflow:hidden; border-bottom:1px solid #eef0f4; position:relative;
  }
  .ud-card-img img {
    width:100%; height:100%;
    object-fit:contain; padding:20px;
    filter:none;                          /* ← no blur ever */
    transition:transform 0.4s ease;
  }
  .ud-card:hover .ud-card-img img { transform:scale(1.07); }
  .ud-card-img-placeholder { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; color:#94a3b8; font-size:13px; width:100%; height:100%; background:linear-gradient(135deg,#fef3c7,#fffbeb); }

  .ud-make-tag { position:absolute; top:12px; right:12px; background:rgba(255,255,255,0.92); border:1px solid rgba(245,158,11,0.35); color:#b45309; font-size:10px; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; padding:4px 10px; border-radius:999px; backdrop-filter:blur(8px); }

  /* ── Shimmer: hidden by default, only flashes in on hover ── */
  .ud-shimmer {
    position:absolute; inset:0; pointer-events:none;
    background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.45) 50%,transparent 100%);
    z-index:1;
    opacity:0;                            /* ← invisible until hover triggers animation */
    transform:translateX(-100%) skewX(-15deg);
  }
  @keyframes ud-shimmer { 0%{transform:translateX(-100%) skewX(-15deg);opacity:1;} 100%{transform:translateX(250%) skewX(-15deg);opacity:0;} }
  .ud-card:hover .ud-shimmer { animation:ud-shimmer 0.8s ease forwards; }

  .ud-card-body { padding:24px; flex:1; display:flex; flex-direction:column; gap:14px; }
  .ud-card-title { font-size:18px; font-weight:800; color:#0f1117; line-height:1.2; }
  .ud-card-desc  { font-size:13.5px; color:#64748b; line-height:1.7; }

  .ud-apps-label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#b45309; margin-bottom:6px; }
  .ud-apps-list  { display:flex; flex-wrap:wrap; gap:6px; }
  .ud-app-pill   { display:inline-flex; align-items:center; gap:5px; background:#fffbeb; border:1px solid rgba(245,158,11,0.22); border-radius:8px; padding:4px 10px; font-size:12px; color:#92400e; font-weight:500; }
  .ud-app-dot    { width:5px; height:5px; border-radius:50%; background:#f59e0b; flex-shrink:0; }

  .ud-card-cta { display:inline-flex; align-items:center; gap:7px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:13px; font-weight:700; padding:11px 20px; border-radius:10px; text-decoration:none; margin-top:auto; border:none; cursor:pointer; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 16px rgba(245,158,11,0.32); width:fit-content; }
  .ud-card-cta:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(245,158,11,0.48); }

  /* ── Highlight ── */
  .ud-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:20px; padding:32px 36px; color:#fff; box-shadow:0 12px 40px rgba(245,158,11,0.32); position:relative; overflow:hidden; }
  .ud-highlight::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 0%,rgba(255,255,255,0.18) 0%,transparent 60%); pointer-events:none; }

  /* ── Buttons ── */
  .ud-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#ea580c); color:#fff; font-size:15px; font-weight:700; padding:14px 28px; border-radius:12px; text-decoration:none; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 20px rgba(245,158,11,0.38); }
  .ud-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.52); }
  .ud-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:15px; font-weight:500; padding:14px 28px; border-radius:12px; text-decoration:none; border:1px solid rgba(245,158,11,0.25); transition:border-color 0.2s,background 0.2s; }
  .ud-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  /* ── CTA ── */
  .ud-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .ud-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.22) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }
`;

/* ═══════════════════════════════════════════════════════════
   DATA  — Thermal Camera & Borescope removed
═══════════════════════════════════════════════════════════ */
const slides = [
  { img: ultrasonic,      make:"SONOTEC · Germany", name:"SONAPHONE III",            desc:"Advanced portable ultrasound device with data recording, analysis and report generation.", isBest:true  },
  { img: sonascreen2,     make:"SONOTEC · Germany", name:"SONASCREEN 2",             desc:"Acoustic camera with integrated IR thermal imaging for PD detection and leak visualisation." },
  { img: sonaphonePocket, make:"SONOTEC · Germany", name:"SONAPHONE POCKET",         desc:"Compact ultrasound instrument for preventive maintenance and energy saving inspections." },
  { img: sonaphoneT,      make:"SONOTEC · Germany", name:"SONAPHONE-T & SONOSPHERE", desc:"Tightness testing system for enclosed spaces, vessels and cable trench integrity." },
];

const products = [
  {
    id:"sonaphone-iii", name:"SONAPHONE III", make:"SONOTEC · Germany", img:ultrasonic, isBest:true,
    desc:"A portable ultrasound testing device with advanced software for data recording, data analysis and report generation.",
    apps:["Pressure & vacuum leak detection","Bearing analysis & lubrication management","Electrical PD detection","Steam trap testing","Valve pass inspection"],
  },
  {
    id:"sonascreen-2", name:"SONASCREEN 2", make:"SONOTEC · Germany", img:sonascreen2,
    desc:"A portable acoustic camera with IR thermal imaging capability and advanced software for effective data analysis and report generation.",
    apps:["HT Electrical partial discharge detection","Substation & transmission line inspection","Compressed air leak detection","Energy saving evaluation", "IR Feature"],
  },
  {
    id:"sonaphone-pocket", name:"SONAPHONE POCKET", make:"SONOTEC · Germany", img:sonaphonePocket,
    desc:"A basic ultrasound testing device for industrial preventive maintenance and energy saving.",
    apps:["Pressure & vacuum leak detection","Bearing analysis & lubrication management","Electrical PD detection","Steam trap testing"],
  },
  {
    id:"sonaphone-t", name:"SONAPHONE-T & SONOSPHERE", make:"SONOTEC · Germany", img:sonaphoneT,
    desc:"Portable ultrasound transmitter for tightness testing and integrity assessment of enclosed spaces.",
    apps:["Leak testing of rooms & tanks","Vessel & clean room tightness","Cable trench inspection","Sealed enclosure assessment"],
  },
];

const features = [
  "Trusted SONOTEC Germany technology",
  "Non-contact & non-destructive inspection",
  "Advanced data recording & report generation",
  "Thermal imaging + ultrasound combined",
  "Wide range of industrial applications",
  "Portable field-ready instruments",
];

const heroStats = [
  { num:"4",       label:"Instruments"      },
  { num:"30+",     label:"Applications"     },
  { num:"SONOTEC", label:"Germany Partner"  },
];

/* ─── useFU ─── */
const useFU = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("vis"), delay); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

/* ─── Product Image — no blur, clean at all times ─── */
const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="ud-card-img-placeholder">
      <Zap size={32} color="#f59e0b"/>
      <span>{alt}</span>
    </div>
  );
  return (
    <>
      <img src={src} alt={alt} onError={() => setFailed(true)} />
      {/* shimmer is opacity:0 by default; CSS animates it only on card hover */}
      <div className="ud-shimmer"/>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════
   HERO SLIDER  — interval increased to 6 s for comfortable reading
═══════════════════════════════════════════════════════════ */
const INTERVAL = 6000; // ← was 3000 — doubled for better UX

const HeroSlider = () => {
  const [active,   setActive]   = useState(0);
  const [paused,   setPaused]   = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = slides.length;

  const goTo = useCallback((idx: number) => { setActive(idx); setProgress(0); }, []);
  const next = useCallback(() => goTo((active + 1) % total), [active, goTo, total]);
  const prev = useCallback(() => goTo((active - 1 + total) % total), [active, goTo, total]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => setActive(a => (a + 1) % total), INTERVAL);
    return () => clearInterval(timerRef.current!);
  }, [paused, total]);

  useEffect(() => {
    if (paused) { setProgress(0); return; }
    setProgress(0);
    const step = 100 / (INTERVAL / 80);
    progRef.current = setInterval(() => setProgress(p => Math.min(p + step, 100)), 80);
    return () => clearInterval(progRef.current!);
  }, [active, paused]);

  return (
    <div className="ud-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="ud-slider-track" style={{ transform:`translateX(-${active * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={s.name} className="ud-slide" aria-hidden={i !== active}>
            <div className="ud-slide-img">
              <img
                src={s.img} alt={s.name}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity="0"; }}
              />
            </div>
            <div className="ud-slide-body">
              <div className="ud-slide-make">{s.make}</div>
              {s.isBest && <div className="ud-slide-best">★ Most Selling</div>}
              <div className="ud-slide-name">{s.name}</div>
              <div className="ud-slide-desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="ud-slider-arrow prev" onClick={prev} aria-label="Previous product"><ChevronLeft size={16}/></button>
      <button className="ud-slider-arrow next" onClick={next} aria-label="Next product"><ChevronRight size={16}/></button>

      <div className="ud-slider-dots">
        {slides.map((_, i) => (
          <button key={i} className={`ud-slider-dot ${i === active ? "active" : ""}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}/>
        ))}
      </div>

      {!paused && <div className="ud-slider-progress" style={{ width:`${progress}%` }}/>}
    </div>
  );
};

/* ─── Product Card ─── */
const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="ud-card fu">
      <div className="ud-card-img">
        <ProductImage src={product.img} alt={product.name}/>
        {product.isBest && <span className="ud-most-selling">Most Selling</span>}
        <span className="ud-make-tag">{product.make}</span>
      </div>
      <div className="ud-card-body">
        <div className="ud-card-title">{product.name}</div>
        <p className="ud-card-desc">{product.desc}</p>
        <div>
          <div className="ud-apps-label">Applications</div>
          <div className="ud-apps-list">
            {product.apps.map(a => (
              <span key={a} className="ud-app-pill"><span className="ud-app-dot"/>{a}</span>
            ))}
          </div>
        </div>
        <Link to="/contact" className="ud-card-cta">Enquire <ArrowRight size={14}/></Link>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const UltrasonicTestingDevices = () => {
  const refIntro    = useFU(0);
  const refFeatures = useFU(100);
  const refGridHead = useFU(0);

  return (
    <div className="ud-page">
      <style>{css}</style>

      {/* ════ HERO ════ */}
      <section className="ud-hero">
        <img src={heroBg} alt="" className="ud-hero-photo" aria-hidden="true"/>
        <div className="ud-hero-wash"/><div className="ud-hero-dots"/>
        <div className="ud-hero-burst"/><div className="ud-hero-sky"/>

        <div className="ud-hero-inner">
          <div>
            <div className="ud-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} className="ud-bread-sep"/>
              <Link to="/products">Products</Link>
              <ChevronRight size={12} className="ud-bread-sep"/>
              <span className="ud-bread-active">Ultrasound Testing Devices</span>
            </div>

            <div className="ud-badge"><Zap size={11}/> SONOTEC, Germany</div>

            <h1 style={{ fontSize:"clamp(26px,4.5vw,54px)", fontWeight:900, color:"#1e293b", lineHeight:1.05, marginBottom:18, maxWidth:560 }}>
              Ultrasound Testing{" "}
              <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Devices
              </span>
            </h1>

            <p style={{ fontSize:"clamp(14px,1.4vw,17px)", color:"#475569", lineHeight:1.75, marginBottom:32, maxWidth:500 }}>
              Professional-grade ultrasound and acoustic inspection instruments from{" "}
              <strong style={{ color:"#b45309" }}>SONOTEC, Germany</strong> — engineered for industrial condition monitoring, leak detection, electrical PD testing and predictive maintenance.
            </p>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:32 }}>
              {heroStats.map(s => (
                <div key={s.label} className="ud-hero-stat">
                  <div className="ud-hero-stat-num">{s.num}</div>
                  <div className="ud-hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Link to="/contact" className="ud-btn-primary">Request a Demo <ArrowRight size={16}/></Link>
            </div>
          </div>

          <HeroSlider/>
        </div>
      </section>

      {/* ════ INTRO ════ */}
      <section className="ud-intro">
        <div ref={refIntro} className="fu" style={{ maxWidth:860, margin:"0 auto", textAlign:"center" }}>
          <div className="ud-section-badge" style={{ margin:"0 auto 16px" }}><Star size={11}/> Why SONOTEC</div>
          <h2 style={{ fontSize:"clamp(20px,3vw,32px)", fontWeight:700, color:"#0f1117", marginBottom:16 }}>
            The Industry Standard in Ultrasound Inspection Technology
          </h2>
          <p style={{ fontSize:15, color:"#64748b", lineHeight:1.8, marginBottom:36 }}>
            SONOTEC instruments combine airborne ultrasound detection, contact measurement, thermal imaging and visual inspection into a portfolio of portable field instruments — trusted by maintenance professionals across power generation, manufacturing, marine and process industries worldwide.
          </p>
          <div ref={refFeatures} className="fu" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12, textAlign:"left" }}>
            {features.map(f => (
              <div key={f} className="ud-feature-card">
                <CheckCircle2 size={15} style={{ color:"#f59e0b", flexShrink:0, marginTop:2 }}/>
                <span style={{ fontSize:13.5, color:"#334155", fontWeight:500, lineHeight:1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PRODUCT GRID ════ */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding:"80px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refGridHead} className="fu" style={{ textAlign:"center", marginBottom:52 }}>
            <div className="ud-section-badge" style={{ margin:"0 auto 12px" }}><Zap size={11}/> Product Range</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,36px)", fontWeight:800, color:"#0f1117", marginBottom:12 }}>Our Ultrasound Testing Device Range</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:500, margin:"0 auto" }}>
              Four specialist instruments covering leak detection, bearing analysis, electrical PD testing and tightness assessment.
            </p>
          </div>
          <div className="ud-grid">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UltrasonicTestingDevices;