import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, Search, BarChart3, FileText,
  CheckCircle2, TrendingDown, ChevronRight,
  Shield, Activity, Building2, Wifi,
  Network, Server, Monitor, Cable,
  AlertTriangle, Globe, Lock,
} from "lucide-react";

import heroImg    from "@/assets/service3.jpeg";
import sectionImg from "@/assets/service3.jpeg";

/* ═══════════════════════════════════════════════════════════
   STYLES  — same design tokens as all other service pages
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .un-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .un-page * { box-sizing: border-box; }

  /* ── Flicker ── */
  @keyframes un-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% {
      opacity: 1;
      text-shadow: 0 0 8px rgba(245,158,11,0.85), 0 0 22px rgba(245,158,11,0.4);
    }
    20%,24%,55% { opacity: 0.35; text-shadow: none; }
  }
  @keyframes un-fade-in {
    0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.13em; }
    60%  { opacity: 0.85; }
    100% { opacity: 1;  transform: translateY(0);  letter-spacing: 0.04em; }
  }
  .un-flicker {
    opacity: 0;
    animation:
      un-fade-in  1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
      un-flicker  4s  ease-in-out                   2s  infinite;
  }

  /* ── Hero ── */
  .un-hero {
    position: relative; overflow: hidden;
    min-height: 88vh; display: flex; align-items: center;
  }
  .un-hero-photo {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: brightness(0.62); pointer-events: none;
  }
  .un-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.88) 0%,
      rgba(224,242,254,0.80) 55%,
      rgba(255,251,235,0.88) 100%);
  }
  .un-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .un-hero-burst {
    position: absolute; pointer-events: none;
    width: 70vw; height: 70vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .un-hero-sky {
    position: absolute; pointer-events: none;
    width: 55vw; height: 55vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 45%, transparent 70%);
    bottom: -15%; right: -5%;
  }

  /* ── Two-column hero ── */
  .un-hero-inner {
    position: relative; max-width: 1280px; margin: 0 auto;
    padding: 80px 28px 72px; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
  }
  @media (max-width: 900px) {
    .un-hero-inner { grid-template-columns: 1fr; }
    .un-video-col { order: -1; }
  }

  /* ── Badge ── */
  .un-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(245,158,11,0.10); border: 1px solid rgba(245,158,11,0.35);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px;
  }

  /* ── Stat cards ── */
  .un-stat {
    background: rgba(255,255,255,0.82); border: 1px solid rgba(251,191,36,0.28);
    border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(10px);
    transition: border-color 0.2s, box-shadow 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .un-stat:hover { border-color: rgba(245,158,11,0.50); box-shadow: 0 6px 24px rgba(245,158,11,0.15); }
  .un-stat-num   { font-size: 26px; font-weight: 900; color: #ea580c; line-height: 1; }
  .un-stat-label { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 4px; }

  /* ── Breadcrumb ── */
  .un-bread { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; }
  .un-bread a { font-size: 12.5px; color: #64748b; text-decoration: none; transition: color 0.15s; }
  .un-bread a:hover { color: #f59e0b; }
  .un-bread-sep { color: #cbd5e1; }
  .un-bread-active { font-size: 12.5px; color: #334155; font-weight: 500; }

  /* ── Section badge ── */
  .un-section-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
    color: #b45309; font-size: 11px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;
  }

  /* ── Two-col grids ── */
  .un-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 900px) { .un-two-col { grid-template-columns: 1fr; gap: 36px; } }
  .un-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 767px) { .un-split { grid-template-columns: 1fr; } }

  /* ── Application cards ── */
  .un-app-card {
    background: #fff; border: 1px solid #eef0f4; border-radius: 16px;
    padding: 24px 20px; position: relative; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .un-app-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f59e0b, transparent); opacity: 0; transition: opacity 0.2s;
  }
  .un-app-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.28); transform: translateY(-4px); }
  .un-app-card:hover::before { opacity: 1; }
  .un-app-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 14px; }

  /* ── Process steps ── */
  .un-step {
    position: relative; background: #fff; border: 1px solid #eef0f4;
    border-radius: 16px; padding: 28px 24px; overflow: hidden;
    transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  }
  .un-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#f59e0b,transparent); opacity: 0; transition: opacity 0.22s; }
  .un-step:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.09); border-color: rgba(245,158,11,0.35); transform: translateY(-4px); }
  .un-step:hover::before { opacity: 1; }
  .un-step-num { font-size: 44px; font-weight: 900; color: rgba(245,158,11,0.10); line-height: 1; position: absolute; top: 14px; right: 16px; user-select: none; }
  .un-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(245,158,11,0.10); display: flex; align-items: center; justify-content: center; color: #f59e0b; margin-bottom: 16px; }

  /* ── Problem / solution ── */
  .un-problem-card  { background: #fff8f4; border: 1px solid rgba(245,158,11,0.18); border-left: 4px solid #f59e0b; border-radius: 14px; padding: 24px 20px; }
  .un-solution-card { background: #f0fdf4; border: 1px solid rgba(22,163,74,0.15);  border-left: 4px solid #16a34a; border-radius: 14px; padding: 24px 20px; }

  /* ── Image wrap ── */
  .un-img-wrap { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12); position: relative; }
  .un-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(245,158,11,0.08),transparent 60%); pointer-events: none; }
  .un-img-placeholder { width: 100%; background: linear-gradient(135deg,#fffbeb 0%,#fde68a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

  /* ── Highlight box ── */
  .un-highlight { background: linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius: 16px; padding: 24px 28px; color: #fff; box-shadow: 0 8px 28px rgba(245,158,11,0.28); }

  /* ── Industry pills ── */
  .un-industry-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid #fffbeb; border-radius: 10px;
    padding: 10px 16px; font-size: 13px; font-weight: 500; color: #334155;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .un-industry-pill:hover { border-color: #f59e0b; color: #b45309; background: #fffbeb; }
  .un-industry-dot { width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; flex-shrink: 0; }

  /* ── Buttons ── */
  .un-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#f59e0b,#b45309); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(245,158,11,0.35); }
  .un-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.50); }
  .un-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); color: #334155; font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; text-decoration: none; border: 1px solid rgba(251,191,36,0.28); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
  .un-btn-ghost:hover { border-color: #f59e0b; background: #fffbeb; color: #b45309; }

  /* ── Related links ── */
  .un-related { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border: 1px solid #eef0f4; border-radius: 12px; text-decoration: none; color: #334155; font-size: 13.5px; font-weight: 500; transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s; }
  .un-related:hover { border-color: rgba(245,158,11,0.35); color: #b45309; background: #fffbeb; transform: translateX(4px); }

  /* ── CTA ── */
  .un-cta { position: relative; overflow: hidden; background: linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .un-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.20) 0%,transparent 65%); top: -200px; right: -100px; pointer-events: none; }

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
    <div className="un-img-placeholder" style={{ height: fallbackHeight }}>
      <Network size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#64748b" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

/* ── Data ── */
const stats = [
  { num: "End-to-End", label: "Network design & implementation" },
  { num: "High",       label: "Performance data room solutions" },
  { num: "Unified",    label: "Voice, data & video on one network" },
];

const applications = [
  { icon: <Server size={19} />,   title: "Data Room Design & Build",        desc: "Planning and construction of high-performance data rooms tailored to enterprise growth — from rack layout to power, cooling and structured cabling." },
  { icon: <Network size={19} />,  title: "LAN / WAN Infrastructure",        desc: "Design and deployment of local and wide area network infrastructure — switches, routers, firewalls and managed connectivity for enterprise environments." },
  { icon: <Wifi size={19} />,     title: "Wireless Network Solutions",      desc: "Enterprise Wi-Fi planning, site surveys and deployment of high-density wireless networks for offices, warehouses and industrial facilities." },
  { icon: <Cable size={19} />,    title: "Structured Cabling Systems",      desc: "Cat6/Cat6A and fibre optic structured cabling installations for reliable, scalable physical network infrastructure across all building types." },
  { icon: <Monitor size={19} />,  title: "Unified Communications (UC)",     desc: "Integration of voice, video and messaging onto a single network platform — enabling seamless collaboration across offices and remote teams." },
  { icon: <Lock size={19} />,     title: "Network Security & Firewalls",    desc: "Implementation of next-generation firewalls, VPNs, network access control and security policies to protect enterprise IT assets." },
  { icon: <Globe size={19} />,    title: "Cloud & Internet Connectivity",   desc: "Managed internet links, SD-WAN and cloud connectivity solutions that ensure reliable, high-speed access for enterprise applications." },
  { icon: <Activity size={19} />, title: "Network Monitoring & Support",    desc: "Proactive network health monitoring, performance management and on-call technical support to keep your infrastructure running at peak performance." },
];

const processSteps = [
  { icon: <Search size={20} />,   title: "Needs Assessment & Planning",     desc: "We audit your existing infrastructure, understand growth plans and define the network architecture required to support your enterprise IT objectives." },
  { icon: <BarChart3 size={20}/>, title: "Design & Solution Proposal",      desc: "A detailed network design is produced — covering topology, hardware specification, cabling schedules, rack layouts and project timeline." },
  { icon: <Building2 size={20}/>, title: "Implementation & Commissioning",  desc: "Certified engineers install, configure and test all network components — structured cabling, active equipment, wireless access points and security appliances." },
  { icon: <FileText size={20} />, title: "Handover, Documentation & Support", desc: "Full as-built documentation, configuration backups and staff handover are provided. Ongoing managed support packages are available to keep your network optimised." },
];

const problemPoints = [
  "Rapid enterprise growth outpaces network capacity, causing bottlenecks and downtime",
  "Legacy infrastructure cannot support modern cloud, unified communications and IoT demands",
  "Poorly designed data rooms create single points of failure and cooling inefficiencies",
  "Unmanaged wireless networks deliver inconsistent coverage and security vulnerabilities",
  "IT managers spend reactive hours on network faults instead of strategic initiatives",
];
const solutionPoints = [
  "End-to-end network design built around your current needs and future growth trajectory",
  "High-performance data room solutions engineered for reliability, scalability and efficiency",
  "Unified voice, data and video on a single managed network platform",
  "Enterprise Wi-Fi with full site survey ensuring seamless coverage across every area",
  "Proactive monitoring and support to resolve issues before they impact operations",
];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Eliminate network bottlenecks and downtime limiting enterprise productivity"   },
  { icon: <Shield size={15} />,       label: "Protect IT assets with enterprise-grade network security and access control"    },
  { icon: <CheckCircle2 size={15} />, label: "Scale your infrastructure confidently to support future enterprise growth"      },
  { icon: <Activity size={15} />,     label: "Gain full visibility with proactive monitoring and performance management"      },
];
const relatedServices = [
  { label: "Thermal Monitoring & Automation Solutions",        path: "/services/thermal-monitoring"  },
  { label: "HT / HV Electrical Partial Discharge Detection",  path: "/services/partial-discharge"   },
  { label: "Slow Speed Bearing Condition Assessment",          path: "/services/bearing-condition"   },
  { label: "Air / Water Tight Integrity Assessment",           path: "/services/air-water-tight"     },
];
const industries = [
  "Banking & Finance", "IT & Data Centres", "Manufacturing",
  "Healthcare", "Education", "Retail & Logistics",
  "Government", "Hospitality",
];

