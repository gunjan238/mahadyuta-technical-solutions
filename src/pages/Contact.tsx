// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Send } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// type FormState = {
//   name: string;
//   email: string;
//   phone: string;
//   company: string;
//   subject: string;
//   message: string;
// };

// const initialForm: FormState = {
//   name: "",
//   email: "",
//   phone: "",
//   company: "",
//   subject: "",
//   message: "",
// };

// const Contact = () => {
//   const { toast } = useToast();
//   const [form, setForm] = useState<FormState>(initialForm);
//   const [sending, setSending] = useState(false);

//   // ✅ Generic input handler
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Submit handler (Nodemailer backend)
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.message) {
//       toast({
//         title: "Missing Fields",
//         description: "Please fill all required fields.",
//       });
//       return;
//     }

//     setSending(true);

//     try {
//       const res = await fetch("http://localhost:5000/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         throw new Error("Failed");
//       }

//       toast({
//         title: "Enquiry Submitted ✓",
//         description: "We’ll contact you shortly.",
//       });

//       setForm(initialForm);

//     } catch (error) {
//       console.error(error);

//       toast({
//         title: "Error",
//         description: "Failed to send message. Please try again.",
//       });
//     }

//     setSending(false);
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: "50px auto" }}>
//       <h2 style={{ marginBottom: 20 }}>Contact Us</h2>

//       <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>

//         <Input
//           name="name"
//           placeholder="Full Name *"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />

//         <Input
//           name="email"
//           type="email"
//           placeholder="Email Address *"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         <Input
//           name="phone"
//           placeholder="Phone Number"
//           value={form.phone}
//           onChange={handleChange}
//         />

//         <Input
//           name="company"
//           placeholder="Company Name"
//           value={form.company}
//           onChange={handleChange}
//         />

//         <Input
//           name="subject"
//           placeholder="Subject"
//           value={form.subject}
//           onChange={handleChange}
//         />

//         <Textarea
//           name="message"
//           placeholder="Your Message *"
//           rows={5}
//           value={form.message}
//           onChange={handleChange}
//           required
//         />

//         <Button type="submit" disabled={sending}>
//           {sending ? "Sending..." : (
//             <>
//               <Send size={16} style={{ marginRight: 6 }} />
//               Submit Enquiry
//             </>
//           )}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Contact;



import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone, Mail, MapPin, Clock, Send,
  ChevronRight, MessageSquare, ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.jpg";

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
type FormState = {
  name: string; email: string; phone: string;
  company: string; subject: string; message: string;
};

const initialForm: FormState = {
  name: "", email: "", phone: "",
  company: "", subject: "", message: "",
};

