
// // Header
// import { useState, useRef, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   ChevronDown, ChevronRight, Menu, X,
//   GraduationCap, BookOpen, Clock, CalendarDays, Award,
//   ArrowRight, Zap, BarChart2,
// } from "lucide-react";
// import logo from "@/assets/logo.png";

// /* ─────────────────────────────────────────────────────────
//     SERVICES DATA
// ───────────────────────────────────────────────────────── */
// const servicesData = [
//   {
//     label: "Energy Optimization",
//     icon: <Zap size={14} />,
//     links: [
//       { label: "Compressed Air Leak Detection",               path: "/services/compressed-air" },
//       { label: "Internal Hydraulic/Pneumatic Leak Detection", path: "/services/hydraulic-pneumatic" },
//       { label: "Steam Trap/Valve Pass Audit",                 path: "/services/steam-trap" },
//       { label: "Air/Water Tight Integrity Assessment",        path: "/services/air-water-tight" },
//       { label: "Underground Leak Detection",                  path: "/services/underground-leak" },
//     ],
//   },
//   {
//     label: "Predictive Analytics",
//     icon: <BarChart2 size={14} />,
//     groups: [
//       {
//         label: "Electrical Asset Monitoring",
//         links: [
//           { label: "Partial Discharge Detection",  path: "/services/partial-discharge" },
//           { label: "Infrared Thermography Checks", path: "/services/infrared-thermography" },
//         ],
//       },
//       {
//         label: "Bearing Condition Assessment",
//         links: [
//           { label: "Slow Speed Bearing Inspection", path: "/services/bearing-inspection" },
//           { label: "Lubrication Management",        path: "/services/lubrication-management" },
//           { label: "Vibration Monitoring",          path: "/services/vibration-monitoring" },
//         ],
//       },
//       {
//         label: "Other Services",
//         links: [
//           { label: "Hull Integrity Assessment",       path: "/services/hull-integrity" },
//           { label: "Thermal Monitoring & Automation", path: "/services/thermal-monitoring" },
//           { label: "Industrial Endoscopy",            path: "/services/industrial-endoscopy" },
//         ],
//       },
//     ],
//   },
// ];

// /* ─────────────────────────────────────────────────────────
//     NAVIGATION DATA
// ───────────────────────────────────────────────────────── */
// const navigation = [
//   { label: "Home",  path: "/" },
//   { label: "About", path: "/about" },
//   { label: "Services", services: true },
//   {
//     label: "Products",
//     items: [
//       { label: "Ultra Sound Testing Devices",                     path: "/products/ultrasound-device",          tag: "Most Selling" },
//       { label: "CBM with IIoT",                                   path: "/products/monitoring-systems" },
//       { label: "Anti-Scaling Devices",                            path: "/products/scaling-devices" },
//       { label: "Advanced Thermal Hotspot Monitoring / Solutions", path: "/products/thermal-hotspot-monitoring" },
//       { label: "Industrial Endoscopes",                           path: "/services/industrial-endoscopy" },
//     ],
//   },
//   {
//     label: "Training",
//     training: true,
//     items: [
//       { label: "Centre of Excellence",       icon: <GraduationCap size={14} />, path: "/centre",        desc: "State-of-the-art facility · Navi Mumbai" },
//       { label: "Skill Development Programs", icon: <BookOpen size={14} />,      path: "/skill-programs", desc: "15 technology modules covered" },
//       { label: "1-Day Training Programs",    icon: <Clock size={14} />,         path: "/one-day",        desc: "Leak Detection, IR Thermal, Acoustic, Oil Analysis…" },
//       { label: "3-Day Training Programs",    icon: <CalendarDays size={14} />,  path: "/three-day",      desc: "Condition Monitoring, Ultrasound, Hydraulics, Vibration" },
//       { label: "5-Day Training Programs",    icon: <CalendarDays size={14} />,  path: "/five-day",       desc: "Comprehensive advanced practical training" },
//       { label: "Certification Courses",      icon: <Award size={14} />,         path: "/certification",  desc: "Mobius Institute ATC & AEC authorised" },
//     ],
//   },
//   { label: "Gallery",               path: "/gallery" },
//   // { label: "Associates & Advisors", path: "/associates" },
//   { label: "Request Demo",          path: "/contact", cta: true },
// ];

// /* ─────────────────────────────────────────────────────────
//     STYLES
// ───────────────────────────────────────────────────────── */
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800&family=Instrument+Roboto:wght@400;500;600&display=swap');

//   :root {
//     --ink: #0a0e17;
//     --ink-2: #1e2535;
//     --ink-3: #3d4a60;
//     --muted: #8492a6;
//     --line: #e8ecf2;
//     --amber: #e8930a;
//     --amber-dim: rgba(232,147,10,0.10);
//     --surface: #ffffff;
//     --surface-2: #f7f8fb;
//     --nav-h: 72px;
//   }

//   .nav-root * { font-family: 'Instrument Roboto', roboto; box-sizing: border-box; -webkit-font-smoothing: antialiased; }

//   .nav-scrolled {
//     box-shadow: 0 1px 0 var(--line), 0 4px 32px rgba(10,14,23,0.06);
//     backdrop-filter: blur(20px) saturate(180%);
//     background: rgba(255,255,255,0.92) !important;
//   }

//   .nav-accent-bar {
//     height: 3px;
//     background: linear-gradient(90deg, var(--amber) 0%, #f5c842 50%, var(--amber) 100%);
//     background-size: 200% 100%;
//     animation: barShimmer 3s linear infinite;
//   }
//   @keyframes barShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

//   .nav-active-link { color: var(--amber) !important; }
//   .nav-active-link::before {
//     content: ''; position: absolute; bottom: -22px; left: 0; right: 0;
//     height: 2px; background: var(--amber); border-radius: 99px;
//   }

//   .nav-btn {
//     position: relative; display: inline-flex; align-items: center; gap: 5px;
//     font-size: 13.5px; font-weight: 500; color: var(--ink-3);
//     background: none; border: none; cursor: pointer; padding: 4px 0;
//     transition: color 0.15s; letter-spacing: 0.01em;
//   }
//   .nav-btn:hover { color: var(--ink); }
//   .nav-btn.open-state { color: var(--amber); }
//   .nav-btn .chevron { transition: transform 0.2s cubic-bezier(.34,1.56,.64,1); color: var(--muted); }
//   .nav-btn.open-state .chevron { transform: rotate(180deg); color: var(--amber); }

