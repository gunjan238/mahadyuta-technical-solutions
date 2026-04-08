import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowLeft, Shield, Network, Cloud, Camera, Server, CheckCircle2 } from "lucide-react";

const ACCENT  = "#f97316";
const ACCENT2 = "#ea580c";

const TAGLINE = "ALWAYS ON. ALWAYS AWARE.";
const SUBTITLE =
  "A unified IIoT platform that continuously monitors your assets, connects your plant intelligence to the cloud, and ensures 24/7 visibility across all critical systems.";

const SERVICES = [
  {
    icon: Network,
    label: "Unified Network & Communication",
    desc: "Design and deployment of plant-wide industrial networking infrastructure — wired and wireless — engineered for reliability in harsh environments.",
    accent: "#f59e0b",
    tag: "Networking",
  },
  {
    icon: Cloud,
    label: "Cloud Services",
    desc: "Secure cloud integration for remote access, data storage, analytics dashboards, and real-time KPI visualisation across multi-site operations.",
    accent: "#ea580c",
    tag: "Cloud",
  },
  {
    icon: Camera,
    label: "Surveillance & Access Control",
    desc: "IP camera networks, thermal perimeter surveillance, and smart access control systems integrated into your SCADA and BMS.",
    accent: "#f97316",
    tag: "Security",
  },
  {
    icon: Server,
    label: "Backup Facility",
    desc: "Redundant data backup, failover architectures, and disaster recovery planning to ensure zero data loss and maximum system uptime.",
    accent: "#fb923c",
    tag: "Resilience",
  },
];

const STATS = [
  { value: "24/7", label: "Continuous asset monitoring" },
  { value: "99.9%", label: "Platform uptime SLA" },
  { value: "< 1s", label: "Alert response latency" },
  { value: "∞", label: "Scalable sensor nodes" },
];

const STACK = [
  { layer: "Sensor Layer", desc: "Ultrasound, vibration, thermal, PD sensors on assets", icon: "🔌" },
  { layer: "Edge Layer", desc: "On-premise edge gateways for local processing & buffering", icon: "📦" },
  { layer: "Network Layer", desc: "Industrial Ethernet, Wi-Fi 6, or LoRaWAN fabric", icon: "🌐" },
  { layer: "Cloud Layer", desc: "Secure cloud platform with AI analytics & dashboards", icon: "☁️" },
];