/* ═══════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════ */
const css = `
  .ct-page * { box-sizing: border-box; }

  /* ── Hero ── */
  .ct-hero {
    position: relative; overflow: hidden;
    min-height: 46vh; display: flex; align-items: center;
  }
  .ct-hero-photo {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; filter: brightness(0.62); pointer-events: none;
  }
  .ct-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.90) 0%,
      rgba(224,242,254,0.82) 55%,
      rgba(255,251,235,0.90) 100%);
  }
  .ct-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .ct-hero-burst {
    position: absolute; pointer-events: none;
    width: 65vw; height: 65vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.24) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .ct-hero-sky {
    position: absolute; pointer-events: none;
    width: 50vw; height: 50vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%);
    bottom: -20%; right: -5%;
  }

  /* ── Form card ── */
  .ct-form-card {
    background: #fff; border: 1px solid #eef0f4;
    border-radius: 24px; padding: 40px 44px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.08);
    position: relative; overflow: hidden;
  }
  .ct-form-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, #f59e0b, #ea580c);
  }
  @media (max-width: 640px) { .ct-form-card { padding: 24px 20px; } }

  /* ── Input overrides ── */
  .ct-input {
    border-radius: 12px !important; border-color: #e2e8f0 !important;
    height: 46px !important; font-size: 14px !important;
    transition: border-color 0.15s, box-shadow 0.15s !important;
    background: #fafafa !important;
  }
  .ct-input:focus {
    border-color: #f59e0b !important;
    box-shadow: 0 0 0 3px rgba(245,158,11,0.12) !important;
    background: #fff !important;
  }
  .ct-textarea {
    border-radius: 12px !important; border-color: #e2e8f0 !important;
    font-size: 14px !important; resize: none !important;
    background: #fafafa !important;
    transition: border-color 0.15s, box-shadow 0.15s !important;
  }
  .ct-textarea:focus {
    border-color: #f59e0b !important;
    box-shadow: 0 0 0 3px rgba(245,158,11,0.12) !important;
    background: #fff !important;
  }

  /* ── Submit button ── */
  .ct-submit {
    background: linear-gradient(135deg, #f59e0b, #ea580c) !important;
    border: none !important; border-radius: 12px !important;
    font-size: 15px !important; font-weight: 700 !important;
    padding: 0 32px !important; height: 50px !important;
    box-shadow: 0 4px 20px rgba(245,158,11,0.35) !important;
    transition: transform 0.15s, box-shadow 0.2s !important;
    width: 100% !important; letter-spacing: 0.02em !important;
  }
  .ct-submit:hover:not(:disabled) {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 28px rgba(245,158,11,0.45) !important;
  }
  .ct-submit:disabled { opacity: 0.7 !important; cursor: not-allowed !important; }

  /* ── Info cards ── */
  .ct-info-card {
    display: flex; align-items: flex-start; gap: 14px;
    background: #fff; border: 1px solid #eef0f4; border-radius: 16px;
    padding: 16px 18px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.04);
    transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
  }
  .ct-info-card:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.09);
    border-color: rgba(245,158,11,0.30);
    transform: translateY(-2px);
  }
  .ct-info-icon {
    width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
    background: rgba(245,158,11,0.10);
    display: flex; align-items: center; justify-content: center; color: #f59e0b;
  }

  /* ── Regional badge ── */
  .ct-region-badge {
    display: inline-flex; align-items: center;
    background: rgba(245,158,11,0.10); border: 1px solid rgba(245,158,11,0.25);
    border-radius: 7px; padding: 3px 9px;
    font-size: 11px; font-weight: 700; color: #b45309;
    text-transform: uppercase; letter-spacing: 0.06em;
  }

  /* ── Map ── */
  .ct-map {
    border-radius: 20px; overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.10);
    border: 1px solid #eef0f4;
  }

  /* ── Field label ── */
  .ct-label {
    display: block; font-size: 11.5px; font-weight: 600;
    color: #64748b; text-transform: uppercase;
    letter-spacing: 0.07em; margin-bottom: 6px;
  }
  .ct-required { color: #f59e0b; margin-left: 2px; }

  /* ── Two-col layout ── */
  .ct-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 48px; align-items: start; }
  @media (max-width: 960px) { .ct-grid { grid-template-columns: 1fr; } }

  /* ── Row ── */
  .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 520px) { .ct-row { grid-template-columns: 1fr; } }

  /* ── CTA ── */
  .ct-cta { position: relative; overflow: hidden; background: linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ea580c 100%); }
  .ct-cta-burst { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.22) 0%, transparent 65%); top: -200px; right: -100px; pointer-events: none; }

  /* ── Success banner ── */
  .ct-success {
    display: flex; align-items: center; gap: 10px;
    background: #f0fdf4; border: 1px solid rgba(22,163,74,0.25);
    border-left: 4px solid #16a34a;
    border-radius: 12px; padding: 14px 16px; margin-bottom: 20px;
    font-size: 14px; font-weight: 500; color: #15803d;
  }
`;

/* ─── Static data ─── */
const contactDetails = [
  {
    icon: MapPin, label: "Head Office",
    lines: ["#B-429, Silver Springs, Taloja MIDC Road,", "M.I.D.C. Taloja, Taluka: Panvel,", "Navi Mumbai, Maharashtra – 410 208"],
  },
  {
    icon: Phone, label: "Office Phone",
    lines: ["(+91) 8976684258", "022 48018922"],
    links: ["tel:+918976684258", "tel:02248018922"],
  },
  {
    icon: Mail, label: "Email",
    lines: ["info@mahadyuta.com"],
    links: ["mailto:info@mahadyuta.com"],
  },
  {
    icon: Clock, label: "Working Hours",
    lines: ["Monday – Saturday", "9:00 AM – 6:00 PM IST"],
  },
];

const regionalOffices = [
  { region: "Visakhapatnam", phone: "+91 8179476459", tel: "tel:+918179476459" },
  { region: "Kerala", phone: "+91 9618647755", tel: "tel:+919618647755" },
];

