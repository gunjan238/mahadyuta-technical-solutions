import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BarChart3, Shield, GraduationCap } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, easeOut } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════
   DATA
═══════════════════════════════════ */
const servicesData = [
  {
    category: "Energy Optimization Services",
    Icon: Zap,
    accent: "#f59e0b",
    num: "01",
    tagline: "Detect. Conserve. Sustain.",
    items: [
      "Compressed Air / Gas / Steam / Vacuum Leak Detection Services",
      "Internal Hydraulic / Pneumatic Leak / Valve Pass Audit Services",
      "Steam Trap Condition Assessment Services",
      "Air Tight / Water Tight Integrity Assessment for Doors, Hatches & Cabins",
      "Underground Gas / Oil / Water Leak Detection Services",
    ],
  },
  {
    category: "Predictive Analytics",
    Icon: BarChart3,
    accent: "#ea580c",
    num: "02",
    tagline: "See failures before they happen.",
    items: [
      "HT / HV Electrical Partial Discharge Detection Services",
      "Infrared Thermography Services",
      "Slow Speed Bearing Condition Assessment (up to 0.5 RPM)",
      "Bearing Lubrication Management Services",
      "Vibration / Online Bearing Condition Monitoring Services",
    ],
  },
  {
    category: "Information Technology",
    Icon: Shield,
    accent: "#f97316",
    num: "03",
    tagline: "Always on. Always aware.",
    items: [
      "Unified Network & Communication",
      "Cloud Services",
      "Surveillance & Access Control",
      "Backup Facility"
    ],
  },
  {
    category: "Training & Certification",
    Icon: GraduationCap,
    accent: "#fb923c",
    num: "04",
    tagline: "Certified. Skilled. Ready.",
    items: [
      "Ultrasound Technology Training / Certification (Mobius Institute, Australia)",
      "Introductory Training on Predictive Maintenance & Condition Monitoring Technologies",
      "Training on General Engineering Practices",
    ],
  },
];

const STATS = [
  { value: 4,   suffix: "",  label: "Service Domains",    icon: "🔬" },
  { value: 20,  suffix: "+", label: "Service Categories", icon: "⚙️" },
  { value: 500, suffix: "+", label: "Projects Delivered", icon: "✅" },
  { value: 15,  suffix: "+", label: "Years of Expertise", icon: "🏆" },
];

/* ═══════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════ */
const AnimatedCounter = ({ value, suffix = "" }) => {
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  useEffect(() => { const t = setTimeout(() => mv.set(value), 700); return () => clearTimeout(t); }, [value, mv]);
  useEffect(() => spring.on("change", v => setDisplay(Math.floor(v))), [spring]);
  return <span>{display.toLocaleString()}{suffix}</span>;
};

/* ═══════════════════════════════════
   3-D TILT CARD
═══════════════════════════════════ */
const Card3D = ({ children, style = {}, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════
   MAGNETIC BUTTON
═══════════════════════════════════ */
const MagneticBtn = ({ children, to, className = "", style = {} }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy, display: "inline-block" }}>
      <Link to={to}><Button className={className} style={style}>{children}</Button></Link>
    </motion.div>
  );
};

/* ═══════════════════════════════════
   FLOATING PARTICLE
═══════════════════════════════════ */
const Particle = ({ delay, size, x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0], y: [0, -80], x: [0, (Math.random() - 0.5) * 40] }}
    transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, repeatDelay: Math.random() * 4 }}
    style={{
      position: "absolute", left: `${x}%`, top: `${y}%`,
      width: size, height: size, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(251,191,36,0.8), rgba(234,88,12,0.4))",
      pointerEvents: "none",
    }}
  />
);