/* ── Sub-components ── */
const AppCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="un-app-card fu">
      <div className="un-app-icon">{item.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
};
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="un-step fu">
      <div className="un-step-num">0{index + 1}</div>
      <div className="un-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const UnifiedNetworkCommunication = () => {
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
    <div className="un-page">
      <style>{css}</style>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="un-hero">
        <img src={heroImg} alt="" className="un-hero-photo" aria-hidden="true" />
        <div className="un-hero-wash" />
        <div className="un-hero-dots" />
        <div className="un-hero-burst" />
        <div className="un-hero-sky" />

        <div className="un-hero-inner">
          {/* ── LEFT copy ── */}
          <div>
            <div className="un-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="un-bread-active">Unified Network & Communication</span>
            </div>

            <div className="un-badge" style={{ marginBottom: 20 }}>
              <Network size={11} /> IT Infrastructure Solutions
            </div>

            <h1 style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Unified Network &<br />
              <span style={{
                background: "linear-gradient(90deg,#f59e0b 0%,#b45309 60%,#f59e0b 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Communication
              </span>
            </h1>

            <p className="un-flicker" style={{
              fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#b45309",
              letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14,
            }}>
              ⚡ Your network is the backbone of enterprise growth — build it right
            </p>

            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Enterprise growth and IT equipment have become so closely linked that{" "}
              <strong style={{ color: "#b45309" }}>planning and building a high-performance data room</strong> is one of the critical issues for IT managers today — we design, build and manage the network infrastructure your business depends on.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="un-btn-primary">Request a Consultation <ArrowRight size={16} /></Link>
              {/* <Link to="/services" className="un-btn-ghost">All Services</Link> */}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="un-stat" style={{ minWidth: 120 }}>
                  <div className="un-stat-num">{s.num}</div>
                  <div className="un-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT col placeholder ── */}
          <div className="un-video-col" />
        </div>
      </section>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="un-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="un-section-badge"><Zap size={11} /> What We Deliver</div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              Enterprise growth and IT infrastructure have become inseparable. We provide <strong style={{ color: "#1e293b" }}>end-to-end unified network and communication solutions</strong> — from high-performance data room design and structured cabling to enterprise Wi-Fi, unified communications and network security.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              Our certified engineers design networks that are <strong style={{ color: "#1e293b" }}>built around your business — its current size, its growth trajectory and its performance requirements</strong> — so your IT infrastructure never becomes the bottleneck that limits enterprise potential.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              From a single-site office network to a{" "}
              <strong style={{ color: "#b45309" }}>multi-site enterprise with mission-critical data rooms</strong>, we deliver the complete solution — design, supply, install, commission and support.
            </p>
            <div className="un-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Why a Unified Approach?</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                Voice, data, video and security on a single managed platform reduces complexity, cuts costs and gives IT managers <strong>complete visibility and control</strong> over every aspect of enterprise connectivity.
              </p>
            </div>
          </div>

          <div ref={refOverviewR} className="fu">
            <div className="un-img-wrap">
              <ImgWithFallback src={sectionImg} alt="Unified network and communication infrastructure" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Scope</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Design · Build · Manage · Support</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>End-to-end IT network infrastructure</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ APPLICATIONS ════════════════════ */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refAppHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="un-section-badge" style={{ margin: "0 auto 12px" }}><Network size={11} /> Solutions</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Network & Communication Services We Provide</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>A complete portfolio of enterprise network solutions — from the physical layer to the cloud edge.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default UnifiedNetworkCommunication;