/* ═══════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════ */
const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  /* Generic change handler — uses input `name` attribute */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* Submit — sends to Nodemailer backend */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!form.name || !form.email || !form.message) {
      toast({ title: "Missing Fields", description: "Please fill all required fields." });
      return;
    }

    setSending(true);

    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error("Failed");

      toast({ title: "Enquiry Submitted ✓", description: "We'll contact you shortly." });
      setForm(initialForm);
      setSuccess(true);

    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to send. Please try again." });
    }

    setSending(false);
  };

  return (
    <div className="ct-page">
      <style>{css}</style>

      {/* ════════════════ HERO ════════════════ */}
      <section className="ct-hero">
        <img src={heroBg} alt="" className="ct-hero-photo" aria-hidden="true" />
        <div className="ct-hero-wash" /><div className="ct-hero-dots" />
        <div className="ct-hero-burst" /><div className="ct-hero-sky" />

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "64px 28px 56px", width: "100%" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            <Link to="/" style={{ fontSize: 12.5, color: "#64748b", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
            <span style={{ fontSize: 12.5, color: "#334155", fontWeight: 500 }}>Contact</span>
          </div>

          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.30)", color: "#b45309", fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 999, marginBottom: 16 }}>
            <MessageSquare size={11} /> Get in Touch
          </span>

          <h1 style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 800, color: "#1e293b", lineHeight: 1.06, marginBottom: 14 }}>
            Let's Discuss Your{" "}
            <span style={{ background: "linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Requirements
            </span>
          </h1>
          <p style={{ fontSize: "clamp(14px,1.4vw,17px)", color: "#475569", lineHeight: 1.75, maxWidth: 520 }}>
            Need a site audit, product information, or a custom solution? Drop us a message and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* ════════════════ MAIN GRID ════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="ct-grid">

          {/* ── LEFT — Form ── */}
          <div className="ct-form-card">

            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f1117", marginBottom: 6 }}>
                Send Us a Message
              </h2>
              <p style={{ fontSize: 14, color: "#64748b" }}>
                Fill in the form below and our team will get back to you shortly.
              </p>
            </div>

            {/* Success banner */}
            {success && (
              <div className="ct-success">
                ✓ Your enquiry has been sent! We'll be in touch within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Row 1 — Name + Email */}
              <div className="ct-row" style={{ marginBottom: 16 }}>
                <div>
                  <label className="ct-label">Full Name <span className="ct-required">*</span></label>
                  <Input
                    name="name" className="ct-input"
                    placeholder="e.g. Rajan Sharma"
                    value={form.name} onChange={handleChange} required
                  />
                </div>
                <div>
                  <label className="ct-label">Email Address <span className="ct-required">*</span></label>
                  <Input
                    name="email" type="email" className="ct-input"
                    placeholder="you@company.com"
                    value={form.email} onChange={handleChange} required
                  />
                </div>
              </div>

              {/* Row 2 — Phone + Company */}
              <div className="ct-row" style={{ marginBottom: 16 }}>
                <div>
                  <label className="ct-label">Phone Number</label>
                  <Input
                    name="phone" className="ct-input"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone} onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="ct-label">Company Name</label>
                  <Input
                    name="company" className="ct-input"
                    placeholder="Your Organisation"
                    value={form.company} onChange={handleChange}
                  />
                </div>
              </div>

              {/* Subject */}
              <div style={{ marginBottom: 16 }}>
                <label className="ct-label">Subject</label>
                <Input
                  name="subject" className="ct-input"
                  placeholder="e.g. Compressed Air Audit Enquiry"
                  value={form.subject} onChange={handleChange}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: 28 }}>
                <label className="ct-label">Message <span className="ct-required">*</span></label>
                <Textarea
                  name="message" className="ct-textarea"
                  placeholder="Describe your requirement, site, or question…"
                  rows={5}
                  value={form.message} onChange={handleChange} required
                />
              </div>

              <Button type="submit" className="ct-submit" disabled={sending}>
                {sending
                  ? "Sending…"
                  : <><Send size={15} style={{ marginRight: 8 }} />Submit Enquiry</>
                }
              </Button>

              <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 12, textAlign: "center" }}>
                <span className="ct-required">*</span> Required fields. We never share your data.
              </p>
            </form>
          </div>

          {/* ── RIGHT — Info ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.22)", color: "#b45309", fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 999, marginBottom: 14 }}>
                <Phone size={11} /> Contact Details
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f1117", marginBottom: 4 }}>Reach Us Directly</h2>
              <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6 }}>
                Available Monday–Saturday, 9 AM–6 PM IST.
              </p>
            </div>

            {/* Detail cards */}
            {contactDetails.map((item) => (
              <div key={item.label} className="ct-info-card">
                <div className="ct-info-icon"><item.icon size={18} /></div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>
                    {item.label}
                  </p>
                  {item.lines.map((line, i) =>
                    item.links?.[i] ? (
                      <a key={line} href={item.links[i]}
                        style={{ display: "block", fontSize: 14, color: "#334155", textDecoration: "none", fontWeight: 500, lineHeight: 1.65, transition: "color 0.15s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#f59e0b")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#334155")}
                      >{line}</a>
                    ) : (
                      <p key={line} style={{ fontSize: 14, color: "#475569", lineHeight: 1.65, margin: 0 }}>{line}</p>
                    )
                  )}
                </div>
              </div>
            ))}

            {/* Regional offices */}
            <div style={{ background: "#fff", border: "1px solid #eef0f4", borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>
                Regional Offices
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {regionalOffices.map((r) => (
                  <div key={r.region} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <span className="ct-region-badge">{r.region}</span>
                    <a href={r.tel}
                      style={{ fontSize: 14, fontWeight: 600, color: "#334155", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#f59e0b")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#334155")}
                    >{r.phone}</a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════ MAP ════════════════ */}
      <section style={{ background: "#fffbeb", padding: "0 28px 72px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ paddingTop: 8, marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f1117", marginBottom: 6 }}>Visit Our Head Office
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>
              Mahadyuta Technical
              Solutions Pvt. Ltd.
              headquartered in the Taloja
              Industrial Area of Navi
              Mumbai.
            </p>
          </div>
          <div className="ct-map">
            <iframe
              title="Mahadyuta Technical Solutions Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.0!2d73.07!3d18.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU4JzEyLjAiTiA3M8KwMDQnMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%" height="380"
              style={{ display: "block", border: 0 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>


    </div>
  );
};

export default Contact;