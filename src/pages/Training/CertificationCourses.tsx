// import { Link } from "react-router-dom";
// import { ArrowRight, Award, ChevronRight, CheckCircle2, Users } from "lucide-react";
// import heroBg from "@/assets/hero-bg.jpg";
// import { trainingCss, useFU } from "@/pages/trainingShared";

// const certifications = [
//   {
//     badge: "ATC",
//     title: "Mobius Institute — Authorised Training Centre",
//     subtitle: "MOBIUS ATC · Ultrasound & Reliability",
//     desc: "Mahadyuta is an Authorised Training Centre for Mobius Institute, Australia — delivering internationally recognised certification courses in ultrasound analysis and industrial reliability.",
//     items: ["MOBIUS Level 1 Ultrasound Analysis", "MOBIUS Level 2 Ultrasound Analysis", "Structured curriculum aligned to international standards", "Practical assessments with certified instruments"],
//     color: "linear-gradient(135deg,#f59e0b,#ea580c)",
//   },
//   {
//     badge: "AEC",
//     title: "Mobius Institute — Authorised Examination Centre",
//     subtitle: "MOBIUS AEC · Board of Certification",
//     desc: "As an Authorised Examination Centre, Mahadyuta administers official Mobius Institute certification examinations — giving candidates a recognised credential for their industrial reliability skills.",
//     items: ["Official MOBIUS examination administration", "Board of Certification recognised credentials", "Written and practical examination formats", "Internationally accepted certification"],
//     color: "linear-gradient(135deg,#ea580c,#b91c1c)",
//   },
//   {
//     badge: "MSME",
//     title: "MSME Registered",
//     subtitle: "Micro, Small & Medium Enterprises",
//     desc: "Registered with the Government of India MSME scheme — making Mahadyuta's training programs eligible for government skill development subsidies and corporate CSR programs.",
//     items: ["Government of India registered", "Eligible for MSME skill development schemes", "CSR training program support", "DPIIT #StartupIndia recognised"],
//     color: "linear-gradient(135deg,#0ea5e9,#0369a1)",
//   },
//   {
//     badge: "SONOTEC",
//     title: "SONOTEC Official Training Partner",
//     subtitle: "Ultrasonic Solutions · Germany",
//     desc: "Official training partner of SONOTEC Germany — using their SONAPHONE series of professional ultrasonic instruments for all hands-on training sessions.",
//     items: ["SONAPHONE professional instruments", "SONOTEC certified training content", "Latest ultrasound technology hardware", "Direct access to German engineering expertise"],
//     color: "linear-gradient(135deg,#475569,#1e293b)",
//   },
// ];

// const audienceList = [
//   "Plant Maintenance Engineers",
//   "Reliability Professionals",
//   "Energy Managers",
//   "Technical Officers from MSMEs",
//   "Corporate Engineering & Safety Teams",
// ];

// /* ─────────────────────────────────────────────────────────
//    CertCard — zero hooks, receives ref from parent.
//    useFU is called at the top level of the page component,
//    NOT inside .map(), satisfying the Rules of Hooks.
// ───────────────────────────────────────────────────────── */
// const CertCard = ({
//   c,
//   cardRef,
// }: {
//   c: typeof certifications[0];
//   cardRef: React.RefObject<HTMLDivElement>;
// }) => (
//   <div ref={cardRef} className="tr-course-card fu" style={{ alignSelf: "start" }}>
//     {/* Coloured top bar */}
//     <div style={{ height: 4, background: c.color }} />
//     <div style={{ padding: "24px 24px 22px" }}>
//       {/* Badge + title row */}
//       <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
//         <div style={{ width: 48, height: 48, borderRadius: 12, background: c.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//           <Award size={22} color="#fff" />
//         </div>
//         <div>
//           <div style={{ fontSize: 18, fontWeight: 900, color: "#1e293b" }}>{c.badge}</div>
//           <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{c.subtitle}</div>
//         </div>
//       </div>
//       <div style={{ fontSize: 14, fontWeight: 700, color: "#0f1117", marginBottom: 8, lineHeight: 1.35 }}>{c.title}</div>
//       <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65, marginBottom: 16 }}>{c.desc}</p>
//       <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
//         {c.items.map((item) => (
//           <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "#475569" }}>
//             <CheckCircle2 size={13} style={{ color: "#f59e0b", flexShrink: 0, marginTop: 2 }} />
//             {item}
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// /* ─── Page ─── */
// const CertificationCourses = () => {
//   const refHead = useFU(0);
//   const refAud  = useFU(0);

//   /* One useFU per certification card — called at TOP LEVEL, not inside .map() */
//   const certRefs = [
//     useFU(0),
//     useFU(100),
//     useFU(200),
//     useFU(300),
//   ];

//   return (
//     <div className="tr-page">
//       <style>{trainingCss}</style>

//       {/* ── HERO ── */}
//       <section className="tr-hero">
//         <img src={heroBg} alt="" className="tr-hero-photo" aria-hidden="true" />
//         <div className="tr-hero-wash" /><div className="tr-hero-dots" />
//         <div className="tr-hero-burst" /><div className="tr-hero-sky" />

