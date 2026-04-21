// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, Zap, BarChart3, Shield, Wrench } from "lucide-react";
// import "./Index.css";
// import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, easeOut } from "framer-motion";
// import { useEffect, useState, useRef, useCallback } from "react";
// import InternationalPartnersSlider from "@/components/InternationalPartnersSlider";
// import OurCustomersSlider from "@/components/OurCustomerSlider";

// import bearingImg from "@/assets/Bearing-Inspection.jpg";
// import thermalImg from "@/assets/gallery1.jpg";
// import substationImg from "@/assets/gallery5.jpg";

// /* ═══════════════════════════════════════
//    DATA
// ═══════════════════════════════════════ */
// const services = [
//   { icon: Zap, title: "Energy Optimization", desc: "Compressed air, gas, steam & vacuum leak detection. Steam trap audits and air-tight integrity assessments.", link: "/services/energy-optimization", accent: "#f59e0b" },
//   { icon: BarChart3, title: "Predictive Analytics", desc: "HT/HV electrical partial discharge detection, infrared thermography, and bearing condition assessments.", link: "/services/predictive-analytics", accent: "#ea580c" },
//   { icon: Shield, title: "IIoT-Based CBM (Condition-Based Monitoring with IIoT)", desc: "IIoT monitoring, thermal monitoring, bearing condition monitoring", link: "/products/monitoring-systems", accent: "#f97316" },
//   { icon: Wrench, title: "Training & Certification", desc: "Ultrasound technology training, predictive maintenance certification by Mobius Institute, Australia.", link: "/centre", accent: "#fb923c" },
// ];

// const PRODUCTS = [
//   { slug: "ultrasound-device", label: "Ultra Sound Testing Devices", icon: "🔊", accent: "#f59e0b", desc: "Detect leaks, bearing faults & partial discharge using airborne and structure-borne ultrasound." },
//   { slug: "monitoring-systems", label: "Monitoring Systems", icon: "📡", accent: "#ea580c", desc: "24/7 real-time condition monitoring for critical rotating assets and industrial infrastructure." },
//   { slug: "scaling-devices", label: "Anti-Scaling Devices", icon: "💧", accent: "#0ea5e9", desc: "Chemical-free electromagnetic scale prevention for pipelines, boilers and heat exchangers." },
//   { slug: "thermal-cameras", label: "Thermal Cameras", icon: "🌡️", accent: "#f97316", desc: "High-resolution IR cameras with ±0.1 °C sensitivity for electrical & mechanical inspections." },
//   { slug: "automated-thermal-monitoring", label: "Thermal Hotspot Monitoring", icon: "🔥", accent: "#dc2626", desc: "Fixed online thermal cameras with AI analytics for automated 24/7 hotspot alerts." },
// ];

// // Triple-duplicate for seamless infinite loop
// const TRACK = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

// interface Chapter {
//   id: number; num: string; img: string; overlay: string;
//   service: string; title: string; desc: string; tag: string;
//   chipIcon: string; chipLabel: string; chipVal: string; chipBg: string;
// }

// const CHAPTERS: Chapter[] = [
//   { id: 0, num: "01", img: bearingImg, overlay: "rgba(245,158,11,0.55)", service: "Predictive Analytics", title: "Bearing Condition Assessment", desc: "Ultrasound reads early bearing distress — catching failure weeks before it costs you.", tag: "Ultrasound", chipIcon: "🔊", chipLabel: "Early detection", chipVal: "Weeks in advance", chipBg: "rgba(245,158,11,0.10)" },
//   { id: 1, num: "02", img: thermalImg, overlay: "rgba(234,88,12,0.55)", service: "Infrared Thermography", title: "Electrical Hotspot Detection", desc: "Thermal cameras find hidden faults in LT/HT panels before they become catastrophes.", tag: "Thermography", chipIcon: "🌡️", chipLabel: "Accuracy", chipVal: "±0.1°C resolution", chipBg: "rgba(234,88,12,0.10)" },
//   { id: 2, num: "03", img: substationImg, overlay: "rgba(56,189,248,0.45)", service: "IIoT-Based CBM (Condition-Based Monitoring with IIoT)", title: "HT Switchyard Monitoring", desc: "Live partial discharge detection at high-voltage substations — safe, accurate, on-site.", tag: "Automation", chipIcon: "⚡", chipLabel: "Live monitoring", chipVal: "Real-time alerts", chipBg: "rgba(56,189,248,0.10)" },
// ];

// const STATS = [
//   { value: 35, suffix: "+", label: "Industrial Clients", icon: "🏭" },
//   { value: 3, suffix: "", label: "Global Partners", icon: "🌍" },
//   { value: 500, suffix: "+", label: "Projects Delivered", icon: "✅" },
//   { value: 15, suffix: "+", label: "Years Experience", icon: "🏆" },
// ];

// const PROGRESS_VALS = ["33%", "66%", "100%"];

// /* ═══════════════════════════════════════
//    ANIMATED COUNTER
// ═══════════════════════════════════════ */
// const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
//   const [display, setDisplay] = useState(0);
//   const mv = useMotionValue(0);
//   const spring = useSpring(mv, { stiffness: 60, damping: 18 });
//   useEffect(() => { const t = setTimeout(() => mv.set(value), 700); return () => clearTimeout(t); }, [value, mv]);
//   useEffect(() => spring.on("change", v => setDisplay(Math.floor(v))), [spring]);
//   return <span>{display.toLocaleString()}{suffix}</span>;
// };

// /* ═══════════════════════════════════════
//    3D TILT CARD
// ═══════════════════════════════════════ */
// const Card3D = ({ children, className = "", style = {} }: {
//   children: React.ReactNode; className?: string; style?: React.CSSProperties;
// }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const x = useMotionValue(0); const y = useMotionValue(0);
//   const sx = useSpring(x, { stiffness: 200, damping: 22 });
//   const sy = useSpring(y, { stiffness: 200, damping: 22 });
//   const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
//   const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
//   const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const r = ref.current!.getBoundingClientRect();
//     x.set((e.clientX - r.left) / r.width - 0.5);
//     y.set((e.clientY - r.top) / r.height - 0.5);
//   };
//   return (
//     <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
//       style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800, ...style }} className={className}>
//       {children}
//     </motion.div>
//   );
// };