//   .nav-cta {
//     display: inline-flex; align-items: center; gap: 8px;
//     font-family: 'Roboto', roboto; font-size: 13px; font-weight: 700;
//     letter-spacing: 0.04em; color: #fff !important; background: var(--amber);
//     padding: 10px 20px; border-radius: 6px; white-space: nowrap; text-decoration: none;
//     transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
//     box-shadow: 0 4px 16px rgba(232,147,10,0.35); position: relative; overflow: hidden;
//   }
//   .nav-cta::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--amber), #f5c842); opacity: 0; transition: opacity 0.2s; }
//   .nav-cta:hover::after { opacity: 1; }
//   .nav-cta > * { position: relative; z-index: 1; }
//   .nav-cta:hover { background: #cf7f08; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(232,147,10,0.45); }
//   .nav-cta:hover .cta-arrow { transform: translateX(3px); }
//   .cta-arrow { transition: transform 0.18s; }

//   /* ═══════════════════════════════════════════════════
//       SHARED PANEL BASE
//      ═══════════════════════════════════════════════════ */
//   .svc-panel {
//     background: var(--surface);
//     border: 1px solid var(--line);
//     border-radius: 12px;
//     box-shadow: 0 16px 48px rgba(10,14,23,0.12), 0 0 0 1px rgba(10,14,23,0.03);
//     padding: 6px;
//     opacity: 0; pointer-events: none;
//     transition: opacity 0.15s ease, transform 0.18s cubic-bezier(.34,1.2,.64,1);
//   }

//   /* ── L1: anchored to RIGHT edge of trigger, opens below nav ── */
//   .svc-l1 {
//     position: absolute;
//     top: calc(100% + 14px);
//     right: 0;           /* right-edge aligned with the Services button */
//     left: auto;
//     transform: translateY(8px);
//     min-width: 240px;
//     z-index: 999;
//   }
//   .svc-l1.open { opacity: 1; transform: translateY(0); pointer-events: auto; }
//   .svc-l1::before {
//     content: ''; position: absolute; top: -5px; right: 18px; left: auto;
//     width: 10px; height: 10px; background: var(--surface);
//     border-left: 1px solid var(--line); border-top: 1px solid var(--line);
//     transform: rotate(45deg);
//   }

//   /* L1 row */
//   .svc-l1-row {
//     position: relative;
//     display: flex; align-items: center; justify-content: space-between; gap: 10px;
//     padding: 9px 12px; border-radius: 8px; cursor: default;
//     font-size: 13.5px; font-weight: 500; color: var(--ink-3);
//     transition: background 0.12s, color 0.12s;
//     user-select: none;
//   }
//   .svc-l1-row:hover { background: var(--amber-dim); color: var(--ink); }
//   .svc-l1-left { display: flex; align-items: center; gap: 10px; }

//   .svc-icon {
//     width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
//     background: var(--amber-dim); color: var(--amber);
//     display: flex; align-items: center; justify-content: center;
//     transition: background 0.12s, color 0.12s;
//   }
//   .svc-l1-row:hover .svc-icon { background: var(--amber); color: #fff; }

//   .svc-chevron { color: var(--muted); flex-shrink: 0; transition: color 0.12s; }
//   .svc-l1-row:hover .svc-chevron { color: var(--amber); }

//   /* ── L2: flies RIGHT from L1 row ── */
//   .svc-l2 {
//     position: absolute;
//     left: calc(100% + 2px);
//     right: auto;
//     top: -6px;
//     min-width: 260px;
//     transform: translateX(8px);
//     z-index: 1000;
//   }
//   .svc-l1-row:hover > .svc-l2 { opacity: 1; transform: translateX(0); pointer-events: auto; }

//   /* L2 direct link */
//   .svc-l2-link {
//     display: flex; align-items: center; gap: 0;
//     padding: 9px 12px; font-size: 13px; font-weight: 500;
//     color: var(--ink-3); text-decoration: none; border-radius: 7px;
//     transition: background 0.12s, color 0.12s;
//   }
//   .svc-l2-link::before {
//     content: ''; width: 0; height: 4px; border-radius: 50%;
//     background: var(--amber); flex-shrink: 0;
//     opacity: 0; transition: opacity 0.12s, width 0.12s, margin-right 0.12s;
//     margin-right: 0;
//   }
//   .svc-l2-link:hover { background: var(--amber-dim); color: var(--ink); }
//   .svc-l2-link:hover::before { opacity: 1; width: 4px; margin-right: 8px; }

//   /* L2 group row */
//   .svc-l2-group {
//     position: relative;
//     display: flex; align-items: center; justify-content: space-between; gap: 10px;
//     padding: 9px 12px; border-radius: 7px; cursor: default;
//     font-size: 13px; font-weight: 600; color: var(--ink-3);
//     transition: background 0.12s, color 0.12s;
//     user-select: none;
//   }
//   .svc-l2-group:hover { background: var(--amber-dim); color: var(--ink); }
//   .svc-l2-group .svc-chevron-sm { color: var(--muted); flex-shrink: 0; transition: color 0.12s; }
//   .svc-l2-group:hover .svc-chevron-sm { color: var(--amber); }

//   /* ── L3: flies RIGHT from L2 group row ── */
//   .svc-l3 {
//     position: absolute;
//     left: calc(100% + 2px);
//     right: auto;
//     top: -6px;
//     min-width: 240px;
//     transform: translateX(8px);
//     z-index: 1001;
//   }
//   .svc-l2-group:hover > .svc-l3 { opacity: 1; transform: translateX(0); pointer-events: auto; }

//   /* L3 link */
//   .svc-l3-link {
//     display: flex; align-items: center;
//     padding: 9px 12px; font-size: 13px; font-weight: 500;
//     color: var(--ink-3); text-decoration: none; border-radius: 7px;
//     transition: background 0.12s, color 0.12s;
//   }
//   .svc-l3-link::before {
//     content: ''; width: 0; height: 4px; border-radius: 50%;
//     background: var(--amber); flex-shrink: 0;
//     opacity: 0; transition: opacity 0.12s, width 0.12s, margin-right 0.12s;
//     margin-right: 0;
//   }
//   .svc-l3-link:hover { background: var(--amber-dim); color: var(--ink); }
//   .svc-l3-link:hover::before { opacity: 1; width: 4px; margin-right: 8px; }

