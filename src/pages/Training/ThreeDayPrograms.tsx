/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, ChevronRight, CheckCircle2, Activity, Waves, Droplets, BarChart3 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { trainingCss, useFU } from "@/pages/trainingShared";

const threeDayCourses = [
  {
    icon: <Activity size={19} />,
    title: "Introduction to Condition Monitoring Technologies for Industrial Reliability",
    duration: "3 Days",
    days: [
      { label: "Day 1 — Manufacturing & Maintenance Basics", items: ["Manufacturing plant overview", "Types of maintenance", "Equipment failure concepts", "Introduction to the P–F curve", "Evolution from reactive to predictive maintenance"] },
      { label: "Day 2 — Overview of Condition Monitoring Technologies", items: ["Introduction to condition monitoring", "Benefits of condition-based maintenance", "Vibration monitoring", "Ultrasound monitoring", "Infrared thermography", "Oil analysis", "Visual inspection & industrial endoscopy"] },
      { label: "Day 3 — Reliability Strategy & Applications", items: ["Selection of condition monitoring technologies", "Technology application basics", "Mapping technologies to the P–F curve", "Integrated reliability approach", "Industrial examples & practical demonstrations"] },
    ],
  },
  {
    icon: <Waves size={19} />,
    title: "Ultrasound Analysis Technology Applications",
    duration: "3 Days",
    days: [
      { label: "Day 1 — Fundamentals of Ultrasound Technology", items: ["Overview", "Sound theory", "Propagation of sound", "Introduction to ultrasound testing"] },
      { label: "Day 2 — Energy, Process & Electrical Applications", items: ["Airborne leaks & leak testing", "Steam systems & steam trap testing", "Valves & valve testing", "Hydraulic system testing", "Electrical systems & testing"] },
      { label: "Day 3 — Mechanical Applications & Practical Training", items: ["Bearing condition monitoring", "Bearing fault detection", "Bearing lubrication", "Practical ultrasound demonstrations"] },
    ],
  },
  {
    icon: <Droplets size={19} />,
    title: "Basics of Hydraulic System",
    duration: "3 Days",
    days: [
      { label: "Day 1 — Basics & Safety", items: ["Pre-Training Assessment", "Introduction to Hydraulics & Pascal's Law", "Safety Precautions", "Hydraulic Components Overview", "Working Principles of Pumps, Valves & Seals"] },
      { label: "Day 2 — System Operation", items: ["Power Pack, Cylinders & Actuators", "Drum & Disk Braking Systems", "Reading Hydraulic Schematics (ISO 1219)", "Practical Correlation of Schematics with Site Systems", "Routine Hydraulic Maintenance"] },
      { label: "Day 3 — Troubleshooting & Reliability", items: ["Oil Hygiene & Contamination Control", "Open & Closed Loop Troubleshooting", "Predictive Analytics (Flow, IR, Ultrasound) — Case Studies", "Root Cause Analysis of Hot / Noisy / Slow Systems", "Spares Management (Hydraulic Hose Selection)", "Q&A and Post-Training Assessment"] },
    ],
  },
  {
    icon: <BarChart3 size={19} />,
    title: "Basics of Vibration Technology & Applications",
    duration: "3 Days",
    days: [
      { label: "Day 1 — Vibration Basics", items: ["Introduction to Vibration & Condition Monitoring", "Basic Vibration Theory (Frequency, Amplitude, Units)", "Time Waveform & Frequency Spectrum", "Machine Speed (RPM) & Fault Frequencies"] },
      { label: "Day 2 — Measurement & Fault Diagnosis", items: ["Vibration Sensors & Measurement Locations", "Data Collection & Trending", "Common Machine Faults: Unbalance, Misalignment, Looseness, Bearing Defects, Gear Faults"] },
      { label: "Day 3 — Applications & Reliability", items: ["Vibration Applications on Rotating Equipment", "Alarm Limits & Severity Assessment", "Practical Examples & Case Studies", "Q&A and Knowledge Check"] },
    ],
  },
];

const ThreeDayPrograms = () => {
  const refHead = useFU(0);

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
            <span style={{ fontSize:12.5, color:"#334155", fontWeight:500 }}>3-Day Programs</span>
          </div>

          <div className="tr-badge"><CalendarDays size={11} /> 3-Day Training</div>
          <h1 style={{ fontSize:"clamp(28px,4.5vw,52px)", fontWeight:800, color:"#1e293b", lineHeight:1.06, marginBottom:16 }}>
            3-Day{" "}
            <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Training Programs
            </span>
          </h1>
          <p style={{ fontSize:"clamp(14px,1.4vw,17px)", color:"#475569", lineHeight:1.75, marginBottom:16, maxWidth:580 }}>
            <strong style={{ color:"#b45309" }}>Skill Development with Hands-On Practice</strong> — structured classroom learning, practical sessions with instruments, live demonstrations and basic result interpretation.
          </p>

          <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:32 }}>
            {[{ num:"4", label:"Courses available" }, { num:"3", label:"Days per program" }, { num:"✓", label:"Certificate included" }].map((s) => (
              <div key={s.label} className="tr-stat" style={{ minWidth:110 }}>
                <div className="tr-stat-num">{s.num}</div>
                <div className="tr-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Link to="/contact" className="tr-btn-primary">Book a Course <ArrowRight size={16} /></Link>
            {/* <Link to="/training/five-day" className="tr-btn-ghost">5-Day Programs</Link> */}
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding:"80px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refHead} className="fu" style={{ textAlign:"center", marginBottom:48 }}>
            <div className="tr-badge" style={{ margin:"0 auto 12px" }}><CalendarDays size={11} /> Courses</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:700, color:"#0f1117" }}>Available 3-Day Courses</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"12px auto 0" }}>Click any course to expand the full day-by-day curriculum.</p>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {threeDayCourses.map((course, i) => {
              const [expanded, setExpanded] = useState(false);
              const ref = useFU(i * 80);
              return (
                <div ref={ref} key={course.title} className="tr-course-card fu">
                  <div className="tr-course-head" onClick={() => setExpanded(!expanded)}>
                    <div className="tr-course-icon">{course.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15, fontWeight:700, color:"#0f1117" }}>{course.title}</div>
                      <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>Duration: {course.duration}</div>
                    </div>
                    <ChevronRight size={16} style={{ color:"#f59e0b", transition:"transform 0.2s", transform:expanded ? "rotate(90deg)" : "rotate(0)", flexShrink:0 }} />
                  </div>
                  {expanded && (
                    <div className="tr-course-body">
                      {course.days.map((day) => (
                        <div key={day.label} className="tr-day-block">
                          <div className="tr-day-label">{day.label}</div>
                          {day.items.map((item) => (
                            <div key={item} className="tr-bullet">
                              <CheckCircle2 size={13} style={{ color:"#f59e0b", marginTop:2, flexShrink:0 }} />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default ThreeDayPrograms;