// /* ═══════════════════════════════════════
//    MAGNETIC BUTTON
// ═══════════════════════════════════════ */
// const MagneticBtn = ({ children, to, className = "", style = {} }: {
//   children: React.ReactNode; to: string; className?: string; style?: React.CSSProperties;
// }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const x = useMotionValue(0); const y = useMotionValue(0);
//   const sx = useSpring(x, { stiffness: 300, damping: 20 });
//   const sy = useSpring(y, { stiffness: 300, damping: 20 });
//   const onMove = (e: React.MouseEvent) => {
//     const r = ref.current!.getBoundingClientRect();
//     x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
//     y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
//   };
//   return (
//     <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy, display: "inline-block" }}>
//       <Link to={to}><Button className={className} style={style}>{children}</Button></Link>
//     </motion.div>
//   );
// };

// /* ═══════════════════════════════════════
//    FLOATING PARTICLE
// ═══════════════════════════════════════ */
// const Particle = ({ delay, size, x, y }: { delay: number; size: number; x: number; y: number }) => (
//   <motion.div
//     initial={{ opacity: 0, scale: 0 }}
//     animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0], y: [0, -80], x: [0, (Math.random() - 0.5) * 40] }}
//     transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, repeatDelay: Math.random() * 4 }}
//     style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: size, height: size, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.8), rgba(234,88,12,0.4))", pointerEvents: "none" }}
//   />
// );

// /* ═══════════════════════════════════════
//    CHAPTER CARD
// ═══════════════════════════════════════ */
// type CardState = "active" | "back1" | "back2";
// const cardVariants = {
//   active: { rotate: -1.5, y: -10, scale: 1.03, zIndex: 3, transition: { type: "spring" as const, stiffness: 220, damping: 22 } },
//   back1: { rotate: 2, y: 35, scale: 0.97, zIndex: 2, transition: { type: "spring" as const, stiffness: 220, damping: 22 } },
//   back2: { rotate: 5, y: 70, scale: 0.94, zIndex: 1, transition: { type: "spring" as const, stiffness: 220, damping: 22 } },
// };
// const slotOffsets = [{ left: 0, top: 0 }, { left: 22, top: 30 }, { left: 44, top: 60 }];

// const ChapterCard = ({ chapter, state, slotIndex, onClick }: {
//   chapter: Chapter; state: CardState; slotIndex: number; onClick: () => void;
// }) => (
//   <motion.div onClick={onClick} className="absolute w-[85vw] max-w-[300px] rounded-3xl overflow-hidden cursor-pointer"
//     style={{ left: slotOffsets[slotIndex].left, top: slotOffsets[slotIndex].top, boxShadow: "0 20px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07)" }}
//     variants={cardVariants} animate={state} whileHover={state === "active" ? { scale: 1.05 } : {}}>
//     <div className="relative overflow-hidden" style={{ height: 210 }}>
//       <img src={chapter.img} alt={chapter.title} className="absolute inset-0 w-full h-full object-cover" />
//       <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 50%, ${chapter.overlay} 100%)` }} />
//       <div className="absolute bottom-3 left-3 text-[10px] font-bold tracking-widest uppercase text-white px-3 py-1.5 rounded-full"
//         style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}>
//         Chapter {chapter.num}
//       </div>
//     </div>
//     <div className="bg-white px-5 py-4">
//       <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#ea580c" }}>{chapter.service}</p>
//       <h3 className="font-heading font-bold text-[15px] text-slate-800 leading-snug mb-1.5">{chapter.title}</h3>
//       <p className="text-[12px] text-slate-500 leading-relaxed">{chapter.desc}</p>
//     </div>
//   </motion.div>
// );

// /* ═══════════════════════════════════════
//    FLOATING CHIP
// ═══════════════════════════════════════ */
// const FloatChip = ({ icon, label, value, bg, className }: {
//   icon: string; label: string; value: string; bg: string; className: string;
// }) => (
//   <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
//     className={`absolute z-10 flex items-center gap-2 px-3 py-2.5 rounded-2xl pointer-events-none ${className}`}
//     style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
//     <div className="w-7 h-7 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{ background: bg }}>{icon}</div>
//     <div>
//       <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
//       <p className="text-[13px] font-bold text-slate-800 leading-none mt-0.5 font-heading">{value}</p>
//     </div>
//   </motion.div>
// );

// /* ═══════════════════════════════════════
//    RELIABILITY BAR
// ═══════════════════════════════════════ */
// const ReliabilityBar = () => {
//   const items = [
//     { label: "Uptime Improvement", pct: 94 },
//     { label: "Fault Detection Rate", pct: 98 },
//     { label: "Cost Reduction", pct: 70 },
//   ];
//   return (
//     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}
//       className="mt-8 p-5 rounded-2xl border border-amber-100" style={{ background: "rgba(255,251,235,0.85)", backdropFilter: "blur(10px)" }}>
//       <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-4">Industrial Reliability Impact</p>
//       <div className="flex flex-col gap-3">
//         {items.map((item, i) => (
//           <div key={item.label}>
//             <div className="flex justify-between mb-1">
//               <span className="text-[11px] font-medium text-slate-600">{item.label}</span>
//               <span className="text-[11px] font-bold text-orange-600">{item.pct}%</span>
//             </div>
//             <div className="h-1.5 rounded-full bg-amber-100 overflow-hidden">
//               <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #f59e0b, #ea580c)" }}
//                 initial={{ width: 0 }} animate={{ width: `${item.pct}%` }}
//                 transition={{ delay: 1.1 + i * 0.15, duration: 1.2, ease: "easeOut" }} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// /* ═══════════════════════════════════════
//    PRODUCTS AUTO-SLIDER
//    — single row, infinite marquee, pauses on hover
// ═══════════════════════════════════════ */
// const CARD_W = 260;  // px  — card width
// const CARD_GAP = 20;   // px  — gap between cards
// const STEP = CARD_W + CARD_GAP;
// const ONE_SET = PRODUCTS.length * STEP; // width of one full set

// const ProductsSlider = () => {
//   const [offset, setOffset] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const rafRef = useRef<number>();
//   const SPEED = 0.55; // px per frame

//   useEffect(() => {
//     const tick = () => {
//       if (!paused) {
//         setOffset(prev => {
//           const next = prev + SPEED;
//           return next >= ONE_SET ? next - ONE_SET : next;
//         });
//       }
//       rafRef.current = requestAnimationFrame(tick);
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(rafRef.current!);
//   }, [paused]);

