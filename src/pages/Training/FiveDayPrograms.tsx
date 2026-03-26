import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, ChevronRight, CheckCircle2, Clock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { trainingCss, useFU } from "@/pages/trainingShared";

/* ─── Data ─── */
const highlights = [
  "Comprehensive training across multiple technologies",
  "In-depth classroom sessions + extensive hands-on practice",
  "Data collection, basic analysis & case discussions",
  "Real-plant applications, benefits & limitations",
  "Q&A, assessment, and certificate distribution",
];

const included = [
  { title: "MOBIUS Certified Content",   desc: "Course material aligned with Mobius Institute international standards." },
  { title: "Hands-On Instrument Time",   desc: "Extended practical sessions using real industrial instruments." },
  { title: "Case Study Workshops",       desc: "Analysis of real-world plant data and fault examples." },
  { title: "Assessment & Certification", desc: "Written and practical assessment followed by certificate distribution." },
  { title: "Experienced Trainers",       desc: "Delivered by industry practitioners with deep field experience." },
  { title: "Facility Access",            desc: "Full access to the Centre of Excellence defect simulation panels." },
];

const sampleSchedule = [
  {
    day: "Day 1", theme: "Foundations & Safety",
    color: "linear-gradient(135deg,#f59e0b,#ea580c)",
    topics: ["Manufacturing plant overview", "Equipment failure concepts & P–F curve", "Types and objectives of maintenance", "Introduction to condition monitoring technologies", "Industrial safety essentials"],
  },
  {
    day: "Day 2", theme: "Energy & Process Technologies",
    color: "linear-gradient(135deg,#f97316,#dc2626)",
    topics: ["Compressed air leak detection principles", "Ultrasound fundamentals & airborne applications", "Steam trap testing — ultrasound + temperature", "Valve pass detection & hydraulic systems", "Hands-on: ultrasonic scanning practice"],
  },
  {
    day: "Day 3", theme: "Electrical & Mechanical Diagnostics",
    color: "linear-gradient(135deg,#b45309,#92400e)",
    topics: ["Electrical partial discharge detection", "Infrared thermography — electrical applications", "Vibration analysis basics & fault diagnosis", "Bearing condition monitoring & lubrication", "Hands-on: vibration and thermal tools"],
  },
  {
    day: "Day 4", theme: "Advanced Applications & Data Analysis",
    color: "linear-gradient(135deg,#0ea5e9,#0369a1)",
    topics: ["Data collection best practices", "Basic data analysis and result interpretation", "Case study workshops on real plant data", "Oil analysis techniques & sampling", "Acoustic imaging technology applications"],
  },
  {
    day: "Day 5", theme: "Reliability Strategy & Assessment",
    color: "linear-gradient(135deg,#16a34a,#065f46)",
    topics: ["Integrated reliability approach", "Mapping technologies to plant equipment", "Real-plant application planning", "Final assessment — written & practical", "Certificate distribution & graduation"],
  },
];

