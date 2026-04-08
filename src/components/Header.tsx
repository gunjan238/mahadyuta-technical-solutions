// import { useState, useRef, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   ChevronDown, Menu, X, Zap, BarChart2, Monitor,
//   GraduationCap, BookOpen, Clock, CalendarDays, Award,
//   ArrowRight,
// } from "lucide-react";
// import logo from "@/assets/logo.png";

// /* ─────────────────────────────────────────────────────────
//     NAVIGATION DATA  (unchanged)
// ───────────────────────────────────────────────────────── */
// const navigation = [
//   { label: "Home", path: "/" },
//   { label: "About", path: "/about" },
//   {
//     label: "Services",
//     mega: true,
//     columns: [
//       {
//         label: "Energy Optimization",
//         icon: <Zap size={13} />,
//         links: [
//           { label: "Compressed Air Leak Detection", path: "/services/compressed-air" },
//           { label: "Internal Hydraulic/Pneumatic Leak Detection", path: "/services/hydraulic-pneumatic" },
//           { label: "Steam Trap/Valve Pass Audit", path: "/services/steam-trap" },
//           { label: "Air/Water Tight Integrity Assessment", path: "/services/air-water-tight" },
//           { label: "Underground Leak Detection", path: "/services/underground-leak" },
//         ],
//       },
//       {
//         label: "Predictive Analytics",
//         icon: <BarChart2 size={13} />,
//         groups: [
//           {
//             heading: "Electrical Asset Monitoring",
//             links: [
//               { label: "Partial Discharge Detection", path: "/services/partial-discharge" },
//               { label: "Infrared Thermography Checks", path: "/services/infrared-thermography" },
//             ],
//           },
//           {
//             heading: "Bearing Condition Assessment",
//             links: [
//               { label: "Slow Speed Bearing Inspection", path: "/services/bearing-inspection" },
//               { label: "Lubrication Management", path: "/services/lubrication-management" },
//               { label: "Vibration Monitoring", path: "/services/vibration-monitoring" },
//             ],
//           },
//           {
//             heading: "Other Services",
//             links: [
//               { label: "Hull Integrity Assessment", path: "/services/hull-integrity" },
//               { label: "Thermal Monitoring & Automation", path: "/services/thermal-monitoring" },
//               { label: "Industrial Endoscopy", path: "/services/industrial-endoscopy" },
//             ],
//           },
//         ],
//       },
//       // {
//       //   label: "IT Services",
//       //   icon: <Monitor size={13} />,
//       //   links: [
//       //     { label: "Unified Network & Communication", path: "/services/network-communication" },
//       //     { label: "Cloud Services", path: "/services/cloud-services" },
//       //     { label: "Surveillance & Access Control", path: "/services/access-control" },
//       //     { label: "Backup Facility", path: "/services/backup-facility" },
//       //     { label: "Managed IT Services", path: "/services/it-consultancy" },
//       //   ],
//       // },
//     ],
//   },
//   {
//     label: "Products",
//     items: [
//       { label: "Ultra Sound Testing Devices", path: "/products/ultrasound-device" },
//       { label: "CBM with IIoT", path: "/products/monitoring-systems" },
//       { label: "Anti-Scaling Devices", path: "/products/scaling-devices" },
//       { label: "Advanced Thermal Hotspot Monitoring / Solutions", path: "/products/thermal-hotspot-monitoring" },
      
//       { label: "Thermal Cameras", path: "/products/thermal-cameras" },
//       { label: "Thermal Hotspot Monitoring", path: "/products/automated-thermal-monitoring" },
//       { label: "Industrial Endoscopes", path: "/products/endoscopes" },
//     ],
//   },
//   {
//     label: "Training",
//     training: true,
//     items: [
//       { label: "Centre of Excellence", icon: <GraduationCap size={14} />, path: "/centre", desc: "State-of-the-art facility · Navi Mumbai" },
//       { label: "Skill Development Programs", icon: <BookOpen size={14} />, path: "/skill-programs", desc: "15 technology modules covered" },
//       { label: "1-Day Training Programs", icon: <Clock size={14} />, path: "/one-day", desc: "Leak Detection, IR Thermal, Acoustic, Oil Analysis…" },
//       { label: "3-Day Training Programs", icon: <CalendarDays size={14} />, path: "/three-day", desc: "Condition Monitoring, Ultrasound, Hydraulics, Vibration" },
//       { label: "5-Day Training Programs", icon: <CalendarDays size={14} />, path: "/five-day", desc: "Comprehensive advanced practical training" },
//       { label: "Certification Courses", icon: <Award size={14} />, path: "/certification", desc: "Mobius Institute ATC & AEC authorised" },
//     ],
//   },
//   { label: "Gallery", path: "/gallery" },
//   { label: "Request Demo", path: "/contact", cta: true },
// ];

// /* ─────────────────────────────────────────────────────────
//     STYLES
// ───────────────────────────────────────────────────────── */
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap');

//   :root {
//     --ink: #0a0e17;
//     --ink-2: #1e2535;
//     --ink-3: #3d4a60;
//     --muted: #8492a6;
//     --line: #e8ecf2;
//     --amber: #e8930a;
//     --amber-dim: rgba(232,147,10,0.12);
//     --amber-glow: rgba(232,147,10,0.25);
//     --surface: #ffffff;
//     --surface-2: #f7f8fb;
//     --nav-h: 68px;
//   }

//   .nav-root * {
//     font-family: 'Instrument Sans', sans-serif;
//     box-sizing: border-box;
//     -webkit-font-smoothing: antialiased;
//   }

//   /* ── Scroll state ── */
//   .nav-scrolled {
//     box-shadow: 0 1px 0 var(--line), 0 4px 32px rgba(10,14,23,0.06);
//     backdrop-filter: blur(20px) saturate(180%);
//     background: rgba(255,255,255,0.92) !important;
//   }

//   /* ── Top accent bar ── */
//   .nav-accent-bar {
//     height: 3px;
//     background: linear-gradient(90deg, var(--amber) 0%, #f5c842 50%, var(--amber) 100%);
//     background-size: 200% 100%;
//     animation: barShimmer 3s linear infinite;
//   }
//   @keyframes barShimmer {
//     0% { background-position: 200% 0; }
//     100% { background-position: -200% 0; }
//   }