//   return (
//     <div
//       className="relative overflow-hidden"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       style={{
//         WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
//         maskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
//       }}
//     >
//       {/* ── track ── */}
//       <div
//         className="flex"
//         style={{
//           gap: CARD_GAP,
//           width: TRACK.length * STEP,
//           transform: `translateX(-${offset}px)`,
//           willChange: "transform",
//         }}
//       >
//         {TRACK.map((p, i) => (
//           <Link
//             key={`${p.slug}-${i}`}
//             to={`/products/${p.slug}`}
//             className="flex-shrink-0 group"
//             style={{ width: "85vw", maxWidth: CARD_W }}
//           >
//             <motion.div
//               whileHover={{ y: -8, scale: 1.03 }}
//               transition={{ type: "spring", stiffness: 280, damping: 20 }}
//               className="relative bg-white rounded-2xl overflow-hidden flex flex-col"
//               style={{
//                 height: 220,
//                 boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
//                 border: "1px solid rgba(203,213,225,0.5)",
//               }}
//             >
//               {/* top colour bar */}
//               <div className="h-[3px] w-full flex-shrink-0"
//                 style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent}44)` }} />

//               <div className="px-5 py-5 flex flex-col gap-3 flex-1">
//                 {/* icon */}
//                 <motion.div
//                   whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
//                   transition={{ duration: 0.45 }}
//                   className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
//                   style={{ background: `${p.accent}18` }}
//                 >
//                   {p.icon}
//                 </motion.div>

//                 {/* text */}
//                 <div className="flex-1 min-h-0">
//                   <h3 className="font-bold text-[13px] text-slate-800 leading-snug mb-1.5 group-hover:text-slate-900 transition-colors">
//                     {p.label}
//                   </h3>
//                   <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{p.desc}</p>
//                 </div>

//                 {/* cta */}
//                 <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
//                   style={{ color: p.accent }}>
//                   Learn More
//                   <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
//                 </div>
//               </div>
//             </motion.div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════
//    PAGE
// ═══════════════════════════════════════ */
// export default function Index() {
//   const [activeChapter, setActiveChapter] = useState(0);
//   const autoRef = useRef<ReturnType<typeof setTimeout>>();

//   const activateCard = useCallback((idx: number) => {
//     setActiveChapter(idx);
//     clearTimeout(autoRef.current);
//     autoRef.current = setTimeout(() => activateCard((idx + 1) % 3), 3800);
//   }, []);

//   useEffect(() => {
//     autoRef.current = setTimeout(() => activateCard(1), 3800);
//     return () => clearTimeout(autoRef.current);
//   }, [activateCard]);

//   const particles = Array.from({ length: 18 }, (_, i) => ({
//     id: i, delay: i * 0.4, size: 4 + Math.random() * 8,
//     x: 10 + Math.random() * 80, y: 20 + Math.random() * 60,
//   }));

//   const cardSlots = CHAPTERS.map(ch => {
//     const diff = (ch.id - activeChapter + 3) % 3;
//     return { chapter: ch, state: (diff === 0 ? "active" : diff === 1 ? "back1" : "back2") as CardState, slotIndex: diff };
//   });

//   const currentChip = CHAPTERS[activeChapter];

//   return (
//     <>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700;800&display=swap');`}</style>
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

//         {/* ══════════════════════════════ HERO ══════════════════════════════ */}
//         <section className="relative min-h-screen flex items-center overflow-hidden"
//           style={{ background: "linear-gradient(160deg, #fffbeb 0%, #fff7ed 40%, #f0f9ff 100%)" }}>

//           <motion.div className="absolute pointer-events-none" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity }}
//             style={{ width: 640, height: 640, top: -200, left: -120, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.24) 0%, transparent 70%)" }} />
//           <motion.div className="absolute pointer-events-none" animate={{ scale: [1, 1.14, 1] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }}
//             style={{ width: 420, height: 420, bottom: -80, right: -60, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.16) 0%, transparent 70%)" }} />
//           <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
//             style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)", backgroundSize: "40px 40px" }} />
//           <div className="absolute inset-0 pointer-events-none overflow-hidden">
//             {particles.map(p => <Particle key={p.id} {...p} />)}
//           </div>

//           <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-28">
//             <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

//               {/* LEFT */}
//               <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} initial="hidden" animate="visible">
//                 <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
//                   className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/50 bg-amber-50/90 mb-6 shadow-sm">
//                   <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
//                     className="w-2 h-2 rounded-full bg-amber-400 block" />
//                   <span className="text-amber-700 text-[10px] font-bold tracking-widest uppercase">Industrial Reliability & Predictive Analytics</span>
//                 </motion.div>

//                 <motion.h1
//                   variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }}
//                   className="font-heading font-bold leading-[1.04] tracking-tight mb-4 text-slate-900"
//                   style={{ fontSize: "clamp(1.9rem, 5vw, 3.5rem)", fontFamily: "'Roboto', roboto" }}>
//                   Mahadyuta Technical<br />
//                   <motion.span
//                     animate={{ backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"] }}
//                     transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
//                     style={{ background: "linear-gradient(90deg, #f59e0b, #ea580c, #f97316, #f59e0b)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}>
//                     Solutions
//                   </motion.span>{" "}
//                   <span style={{ color: "#1e293b" }}>Pvt. Ltd.</span>
//                 </motion.h1>

//                 <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="flex items-center gap-3 mb-5">
//                   <div className="h-px flex-1 max-w-[40px]" style={{ background: "linear-gradient(90deg,#f59e0b,transparent)" }} />
//                   <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#ea580c" }}>Reliability · Predictability · Uptime</span>
//                 </motion.div>

//                 <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
//                   className="text-base text-slate-600 mb-6 max-w-lg leading-relaxed">
//                   We detect failures <strong className="text-slate-800 font-semibold">before they happen</strong> — using ultrasound, infrared thermography, and partial discharge analysis to keep your industrial machinery running at peak reliability.
//                 </motion.p>

//                 <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex gap-4 flex-wrap">
//                   <MagneticBtn to="/contact"
//                     className="px-10 py-5 rounded-xl font-bold shadow-lg text-white text-sm"
//                     style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)", boxShadow: "0 8px 32px rgba(245,158,11,0.40)", fontFamily: "'Roboto',roboto" }}>
//                     Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
//                   </MagneticBtn>
//                 </motion.div>

