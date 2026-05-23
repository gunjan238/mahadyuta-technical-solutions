/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, FileText, Shield, Scale, AlertTriangle, Mail } from "lucide-react";
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
const COMPANY = "Mahadyuta Technical Solutions Pvt. Ltd.";
const ADDRESS = "#B-429, Silver Springs, Taloja MIDC Road, M.I.D.C. Taloja, Taluka: Panvel, Navi Mumbai, Maharashtra – 410 208, India";
const EMAIL   = "info@mahadyuta.com";
const PHONE   = "(+91) 8976684258 / 022 48018922";

const sections = [
  {
    id: "1",
    icon: <FileText size={18} />,
    title: "Acceptance of Terms",
    content: [
      `By accessing or using the website www.mahadyuta.com ("Website") or engaging ${COMPANY} ("Mahadyuta", "we", "our", "us") for any service, product, training or consultancy, you ("User", "Client", "you") agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you must discontinue use of our Website and services immediately.`,
      "These Terms constitute a legally binding agreement between you and Mahadyuta. We reserve the right to amend these Terms at any time without prior notice. Continued use of our Website or services after any such changes shall constitute your acceptance of the revised Terms.",
    ],
  },
  {
    id: "2",
    icon: <Shield size={18} />,
    title: "Services Provided",
    content: [
      `Mahadyuta provides industrial reliability services including but not limited to: compressed air leak detection, infrared thermography, vibration monitoring, lubrication management, industrial endoscopy inspection, steam trap surveys, ultrasound-based condition monitoring, IIoT monitoring solutions, thermal monitoring and automation systems, and training programs through our Centre of Excellence.`,
      "All services are provided on a professional basis and are subject to individual service agreements, purchase orders, or scope of work documents executed between Mahadyuta and the Client. In the event of any conflict between these Terms and a specific service agreement, the terms of the service agreement shall prevail.",
      "We reserve the right to refuse, modify or discontinue any service at our discretion without liability to any party.",
    ],
  },
  {
    id: "3",
    icon: <Scale size={18} />,
    title: "Intellectual Property Rights",
    content: [
      "All content on this Website — including but not limited to text, graphics, logos, photographs, illustrations, SVG graphics, videos, data, software, and the overall design — is the exclusive intellectual property of Mahadyuta Technical Solutions Pvt. Ltd. or its licensors and is protected under the Copyright Act, 1957 (India) and applicable international intellectual property laws.",
      "You may not reproduce, distribute, transmit, modify, create derivative works from, or commercially exploit any content from this Website without our prior written consent. Unauthorised use of any content may give rise to a claim for damages and may constitute a criminal offence.",
      "Trademarks, service marks and trade names displayed on this Website are the property of Mahadyuta or their respective owners. Nothing contained herein shall be construed as granting any licence or right to use any trademark or trade name without the owner's prior written permission.",
    ],
  },
  {
    id: "4",
    icon: <FileText size={18} />,
    title: "Use of Website",
    content: [
      "You agree to use this Website only for lawful purposes and in a manner that does not infringe the rights of others or restrict or inhibit the use and enjoyment of this Website by any third party.",
      "You must not: (a) use the Website in any way that breaches applicable local, national, or international law or regulation; (b) transmit any unsolicited or unauthorised advertising or promotional material; (c) knowingly transmit any data, send or upload any material that contains viruses, Trojan horses, worms or any other harmful programs; (d) attempt to gain unauthorised access to our servers, databases, or networks.",
      "Mahadyuta reserves the right to terminate your access to the Website at any time without notice if we reasonably believe that you are in breach of these Terms.",
    ],
  },
  {
    id: "5",
    icon: <AlertTriangle size={18} />,
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by applicable law, Mahadyuta, its directors, officers, employees, agents, and partners shall not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages arising from your use of our Website or services, including but not limited to loss of profits, revenue, data, goodwill, or other intangible losses.",
      "In no event shall our total liability to you for all claims arising out of or relating to these Terms or your use of our services exceed the amount paid by you to us for the specific service giving rise to the claim in the twelve (12) months preceding the claim.",
      "This limitation of liability applies regardless of whether the claim is based on warranty, contract, tort, strict liability, or any other legal or equitable theory, and regardless of whether we have been advised of the possibility of such damages.",
      "Nothing in these Terms shall limit our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded by law.",
    ],
  },
  {
    id: "6",
    icon: <FileText size={18} />,
    title: "Warranties and Disclaimer",
    content: [
      "Our Website and its content are provided on an 'as is' and 'as available' basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      "We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components. We do not make any representations regarding the accuracy, reliability, completeness, or timeliness of any content on the Website.",
      "All technical recommendations and inspection findings provided by Mahadyuta are made in good faith based on available information and industry standards. Final decisions on maintenance, repair, or replacement of equipment remain the sole responsibility of the Client.",
    ],
  },
  {
    id: "7",
    icon: <FileText size={18} />,
    title: "Payments and Cancellations",
    content: [
      "Payment terms for services shall be as specified in the relevant quotation, purchase order, or service agreement. Unless otherwise agreed in writing, invoices are payable within thirty (30) days of the invoice date.",
      "Mahadyuta reserves the right to charge interest on overdue payments at the rate of 18% per annum or the maximum rate permitted by applicable law, whichever is lower.",
      "Training program registrations are confirmed upon receipt of full payment. Cancellations made more than seven (7) calendar days prior to the program date will receive a full refund less any administrative charges. Cancellations within seven (7) days of the program date will be subject to a cancellation fee of 50% of the program fee. No-shows will be charged the full program fee.",
      "Site inspection or service cancellations must be notified at least 48 hours prior to the scheduled visit. Late cancellations may be subject to a mobilisation fee.",
    ],
  },
  {
    id: "8",
    icon: <Shield size={18} />,
    title: "Confidentiality",
    content: [
      "Both parties acknowledge that in the course of service delivery, each may have access to confidential information belonging to the other. Each party agrees to hold such confidential information in strict confidence and not to disclose it to any third party without the prior written consent of the disclosing party, except as required by law.",
      "Confidential information shall not include information that: (a) is or becomes publicly known through no act or omission of the receiving party; (b) was already known to the receiving party at the time of disclosure; (c) is rightfully received from a third party without restriction; or (d) is independently developed by the receiving party without reference to the confidential information.",
      "This confidentiality obligation shall survive the termination of any service agreement for a period of three (3) years.",
    ],
  },
  {
    id: "9",
    icon: <Scale size={18} />,
    title: "Governing Law and Dispute Resolution",
    content: [
      `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from or in connection with these Terms or the use of our services shall be subject to the exclusive jurisdiction of the courts of Navi Mumbai, Maharashtra, India.`,
      "In the event of any dispute, the parties shall first attempt to resolve the matter through good-faith negotiation. If negotiation fails within thirty (30) days, the dispute shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted by a sole arbitrator mutually agreed upon by the parties, and the seat of arbitration shall be Navi Mumbai, Maharashtra.",
    ],
  },
  {
    id: "10",
    icon: <FileText size={18} />,
    title: "Third-Party Links",
    content: [
      "Our Website may contain links to third-party websites for informational purposes. These links are provided solely as a convenience and do not constitute an endorsement by Mahadyuta of the content, products, or services offered by such third parties.",
      "We have no control over the content of linked third-party websites and accept no responsibility for any loss or damage that may arise from your use of such sites. You access third-party websites at your own risk.",
    ],
  },
  {
    id: "11",
    icon: <FileText size={18} />,
    title: "Force Majeure",
    content: [
      "Mahadyuta shall not be held liable for any failure or delay in the performance of our obligations under any service agreement or these Terms where such failure or delay results from circumstances beyond our reasonable control, including but not limited to: acts of God, natural disasters, pandemic, epidemic, war, civil unrest, government actions, power failures, internet or telecommunications outages, or labour disputes.",
    ],
  },
  {
    id: "12",
    icon: <Mail size={18} />,
    title: "Contact Us",
    content: [
      `If you have any questions about these Terms and Conditions, please contact us:\n\n${COMPANY}\n${ADDRESS}\nEmail: ${EMAIL}\nPhone: ${PHONE}`,
    ],
  },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  .tc-page { font-family:'Roboto',sans-serif; color:#1e293b; }
  .tc-page * { box-sizing:border-box; }
  .fu { opacity:0; transform:translateY(20px); transition:opacity .5s ease,transform .5s ease; }
  .fu.vis { opacity:1; transform:translateY(0); }

  .tc-hero { position:relative; overflow:hidden; min-height:44vh; display:flex; align-items:center; }
  .tc-hero-photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.62); pointer-events:none; }
  .tc-hero-wash  { position:absolute; inset:0; background:linear-gradient(120deg,rgba(255,251,235,.90) 0%,rgba(224,242,254,.82) 55%,rgba(255,251,235,.90) 100%); }
  .tc-hero-dots  { position:absolute; inset:0; opacity:0.07; background-image:radial-gradient(circle at 1px 1px,#94a3b8 1px,transparent 0); background-size:40px 40px; }
  .tc-hero-burst { position:absolute; pointer-events:none; width:60vw; height:60vw; border-radius:50%; background:radial-gradient(circle,rgba(251,191,36,.24) 0%,rgba(251,191,36,.08) 40%,transparent 70%); top:-20%; left:-10%; }

  .tc-bread { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
  .tc-bread a { font-size:12.5px; color:#64748b; text-decoration:none; } .tc-bread a:hover { color:#f59e0b; }
  .tc-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.35); color:#b45309; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:5px 14px; border-radius:999px; margin-bottom:18px; }

  .tc-body { max-width:900px; margin:0 auto; padding:72px 28px 96px; }

  .tc-section { margin-bottom:52px; }
  .tc-section-header { display:flex; align-items:center; gap:12px; margin-bottom:18px; padding-bottom:14px; border-bottom:2px solid #fef3c7; }
  .tc-section-num { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#f59e0b,#ea580c); display:flex; align-items:center; justify-content:center; color:#fff; font-size:13px; font-weight:900; flex-shrink:0; box-shadow:0 4px 12px rgba(245,158,11,0.35); }
  .tc-section-icon { width:36px; height:36px; border-radius:10px; background:rgba(245,158,11,0.10); display:flex; align-items:center; justify-content:center; color:#f59e0b; flex-shrink:0; }
  .tc-section-title { font-size:18px; font-weight:800; color:#0f1117; }
  .tc-para { font-size:14.5px; color:#475569; line-height:1.85; margin-bottom:14px; white-space:pre-line; }
  .tc-para:last-child { margin-bottom:0; }

  .tc-toc { background:#fffbeb; border:1px solid rgba(245,158,11,0.22); border-radius:20px; padding:28px 32px; margin-bottom:52px; }
  .tc-toc-title { font-size:13px; font-weight:700; color:#b45309; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:16px; }
  .tc-toc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:8px; }
  .tc-toc-item { display:flex; align-items:center; gap:8px; font-size:13.5px; color:#334155; font-weight:500; padding:6px 0; }
  .tc-toc-dot { width:6px; height:6px; border-radius:50%; background:linear-gradient(135deg,#f59e0b,#ea580c); flex-shrink:0; }

  .tc-notice { background:linear-gradient(135deg,#f59e0b,#ea580c); border-radius:16px; padding:24px 28px; color:#fff; margin-bottom:52px; position:relative; overflow:hidden; }
  .tc-notice::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 0%,rgba(255,255,255,.18) 0%,transparent 60%); pointer-events:none; }
`;

const TermsAndConditions = () => {
  const secRefs = sections.map((_, i) => useFU(i * 60));
  const refToc  = useFU(0);

  return (
    <div className="tc-page">
      <style>{css}</style>

      {/* ── Hero ── */}
      <section className="tc-hero">
        <img src={heroBg} alt="" className="tc-hero-photo" aria-hidden="true"/>
        <div className="tc-hero-wash"/><div className="tc-hero-dots"/><div className="tc-hero-burst"/>
        <div style={{ position:"relative", maxWidth:1280, margin:"0 auto", padding:"60px 28px", width:"100%" }}>
          <div className="tc-bread">
            <Link to="/">Home</Link><ChevronRight size={12} style={{ color:"#cbd5e1" }}/>
            <span style={{ fontSize:12.5, color:"#334155", fontWeight:500 }}>Terms & Conditions</span>
          </div>
          <div className="tc-badge"><Scale size={11}/> Legal</div>
          <h1 style={{ fontSize:"clamp(28px,4.5vw,52px)", fontWeight:900, color:"#1e293b", lineHeight:1.05, marginBottom:12 }}>
            Terms &amp;{" "}
            <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Conditions
            </span>
          </h1>
          <p style={{ fontSize:15, color:"#475569", maxWidth:520 }}>
            Please read these Terms and Conditions carefully before using our website or engaging our services.
          </p>
          <div style={{ marginTop:16, display:"inline-flex", alignItems:"center", gap:8, background:"rgba(245,158,11,0.10)", border:"1px solid rgba(245,158,11,0.28)", borderRadius:10, padding:"8px 14px", fontSize:13, color:"#b45309", fontWeight:600 }}>
            <FileText size={13}/> Effective Date: {EFFECTIVE_DATE}
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="tc-body">

        {/* Important notice */}
        <div className="tc-notice">
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontSize:12, fontWeight:700, opacity:0.80, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Important Notice</div>
            <p style={{ fontSize:14.5, lineHeight:1.75, opacity:0.95, margin:0 }}>
              These Terms and Conditions govern your relationship with {COMPANY}. By using our website or services you confirm that you have read, understood and agree to be bound by these Terms. If you are accepting these Terms on behalf of an organisation, you represent that you have authority to bind that organisation.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div ref={refToc} className="tc-toc fu">
          <div className="tc-toc-title">Table of Contents</div>
          <div className="tc-toc-grid">
            {sections.map(s=>(
              <div key={s.id} className="tc-toc-item">
                <span className="tc-toc-dot"/>
                {s.id}. {s.title}
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        {sections.map((s, i) => (
          <div key={s.id} ref={secRefs[i]} className="tc-section fu">
            <div className="tc-section-header">
              <div className="tc-section-num">{s.id}</div>
              <div className="tc-section-icon">{s.icon}</div>
              <h2 className="tc-section-title">{s.title}</h2>
            </div>
            {s.content.map((p, j) => (
              <p key={j} className="tc-para">{p}</p>
            ))}
          </div>
        ))}

        {/* Footer note */}
        <div style={{ borderTop:"1px solid #eef0f4", paddingTop:32, textAlign:"center" }}>
          <p style={{ fontSize:13, color:"#94a3b8", marginBottom:12 }}>
            {/* Last updated: {EFFECTIVE_DATE} · {COMPANY} · CIN: [U74999MH2020PTC000000] */}
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/privacy-policy" style={{ fontSize:13.5, fontWeight:600, color:"#b45309", textDecoration:"none" }}>Privacy Policy →</Link>
            <Link to="/contact"        style={{ fontSize:13.5, fontWeight:600, color:"#b45309", textDecoration:"none" }}>Contact Us →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
