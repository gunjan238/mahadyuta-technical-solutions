import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, easeOut } from "framer-motion";
import { useRef } from "react";

/* ═══════════════════════════════════
   DATA
═══════════════════════════════════ */
const products = [
  {
    title: "Ultrasound Testing Devices",
    partner: "SONOTEC, Germany",
    num: "01",
    accent: "#f59e0b",
    tag: "Leak Detection · Bearing · PD · Steam Traps",
    desc: "SONAPHONE series — innovative ultrasonic testing devices for Maintenance 4.0. Used for leak detection, bearing monitoring, electrical partial discharge detection, and steam trap testing.",
    img: "https://www.mahadyuta.com/images/products/Ultra-Sound-Testing-Devices.jpg",
    link: "https://www.sonotec.eu/en/",
  },
  {
    title: "Online Vibration Monitoring Devices",
    partner: "SenseGrow, USA",
    num: "02",
    accent: "#ea580c",
    tag: "Cloud · Real-Time · Predictive",
    desc: "Cloud-based online vibration monitoring devices for continuous machine health assessment. Real-time alerts and analytics for predictive maintenance.",
    img: "https://www.mahadyuta.com/images/services/Bearing-Inspection.jpg",
    link: "https://www.sensegrow.com/",
  },
  {
    title: "Chemical-Less Anti-Scaling & De-Scaling Devices",
    partner: null,
    num: "03",
    accent: "#f97316",
    tag: "Cooling Towers · Chillers · RO Plants",
    desc: "Industrial anti-scaling and de-scaling devices for cooling towers, chillers, heat exchangers, and RO plants — without chemicals.",
    img: "https://www.mahadyuta.com/images/products/Chemical-Less-%20Anti-Scaling-De-Scaling-Devices.jpeg",
    link: null,
  },
];

const automationProducts = [
  { title: "Kiln Monitoring",            img: "https://www.mahadyuta.com/images/products/Thermal_Automation_1.png", accent: "#f59e0b" },
  { title: "Coal Pile Monitoring",       img: "https://www.mahadyuta.com/images/products/Thermal_Automation_2.png", accent: "#ea580c" },
  { title: "HT Electrical Yard Monitoring", img: "https://www.mahadyuta.com/images/products/Thermal_Automation_3.png", accent: "#f97316" },
  { title: "Critical Motor Monitoring",  img: "https://www.mahadyuta.com/images/products/Thermal_Automation_4.png", accent: "#fb923c" },
];

/* ═══════════════════════════════════
   3-D TILT CARD
═══════════════════════════════════ */
const Card3D = ({ children, style = {}, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900, ...style }}
      className={className}>
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
    animate={{ opacity: [0, 0.45, 0], scale: [0, 1, 0], y: [0, -70], x: [0, (Math.random() - 0.5) * 36] }}
    transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, repeatDelay: Math.random() * 4 }}
    style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: size, height: size, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.8), rgba(234,88,12,0.4))", pointerEvents: "none" }}
  />
);

