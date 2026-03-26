import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, Search, BarChart3, FileText,
  CheckCircle2, TrendingDown, ChevronRight,
  Shield, Activity, Building2,
  Database, Cloud, HardDrive, RefreshCw,
  AlertTriangle, Clock, Lock, Server,
} from "lucide-react";

import heroImg    from "@/assets/service5.jpeg";
import sectionImg from "@/assets/service5.jpeg";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  .bf-page { font-family: 'Roboto', sans-serif; color: #1e293b; }
  .bf-page * { box-sizing: border-box; }

  @keyframes bf-flicker {
    0%,19%,21%,23%,25%,54%,56%,100% { opacity:1; text-shadow:0 0 8px rgba(245,158,11,0.85),0 0 22px rgba(245,158,11,0.4); }
    20%,24%,55% { opacity:0.35; text-shadow:none; }
  }
  @keyframes bf-fade-in {
    0%   { opacity:0; transform:translateY(6px); letter-spacing:0.13em; }
    60%  { opacity:0.85; }
    100% { opacity:1; transform:translateY(0); letter-spacing:0.04em; }
  }
  .bf-flicker { opacity:0; animation: bf-fade-in 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s forwards, bf-flicker 4s ease-in-out 2s infinite; }

  .bf-hero { position:relative; overflow:hidden; min-height:88vh; display:flex; align-items:center; }
  .bf-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; filter:brightness(0.62); pointer-events:none; }
  .bf-hero-wash { position:absolute; inset:0; background:linear-gradient(120deg, rgba(255,251,235,0.88) 0%, rgba(224,242,254,0.80) 55%, rgba(255,251,235,0.88) 100%); }
  .bf-hero-dots { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .bf-hero-burst { position:absolute; pointer-events:none; width:70vw; height:70vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,0.22) 0%,rgba(251,191,36,0.08) 40%,transparent 70%); top:-15%; left:-8%; }
  .bf-hero-sky { position:absolute; pointer-events:none; width:55vw; height:55vw; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.18) 0%,rgba(56,189,248,0.06) 45%,transparent 70%); bottom:-15%; right:-5%; }

  .bf-hero-inner { position:relative; max-width:1280px; margin:0 auto; padding:80px 28px 72px; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
  @media(max-width:900px){ .bf-hero-inner{grid-template-columns:1fr;} .bf-video-col{order:-1;} }

  .bf-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,0.10); border:1px solid rgba(245,158,11,0.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; }

  .bf-stat { background:rgba(255,255,255,0.82); border:1px solid rgba(251,191,36,0.28); border-radius:14px; padding:16px 20px; backdrop-filter:blur(10px); transition:border-color 0.2s,box-shadow 0.2s; box-shadow:0 2px 12px rgba(0,0,0,0.06); }
  .bf-stat:hover { border-color:rgba(245,158,11,0.50); box-shadow:0 6px 24px rgba(245,158,11,0.15); }
  .bf-stat-num { font-size:26px; font-weight:900; color:#ea580c; line-height:1; }
  .bf-stat-label { font-size:11px; color:#64748b; font-weight:500; margin-top:4px; }

  .bf-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:28px; }
  .bf-bread a { font-size:12.5px; color:#64748b; text-decoration:none; transition:color 0.15s; }
  .bf-bread a:hover { color:#f59e0b; }
  .bf-bread-active { font-size:12.5px; color:#334155; font-weight:500; }

  .bf-section-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.22); color:#b45309; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:12px; }

  .bf-two-col { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
  @media(max-width:900px){ .bf-two-col{grid-template-columns:1fr;gap:36px;} }
  .bf-split { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
  @media(max-width:767px){ .bf-split{grid-template-columns:1fr;} }

  .bf-app-card { background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:24px 20px; position:relative; overflow:hidden; transition:box-shadow 0.22s,border-color 0.22s,transform 0.22s; }
  .bf-app-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,transparent); opacity:0; transition:opacity 0.2s; }
  .bf-app-card:hover { box-shadow:0 10px 36px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.28); transform:translateY(-4px); }
  .bf-app-card:hover::before { opacity:1; }
  .bf-app-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:14px; }

  .bf-step { position:relative; background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:28px 24px; overflow:hidden; transition:box-shadow 0.22s,border-color 0.22s,transform 0.22s; }
  .bf-step::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#f59e0b,transparent); opacity:0; transition:opacity 0.22s; }
  .bf-step:hover { box-shadow:0 10px 36px rgba(0,0,0,0.09); border-color:rgba(245,158,11,0.35); transform:translateY(-4px); }
  .bf-step:hover::before { opacity:1; }
  .bf-step-num { font-size:44px; font-weight:900; color:rgba(245,158,11,0.10); line-height:1; position:absolute; top:14px; right:16px; user-select:none; }
  .bf-step-icon { width:44px; height:44px; border-radius:12px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; margin-bottom:16px; }

  .bf-problem-card { background:#fff8f4; border:1px solid rgba(245,158,11,0.18); border-left:4px solid #f59e0b; border-radius:14px; padding:24px 20px; }
  .bf-solution-card { background:#f0fdf4; border:1px solid rgba(22,163,74,0.15); border-left:4px solid #16a34a; border-radius:14px; padding:24px 20px; }

  .bf-img-wrap { border-radius:20px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.12); position:relative; }
  .bf-img-wrap::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(245,158,11,0.08),transparent 60%); pointer-events:none; }
  .bf-img-placeholder { width:100%; background:linear-gradient(135deg,#fffbeb 0%,#fde68a 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; }

  .bf-highlight { background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%); border-radius:16px; padding:24px 28px; color:#fff; box-shadow:0 8px 28px rgba(245,158,11,0.28); }

  .bf-industry-pill { display:inline-flex; align-items:center; gap:8px; background:#fff; border:1px solid #fffbeb; border-radius:10px; padding:10px 16px; font-size:13px; font-weight:500; color:#334155; transition:border-color 0.15s,color 0.15s,background 0.15s; }
  .bf-industry-pill:hover { border-color:#f59e0b; color:#b45309; background:#fffbeb; }
  .bf-industry-dot { width:7px; height:7px; border-radius:50%; background:#f59e0b; flex-shrink:0; }

  .bf-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#f59e0b,#b45309); color:#fff; font-size:15px; font-weight:700; padding:14px 28px; border-radius:12px; text-decoration:none; border:none; cursor:pointer; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 20px rgba(245,158,11,0.35); }
  .bf-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(245,158,11,0.50); }
  .bf-btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.72); backdrop-filter:blur(8px); color:#334155; font-size:15px; font-weight:500; padding:14px 28px; border-radius:12px; text-decoration:none; border:1px solid rgba(251,191,36,0.28); cursor:pointer; transition:border-color 0.2s,background 0.2s,color 0.2s; }
  .bf-btn-ghost:hover { border-color:#f59e0b; background:#fffbeb; color:#b45309; }

  .bf-related { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; background:#fff; border:1px solid #eef0f4; border-radius:12px; text-decoration:none; color:#334155; font-size:13.5px; font-weight:500; transition:border-color 0.15s,color 0.15s,background 0.15s,transform 0.15s; }
  .bf-related:hover { border-color:rgba(245,158,11,0.35); color:#b45309; background:#fffbeb; transform:translateX(4px); }

  .bf-cta { position:relative; overflow:hidden; background:linear-gradient(135deg,#fbbf24 0%,#f97316 50%,#ea580c 100%); }
  .bf-cta-burst { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.20) 0%,transparent 65%); top:-200px; right:-100px; pointer-events:none; }

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
    <div className="bf-img-placeholder" style={{ height: fallbackHeight }}>
      <Database size={28} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#64748b" }}>Image unavailable</span>
    </div>
  );
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />;
};

const stats = [
  { num: "24/7",  label: "Company kept running around the clock" },
  { num: "Zero",  label: "Data loss tolerance"                   },
  { num: "RTO",   label: "Rapid recovery time objectives met"    },
];

const applications = [
  { icon: <Cloud size={19} />,      title: "Cloud Backup Solutions",          desc: "Automated, scheduled backup of servers, endpoints and databases to secure off-site cloud storage — with encryption, versioning and fast restore capability." },
  { icon: <HardDrive size={19} />,  title: "On-Premise Backup Systems",       desc: "Local backup appliances and NAS-based solutions for high-speed on-site data protection — ensuring rapid recovery without reliance on internet connectivity." },
  { icon: <Database size={19} />,   title: "Hybrid Backup Architecture",      desc: "A 3-2-1 backup strategy combining local and cloud copies — maximising resilience so data is always recoverable regardless of the nature of the incident." },
  { icon: <RefreshCw size={19} />,  title: "Disaster Recovery Planning",      desc: "End-to-end disaster recovery design and testing — defining RTO and RPO targets and ensuring your IT environment can be restored within business-critical timeframes." },
  { icon: <Server size={19} />,     title: "Server & VM Backup",              desc: "Image-based backup of physical servers, virtual machines and hypervisor environments — enabling bare-metal restore and rapid VM spin-up after failure." },
  { icon: <Lock size={19} />,       title: "Ransomware-Proof Backup",         desc: "Immutable, air-gapped and offsite backup copies that ransomware cannot encrypt or delete — ensuring a clean restore point is always available." },
  { icon: <Clock size={19} />,      title: "Continuous Data Protection",      desc: "Near-real-time replication and continuous data protection (CDP) for critical systems — minimising data loss exposure to seconds rather than hours." },
  { icon: <Activity size={19} />,   title: "Backup Monitoring & Reporting",   desc: "Proactive monitoring of all backup jobs with automated alerts on failures, missed schedules or capacity thresholds — with regular compliance reporting." },
];

const processSteps = [
  { icon: <Search size={20} />,    title: "Data Audit & Risk Assessment",    desc: "We identify all critical data, systems and applications — mapping recovery time objectives, data growth rates and current backup gaps to quantify business risk exposure." },
  { icon: <BarChart3 size={20} />, title: "Solution Design & Sizing",        desc: "A backup and recovery architecture is designed — covering storage sizing, retention schedules, replication targets, encryption standards and RTO/RPO commitments." },
  { icon: <Database size={20} />,  title: "Deployment & Verification",       desc: "Backup systems are deployed, configured and fully tested — including restore verification to confirm that every backup can actually be recovered when needed." },
  { icon: <FileText size={20} />,  title: "Monitoring, Reporting & Support", desc: "All backup jobs are monitored 24/7 with automated failure alerts. Regular restore tests and compliance reports keep your data protection posture audit-ready." },
];

const problemPoints = [
  "Businesses can be at risk of losing important data at any time — hardware failure, human error or cyberattack",
  "Lost data leads to costly downtime, customer dissatisfaction, regulatory fines and lost revenue",
  "IT professionals must meet extremely high expectations to keep the company running 24 hours a day",
  "Ransomware attacks are encrypting backups alongside production data, eliminating recovery options",
  "Untested backups fail silently — organisations discover the data is unrecoverable only during a crisis",
];
const solutionPoints = [
  "Automated, verified backups running around the clock with zero manual intervention required",
  "Immutable and air-gapped backup copies that ransomware and accidental deletion cannot touch",
  "3-2-1 hybrid backup strategy ensures recovery is always possible regardless of failure type",
  "Defined RTO and RPO targets with tested restore procedures — no surprises during a real incident",
  "Proactive monitoring with instant alerts means backup failures are caught before they become disasters",
];
const impactPoints = [
  { icon: <TrendingDown size={15} />, label: "Eliminate costly downtime caused by data loss events and IT failures"           },
  { icon: <Shield size={15} />,       label: "Protect against ransomware with immutable, offsite backup copies"               },
  { icon: <CheckCircle2 size={15} />, label: "Meet regulatory compliance requirements with documented data retention policies" },
  { icon: <Clock size={15} />,        label: "Keep the company running 24 hours a day with rapid, verified recovery"          },
];
const relatedServices = [
  { label: "Cloud Services",                            path: "/services/cloud-services"     },
  { label: "Unified Network & Communication",           path: "/services/unified-network"    },
  { label: "Surveillances & Access Control",            path: "/services/surveillance"       },
  { label: "Thermal Monitoring & Automation Solutions", path: "/services/thermal-monitoring" },
];
const industries = [
  "Banking & Finance", "Healthcare", "Legal & Professional Services",
  "Manufacturing", "Retail & E-commerce", "Education",
  "Government", "IT & SaaS",
];

const AppCard = ({ item, index }) => {
  const ref = useFU(index * 80);
  return (
    <div ref={ref} className="bf-app-card fu">
      <div className="bf-app-icon">{item.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8 }}>{item.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
    </div>
  );
};
const StepCard = ({ step, index }) => {
  const ref = useFU(index * 90);
  return (
    <div ref={ref} className="bf-step fu">
      <div className="bf-step-num">0{index + 1}</div>
      <div className="bf-step-icon">{step.icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 10 }}>{step.title}</h3>
      <p  style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  );
};

const BackupFacility = () => {
  const refOverviewL = useFU(0);   const refOverviewR = useFU(100);
  const refAppHead   = useFU(0);   const refProbHead  = useFU(0);
  const refProbL     = useFU(0);   const refProbR     = useFU(100);
  const refProcHead  = useFU(0);   const refIndL      = useFU(0);
  const refIndR      = useFU(100); const refRelated   = useFU(0);

  return (
    <div className="bf-page">
      <style>{css}</style>

      {/* HERO */}
      <section className="bf-hero">
        <img src={heroImg} alt="" className="bf-hero-photo" aria-hidden="true" />
        <div className="bf-hero-wash" /><div className="bf-hero-dots" />
        <div className="bf-hero-burst" /><div className="bf-hero-sky" />
        <div className="bf-hero-inner">
          <div>
            <div className="bf-bread">
              <Link to="/">Home</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <Link to="/services">Services</Link>
              <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
              <span className="bf-bread-active">Backup Facility</span>
            </div>
            <div className="bf-badge" style={{ marginBottom: 20 }}><Database size={11} /> Data Protection & Recovery</div>
            <h1 style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.08, marginBottom: 16 }}>
              Backup<br />
              <span style={{ background: "linear-gradient(90deg,#f59e0b 0%,#b45309 60%,#f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Facility
              </span>
            </h1>
            <p className="bf-flicker" style={{ fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700, color: "#b45309", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14 }}>
              ⚡ Lost data leads to downtime, fines and lost revenue — protect it before it's gone
            </p>
            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Businesses can be at risk of losing important data. Lost data leads to{" "}
              <strong style={{ color: "#b45309" }}>costly downtime, customer dissatisfaction, regulatory fines and lost revenue</strong>. IT pros must meet extremely high expectations — you need to keep the{" "}
              <strong style={{ color: "#b45309" }}>company running 24 hours a day</strong>.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/contact" className="bf-btn-primary">Request a Backup Assessment <ArrowRight size={16} /></Link>
              {/* <Link to="/services" className="bf-btn-ghost">All Services</Link> */}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <div key={s.label} className="bf-stat" style={{ minWidth: 120 }}>
                  <div className="bf-stat-num">{s.num}</div>
                  <div className="bf-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bf-video-col" />
        </div>
      </section>

      {/* OVERVIEW */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#fffbeb 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="bf-two-col">
          <div ref={refOverviewL} className="fu">
            <div className="bf-section-badge"><Zap size={11} /> What We Deliver</div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              We design and implement <strong style={{ color: "#1e293b" }}>enterprise backup and disaster recovery solutions</strong> that ensure your critical data is always protected, always verifiable and always recoverable — so your business keeps running regardless of what happens.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
              From cloud and on-premise backup to hybrid 3-2-1 architectures, ransomware-proof immutable storage and{" "}
              <strong style={{ color: "#1e293b" }}>continuous data protection</strong> — every solution is sized, tested and monitored to meet your specific RTO and RPO requirements.
            </p>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
              IT teams face <strong style={{ color: "#b45309" }}>extremely high expectations</strong> — we take backup off their plate entirely with automated, monitored and regularly verified protection that keeps the company running 24 hours a day.
            </p>
            <div className="bf-highlight">
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: 6 }}>Why Verified Backup Matters</p>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>
                A backup that has never been tested is not a backup — it's a hope. Every solution we deploy includes <strong>regular restore verification</strong> so you know with certainty that your data can be recovered when it matters most.
              </p>
            </div>
          </div>
          <div ref={refOverviewR} className="fu">
            <div className="bf-img-wrap">
              <ImgWithFallback src={sectionImg} alt="Backup facility and data protection solution" fallbackHeight={440}
                style={{ width: "100%", height: 440, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ marginTop: -28, marginLeft: 24, position: "relative", zIndex: 2, background: "#fff", border: "1px solid #eef0f4", borderLeft: "4px solid #f59e0b", borderRadius: 14, padding: "14px 18px", display: "inline-block", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Strategy</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Cloud · On-Premise · Hybrid · Immutable</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>24/7 monitored · Restore-verified · RTO/RPO aligned</div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refAppHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="bf-section-badge" style={{ margin: "0 auto 12px" }}><Database size={11} /> Solutions</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>Backup & Recovery Services We Provide</h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>A complete data protection portfolio — from cloud backup and immutable storage to full disaster recovery planning and 24/7 monitoring.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {applications.map((item, i) => <AppCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default BackupFacility;