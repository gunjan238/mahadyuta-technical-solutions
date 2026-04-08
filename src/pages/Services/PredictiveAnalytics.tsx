import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowLeft, BarChart3, Zap, Thermometer, Activity, Droplets, Wifi, CheckCircle2 } from "lucide-react";

const ACCENT = "#ea580c";
const ACCENT2 = "#f97316";

const TAGLINE = "SEE FAILURES BEFORE THEY HAPPEN.";
const TITLE = "Predictive Analytics";
const SUBTITLE =
  "Identify equipment faults weeks before they escalate into costly breakdowns — using multi-technology condition monitoring across electrical, mechanical, and structural assets.";

const SERVICES = [
  {
    icon: Zap,
    label: "HT / HV Electrical Partial Discharge Detection",
    desc: "Non-contact PD scanning on energised high-tension switchgear and cables to catch insulation degradation early.",
    accent: "#ea580c",
    tag: "Electrical",
  },
  {
    icon: Thermometer,
    label: "Infrared Thermography Services",
    desc: "High-resolution thermal imaging of LT/HT panels, motors, transformers, and bus-bars to map heat anomalies.",
    accent: "#f97316",
    tag: "Thermal",
  },
  {
    icon: Activity,
    label: "Slow Speed Bearing Condition Assessment",
    desc: "Ultrasound-based assessment of bearings running as low as 0.5 RPM — undetectable by standard vibration sensors.",
    accent: "#fb923c",
    tag: "Ultrasound",
  },
  {
    icon: Droplets,
    label: "Bearing Lubrication Management",
    desc: "Ultrasound-guided re-lubrication to prevent over- and under-lubrication — extending bearing life by 3–5×.",
    accent: "#f59e0b",
    tag: "Lubrication",
  },
  {
    icon: Wifi,
    label: "Vibration / Online Bearing Condition Monitoring",
    desc: "Continuous vibration analytics on critical rotating assets, with alarm thresholds and trend dashboards.",
    accent: "#dc2626",
    tag: "Vibration",
  },
];

const STATS = [
  { value: "Weeks", label: "Advance warning before failure" },
  { value: "±0.1°C", label: "Thermal imaging accuracy" },
  { value: "0.5 RPM", label: "Minimum detectable bearing speed" },
  { value: "98%", label: "Fault detection rate" },
];

const TECHNOLOGIES = [
  { name: "Ultrasound", icon: "🔊", desc: "Airborne & structure-borne" },
  { name: "Infrared", icon: "🌡️", desc: "Radiometric thermal imaging" },
  { name: "Partial Discharge", icon: "⚡", desc: "UHF & TEV methods" },
  { name: "Vibration", icon: "📈", desc: "FFT spectral analysis" },
];

const WHY = [
  "Multi-technology approach — no single-point blind spots",
  "Live on-site analysis with real-time thermal imaging",
  "ISO 18436 certified thermographers and analysts",
  "Detailed fault severity grading (Critical / Major / Minor)",
  "Customised maintenance scheduling recommendations",
];

const Card3D = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800, ...style }}
    >
      {children}
    </motion.div>
  );
};

