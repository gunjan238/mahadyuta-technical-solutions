import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowLeft, Zap, Wind, Droplets, Flame, Gauge, Search, CheckCircle2 } from "lucide-react";

/* ─── palette ─── */
const ACCENT = "#f59e0b";
const ACCENT2 = "#ea580c";

/* ─── data ─── */
const TAGLINE = "DETECT. CONSERVE. SUSTAIN.";
const TITLE = "Energy Optimization Services";
const SUBTITLE =
  "We help industries eliminate invisible energy losses — from compressed air leaks to underground utility faults — using advanced ultrasound and acoustic imaging technology.";

const SERVICES = [
  {
    icon: Wind,
    label: "Compressed Air / Gas / Steam / Vacuum Leak Detection",
    desc: "Precision ultrasound scanning to pinpoint leaks in pressurised systems, reducing energy waste and downtime significantly.",
    accent: "#f59e0b",
  },
  {
    icon: Gauge,
    label: "Internal Hydraulic / Pneumatic Leak / Valve Pass Audit",
    desc: "Detect internal valve passing and hydraulic bypasses that go unnoticed visually but silently drain efficiency.",
    accent: "#ea580c",
  },
  {
    icon: Flame,
    label: "Steam Trap Condition Assessment",
    desc: "Non-intrusive inspection of steam traps to identify failed-open, failed-closed, or leaking traps across your steam network.",
    accent: "#f97316",
  },
  {
    icon: Search,
    label: "Air Tight / Water Tight Integrity Assessment",
    desc: "Structural integrity checks for doors, hatches and cabins in marine, industrial and defence environments.",
    accent: "#fb923c",
  },
  {
    icon: Droplets,
    label: "Underground Gas / Oil / Water Leak Detection",
    desc: "Ground-level acoustic and ultrasonic detection of subsurface pipeline leaks without excavation.",
    accent: "#fbbf24",
  },
];

const STATS = [
  { value: "30–40%", label: "Average energy savings post-audit" },
  { value: "±1 dB", label: "Ultrasound detection precision" },
  { value: "0 psi", label: "Minimum pressure required" },
  { value: "24 hr", label: "Typical audit turnaround" },
];

const WHY = [
  "Non-intrusive — no shutdown required",
  "ISO 11654 & EN 13829 compliant methods",
  "Detailed photographic & acoustic reports",
  "ROI achieved within one billing cycle",
  "Applicable to all plant sizes",
];

/* ─── Card3D (reused from Index) ─── */
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