//   /* ── Active link ── */
//   .nav-active-link {
//     color: var(--amber) !important;
//   }
//   .nav-active-link::before {
//     content: '';
//     position: absolute;
//     bottom: -22px; left: 0; right: 0;
//     height: 2px;
//     background: var(--amber);
//     border-radius: 99px;
//   }

//   /* ── Nav button shared ── */
//   .nav-btn {
//     position: relative;
//     display: inline-flex; align-items: center; gap: 5px;
//     font-family: 'Instrument Sans', sans-serif;
//     font-size: 13.5px; font-weight: 500;
//     color: var(--ink-3);
//     background: none; border: none; cursor: pointer;
//     padding: 4px 0;
//     transition: color 0.15s;
//     letter-spacing: 0.01em;
//   }
//   .nav-btn:hover { color: var(--ink); }
//   .nav-btn.open-state { color: var(--amber); }

//   .nav-btn .chevron {
//     transition: transform 0.2s cubic-bezier(.34,1.56,.64,1);
//     color: var(--muted);
//   }
//   .nav-btn.open-state .chevron {
//     transform: rotate(180deg);
//     color: var(--amber);
//   }

//   /* ── CTA ── */
// .nav-cta {
//   display: inline-flex; align-items: center; gap: 8px;
//   font-family: 'Syne', sans-serif;
//   font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
//   color: #fff !important;
//   background: var(--amber); /* ✅ changed to orange */
//   padding: 10px 20px; border-radius: 6px;
//   white-space: nowrap;
//   transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
//   box-shadow: 0 4px 16px rgba(232,147,10,0.35); /* optional improvement */
//   position: relative; overflow: hidden;
// }
//   .nav-cta::after {
//     content: '';
//     position: absolute; inset: 0;
//     background: linear-gradient(135deg, var(--amber), #f5c842);
//     opacity: 0;
//     transition: opacity 0.2s;
//   }
//   .nav-cta:hover::after { opacity: 1; }
//   .nav-cta > * { position: relative; z-index: 1; }
//   .nav-cta:hover {
//   background: #cf7f08; /* slightly darker orange */
//   transform: translateY(-1px);
//   box-shadow: 0 6px 24px rgba(232,147,10,0.45);
// }
//   .nav-cta:hover .cta-arrow { transform: translateX(3px); }
//   .cta-arrow { transition: transform 0.18s; }

//   /* ══════════════════════════════════════════════
//       MEGA PANEL
//   ══════════════════════════════════════════════ */
//   .mega-panel {
//     position: fixed; left: 0; right: 0;
//     top: var(--nav-h);
//     background: var(--surface);
//     border-top: 1px solid var(--line);
//     box-shadow: 0 24px 64px rgba(207, 156, 13, 0.91);
//     opacity: 0; transform: translateY(-8px); pointer-events: none;
//     transition: opacity 0.2s ease, transform 0.2s cubic-bezier(.34,1.2,.64,1);
//     z-index: 998;
//   }
//   .mega-panel.open {
//     opacity: 1; transform: translateY(0); pointer-events: auto;
//   }

//   .mega-inner {
//     max-width: 1280px; margin: 0 auto;
//     padding: 32px 40px 28px;
//     display: grid; gap: 0 40px;
//   }

//   .mega-col-divider {
//     border-right: 1px solid var(--line);
//     padding-right: 40px;
//     margin-right: -20px;
//   }
//   .mega-col-divider:last-child { border-right: none; padding-right: 0; margin-right: 0; }

//   .mega-col-head {
//     display: flex; align-items: center; gap: 8px;
//     font-family: 'Syne', sans-serif;
//     font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
//     text-transform: uppercase; color: var(--amber);
//     padding-bottom: 14px; margin-bottom: 6px;
//     border-bottom: 1px solid var(--amber-dim);
//   }

//   .mega-link {
//     display: flex; align-items: center;
//     padding: 8px 10px; font-size: 13px; font-weight: 500;
//     color: var(--ink-3); border-radius: 6px;
//     text-decoration: none;
//     transition: background 0.12s, color 0.12s, padding-left 0.12s;
//     line-height: 1.4; gap: 0;
//   }
//   .mega-link:hover {
//     background: var(--amber-dim);
//     color: var(--ink);
//     padding-left: 14px;
//   }
//   .mega-link::before {
//     content: '→';
//     font-size: 11px; color: var(--amber);
//     opacity: 0; width: 0; overflow: hidden;
//     transition: opacity 0.12s, width 0.12s;
//   }
//   .mega-link:hover::before { opacity: 1; width: 14px; }

//   .mega-group-head {
//     font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
//     text-transform: uppercase; color: var(--muted);
//     padding: 14px 10px 4px;
//   }

//   /* ══════════════════════════════════════════════
//       TRAINING DROPDOWN
//   ══════════════════════════════════════════════ */
//   .training-drop {
//     position: absolute; top: calc(100% + 14px); left: 50%;
//     transform: translateX(-50%) translateY(6px);
//     background: var(--surface);
//     border: 1px solid var(--line);
//     border-radius: 12px;
//     box-shadow: 0 20px 60px rgba(10,14,23,0.12), 0 0 0 1px rgba(10,14,23,0.04);
//     min-width: 380px; padding: 8px;
//     opacity: 0; pointer-events: none;
//     transition: opacity 0.18s ease, transform 0.2s cubic-bezier(.34,1.2,.64,1);
//     z-index: 999;
//   }
//   .training-drop.open {
//     opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto;
//   }
//   .training-drop::before {
//     content: '';
//     position: absolute; top: -5px; left: 50%; transform: translateX(-50%);
//     width: 10px; height: 10px;
//     background: var(--surface);
//     border-left: 1px solid var(--line); border-top: 1px solid var(--line);
//     transform: translateX(-50%) rotate(45deg);
//   }

//   .td-item {
//     display: flex; align-items: flex-start; gap: 14px;
//     padding: 10px 14px; border-radius: 8px;
//     text-decoration: none;
//     transition: background 0.12s;
//   }
//   .td-item:hover { background: var(--surface-2); }

