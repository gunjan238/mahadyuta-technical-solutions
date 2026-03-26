import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Clock, ChevronRight, CheckCircle2,
  Zap, Thermometer, Eye, Settings, Droplets, Shield,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { trainingCss, useFU } from "@/pages/trainingShared";

/* ─── Types ─── */
interface Session { label: string; items: string[]; }
interface Course  { icon: React.ReactNode; title: string; sessions: Session[]; }

/* ─── Data ─── */
const oneDayCourses: Course[] = [
  {
    icon: <Zap size={19} />,
    title: "Leak Detection — Pressure & Vacuum Systems",
    sessions: [
      { label: "Session 1 — Fundamentals",         items: ["Basics of Pressure & Vacuum Systems", "Types of Leaks & Safety Precautions", "Impact of Leaks on Energy & Reliability", "Principle of Ultrasonic Leak Detection"] },
      { label: "Session 2 — Practical & Control",  items: ["Leak Detection in Air, Gas, Steam & Vacuum Systems", "Practical Scanning Techniques", "Leak Identification, Tagging & Reporting", "Repair Verification & Q&A"] },
    ],
  },
  {
    icon: <Thermometer size={19} />,
    title: "Basics of Infrared Thermal Analysis Technology",
    sessions: [
      { label: "Session 1 — IR Fundamentals",          items: ["Introduction to Infrared Thermography", "Basic Heat & Infrared Theory", "Emissivity, Reflections & Measurement Errors", "Safety Precautions"] },
      { label: "Session 2 — Applications & Hands-On",  items: ["Infrared Camera Basics & Settings", "Electrical & Mechanical Equipment Inspection", "Identifying Hot Spots & Abnormal Thermal Patterns", "Thermal Image Interpretation & Reporting"] },
    ],
  },
  {
    icon: <Eye size={19} />,
    title: "Basics of Acoustic Imaging Technology",
    sessions: [
      { label: "Session 1 — Fundamentals",             items: ["Introduction to Acoustic Imaging Technology", "Basics of Sound & Acoustic Principles", "How Acoustic Cameras Work (Microphone Arrays)", "Types of Faults Detected", "Safety Precautions"] },
      { label: "Session 2 — Applications & Hands-On",  items: ["Compressed Air & Gas Leak Detection", "Electrical Partial Discharge Detection", "Operating Acoustic Imaging Camera", "Image Interpretation & Reporting & Q&A"] },
    ],
  },
  {
    icon: <Settings size={19} />,
    title: "Basics of Endoscopy Techniques",
    sessions: [
      { label: "Session 1 — Fundamentals",             items: ["Introduction to Industrial Endoscopy", "Types of Endoscopes (Borescope, Videoscope)", "Camera, Lighting & Probe Basics", "Safety Precautions"] },
      { label: "Session 2 — Applications & Hands-On",  items: ["Internal Inspection of Machines & Components", "Welds, Pipes, Tubes & Cavities", "Endoscope Handling & Probe Insertion", "Inspection Reporting & Q&A"] },
    ],
  },
  {
    icon: <Droplets size={19} />,
    title: "Basics of Oil Analysis Techniques / Methods",
    sessions: [
      { label: "Session 1 — Fundamentals",              items: ["Introduction to Oil Analysis & Its Importance", "Functions of Lubricants in Machinery", "Types of Lubricating Oils & Additives", "Common Oil Degradation & Contamination Modes"] },
      { label: "Session 2 — Techniques & Hands-On",     items: ["Oil Sampling Methods & Best Practices", "Viscosity, Particle Contamination, Wear Debris & Moisture", "Proper Oil Sampling Demonstration", "Interpreting Basic Oil Test Results", "Reporting, Trending & Q&A"] },
    ],
  },
  {
    icon: <Shield size={19} />,
    title: "Fundamentals of Engineering Maintenance",
    sessions: [
      { label: "Session 1 — Maintenance Basics",        items: ["Introduction to Engineering Maintenance", "Role of Maintenance in Manufacturing Plants", "Types of Maintenance", "Maintenance Objectives: Safety, Reliability & Cost"] },
      { label: "Session 2 — Maintenance Management",    items: ["Maintenance Planning & Scheduling Basics", "Maintenance KPIs (MTBF, MTTR, Availability)", "Failure Concepts & P–F Curve (Overview)", "Asset Life Cycle & Maintenance Strategy Selection", "Q&A and Knowledge Review"] },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   CourseCard — zero hooks, pure presentational.
   isExpanded / onToggle come from the parent.
───────────────────────────────────────────────────────── */
const CourseCard = ({
  course,
  isExpanded,
  onToggle,
}: {
  course: Course;
  isExpanded: boolean;
  onToggle: () => void;
}) => (
  /*
   * KEY FIX: alignSelf:"start" on the card itself.
   * Without this, CSS grid stretches every cell in a row to match the
   * tallest cell — making collapsed cards look expanded.
   * alignSelf:"start" makes each card shrink to its own content height.
   */
  <div className="tr-course-card" style={{ alignSelf: "start" }}>
    <div className="tr-course-head" onClick={onToggle}>
      <div className="tr-course-icon">{course.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#0f1117", lineHeight: 1.3 }}>
          {course.title}
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>1 Day · 2 Sessions</div>
      </div>
      <ChevronRight
        size={16}
        style={{
          color: "#f59e0b", flexShrink: 0,
          transition: "transform 0.2s",
          transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
        }}
      />
    </div>

    {isExpanded && (
      <div className="tr-course-body">
        {course.sessions.map((s) => (
          <div key={s.label} className="tr-day-block">
            <div className="tr-day-label">{s.label}</div>
            {s.items.map((item) => (
              <div key={item} className="tr-bullet">
                <CheckCircle2 size={13} style={{ color: "#f59e0b", marginTop: 2, flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    )}
  </div>
);

/* ─── Page ─── */
const OneDayPrograms = () => {
  /*
   * null  = all collapsed.
   * number = only that index is open.
   * Clicking the open card collapses it; clicking another opens it.
   */
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const handleToggle = (i: number) =>
    setExpandedIndex((prev) => (prev === i ? null : i));

  const refHead = useFU(0);

  return (
    <div className="tr-page">
      <style>{trainingCss}</style>

      {/* ── HERO ── */}
      <section className="tr-hero">
        <img src={heroBg} alt="" className="tr-hero-photo" aria-hidden="true" />
        <div className="tr-hero-wash" />
        <div className="tr-hero-dots" />
        <div className="tr-hero-burst" />
        <div className="tr-hero-sky" />

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "72px 28px 64px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
            <Link to="/" style={{ fontSize: 12.5, color: "#64748b", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
            <Link to="/training/centre" style={{ fontSize: 12.5, color: "#64748b", textDecoration: "none" }}>Training</Link>
            <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
            <span style={{ fontSize: 12.5, color: "#334155", fontWeight: 500 }}>1-Day Programs</span>
          </div>

          <div className="tr-badge"><Clock size={11} /> 1-Day Training</div>

          <h1 style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.06, marginBottom: 16 }}>
            1-Day{" "}
            <span style={{
              background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Training Programs
            </span>
          </h1>

          <p style={{ fontSize: "clamp(14px,1.4vw,17px)", color: "#475569", lineHeight: 1.75, marginBottom: 16, maxWidth: 580 }}>
            <strong style={{ color: "#b45309" }}>Awareness &amp; Practical Exposure Programs</strong> — focused
            training on one or two selected technologies with live demonstrations, hands-on instruments and
            certificate distribution.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
            {[
              { num: "6", label: "Courses available"    },
              { num: "2", label: "Sessions per day"     },
              { num: "✓", label: "Certificate included" },
            ].map((s) => (
              <div key={s.label} className="tr-stat" style={{ minWidth: 110 }}>
                <div className="tr-stat-num">{s.num}</div>
                <div className="tr-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/contact" className="tr-btn-primary">Book a Course <ArrowRight size={16} /></Link>
            {/* <Link to="/training/three-day" className="tr-btn-ghost">3-Day Programs</Link> */}
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div ref={refHead} className="fu" style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="tr-badge" style={{ margin: "0 auto 12px" }}>
              <Clock size={11} /> Courses
            </div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>
              Available 1-Day Courses
            </h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>
              Click any course to expand the full session-by-session curriculum.
            </p>
          </div>

          {/*
            ── THE KEY FIX ──
            alignItems:"start" on the grid prevents CSS from stretching
            sibling cells to match the tallest card in each row.
            Without this, a collapsed card appears "expanded" because
            the grid inflates its height to match its expanded neighbour.
          */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(360px,1fr))",
            gap: 14,
            alignItems: "start",   /* ← prevents sibling height-stretching */
          }}>
            {oneDayCourses.map((course, i) => (
              <CourseCard
                key={course.title}
                course={course}
                isExpanded={expandedIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default OneDayPrograms;