//   /* ═══════════════════════════════════════════════════
//       SIMPLE DROPDOWN  (Products)
//      ═══════════════════════════════════════════════════ */
//   .simple-drop {
//     position: absolute; top: calc(100% + 14px); left: 50%;
//     transform: translateX(-50%) translateY(8px);
//     background: var(--surface); border: 1px solid var(--line); border-radius: 12px;
//     box-shadow: 0 20px 60px rgba(10,14,23,0.12), 0 0 0 1px rgba(10,14,23,0.04);
//     min-width: 300px; padding: 6px;
//     opacity: 0; pointer-events: none;
//     transition: opacity 0.18s ease, transform 0.2s cubic-bezier(.34,1.2,.64,1);
//     z-index: 999;
//   }
//   .simple-drop.open { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
//   .simple-drop::before {
//     content: ''; position: absolute; top: -5px; left: 50%;
//     width: 10px; height: 10px; background: var(--surface);
//     border-left: 1px solid var(--line); border-top: 1px solid var(--line);
//     transform: translateX(-50%) rotate(45deg);
//   }
//   .sd-link {
//     display: flex; align-items: center; gap: 8px;
//     padding: 9px 14px; font-size: 13.5px; font-weight: 500;
//     color: var(--ink-3); text-decoration: none; border-radius: 7px;
//     transition: background 0.12s, color 0.12s; justify-content: space-between;
//   }
//   .sd-link:hover { background: var(--amber-dim); color: var(--ink); }
//   .sd-link-left { display: flex; align-items: center; gap: 8px; }
//   .sd-link-left::before {
//     content: ''; width: 4px; height: 4px; border-radius: 50%;
//     background: var(--amber); flex-shrink: 0; opacity: 0; transition: opacity 0.12s;
//   }
//   .sd-link:hover .sd-link-left::before { opacity: 1; }
//   .sd-most-selling {
//     display: inline-flex; align-items: center; gap: 4px;
//     background: #dcfce7; border: 1px solid #86efac; color: #15803d;
//     font-size: 9.5px; font-weight: 700; letter-spacing: 0.06em;
//     text-transform: uppercase; padding: 2px 7px; border-radius: 999px;
//     white-space: nowrap; flex-shrink: 0;
//   }
//   .sd-most-selling::before { content: '★'; font-size: 8px; }

//   /* ═══════════════════════════════════════════════════
//       TRAINING DROPDOWN
//      ═══════════════════════════════════════════════════ */
//   .training-drop {
//     position: absolute; top: calc(100% + 14px); left: 50%;
//     transform: translateX(-50%) translateY(8px);
//     background: var(--surface); border: 1px solid var(--line); border-radius: 12px;
//     box-shadow: 0 20px 60px rgba(10,14,23,0.12); min-width: 380px; padding: 8px;
//     opacity: 0; pointer-events: none;
//     transition: opacity 0.18s ease, transform 0.2s cubic-bezier(.34,1.2,.64,1);
//     z-index: 999;
//   }
//   .training-drop.open { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
//   .training-drop::before {
//     content: ''; position: absolute; top: -5px; left: 50%;
//     width: 10px; height: 10px; background: var(--surface);
//     border-left: 1px solid var(--line); border-top: 1px solid var(--line);
//     transform: translateX(-50%) rotate(45deg);
//   }
//   .td-item {
//     display: flex; align-items: flex-start; gap: 14px;
//     padding: 10px 14px; border-radius: 8px; text-decoration: none; transition: background 0.12s;
//   }
//   .td-item:hover { background: var(--surface-2); }
//   .td-icon {
//     width: 34px; height: 34px; border-radius: 8px; flex-shrink: 0;
//     background: var(--amber-dim); display: flex; align-items: center; justify-content: center;
//     color: var(--amber); margin-top: 1px; transition: background 0.12s, transform 0.15s;
//   }
//   .td-item:hover .td-icon { background: var(--amber); color: #fff; transform: scale(1.05); }
//   .td-label { font-size: 13.5px; font-weight: 600; color: var(--ink); line-height: 1.3; font-family: 'Roboto', Roboto; }
//   .td-desc  { font-size: 11.5px; color: var(--muted); margin-top: 3px; line-height: 1.4; }

//   /* ═══════════════════════════════════════════════════
//       MOBILE
//      ═══════════════════════════════════════════════════ */
//   .mobile-menu-container {
//     position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
//     background: var(--surface); z-index: 1001; display: flex; flex-direction: column;
//     transform: translateX(100%); transition: transform 0.35s cubic-bezier(.77,0,.18,1);
//   }
//   .mobile-menu-container.open { transform: translateX(0); }
//   .mobile-header {
//     height: 72px; display: flex; align-items: center; justify-content: space-between;
//     padding: 0 24px; border-bottom: 1px solid var(--line); flex-shrink: 0;
//   }
//   .mob-scroll-area { flex: 1; overflow-y: auto; padding-bottom: 40px; }
//   .mob-link {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 17px 24px; font-size: 15px; font-weight: 500;
//     color: var(--ink-2); text-decoration: none; border-bottom: 1px solid var(--line);
//     transition: color 0.12s, background 0.12s;
//   }
//   .mob-link:hover { color: var(--amber); background: var(--amber-dim); }
//   .mob-link.active { color: var(--amber); }
//   .mob-trigger {
//     display: flex; align-items: center; justify-content: space-between;
//     width: 100%; padding: 17px 24px; font-size: 15px; font-weight: 500;
//     color: var(--ink-2); background: none; border: none;
//     border-bottom: 1px solid var(--line); text-align: left; cursor: pointer;
//     transition: color 0.12s;
//   }
//   .mob-trigger.open-state { color: var(--amber); }
//   .mob-acc { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
//   .mob-acc.active { max-height: 3000px; }
//   .mob-acc-inner { background: var(--surface-2); }

//   .mob-l1-label {
//     display: flex; align-items: center; gap: 8px;
//     padding: 10px 24px 4px 24px;
//     font-family: 'Roboto', Roboto; font-size: 10px; font-weight: 700;
//     letter-spacing: 0.12em; text-transform: uppercase; color: var(--amber);
//   }
//   .mob-l2-label {
//     padding: 8px 24px 2px 36px;
//     font-family: 'Roboto', Roboto; font-size: 9px; font-weight: 700;
//     letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted);
//   }
//   .mob-l2-link {
//     display: flex; align-items: center; gap: 8px;
//     padding: 11px 24px 11px 36px; font-size: 13px; font-weight: 500;
//     color: var(--ink-3); text-decoration: none; border-bottom: 1px solid var(--line);
//     transition: color 0.12s, background 0.12s;
//   }
//   .mob-l2-link::before {
//     content: ''; width: 4px; height: 4px; border-radius: 50%;
//     background: var(--amber); flex-shrink: 0;
//   }
//   .mob-l2-link:hover { color: var(--amber); background: var(--amber-dim); }
//   .mob-l3-link {
//     display: flex; align-items: center; gap: 8px;
//     padding: 11px 24px 11px 48px; font-size: 12.5px; font-weight: 500;
//     color: var(--ink-3); text-decoration: none; border-bottom: 1px solid var(--line);
//     transition: color 0.12s, background 0.12s;
//   }
//   .mob-l3-link::before {
//     content: ''; width: 3px; height: 3px; border-radius: 50%;
//     background: var(--muted); flex-shrink: 0;
//   }
//   .mob-l3-link:hover { color: var(--amber); background: var(--amber-dim); }
//   .mob-divider { height: 1px; background: var(--line); margin: 4px 0; }