//   .td-icon {
//     width: 34px; height: 34px; border-radius: 8px; flex-shrink: 0;
//     background: var(--amber-dim);
//     display: flex; align-items: center; justify-content: center;
//     color: var(--amber); margin-top: 1px;
//     transition: background 0.12s, transform 0.15s;
//   }
//   .td-item:hover .td-icon { background: var(--amber); color: #fff; transform: scale(1.05); }

//   .td-label {
//     font-size: 13.5px; font-weight: 600; color: var(--ink); line-height: 1.3;
//     font-family: 'Syne', sans-serif;
//   }
//   .td-desc { font-size: 11.5px; color: var(--muted); margin-top: 3px; line-height: 1.4; }

//   /* ══════════════════════════════════════════════
//       SIMPLE DROPDOWN
//   ══════════════════════════════════════════════ */
//   .simple-drop {
//     position: absolute; top: calc(100% + 14px); left: 50%;
//     transform: translateX(-50%) translateY(6px);
//     background: var(--surface);
//     border: 1px solid var(--line);
//     border-radius: 12px;
//     box-shadow: 0 20px 60px rgba(10,14,23,0.12), 0 0 0 1px rgba(10,14,23,0.04);
//     min-width: 240px; padding: 6px;
//     opacity: 0; pointer-events: none;
//     transition: opacity 0.18s ease, transform 0.2s cubic-bezier(.34,1.2,.64,1);
//     z-index: 999;
//   }
//   .simple-drop.open {
//     opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto;
//   }
//   .simple-drop::before {
//     content: '';
//     position: absolute; top: -5px; left: 50%; 
//     width: 10px; height: 10px;
//     background: var(--surface);
//     border-left: 1px solid var(--line); border-top: 1px solid var(--line);
//     transform: translateX(-50%) rotate(45deg);
//   }

//   .sd-link {
//     display: flex; align-items: center; gap: 8px;
//     padding: 9px 14px; font-size: 13.5px; font-weight: 500;
//     color: var(--ink-3); text-decoration: none; border-radius: 7px;
//     transition: background 0.12s, color 0.12s;
//   }
//   .sd-link:hover { background: var(--amber-dim); color: var(--ink); }
//   .sd-link::before {
//     content: '';
//     width: 4px; height: 4px; border-radius: 50%;
//     background: var(--amber); flex-shrink: 0; opacity: 0;
//     transition: opacity 0.12s;
//   }
//   .sd-link:hover::before { opacity: 1; }

//   /* ══════════════════════════════════════════════
//       MOBILE MENU
//   ══════════════════════════════════════════════ */
//   .mobile-menu-container {
//     position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
//     background: var(--surface); z-index: 1001;
//     display: flex; flex-direction: column;
//     transform: translateX(100%);
//     transition: transform 0.35s cubic-bezier(.77,0,.18,1);
//   }
//   .mobile-menu-container.open { transform: translateX(0); }

//   .mobile-header {
//     height: 68px; display: flex; align-items: center;
//     justify-content: space-between; padding: 0 24px;
//     border-bottom: 1px solid var(--line);
//     flex-shrink: 0;
//   }

//   .mob-scroll-area { flex: 1; overflow-y: auto; padding-bottom: 40px; }

//   .mob-link {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 17px 24px; font-size: 15px; font-weight: 500;
//     color: var(--ink-2); text-decoration: none;
//     border-bottom: 1px solid var(--line);
//     font-family: 'Instrument Sans', sans-serif;
//     transition: color 0.12s, background 0.12s;
//   }
//   .mob-link:hover { color: var(--amber); background: var(--amber-dim); }
//   .mob-link.active { color: var(--amber); }

//   .mob-trigger {
//     display: flex; align-items: center; justify-content: space-between;
//     width: 100%; padding: 17px 24px; font-size: 15px; font-weight: 500;
//     color: var(--ink-2); background: none; border: none;
//     border-bottom: 1px solid var(--line); text-align: left; cursor: pointer;
//     font-family: 'Instrument Sans', sans-serif;
//     transition: color 0.12s;
//   }
//   .mob-trigger.open-state { color: var(--amber); }

//   .mob-acc { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
//   .mob-acc.active { max-height: 2000px; }

//   .mob-acc-inner { background: var(--surface-2); }

//   .mob-section-label {
//     padding: 10px 24px 4px 32px;
//     font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
//     color: var(--muted); text-transform: uppercase;
//     font-family: 'Syne', sans-serif;
//   }

//   .mob-sub-link {
//     display: flex; align-items: center; gap: 10px;
//     padding: 12px 24px 12px 32px; font-size: 13.5px; font-weight: 500;
//     color: var(--ink-3); text-decoration: none;
//     border-bottom: 1px solid var(--line);
//     transition: color 0.12s, background 0.12s;
//   }
//   .mob-sub-link::before {
//     content: ''; width: 4px; height: 4px; border-radius: 50%;
//     background: var(--amber); flex-shrink: 0;
//   }
//   .mob-sub-link:hover { color: var(--amber); background: var(--amber-dim); }

//   .mob-close-btn {
//     width: 36px; height: 36px; border-radius: 8px;
//     background: var(--surface-2); border: 1px solid var(--line);
//     display: flex; align-items: center; justify-content: center;
//     color: var(--ink-2); cursor: pointer;
//     transition: background 0.12s;
//   }
//   .mob-close-btn:hover { background: var(--line); }

//   .mob-cta-wrap { padding: 20px 24px; }
//   .mob-cta {
//     display: flex; align-items: center; justify-content: center; gap: 8px;
//     width: 100%; padding: 14px 20px;
//     background: var(--amber); color: #fff;
//     font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
//     letter-spacing: 0.04em; border-radius: 8px; text-decoration: none;
//     transition: background 0.18s;
//   }
//   .mob-cta:hover { background:#cf7f08; }

//   /* ── Responsive ── */
//   @media (min-width: 1024px) {
//     .lg-show { display: flex !important; }
//     .lg-hide { display: none !important; }
//   }
//   @media (max-width: 1023px) {
//     .lg-show { display: none !important; }
//     .lg-hide { display: flex !important; }
//   }
// `;

