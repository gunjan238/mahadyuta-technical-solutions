


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Eye, Award, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg"; // reuse the same hero image

const values = [
  { icon: Target, label: "Mission",  desc: "Deliver cost-effective reliability solutions" },
  { icon: Eye,    label: "Vision",   desc: "Be the leading industrial reliability partner in India" },
  { icon: Award,  label: "Quality",  desc: "World-class products & certified training" },
  { icon: Users,  label: "Clients",  desc: "35+ major industrial clients across India" },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const About = () => (
  <>
    {/* ═══════════════════════════════ HERO ═══════════════════════════════
        Background: same hero-bg.jpg brightened via overlay.
        Warm white-to-sky gradient (matches Index hero), amber sunburst,
        deep-slate heading for legibility on light backdrop.
    ═══════════════════════════════════════════════════════════════════════ */}
    <section className="relative overflow-hidden min-h-[380px] flex items-center">

      {/* Photo layer */}
      <img
        src={heroBg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover brightness-[0.60]"
      />

      {/* Warm-sky colour wash — same values as Index hero */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,251,235,0.86) 0%, rgba(224,242,254,0.78) 55%, rgba(255,251,235,0.86) 100%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Amber sunburst top-left */}
      <div
        className="absolute top-[-20%] left-[-8%] w-[60vw] h-[60vw] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.20) 0%, rgba(251,191,36,0.07) 45%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Sky glow bottom-right */}
      <div
        className="absolute bottom-[-15%] right-[-5%] w-[45vw] h-[45vw] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.16) 0%, rgba(56,189,248,0.05) 50%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative container-narrow py-20 md:py-28 px-4"
      >
        <motion.span
          variants={fadeUp}
          className="inline-block text-amber-700 font-semibold text-xs uppercase tracking-widest mb-4 px-3 py-1 bg-amber-50/90 border border-amber-200 rounded-full shadow-sm"
        >
          About Us
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight"
          style={{ color: "#1e293b" }}
        >
          Mahadyuta{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, #f59e0b 0%, #ea580c 60%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Technical Solutions
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg text-slate-600 max-w-2xl"
        >
          A trusted partner in industrial reliability, predictive analytics,
          energy optimization, safety and environment protection.
        </motion.p>
      </motion.div>
    </section>

    {/* ═══════════════════════════════ OVERVIEW ════════════════════════════ */}
    <section
      className="section-padding"
      style={{ background: "linear-gradient(160deg, #fafaf9 0%, #f0f9ff 100%)" }}
    >
      <div className="container-narrow">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-2 gap-14 items-center"
        >
          {/* Left copy */}
          <motion.div variants={fadeUp}>
            <span className="inline-block text-amber-700 font-semibold text-xs uppercase tracking-widest mb-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
              Our Story
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-800 mb-6">
              Improving Industrial Reliability Since Day One
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              Mahadyuta Technical Solutions Pvt. Ltd. adds value by improving
              the reliability of industrial machinery and equipment with unique,
              cost-effective and advance technical products and services.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              We specialize in energy optimization services, predictive
              analytics, industrial automation, and professional training in
              collaboration with international partners including SONOTEC
              (Germany), SenseGrow (USA), and Mobius Institute (Australia).
            </p>
            <p className="text-slate-500 leading-relaxed">
              Our team of experts delivers tailored solutions to industries
              including oil &amp; gas, power generation, cement, steel,
              chemicals, and manufacturing.
            </p>
          </motion.div>

          {/* Right value cards */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all border border-slate-100 hover:border-amber-300 group"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3 transition-all"
                  style={{ background: "rgba(251,191,36,0.12)" }}
                >
                  <item.icon
                    className="h-5 w-5 transition-colors"
                    style={{ color: "#f59e0b" }}
                  />
                </div>
                <h3 className="font-heading font-semibold text-slate-800 mb-1">
                  {item.label}
                </h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* ═══════════════════════════════ CTA ═════════════════════════════════ */}
    {/* <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden section-padding text-center"
      style={{
        background:
          "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ea580c 100%)",
      }}
    >
      
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.22) 0%, transparent 65%)",
        }}
      />

      <div className="relative py-16">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6 drop-shadow">
          Let's Discuss Your Requirements
        </h2>
        <Link to="/contact">
          <Button
            size="lg"
            className="bg-white text-amber-700 hover:bg-amber-50 font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all px-10"
          >
            Contact Us <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </motion.section> */}
  </>
);

export default About;