//   .mob-sub-link {
//     display: flex; align-items: center; gap: 10px;
//     padding: 11px 24px 11px 32px; font-size: 13px; font-weight: 500;
//     color: var(--ink-3); text-decoration: none; border-bottom: 1px solid var(--line);
//     transition: color 0.12s, background 0.12s; justify-content: space-between;
//   }
//   .mob-sub-link-left { display: flex; align-items: center; gap: 8px; }
//   .mob-sub-link-left::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--amber); flex-shrink: 0; }
//   .mob-sub-link:hover { color: var(--amber); background: var(--amber-dim); }
//   .mob-most-selling {
//     display: inline-flex; align-items: center; gap: 4px;
//     background: #dcfce7; border: 1px solid #86efac; color: #15803d;
//     font-size: 9px; font-weight: 700; letter-spacing: 0.05em;
//     text-transform: uppercase; padding: 2px 6px; border-radius: 999px;
//     white-space: nowrap; flex-shrink: 0;
//   }
//   .mob-most-selling::before { content: '★'; font-size: 7px; }
//   .mob-close-btn {
//     width: 36px; height: 36px; border-radius: 8px;
//     background: var(--surface-2); border: 1px solid var(--line);
//     display: flex; align-items: center; justify-content: center;
//     color: var(--ink-2); cursor: pointer; transition: background 0.12s;
//   }
//   .mob-close-btn:hover { background: var(--line); }
//   .mob-cta-wrap { padding: 20px 24px; }
//   .mob-cta {
//     display: flex; align-items: center; justify-content: center; gap: 8px;
//     width: 100%; padding: 14px 20px; background: var(--amber); color: #fff;
//     font-family: 'Roboto', Roboto; font-size: 14px; font-weight: 700;
//     letter-spacing: 0.04em; border-radius: 8px; text-decoration: none;
//     transition: background 0.18s;
//   }
//   .mob-cta:hover { background: #cf7f08; }

//   @media (min-width: 1024px) { .lg-show { display: flex !important; } .lg-hide { display: none !important; } }
//   @media (max-width: 1023px)  { .lg-show { display: none !important; } .lg-hide { display: flex !important; } }
// `;

// /* ─────────────────────────────────────────────────────────
//     MULTI-LEVEL SERVICES FLYOUT
//     L1 right-aligned under trigger → L2 right → L3 right
// ───────────────────────────────────────────────────────── */
// const ServicesFlyout = ({ open }) => (
//   <div className={`svc-panel svc-l1 ${open ? "open" : ""}`}>
//     {servicesData.map((cat) => (
//       <div key={cat.label} className="svc-l1-row">
//         <span className="svc-l1-left">
//           <span className="svc-icon">{cat.icon}</span>
//           {cat.label}
//         </span>
//         <ChevronRight size={13} className="svc-chevron" />

//         {/* L2 opens to the RIGHT */}
//         <div className="svc-panel svc-l2">
//           {cat.links && cat.links.map((link) => (
//             <Link key={link.label} to={link.path} className="svc-l2-link">
//               {link.label}
//             </Link>
//           ))}
//           {cat.groups && cat.groups.map((group) => (
//             <div key={group.label} className="svc-l2-group">
//               {group.label}
//               <ChevronRight size={12} className="svc-chevron-sm" />

//               {/* L3 opens to the RIGHT */}
//               <div className="svc-panel svc-l3">
//                 {group.links.map((link) => (
//                   <Link key={link.label} to={link.path} className="svc-l3-link">
//                     {link.label}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
//   </div>
// );

// /* ─────────────────────────────────────────────────────────
//     SIMPLE DROPDOWN  (Products)
// ───────────────────────────────────────────────────────── */
// const SimpleDrop = ({ items, open }) => (
//   <div className={`simple-drop ${open ? "open" : ""}`}>
//     {items.map((item) => (
//       <Link key={item.label} to={item.path} className="sd-link">
//         <span className="sd-link-left">{item.label}</span>
//         {item.tag && <span className="sd-most-selling">{item.tag}</span>}
//       </Link>
//     ))}
//   </div>
// );

// /* ─────────────────────────────────────────────────────────
//     DESKTOP NAV ITEM
// ───────────────────────────────────────────────────────── */
// const DesktopNavItem = ({ nav, pathname }) => {
//   const [open, setOpen] = useState(false);
//   const timer = useRef(null);
//   const enter = () => { clearTimeout(timer.current); setOpen(true); };
//   const leave = () => { timer.current = setTimeout(() => setOpen(false), 180); };

//   if (nav.cta) {
//     return (
//       <Link to={nav.path} className="nav-cta">
//         <span>{nav.label}</span>
//         <ArrowRight size={14} className="cta-arrow" />
//       </Link>
//     );
//   }

//   if (!nav.items && !nav.training && !nav.services) {
//     return (
//       <Link
//         to={nav.path}
//         className={`nav-btn ${pathname === nav.path ? "nav-active-link" : ""}`}
//         style={{ textDecoration: "none" }}
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

//       {nav.services && <ServicesFlyout open={open} />}
//       {nav.items && !nav.training && <SimpleDrop items={nav.items} open={open} />}
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
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────
//     MOBILE NAV ITEM
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

//   if (!nav.items && !nav.training && !nav.services) {
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

//           {/* Services — 3 levels in accordion */}
//           {nav.services && servicesData.map((cat, ci) => (
//             <div key={cat.label}>
//               {ci > 0 && <div className="mob-divider" />}
//               <div className="mob-l1-label">
//                 <span style={{ opacity: 0.8 }}>{cat.icon}</span>
//                 {cat.label}
//               </div>
//               {cat.links && cat.links.map((link) => (
//                 <Link key={link.label} to={link.path} onClick={onClose} className="mob-l2-link">
//                   {link.label}
//                 </Link>
//               ))}
//               {cat.groups && cat.groups.map((group) => (
//                 <div key={group.label}>
//                   <div className="mob-l2-label">{group.label}</div>
//                   {group.links.map((link) => (
//                     <Link key={link.label} to={link.path} onClick={onClose} className="mob-l3-link">
//                       {link.label}
//                     </Link>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           ))}

