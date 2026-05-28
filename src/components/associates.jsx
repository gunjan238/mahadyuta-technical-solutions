// // AssociatesAdvisors.jsx
// import { Link } from "react-router-dom";
// import {
//   ArrowRight, Globe, Award, Handshake, Users,
//   ChevronRight, CheckCircle2,
// } from "lucide-react";
// import heroBg from "@/assets/hero-bg.jpg";
// import { trainingCss, useFU } from "@/pages/trainingShared";

// /* ─────────────────────────────────────────────────────────
//     DATA
// ───────────────────────────────────────────────────────── */
// const associates = [
//   {
//     name: "Mobius Institute",
//     country: "Australia",
//     flag: "🇦🇺",
//     category: "Certification Body",
//     description:
//       "Global leader in reliability and condition monitoring education. Mahadyuta is an authorised Training Centre (ATC) and Authorised Exam Centre (AEC) — delivering ISO 18436-compliant certification programmes across vibration analysis, lubrication, and ultrasound.",
//     website: "https://www.mobiusinstitute.com",
//     tags: ["Vibration Analysis", "Lubrication", "Ultrasound", "ATC · AEC"],
//   },
//   {
//     name: "SDT Ultrasound Solutions",
//     country: "Belgium",
//     flag: "🇧🇪",
//     category: "Technology Partner",
//     description:
//       "Pioneers of industrial ultrasound instruments for leak detection, bearing inspection, and electrical asset monitoring. Mahadyuta is the authorised distributor and service partner for SDT products across India.",
//     website: "https://www.sdtultrasound.com",
//     tags: ["Leak Detection", "Bearing Inspection", "Partial Discharge"],
//   },
//   {
//     name: "FLIR Systems / Teledyne FLIR",
//     country: "USA",
//     flag: "🇺🇸",
//     category: "Technology Partner",
//     description:
//       "World-leading thermal imaging and infrared camera manufacturer. Mahadyuta integrates FLIR thermal cameras in its infrared thermography and hotspot monitoring solutions for electrical and mechanical assets.",
//     website: "https://www.flir.com",
//     tags: ["Infrared Thermography", "Thermal Imaging", "Hotspot Monitoring"],
//   },
//   {
//     name: "Pruftechnik (Fluke Reliability)",
//     country: "Germany",
//     flag: "🇩🇪",
//     category: "Technology Partner",
//     description:
//       "Precision alignment and vibration measurement specialists. Mahadyuta deploys Pruftechnik instrumentation in vibration monitoring, slow-speed bearing assessment, and machinery alignment programmes.",
//     website: "https://www.fluke.com/reliability",
//     tags: ["Vibration Monitoring", "Shaft Alignment", "CBM"],
//   },
//   {
//     name: "IIOT & CBM Solutions India",
//     country: "India",
//     flag: "🇮🇳",
//     category: "Technology Partner",
//     description:
//       "Specialists in Industrial Internet of Things platforms tailored for condition-based monitoring. Mahadyuta co-deploys wireless sensor networks and real-time dashboards for continuous asset health visibility.",
//     website: "#",
//     tags: ["IIoT", "CBM", "Wireless Sensors", "Dashboards"],
//   },
//   {
//     name: "Navi Mumbai Industrial Association",
//     country: "India",
//     flag: "🇮🇳",
//     category: "Industry Body",
//     description:
//       "Regional industry association linking Mahadyuta with manufacturing clusters across Navi Mumbai and the MIDC belt — enabling training outreach, awareness campaigns, and joint reliability workshops.",
//     website: "#",
//     tags: ["Industry Outreach", "Training", "MIDC"],
//   },
// ];

// const advisors = [
//   {
//     name: "Dr. Rajan Kulkarni",
//     title: "Principal Advisor — Condition Monitoring",
//     credentials: "PhD Mechanical Engineering · 30+ yrs industry experience",
//     bio: "Former Head of Reliability at Larsen & Toubro. Subject-matter expert in vibration analysis and predictive maintenance strategy. Guides Mahadyuta's technical curriculum and client engagements for heavy industry.",
//     expertise: ["Vibration Analysis", "Reliability Strategy", "Heavy Industry"],
//   },
//   {
//     name: "Mr. Suresh Patil",
//     title: "Advisor — Energy Auditing & Leak Management",
//     credentials: "BEE Certified Energy Auditor · Ex-PCRA Consultant",
//     bio: "Over 25 years in energy conservation audits across petrochemical, steel, and cement plants. Advises on Mahadyuta's compressed-air and steam trap audit methodologies and helps develop ROI frameworks for clients.",
//     expertise: ["Energy Auditing", "Compressed Air", "Steam Systems"],
//   },
//   {
//     name: "Ms. Priya Sharma",
//     title: "Advisor — Training & Skill Development",
//     credentials: "M.Ed · Certified Workplace Learning Professional",
//     bio: "Specialist in industrial skills development and competency frameworks. Shapes Mahadyuta's training design, learner assessment architecture, and the Centre of Excellence curriculum in alignment with national skill standards.",
//     expertise: ["Training Design", "Competency Frameworks", "Skill Standards"],
//   },
//   {
//     name: "Mr. Anand Menon",
//     title: "Advisor — Marine & Hull Integrity",
//     credentials: "Class-I Marine Engineer · 20+ yrs offshore experience",
//     bio: "Former Chief Engineer with major Indian shipping companies. Provides domain guidance on hull integrity assessment, marine equipment reliability, and ultrasound inspection protocols for the maritime sector.",
//     expertise: ["Marine Engineering", "Hull Assessment", "Offshore Assets"],
//   },
// ];

