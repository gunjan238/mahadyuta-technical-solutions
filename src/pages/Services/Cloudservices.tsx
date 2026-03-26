import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, Search, BarChart3, FileText,
  CheckCircle2, TrendingDown, ChevronRight,
  Shield, Activity, Building2,
  Cloud, Server, Monitor, Lock,
  AlertTriangle, Globe, Database, Cpu,
} from "lucide-react";

import heroImg    from "@/assets/service2.jpeg";
import sectionImg from "@/assets/service2.jpeg";

/* ═══════════════════════════════════════════════════════════
   STYLES  — same design tokens as all other service pages
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .cs-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .cs-page * { box-sizing: border-box; }

  /* ── Flicker ── */
  @keyframes cs-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% {
      opacity: 1;
      text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
    }
    20%,24%,55% { opacity: 0.35; text-shadow: none; }
  }
  @keyframes cs-fade-in {
    0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
    60%  { opacity: 0.85; }
    100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
  }
  .cs-flicker {
    opacity: 0;
    animation:
      cs-fade-in  1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
      cs-flicker  4s  ease-in-out                   2s  infinite;
  }

  /* ── Hero ── */
  .cs-hero {
    position: relative; overflow: hidden;
    min-height: 88vh; display: flex; align-items: center;
  }
  .cs-hero-photo {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.62); pointer-events: none;
  }
  .cs-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.88) 0%,
      rgba(224,242,254,0.80) 55%,
      rgba(255,251,235,0.88) 100%);
  }
  .cs-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .cs-hero-burst {
    position: absolute; pointer-events: none;
    width: 70vw; height: 70vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .cs-hero-sky {
    position: absolute; pointer-events: none;
    width: 55vw; height: 55vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
    bottom: -15%; right: -5%;
  }

  /* ── Two-column hero ── */
  .cs-hero-inner {
    position: relative; max-width: 1280px; margin: 0 auto;
    padding: 80px 28px 72px; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
  }
  @media (max-width: 900px) {
    .cs-hero-inner { grid-template-columns: 1fr; }
    .cs-video-col { order: -1; }
  }

  /* ── Badge ── */
  .cs-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.10); border: 1px solid rgba(245,158,11,0.35);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px;
  }

  /* ── Stat cards ── */
  .cs-stat {
    background: rgba(255,255,255,0.82); border: 1px solid rgba(251,191,36,0.28);
    border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .cs-stat:hover { border-color: rgba(245,158,11,0.50); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
  .cs-stat-num   { font-size: 26px; font-weight: 900; color: #ea580c; line-height: 1; }
  .cs-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }

  /* ── Breadcrumb ── */
  .cs-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
  .cs-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
  .cs-bread a:hover { color: #f59e0b; }
  .cs-bread-sep { color: #cbd5e1; }
  .cs-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

  /* ── Section badge ── */
  .cs-section-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
  }

  /* ── Two-col grids ── */
  .cs-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .cs-two-col { grid-template-columns: 1fr; gap: 36px; } }
  .cs-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 767px) { .cs-split { grid-template-columns: 1fr; } }

  /* ── Application cards ── */
  .cs-app-card {
    background: #fff; border: 1px solid #eef0f4; border-radius: 16px;
    padding: 24px 20px; position: relative; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .cs-app-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f59e0b, transparent); opacity: 0; transition: opacity 0.2s;
  }
  .cs-app-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.28); transform: translateY(-4px); }
  .cs-app-card:hover::before { opacity: 1; }
  .cs-app-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 14px; }

  /* ── Process steps ── */
  .cs-step {
    position: relative; background: #fff; border: 1px solid #eef0f4;
    border-radius: 16px; padding: 28px 24px; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .cs-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#f59e0b,transparent); opacity: 0; transition: opacity 0.22s; }
  .cs-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.35); transform: translateY(-4px); }
  .cs-step:hover::before { opacity: 1; }
  .cs-step-num { font-size: 44px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 14px; right: 16px; user-select: none; }
  .cs-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }

  /* ── Problem / solution ── */
  .cs-problem-card  { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
  .cs-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15);  border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }

  /* ── Image wrap ── */
  .cs-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
  .cs-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(245,158,11,0.08),transparent 60%); pointer-events: none; }
  .cs-img-placeholder { width: 100%; background: linear-gradient(135deg,#fffbeb 0%,#fde68a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

  /* ── Highlight box ── */
  .cs-highlight { background: linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }

  /* ── Industry pills ── */
  .cs-industry-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid #fffbeb; border-radius: 10px;
    padding: 10px 16px; font-size: 13px; font-weight: 500; color: #334155;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .cs-industry-pill:hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
  .cs-industry-dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }

  /* ── Buttons ── */
  .cs-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#f59e0b,#b45309); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
  .cs-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.50); }
  .cs-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); color: #334155; font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(251,191,36,0.28); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
  .cs-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }

  /* ── Related links ── */
  .cs-related { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border: 1px solid #eef0f4; border-radius: 12px; text-decoration: none; color: #334155; font-size: 13.5px; font-weight: 500; transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
  .cs-related:hover { border-color: rgba(245,158,11,0.35); color: #b45309; background: #fffbeb; transform: translateX(4px); }

  /* ── CTA ── */
  .cs-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .cs-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.20) 0%,transparent 65%); top: -200px; right: -100px; pointer-events: none; }

  /* ── Fade up ── */
  .fu { opacity: 0; transform: translateY(22px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .fu.vis { opacity: 1; transform: translateY(0); }
`;

/* ── Hooks ── */
const useFU = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("vis"), delay); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

/* ── Image fallback ── */
const ImgWithFallback = ({ src, alt, style, fallbackHeight = 440 }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="cs-img-placeholder" style={{ height: fallbackHeight }}>
      <Cloud size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#64748b" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ── Data ── */
const stats = [
  { num: "Wide",   label: "Choice of cloud configurations"       },
  { num: "Thin",   label: "Client — low-cost efficient networks"  },
  { num: "100%",   label: "Customizable certified workstations"   },
];

const applications = [
  { icon: <Cloud size={19} />,    title: "Public Cloud Solutions",          desc: "Deployment and management of workloads on leading public cloud platforms — AWS, Azure and Google Cloud — with right-sizing, cost optimisation and governance." },
  { icon: <Server size={19} />,   title: "Private Cloud Infrastructure",    desc: "Design and build of private cloud environments using hyper-converged infrastructure, giving enterprises full control over data, security and performance." },
  { icon: <Database size={19} />, title: "Hybrid Cloud Architecture",       desc: "Seamless integration of on-premise and cloud workloads into a unified hybrid architecture — enabling flexibility, data sovereignty and elastic scalability." },
  { icon: <Monitor size={19} />,  title: "Thin Client Deployments",         desc: "Low-cost, highly efficient thin client computer network solutions — reducing hardware spend and simplifying centralised management across the enterprise." },
  { icon: <Cpu size={19} />,      title: "High-Performance Workstations",   desc: "Highest performing, fully customisable workstations certified with professional applications for engineering, design, media and data-intensive workloads." },
  { icon: <Globe size={19} />,    title: "Cloud Migration Services",        desc: "End-to-end cloud migration planning and execution — assessing, replatforming and migrating applications and data with minimal downtime and risk." },
  { icon: <Lock size={19} />,     title: "Cloud Security & Compliance",     desc: "Implementation of cloud security frameworks, identity management, data encryption and compliance controls for regulated industries." },
  { icon: <Activity size={19} />, title: "Cloud Monitoring & Management",   desc: "Proactive monitoring, performance optimisation and cost management of cloud environments — ensuring reliability and value at every stage of the cloud journey." },
];

const processSteps = [
  { icon: <Search size={20} />,   title: "Cloud Readiness Assessment",     desc: "We evaluate your current IT environment, workloads and business objectives to identify the optimal cloud strategy — public, private, hybrid or thin client." },
  { icon: <BarChart3 size={20}/>, title: "Solution Design & Sizing",        desc: "A detailed cloud architecture is designed — covering infrastructure sizing, configuration options, licensing, security controls and total cost of ownership." },
  { icon: <Cloud size={20} />,    title: "Deployment & Migration",          desc: "Certified cloud engineers deploy, configure and migrate workloads — with rigorous testing at every stage to ensure performance, security and zero data loss." },
  { icon: <FileText size={20} />, title: "Handover, Training & Support",    desc: "Full documentation, administrator training and ongoing managed cloud support ensure your team can operate and scale the environment with confidence." },
];

const problemPoints = [
  "Legacy on-premise infrastructure cannot scale with enterprise growth demands",
  "High hardware refresh costs consume IT budget that could drive business value",
  "Fragmented IT environments create security gaps and compliance risk",
  "Thin client and workstation fleets become expensive to manage and maintain at scale",
  "Migration complexity and downtime risk deter organisations from modernising",
];
const solutionPoints = [
  "Wide choice of cloud configurations built on the latest technology",
  "Thin client products deliver strong, low-cost, highly efficient computer networks",
  "Highest performing, fully customisable workstations certified with professional applications",
  "Hybrid cloud architectures give flexibility while maintaining data sovereignty",
  "Managed migration with zero data loss and minimal business disruption",
];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Reduce infrastructure costs with right-sized cloud and thin client solutions"  },
  { icon: <Shield size={15} />,       label: "Strengthen security posture with cloud-native compliance and access controls"   },
  { icon: <CheckCircle2 size={15} />, label: "Scale compute and storage instantly to match enterprise growth"                 },
  { icon: <Activity size={15} />,     label: "Gain full cloud visibility with proactive monitoring and cost management"       },
];
const relatedServices = [
  { label: "Unified Network & Communication",                  path: "/services/unified-network"     },
  { label: "Thermal Monitoring & Automation Solutions",        path: "/services/thermal-monitoring"  },
  { label: "HT / HV Electrical Partial Discharge Detection",  path: "/services/partial-discharge"   },
  { label: "Air / Water Tight Integrity Assessment",           path: "/services/air-water-tight"     },
];
const industries = [
  "Banking & Finance", "IT & SaaS", "Healthcare",
  "Manufacturing", "Education", "Media & Design",
  "Government", "Retail & E-commerce",
];

/* ── Sub-components ── */
const AppCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="cs-app-card fu">
      <div className="cs-app-icon">{item.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
};
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="cs-step fu">
      <div className="cs-step-num">0{index + 1}</div>
      <div className="cs-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const CloudServices = () => {
  const refOverviewL = useFU(0);
  const refOverviewR = useFU(100);
  const refAppHead   = useFU(0);
  const refProbHead  = useFU(0);
  const refProbL     = useFU(0);
  const refProbR     = useFU(100);
  const refProcHead  = useFU(0);
  const refIndL      = useFU(0);
  const refIndR      = useFU(100);
  const refRelated   = useFU(0);

  return (
    <div className="cs-page">
      <style>{css}</style>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="cs-hero">
        <img src={heroImg} alt="" className="cs-hero-photo" aria-hidden="true" />
        <div className="cs-hero-wash" />
        <div className="cs-hero-dots" />
        <div className="cs-hero-burst" />
        <div className="cs-hero-sky" />

        <div className="cs-hero-inner">
          {/* ── LEFT copy ── */}
          <div>
            <div className="cs-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="cs-bread-active">Cloud Services</span>
            </div>

            <div className="cs-badge" style={{ marginBottom: 20 }}>
              <Cloud size={11} /> Cloud & IT Infrastructure
            </div>

            <h1 style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Cloud<br />
              <span style={{
                background: "linear-gradient(90deg,#f59e0b 0%,#b45309 60%,#f59e0b 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Services
              </span>
            </h1>

            <p className="cs-flicker" style={{
              fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#b45309",
              letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
            }}>
              ⚡ The right cloud configuration transforms how your business performs
            </p>

            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              A wide choice of{" "}
              <strong style={{ color: "#b45309" }}>configurations built on the latest technology</strong> — thin client products for strong, low-cost, highly efficient computer networks, and{" "}
              <strong style={{ color: "#b45309" }}>highest performing, fully customisable workstations</strong> certified with professional applications.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="cs-btn-primary">Request a Consultation <ArrowRight size={16} /></Link>
              {/* <Link to="/services" className="cs-btn-ghost">All Services</Link> */}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="cs-stat" style={{ minWidth: 120 }}>
                  <div className="cs-stat-num">{s.num}</div>
                  <div className="cs-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT col placeholder ── */}
          <div className="cs-video-col" />
        </div>
      </section>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="cs-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="cs-section-badge"><Zap size={11} /> What We Deliver</div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              We offer a <strong style={{ color: "#1e293b" }}>wide choice of cloud configurations</strong> built on the latest technology — from public and private cloud deployments to hybrid architectures that integrate seamlessly with your existing infrastructure.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              Our <strong style={{ color: "#1e293b" }}>thin client solutions</strong> deliver strong, low-cost, highly efficient computer networks ideal for enterprises looking to centralise management and reduce hardware spend. For power users, our{" "}
              <strong style={{ color: "#1e293b" }}>high-performance workstations</strong> are fully customisable and certified with professional applications.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              Whether you are migrating to the cloud for the first time or optimising an existing multi-cloud environment, we provide the{" "}
              <strong style={{ color: "#b45309" }}>expertise, technology and ongoing support</strong> to ensure your cloud investment delivers measurable business value.
            </p>
            <div className="cs-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Why Cloud with Us?</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                We are vendor-agnostic — our recommendations are driven entirely by <strong>what is right for your workloads and your budget</strong>, not by platform partnerships. Every configuration is designed and validated by certified cloud engineers.
              </p>
            </div>
          </div>

          <div ref={refOverviewR} className="fu">
            <div className="cs-img-wrap">
              <ImgWithFallback src={sectionImg} alt="Cloud services and infrastructure solutions" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Scope</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Public · Private · Hybrid · Thin Client · Workstation</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Vendor-agnostic · Latest technology configurations</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ APPLICATIONS ════════════════════ */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refAppHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="cs-section-badge" style={{ margin: "0 auto 12px" }}><Cloud size={11} /> Solutions</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Cloud & Workstation Services We Provide</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>From thin client networks and custom workstations to full-scale cloud migration and managed cloud operations.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default CloudServices;