//           {/* Products */}
//           {nav.items && !nav.training && nav.items.map((item) => (
//             <Link key={item.label} to={item.path} onClick={onClose} className="mob-sub-link">
//               <span className="mob-sub-link-left">{item.label}</span>
//               {item.tag && <span className="mob-most-selling">{item.tag}</span>}
//             </Link>
//           ))}

//           {/* Training */}
//           {nav.training && nav.items.map((item) => (
//             <Link key={item.label} to={item.path} onClick={onClose} className="mob-sub-link">
//               <span className="mob-sub-link-left">{item.label}</span>
//             </Link>
//           ))}

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
//   const [scrolled, setScrolled]     = useState(false);
//   const { pathname }                 = useLocation();
//   const headerRef                    = useRef(null);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     if (headerRef.current) {
//       document.documentElement.style.setProperty("--nav-h", `${headerRef.current.offsetHeight}px`);
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
//         className={`fixed top-0 left-0 w-full z-[1000] bg-white transition-all duration-300 ${scrolled ? "nav-scrolled" : ""}`}
//         style={{ borderBottom: scrolled ? "none" : "1px solid var(--line)" }}
//       >
//         <div className="nav-accent-bar" />
//         <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 68 }}>
//           <Link to="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
//             <img src={logo} alt="Logo" style={{ height: 54, width: "auto" }} />
//           </Link>

//           <nav className="lg-show" style={{ alignItems: "center", gap: 28 }}>
//             {navigation.map((nav) => (
//               <DesktopNavItem key={nav.label} nav={nav} pathname={pathname} />
//             ))}
//           </nav>

//           <button
//             className="lg-hide"
//             onClick={() => setMobileOpen(true)}
//             style={{ background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 8, width: 40, height: 40, alignItems: "center", justifyContent: "center", color: "var(--ink-2)", cursor: "pointer" }}
//           >
//             <Menu size={20} />
//           </button>
//         </div>
//       </header>

//       <div className={`mobile-menu-container lg-hide ${mobileOpen ? "open" : ""}`}>
//         <div className="mobile-header">
//           <img src={logo} alt="Logo" style={{ height: 46 }} />
//           <button className="mob-close-btn" onClick={() => setMobileOpen(false)}>
//             <X size={18} />
//           </button>
//         </div>
//         <div className="mob-scroll-area">
//           {navigation.map((nav) => (
//             <MobileItem key={nav.label} nav={nav} pathname={pathname} onClose={() => setMobileOpen(false)} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;



// Header
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown, ChevronRight, Menu, X,
  GraduationCap, BookOpen, Clock, CalendarDays, Award,
  ArrowRight, Zap, BarChart2,
} from "lucide-react";
import logo from "@/assets/logo.png";

