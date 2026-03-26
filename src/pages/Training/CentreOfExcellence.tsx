import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, GraduationCap, BookOpen, Shield,
  Settings, Users, Wrench, ChevronRight, CheckCircle2,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { trainingCss, useFU } from "@/pages/trainingShared";

const facilityModules = [
  "Ultrasonic Condition Based Bearing Lubrication",
  "Ultrasonic Valve Pass / Internal Hydraulic Leak Detection",
  "Ultrasonic Electrical Partial Discharge Detection",
  "Ultrasonic Compressed Air Leak Detection",
  "Ultrasonic Tightness Testing Applications",
  "Vibration Analysis & Alignment Technology",
  "Dynamic Balancing Techniques",
  "Industrial Oil Analysis Techniques",
  "Infrared Thermal Analysis Technology",
];

const keyFeatures = [
  { icon: <Wrench size={19} />,   title: "World Class Defect Simulation", desc: "Mechanical & electrical defect simulation facility for hands-on training with real fault conditions." },
  { icon: <Users size={19} />,    title: "Experienced Faculty",           desc: "Highly experienced faculty and trainers with deep industrial reliability expertise." },
  { icon: <Settings size={19} />, title: "Advanced Equipment Access",     desc: "Access to modern and advanced equipment and tools for defect diagnostics." },
  { icon: <Shield size={19} />,   title: "Customised Programs",           desc: "Training programs tailored for both individual professionals and organisational goals." },
];

// const navLinks = [
//   { label: "Skill Development", path: "/training/skill-programs" },
//   { label: "1-Day Courses",     path: "/training/one-day"        },
//   { label: "3-Day Courses",     path: "/training/three-day"      },
//   { label: "5-Day Courses",     path: "/training/five-day"       },
//   { label: "Certification",     path: "/training/certification"  },
// ];

