import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, Search, BarChart3, FileText,
  CheckCircle2, TrendingDown, ChevronRight,
  Shield, Activity, Building2,
  Server, Monitor, Headphones, RefreshCw,
  AlertTriangle, Lock, Cloud, Settings,
} from "lucide-react";

import heroImg    from "@/assets/service4.jpeg";
import sectionImg from "@/assets/service4.jpeg";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .mi-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .mi-page * { box-sizing: border-box; }

  @keyframes mi-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% { opacity:1; text-shadow:0 0 8px rgba(245,158,11,0.85),0 0 22px rgba(245,158,11,0.4); }
    20%,24%,55% { opacity:0.35; text-shadow:none; }
  }
  @keyframes mi-fade-in {
    0%   { opacity:0; transform:translateY(6px); letter-spacing:0.13em; }
    60%  { opacity:0.85; }
    100% { opacity:1; transform:translateY(0); letter-spacing:0.04em; }
  }
  .mi-flicker { opacity:0; animation: mi-fade-in 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards, mi-flicker 4s ease-in-out 2s infinite; }

  .mi-hero { position:relative; overflow:hidden; min-height:88vh; display:flex; align-items:center; }
  .mi-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; filter:brightness(0.62); pointer-events:none; }
  .mi-hero-wash { position:absolute; inset:0; background:linear-gradient(120deg, rgba(255,251,235,0.88) 0%, rgba(224,242,254,0.80) 55%, rgba(255,251,235,0.88) 100%); }
  .mi-hero-dots { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .mi-hero-burst { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,0.22) 0%,rgba(251,191,36,0.08) 40%,transparent 70%); top:-15%; left:-8%; }
  .mi-hero-sky { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.18) 0%,rgba(56,189,248,0.06) 45%,transparent 70%); bottom:-15%; right:-5%; }

  .mi-hero-inner { position:relative; max-width:1280px; margin:0 auto; padding:80px 28px 72px; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
  @media(max-width:900px){ .mi-hero-inner{grid-template-columns:1fr;} .mi-video-col{order:-1;} }

  .mi-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,0.10); border:1px solid rgba(245,158,11,0.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; }

  .mi-stat { background:rgba(255,255,255,0.82); border:1px solid rgba(251,191,36,0.28); border-radius:14px; padding:16px 20px; backdrop-filter:blur(10px); transition:border-color 0.2s,box-shadow 0.2s; box-shadow:0 2px 12px rgba(0,0,0,0.06); }
  .mi-stat:hover { border-color:rgba(245,158,11,0.50); box-shadow:0 6px 24px rgba(245,158,11,0.15); }
  .mi-stat-num { font-size:26px; font-weight:900; color:#ea580c; line-height:1; }
  .mi-stat-label { font-size:11px; color:#64748b; font-weight:500; margin-top:4px; }

  .mi-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:28px; }
  .mi-bread a { font-size:12.5px; color:#64748b; text-decoration:none; transition:color 0.15s; }
  .mi-bread a:hover { color:#f59e0b; }
  .mi-bread-active { font-size:12.5px; color:#334155; font-weight:500; }

  .mi-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }

  .mi-two-col { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
  @media(max-width:900px){ .mi-two-col{grid-template-columns:1fr;gap:36px;} }
  .mi-split { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
  @media(max-width:767px){ .mi-split{grid-template-columns:1fr;} }

  .mi-app-card { background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:24px 20px; position:relative; overflow:hidden; transition:box-shadow 0.22s,border-color 0.22s,transform 0.22s; }
  .mi-app-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,transparent); opacity:0; transition:opacity 0.2s; }
  .mi-app-card:hover { box-shadow:0 10px 36px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.28); transform:translateY(-4px); }
  .mi-app-card:hover::before { opacity:1; }
  .mi-app-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:14px; }

  .mi-step { position:relative; background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:28px 24px; overflow:hidden; transition:box-shadow 0.22s,border-color 0.22s,transform 0.22s; }
  .mi-step::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,transparent); opacity:0; transition:opacity 0.22s; }
  .mi-step:hover { box-shadow:0 10px 36px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.35); transform:translateY(-4px); }
  .mi-step:hover::before { opacity:1; }
  .mi-step-num { font-size:44px; font-weight:900; color:rgba(245,158,11,0.10); line-height:1; position:absolute; top:14px; right:16px; user-select:none; }
  .mi-step-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:16px; }

  .mi-problem-card { background:#fff8f4; border:1px solid rgba(245,158,11,0.18); border-left:4px solid #f59e0b; border-radius:14px; padding:24px 20px; }
  .mi-solution-card { background:#f0fdf4; border:1px solid rgba(22,163,74,0.15); border-left:4px solid #16a34a; border-radius:14px; padding:24px 20px; }

  .mi-img-wrap { border-radius:20px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.12); position:relative; }
  .mi-img-wrap::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(245,158,11,0.08),transparent 60%); pointer-events:none; }
  .mi-img-placeholder { width:100%; background:linear-gradient(135deg,#fffbeb 0%,#fde68a 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; }

  .mi-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:16px; padding:24px 28px; color:#fff; box-shadow:0 8px 28px rgba(245,158,11,0.28); }

  .mi-industry-pill { display:inline-flex; align-items:center; gap:8px; background:#fff; border:1px solid #fffbeb; border-radius:10px; padding:10px 16px; font-size:13px; font-weight:500; color:#334155; transition:border-color 0.15s,color 0.15s,background 0.15s; }
  .mi-industry-pill:hover { border-color:#f59e0b; color:#b45309; background:#fffbeb; }
  .mi-industry-dot { width:7px; height:7px; border-radius:50%; background:#f59e0b; flex-shrink:0; }

  .mi-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#b45309); color:#fff; font-size:15px; font-weight:700; padding:14px 28px; border-radius:12px; text-decoration:none; border:none; cursor:pointer; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 20px rgba(245,158,11,0.35); }
  .mi-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.50); }
  .mi-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:15px; font-weight:500; padding:14px 28px; border-radius:12px; text-decoration:none; border:1px solid rgba(251,191,36,0.28); cursor:pointer; transition:border-color 0.2s,background 0.2s,color 0.2s; }
  .mi-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  .mi-related { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; background:#fff; border:1px solid #eef0f4; border-radius:12px; text-decoration:none; color:#334155; font-size:13.5px; font-weight:500; transition:border-color 0.15s,color 0.15s,background 0.15s,transform 0.15s; }
  .mi-related:hover { border-color:rgba(245,158,11,0.35); color:#b45309; background:#fffbeb; transform:translateX(4px); }

  .mi-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .mi-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.20) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }

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
    <div className="mi-img-placeholder" style={{ height: fallbackHeight }}>
      <Settings size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#64748b" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

const stats = [
  { num: "24/7",     label: "Proactive IT monitoring & support"    },
  { num: "Flexible", label: "Scalable infrastructure on demand"    },
  { num: "Single",   label: "Point of contact for all IT needs"    },
];

const applications = [
  { icon: <Headphones size={19} />, title: "IT Help Desk & Support",          desc: "24/7 remote and on-site helpdesk support for end users — fast resolution of hardware, software, connectivity and application issues across your entire organisation." },
  { icon: <Server size={19} />,     title: "Server & Infrastructure Management", desc: "Proactive management, patching and monitoring of physical and virtual servers — ensuring uptime, performance and security across your infrastructure estate." },
  { icon: <Monitor size={19} />,    title: "End-User Device Management",      desc: "Centralised deployment, patching, monitoring and support of laptops, desktops, tablets and mobile devices across all offices and remote users." },
  { icon: <Cloud size={19} />,      title: "Cloud Infrastructure Management", desc: "Day-to-day management and optimisation of cloud environments — covering performance, cost control, security compliance and capacity planning." },
  { icon: <Lock size={19} />,       title: "Cybersecurity Management",        desc: "Managed security services including endpoint protection, vulnerability management, patch compliance, security monitoring and incident response." },
  { icon: <RefreshCw size={19} />,  title: "IT Asset & Lifecycle Management", desc: "Full IT asset inventory, lifecycle tracking, warranty management and technology refresh planning — maximising the value of your IT investment." },
  { icon: <Activity size={19} />,   title: "Network Operations & Monitoring", desc: "Continuous monitoring of network infrastructure — proactive identification and resolution of performance issues, outages and security anomalies." },
  { icon: <Settings size={19} />,   title: "IT Strategy & vCIO Consulting",   desc: "Virtual CIO services providing strategic IT roadmap planning, budgeting, vendor management and technology advisory aligned to your business objectives." },
];

const processSteps = [
  { icon: <Search size={20} />,    title: "IT Environment Discovery",        desc: "We conduct a full audit of your existing IT infrastructure, systems, contracts and support processes — identifying gaps, risks and optimisation opportunities." },
  { icon: <BarChart3 size={20} />, title: "Service Design & Onboarding",     desc: "A tailored managed services plan is designed — defining scope, SLAs, escalation paths, monitoring thresholds and communication protocols for your environment." },
  { icon: <Server size={20} />,    title: "Transition & Go-Live",            desc: "Our engineers take over management of your IT systems with zero disruption — deploying monitoring agents, documentation and helpdesk integrations." },
  { icon: <FileText size={20} />,  title: "Ongoing Management & Reviews",    desc: "Monthly performance reviews, SLA reporting and strategic IT planning sessions ensure your managed IT service continuously evolves with your business." },
];

const problemPoints = [
  "IT environments have grown exponentially complex and heterogeneous amidst mounting compliance demands",
  "Internal IT teams are overwhelmed by reactive support, leaving no time for strategic initiatives",
  "A flexible, scalable, secure and responsive infrastructure is a top priority — but hard to maintain in-house",
  "Fragmented technology stacks and multiple vendors create management complexity and accountability gaps",
  "Cybersecurity threats are evolving faster than in-house teams can keep pace with",
];
const solutionPoints = [
  "A single managed services partner covering all IT needs — infrastructure, support, security and strategy",
  "Flexible, scalable service tiers that grow and adapt with your changing business requirements",
  "Proactive monitoring resolves issues before they impact users — shifting IT from reactive to preventive",
  "Certified engineers manage your environment 24/7 so internal teams can focus on business outcomes",
  "Compliance frameworks and security management built into every layer of the managed service",
];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Reduce IT costs with predictable monthly pricing and no hidden expenses"        },
  { icon: <Shield size={15} />,       label: "Strengthen security and compliance with expert-managed cyber protection"        },
  { icon: <CheckCircle2 size={15} />, label: "Free internal teams from day-to-day IT to focus on strategic business growth"   },
  { icon: <Activity size={15} />,     label: "Achieve higher uptime with proactive monitoring and rapid issue resolution"     },
];
const relatedServices = [
  { label: "Cloud Services",                            path: "/services/cloud-services"     },
  { label: "Unified Network & Communication",           path: "/services/unified-network"    },
  { label: "Backup Facility",                           path: "/services/backup-facility"    },
  { label: "Surveillances & Access Control",            path: "/services/surveillance"       },
];
const industries = [
  "Professional Services", "Financial Services", "Healthcare",
  "Manufacturing", "Education", "Retail",
  "Non-Profit", "Government",
];

const AppCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="mi-app-card fu">
      <div className="mi-app-icon">{item.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
};
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="mi-step fu">
      <div className="mi-step-num">0{index + 1}</div>
      <div className="mi-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

const ManagedITServices = () => {
  const refOverviewL = useFU(0);   const refOverviewR = useFU(100);
  const refAppHead   = useFU(0);   const refProbHead  = useFU(0);
  const refProbL     = useFU(0);   const refProbR     = useFU(100);
  const refProcHead  = useFU(0);   const refIndL      = useFU(0);
  const refIndR      = useFU(100); const refRelated   = useFU(0);

  return (
    <div className="mi-page">
      <style>{css}</style>

      {/* HERO */}
      <section className="mi-hero">
        <img src={heroImg} alt="" className="mi-hero-photo" aria-hidden="true" />
        <div className="mi-hero-wash" /><div className="mi-hero-dots" />
        <div className="mi-hero-burst" /><div className="mi-hero-sky" />
        <div className="mi-hero-inner">
          <div>
            <div className="mi-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="mi-bread-active">Managed IT Services</span>
            </div>
            <div className="mi-badge" style={{ marginBottom: 20 }}><Settings size={11} /> Managed IT Services</div>
            <h1 style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Managed IT<br />
              <span style={{ background: "linear-gradient(90deg,#f59e0b 0%,#b45309 60%,#f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Services
              </span>
            </h1>
            <p className="mi-flicker" style={{ fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#b45309", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14 }}>
              ⚡ Complex IT environments need a flexible, scalable, secure partner — not just a helpdesk
            </p>
            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              IT environments have grown exponentially complex and heterogeneous amidst mounting compliance measures. In the changing market and business ecosystem, a{" "}
              <strong style={{ color: "#b45309" }}>flexible, scalable, secure and responsive infrastructure</strong> is a top priority for enterprises.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="mi-btn-primary">Request a Consultation <ArrowRight size={16} /></Link>
              {/* <Link to="/services" className="mi-btn-ghost">All Services</Link> */}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="mi-stat" style={{ minWidth: 120 }}>
                  <div className="mi-stat-num">{s.num}</div>
                  <div className="mi-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mi-video-col" />
        </div>
      </section>

      {/* OVERVIEW */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="mi-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="mi-section-badge"><Zap size={11} /> What We Deliver</div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              We provide <strong style={{ color: "#1e293b" }}>fully managed IT services</strong> that take complete responsibility for your IT infrastructure, helpdesk, security and cloud environments — giving your business a flexible, scalable and responsive technology foundation.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              As IT environments become increasingly complex and compliance demands intensify, organisations need a trusted managed services partner who can{" "}
              <strong style={{ color: "#1e293b" }}>proactively manage, secure and evolve the entire IT estate</strong> — freeing internal teams to focus on strategic business growth.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              From 24/7 helpdesk and server management to cybersecurity, cloud operations and{" "}
              <strong style={{ color: "#b45309" }}>virtual CIO strategic advisory</strong> — we are the single point of accountability for everything IT.
            </p>
            <div className="mi-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Why Managed IT?</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                Enterprises that shift from reactive break-fix IT to a <strong>proactive managed model</strong> consistently achieve higher uptime, lower costs and stronger security — while their teams regain the time to focus on what matters most.
              </p>
            </div>
          </div>
          <div ref={refOverviewR} className="fu">
            <div className="mi-img-wrap">
              <ImgWithFallback src={sectionImg} alt="Managed IT services for enterprise" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Scope</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Support · Infrastructure · Security · Strategy</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Flexible · Scalable · Secure · Responsive</div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refAppHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="mi-section-badge" style={{ margin: "0 auto 12px" }}><Settings size={11} /> Services</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Managed IT Services We Provide</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>A complete managed IT portfolio — from helpdesk and infrastructure to cybersecurity, cloud and strategic vCIO advisory.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default ManagedITServices;