//         <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "72px 28px 64px", width: "100%" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
//             <Link to="/" style={{ fontSize: 12.5, color: "#64748b", textDecoration: "none" }}>Home</Link>
//             <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
//             <Link to="/training/centre" style={{ fontSize: 12.5, color: "#64748b", textDecoration: "none" }}>Training</Link>
//             <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
//             <span style={{ fontSize: 12.5, color: "#334155", fontWeight: 500 }}>Certification Courses</span>
//           </div>

//           <div className="tr-badge"><Award size={11} /> Certification</div>
//           <h1 style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.06, marginBottom: 16 }}>
//             Certification{" "}
//             <span style={{ background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
//               Courses
//             </span>
//           </h1>
//           <p style={{ fontSize: "clamp(14px,1.4vw,17px)", color: "#475569", lineHeight: 1.75, marginBottom: 16, maxWidth: 580 }}>
//             Internationally recognised certification delivered through Mobius Institute — the world's leading authority in reliability and condition monitoring training.
//           </p>

//           <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
//             {[
//               { num: "2",   label: "MOBIUS courses"            },
//               { num: "ATC", label: "Authorised Training Centre" },
//               { num: "AEC", label: "Authorised Exam Centre"     },
//             ].map((s) => (
//               <div key={s.label} className="tr-stat" style={{ minWidth: 130 }}>
//                 <div className="tr-stat-num">{s.num}</div>
//                 <div className="tr-stat-label">{s.label}</div>
//               </div>
//             ))}
//           </div>

//           <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//             <Link to="/contact" className="tr-btn-primary">Enquire About Certification <ArrowRight size={16} /></Link>
//             {/* <a href="https://www.mobiusinstitute.com/miboc/" target="_blank" rel="noopener noreferrer" className="tr-btn-ghost">
//               Mobius Institute
//             </a> */}
//           </div>
//         </div>
//       </section>

//       {/* ── CERTIFICATION CARDS ── */}
//       <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }}>
//           <div ref={refHead} className="fu" style={{ textAlign: "center", marginBottom: 52 }}>
//             <div className="tr-badge" style={{ margin: "0 auto 12px" }}><Award size={11} /> Authorisations</div>
//             <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>
//               Our Certifications & Partnerships
//             </h2>
//             <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>
//               Four authorisations that guarantee the quality and international recognition of every course we deliver.
//             </p>
//           </div>

//           {/* alignItems:"start" so cards don't stretch to match the tallest sibling */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20, alignItems: "start" }}>
//             {certifications.map((c, i) => (
//               <CertCard key={c.badge} c={c} cardRef={certRefs[i]} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── WHO SHOULD ATTEND — centered ── */}
//       <section style={{ background: "#fffbeb", padding: "72px 28px" }}>
//         <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
//           <div ref={refAud} className="fu">
//             <div className="tr-badge" style={{ margin: "0 auto 16px" }}>
//               <Users size={11} /> Who Should Attend
//             </div>
//             <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "#0f1117", marginBottom: 28 }}>
//               Built for Industrial Professionals
//             </h2>

//             {/* Pills centered with flex-wrap */}
//             <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
//               {audienceList.map((a) => (
//                 <div
//                   key={a}
//                   className="tr-audience-pill"
//                   style={{ justifyContent: "center" }}
//                 >
//                   <CheckCircle2 size={15} style={{ color: "#f59e0b", flexShrink: 0 }} />
//                   {a}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

      
//     </div>
//   );
// };

// export default CertificationCourses;