/* ─────────────────────────────────────────────────────────
    SERVICES DATA
───────────────────────────────────────────────────────── */
const servicesData = [
  {
    label: "Energy Optimization",
    icon: <Zap size={14} />,
    links: [
      { label: "Compressed Air Leak Detection",               path: "/services/compressed-air" },
      { label: "Internal Hydraulic/Pneumatic Leak Detection", path: "/services/hydraulic-pneumatic" },
      { label: "Steam Trap/Valve Pass Audit",                 path: "/services/steam-trap" },
      { label: "Air/Water Tight Integrity Assessment",        path: "/services/air-water-tight" },
      { label: "Underground Leak Detection",                  path: "/services/underground-leak" },
    ],
  },
  {
    label: "Predictive Analytics",
    icon: <BarChart2 size={14} />,
    groups: [
      {
        label: "Electrical Asset Monitoring",
        links: [
          { label: "Partial Discharge Detection",  path: "/services/partial-discharge" },
          { label: "Infrared Thermography Checks", path: "/services/infrared-thermography" },
        ],
      },
      {
        label: "Bearing Condition Assessment",
        links: [
          { label: "Slow Speed Bearing Inspection", path: "/services/bearing-inspection" },
          { label: "Lubrication Management",        path: "/services/lubrication-management" },
          { label: "Vibration Monitoring",          path: "/services/vibration-monitoring" },
        ],
      },
      {
        label: "Other Services",
        links: [
          { label: "Hull Integrity Assessment",       path: "/services/hull-integrity" },
          { label: "Thermal Monitoring & Automation", path: "/services/thermal-monitoring" },
          { label: "Industrial Endoscopy",            path: "/services/industrial-endoscopy" },
        ],
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
    NAVIGATION DATA
───────────────────────────────────────────────────────── */
const navigation = [
  { label: "Home",  path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", services: true },
  {
    label: "Products",
    items: [
      { label: "Ultra Sound Testing Devices",                     path: "/products/ultrasound-device",          tag: "Most Selling" },
      { label: "CBM with IIoT",                                   path: "/products/monitoring-systems" },
      { label: "Anti-Scaling Devices",                            path: "/products/scaling-devices" },
      { label: "Advanced Thermal Hotspot Monitoring / Solutions", path: "/products/thermal-hotspot-monitoring" },
      { label: "Industrial Endoscopes",                           path: "/services/industrial-endoscopy" },
    ],
  },
  {
    label: "Training",
    training: true,
    items: [
      { label: "Centre of Excellence",       icon: <GraduationCap size={14} />, path: "/centre",        desc: "State-of-the-art facility · Navi Mumbai" },
      { label: "Skill Development Programs", icon: <BookOpen size={14} />,      path: "/skill-programs", desc: "15 technology modules covered" },
      { label: "1-Day Training Programs",    icon: <Clock size={14} />,         path: "/one-day",        desc: "Leak Detection, IR Thermal, Acoustic, Oil Analysis…" },
      { label: "3-Day Training Programs",    icon: <CalendarDays size={14} />,  path: "/three-day",      desc: "Condition Monitoring, Ultrasound, Hydraulics, Vibration" },
      { label: "5-Day Training Programs",    icon: <CalendarDays size={14} />,  path: "/five-day",       desc: "Comprehensive advanced practical training" },
      { label: "Certification Courses",      icon: <Award size={14} />,         path: "/certification",  desc: "Mobius Institute ATC & AEC authorised" },
    ],
  },
  { label: "Gallery",      path: "/gallery" },
  { label: "Request Demo", path: "/contact", cta: true },
];

/* ─────────────────────────────────────────────────────────
    STYLES
───────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800&display=swap');

  :root {
    --ink: #0a0e17;
    --ink-2: #1e2535;
    --ink-3: #3d4a60;
    --muted: #8492a6;
    --line: #e8ecf2;
    --amber: #e8930a;
    --amber-dim: rgba(232,147,10,0.10);
    --surface: #ffffff;
    --surface-2: #f7f8fb;
    --nav-h: 72px;
  }

  .nav-root * {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  .nav-scrolled {
    box-shadow: 0 1px 0 var(--line), 0 4px 32px rgba(10,14,23,0.06);
    backdrop-filter: blur(20px) saturate(180%);
    background: rgba(255,255,255,0.92) !important;
  }

  .nav-accent-bar {
    height: 3px;
    background: linear-gradient(90deg, var(--amber) 0%, #f5c842 50%, var(--amber) 100%);
    background-size: 200% 100%;
    animation: barShimmer 3s linear infinite;
  }
  @keyframes barShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

  .nav-active-link { color: var(--amber) !important; }
  .nav-active-link::before {
    content: ''; position: absolute; bottom: -22px; left: 0; right: 0;
    height: 2px; background: var(--amber); border-radius: 99px;
  }

  .nav-btn {
    position: relative; display: inline-flex; align-items: center; gap: 5px;
    font-size: 13.5px; font-weight: 500; color: var(--ink-3);
    background: none; border: none; cursor: pointer; padding: 4px 0;
    transition: color 0.15s; letter-spacing: 0.01em;
  }
  .nav-btn:hover { color: var(--amber); }
  .nav-btn.open-state { color: var(--amber); }
  .nav-btn .chevron { transition: transform 0.2s cubic-bezier(.34,1.56,.64,1); color: var(--muted); }
  .nav-btn.open-state .chevron { transform: rotate(180deg); color: var(--amber); }

  .nav-cta {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 700;
    letter-spacing: 0.04em; color: #fff !important; background: var(--amber);
    padding: 10px 20px; border-radius: 6px; white-space: nowrap; text-decoration: none;
    transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
    box-shadow: 0 4px 16px rgba(232,147,10,0.35); position: relative; overflow: hidden;
  }
  .nav-cta::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--amber), #f5c842); opacity: 0; transition: opacity 0.2s; }
  .nav-cta:hover::after { opacity: 1; }
  .nav-cta > * { position: relative; z-index: 1; }
  .nav-cta:hover { background: #cf7f08; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(232,147,10,0.45); }
  .nav-cta:hover .cta-arrow { transform: translateX(3px); }
  .cta-arrow { transition: transform 0.18s; }

  /* ═══════════════════════════════════════════════════
      SHARED PANEL BASE
     ═══════════════════════════════════════════════════ */
  .svc-panel {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgba(10,14,23,0.12), 0 0 0 1px rgba(10,14,23,0.03);
    padding: 6px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.15s ease, transform 0.18s cubic-bezier(.34,1.2,.64,1);
  }

  /* ── L1: anchored to RIGHT edge of trigger, opens below nav ── */
  .svc-l1 {
    position: absolute;
    top: calc(100% + 14px);
    right: 0;
    left: auto;
    transform: translateY(8px);
    min-width: 240px;
    z-index: 999;
  }
  .svc-l1.open { opacity: 1; transform: translateY(0); pointer-events: auto; }
  .svc-l1::before {
    content: ''; position: absolute; top: -5px; right: 18px; left: auto;
    width: 10px; height: 10px; background: var(--surface);
    border-left: 1px solid var(--line); border-top: 1px solid var(--line);
    transform: rotate(45deg);
  }

  /* L1 row */
  .svc-l1-row {
    position: relative;
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    padding: 9px 12px; border-radius: 8px; cursor: default;
    font-size: 13.5px; font-weight: 500; color: var(--ink-3);
    transition: background 0.12s, color 0.12s;
    user-select: none;
  }
  .svc-l1-row:hover { background: var(--amber-dim); color: var(--ink); }
  .svc-l1-left { display: flex; align-items: center; gap: 10px; }

  .svc-icon {
    width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
    background: var(--amber-dim); color: var(--amber);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.12s, color 0.12s;
  }
  .svc-l1-row:hover .svc-icon { background: var(--amber); color: #fff; }

  .svc-chevron { color: var(--muted); flex-shrink: 0; transition: color 0.12s; }
  .svc-l1-row:hover .svc-chevron { color: var(--amber); }

  /* ── L2: flies RIGHT from L1 row ── */
  .svc-l2 {
    position: absolute;
    left: calc(100% + 2px);
    right: auto;
    top: -6px;
    min-width: 260px;
    transform: translateX(8px);
    z-index: 1000;
  }
  .svc-l1-row:hover > .svc-l2 { opacity: 1; transform: translateX(0); pointer-events: auto; }

  /* L2 direct link */
  .svc-l2-link {
    display: flex; align-items: center; gap: 0;
    padding: 9px 12px; font-size: 13px; font-weight: 500;
    color: var(--ink-3); text-decoration: none; border-radius: 7px;
    transition: background 0.12s, color 0.12s;
  }
  .svc-l2-link::before {
    content: ''; width: 0; height: 4px; border-radius: 50%;
    background: var(--amber); flex-shrink: 0;
    opacity: 0; transition: opacity 0.12s, width 0.12s, margin-right 0.12s;
    margin-right: 0;
  }
  .svc-l2-link:hover { background: var(--amber-dim); color: var(--ink); }
  .svc-l2-link:hover::before { opacity: 1; width: 4px; margin-right: 8px; }

  /* L2 group row */
  .svc-l2-group {
    position: relative;
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    padding: 9px 12px; border-radius: 7px; cursor: default;
    font-size: 13px; font-weight: 600; color: var(--ink-3);
    transition: background 0.12s, color 0.12s;
    user-select: none;
  }
  .svc-l2-group:hover { background: var(--amber-dim); color: var(--ink); }
  .svc-l2-group .svc-chevron-sm { color: var(--muted); flex-shrink: 0; transition: color 0.12s; }
  .svc-l2-group:hover .svc-chevron-sm { color: var(--amber); }

  /* ── L3: flies RIGHT from L2 group row ── */
  .svc-l3 {
    position: absolute;
    left: calc(100% + 2px);
    right: auto;
    top: -6px;
    min-width: 240px;
    transform: translateX(8px);
    z-index: 1001;
  }
  .svc-l2-group:hover > .svc-l3 { opacity: 1; transform: translateX(0); pointer-events: auto; }

  /* L3 link */
  .svc-l3-link {
    display: flex; align-items: center;
    padding: 9px 12px; font-size: 13px; font-weight: 500;
    color: var(--ink-3); text-decoration: none; border-radius: 7px;
    transition: background 0.12s, color 0.12s;
  }
  .svc-l3-link::before {
    content: ''; width: 0; height: 4px; border-radius: 50%;
    background: var(--amber); flex-shrink: 0;
    opacity: 0; transition: opacity 0.12s, width 0.12s, margin-right 0.12s;
    margin-right: 0;
  }
  .svc-l3-link:hover { background: var(--amber-dim); color: var(--ink); }
  .svc-l3-link:hover::before { opacity: 1; width: 4px; margin-right: 8px; }

  /* ═══════════════════════════════════════════════════
      SIMPLE DROPDOWN  (Products)
     ═══════════════════════════════════════════════════ */
  .simple-drop {
    position: absolute; top: calc(100% + 14px); left: 50%;
    transform: translateX(-50%) translateY(8px);
    background: var(--surface); border: 1px solid var(--line); border-radius: 12px;
    box-shadow: 0 20px 60px rgba(10,14,23,0.12), 0 0 0 1px rgba(10,14,23,0.04);
    min-width: 300px; padding: 6px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.18s ease, transform 0.2s cubic-bezier(.34,1.2,.64,1);
    z-index: 999;
  }
  .simple-drop.open { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  .simple-drop::before {
    content: ''; position: absolute; top: -5px; left: 50%;
    width: 10px; height: 10px; background: var(--surface);
    border-left: 1px solid var(--line); border-top: 1px solid var(--line);
    transform: translateX(-50%) rotate(45deg);
  }
  .sd-link {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 14px; font-size: 13.5px; font-weight: 500;
    color: var(--ink-3); text-decoration: none; border-radius: 7px;
    transition: background 0.12s, color 0.12s; justify-content: space-between;
  }
  .sd-link:hover { background: var(--amber-dim); color: var(--ink); }
  .sd-link-left { display: flex; align-items: center; gap: 8px; }
  .sd-link-left::before {
    content: ''; width: 4px; height: 4px; border-radius: 50%;
    background: var(--amber); flex-shrink: 0; opacity: 0; transition: opacity 0.12s;
  }
  .sd-link:hover .sd-link-left::before { opacity: 1; }
  .sd-most-selling {
    display: inline-flex; align-items: center; gap: 4px;
    background: #dcfce7; border: 1px solid #86efac; color: #15803d;
    font-size: 9.5px; font-weight: 700; letter-spacing: 0.06em;
    text-transform: uppercase; padding: 2px 7px; border-radius: 999px;
    white-space: nowrap; flex-shrink: 0;
  }
  .sd-most-selling::before { content: '★'; font-size: 8px; }

  /* ═══════════════════════════════════════════════════
      TRAINING DROPDOWN
     ═══════════════════════════════════════════════════ */
  .training-drop {
    position: absolute; top: calc(100% + 14px); left: 50%;
    transform: translateX(-50%) translateY(8px);
    background: var(--surface); border: 1px solid var(--line); border-radius: 12px;
    box-shadow: 0 20px 60px rgba(10,14,23,0.12); min-width: 380px; padding: 8px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.18s ease, transform 0.2s cubic-bezier(.34,1.2,.64,1);
    z-index: 999;
  }
  .training-drop.open { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  .training-drop::before {
    content: ''; position: absolute; top: -5px; left: 50%;
    width: 10px; height: 10px; background: var(--surface);
    border-left: 1px solid var(--line); border-top: 1px solid var(--line);
    transform: translateX(-50%) rotate(45deg);
  }
  .td-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 10px 14px; border-radius: 8px; text-decoration: none; transition: background 0.12s;
  }
  .td-item:hover { background: var(--surface-2); }
  .td-icon {
    width: 34px; height: 34px; border-radius: 8px; flex-shrink: 0;
    background: var(--amber-dim); display: flex; align-items: center; justify-content: center;
    color: var(--amber); margin-top: 1px; transition: background 0.12s, transform 0.15s;
  }
  .td-item:hover .td-icon { background: var(--amber); color: #fff; transform: scale(1.05); }
  .td-label { font-size: 13.5px; font-weight: 600; color: var(--ink); line-height: 1.3; }
  .td-desc  { font-size: 11.5px; color: var(--muted); margin-top: 3px; line-height: 1.4; }

  /* ═══════════════════════════════════════════════════
      MOBILE
     ═══════════════════════════════════════════════════ */
  .mobile-menu-container {
    position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
    background: var(--surface); z-index: 1001; display: flex; flex-direction: column;
    transform: translateX(100%); transition: transform 0.35s cubic-bezier(.77,0,.18,1);
  }
  .mobile-menu-container.open { transform: translateX(0); }
  .mobile-header {
    height: 72px; display: flex; align-items: center; justify-content: space-between;
    padding: 0 24px; border-bottom: 1px solid var(--line); flex-shrink: 0;
  }
  .mob-scroll-area { flex: 1; overflow-y: auto; padding-bottom: 40px; }
  .mob-link {
    display: flex; align-items: center; justify-content: space-between;
    padding: 17px 24px; font-size: 15px; font-weight: 500;
    color: var(--ink-2); text-decoration: none; border-bottom: 1px solid var(--line);
    transition: color 0.12s, background 0.12s;
  }
  .mob-link:hover { color: var(--amber); background: var(--amber-dim); }
  .mob-link.active { color: var(--amber); }
  .mob-trigger {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 17px 24px; font-size: 15px; font-weight: 500;
    color: var(--ink-2); background: none; border: none;
    border-bottom: 1px solid var(--line); text-align: left; cursor: pointer;
    transition: color 0.12s;
  }
  .mob-trigger.open-state { color: var(--amber); }
  .mob-acc { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
  .mob-acc.active { max-height: 3000px; }
  .mob-acc-inner { background: var(--surface-2); }

  .mob-l1-label {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 24px 4px 24px;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--amber);
  }
  .mob-l2-label {
    padding: 8px 24px 2px 36px;
    font-size: 9px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted);
  }
  .mob-l2-link {
    display: flex; align-items: center; gap: 8px;
    padding: 11px 24px 11px 36px; font-size: 13px; font-weight: 500;
    color: var(--ink-3); text-decoration: none; border-bottom: 1px solid var(--line);
    transition: color 0.12s, background 0.12s;
  }
  .mob-l2-link::before {
    content: ''; width: 4px; height: 4px; border-radius: 50%;
    background: var(--amber); flex-shrink: 0;
  }
  .mob-l2-link:hover { color: var(--amber); background: var(--amber-dim); }
  .mob-l3-link {
    display: flex; align-items: center; gap: 8px;
    padding: 11px 24px 11px 48px; font-size: 12.5px; font-weight: 500;
    color: var(--ink-3); text-decoration: none; border-bottom: 1px solid var(--line);
    transition: color 0.12s, background 0.12s;
  }
  .mob-l3-link::before {
    content: ''; width: 3px; height: 3px; border-radius: 50%;
    background: var(--muted); flex-shrink: 0;
  }
  .mob-l3-link:hover { color: var(--amber); background: var(--amber-dim); }
  .mob-divider { height: 1px; background: var(--line); margin: 4px 0; }

  .mob-sub-link {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 24px 11px 32px; font-size: 13px; font-weight: 500;
    color: var(--ink-3); text-decoration: none; border-bottom: 1px solid var(--line);
    transition: color 0.12s, background 0.12s; justify-content: space-between;
  }
  .mob-sub-link-left { display: flex; align-items: center; gap: 8px; }
  .mob-sub-link-left::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--amber); flex-shrink: 0; }
  .mob-sub-link:hover { color: var(--amber); background: var(--amber-dim); }
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
    color: var(--ink-2); cursor: pointer; transition: background 0.12s;
  }
  .mob-close-btn:hover { background: var(--line); }
  .mob-cta-wrap { padding: 20px 24px; }
  .mob-cta {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 14px 20px; background: var(--amber); color: #fff;
    font-size: 14px; font-weight: 700;
    letter-spacing: 0.04em; border-radius: 8px; text-decoration: none;
    transition: background 0.18s;
  }
  .mob-cta:hover { background: #cf7f08; }

  @media (min-width: 1024px) { .lg-show { display: flex !important; } .lg-hide { display: none !important; } }
  @media (max-width: 1023px)  { .lg-show { display: none !important; } .lg-hide { display: flex !important; } }
`;

/* ─────────────────────────────────────────────────────────
    MULTI-LEVEL SERVICES FLYOUT
    L1 right-aligned under trigger → L2 right → L3 right
───────────────────────────────────────────────────────── */
const ServicesFlyout = ({ open }) => (
  <div className={`svc-panel svc-l1 ${open ? "open" : ""}`}>
    {servicesData.map((cat) => (
      <div key={cat.label} className="svc-l1-row">
        <span className="svc-l1-left">
          <span className="svc-icon">{cat.icon}</span>
          {cat.label}
        </span>
        <ChevronRight size={13} className="svc-chevron" />

        {/* L2 opens to the RIGHT */}
        <div className="svc-panel svc-l2">
          {cat.links && cat.links.map((link) => (
            <Link key={link.label} to={link.path} className="svc-l2-link">
              {link.label}
            </Link>
          ))}
          {cat.groups && cat.groups.map((group) => (
            <div key={group.label} className="svc-l2-group">
              {group.label}
              <ChevronRight size={12} className="svc-chevron-sm" />

              {/* L3 opens to the RIGHT */}
              <div className="svc-panel svc-l3">
                {group.links.map((link) => (
                  <Link key={link.label} to={link.path} className="svc-l3-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────────────────
    SIMPLE DROPDOWN  (Products)
───────────────────────────────────────────────────────── */
const SimpleDrop = ({ items, open }) => (
  <div className={`simple-drop ${open ? "open" : ""}`}>
    {items.map((item) => (
      <Link key={item.label} to={item.path} className="sd-link">
        <span className="sd-link-left">{item.label}</span>
        {item.tag && <span className="sd-most-selling">{item.tag}</span>}
      </Link>
    ))}
  </div>
);

/* ─────────────────────────────────────────────────────────
    DESKTOP NAV ITEM
───────────────────────────────────────────────────────── */
const DesktopNavItem = ({ nav, pathname }) => {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const enter = () => { clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 180); };

  if (nav.cta) {
    return (
      <Link to={nav.path} className="nav-cta">
        <span>{nav.label}</span>
        <ArrowRight size={14} className="cta-arrow" />
      </Link>
    );
  }

  if (!nav.items && !nav.training && !nav.services) {
    return (
      <Link
        to={nav.path}
        className={`nav-btn ${pathname === nav.path ? "nav-active-link" : ""}`}
        style={{ textDecoration: "none" }}
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

      {nav.services && <ServicesFlyout open={open} />}
      {nav.items && !nav.training && <SimpleDrop items={nav.items} open={open} />}
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
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
    MOBILE NAV ITEM
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

  if (!nav.items && !nav.training && !nav.services) {
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

          {/* Services — 3 levels in accordion */}
          {nav.services && servicesData.map((cat, ci) => (
            <div key={cat.label}>
              {ci > 0 && <div className="mob-divider" />}
              <div className="mob-l1-label">
                <span style={{ opacity: 0.8 }}>{cat.icon}</span>
                {cat.label}
              </div>
              {cat.links && cat.links.map((link) => (
                <Link key={link.label} to={link.path} onClick={onClose} className="mob-l2-link">
                  {link.label}
                </Link>
              ))}
              {cat.groups && cat.groups.map((group) => (
                <div key={group.label}>
                  <div className="mob-l2-label">{group.label}</div>
                  {group.links.map((link) => (
                    <Link key={link.label} to={link.path} onClick={onClose} className="mob-l3-link">
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          ))}

          {/* Products */}
          {nav.items && !nav.training && nav.items.map((item) => (
            <Link key={item.label} to={item.path} onClick={onClose} className="mob-sub-link">
              <span className="mob-sub-link-left">{item.label}</span>
              {item.tag && <span className="mob-most-selling">{item.tag}</span>}
            </Link>
          ))}

          {/* Training */}
          {nav.training && nav.items.map((item) => (
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
  const [scrolled, setScrolled]     = useState(false);
  const { pathname }                 = useLocation();
  const headerRef                    = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      document.documentElement.style.setProperty("--nav-h", `${headerRef.current.offsetHeight}px`);
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
        className={`fixed top-0 left-0 w-full z-[1000] bg-white transition-all duration-300 ${scrolled ? "nav-scrolled" : ""}`}
        style={{ borderBottom: scrolled ? "none" : "1px solid var(--line)" }}
      >
        <div className="nav-accent-bar" />
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 68 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src={logo} alt="Logo" style={{ height: 54, width: "auto" }} />
          </Link>

          <nav className="lg-show" style={{ alignItems: "center", gap: 28 }}>
            {navigation.map((nav) => (
              <DesktopNavItem key={nav.label} nav={nav} pathname={pathname} />
            ))}
          </nav>

          <button
            className="lg-hide"
            onClick={() => setMobileOpen(true)}
            style={{ background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 8, width: 40, height: 40, alignItems: "center", justifyContent: "center", color: "var(--ink-2)", cursor: "pointer" }}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div className={`mobile-menu-container lg-hide ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-header">
          <img src={logo} alt="Logo" style={{ height: 46 }} />
          <button className="mob-close-btn" onClick={() => setMobileOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <div className="mob-scroll-area">
          {navigation.map((nav) => (
            <MobileItem key={nav.label} nav={nav} pathname={pathname} onClose={() => setMobileOpen(false)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;