// /* ─────────────────────────────────────────────────────────
//     HELPER
// ───────────────────────────────────────────────────────── */
// const initials = (name) =>
//   name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

// /* ─────────────────────────────────────────────────────────
//     PAGE COMPONENT
// ───────────────────────────────────────────────────────── */
// const AssociatesAdvisors = () => {
//   const refAssoc   = useFU(0);
//   const refAdv     = useFU(0);

//   /* one ref per associate card — Rules of Hooks: top-level only */
//   const assocRefs = [
//     useFU(0),   useFU(60),  useFU(120),
//     useFU(180), useFU(240), useFU(300),
//   ];

//   /* one ref per advisor card */
//   const advRefs = [
//     useFU(0), useFU(80), useFU(160), useFU(240),
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
//           {/* Breadcrumb */}
//           <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
//             <Link to="/" style={{ fontSize: 12.5, color: "#64748b", textDecoration: "none" }}>Home</Link>
//             <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
//             <span style={{ fontSize: 12.5, color: "#334155", fontWeight: 500 }}>Associates &amp; Advisors</span>
//           </div>

//           <div className="tr-badge"><Handshake size={11} /> Our Network</div>

//           <h1 style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.06, marginBottom: 16 }}>
//             Associates &amp;{" "}
//             <span style={{
//               background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)",
//               WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
//             }}>
//               Advisors
//             </span>
//           </h1>

//           <p style={{ fontSize: "clamp(14px,1.4vw,17px)", color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 580 }}>
//             Mahadyuta's capabilities are amplified by a carefully chosen network of global technology
//             partners, certification bodies, and seasoned industry advisors — bringing world-class
//             expertise directly to your facility.
//           </p>

//           {/* Stats strip */}
//           <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
//             {[
//               { num: "6+",   label: "Global Associates"         },
//               { num: "4",    label: "Expert Advisors"           },
//               { num: "12+",  label: "Countries Represented"     },
//               { num: "100+", label: "Combined Yrs Experience"   },
//             ].map((s) => (
//               <div key={s.label} className="tr-stat" style={{ minWidth: 110 }}>
//                 <div className="tr-stat-num">{s.num}</div>
//                 <div className="tr-stat-label">{s.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── ASSOCIATES ── */}
//       <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }}>

//           {/* Heading */}
//           <div ref={refAssoc} className="fu" style={{ marginBottom: 48 }}>
//             <div className="tr-badge"><Globe size={11} /> Technology &amp; Certification Partners</div>
//             <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117", margin: "10px 0 10px" }}>
//               Our Associates
//             </h2>
//             <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, maxWidth: 560, margin: 0 }}>
//               Authorised partnerships with leading global manufacturers and certification bodies ensure
//               Mahadyuta clients receive best-in-class instruments, methods, and credentials.
//             </p>
//           </div>

//           {/* Cards grid */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 20 }}>
//             {associates.map((a, i) => (
//               <div
//                 key={a.name}
//                 ref={assocRefs[i]}
//                 className="fu"
//                 style={{
//                   background: "#fff",
//                   border: "1px solid #eef0f4",
//                   borderRadius: 16,
//                   padding: "24px 22px",
//                   display: "flex", flexDirection: "column", gap: 14,
//                   boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
//                   transition: "box-shadow 0.2s, transform 0.2s, border-color 0.2s",
//                 }}
//                 onMouseEnter={e => {
//                   e.currentTarget.style.boxShadow = "0 10px 32px rgba(0,0,0,0.09)";
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                   e.currentTarget.style.borderColor = "rgba(245,158,11,0.35)";
//                 }}
//                 onMouseLeave={e => {
//                   e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.borderColor = "#eef0f4";
//                 }}
//               >
//                 {/* Top row: flag + category badge */}
//                 <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
//                   <span style={{ fontSize: 28, lineHeight: 1 }}>{a.flag}</span>
//                   <span style={{
//                     fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
//                     color: "#b45309", background: "rgba(245,158,11,0.1)",
//                     border: "1px solid rgba(245,158,11,0.25)",
//                     padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap",
//                   }}>
//                     {a.category}
//                   </span>
//                 </div>

//                 {/* Name + country */}
//                 <div>
//                   <div style={{ fontSize: 17, fontWeight: 700, color: "#0f1117", marginBottom: 2 }}>{a.name}</div>
//                   <div style={{ fontSize: 12, color: "#94a3b8" }}>{a.country}</div>
//                 </div>