//                 <ReliabilityBar />
//               </motion.div>

//               {/* RIGHT */}
//               <div className="relative flex items-center justify-center py-10 lg:py-0">
//                 <div className="relative w-full max-w-[340px] h-[420px] sm:h-[460px] md:h-[480px] mx-auto">

//                   {/* Progress line */}
//                   <div className="absolute rounded-full left-[-20px] sm:left-[-28px] top-0 w-[2px] h-full bg-gradient-to-b from-amber-200/40 to-orange-300/20">
//                     <motion.div
//                       className="w-full rounded-full bg-gradient-to-b from-amber-400 to-orange-500"
//                       animate={{ height: PROGRESS_VALS[activeChapter] }}
//                       transition={{ duration: 0.6 }}
//                     />
//                   </div>

//                   {/* Cards */}
//                   {cardSlots.map(({ chapter, state, slotIndex }) => (
//                     <ChapterCard
//                       key={chapter.id}
//                       chapter={chapter}
//                       state={state}
//                       slotIndex={slotIndex}
//                       onClick={() => activateCard(chapter.id)}
//                     />
//                   ))}

//                   {/* Dots */}
//                   <div className="absolute flex gap-2 items-center bottom-[-40px] left-1/2 -translate-x-1/2">
//                     {CHAPTERS.map((_, i) => (
//                       <motion.button
//                         key={i}
//                         onClick={() => activateCard(i)}
//                         className="h-2 rounded-full"
//                         animate={{
//                           width: i === activeChapter ? 28 : 8,
//                           background: i === activeChapter ? "#ea580c" : "#cbd5e1",
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Floating chips (hidden on mobile) */}
//                 <FloatChip
//                   icon="📊"
//                   label="Predictive maintenance"
//                   value="ISO 18436 Certified"
//                   bg="rgba(234,88,12,0.10)"
//                   className="hidden sm:flex bottom-10 left-[-50px]"
//                 />

//                 <FloatChip
//                   icon="🏆"
//                   label="Training partner"
//                   value="Mobius Institute, AU"
//                   bg="rgba(245,158,11,0.10)"
//                   className="hidden sm:flex bottom-[-10px] right-[-30px]"
//                 />
//               </div>
//             </div>

//             {/* STATS */}
//             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.7 }}
//               className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">
//               {STATS.map((s, i) => (
//                 <Card3D key={s.label} style={{ borderRadius: 20 }}>
//                   <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1 + i * 0.1 }}
//                     whileHover={{ scale: 1.04 }} className="rounded-2xl p-4 sm:p-5 text-center border shadow-lg select-none"
//                     style={{ background: "rgba(255,255,255,0.84)", borderColor: "rgba(251,191,36,0.30)", boxShadow: "0 8px 32px rgba(245,158,11,0.12), 0 2px 8px rgba(0,0,0,0.06)", transform: "translateZ(12px)" }}>
//                     <div className="text-2xl mb-1">{s.icon}</div>
//                     <p className="text-3xl font-bold mb-0.5" style={{ color: "#ea580c" }}><AnimatedCounter value={s.value} suffix={s.suffix} /></p>
//                     <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{s.label}</p>
//                   </motion.div>
//                 </Card3D>
//               ))}
//             </motion.div>
//           </div>

//           <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10">
//             <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.6), transparent)" }} />
//             <div className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-70" />
//           </motion.div>
//         </section>

//         {/* ══════════════════════════════ SERVICES ══════════════════════════════ */}
//         <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
//           variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
//           className="section-padding" style={{ background: "linear-gradient(160deg, #fafaf9 0%, #f0f9ff 100%)" }}>
//           <div className="container-narrow">
//             <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="text-center mb-16">
//               <span className="inline-block text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">What We Do</span>
//               <h2 className="text-3xl md:text-4xl font-heading font-bold text-amber-700">Our Core Services</h2>
//             </motion.div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
//               {services.map((s, i) => (
//                 <motion.div key={s.title} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
//                   <Card3D style={{ borderRadius: 20, height: "100%" }}>
//                     {/* ── navigates to service page on click ── */}
//                     <Link to={s.link} className="block h-full">
//                       <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 240, damping: 18 }}
//                         className="group bg-white rounded-2xl p-7 shadow-md border border-slate-100 h-full relative overflow-hidden cursor-pointer"
//                         style={{ transform: "translateZ(0)" }}>
//                         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
//                           style={{ background: `radial-gradient(circle at 30% 30%, ${s.accent}18 0%, transparent 65%)` }} />
//                         <div className="absolute top-3 right-4 text-6xl font-black pointer-events-none select-none leading-none" style={{ color: `${s.accent}10`, transform: "translateZ(4px)" }}>0{i + 1}</div>
//                         <motion.div whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }} transition={{ duration: 0.5 }}
//                           className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 relative"
//                           style={{ background: `${s.accent}18`, transform: "translateZ(8px)" }}>
//                           <s.icon className="h-5 w-5" style={{ color: s.accent }} />
//                         </motion.div>
//                         <h3 className="font-heading font-bold text-lg mb-2 text-slate-800 relative" style={{ transform: "translateZ(6px)" }}>{s.title}</h3>
//                         <p className="text-sm text-slate-500 leading-relaxed relative" style={{ transform: "translateZ(4px)" }}>{s.desc}</p>
//                         <motion.div initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }}
//                           className="absolute bottom-0 left-0 right-0 h-[3px] origin-left"
//                           style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />
//                       </motion.div>
//                     </Link>
//                   </Card3D>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.section>

//         {/* ══════════════════════ PARTNERS ══════════════════════ */}
//         <InternationalPartnersSlider />

//         {/* ══════════════════════ CUSTOMERS ══════════════════════ */}
//         <OurCustomersSlider />

//         {/* ══════════════════════════════ PRODUCTS SLIDING ROW ══════════════════════════════ */}
//         <motion.section
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.1 }}
//           transition={{ duration: 0.7 }}
//           className="overflow-hidden"
//           style={{
//             background: "linear-gradient(160deg, #fff7ed 0%, #fffbeb 60%, #f0f9ff 100%)",
//             paddingTop: "5rem",
//             paddingBottom: "5rem",
//           }}
//         >
//           {/* heading */}
//           <div className="text-center mb-12 px-6">
//             <span className="inline-block text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
//               Our Range
//             </span>
//             <h2 className="text-3xl md:text-4xl font-heading font-bold text-amber-700">Our Products</h2>
//             <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
//               Industry-grade instruments and systems — hover to pause, click to explore.
//             </p>
//           </div>