/* ═══════════════════════════════════
   PAGE
═══════════════════════════════════ */
const Products = () => {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i, delay: i * 0.45, size: 4 + Math.random() * 7,
    x: 10 + Math.random() * 80, y: 10 + Math.random() * 80,
  }));

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700;800&display=swap');`}</style>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

        {/* ══════════════════ HERO ══════════════════ */}
        <section className="relative overflow-hidden flex items-center"
          style={{ background: "linear-gradient(160deg, #fffbeb 0%, #fff7ed 40%, #f0f9ff 100%)", minHeight: "48vh", paddingTop: "5rem", paddingBottom: "5rem" }}>

          <motion.div className="absolute pointer-events-none" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity }}
            style={{ width: 560, height: 560, top: -180, left: -100, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.24) 0%, transparent 70%)" }} />
          <motion.div className="absolute pointer-events-none" animate={{ scale: [1, 1.14, 1] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            style={{ width: 360, height: 360, bottom: -80, right: -40, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.14) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map(p => <Particle key={p.id} {...p} />)}
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
            <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} initial="hidden" animate="visible" className="max-w-3xl">

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/50 bg-amber-50/90 mb-6 shadow-sm">
                <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} className="w-2 h-2 rounded-full bg-amber-400 block" />
                <span className="text-amber-700 text-[10px] font-bold tracking-widest uppercase">Solutions</span>
              </motion.div>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }}
                className="font-heading font-bold leading-[1.04] tracking-tight mb-4 text-slate-900"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontFamily: "'Roboto', sans-serif" }}>
                Our{" "}
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  style={{ background: "linear-gradient(90deg, #f59e0b, #ea580c, #f97316, #f59e0b)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}>
                  Products
                </motion.span>
              </motion.h1>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 max-w-[40px]" style={{ background: "linear-gradient(90deg,#f59e0b,transparent)" }} />
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#ea580c" }}>Ultrasound · Vibration · Thermal · Automation</span>
              </motion.div>

              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-base text-slate-600 max-w-xl leading-relaxed">
                World-class products from our international partners — built for industrial reliability, predictive maintenance, and energy optimization.
              </motion.p>
            </motion.div>
          </div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10">
            <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.6), transparent)" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-70" />
          </motion.div>
        </section>

        {/* ══════════════════ MAIN PRODUCTS ══════════════════ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="section-padding"
          style={{ background: "linear-gradient(160deg, #fafaf9 0%, #f0f9ff 100%)" }}>
          <div className="container-narrow">
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="text-center mb-14">
              <span className="inline-block text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">Featured Products</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-amber-700">International Partner Solutions</h2>
            </motion.div>

            <div className="flex flex-col gap-8">
              {products.map((p, i) => (
                <motion.div key={p.title} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                  <Card3D style={{ borderRadius: 20 }}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 240, damping: 20 }}
                      className="group bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden relative"
                      style={{ transform: "translateZ(0)" }}
                    >
                      {/* top accent bar sweep */}
                      <motion.div initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.35 }}
                        className="absolute top-0 left-0 right-0 h-[3px] origin-left z-10"
                        style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />

                      {/* hover glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                        style={{ background: `radial-gradient(circle at 15% 50%, ${p.accent}12 0%, transparent 60%)` }} />

                      {/* ghost number */}
                      <div className="absolute top-4 right-6 text-8xl font-black pointer-events-none select-none leading-none"
                        style={{ color: `${p.accent}0d`, fontFamily: "'Roboto', sans-serif" }}>{p.num}</div>

                      <div className="md:flex">
                        {/* image */}
                        <div className="md:w-72 lg:w-80 shrink-0 overflow-hidden">
                          <motion.img
                            whileHover={{ scale: 1.06 }}
                            transition={{ duration: 0.5 }}
                            src={p.img} alt={p.title}
                            className="w-full h-52 md:h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* content */}
                        <div className="p-7 md:p-8 flex flex-col justify-center gap-3 relative" style={{ transform: "translateZ(6px)" }}>
                          {/* tag chip */}
                          <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg self-start"
                            style={{ color: p.accent, background: `${p.accent}15` }}>{p.tag}</span>

                          <h2 className="text-xl md:text-2xl font-heading font-bold text-slate-800 leading-snug">{p.title}</h2>

                          {p.partner && (
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-4 rounded-full" style={{ background: p.accent }} />
                              <p className="text-sm font-semibold" style={{ color: p.accent }}>{p.partner}</p>
                            </div>
                          )}

                          <p className="text-sm text-slate-500 leading-relaxed max-w-lg">{p.desc}</p>

                          {p.link && (
                            <motion.a
                              href={p.link} target="_blank" rel="noopener noreferrer"
                              whileHover={{ x: 4 }}
                              transition={{ type: "spring", stiffness: 400 }}
                              className="inline-flex items-center gap-1.5 text-sm font-bold self-start"
                              style={{ color: p.accent }}
                            >
                              Visit Partner <ExternalLink className="h-3.5 w-3.5" />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══════════════════ AUTOMATION GRID ══════════════════ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="section-padding"
          style={{ background: "linear-gradient(160deg, #fff7ed 0%, #fffbeb 60%, #f0f9ff 100%)" }}>
          <div className="container-narrow">
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="text-center mb-14">
              <span className="inline-block text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">Thermal Monitoring</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-amber-700">Automation Solutions</h2>
              <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                Fixed online thermal cameras with AI analytics for 24/7 automated hotspot detection and alerting.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {automationProducts.map((p, i) => (
                <motion.div key={p.title} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}>
                  <Card3D style={{ borderRadius: 16, height: "100%" }}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="group bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden h-full relative"
                      style={{ transform: "translateZ(0)" }}
                    >
                      {/* hover glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                        style={{ background: `radial-gradient(circle at 50% 30%, ${p.accent}18 0%, transparent 65%)` }} />

                      {/* top sweep bar */}
                      <motion.div initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }}
                        className="absolute top-0 left-0 right-0 h-[3px] origin-left z-10"
                        style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />

                      {/* image */}
                      <div className="overflow-hidden">
                        <motion.img whileHover={{ scale: 1.07 }} transition={{ duration: 0.5 }}
                          src={p.img} alt={p.title} className="w-full h-44 object-cover" loading="lazy" />
                      </div>

                      {/* label */}
                      <div className="px-4 py-4 relative" style={{ transform: "translateZ(6px)" }}>
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-3.5 rounded-full flex-shrink-0" style={{ background: p.accent }} />
                          <h3 className="font-heading font-semibold text-slate-800 text-sm leading-snug">{p.title}</h3>
                        </div>
                      </div>
                    </motion.div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══════════════════ CTA ══════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-padding text-center relative overflow-hidden"
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
              Interested in Our Products?
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }} className="text-white/80 max-w-2xl mx-auto mb-10 text-base md:text-lg">
              Get in touch to request a demo or learn more about our partner solutions.
            </motion.p>
            <MagneticBtn to="/contact"
              className="px-14 py-6 rounded-xl font-bold shadow-2xl text-amber-700 bg-white hover:bg-amber-50 text-base"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}>
              Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticBtn>
          </div>
        </motion.section>

      </motion.div>
    </>
  );
};

export default Products;