/* ─────────────────────────────────────────────────────────
   DayCard — zero hooks, receives all data as props.
   The parent calls useFU per card BEFORE the return, not
   inside .map(), so hooks rules are satisfied.
───────────────────────────────────────────────────────── */
const DayCard = ({
  day, theme, color, topics, cardRef,
}: {
  day: string; theme: string; color: string;
  topics: string[];
  cardRef: React.RefObject<HTMLDivElement>;
}) => (
  <div
    ref={cardRef}
    className="fu"
    style={{
      background: "#fff",
      border: "1px solid #eef0f4",
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      transition: "box-shadow 0.22s, transform 0.22s",
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.11)";
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
    }}
  >
    {/* Coloured header strip */}
    <div style={{ background: color, padding: "18px 22px", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12, flexShrink: 0,
        background: "rgba(255,255,255,0.22)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 16, fontWeight: 900, color: "#fff" }}>
          {day.replace("Day ", "")}
        </span>
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.70)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
          {day}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginTop: 2 }}>
          {theme}
        </div>
      </div>
    </div>

    {/* Topic list */}
    <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 8 }}>
      {topics.map((t) => (
        <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <CheckCircle2
            size={14}
            style={{ color: "#f59e0b", flexShrink: 0, marginTop: 2 }}
          />
          <span style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55 }}>{t}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Page ─── */
const FiveDayPrograms = () => {
  const refHead     = useFU(0);
  const refSchedule = useFU(0);

  /*
   * useFU called once per schedule card at the TOP LEVEL of the component,
   * NOT inside .map(). This satisfies the Rules of Hooks.
   * The returned refs are collected into an array and matched by index below.
   */
  const dayRefs = [
    useFU(0),
    useFU(100),
    useFU(200),
    useFU(300),
    useFU(400),
  ];

  return (
    <div className="tr-page">
      <style>{trainingCss}</style>

      {/* ── HERO ── */}
      <section className="tr-hero">
        <img src={heroBg} alt="" className="tr-hero-photo" aria-hidden="true" />
        <div className="tr-hero-wash" /><div className="tr-hero-dots" />
        <div className="tr-hero-burst" /><div className="tr-hero-sky" />

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "72px 28px 64px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
            <Link to="/" style={{ fontSize: 12.5, color: "#64748b", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
            <Link to="/training/centre" style={{ fontSize: 12.5, color: "#64748b", textDecoration: "none" }}>Training</Link>
            <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
            <span style={{ fontSize: 12.5, color: "#334155", fontWeight: 500 }}>5-Day Programs</span>
          </div>

          <div className="tr-badge"><CalendarDays size={11} /> 5-Day Training</div>
          <h1 style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.06, marginBottom: 16 }}>
            5-Day{" "}
            <span style={{ background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Training Programs
            </span>
          </h1>
          <p style={{ fontSize: "clamp(14px,1.4vw,17px)", color: "#475569", lineHeight: 1.75, marginBottom: 16, maxWidth: 580 }}>
            <strong style={{ color: "#b45309" }}>Comprehensive Advanced Practical Training</strong> — the deepest dive into industrial reliability technologies, combining theory, extensive hands-on practice and real-plant case analysis.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
            {[
              { num: "5",      label: "Days duration"       },
              { num: "9+",     label: "Technologies covered" },
              { num: "MOBIUS", label: "Certified content"    },
            ].map((s) => (
              <div key={s.label} className="tr-stat" style={{ minWidth: 120 }}>
                <div className="tr-stat-num">{s.num}</div>
                <div className="tr-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/contact" className="tr-btn-primary">Book This Program <ArrowRight size={16} /></Link>
            {/* <Link to="/training/certification" className="tr-btn-ghost">Certification Courses</Link> */}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="tr-two-col">
          <div ref={refHead} className="fu">
            <div className="tr-badge"><Clock size={11} /> Program Highlights</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "#0f1117", marginBottom: 20 }}>
              What the 5-Day Program Covers
            </h2>
            {highlights.map((h) => (
              <div key={h} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12, padding: "14px 16px", background: "#fff", borderRadius: 12, border: "1px solid #eef0f4" }}>
                <CheckCircle2 size={15} style={{ color: "#f59e0b", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14, color: "#334155", lineHeight: 1.6 }}>{h}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="tr-badge" style={{ marginBottom: 16 }}><CalendarDays size={11} /> What You Get</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "#0f1117", marginBottom: 20 }}>
              Included in Every Program
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {included.map((item) => (
                <div key={item.title} className="tr-feature" style={{ padding: "16px 18px" }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f1117", marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.55 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SAMPLE 5-DAY SCHEDULE — card grid ── */}
      <section style={{ background: "#fffbeb", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refSchedule} className="fu" style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="tr-badge" style={{ margin: "0 auto 12px" }}>
              <CalendarDays size={11} /> Schedule
            </div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>
              Sample 5-Day Schedule
            </h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>
              Actual content customised to your organisation's technology and equipment profile.
            </p>
          </div>

          {/*
            Each DayCard is rendered with its pre-created ref from dayRefs[].
            The grid uses align-items:start so card heights are independent.
          */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 18,
            alignItems: "start",   /* prevents cards stretching to match tallest sibling */
          }}>
            {sampleSchedule.map((d, i) => (
              <DayCard
                key={d.day}
                day={d.day}
                theme={d.theme}
                color={d.color}
                topics={d.topics}
                cardRef={dayRefs[i]}
              />
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default FiveDayPrograms;