// /* ─────────────────────────────────────────────────────────
//     DESKTOP COMPONENTS
// ───────────────────────────────────────────────────────── */
// const MegaPanel = ({ nav, open }) => (
//   <div className={`mega-panel ${open ? "open" : ""}`}>
//     <div
//       className="mega-inner"
//       style={{ gridTemplateColumns: `repeat(${nav.columns.length}, 1fr)` }}
//     >
//       {nav.columns.map((col, i) => (
//         <div
//           key={col.label}
//           className={i < nav.columns.length - 1 ? "mega-col-divider" : ""}
//         >
//           <div className="mega-col-head">
//             {col.icon}
//             {col.label}
//           </div>
//           {col.links?.map((l) => (
//             <Link key={l.label} to={l.path} className="mega-link">
//               {l.label}
//             </Link>
//           ))}
//           {col.groups?.map((g) => (
//             <div key={g.heading}>
//               <div className="mega-group-head">{g.heading}</div>
//               {g.links.map((l) => (
//                 <Link key={l.label} to={l.path} className="mega-link" style={{ paddingLeft: 18 }}>
//                   {l.label}
//                 </Link>
//               ))}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const DesktopNavItem = ({ nav, pathname }) => {
//   const [open, setOpen] = useState(false);
//   const timer = useRef(null);
//   const enter = () => { clearTimeout(timer.current); setOpen(true); };
//   const leave = () => { timer.current = setTimeout(() => setOpen(false), 150); };

//   if (nav.cta) {
//     return (
//       <Link to={nav.path} className="nav-cta">
//         <span>{nav.label}</span>
//         <ArrowRight size={14} className="cta-arrow" />
//       </Link>
//     );
//   }

//   if (!nav.items && !nav.mega && !nav.training) {
//     const active = pathname === nav.path;
//     return (
//       <Link
//         to={nav.path}
//         className={`nav-btn ${active ? "nav-active-link" : ""}`}
//         style={{ textDecoration: "none", fontFamily: "'Instrument Sans', sans-serif" }}
//       >
//         {nav.label}
//       </Link>
//     );
//   }

//   return (
//     <div style={{ position: "relative" }} onMouseEnter={enter} onMouseLeave={leave}>
//       <button className={`nav-btn ${open ? "open-state" : ""}`}>
//         {nav.label}
//         <ChevronDown size={13} className="chevron" />
//       </button>
//       {nav.mega && <MegaPanel nav={nav} open={open} />}
//       {nav.training && (
//         <div className={`training-drop ${open ? "open" : ""}`}>
//           {nav.items.map((item) => (
//             <Link key={item.label} to={item.path} className="td-item">
//               <div className="td-icon">{item.icon}</div>
//               <div>
//                 <div className="td-label">{item.label}</div>
//                 <div className="td-desc">{item.desc}</div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//       {nav.items && !nav.training && (
//         <div className={`simple-drop ${open ? "open" : ""}`}>
//           {nav.items.map((item) => (
//             <Link key={item.label} to={item.path} className="sd-link">
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────
//     MOBILE ITEM
// ───────────────────────────────────────────────────────── */
// const MobileItem = ({ nav, pathname, onClose }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   if (nav.cta) {
//     return (
//       <div className="mob-cta-wrap">
//         <Link to={nav.path} onClick={onClose} className="mob-cta">
//           {nav.label} <ArrowRight size={15} />
//         </Link>
//       </div>
//     );
//   }

//   if (!nav.items && !nav.mega && !nav.training) {
//     return (
//       <Link
//         to={nav.path}
//         onClick={onClose}
//         className={`mob-link ${pathname === nav.path ? "active" : ""}`}
//       >
//         {nav.label}
//       </Link>
//     );
//   }

//   return (
//     <div>
//       <button
//         className={`mob-trigger ${isOpen ? "open-state" : ""}`}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {nav.label}
//         <ChevronDown
//           size={16}
//           style={{
//             transform: isOpen ? "rotate(180deg)" : "none",
//             transition: "transform 0.2s cubic-bezier(.34,1.56,.64,1)",
//             color: "var(--muted)",
//           }}
//         />
//       </button>
//       <div className={`mob-acc ${isOpen ? "active" : ""}`}>
//         <div className="mob-acc-inner">
//           {nav.mega &&
//             nav.columns.map((col) => (
//               <div key={col.label}>
//                 <div className="mob-section-label">{col.label}</div>
//                 {col.links?.map((l) => (
//                   <Link key={l.label} to={l.path} onClick={onClose} className="mob-sub-link">
//                     {l.label}
//                   </Link>
//                 ))}
//                 {col.groups?.map((g) =>
//                   g.links.map((l) => (
//                     <Link key={l.label} to={l.path} onClick={onClose} className="mob-sub-link">
//                       {l.label}
//                     </Link>
//                   ))
//                 )}
//               </div>
//             ))}
//           {(nav.items || nav.training) &&
//             nav.items.map((item) => (
//               <Link key={item.label} to={item.path} onClick={onClose} className="mob-sub-link">
//                 {item.label}
//               </Link>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────
//     HEADER
// ───────────────────────────────────────────────────────── */
// const Header = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const { pathname } = useLocation();
//   const headerRef = useRef(null);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     if (headerRef.current) {
//       document.documentElement.style.setProperty(
//         "--nav-h",
//         `${headerRef.current.offsetHeight}px`
//       );
//     }
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? "hidden" : "unset";
//   }, [mobileOpen]);

//   return (
//     <div className="nav-root">
//       <style>{styles}</style>

//       <header
//         ref={headerRef}
//         className={`fixed top-0 left-0 w-full z-[1000] bg-white transition-all duration-300 ${
//           scrolled ? "nav-scrolled" : ""
//         }`}
//         style={{ borderBottom: scrolled ? "none" : "1px solid var(--line)" }}
//       >
//         {/* Amber accent bar at top */}
//         <div className="nav-accent-bar" />

