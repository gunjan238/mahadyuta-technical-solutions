/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Lock, Database, Eye, Share2, Shield, Mail, UserCheck, Trash2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const useFU = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("vis"), delay); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
};

const EFFECTIVE_DATE = "1 June 2025";
const COMPANY  = "Mahadyuta Technical Solutions Pvt. Ltd.";
const ADDRESS  = "#B-429, Silver Springs, Taloja MIDC Road, M.I.D.C. Taloja, Taluka: Panvel, Navi Mumbai, Maharashtra – 410 208, India";
const EMAIL    = "info@mahadyuta.com";
const PHONE    = "(+91) 8976684258 / 022 48018922";
const WEBSITE  = "www.mahadyuta.com";

const sections = [
  {
    id: "1",
    icon: <Eye size={18} />,
    title: "Introduction",
    content: [
      `${COMPANY} ("Mahadyuta", "we", "our", "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, store and protect your personal data when you visit our website ${WEBSITE} or engage with our services.`,
      "This Policy is drafted in compliance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (SPDI Rules) of India, and reflects our alignment with internationally accepted privacy principles including the General Data Protection Regulation (GDPR).",
      "By using our Website or services you consent to the practices described in this Privacy Policy. If you do not agree with this Policy, please do not use our Website or provide us with any personal information.",
    ],
  },
  {
    id: "2",
    icon: <Database size={18} />,
    title: "Information We Collect",
    content: [
      "We collect the following categories of personal information:\n\n(a) Identity & Contact Data: Full name, job title, company name, email address, telephone number, and business address — collected when you complete enquiry forms, register for training programs, or contact us.\n\n(b) Technical Data: IP address, browser type and version, operating system, referral source, page visit duration, and other standard web analytics data collected automatically when you visit our Website.\n\n(c) Communication Data: Records of correspondence when you contact us by email, telephone, or through our Website contact forms.\n\n(d) Transaction Data: Details of services purchased, invoice records, payment history, and purchase order information.\n\n(e) Training & Certification Data: Name, contact details, assessment results, and attendance records for training program participants.",
      "We do not intentionally collect sensitive personal data such as financial credentials, health data, biometric data, or government identification numbers through our Website. Where such data is required for a specific engagement it will be collected under a separate, explicit consent framework.",
    ],
  },
  {
    id: "3",
    icon: <UserCheck size={18} />,
    title: "How We Collect Your Information",
    content: [
      "We collect your personal information through the following means:\n\n• Direct interactions: When you submit enquiry forms, register for training, request a quotation, or correspond with us by email or telephone.\n\n• Automated technologies: We use cookies, log files, and similar technologies to collect technical data when you navigate our Website. See Section 8 (Cookies) for more details.\n\n• Third parties: We may receive your information from business partners, event organisers, or referral contacts in a professional context.",
    ],
  },
  {
    id: "4",
    icon: <Shield size={18} />,
    title: "How We Use Your Information",
    content: [
      "We use your personal information for the following purposes:\n\n(a) Service Delivery: To provide, manage and improve the services and products you have requested or are likely to request.\n\n(b) Communications: To respond to enquiries, send quotations, confirm bookings, provide inspection reports, issue certificates, and send other service-related communications.\n\n(c) Training Administration: To register participants, deliver training programs, issue assessments, and award certificates through our Centre of Excellence and authorised certification bodies.\n\n(d) Marketing: To send you information about our services, events, and industry insights where you have consented to receive such communications. You may opt out at any time.\n\n(e) Legal Compliance: To comply with applicable legal and regulatory obligations, resolve disputes, and enforce our agreements.\n\n(f) Business Improvement: To analyse usage patterns, improve our Website, and develop new services based on industry needs.\n\n(g) Security: To prevent fraud, detect and investigate security incidents, and protect the integrity of our systems.",
      "We process your personal data only where we have a lawful basis to do so — primarily: (i) your consent; (ii) performance of a contract with you or your organisation; (iii) compliance with a legal obligation; or (iv) our legitimate interests in operating and growing our business, provided those interests are not overridden by your rights.",
    ],
  },
  {
    id: "5",
    icon: <Share2 size={18} />,
    title: "Disclosure of Your Information",
    content: [
      "We do not sell, rent, or trade your personal information to third parties. We may share your information in the following limited circumstances:\n\n(a) Service Partners: Third-party service providers who assist us in operating our Website, delivering services, processing payments, sending communications, or providing IT infrastructure — all of whom are contractually bound to protect your data.\n\n(b) Certification Bodies: Mobius Institute (Australia), SONOTEC GmbH (Germany), or other authorised examination and certification bodies where you are participating in a certification program.\n\n(c) Legal Requirements: Law enforcement agencies, courts, or regulatory authorities where disclosure is required by law, court order, or to protect the rights, property, or safety of Mahadyuta, our clients, or others.\n\n(d) Business Transfers: In connection with any merger, acquisition, reorganisation, or sale of all or a portion of our business, where personal data may be transferred as a business asset.\n\n(e) Professional Advisors: Our lawyers, auditors, and accountants where necessary for professional advice and compliance.",
      "Any third parties with whom we share your data are required to respect the security of your personal information and to treat it in accordance with applicable law.",
    ],
  },
  {
    id: "6",
    icon: <Database size={18} />,
    title: "Data Retention",
    content: [
      "We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.\n\nAs a general guide:\n\n• Enquiry and contact data: 3 years from last contact\n• Client transaction and service records: 7 years (for tax and contractual compliance)\n• Training and certification records: 10 years (for professional credential verification)\n• Website analytics data: 26 months (in line with standard analytics practices)\n• Marketing consent records: Until you withdraw consent, plus 2 years\n\nUpon expiry of the applicable retention period, your data will be securely deleted or anonymised.",
    ],
  },
  {
    id: "7",
    icon: <Lock size={18} />,
    title: "Data Security",
    content: [
      "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, accidental loss, destruction, or damage. These measures include:\n\n• Secure Socket Layer (SSL/TLS) encryption for data in transit on our Website\n• Access controls and authentication requirements for internal systems\n• Regular security reviews and staff training on data protection\n• Secure physical storage of paper records containing personal information\n• Contractual data protection requirements imposed on all third-party processors",
      "While we take all reasonable precautions, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data. In the event of a data breach that is likely to result in a risk to your rights and freedoms, we will notify you and the appropriate authorities as required by law.",
    ],
  },
  {
    id: "8",
    icon: <Eye size={18} />,
    title: "Cookies and Tracking Technologies",
    content: [
      "Our Website uses cookies and similar tracking technologies to improve your browsing experience and to analyse Website traffic. Cookies are small text files placed on your device by our Website.",
      "We use the following types of cookies:\n\n• Strictly Necessary Cookies: Essential for the Website to function correctly. These cannot be disabled.\n\n• Analytics Cookies: Help us understand how visitors interact with our Website by collecting and reporting anonymous information (e.g. Google Analytics).\n\n• Preference Cookies: Remember your settings and preferences to improve your experience on return visits.\n\n• Marketing Cookies: Used to track visitors across websites to display relevant advertisements (used only where consent has been obtained).",
      "You can control cookie settings through your browser preferences. Disabling cookies may affect the functionality of certain parts of our Website. By continuing to use our Website without adjusting your cookie settings, you consent to our use of cookies as described in this Policy.",
    ],
  },
  {
    id: "9",
    icon: <UserCheck size={18} />,
    title: "Your Rights",
    content: [
      "Subject to applicable law, you have the following rights with respect to your personal information:\n\n(a) Right of Access: You may request a copy of the personal information we hold about you.\n\n(b) Right to Rectification: You may request that we correct any inaccurate or incomplete information we hold.\n\n(c) Right to Erasure: You may request that we delete your personal information where there is no compelling reason for us to continue processing it.\n\n(d) Right to Restriction: You may request that we restrict the processing of your personal information in certain circumstances.\n\n(e) Right to Data Portability: Where processing is based on consent or contract, you may request that we transfer your data to you or a third party in a structured, commonly used, machine-readable format.\n\n(f) Right to Object: You have the right to object to processing based on our legitimate interests, including direct marketing.\n\n(g) Right to Withdraw Consent: Where processing is based on your consent, you may withdraw that consent at any time without affecting the lawfulness of processing prior to withdrawal.",
      "To exercise any of these rights, please contact us using the details in Section 12. We will respond to your request within thirty (30) days. We may need to verify your identity before processing your request.",
    ],
  },
  {
    id: "10",
    icon: <Share2 size={18} />,
    title: "International Data Transfers",
    content: [
      "Mahadyuta is based in India. Where we transfer your personal information to third parties located outside India (for example, to Mobius Institute in Australia or SONOTEC GmbH in Germany for certification purposes), we take steps to ensure that appropriate safeguards are in place, including contractual protections, to protect the privacy and security of your data.",
    ],
  },
  {
    id: "11",
    icon: <Eye size={18} />,
    title: "Third-Party Websites",
    content: [
      "Our Website may contain links to third-party websites including our partners, certification bodies, and industry associations. This Privacy Policy does not apply to those websites. We encourage you to read the privacy policies of every website you visit. We are not responsible for the privacy practices or content of third-party websites.",
    ],
  },
  {
    id: "12",
    icon: <Trash2 size={18} />,
    title: "Children's Privacy",
    content: [
      "Our Website and services are intended for business professionals and are not directed at or designed to attract children under the age of 18. We do not knowingly collect personal information from anyone under 18 years of age. If we become aware that a child has provided us with personal information without parental consent, we will take steps to delete such information.",
    ],
  },
  {
    id: "13",
    icon: <Shield size={18} />,
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the revised Policy on this page with an updated effective date.",
      "We encourage you to review this Policy periodically. Your continued use of our Website or services after any changes constitutes your acceptance of the revised Policy.",
    ],
  },
  {
    id: "14",
    icon: <Mail size={18} />,
    title: "Contact Us & Grievance Officer",
    content: [
      `If you have any questions, concerns, or complaints about this Privacy Policy or our data practices, or to exercise any of your rights, please contact our designated Privacy Officer:\n\n${COMPANY}\n${ADDRESS}\nEmail: ${EMAIL}\nPhone: ${PHONE}\nWebsite: ${WEBSITE}`,
      "In accordance with the Information Technology Act, 2000 and the SPDI Rules, 2011, any grievances or complaints regarding the processing of your personal data will be acknowledged within 48 hours and resolved within thirty (30) days of receipt.",
    ],
  },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  .pp-page { font-family:'Roboto',sans-serif; color:#1e293b; }
  .pp-page * { box-sizing:border-box; }
  .fu { opacity:0; transform:translateY(20px); transition:opacity .5s ease,transform .5s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }

  .pp-hero { position:relative; overflow:hidden; min-height:44vh; display:flex; align-items:center; }
  .pp-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
  .pp-hero-wash  { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,.90) 0%,rgba(224,242,254,.82) 55%,rgba(255,251,235,.90) 100%); }
  .pp-hero-dots  { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .pp-hero-burst { position:absolute; pointer-events:none; width:60vw; height:60vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,.24) 0%,rgba(251,191,36,.08) 40%,transparent 70%); top:-20%; left:-10%; }

  .pp-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
  .pp-bread a { font-size:12.5px; color:#64748b; text-decoration:none; } .pp-bread a:hover { color:#f59e0b; }
  .pp-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:18px; }

  .pp-body { max-width:900px; margin:0 auto; padding:72px 28px 96px; }

  .pp-section { margin-bottom:52px; }
  .pp-section-header { display:flex; align-items:center; gap:12px; margin-bottom:18px; padding-bottom:14px; border-bottom:2px solid #e0f2fe; }
  .pp-section-num  { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#f59e0b,#ea580c); display:flex; align-items:center; justify-content:center; color:#fff; font-size:13px; font-weight:900; flex-shrink:0; box-shadow:0 4px 12px rgba(245,158,11,0.35); }
  .pp-section-icon { width:36px; height:36px; border-radius:10px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; flex-shrink:0; }
  .pp-section-title { font-size:18px; font-weight:800; color:#0f1117; }
  .pp-para { font-size:14.5px; color:#475569; line-height:1.85; margin-bottom:14px; white-space:pre-line; }
  .pp-para:last-child { margin-bottom:0; }

  .pp-toc { background:#f0f9ff; border:1px solid rgba(14,165,233,0.22); border-radius:20px; padding:28px 32px; margin-bottom:52px; }
  .pp-toc-title { font-size:13px; font-weight:700; color:#0369a1; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:16px; }
  .pp-toc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:8px; }
  .pp-toc-item { display:flex; align-items:center; gap:8px; font-size:13.5px; color:#334155; font-weight:500; padding:6px 0; }
  .pp-toc-dot { width:6px; height:6px; border-radius:50%; background:linear-gradient(135deg,#0ea5e9,#0284c7); flex-shrink:0; }

  .pp-rights-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:12px; margin:24px 0; }
  .pp-right-card { background:#fff; border:1px solid #eef0f4; border-radius:14px; padding:16px 18px; display:flex; align-items:flex-start; gap:10px; transition:border-color .2s,box-shadow .2s; }
  .pp-right-card:hover { border-color:rgba(245,158,11,0.30); box-shadow:0 4px 14px rgba(0,0,0,.06); }
  .pp-right-dot { width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg,#f59e0b,#ea580c); flex-shrink:0; margin-top:6px; }

  .pp-notice { background:linear-gradient(135deg,#0ea5e9,#0369a1); border-radius:16px; padding:24px 28px; color:#fff; margin-bottom:52px; position:relative; overflow:hidden; }
  .pp-notice::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 0%,rgba(255,255,255,.16) 0%,transparent 60%); pointer-events:none; }

  .pp-commit-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:14px; margin:32px 0; }
  .pp-commit-card { background:#fff; border:1px solid #eef0f4; border-radius:16px; padding:20px 18px; text-align:center; box-shadow:0 2px 8px rgba(0,0,0,.04); transition:box-shadow .2s,transform .2s; }
  .pp-commit-card:hover { box-shadow:0 8px 24px rgba(0,0,0,.09); transform:translateY(-3px); }
  .pp-commit-emoji { font-size:28px; margin-bottom:10px; }
  .pp-commit-label { font-size:13px; font-weight:700; color:#0f1117; margin-bottom:4px; }
  .pp-commit-sub   { font-size:12px; color:#64748b; }
`;

const PrivacyPolicy = () => {
  const secRefs = sections.map((_, i) => useFU(i * 60));
  const refToc  = useFU(0);
  const refCommit = useFU(0);

  return (
    <div className="pp-page">
      <style>{css}</style>

      {/* ── Hero ── */}
      <section className="pp-hero">
        <img src={heroBg} alt="" className="pp-hero-photo" aria-hidden="true"/>
        <div className="pp-hero-wash"/><div className="pp-hero-dots"/><div className="pp-hero-burst"/>
        <div style={{ position:"relative", maxWidth:1280, margin:"0 auto", padding:"60px 28px", width:"100%" }}>
          <div className="pp-bread">
            <Link to="/">Home</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
            <span style={{ fontSize:12.5, color:"#334155", fontWeight:500 }}>Privacy Policy</span>
          </div>
          <div className="pp-badge"><Lock size={11}/> Privacy & Data Protection</div>
          <h1 style={{ fontSize:"clamp(28px,4.5vw,52px)", fontWeight:900, color:"#1e293b", lineHeight:1.05, marginBottom:12 }}>
            Privacy{" "}
            <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Policy
            </span>
          </h1>
          <p style={{ fontSize:15, color:"#475569", maxWidth:540 }}>
            We are committed to protecting your personal data. This Policy explains what we collect, why we collect it, and how we keep it safe.
          </p>
          <div style={{ marginTop:16, display:"flex", gap:12, flexWrap:"wrap" }}>
            {/* <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(245,158,11,0.10)", border:"1px solid rgba(245,158,11,0.28)", borderRadius:10, padding:"8px 14px", fontSize:13, color:"#b45309", fontWeight:600 }}>
              <Lock size={13}/> Effective Date: {EFFECTIVE_DATE}
            </div> */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(14,165,233,0.10)", border:"1px solid rgba(14,165,233,0.28)", borderRadius:10, padding:"8px 14px", fontSize:13, color:"#0369a1", fontWeight:600 }}>
              <Shield size={13}/> IT Act 2000 · SPDI Rules 2011 · GDPR Aligned
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="pp-body">

        {/* Privacy commitment strip */}
        <div className="pp-notice">
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontSize:12, fontWeight:700, opacity:0.80, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Our Privacy Commitment</div>
            <p style={{ fontSize:14.5, lineHeight:1.75, opacity:0.95, margin:0 }}>
              {COMPANY} believes that privacy is a fundamental right. We collect only what we need, store it only as long as necessary, and never sell your personal information. This Policy is our commitment to transparency about how we handle your data.
            </p>
          </div>
        </div>

        {/* At a glance cards */}
        <div ref={refCommit} className="fu" style={{ marginBottom:52 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#b45309", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:20 }}>Privacy at a Glance</div>
          <div className="pp-commit-grid">
            {[
              {emoji:"🔒", label:"Data Security",        sub:"Encrypted & access-controlled"},
              {emoji:"🚫", label:"No Data Selling",      sub:"We never sell your information"},
              {emoji:"✂️",  label:"Minimal Collection",   sub:"Only what we truly need"},
              {emoji:"🗑",  label:"Timely Deletion",      sub:"Deleted after retention period"},
              {emoji:"📋",  label:"Your Rights",          sub:"Access, correct & erase anytime"},
              {emoji:"🇮🇳", label:"Indian Law Compliant", sub:"IT Act 2000 & SPDI Rules"},
            ].map(c=>(
              <div key={c.label} className="pp-commit-card">
                <div className="pp-commit-emoji">{c.emoji}</div>
                <div className="pp-commit-label">{c.label}</div>
                <div className="pp-commit-sub">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Table of Contents */}
        <div ref={refToc} className="pp-toc fu">
          <div className="pp-toc-title">Table of Contents</div>
          <div className="pp-toc-grid">
            {sections.map(s=>(
              <div key={s.id} className="pp-toc-item">
                <span className="pp-toc-dot"/>
                {s.id}. {s.title}
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        {sections.map((s, i) => (
          <div key={s.id} ref={secRefs[i]} className="pp-section fu">
            <div className="pp-section-header">
              <div className="pp-section-num">{s.id}</div>
              <div className="pp-section-icon">{s.icon}</div>
              <h2 className="pp-section-title">{s.title}</h2>
            </div>
            {s.content.map((p, j) => (
              <p key={j} className="pp-para">{p}</p>
            ))}
          </div>
        ))}

        {/* Footer */}
        <div style={{ borderTop:"1px solid #eef0f4", paddingTop:32, textAlign:"center" }}>
          {/* <p style={{ fontSize:13, color:"#94a3b8", marginBottom:12 }}>
            Last updated: {EFFECTIVE_DATE} · {COMPANY}
          </p> */}
          <p style={{ fontSize:13, color:"#94a3b8", marginBottom:16 }}>
            For data-related queries: <a href={`mailto:${EMAIL}`} style={{ color:"#f59e0b", fontWeight:600, textDecoration:"none" }}>{EMAIL}</a>
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/terms-and-conditions" style={{ fontSize:13.5, fontWeight:600, color:"#b45309", textDecoration:"none" }}>Terms & Conditions →</Link>
            <Link to="/contact"              style={{ fontSize:13.5, fontWeight:600, color:"#b45309", textDecoration:"none" }}>Contact Us →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