//           {/* slider — full bleed, no horizontal padding */}
//           <ProductsSlider />
//         </motion.section>

//         {/* ══════════════════════ CTA ══════════════════════ */}
//         <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
//           transition={{ duration: 0.8 }} className="section-padding text-center relative overflow-hidden"
//           style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ea580c 100%)" }}>
//           {[120, 240, 360].map((size, i) => (
//             <motion.div key={size} animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.04, 0.08] }}
//               transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2 }}
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white pointer-events-none"
//               style={{ width: size * 3, height: size * 3, opacity: 0.08 }} />
//           ))}
//           <div className="absolute inset-0 pointer-events-none"
//             style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.28) 0%, transparent 65%)" }} />
//           <div className="relative">
//             <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
//               className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 drop-shadow">
//               Ready to Improve Your Industrial Reliability?
//             </motion.h2>
//             <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
//               transition={{ delay: 0.1 }} className="text-white/80 max-w-2xl mx-auto mb-10 text-base md:text-lg">
//               Partner with Mahadyuta for cutting-edge predictive maintenance, energy optimization, and IIoT-Based CBM (Condition-Based 
// Monitoring with IIoT) solutions.
//             </motion.p>
//             <MagneticBtn to="/contact"
//               className="px-14 py-6 rounded-xl font-bold shadow-2xl text-amber-700 bg-white hover:bg-amber-50 text-base"
//               style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}>
//               Contact Us Today <ArrowRight className="ml-2 h-4 w-4" />
//             </MagneticBtn>
//           </div>
//         </motion.section>

//       </motion.div>
//     </>
//   );
// }




import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BarChart3, Shield, Wrench } from "lucide-react";
import "./Index.css";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, easeOut } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import InternationalPartnersSlider from "@/components/InternationalPartnersSlider";
import OurCustomersSlider from "@/components/OurCustomerSlider";

import bearingImg from "@/assets/Bearing-Inspection.jpg";
import thermalImg from "@/assets/gallery1.jpg";
import substationImg from "@/assets/gallery5.jpg";

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const services = [
  { icon: Zap, title: "Energy Optimization", desc: "Compressed air, gas, steam & vacuum leak detection. Steam trap audits and air-tight integrity assessments.", link: "/services/energy-optimization", accent: "#f59e0b" },
  { icon: BarChart3, title: "Predictive Analytics", desc: "HT/HV electrical partial discharge detection, infrared thermography, and bearing condition assessments.", link: "/services/predictive-analytics", accent: "#ea580c" },
  { icon: Shield, title: "IIoT-Based CBM (Condition-Based Monitoring with IIoT)", desc: "IIoT monitoring, thermal monitoring, bearing condition monitoring", link: "/products/monitoring-systems", accent: "#f97316" },
  { icon: Wrench, title: "Training & Certification", desc: "Ultrasound technology training, predictive maintenance certification by Mobius Institute, Australia.", link: "/centre", accent: "#fb923c" },
];

const PRODUCTS = [
  { slug: "ultrasound-device", label: "Ultra Sound Testing Devices", icon: "🔊", accent: "#f59e0b", desc: "Detect leaks, bearing faults & partial discharge using airborne and structure-borne ultrasound." },
  { slug: "monitoring-systems", label: "Monitoring Systems", icon: "📡", accent: "#ea580c", desc: "24/7 real-time condition monitoring for critical rotating assets and industrial infrastructure." },
  { slug: "scaling-devices", label: "Anti-Scaling Devices", icon: "💧", accent: "#0ea5e9", desc: "Chemical-free electromagnetic scale prevention for pipelines, boilers and heat exchangers." },
  { slug: "thermal-cameras", label: "Thermal Cameras", icon: "🌡️", accent: "#f97316", desc: "High-resolution IR cameras with ±0.1 °C sensitivity for electrical & mechanical inspections." },
  { slug: "automated-thermal-monitoring", label: "Thermal Hotspot Monitoring", icon: "🔥", accent: "#dc2626", desc: "Fixed online thermal cameras with AI analytics for automated 24/7 hotspot alerts." },
];

// Triple-duplicate for seamless infinite loop
const TRACK = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

interface Chapter {
  id: number; num: string; img: string; overlay: string;
  service: string; title: string; desc: string; tag: string;
  chipIcon: string; chipLabel: string; chipVal: string; chipBg: string;
  link: string; // ← NEW: navigation target
}

const CHAPTERS: Chapter[] = [
  { id: 0, num: "01", img: bearingImg, overlay: "rgba(245,158,11,0.55)", service: "Predictive Analytics", title: "Bearing Condition Assessment", desc: "Ultrasound reads early bearing distress — catching failure weeks before it costs you.", tag: "Ultrasound", chipIcon: "🔊", chipLabel: "Early detection", chipVal: "Weeks in advance", chipBg: "rgba(245,158,11,0.10)", link: "/services/predictive-analytics" },
  { id: 1, num: "02", img: thermalImg, overlay: "rgba(234,88,12,0.55)", service: "Infrared Thermography", title: "Electrical Hotspot Detection", desc: "Thermal cameras find hidden faults in LT/HT panels before they become catastrophes.", tag: "Thermography", chipIcon: "🌡️", chipLabel: "Accuracy", chipVal: "±0.1°C resolution", chipBg: "rgba(234,88,12,0.10)", link: "/services/infrared-thermography" },
  { id: 2, num: "03", img: substationImg, overlay: "rgba(56,189,248,0.45)", service: "IIoT-Based CBM (Condition-Based Monitoring with IIoT)", title: "HT Switchyard Monitoring", desc: "Live partial discharge detection at high-voltage substations — safe, accurate, on-site.", tag: "Automation", chipIcon: "⚡", chipLabel: "Live monitoring", chipVal: "Real-time alerts", chipBg: "rgba(56,189,248,0.10)", link: "/products/monitoring-systems" },
];

const STATS = [
  { value: 35, suffix: "+", label: "Industrial Clients", icon: "🏭" },
  { value: 3, suffix: "", label: "Global Partners", icon: "🌍" },
  { value: 500, suffix: "+", label: "Projects Delivered", icon: "✅" },
  { value: 15, suffix: "+", label: "Years Experience", icon: "🏆" },
];