const CentreOfExcellence = () => {
  const refVision  = useFU(0);
  const refMission = useFU(100);
  const refFeatH   = useFU(0);

  return (
    <div className="tr-page">
      <style>{trainingCss}</style>

      {/* ── HERO ── */}
      <section className="tr-hero">
        <img src={heroBg} alt="" className="tr-hero-photo" aria-hidden="true" />
        <div className="tr-hero-wash" /><div className="tr-hero-dots" />
        <div className="tr-hero-burst" /><div className="tr-hero-sky" />

        <div style={{ position:"relative", maxWidth:1280, margin:"0 auto", padding:"72px 28px 64px", width:"100%" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:28 }}>
            <Link to="/" style={{ fontSize:12.5, color:"#64748b", textDecoration:"none" }}>Home</Link>
            <ChevronRight size={12} style={{ color:"#cbd5e1" }} />
            <Link to="/training/centre" style={{ fontSize:12.5, color:"#64748b", textDecoration:"none" }}>Training</Link>
            <ChevronRight size={12} style={{ color:"#cbd5e1" }} />
            <span style={{ fontSize:12.5, color:"#334155", fontWeight:500 }}>Centre of Excellence</span>
          </div>

          <div className="tr-badge"><GraduationCap size={11} /> Centre of Excellence</div>

          <h1 style={{ fontSize:"clamp(28px,4.5vw,52px)", fontWeight:800, color:"#1e293b", lineHeight:1.06, marginBottom:16 }}>
            Mahadyuta{" "}
            <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Centre of Excellence
            </span>
            <br />for Industrial Reliability
          </h1>

          <p style={{ fontSize:"clamp(14px,1.4vw,17px)", color:"#475569", lineHeight:1.75, marginBottom:32, maxWidth:580 }}>
            <em style={{ color:"#b45309", fontWeight:600 }}>Skilling India to Predict, Prevent &amp; Optimize...</em>
            <br />A state-of-the-art training facility in Navi Mumbai — bridging the gap between theory and industrial practice.
          </p>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:40 }}>
            <Link to="/contact" className="tr-btn-primary">Enquire Now <ArrowRight size={16} /></Link>
            {/* <Link to="/training/three-day" className="tr-btn-ghost">View Courses</Link> */}
          </div>

          {/* Quick-nav pills to other training pages
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {navLinks.map((n) => (
              <Link key={n.path} to={n.path} style={{
                display:"inline-flex", alignItems:"center", gap:6,
                background:"rgba(255,255,255,0.82)", border:"1px solid rgba(245,158,11,0.28)",
                borderRadius:10, padding:"7px 14px", fontSize:12.5, fontWeight:600,
                color:"#b45309", textDecoration:"none", backdropFilter:"blur(8px)",
                transition:"background 0.15s",
              }}>
                {n.label} <ChevronRight size={12} />
              </Link>
            ))}
          </div> */}
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding:"80px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }} className="tr-two-col">
          <div ref={refVision} className="fu">
            <div className="tr-badge"><BookOpen size={11} /> Our Vision</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:700, color:"#0f1117", marginBottom:16 }}>Upskilling Industrial Teams for Reliability</h2>
            <p style={{ fontSize:15, color:"#64748b", lineHeight:1.75, marginBottom:24 }}>
              To upskill industrial operations &amp; maintenance teams in efficient prediction of machinery faults, develop effective maintenance plans to prevent failures and optimise production capabilities.
            </p>
            <div className="tr-highlight">
              <p style={{ fontSize:14, fontWeight:600, opacity:0.9, marginBottom:8 }}>About the Facility</p>
              <p style={{ fontSize:14.5, lineHeight:1.7 }}>
                A state-of-the-art facility designed to facilitate both theoretical and practical hands-on training under one roof — with a world-class defect simulation facility, experienced faculty and modern diagnostic equipment.
              </p>
            </div>

            <div style={{ marginTop:28 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                <span style={{ fontSize:13, fontWeight:700, color:"#b45309", textTransform:"uppercase", letterSpacing:"0.07em" }}>Classroom capacity</span>
              </div>
              <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                {[{ num:"30", label:"Students per batch" }, { num:"9+", label:"Technology modules" }, { num:"ISO", label:"9001:2015 Certified" }].map((s) => (
                  <div key={s.label} className="tr-stat" style={{ minWidth:100 }}>
                    <div className="tr-stat-num">{s.num}</div>
                    <div className="tr-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div ref={refMission} className="fu">
            <div className="tr-badge"><Shield size={11} /> Our Mission</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:700, color:"#0f1117", marginBottom:20 }}>Three Pillars of Purpose</h2>
            {[
              "Develop skills for effective utilisation of modern industrial condition monitoring technologies.",
              "Ensure qualitative, quantitative and seamless industrial production.",
              "Contribute in the development of technical human resource for national growth.",
            ].map((m, i) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:14, padding:"16px 18px", background:"#fff", borderRadius:12, border:"1px solid #eef0f4", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ width:28, height:28, borderRadius:8, background:"rgba(245,158,11,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:13, fontWeight:800, color:"#f59e0b" }}>{i + 1}</span>
                </div>
                <p style={{ fontSize:14, color:"#475569", lineHeight:1.65, margin:0 }}>{m}</p>
              </div>
            ))}

            <div style={{ marginTop:20 }}>
              <div className="tr-badge" style={{ marginBottom:14 }}><Settings size={11} /> Practical Training Modules</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {facilityModules.map((c) => (
                  <div key={c} className="tr-skill-pill" style={{ fontSize:12 }}>
                    <span className="tr-skill-dot" />{c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section style={{ background:"#fffbeb", padding:"80px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refFeatH} className="fu" style={{ textAlign:"center", marginBottom:48 }}>
            <div className="tr-badge" style={{ margin:"0 auto 12px" }}><Shield size={11} /> Key Features</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:700, color:"#0f1117" }}>What Makes Us Different</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:18 }}>
            {keyFeatures.map((f, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const ref = useFU(i * 80);
              return (
                <div ref={ref} key={f.title} className="tr-feature fu">
                  <div className="tr-feature-icon">{f.icon}</div>
                  <h3 style={{ fontSize:15, fontWeight:700, color:"#0f1117", marginBottom:8 }}>{f.title}</h3>
                  <p  style={{ fontSize:13.5, color:"#64748b", lineHeight:1.65 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default CentreOfExcellence;