//                 {/* Divider */}
//                 <div style={{ height: 1, background: "#f1f5f9" }} />

//                 {/* Description */}
//                 <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.65, margin: 0, flex: 1 }}>
//                   {a.description}
//                 </p>

//                 {/* Tags */}
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//                   {a.tags.map((t) => (
//                     <span key={t} className="tr-skill-pill" style={{ fontSize: 11 }}>
//                       <span className="tr-skill-dot" />{t}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Website link */}
//                 {a.website !== "#" && (
//                   <a
//                     href={a.website}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{
//                       display: "inline-flex", alignItems: "center", gap: 6,
//                       fontSize: 13, fontWeight: 600, color: "#b45309",
//                       textDecoration: "none", marginTop: 2,
//                     }}
//                   >
//                     Visit website <ArrowRight size={13} />
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── BECOME AN ASSOCIATE BANNER ── */}
//       <section style={{ background: "#fffbeb", padding: "48px 28px", borderTop: "1px solid #fde68a", borderBottom: "1px solid #fde68a" }}>
//         <div style={{
//           maxWidth: 1280, margin: "0 auto",
//           display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
//         }}>
//           <div style={{
//             width: 48, height: 48, borderRadius: 12,
//             background: "rgba(245,158,11,0.12)",
//             display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//           }}>
//             <Award size={22} style={{ color: "#f59e0b" }} />
//           </div>
//           <div style={{ flex: 1, minWidth: 220 }}>
//             <div style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 4 }}>
//               Interested in becoming an associate?
//             </div>
//             <div style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6 }}>
//               We welcome technology partners, regional distributors, and certification bodies who share
//               our commitment to industrial reliability excellence.
//             </div>
//           </div>
//           <Link to="/contact" className="tr-btn-primary" style={{ flexShrink: 0 }}>
//             Get in touch <ArrowRight size={15} />
//           </Link>
//         </div>
//       </section>

//       {/* ── ADVISORS ── */}
//       <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "80px 28px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }}>

//           {/* Heading */}
//           <div ref={refAdv} className="fu" style={{ marginBottom: 48 }}>
//             <div className="tr-badge"><Users size={11} /> Industry Experts</div>
//             <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0f1117", margin: "10px 0 10px" }}>
//               Our Advisors
//             </h2>
//             <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, maxWidth: 560, margin: 0 }}>
//               A panel of domain experts who guide our technical methods, training curricula, and
//               sector-specific service delivery — drawing on decades of hands-on industry experience.
//             </p>
//           </div>

//           {/* Advisor cards */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
//             {advisors.map((adv, i) => (
//               <div
//                 key={adv.name}
//                 ref={advRefs[i]}
//                 className="fu"
//                 style={{
//                   background: "#fff",
//                   border: "1px solid #eef0f4",
//                   borderRadius: 16,
//                   padding: "24px 22px",
//                   display: "flex", flexDirection: "column", gap: 0,
//                   boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
//                   transition: "box-shadow 0.2s, transform 0.2s, border-color 0.2s",
//                 }}
//                 onMouseEnter={e => {
//                   e.currentTarget.style.boxShadow = "0 10px 32px rgba(0,0,0,0.09)";
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                   e.currentTarget.style.borderColor = "rgba(245,158,11,0.35)";
//                 }}
//                 onMouseLeave={e => {
//                   e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.borderColor = "#eef0f4";
//                 }}
//               >
//                 {/* Avatar */}
//                 <div style={{
//                   width: 52, height: 52, borderRadius: 13,
//                   background: "linear-gradient(135deg,#f59e0b,#ea580c)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   fontSize: 18, fontWeight: 800, color: "#fff",
//                   marginBottom: 16, flexShrink: 0,
//                 }}>
//                   {initials(adv.name)}
//                 </div>

//                 {/* Name */}
//                 <div style={{ fontSize: 16, fontWeight: 700, color: "#0f1117", marginBottom: 3 }}>
//                   {adv.name}
//                 </div>

//                 {/* Title */}
//                 <div style={{ fontSize: 12.5, fontWeight: 600, color: "#b45309", marginBottom: 4 }}>
//                   {adv.title}
//                 </div>

//                 {/* Credentials */}
//                 <div style={{ fontSize: 11.5, color: "#94a3b8", lineHeight: 1.5, marginBottom: 14 }}>
//                   {adv.credentials}
//                 </div>

//                 {/* Divider */}
//                 <div style={{ height: 1, background: "#f1f5f9", marginBottom: 14 }} />

//                 {/* Bio */}
//                 <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.65, margin: "0 0 16px", flex: 1 }}>
//                   {adv.bio}
//                 </p>

//                 {/* Expertise tags */}
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//                   {adv.expertise.map((e) => (
//                     <span key={e} className="tr-skill-pill" style={{ fontSize: 11 }}>
//                       <span className="tr-skill-dot" />{e}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

      
//     </div>
//   );
// };

// export default AssociatesAdvisors;