//         <div
//           style={{
//             maxWidth: 1280,
//             margin: "0 auto",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: "0 32px",
//             height: 64,
//           }}
//         >
//           {/* Logo */}
//           <Link to="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
//             <img src={logo} alt="Logo" style={{ height: 38, width: "auto" }} />
//           </Link>

//           {/* Desktop nav */}
//           <nav className="lg-show" style={{ alignItems: "center", gap: 28 }}>
//             {navigation.map((nav) => (
//               <DesktopNavItem key={nav.label} nav={nav} pathname={pathname} />
//             ))}
//           </nav>

//           {/* Mobile hamburger */}
//           <button
//             className="lg-hide"
//             onClick={() => setMobileOpen(true)}
//             style={{
//               background: "var(--surface-2)",
//               border: "1px solid var(--line)",
//               borderRadius: 8,
//               width: 40, height: 40,
//               alignItems: "center", justifyContent: "center",
//               color: "var(--ink-2)", cursor: "pointer",
//             }}
//           >
//             <Menu size={20} />
//           </button>
//         </div>
//       </header>

//       {/* ── Mobile overlay ── */}
//       <div className={`mobile-menu-container lg-hide ${mobileOpen ? "open" : ""}`}>
//         <div className="mobile-header">
//           <img src={logo} alt="Logo" style={{ height: 34 }} />
//           <button className="mob-close-btn" onClick={() => setMobileOpen(false)}>
//             <X size={18} />
//           </button>
//         </div>
//         <div className="mob-scroll-area">
//           {navigation.map((nav) => (
//             <MobileItem
//               key={nav.label}
//               nav={nav}
//               pathname={pathname}
//               onClose={() => setMobileOpen(false)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;




import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown, Menu, X, Zap, BarChart2, Monitor,
  GraduationCap, BookOpen, Clock, CalendarDays, Award,
  ArrowRight, Cpu, Activity,
} from "lucide-react";
import logo from "@/assets/logo.png";