const PROGRESS_VALS = ["33%", "66%", "100%"];

/* ═══════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════ */
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  useEffect(() => { const t = setTimeout(() => mv.set(value), 700); return () => clearTimeout(t); }, [value, mv]);
  useEffect(() => spring.on("change", v => setDisplay(Math.floor(v))), [spring]);
  return <span>{display.toLocaleString()}{suffix}</span>;
};

/* ═══════════════════════════════════════
   3D TILT CARD
═══════════════════════════════════════ */
const Card3D = ({ children, className = "", style = {} }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800, ...style }} className={className}>
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════
   MAGNETIC BUTTON
═══════════════════════════════════════ */
const MagneticBtn = ({ children, to, className = "", style = {} }: {
  children: React.ReactNode; to: string; className?: string; style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy, display: "inline-block" }}>
      <Link to={to}><Button className={className} style={style}>{children}</Button></Link>
    </motion.div>
  );
};

/* ═══════════════════════════════════════
   FLOATING PARTICLE
═══════════════════════════════════════ */
const Particle = ({ delay, size, x, y }: { delay: number; size: number; x: number; y: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0], y: [0, -80], x: [0, (Math.random() - 0.5) * 40] }}
    transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, repeatDelay: Math.random() * 4 }}
    style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: size, height: size, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.8), rgba(234,88,12,0.4))", pointerEvents: "none" }}
  />
);

/* ═══════════════════════════════════════
   CHAPTER CARD
   — image area navigates to service page
   — text area cycles the card stack
═══════════════════════════════════════ */
type CardState = "active" | "back1" | "back2";
const cardVariants = {
  active: { rotate: -1.5, y: -10, scale: 1.03, zIndex: 3, transition: { type: "spring" as const, stiffness: 220, damping: 22 } },
  back1: { rotate: 2, y: 35, scale: 0.97, zIndex: 2, transition: { type: "spring" as const, stiffness: 220, damping: 22 } },
  back2: { rotate: 5, y: 70, scale: 0.94, zIndex: 1, transition: { type: "spring" as const, stiffness: 220, damping: 22 } },
};
const slotOffsets = [{ left: 0, top: 0 }, { left: 22, top: 30 }, { left: 44, top: 60 }];