const WHY = [
  "Turnkey deployment — design, install, commission, support",
  "Compatible with existing SCADA / DCS / BMS systems",
  "Cybersecurity hardened — IEC 62443 compliant architecture",
  "Mobile-ready dashboards for on-the-go plant visibility",
  "Scalable from single machine to full multi-plant network",
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

export default function IIoTBasedCBM() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden min-h-[72vh] flex items-center"
        style={{ background: "linear-gradient(155deg, #fffbeb 0%, #fff7ed 50%, #fef3c7 100%)" }}
      >
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute pointer-events-none"
          style={{ width: 620, height: 620, top: -200, right: -120, borderRadius: "50%", background: "radial-gradient(circle,rgba(251,191,36,0.22) 0%,transparent 70%)" }} />
        <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute pointer-events-none"
          style={{ width: 380, height: 380, bottom: -100, left: -80, borderRadius: "50%", background: "radial-gradient(circle,rgba(234,88,12,0.14) 0%,transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#92400e 1px,transparent 0)", backgroundSize: "36px 36px" }} />

        {/* animated connection lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute h-px"
              style={{ top: `${20 + i * 18}%`, left: 0, right: 0, background: `linear-gradient(90deg,transparent,${ACCENT},transparent)` }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8, ease: "linear" }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
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
                style={{ fontSize: "clamp(1.8rem, 4.2vw, 3.2rem)" }}
              >
                IIoT-Based{" "}
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  style={{ background: "linear-gradient(90deg,#f59e0b,#ea580c,#f97316,#f59e0b)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}
                >
                  CBM
                </motion.span>
                <br />
                <span className="text-slate-700" style={{ fontSize: "0.7em" }}>Condition-Based Monitoring</span>
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
                    Plan My IIoT Setup <ArrowRight className="h-4 w-4" />
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
                    style={{ background: "rgba(255,255,255,0.92)", borderColor: "rgba(251,191,36,0.30)", boxShadow: "0 8px 28px rgba(245,158,11,0.10), 0 2px 6px rgba(0,0,0,0.05)", transform: "translateZ(10px)" }}
                  >
                    <p className="text-2xl font-black mb-1" style={{ color: ACCENT2 }}>{s.value}</p>
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

      {/* ── TECH STACK ── */}
      <section className="py-20 px-6 border-b border-slate-100" style={{ background: "#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-600 mb-2">Our IIoT Architecture</p>
            <h2 className="text-2xl font-bold text-slate-800">Four-Layer Platform Design</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 relative">
            {/* connector line */}
            <div className="absolute hidden md:block top-1/2 left-0 right-0 h-px -translate-y-1/2 pointer-events-none"
              style={{ background: "linear-gradient(90deg,transparent,rgba(245,158,11,0.4),rgba(234,88,12,0.3),transparent)" }} />

            {STACK.map((t, i) => (
              <motion.div
                key={t.layer}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="bg-white rounded-2xl p-5 text-center border shadow-sm relative"
                  style={{ borderColor: "rgba(245,158,11,0.25)", boxShadow: "0 4px 18px rgba(245,158,11,0.08)" }}
                >
                  <div className="w-8 h-8 rounded-full text-xs font-black flex items-center justify-center mx-auto mb-3"
                    style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)", color: "#fff" }}>
                    {i + 1}
                  </div>
                  <div className="text-2xl mb-2">{t.icon}</div>
                  <p className="font-bold text-[13px] text-slate-800 mb-1">{t.layer}</p>
                  <p className="text-[11px] text-slate-400 leading-snug">{t.desc}</p>
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
            <span className="inline-block text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
              Platform Modules
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-700">What Our CBM Platform Covers</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.label}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
              >
                <Card3D style={{ borderRadius: 20, height: "100%" }}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group bg-white rounded-2xl p-7 border border-slate-100 shadow-md h-full relative overflow-hidden flex gap-5"
                    style={{ transform: "translateZ(0)" }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                      style={{ background: `radial-gradient(circle at 10% 50%,${svc.accent}12 0%,transparent 60%)` }} />

                    {/* icon column */}
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }} transition={{ duration: 0.45 }}
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${svc.accent}18` }}
                      >
                        <svc.icon className="h-5 w-5" style={{ color: svc.accent }} />
                      </motion.div>
                    </div>

                    {/* text */}
                    <div>
                      <span className="inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2"
                        style={{ background: `${svc.accent}15`, color: svc.accent }}>
                        {svc.tag}
                      </span>
                      <h3 className="font-bold text-[15px] text-slate-800 leading-snug mb-2">{svc.label}</h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed">{svc.desc}</p>
                    </div>

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
      <section className="py-24 px-6" style={{ background: "linear-gradient(135deg,#fffbeb 0%,#fff7ed 100%)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-amber-700 text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
              Why Mahadyuta IIoT
            </span>
            <h2 className="text-3xl font-bold text-slate-800 mb-6 leading-tight">
              Your Plant. Connected.<br /><span style={{ color: ACCENT2 }}>Intelligent. Secure.</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              We don't just install sensors — we build you an industrial nervous system. From edge intelligence to cloud dashboards, every layer is engineered for uptime, security, and scale.
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

          {/* visual */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Card3D style={{ borderRadius: 24 }}>
              <div className="rounded-3xl p-8 border"
                style={{ background: "linear-gradient(135deg,#fffbeb,#fff7ed)", borderColor: "rgba(251,191,36,0.30)", boxShadow: "0 16px 48px rgba(245,158,11,0.14)", transform: "translateZ(12px)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)" }}>
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700 mb-3">Platform Performance</p>
                <p className="text-4xl font-black text-slate-800 mb-1">99.9%</p>
                <p className="text-sm text-slate-500 mb-6">System uptime across all deployed client installations</p>

                <div className="flex flex-col gap-3">
                  {[
                    { label: "Alert Response Time < 1s", pct: 99 },
                    { label: "Data Integrity & Accuracy", pct: 99 },
                    { label: "Deployment Success Rate", pct: 100 },
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
      </section>

      {/* ── CTA ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.25) 0%,transparent 65%)" }} />

        {/* pulsing rings */}
        {[80, 160, 240].map((r, i) => (
          <motion.div
            key={r}
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.04, 0.08] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white pointer-events-none"
            style={{ width: r * 3, height: r * 3, opacity: 0.08 }}
          />
        ))}

        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow">Connect Your Plant to the Future</h2>
          <p className="text-white/80 mb-8 text-base">Let us architect a fully integrated IIoT-based condition monitoring solution tailored to your facility.</p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="px-12 py-5 rounded-xl font-bold text-amber-700 bg-white text-sm flex items-center gap-2 mx-auto shadow-2xl"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}
            >
              Contact Us Today <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </div>
      </motion.section>

    </motion.div>
  );
}