import { Link } from "react-router-dom";
import { ArrowRight, Award, ChevronRight, CheckCircle2, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { trainingCss, useFU } from "@/pages/trainingShared";

const certifications = [
  {
    badge: "ATC",
    title: "Mobius Institute — Authorised Training Centre",
    subtitle: "MOBIUS ATC · Ultrasound & Reliability",
    desc: "Mahadyuta is an Authorised Training Centre for Mobius Institute, Australia — delivering internationally recognised certification courses in ultrasound analysis and industrial reliability.",
    items: ["MOBIUS Level 1 Ultrasound Analysis", "MOBIUS Level 2 Ultrasound Analysis", "Structured curriculum aligned to international standards", "Practical assessments with certified instruments"],
    color: "linear-gradient(135deg,#f59e0b,#ea580c)",
  },
  {
    badge: "AEC",
    title: "Mobius Institute — Authorised Examination Centre",
    subtitle: "MOBIUS AEC · Board of Certification",
    desc: "As an Authorised Examination Centre, Mahadyuta administers official Mobius Institute certification examinations — giving candidates a recognised credential for their industrial reliability skills.",
    items: ["Official MOBIUS examination administration", "Board of Certification recognised credentials", "Written and practical examination formats", "Internationally accepted certification"],
    color: "linear-gradient(135deg,#ea580c,#b91c1c)",
  },
  {
    badge: "MSME",
    title: "MSME Registered",
    subtitle: "Micro, Small & Medium Enterprises",
    desc: "Registered with the Government of India MSME scheme — making Mahadyuta's training programs eligible for government skill development subsidies and corporate CSR programs.",
    items: ["Government of India registered", "Eligible for MSME skill development schemes", "CSR training program support", "DPIIT #StartupIndia recognised"],
    color: "linear-gradient(135deg,#0ea5e9,#0369a1)",
  },
  {
    badge: "SONOTEC",
    title: "SONOTEC Official Training Partner",
    subtitle: "Ultrasonic Solutions · Germany",
    desc: "Official training partner of SONOTEC Germany — using their SONAPHONE series of professional ultrasonic instruments for all hands-on training sessions.",
    items: ["SONAPHONE professional instruments", "SONOTEC certified training content", "Latest ultrasound technology hardware", "Direct access to German engineering expertise"],
    color: "linear-gradient(135deg,#475569,#1e293b)",
  },
];

const audienceList = [
  "Plant Maintenance Engineers",
  "Reliability Professionals",
  "Energy Managers",
  "Technical Officers from MSMEs",
  "Corporate Engineering & Safety Teams",
];

/* ─────────────────────────────────────────────────────────
   CertCard — zero hooks, receives ref from parent.
   display:flex + flexDirection:column + height:100% ensures
   every card stretches to fill the grid row uniformly.
───────────────────────────────────────────────────────── */
const CertCard = ({ c, cardRef }) => (
  <div
    ref={cardRef}
    className="tr-course-card fu"
    style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",           /* fill grid cell → equal height across all cards */
    }}
  >
    {/* Coloured top bar */}
    <div style={{ height: 4, background: c.color, flexShrink: 0 }} />

    <div style={{ padding: "24px 24px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
      {/* Badge + title row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: c.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Award size={22} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#1e293b" }}>{c.badge}</div>
          <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{c.subtitle}</div>
        </div>
      </div>

      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f1117", marginBottom: 8, lineHeight: 1.35 }}>
        {c.title}
      </div>

      <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65, marginBottom: 16 }}>
        {c.desc}
      </p>

      {/* flex:1 pushes the checklist to fill remaining vertical space */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
        {c.items.map((item) => (
          <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "#475569" }}>
            <CheckCircle2 size={13} style={{ color: "#f59e0b", flexShrink: 0, marginTop: 2 }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Page ─── */
const CertificationCourses = () => {
  const refHead = useFU(0);
  const refAud  = useFU(0);

  /* One useFU per certification card — called at TOP LEVEL, not inside .map() */
  const certRefs = [
    useFU(0),
    useFU(100),
    useFU(200),
    useFU(300),
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
            <span style={{ fontSize: 12.5, color: "#334155", fontWeight: 500 }}>Certification Courses</span>
          </div>

          <div className="tr-badge"><Award size={11} /> Certification</div>
          <h1 style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.06, marginBottom: 16 }}>
            Certification{" "}
            <span style={{
              background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Courses
            </span>
          </h1>
          <p style={{ fontSize: "clamp(14px,1.4vw,17px)", color: "#475569", lineHeight: 1.75, marginBottom: 16, maxWidth: 580 }}>
            Internationally recognised certification delivered through Mobius Institute — the world's leading authority in reliability and condition monitoring training.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
            {[
              { num: "2",   label: "MOBIUS courses"            },
              { num: "ATC", label: "Authorised Training Centre" },
              { num: "AEC", label: "Authorised Exam Centre"     },
            ].map((s) => (
              <div key={s.label} className="tr-stat" style={{ minWidth: 130 }}>
                <div className="tr-stat-num">{s.num}</div>
                <div className="tr-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/contact" className="tr-btn-primary">
              Enquire About Certification <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATION CARDS ── */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={refHead} className="fu" style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="tr-badge" style={{ margin: "0 auto 12px" }}>
              <Award size={11} /> Authorisations
            </div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117" }}>
              Our Certifications & Partnerships
            </h2>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 520, margin: "12px auto 0" }}>
              Four authorisations that guarantee the quality and international recognition of every course we deliver.
            </p>
          </div>

          {/*
            repeat(4, 1fr) → all 4 cards in one row, equal width.
            alignItems:stretch (default) → all cells share the tallest card's height.
            CertCard uses height:100% + flex-column so the card fills its cell fully.
          */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            alignItems: "stretch",
          }}>
            {certifications.map((c, i) => (
              <CertCard key={c.badge} c={c} cardRef={certRefs[i]} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD ATTEND — centered ── */}
      <section style={{ background: "#fffbeb", padding: "72px 28px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div ref={refAud} className="fu">
            <div className="tr-badge" style={{ margin: "0 auto 16px" }}>
              <Users size={11} /> Who Should Attend
            </div>
            <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "#0f1117", marginBottom: 28 }}>
              Built for Industrial Professionals
            </h2>

            {/* Pills centered with flex-wrap */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {audienceList.map((a) => (
                <div
                  key={a}
                  className="tr-audience-pill"
                  style={{ justifyContent: "center" }}
                >
                  <CheckCircle2 size={15} style={{ color: "#f59e0b", flexShrink: 0 }} />
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CertificationCourses;