const ChapterCard = ({ chapter, state, slotIndex, onClick }: {
  chapter: Chapter; state: CardState; slotIndex: number; onClick: () => void;
}) => (
  <motion.div
    className="absolute w-[85vw] max-w-[300px] rounded-3xl overflow-hidden"
    style={{
      left: slotOffsets[slotIndex].left,
      top: slotOffsets[slotIndex].top,
      boxShadow: "0 20px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07)",
    }}
    variants={cardVariants}
    animate={state}
    whileHover={state === "active" ? { scale: 1.05 } : {}}
  >
    {/* ── IMAGE AREA — clickable, navigates to service page ── */}
    <Link
      to={chapter.link}
      className="block relative overflow-hidden group/img"
      style={{ height: 210 }}
      onClick={e => {
        // Only navigate if this is the active card; otherwise cycle
        if (state !== "active") {
          e.preventDefault();
          onClick();
        }
      }}
      title={`View ${chapter.title}`}
    >
      <img
        src={chapter.img}
        alt={chapter.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, transparent 50%, ${chapter.overlay} 100%)` }}
      />
      {/* Hover reveal overlay — only shown on active card */}
      {state === "active" && (
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.30)" }}
        >
          <span
            className="flex items-center gap-2 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full"
            style={{ background: "rgba(234,88,12,0.90)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            View Details <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      )}
      <div
        className="absolute bottom-3 left-3 text-[10px] font-bold tracking-widest uppercase text-white px-3 py-1.5 rounded-full"
        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}
      >
        Chapter {chapter.num}
      </div>
    </Link>

    {/* ── TEXT AREA — tap to cycle cards, with explicit "Learn more" link ── */}
    <div className="bg-white px-5 py-4 cursor-pointer" onClick={onClick}>
      <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#ea580c" }}>
        {chapter.service}
      </p>
      <h3 className="font-heading font-bold text-[15px] text-slate-800 leading-snug mb-1.5">{chapter.title}</h3>
      <p className="text-[12px] text-slate-500 leading-relaxed">{chapter.desc}</p>
      {state === "active" && (
        <Link
          to={chapter.link}
          onClick={e => e.stopPropagation()}
          className="inline-flex items-center gap-1 mt-2.5 text-[10px] font-bold uppercase tracking-wider transition-colors hover:underline"
          style={{ color: "#ea580c" }}
        >
          Learn more <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════
   FLOATING CHIP  — now navigable
═══════════════════════════════════════ */
const FloatChip = ({ icon, label, value, bg, className, to }: {
  icon: string; label: string; value: string; bg: string; className: string; to: string;
}) => (
  <Link to={to} className={`absolute z-10 group/chip ${className}`} title={value}>
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
      className="flex items-center gap-2 px-3 py-2.5 rounded-2xl pointer-events-none"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
    >
      <div className="w-7 h-7 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{ background: bg }}>
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-[13px] font-bold text-slate-800 leading-none mt-0.5 font-heading">{value}</p>
      </div>
      {/* tiny arrow hint */}
      <ArrowRight className="h-3 w-3 text-slate-300 group-hover/chip:text-orange-500 group-hover/chip:translate-x-0.5 transition-all duration-200" />
    </motion.div>
  </Link>
);

/* ═══════════════════════════════════════
   RELIABILITY BAR — now links to /services
═══════════════════════════════════════ */
const ReliabilityBar = () => {
  const items = [
    { label: "Uptime Improvement", pct: 94 },
    { label: "Fault Detection Rate", pct: 98 },
    { label: "Cost Reduction", pct: 70 },
  ];
  return (
    <Link to="/services" title="See our services" className="block group/bar">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="mt-8 p-5 rounded-2xl border border-amber-100 transition-shadow duration-300 group-hover/bar:shadow-md group-hover/bar:border-amber-200"
        style={{ background: "rgba(255,251,235,0.85)", backdropFilter: "blur(10px)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Industrial Reliability Impact</p>
          <span className="text-[9px] font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1 opacity-0 group-hover/bar:opacity-100 transition-opacity">
            View services <ArrowRight className="h-2.5 w-2.5" />
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div key={item.label}>
              <div className="flex justify-between mb-1">
                <span className="text-[11px] font-medium text-slate-600">{item.label}</span>
                <span className="text-[11px] font-bold text-orange-600">{item.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-amber-100 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #f59e0b, #ea580c)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ delay: 1.1 + i * 0.15, duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Link>
  );
};

/* ═══════════════════════════════════════
   PRODUCTS AUTO-SLIDER
   — single row, infinite marquee, pauses on hover
   — cards already wrapped in <Link>, enhanced with overlay
═══════════════════════════════════════ */
const CARD_W = 260;
const CARD_GAP = 20;
const STEP = CARD_W + CARD_GAP;
const ONE_SET = PRODUCTS.length * STEP;

const ProductsSlider = () => {
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>();
  const SPEED = 0.55;

  useEffect(() => {
    const tick = () => {
      if (!paused) {
        setOffset(prev => {
          const next = prev + SPEED;
          return next >= ONE_SET ? next - ONE_SET : next;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [paused]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
      }}
    >
      <div
        className="flex"
        style={{
          gap: CARD_GAP,
          width: TRACK.length * STEP,
          transform: `translateX(-${offset}px)`,
          willChange: "transform",
        }}
      >
        {TRACK.map((p, i) => (
          <Link
            key={`${p.slug}-${i}`}
            to={`/products/${p.slug}`}
            className="flex-shrink-0 group"
            style={{ width: "85vw", maxWidth: CARD_W }}
            title={p.label}
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="relative bg-white rounded-2xl overflow-hidden flex flex-col"
              style={{
                height: 220,
                boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
                border: "1px solid rgba(203,213,225,0.5)",
              }}
            >
              {/* top colour bar */}
              <div className="h-[3px] w-full flex-shrink-0"
                style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent}44)` }} />

              {/* clickable indicator on hover */}
              <div
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                style={{ background: `${p.accent}18`, color: p.accent }}
              >
                Explore <ArrowRight className="h-2.5 w-2.5" />
              </div>

              <div className="px-5 py-5 flex flex-col gap-3 flex-1">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                  transition={{ duration: 0.45 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${p.accent}18` }}
                >
                  {p.icon}
                </motion.div>

                <div className="flex-1 min-h-0">
                  <h3 className="font-bold text-[13px] text-slate-800 leading-snug mb-1.5 group-hover:text-slate-900 transition-colors">
                    {p.label}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{p.desc}</p>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: p.accent }}>
                  Learn More
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
export default function Index() {
  const [activeChapter, setActiveChapter] = useState(0);
  const autoRef = useRef<ReturnType<typeof setTimeout>>();

  const activateCard = useCallback((idx: number) => {
    setActiveChapter(idx);
    clearTimeout(autoRef.current);
    autoRef.current = setTimeout(() => activateCard((idx + 1) % 3), 3800);
  }, []);

  useEffect(() => {
    autoRef.current = setTimeout(() => activateCard(1), 3800);
    return () => clearTimeout(autoRef.current);
  }, [activateCard]);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i, delay: i * 0.4, size: 4 + Math.random() * 8,
    x: 10 + Math.random() * 80, y: 20 + Math.random() * 60,
  }));

  const cardSlots = CHAPTERS.map(ch => {
    const diff = (ch.id - activeChapter + 3) % 3;
    return { chapter: ch, state: (diff === 0 ? "active" : diff === 1 ? "back1" : "back2") as CardState, slotIndex: diff };
  });

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700;800&display=swap');`}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

        {/* ══════════════════════════════ HERO ══════════════════════════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, #fffbeb 0%, #fff7ed 40%, #f0f9ff 100%)" }}>

          <motion.div className="absolute pointer-events-none" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity }}
            style={{ width: 640, height: 640, top: -200, left: -120, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.24) 0%, transparent 70%)" }} />
          <motion.div className="absolute pointer-events-none" animate={{ scale: [1, 1.14, 1] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            style={{ width: 420, height: 420, bottom: -80, right: -60, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.16) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map(p => <Particle key={p.id} {...p} />)}
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

              {/* LEFT */}
              <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} initial="hidden" animate="visible">
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/50 bg-amber-50/90 mb-6 shadow-sm">
                  <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
                    className="w-2 h-2 rounded-full bg-amber-400 block" />
                  <span className="text-amber-700 text-[10px] font-bold tracking-widest uppercase">Industrial Reliability & Predictive Analytics</span>
                </motion.div>

                <motion.h1
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }}
                  className="font-heading font-bold leading-[1.04] tracking-tight mb-4 text-slate-900"
                  style={{ fontSize: "clamp(1.9rem, 5vw, 3.5rem)", fontFamily: "'Roboto', roboto" }}>
                  Mahadyuta Technical<br />
                  <motion.span
                    animate={{ backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                    style={{ background: "linear-gradient(90deg, #f59e0b, #ea580c, #f97316, #f59e0b)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}>
                    Solutions
                  </motion.span>{" "}
                  <span style={{ color: "#1e293b" }}>Pvt. Ltd.</span>
                </motion.h1>

                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="flex items-center gap-3 mb-5">
                  <div className="h-px flex-1 max-w-[40px]" style={{ background: "linear-gradient(90deg,#f59e0b,transparent)" }} />
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#ea580c" }}>Reliability · Predictability · Uptime</span>
                </motion.div>

                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className="text-base text-slate-600 mb-6 max-w-lg leading-relaxed">
                  We detect failures <strong className="text-slate-800 font-semibold">before they happen</strong> — using ultrasound, infrared thermography, and partial discharge analysis to keep your industrial machinery running at peak reliability.
                </motion.p>

                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex gap-4 flex-wrap">
                  <MagneticBtn to="/contact"
                    className="px-10 py-5 rounded-xl font-bold shadow-lg text-white text-sm"
                    style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)", boxShadow: "0 8px 32px rgba(245,158,11,0.40)", fontFamily: "'Roboto',roboto" }}>
                    Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </MagneticBtn>
                </motion.div>

                <ReliabilityBar />
              </motion.div>

              {/* RIGHT */}
              <div className="relative flex items-center justify-center py-10 lg:py-0">
                <div className="relative w-full max-w-[340px] h-[420px] sm:h-[460px] md:h-[480px] mx-auto">

                  {/* Progress line */}
                  <div className="absolute rounded-full left-[-20px] sm:left-[-28px] top-0 w-[2px] h-full bg-gradient-to-b from-amber-200/40 to-orange-300/20">
                    <motion.div
                      className="w-full rounded-full bg-gradient-to-b from-amber-400 to-orange-500"
                      animate={{ height: PROGRESS_VALS[activeChapter] }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>

                  {/* Cards */}
                  {cardSlots.map(({ chapter, state, slotIndex }) => (
                    <ChapterCard
                      key={chapter.id}
                      chapter={chapter}
                      state={state}
                      slotIndex={slotIndex}
                      onClick={() => activateCard(chapter.id)}
                    />
                  ))}

                  {/* Dots */}
                  <div className="absolute flex gap-2 items-center bottom-[-40px] left-1/2 -translate-x-1/2">
                    {CHAPTERS.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => activateCard(i)}
                        className="h-2 rounded-full"
                        animate={{
                          width: i === activeChapter ? 28 : 8,
                          background: i === activeChapter ? "#ea580c" : "#cbd5e1",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating chips — now navigable */}
                <FloatChip
                  icon="📊"
                  label="Predictive maintenance"
                  value="ISO 18436 Certified"
                  bg="rgba(234,88,12,0.10)"
                  className="hidden sm:flex bottom-10 left-[-50px]"
                  to="/services/predictive-analytics"
                />

                <FloatChip
                  icon="🏆"
                  label="Training partner"
                  value="Mobius Institute, AU"
                  bg="rgba(245,158,11,0.10)"
                  className="hidden sm:flex bottom-[-10px] right-[-30px]"
                  to="/centre"
                />
              </div>
            </div>

            {/* STATS — linked to About page */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">
              {STATS.map((s, i) => (
                <Link key={s.label} to="/about" title="About Mahadyuta" className="block group/stat">
                  <Card3D style={{ borderRadius: 20 }}>
                    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1 + i * 0.1 }}
                      whileHover={{ scale: 1.04 }} className="rounded-2xl p-4 sm:p-5 text-center border shadow-lg select-none transition-shadow duration-200 group-hover/stat:shadow-xl"
                      style={{ background: "rgba(255,255,255,0.84)", borderColor: "rgba(251,191,36,0.30)", boxShadow: "0 8px 32px rgba(245,158,11,0.12), 0 2px 8px rgba(0,0,0,0.06)", transform: "translateZ(12px)" }}>
                      <div className="text-2xl mb-1">{s.icon}</div>
                      <p className="text-3xl font-bold mb-0.5" style={{ color: "#ea580c" }}><AnimatedCounter value={s.value} suffix={s.suffix} /></p>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{s.label}</p>
                    </motion.div>
                  </Card3D>
                </Link>
              ))}
            </motion.div>
          </div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10">
            <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.6), transparent)" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-70" />
          </motion.div>
        </section>

        {/* ══════════════════════════════ SERVICES ══════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="section-padding" style={{ background: "linear-gradient(160deg, #fafaf9 0%, #f0f9ff 100%)" }}>
          <div className="container-narrow">
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="text-center mb-16">
              <span className="inline-block text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">What We Do</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-amber-700">Our Core Services</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
              {services.map((s, i) => (
                <motion.div key={s.title} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                  <Card3D style={{ borderRadius: 20, height: "100%" }}>
                    <Link to={s.link} className="block h-full">
                      <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 240, damping: 18 }}
                        className="group bg-white rounded-2xl p-7 shadow-md border border-slate-100 h-full relative overflow-hidden cursor-pointer"
                        style={{ transform: "translateZ(0)" }}>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                          style={{ background: `radial-gradient(circle at 30% 30%, ${s.accent}18 0%, transparent 65%)` }} />
                        <div className="absolute top-3 right-4 text-6xl font-black pointer-events-none select-none leading-none" style={{ color: `${s.accent}10`, transform: "translateZ(4px)" }}>0{i + 1}</div>
                        <motion.div whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }} transition={{ duration: 0.5 }}
                          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 relative"
                          style={{ background: `${s.accent}18`, transform: "translateZ(8px)" }}>
                          <s.icon className="h-5 w-5" style={{ color: s.accent }} />
                        </motion.div>
                        <h3 className="font-heading font-bold text-lg mb-2 text-slate-800 relative" style={{ transform: "translateZ(6px)" }}>{s.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed relative" style={{ transform: "translateZ(4px)" }}>{s.desc}</p>
                        {/* "View service" indicator */}
                        <div className="flex items-center gap-1 mt-4 text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: s.accent }}>
                          View service <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                        <motion.div initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }}
                          className="absolute bottom-0 left-0 right-0 h-[3px] origin-left"
                          style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />
                      </motion.div>
                    </Link>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════ PARTNERS ══════════════════════ */}
        <InternationalPartnersSlider />

        {/* ══════════════════════ CUSTOMERS ══════════════════════ */}
        <OurCustomersSlider />

        {/* ══════════════════════════════ PRODUCTS SLIDING ROW ══════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #fff7ed 0%, #fffbeb 60%, #f0f9ff 100%)",
            paddingTop: "5rem",
            paddingBottom: "5rem",
          }}
        >
          <div className="text-center mb-12 px-6">
            <span className="inline-block text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
              Our Range
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-amber-700">Our Products</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Industry-grade instruments and systems — hover to pause, click to explore.
            </p>
          </div>

          <ProductsSlider />
        </motion.section>

        {/* ══════════════════════ CTA ══════════════════════ */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }} className="section-padding text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ea580c 100%)" }}>
          {[120, 240, 360].map((size, i) => (
            <motion.div key={size} animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.04, 0.08] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white pointer-events-none"
              style={{ width: size * 3, height: size * 3, opacity: 0.08 }} />
          ))}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.28) 0%, transparent 65%)" }} />
          <div className="relative">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 drop-shadow">
              Ready to Improve Your Industrial Reliability?
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }} className="text-white/80 max-w-2xl mx-auto mb-10 text-base md:text-lg">
              Partner with Mahadyuta for cutting-edge predictive maintenance, energy optimization, and IIoT-Based CBM (Condition-Based
              Monitoring with IIoT) solutions.
            </motion.p>
            <MagneticBtn to="/contact"
              className="px-14 py-6 rounded-xl font-bold shadow-2xl text-amber-700 bg-white hover:bg-amber-50 text-base"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}>
              Contact Us Today <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticBtn>
          </div>
        </motion.section>

      </motion.div>
    </>
  );
}