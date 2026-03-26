import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, Search, BarChart3, FileText,
  CheckCircle2, TrendingDown, ChevronRight,
  Shield, Activity, Building2,
  Camera, Lock, Eye, Radio,
  AlertTriangle, Fingerprint, KeyRound, ScanLine,
} from "lucide-react";

import heroImg    from "@/assets/service1.jpeg";
import sectionImg from "@/assets/service1.jpeg";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .sa-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .sa-page * { box-sizing: border-box; }

  @keyframes sa-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% { opacity:1; text-shadow:0 0 8px rgba(245,158,11,0.85),0 0 22px rgba(245,158,11,0.4); }
    20%,24%,55% { opacity:0.35; text-shadow:none; }
  }
  @keyframes sa-fade-in {
    0%   { opacity:0; transform:translateY(6px); letter-spacing:0.13em; }
    60%  { opacity:0.85; }
    100% { opacity:1; transform:translateY(0); letter-spacing:0.04em; }
  }
  .sa-flicker { opacity:0; animation: sa-fade-in 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards, sa-flicker 4s ease-in-out 2s infinite; }

  .sa-hero { position:relative; overflow:hidden; min-height:88vh; display:flex; align-items:center; }
  .sa-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; filter:brightness(0.62); pointer-events:none; }
  .sa-hero-wash { position:absolute; inset:0; background:linear-gradient(120deg, rgba(255,251,235,0.88) 0%, rgba(224,242,254,0.80) 55%, rgba(255,251,235,0.88) 100%); }
  .sa-hero-dots { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .sa-hero-burst { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,0.22) 0%,rgba(251,191,36,0.08) 40%,transparent 70%); top:-15%; left:-8%; }
  .sa-hero-sky { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.18) 0%,rgba(56,189,248,0.06) 45%,transparent 70%); bottom:-15%; right:-5%; }

  .sa-hero-inner { position:relative; max-width:1280px; margin:0 auto; padding:80px 28px 72px; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
  @media(max-width:900px){ .sa-hero-inner{grid-template-columns:1fr;} .sa-video-col{order:-1;} }

  .sa-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,0.10); border:1px solid rgba(245,158,11,0.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; }

  .sa-stat { background:rgba(255,255,255,0.82); border:1px solid rgba(251,191,36,0.28); border-radius:14px; padding:16px 20px; backdrop-filter:blur(10px); transition:border-color 0.2s,box-shadow 0.2s; box-shadow:0 2px 12px rgba(0,0,0,0.06); }
  .sa-stat:hover { border-color:rgba(245,158,11,0.50); box-shadow:0 6px 24px rgba(245,158,11,0.15); }
  .sa-stat-num { font-size:26px; font-weight:900; color:#ea580c; line-height:1; }
  .sa-stat-label { font-size:11px; color:#64748b; font-weight:500; margin-top:4px; }

  .sa-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:28px; }
  .sa-bread a { font-size:12.5px; color:#64748b; text-decoration:none; transition:color 0.15s; }
  .sa-bread a:hover { color:#f59e0b; }
  .sa-bread-active { font-size:12.5px; color:#334155; font-weight:500; }

  .sa-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }

  .sa-two-col { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
  @media(max-width:900px){ .sa-two-col{grid-template-columns:1fr;gap:36px;} }
  .sa-split { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
  @media(max-width:767px){ .sa-split{grid-template-columns:1fr;} }

  .sa-app-card { background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:24px 20px; position:relative; overflow:hidden; transition:box-shadow 0.22s,border-color 0.22s,transform 0.22s; }
  .sa-app-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,transparent); opacity:0; transition:opacity 0.2s; }
  .sa-app-card:hover { box-shadow:0 10px 36px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.28); transform:translateY(-4px); }
  .sa-app-card:hover::before { opacity:1; }
  .sa-app-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:14px; }

  .sa-step { position:relative; background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:28px 24px; overflow:hidden; transition:box-shadow 0.22s,border-color 0.22s,transform 0.22s; }
  .sa-step::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,transparent); opacity:0; transition:opacity 0.22s; }
  .sa-step:hover { box-shadow:0 10px 36px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.35); transform:translateY(-4px); }
  .sa-step:hover::before { opacity:1; }
  .sa-step-num { font-size:44px; font-weight:900; color:rgba(245,158,11,0.10); line-height:1; position:absolute; top:14px; right:16px; user-select:none; }
  .sa-step-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:16px; }

  .sa-problem-card { background:#fff8f4; border:1px solid rgba(245,158,11,0.18); border-left:4px solid #f59e0b; border-radius:14px; padding:24px 20px; }
  .sa-solution-card { background:#f0fdf4; border:1px solid rgba(22,163,74,0.15); border-left:4px solid #16a34a; border-radius:14px; padding:24px 20px; }

  .sa-img-wrap { border-radius:20px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.12); position:relative; }
  .sa-img-wrap::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(245,158,11,0.08),transparent 60%); pointer-events:none; }
  .sa-img-placeholder { width:100%; background:linear-gradient(135deg,#fffbeb 0%,#fde68a 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; }

  .sa-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:16px; padding:24px 28px; color:#fff; box-shadow:0 8px 28px rgba(245,158,11,0.28); }

  .sa-industry-pill { display:inline-flex; align-items:center; gap:8px; background:#fff; border:1px solid #fffbeb; border-radius:10px; padding:10px 16px; font-size:13px; font-weight:500; color:#334155; transition:border-color 0.15s,color 0.15s,background 0.15s; }
  .sa-industry-pill:hover { border-color:#f59e0b; color:#b45309; background:#fffbeb; }
  .sa-industry-dot { width:7px; height:7px; border-radius:50%; background:#f59e0b; flex-shrink:0; }

  .sa-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#b45309); color:#fff; font-size:15px; font-weight:700; padding:14px 28px; border-radius:12px; text-decoration:none; border:none; cursor:pointer; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 20px rgba(245,158,11,0.35); }
  .sa-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.50); }
  .sa-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:15px; font-weight:500; padding:14px 28px; border-radius:12px; text-decoration:none; border:1px solid rgba(251,191,36,0.28); cursor:pointer; transition:border-color 0.2s,background 0.2s,color 0.2s; }
  .sa-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  .sa-related { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; background:#fff; border:1px solid #eef0f4; border-radius:12px; text-decoration:none; color:#334155; font-size:13.5px; font-weight:500; transition:border-color 0.15s,color 0.15s,background 0.15s,transform 0.15s; }
  .sa-related:hover { border-color:rgba(245,158,11,0.35); color:#b45309; background:#fffbeb; transform:translateX(4px); }

  .sa-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .sa-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.20) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }

  .fu { opacity:0; transform:translateY(22px); transition:opacity 0.55s ease,transform 0.55s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }
`;

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

const ImgWithFallback = ({ src, alt, style, fallbackHeight = 440 }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="sa-img-placeholder" style={{ height: fallbackHeight }}>
      <Camera size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#64748b" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

const stats = [
  { num: "Zero",  label: "Compromised areas"               },
  { num: "360°",  label: "Perimeter beyond expected scope"  },
  { num: "24/7",  label: "Continuous surveillance coverage" },
];

const applications = [
  { icon: <Camera size={19} />,      title: "CCTV & IP Surveillance",          desc: "Design and installation of HD/4K IP camera systems with intelligent video analytics, remote monitoring and cloud or on-premise recording solutions." },
  { icon: <KeyRound size={19} />,    title: "Access Control Systems",          desc: "Electronic access control for doors, gates and barriers — card readers, PIN keypads and mobile credentials managing who enters, when and where." },
  { icon: <Fingerprint size={19} />, title: "Biometric Access Solutions",      desc: "Fingerprint, facial recognition and iris-based biometric access systems for high-security zones requiring verified, credential-free entry." },
  { icon: <ScanLine size={19} />,    title: "Perimeter Security",              desc: "We establish a security perimeter beyond the expected scope — fence detection, beam sensors, thermal cameras and video analytics for wide-area protection." },
  { icon: <Eye size={19} />,         title: "Video Analytics & AI Monitoring", desc: "AI-powered video analytics detecting intrusion, crowd density, loitering, number plate recognition and behavioural anomalies in real time." },
  { icon: <Radio size={19} />,       title: "Intercom & Visitor Management",   desc: "IP video intercom, visitor management platforms and reception kiosk systems providing controlled, logged entry at all public-facing access points." },
  { icon: <Lock size={19} />,        title: "Integrated Security Management",  desc: "Unified security management platform integrating CCTV, access control, alarms and building systems into a single operator dashboard." },
  { icon: <Shield size={19} />,      title: "Security Audit & Consultancy",    desc: "Independent security risk assessment identifying vulnerabilities across your site perimeter, access points and surveillance coverage — with a prioritised remediation plan." },
];

const processSteps = [
  { icon: <Search size={20} />,    title: "Site Security Assessment",        desc: "We conduct a thorough on-site risk assessment — mapping all access points, perimeter boundaries, high-value areas and existing security infrastructure to identify every gap." },
  { icon: <BarChart3 size={20} />, title: "System Design & Specification",   desc: "A detailed security system design is produced — camera placement, access control topology, cabling schedule and integration architecture — to achieve zero compromised areas." },
  { icon: <Camera size={20} />,    title: "Installation & Commissioning",    desc: "Certified security engineers install and configure all CCTV, access control and perimeter systems — with full testing, commissioning and operator training on handover." },
  { icon: <FileText size={20} />,  title: "Documentation & Ongoing Support", desc: "Complete as-built documentation, system backups and handover packs are provided. Managed maintenance and monitoring support packages keep your security estate performing." },
];

const problemPoints = [
  "Popular access points are secured but blind spots in the perimeter remain undetected",
  "Legacy analogue CCTV systems miss critical incidents due to low resolution and no analytics",
  "Multiple disconnected security systems create operational complexity and response delays",
  "Tailgating and unauthorised access at unmanned entry points goes undetected",
  "No single view of security events across the site leaves operators reacting rather than preventing",
];
const solutionPoints = [
  "We establish a perimeter beyond expected scope — leaving zero compromised areas",
  "HD/4K IP cameras with AI video analytics detect incidents the moment they occur",
  "Unified security management integrates CCTV, access control and alarms on one platform",
  "Biometric and multi-factor access control eliminates credential sharing and tailgating",
  "24/7 remote monitoring with real-time alerts to security teams",
];
const impactPoints = [
  { icon: <Shield size={15} />,       label: "Achieve zero compromised areas with perimeter security beyond expected scope" },
  { icon: <Eye size={15} />,          label: "Detect and respond to incidents in real time with AI-powered video analytics"  },
  { icon: <CheckCircle2 size={15} />, label: "Centralise security operations with a unified management platform"             },
  { icon: <TrendingDown size={15} />, label: "Reduce security incidents and liability with verified, logged access control"  },
];
const relatedServices = [
  { label: "Unified Network & Communication",           path: "/services/unified-network"    },
  { label: "Cloud Services",                            path: "/services/cloud-services"     },
  { label: "Thermal Monitoring & Automation Solutions", path: "/services/thermal-monitoring" },
  { label: "Air / Water Tight Integrity Assessment",    path: "/services/air-water-tight"    },
];
const industries = [
  "Corporate Offices", "Manufacturing & Warehousing", "Banking & Finance",
  "Healthcare", "Education & Campuses", "Retail & Shopping Centres",
  "Government & Defence", "Ports & Logistics",
];

const AppCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="sa-app-card fu">
      <div className="sa-app-icon">{item.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
};
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="sa-step fu">
      <div className="sa-step-num">0{index + 1}</div>
      <div className="sa-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

const SurveillancesAccessControl = () => {
  const refOverviewL = useFU(0);   const refOverviewR = useFU(100);
  const refAppHead   = useFU(0);   const refProbHead  = useFU(0);
  const refProbL     = useFU(0);   const refProbR     = useFU(100);
  const refProcHead  = useFU(0);   const refIndL      = useFU(0);
  const refIndR      = useFU(100); const refRelated   = useFU(0);

  return (
    <div className="sa-page">
      <style>{css}</style>

      {/* HERO */}
      <section className="sa-hero">
        <img src={heroImg} alt="" className="sa-hero-photo" aria-hidden="true" />
        <div className="sa-hero-wash" /><div className="sa-hero-dots" />
        <div className="sa-hero-burst" /><div className="sa-hero-sky" />
        <div className="sa-hero-inner">
          <div>
            <div className="sa-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="sa-bread-active">Surveillances & Access Control</span>
            </div>
            <div className="sa-badge" style={{ marginBottom: 20 }}><Camera size={11} /> Security Solutions</div>
            <h1 style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Surveillances &<br />
              <span style={{ background: "linear-gradient(90deg,#f59e0b 0%,#b45309 60%,#f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Access Control
              </span>
            </h1>
            <p className="sa-flicker" style={{ fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#b45309", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14 }}>
              ⚡ Every unprotected corner is an open invitation — we leave zero compromised areas
            </p>
            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Our speciality is not only providing{" "}
              <strong style={{ color: "#b45309" }}>extensive security protection of popular points of access</strong> — we establish a perimeter beyond the expected scope, leaving{" "}
              <strong style={{ color: "#b45309" }}>zero compromised areas</strong> across your entire site.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="sa-btn-primary">Request a Security Assessment <ArrowRight size={16} /></Link>
              {/* <Link to="/services" className="sa-btn-ghost">All Services</Link> */}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="sa-stat" style={{ minWidth: 120 }}>
                  <div className="sa-stat-num">{s.num}</div>
                  <div className="sa-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="sa-video-col" />
        </div>
      </section>

      {/* OVERVIEW */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="sa-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="sa-section-badge"><Zap size={11} /> What We Deliver</div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              We provide <strong style={{ color: "#1e293b" }}>end-to-end surveillance and access control solutions</strong> — from HD/4K IP CCTV and AI video analytics to biometric access control, perimeter security and unified security management platforms.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              Our approach goes beyond securing the obvious entry points. We conduct a thorough site assessment to{" "}
              <strong style={{ color: "#1e293b" }}>map every boundary, blind spot and access vulnerability</strong> — then design a security architecture that eliminates every gap.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              Whether you need a single-site CCTV installation or a{" "}
              <strong style={{ color: "#b45309" }}>multi-site integrated security platform</strong> with biometric access and real-time analytics, we deliver the complete solution — designed, installed, commissioned and supported.
            </p>
            <div className="sa-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Our Perimeter-First Philosophy</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                Most security providers protect the front door. We secure the <strong>entire boundary</strong> — establishing a perimeter beyond the expected scope so there are no weak points for threats to exploit.
              </p>
            </div>
          </div>
          <div ref={refOverviewR} className="fu">
            <div className="sa-img-wrap">
              <ImgWithFallback src={sectionImg} alt="Surveillance and access control system" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Scope</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>CCTV · Access Control · Perimeter · Analytics</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Zero compromised areas · 24/7 coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refAppHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="sa-section-badge" style={{ margin: "0 auto 12px" }}><Shield size={11} /> Solutions</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Surveillance & Security Services We Provide</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>A complete security portfolio — from cameras and access readers to AI analytics and unified management.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default SurveillancesAccessControl;