export default function PredictiveAnalytics() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden min-h-[72vh] flex items-center"
        style={{ background: "linear-gradient(155deg, #fff7ed 0%, #fef3c7 30%, #fff1f2 100%)" }}
      >
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 7, repeat: Infinity }}
          className="absolute pointer-events-none"
          style={{ width: 600, height: 600, top: -200, right: -100, borderRadius: "50%", background: "radial-gradient(circle,rgba(234,88,12,0.18) 0%,transparent 70%)" }} />
        <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 9, repeat: Infinity, delay: 2 }}
          className="absolute pointer-events-none"
          style={{ width: 360, height: 360, bottom: -80, left: -80, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,158,11,0.14) 0%,transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#9a3412 1px,transparent 0)", backgroundSize: "36px 36px" }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Link to="/services" className="inline-flex items-center gap-2 text-orange-700 text-xs font-bold uppercase tracking-widest mb-10 hover:gap-3 transition-all duration-200">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Services
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* left */}
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11 } } }}
              initial="hidden" animate="visible"
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/50 bg-orange-50/90 mb-5 shadow-sm">
                <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
                  className="w-2 h-2 rounded-full bg-orange-500 block" />
                <span className="text-orange-700 text-[10px] font-bold tracking-widest uppercase">{TAGLINE}</span>
              </motion.div>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
                className="font-bold leading-tight tracking-tight mb-5 text-slate-900"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
              >
                Predictive{" "}
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  style={{ background: "linear-gradient(90deg,#ea580c,#f97316,#fbbf24,#ea580c)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}
                >
                  Analytics
                </motion.span>
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-base text-slate-600 mb-8 max-w-lg leading-relaxed"
              >
                {SUBTITLE}
              </motion.p>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex gap-4 flex-wrap">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 rounded-xl font-bold text-white text-sm flex items-center gap-2 shadow-lg"
                    style={{ background: "linear-gradient(135deg,#ea580c,#f97316)", boxShadow: "0 8px 28px rgba(234,88,12,0.36)" }}
                  >
                    Book an Assessment <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* right — stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {STATS.map((s, i) => (
                <Card3D key={s.label} style={{ borderRadius: 20 }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="rounded-2xl p-5 border text-center"
                    style={{ background: "rgba(255,255,255,0.9)", borderColor: "rgba(234,88,12,0.25)", boxShadow: "0 8px 28px rgba(234,88,12,0.10), 0 2px 6px rgba(0,0,0,0.05)", transform: "translateZ(10px)" }}
                  >
                    <p className="text-2xl font-black mb-1" style={{ color: ACCENT }}>{s.value}</p>
                    <p className="text-[11px] text-slate-500 font-medium leading-snug">{s.label}</p>
                  </motion.div>
                </Card3D>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top,#f9fafb,transparent)" }} />
      </section>

      {/* ── TECHNOLOGIES ── */}
      <section className="py-16 px-6 border-b border-slate-100" style={{ background: "#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-600 mb-2">Technologies We Deploy</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TECHNOLOGIES.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="bg-white rounded-2xl p-5 text-center border shadow-sm cursor-default"
                  style={{ borderColor: "rgba(234,88,12,0.15)", boxShadow: "0 4px 18px rgba(234,88,12,0.07)" }}
                >
                  <div className="text-3xl mb-3">{t.icon}</div>
                  <p className="font-bold text-[14px] text-slate-800 mb-0.5">{t.name}</p>
                  <p className="text-[11px] text-slate-400">{t.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-24 px-6" style={{ background: "linear-gradient(160deg,#fafaf9 0%,#fff7ed 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-orange-700 text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full">
              Service Breakdown
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Our Predictive Analytics Services</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.label}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
              >
                <Card3D style={{ borderRadius: 20, height: "100%" }}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-md h-full relative overflow-hidden"
                    style={{ transform: "translateZ(0)" }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                      style={{ background: `radial-gradient(circle at 20% 20%,${svc.accent}12 0%,transparent 60%)` }} />
                    <div className="absolute top-3 right-4 text-7xl font-black pointer-events-none select-none leading-none"
                      style={{ color: `${svc.accent}0d` }}>0{i + 1}</div>

                    {/* tag pill */}
                    <span className="inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3"
                      style={{ background: `${svc.accent}15`, color: svc.accent }}>
                      {svc.tag}
                    </span>

                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }} transition={{ duration: 0.45 }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${svc.accent}18` }}
                    >
                      <svc.icon className="h-5 w-5" style={{ color: svc.accent }} />
                    </motion.div>

                    <h3 className="font-bold text-[15px] text-slate-800 leading-snug mb-2">{svc.label}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{svc.desc}</p>

                    <motion.div initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 h-[3px] origin-left"
                      style={{ background: `linear-gradient(90deg,${svc.accent},transparent)` }} />
                  </motion.div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="py-24 px-6" style={{ background: "#ffffff" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* visual */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Card3D style={{ borderRadius: 24 }}>
              <div className="rounded-3xl p-8 border"
                style={{ background: "linear-gradient(135deg,#fff7ed,#fff1f2)", borderColor: "rgba(234,88,12,0.25)", boxShadow: "0 16px 48px rgba(234,88,12,0.12)", transform: "translateZ(12px)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "linear-gradient(135deg,#ea580c,#f97316)" }}>
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-orange-700 mb-3">Condition Monitoring Impact</p>
                <p className="text-4xl font-black text-slate-800 mb-1">3–8×</p>
                <p className="text-sm text-slate-500 mb-6">ROI on predictive maintenance vs reactive repairs</p>

                <div className="flex flex-col gap-3">
                  {[
                    { label: "Unplanned Downtime Reduction", pct: 76 },
                    { label: "Bearing Failure Prevention", pct: 91 },
                    { label: "PD Fault Detection Rate", pct: 96 },
                  ].map((bar, i) => (
                    <div key={bar.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[11px] text-slate-600">{bar.label}</span>
                        <span className="text-[11px] font-bold" style={{ color: ACCENT }}>{bar.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-orange-100 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg,#ea580c,#f97316)" }}
                          initial={{ width: 0 }} whileInView={{ width: `${bar.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.15, duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card3D>
          </motion.div>

          {/* text */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-orange-700 text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full">
              Our Advantage
            </span>
            <h2 className="text-3xl font-bold text-slate-800 mb-6 leading-tight">
              Catch Every Fault.<br /><span style={{ color: ACCENT }}>Before It Catches You.</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Single-technology monitoring misses faults. Our multi-sensor approach cross-validates findings across ultrasound, thermal, vibration, and PD — giving you confidence before you commit to shutdown.
            </p>
            <ul className="flex flex-col gap-3">
              {WHY.map((w, i) => (
                <motion.li
                  key={w}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                  {w}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#ea580c 0%,#f97316 50%,#fbbf24 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.25) 0%,transparent 65%)" }} />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow">Stop Reacting. Start Predicting.</h2>
          <p className="text-white/80 mb-8 text-base">Let our engineers run a full predictive assessment of your critical rotating and electrical assets.</p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="px-12 py-5 rounded-xl font-bold text-orange-700 bg-white text-sm flex items-center gap-2 mx-auto shadow-2xl"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.16)" }}
            >
              Contact Us Today <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </div>
      </motion.section>

    </motion.div>
  );
}