/* ═══════════════════════════════════
   SERVICE CARD
═══════════════════════════════════ */
const ServiceCard = ({ service }) => {
  const { category, Icon, accent, num, tagline, items } = service;
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
      <Card3D style={{ borderRadius: 20, height: "100%" }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="group bg-white rounded-2xl shadow-md border border-slate-100 h-full relative overflow-hidden cursor-default"
          style={{ transform: "translateZ(0)" }}
        >
          {/* Hover radial glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{ background: `radial-gradient(circle at 20% 20%, ${accent}18 0%, transparent 65%)` }} />

          {/* Top accent bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.35 }}
            className="absolute top-0 left-0 right-0 h-[3px] origin-left"
            style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
          />

          {/* Ghost number */}
          <div className="absolute top-4 right-5 text-7xl font-black pointer-events-none select-none leading-none"
            style={{ color: `${accent}0f`, transform: "translateZ(4px)", fontFamily: "'Roboto', sans-serif" }}>
            {num}
          </div>

          <div className="p-7 flex flex-col gap-5">
            {/* Icon + header */}
            <div className="flex items-start gap-4">
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${accent}18`, transform: "translateZ(8px)" }}
              >
                <Icon className="h-5 w-5" style={{ color: accent }} />
              </motion.div>
              <div style={{ transform: "translateZ(6px)" }}>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: accent }}>{tagline}</p>
                <h3 className="font-heading font-bold text-lg text-slate-800 leading-snug">{category}</h3>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />

            {/* Items */}
            <ul className="flex flex-col gap-2.5" style={{ transform: "translateZ(4px)" }}>
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                  <span className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Card3D>
    </motion.div>
  );
};

/* ═══════════════════════════════════
   PAGE
═══════════════════════════════════ */
const Services = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i, delay: i * 0.4,
    size: 4 + Math.random() * 8,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
  }));

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700;800&display=swap');`}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

        {/* ══════════════════ HERO ══════════════════ */}
        <section
          className="relative overflow-hidden flex items-center"
          style={{
            background: "linear-gradient(160deg, #fffbeb 0%, #fff7ed 40%, #f0f9ff 100%)",
            minHeight: "52vh",
            paddingTop: "5rem",
            paddingBottom: "5rem",
          }}
        >
          {/* Sunburst orbs */}
          <motion.div className="absolute pointer-events-none"
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity }}
            style={{ width: 560, height: 560, top: -180, left: -100, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.24) 0%, transparent 70%)" }} />
          <motion.div className="absolute pointer-events-none"
            animate={{ scale: [1, 1.14, 1] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            style={{ width: 360, height: 360, bottom: -80, right: -40, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.14) 0%, transparent 70%)" }} />

          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)", backgroundSize: "40px 40px" }} />

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map(p => <Particle key={p.id} {...p} />)}
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              {/* Badge */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/50 bg-amber-50/90 mb-6 shadow-sm"
              >
                <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
                  className="w-2 h-2 rounded-full bg-amber-400 block" />
                <span className="text-amber-700 text-[10px] font-bold tracking-widest uppercase">
                  What We Offer
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }}
                className="font-heading font-bold leading-[1.04] tracking-tight mb-4 text-slate-900"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontFamily: "'Roboto', sans-serif" }}
              >
                Our{" "}
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: "linear-gradient(90deg, #f59e0b, #ea580c, #f97316, #f59e0b)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "inline-block",
                  }}
                >
                  Services
                </motion.span>
              </motion.h1>

              {/* Tagline divider */}
              <motion.div
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="h-px flex-1 max-w-[40px]" style={{ background: "linear-gradient(90deg,#f59e0b,transparent)" }} />
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#ea580c" }}>
                  Energy · Analytics · Automation · Training
                </span>
              </motion.div>

              {/* Body */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-base text-slate-600 max-w-xl leading-relaxed"
              >
                Comprehensive industrial reliability, predictive maintenance, and energy optimization services — built for every major industry, delivered with precision.
              </motion.p>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10">
            <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.6), transparent)" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-70" />
          </motion.div>
        </section>

        {/* ══════════════════ STATS ROW ══════════════════ */}
        <div style={{ background: "linear-gradient(160deg, #fff7ed 0%, #fffbeb 100%)" }} className="py-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto"
          >
            {STATS.map((s, i) => (
              <Card3D key={s.label} style={{ borderRadius: 20 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.04 }}
                  className="rounded-2xl p-5 text-center border shadow-lg select-none"
                  style={{
                    background: "rgba(255,255,255,0.84)",
                    borderColor: "rgba(251,191,36,0.30)",
                    boxShadow: "0 8px 32px rgba(245,158,11,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                    transform: "translateZ(12px)",
                  }}
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="text-3xl font-bold mb-0.5" style={{ color: "#ea580c" }}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{s.label}</p>
                </motion.div>
              </Card3D>
            ))}
          </motion.div>
        </div>

        {/* ══════════════════ SERVICE CARDS GRID ══════════════════ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
          className="section-padding"
          style={{ background: "linear-gradient(160deg, #fafaf9 0%, #f0f9ff 100%)" }}
        >
          <div className="container-narrow">
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="text-center mb-14"
            >
              <span className="inline-block text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
                Service Domains
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-amber-700">Everything We Do</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
              {servicesData.map((service) => (
                <ServiceCard key={service.category} service={service} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══════════════════ CTA ══════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-padding text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ea580c 100%)" }}
        >
          {[120, 240, 360].map((size, i) => (
            <motion.div key={size}
              animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.04, 0.08] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white pointer-events-none"
              style={{ width: size * 3, height: size * 3, opacity: 0.08 }}
            />
          ))}

          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.28) 0%, transparent 65%)" }} />

          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 drop-shadow"
            >
              Need a Custom Solution?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/80 max-w-2xl mx-auto mb-10 text-base md:text-lg"
            >
              Partner with Mahadyuta for cutting-edge predictive maintenance, energy optimization, and Information Technology solutions.
            </motion.p>
            <MagneticBtn
              to="/contact"
              className="px-14 py-6 rounded-xl font-bold shadow-2xl text-amber-700 bg-white hover:bg-amber-50 text-base"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}
            >
              Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticBtn>
          </div>
        </motion.section>

      </motion.div>
    </>
  );
};

export default Services;