export default function EnergyOptimization() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden min-h-[72vh] flex items-center"
        style={{ background: "linear-gradient(155deg, #fffbeb 0%, #fff7ed 50%, #fef3c7 100%)" }}
      >
        {/* decorative blobs */}
        <motion.div
          animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute pointer-events-none"
          style={{ width: 560, height: 560, top: -180, right: -120, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.22) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute pointer-events-none"
          style={{ width: 340, height: 340, bottom: -60, left: -60, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.14) 0%, transparent 70%)" }}
        />
        {/* dot grid */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #92400e 1px, transparent 0)", backgroundSize: "36px 36px" }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
          {/* back link */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Link to="/services" className="inline-flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-widest mb-10 hover:gap-3 transition-all duration-200">
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
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/50 bg-amber-50/90 mb-5 shadow-sm">
                <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
                  className="w-2 h-2 rounded-full bg-amber-400 block" />
                <span className="text-amber-700 text-[10px] font-bold tracking-widest uppercase">{TAGLINE}</span>
              </motion.div>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
                className="font-bold leading-tight tracking-tight mb-5 text-slate-900"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
              >
                Energy{" "}
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  style={{ background: "linear-gradient(90deg,#f59e0b,#ea580c,#f97316,#f59e0b)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}
                >
                  Optimization
                </motion.span>
                <br />Services
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
                    style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)", boxShadow: "0 8px 28px rgba(245,158,11,0.38)" }}
                  >
                    Request an Audit <ArrowRight className="h-4 w-4" />
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
                    style={{ background: "rgba(255,255,255,0.88)", borderColor: "rgba(251,191,36,0.30)", boxShadow: "0 8px 28px rgba(245,158,11,0.10), 0 2px 6px rgba(0,0,0,0.05)", transform: "translateZ(10px)" }}
                  >
                    <p className="text-2xl font-black mb-1" style={{ color: ACCENT2 }}>{s.value}</p>
                    <p className="text-[11px] text-slate-500 font-medium leading-snug">{s.label}</p>
                  </motion.div>
                </Card3D>
              ))}
            </motion.div>
          </div>
        </div>

        {/* bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, #f9fafb, transparent)" }} />
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-24 px-6" style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Our Energy Audit Services</h2>
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
                    {/* hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                      style={{ background: `radial-gradient(circle at 20% 20%, ${svc.accent}15 0%, transparent 60%)` }} />

                    {/* number watermark */}
                    <div className="absolute top-3 right-4 text-7xl font-black pointer-events-none select-none leading-none"
                      style={{ color: `${svc.accent}0e`, transform: "translateZ(4px)" }}>
                      0{i + 1}
                    </div>

                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }} transition={{ duration: 0.45 }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${svc.accent}18` }}
                    >
                      <svc.icon className="h-5 w-5" style={{ color: svc.accent }} />
                    </motion.div>

                    <h3 className="font-bold text-[15px] text-slate-800 leading-snug mb-2">{svc.label}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{svc.desc}</p>

                    {/* bottom bar */}
                    <motion.div initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 h-[3px] origin-left"
                      style={{ background: `linear-gradient(90deg, ${svc.accent}, transparent)` }} />
                  </motion.div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 px-6" style={{ background: "linear-gradient(135deg,#fffbeb 0%,#fff7ed 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="inline-block text-amber-700 text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
                Why Mahadyuta
              </span>
              <h2 className="text-3xl font-bold text-slate-800 mb-6 leading-tight">
                The Smart Way to <span style={{ color: ACCENT2 }}>Cut Energy Costs</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Our energy audits deliver actionable intelligence — not just reports. We map every loss point, quantify the waste in kilowatts and currency, and give you a prioritised repair roadmap.
              </p>
              <ul className="flex flex-col gap-3">
                {WHY.map((w, i) => (
                  <motion.li
                    key={w}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                    {w}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* visual card */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Card3D style={{ borderRadius: 24 }}>
                <div className="rounded-3xl p-8 border"
                  style={{ background: "linear-gradient(135deg,#fffbeb,#fff7ed)", borderColor: "rgba(251,191,36,0.3)", boxShadow: "0 16px 48px rgba(245,158,11,0.14)", transform: "translateZ(12px)" }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)" }}>
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700 mb-3">Industry Impact</p>
                  <p className="text-4xl font-black text-slate-800 mb-1">₹2–5 Cr</p>
                  <p className="text-sm text-slate-500 mb-6">Typical annual savings for mid-size plant after audit</p>

                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Compressed Air Losses Eliminated", pct: 87 },
                      { label: "Steam Trap Failures Caught", pct: 93 },
                      { label: "Client Satisfaction Rate", pct: 98 },
                    ].map((bar, i) => (
                      <div key={bar.label}>
                        <div className="flex justify-between mb-1">
                          <span className="text-[11px] text-slate-600">{bar.label}</span>
                          <span className="text-[11px] font-bold" style={{ color: ACCENT2 }}>{bar.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-amber-100 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg,#f59e0b,#ea580c)" }}
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
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.25) 0%,transparent 65%)" }} />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow">Start Saving Energy Today</h2>
          <p className="text-white/80 mb-8 text-base">Schedule an on-site energy audit and uncover the hidden losses costing you lakhs every month.</p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="px-12 py-5 rounded-xl font-bold text-amber-700 bg-white text-sm flex items-center gap-2 mx-auto shadow-2xl"
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