/* ─────────────────────────────────────────────────────────
    NAVIGATION DATA
───────────────────────────────────────────────────────── */
const navigation = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Services",
    mega: true,
    columns: [
      {
        label: "Energy Optimization",
        icon: <Zap size={13} />,
        links: [
          { label: "Compressed Air Leak Detection", path: "/services/compressed-air" },
          { label: "Internal Hydraulic/Pneumatic Leak Detection", path: "/services/hydraulic-pneumatic" },
          { label: "Steam Trap/Valve Pass Audit", path: "/services/steam-trap" },
          { label: "Air/Water Tight Integrity Assessment", path: "/services/air-water-tight" },
          { label: "Underground Leak Detection", path: "/services/underground-leak" },
        ],
      },
      {
        label: "Predictive Analytics",
        icon: <BarChart2 size={13} />,
        groups: [
          {
            heading: "Electrical Asset Monitoring",
            links: [
              { label: "Partial Discharge Detection", path: "/services/partial-discharge" },
              { label: "Infrared Thermography Checks", path: "/services/infrared-thermography" },
            ],
          },
          {
            heading: "Bearing Condition Assessment",
            links: [
              { label: "Slow Speed Bearing Inspection", path: "/services/bearing-inspection" },
              { label: "Lubrication Management", path: "/services/lubrication-management" },
              { label: "Vibration Monitoring", path: "/services/vibration-monitoring" },
            ],
          },
          {
            heading: "Other Services",
            links: [
              { label: "Hull Integrity Assessment", path: "/services/hull-integrity" },
              { label: "Thermal Monitoring & Automation", path: "/services/thermal-monitoring" },
              { label: "Industrial Endoscopy", path: "/services/industrial-endoscopy" },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Products",
    items: [
      {
        label: "Ultra Sound Testing Devices",
        path: "/products/ultrasound-device",
        // tag: "Most Selling",              // ← "Most Selling" badge
        tagColor: "#16a34a",
      },
      { label: "CBM with IIoT", path: "/products/monitoring-systems" },
      { label: "Anti-Scaling Devices", path: "/products/scaling-devices" },
      {
        label: "Advanced Thermal Hotspot Monitoring / Solutions",   // ← merged
        path: "/products/thermal-hotspot-monitoring",
      },
      { label: "Industrial Endoscopes", path: "/products/endoscopes" },
    ],
  },
  {
    label: "Training",
    training: true,
    items: [
      { label: "Centre of Excellence", icon: <GraduationCap size={14} />, path: "/centre", desc: "State-of-the-art facility · Navi Mumbai" },
      { label: "Skill Development Programs", icon: <BookOpen size={14} />, path: "/skill-programs", desc: "15 technology modules covered" },
      { label: "1-Day Training Programs", icon: <Clock size={14} />, path: "/one-day", desc: "Leak Detection, IR Thermal, Acoustic, Oil Analysis…" },
      { label: "3-Day Training Programs", icon: <CalendarDays size={14} />, path: "/three-day", desc: "Condition Monitoring, Ultrasound, Hydraulics, Vibration" },
      { label: "5-Day Training Programs", icon: <CalendarDays size={14} />, path: "/five-day", desc: "Comprehensive advanced practical training" },
      { label: "Certification Courses", icon: <Award size={14} />, path: "/certification", desc: "Mobius Institute ATC & AEC authorised" },
    ],
  },
  { label: "Gallery", path: "/gallery" },
  { label: "Request Demo", path: "/contact", cta: true },
];

/* ─────────────────────────────────────────────────────────
    STYLES
───────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap');

  :root {
    --ink: #0a0e17;
    --ink-2: #1e2535;
    --ink-3: #3d4a60;
    --muted: #8492a6;
    --line: #e8ecf2;
    --amber: #e8930a;
    --amber-dim: rgba(232,147,10,0.12);
    --amber-glow: rgba(232,147,10,0.25);
    --surface: #ffffff;
    --surface-2: #f7f8fb;
    --nav-h: 68px;
  }

  .nav-root * {
    font-family: 'Instrument Sans', sans-serif;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  /* ── Scroll state ── */
  .nav-scrolled {
    box-shadow: 0 1px 0 var(--line), 0 4px 32px rgba(10,14,23,0.06);
    backdrop-filter: blur(20px) saturate(180%);
    background: rgba(255,255,255,0.92) !important;
  }

  /* ── Top accent bar ── */
  .nav-accent-bar {
    height: 3px;
    background: linear-gradient(90deg, var(--amber) 0%, #f5c842 50%, var(--amber) 100%);
    background-size: 200% 100%;
    animation: barShimmer 3s linear infinite;
  }
  @keyframes barShimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── Active link ── */
  .nav-active-link {
    color: var(--amber) !important;
  }
  .nav-active-link::before {
    content: '';
    position: absolute;
    bottom: -22px; left: 0; right: 0;
    height: 2px;
    background: var(--amber);
    border-radius: 99px;
  }

  /* ── Nav button shared ── */
  .nav-btn {
    position: relative;
    display: inline-flex; align-items: center; gap: 5px;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13.5px; font-weight: 500;
    color: var(--ink-3);
    background: none; border: none; cursor: pointer;
    padding: 4px 0;
    transition: color 0.15s;
    letter-spacing: 0.01em;
  }
  .nav-btn:hover { color: var(--ink); }
  .nav-btn.open-state { color: var(--amber); }

  .nav-btn .chevron {
    transition: transform 0.2s cubic-bezier(.34,1.56,.64,1);
    color: var(--muted);
  }
  .nav-btn.open-state .chevron {
    transform: rotate(180deg);
    color: var(--amber);
  }

  /* ── CTA ── */
  .nav-cta {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
    color: #fff !important;
    background: var(--amber);
    padding: 10px 20px; border-radius: 6px;
    white-space: nowrap;
    transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
    box-shadow: 0 4px 16px rgba(232,147,10,0.35);
    position: relative; overflow: hidden;
  }
  .nav-cta::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--amber), #f5c842);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .nav-cta:hover::after { opacity: 1; }
  .nav-cta > * { position: relative; z-index: 1; }
  .nav-cta:hover {
    background: #cf7f08;
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(232,147,10,0.45);
  }
  .nav-cta:hover .cta-arrow { transform: translateX(3px); }
  .cta-arrow { transition: transform 0.18s; }

  /* ══════════════════════════════════════════════
      MEGA PANEL
  ══════════════════════════════════════════════ */
  .mega-panel {
    position: fixed; left: 0; right: 0;
    top: var(--nav-h);
    background: var(--surface);
    border-top: 1px solid var(--line);
    box-shadow: 0 24px 64px rgba(207, 156, 13, 0.91);
    opacity: 0; transform: translateY(-8px); pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s cubic-bezier(.34,1.2,.64,1);
    z-index: 998;
  }
  .mega-panel.open {
    opacity: 1; transform: translateY(0); pointer-events: auto;
  }

  .mega-inner {
    max-width: 1280px; margin: 0 auto;
    padding: 32px 40px 28px;
    display: grid; gap: 0 40px;
  }

  .mega-col-divider {
    border-right: 1px solid var(--line);
    padding-right: 40px;
    margin-right: -20px;
  }
  .mega-col-divider:last-child { border-right: none; padding-right: 0; margin-right: 0; }

  .mega-col-head {
    display: flex; align-items: center; gap: 8px;
    font-family: 'Syne', sans-serif;
    font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--amber);
    padding-bottom: 14px; margin-bottom: 6px;
    border-bottom: 1px solid var(--amber-dim);
  }

  .mega-link {
    display: flex; align-items: center;
    padding: 8px 10px; font-size: 13px; font-weight: 500;
    color: var(--ink-3); border-radius: 6px;
    text-decoration: none;
    transition: background 0.12s, color 0.12s, padding-left 0.12s;
    line-height: 1.4; gap: 0;
  }
  .mega-link:hover {
    background: var(--amber-dim);
    color: var(--ink);
    padding-left: 14px;
  }
  .mega-link::before {
    content: '→';
    font-size: 11px; color: var(--amber);
    opacity: 0; width: 0; overflow: hidden;
    transition: opacity 0.12s, width 0.12s;
  }
  .mega-link:hover::before { opacity: 1; width: 14px; }

  .mega-group-head {
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted);
    padding: 14px 10px 4px;
  }

  /* ══════════════════════════════════════════════
      TRAINING DROPDOWN
  ══════════════════════════════════════════════ */
  .training-drop {
    position: absolute; top: calc(100% + 14px); left: 50%;
    transform: translateX(-50%) translateY(6px);
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(10,14,23,0.12), 0 0 0 1px rgba(10,14,23,0.04);
    min-width: 380px; padding: 8px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.18s ease, transform 0.2s cubic-bezier(.34,1.2,.64,1);
    z-index: 999;
  }
  .training-drop.open {
    opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto;
  }
  .training-drop::before {
    content: '';
    position: absolute; top: -5px; left: 50%; transform: translateX(-50%);
    width: 10px; height: 10px;
    background: var(--surface);
    border-left: 1px solid var(--line); border-top: 1px solid var(--line);
    transform: translateX(-50%) rotate(45deg);
  }

  .td-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 10px 14px; border-radius: 8px;
    text-decoration: none;
    transition: background 0.12s;
  }
  .td-item:hover { background: var(--surface-2); }

  .td-icon {
    width: 34px; height: 34px; border-radius: 8px; flex-shrink: 0;
    background: var(--amber-dim);
    display: flex; align-items: center; justify-content: center;
    color: var(--amber); margin-top: 1px;
    transition: background 0.12s, transform 0.15s;
  }
  .td-item:hover .td-icon { background: var(--amber); color: #fff; transform: scale(1.05); }

  .td-label {
    font-size: 13.5px; font-weight: 600; color: var(--ink); line-height: 1.3;
    font-family: 'Syne', sans-serif;
  }
  .td-desc { font-size: 11.5px; color: var(--muted); margin-top: 3px; line-height: 1.4; }

  /* ══════════════════════════════════════════════
      SIMPLE DROPDOWN  (Products)
  ══════════════════════════════════════════════ */
  .simple-drop {
    position: absolute; top: calc(100% + 14px); left: 50%;
    transform: translateX(-50%) translateY(6px);
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(10,14,23,0.12), 0 0 0 1px rgba(10,14,23,0.04);
    min-width: 300px; padding: 6px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.18s ease, transform 0.2s cubic-bezier(.34,1.2,.64,1);
    z-index: 999;
  }
  .simple-drop.open {
    opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto;
  }
  .simple-drop::before {
    content: '';
    position: absolute; top: -5px; left: 50%; 
    width: 10px; height: 10px;
    background: var(--surface);
    border-left: 1px solid var(--line); border-top: 1px solid var(--line);
    transform: translateX(-50%) rotate(45deg);
  }

  /* ── Product link row ── */
  .sd-link {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 14px; font-size: 13.5px; font-weight: 500;
    color: var(--ink-3); text-decoration: none; border-radius: 7px;
    transition: background 0.12s, color 0.12s;
    justify-content: space-between;
  }
  .sd-link:hover { background: var(--amber-dim); color: var(--ink); }
  .sd-link-left { display: flex; align-items: center; gap: 8px; }
  .sd-link-left::before {
    content: '';
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--amber); flex-shrink: 0; opacity: 0;
    transition: opacity 0.12s;
  }
  .sd-link:hover .sd-link-left::before { opacity: 1; }

  /* ── "Most Selling" badge ── */
  .sd-most-selling {
    display: inline-flex; align-items: center; gap: 4px;
    background: #dcfce7; border: 1px solid #86efac;
    color: #15803d;
    font-size: 9.5px; font-weight: 700; letter-spacing: 0.06em;
    text-transform: uppercase; padding: 2px 7px; border-radius: 999px;
    white-space: nowrap; flex-shrink: 0;
  }
  .sd-most-selling::before { content: '★'; font-size: 8px; }

  /* ── CBM section label inside dropdown ── */
  .sd-section-head {
    font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted);
    padding: 10px 14px 4px;
  }
  .sd-divider {
    height: 1px; background: var(--line); margin: 4px 8px;
  }

  /* ══════════════════════════════════════════════
      MOBILE MENU
  ══════════════════════════════════════════════ */
  .mobile-menu-container {
    position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
    background: var(--surface); z-index: 1001;
    display: flex; flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(.77,0,.18,1);
  }
  .mobile-menu-container.open { transform: translateX(0); }

  .mobile-header {
    height: 68px; display: flex; align-items: center;
    justify-content: space-between; padding: 0 24px;
    border-bottom: 1px solid var(--line);
    flex-shrink: 0;
  }

  .mob-scroll-area { flex: 1; overflow-y: auto; padding-bottom: 40px; }

  .mob-link {
    display: flex; align-items: center; justify-content: space-between;
    padding: 17px 24px; font-size: 15px; font-weight: 500;
    color: var(--ink-2); text-decoration: none;
    border-bottom: 1px solid var(--line);
    font-family: 'Instrument Sans', sans-serif;
    transition: color 0.12s, background 0.12s;
  }
  .mob-link:hover { color: var(--amber); background: var(--amber-dim); }
  .mob-link.active { color: var(--amber); }

  .mob-trigger {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 17px 24px; font-size: 15px; font-weight: 500;
    color: var(--ink-2); background: none; border: none;
    border-bottom: 1px solid var(--line); text-align: left; cursor: pointer;
    font-family: 'Instrument Sans', sans-serif;
    transition: color 0.12s;
  }
  .mob-trigger.open-state { color: var(--amber); }

  .mob-acc { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
  .mob-acc.active { max-height: 2000px; }

  .mob-acc-inner { background: var(--surface-2); }

  .mob-section-label {
    padding: 10px 24px 4px 32px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
    color: var(--muted); text-transform: uppercase;
    font-family: 'Syne', sans-serif;
  }

  .mob-sub-link {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 24px 12px 32px; font-size: 13.5px; font-weight: 500;
    color: var(--ink-3); text-decoration: none;
    border-bottom: 1px solid var(--line);
    transition: color 0.12s, background 0.12s;
    justify-content: space-between;
  }
  .mob-sub-link-left { display: flex; align-items: center; gap: 10px; }
  .mob-sub-link-left::before {
    content: ''; width: 4px; height: 4px; border-radius: 50%;
    background: var(--amber); flex-shrink: 0;
  }
  .mob-sub-link:hover { color: var(--amber); background: var(--amber-dim); }

  /* Mobile "Most Selling" badge */
  .mob-most-selling {
    display: inline-flex; align-items: center; gap: 4px;
    background: #dcfce7; border: 1px solid #86efac; color: #15803d;
    font-size: 9px; font-weight: 700; letter-spacing: 0.05em;
    text-transform: uppercase; padding: 2px 6px; border-radius: 999px;
    white-space: nowrap; flex-shrink: 0;
  }
  .mob-most-selling::before { content: '★'; font-size: 7px; }

  .mob-close-btn {
    width: 36px; height: 36px; border-radius: 8px;
    background: var(--surface-2); border: 1px solid var(--line);
    display: flex; align-items: center; justify-content: center;
    color: var(--ink-2); cursor: pointer;
    transition: background 0.12s;
  }
  .mob-close-btn:hover { background: var(--line); }

  .mob-cta-wrap { padding: 20px 24px; }
  .mob-cta {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 14px 20px;
    background: var(--amber); color: #fff;
    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
    letter-spacing: 0.04em; border-radius: 8px; text-decoration: none;
    transition: background 0.18s;
  }
  .mob-cta:hover { background:#cf7f08; }

  /* ── Responsive ── */
  @media (min-width: 1024px) {
    .lg-show { display: flex !important; }
    .lg-hide { display: none !important; }
  }
  @media (max-width: 1023px) {
    .lg-show { display: none !important; }
    .lg-hide { display: flex !important; }
  }
`;

/* ─────────────────────────────────────────────────────────
    DESKTOP COMPONENTS
───────────────────────────────────────────────────────── */
const MegaPanel = ({ nav, open }) => (
  <div className={`mega-panel ${open ? "open" : ""}`}>
    <div
      className="mega-inner"
      style={{ gridTemplateColumns: `repeat(${nav.columns.length}, 1fr)` }}
    >
      {nav.columns.map((col, i) => (
        <div
          key={col.label}
          className={i < nav.columns.length - 1 ? "mega-col-divider" : ""}
        >
          <div className="mega-col-head">
            {col.icon}
            {col.label}
          </div>
          {col.links?.map((l) => (
            <Link key={l.label} to={l.path} className="mega-link">
              {l.label}
            </Link>
          ))}
          {col.groups?.map((g) => (
            <div key={g.heading}>
              <div className="mega-group-head">{g.heading}</div>
              {g.links.map((l) => (
                <Link key={l.label} to={l.path} className="mega-link" style={{ paddingLeft: 18 }}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/* ── Products dropdown — supports "Most Selling" tag and sub-sections ── */
const ProductsDrop = ({ items, open }) => (
  <div className={`simple-drop ${open ? "open" : ""}`}>
    {items.map((item) => (
      <Link key={item.label} to={item.path} className="sd-link">
        <span className="sd-link-left">{item.label}</span>
        {item.tag && (
          <span className="sd-most-selling">{item.tag}</span>
        )}
      </Link>
    ))}
  </div>
);

const DesktopNavItem = ({ nav, pathname }) => {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const enter = () => { clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 150); };

  if (nav.cta) {
    return (
      <Link to={nav.path} className="nav-cta">
        <span>{nav.label}</span>
        <ArrowRight size={14} className="cta-arrow" />
      </Link>
    );
  }

  if (!nav.items && !nav.mega && !nav.training) {
    const active = pathname === nav.path;
    return (
      <Link
        to={nav.path}
        className={`nav-btn ${active ? "nav-active-link" : ""}`}
        style={{ textDecoration: "none", fontFamily: "'Instrument Sans', sans-serif" }}
      >
        {nav.label}
      </Link>
    );
  }

  return (
    <div style={{ position: "relative" }} onMouseEnter={enter} onMouseLeave={leave}>
      <button className={`nav-btn ${open ? "open-state" : ""}`}>
        {nav.label}
        <ChevronDown size={13} className="chevron" />
      </button>

      {nav.mega && <MegaPanel nav={nav} open={open} />}

      {nav.training && (
        <div className={`training-drop ${open ? "open" : ""}`}>
          {nav.items.map((item) => (
            <Link key={item.label} to={item.path} className="td-item">
              <div className="td-icon">{item.icon}</div>
              <div>
                <div className="td-label">{item.label}</div>
                <div className="td-desc">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Products dropdown with tag support */}
      {nav.items && !nav.training && (
        <ProductsDrop items={nav.items} open={open} />
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
    MOBILE ITEM
───────────────────────────────────────────────────────── */
const MobileItem = ({ nav, pathname, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (nav.cta) {
    return (
      <div className="mob-cta-wrap">
        <Link to={nav.path} onClick={onClose} className="mob-cta">
          {nav.label} <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  if (!nav.items && !nav.mega && !nav.training) {
    return (
      <Link
        to={nav.path}
        onClick={onClose}
        className={`mob-link ${pathname === nav.path ? "active" : ""}`}
      >
        {nav.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        className={`mob-trigger ${isOpen ? "open-state" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {nav.label}
        <ChevronDown
          size={16}
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.2s cubic-bezier(.34,1.56,.64,1)",
            color: "var(--muted)",
          }}
        />
      </button>
      <div className={`mob-acc ${isOpen ? "active" : ""}`}>
        <div className="mob-acc-inner">
          {nav.mega &&
            nav.columns.map((col) => (
              <div key={col.label}>
                <div className="mob-section-label">{col.label}</div>
                {col.links?.map((l) => (
                  <Link key={l.label} to={l.path} onClick={onClose} className="mob-sub-link">
                    <span className="mob-sub-link-left">{l.label}</span>
                  </Link>
                ))}
                {col.groups?.map((g) =>
                  g.links.map((l) => (
                    <Link key={l.label} to={l.path} onClick={onClose} className="mob-sub-link">
                      <span className="mob-sub-link-left">{l.label}</span>
                    </Link>
                  ))
                )}
              </div>
            ))}

          {/* Products: show "Most Selling" badge in mobile */}
          {nav.items && !nav.training &&
            nav.items.map((item) => (
              <Link key={item.label} to={item.path} onClick={onClose} className="mob-sub-link">
                <span className="mob-sub-link-left">{item.label}</span>
                {item.tag && (
                  <span className="mob-most-selling">{item.tag}</span>
                )}
              </Link>
            ))}

          {nav.training &&
            nav.items.map((item) => (
              <Link key={item.label} to={item.path} onClick={onClose} className="mob-sub-link">
                <span className="mob-sub-link-left">{item.label}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
    HEADER
───────────────────────────────────────────────────────── */
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      document.documentElement.style.setProperty(
        "--nav-h",
        `${headerRef.current.offsetHeight}px`
      );
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
  }, [mobileOpen]);

  return (
    <div className="nav-root">
      <style>{styles}</style>

      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-[1000] bg-white transition-all duration-300 ${
          scrolled ? "nav-scrolled" : ""
        }`}
        style={{ borderBottom: scrolled ? "none" : "1px solid var(--line)" }}
      >
        {/* Amber accent bar at top */}
        <div className="nav-accent-bar" />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            height: 64,
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src={logo} alt="Logo" style={{ height: 38, width: "auto" }} />
          </Link>

          {/* Desktop nav */}
          <nav className="lg-show" style={{ alignItems: "center", gap: 28 }}>
            {navigation.map((nav) => (
              <DesktopNavItem key={nav.label} nav={nav} pathname={pathname} />
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg-hide"
            onClick={() => setMobileOpen(true)}
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--line)",
              borderRadius: 8,
              width: 40, height: 40,
              alignItems: "center", justifyContent: "center",
              color: "var(--ink-2)", cursor: "pointer",
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div className={`mobile-menu-container lg-hide ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-header">
          <img src={logo} alt="Logo" style={{ height: 34 }} />
          <button className="mob-close-btn" onClick={() => setMobileOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <div className="mob-scroll-area">
          {navigation.map((nav) => (
            <MobileItem
              key={nav.label}
              nav={nav}
              pathname={pathname}
              onClose={() => setMobileOpen(false)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;