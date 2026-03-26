import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ChevronRight, CheckCircle2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { trainingCss, useFU } from "@/pages/trainingShared";

const skillPrograms = [
  { title: "Essence of Industrial Safety",                             desc: "Core safety principles and regulatory awareness for industrial environments." },
  { title: "Good Industrial Engineering Practices",                    desc: "Best practices for efficient, safe and reliable industrial operations." },
  { title: "Fundamentals of Engineering Maintenance",                  desc: "Maintenance types, KPIs, P–F curve and asset lifecycle management." },
  { title: "Introduction to Condition Monitoring Technologies",        desc: "Overview of all key technologies for industrial reliability." },
  { title: "Basics of Vibration Analysis Technology",                  desc: "Frequency, amplitude, time waveform, fault detection and severity assessment." },
  { title: "Basics of Laser Alignment and Balancing Techniques",       desc: "Shaft alignment principles and dynamic balancing fundamentals." },
  { title: "Basics of Structure Borne Ultrasound Analysis",            desc: "Applications in bearing lubrication, leak detection and mechanical inspection." },
  { title: "Basics of Air Borne Ultrasound Analysis",                  desc: "Compressed air, gas and vacuum system leak detection fundamentals." },
  { title: "Basics of Acoustic Imaging Technology",                    desc: "Microphone array cameras for visualising leaks and partial discharge." },
  { title: "Basics of Infrared Thermal Analysis Technology",           desc: "Thermal imaging for electrical, mechanical and steam trap applications." },
  { title: "Basics of Oil Analysis Techniques / Methods",              desc: "Viscosity, contamination, wear debris and sampling best practices." },
  { title: "Introduction to Energy Saving & Management Techniques",    desc: "Energy audit principles, compressed air optimisation and loss quantification." },
  { title: "Basics of Industrial Endoscopy / Boroscopy Techniques",    desc: "Visual inspection inside machines, pipes, tubes and cavities." },
  { title: "Basics of Online Bearing Condition Monitoring",            desc: "Continuous monitoring strategies for critical rotating equipment." },
  { title: "Introduction to Chemical-Less Anti-Scaling Technology",    desc: "Non-chemical water treatment for heat exchangers and cooling systems." },
];

const SkillDevelopment = () => {
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
            <span style={{ fontSize:12.5, color:"#334155", fontWeight:500 }}>Skill Development Programs</span>
          </div>

          <div className="tr-badge"><BookOpen size={11} /> Skill Development</div>
          <h1 style={{ fontSize:"clamp(28px,4.5vw,52px)", fontWeight:800, color:"#1e293b", lineHeight:1.06, marginBottom:16 }}>
            Skill Development{" "}
            <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Programs
            </span>
          </h1>
          <p style={{ fontSize:"clamp(14px,1.4vw,17px)", color:"#475569", lineHeight:1.75, marginBottom:32, maxWidth:580 }}>
            15 comprehensive technology modules covering every dimension of industrial reliability — from safety fundamentals to advanced predictive maintenance.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Link to="/contact" className="tr-btn-primary">Enquire Now <ArrowRight size={16} /></Link>
            {/* <Link to="/training/one-day" className="tr-btn-ghost">1-Day Courses</Link> */}
          </div>
        </div>
      </section>

      {/* ── PROGRAM MODULES ── */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding:"80px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div ref={refHead} className="fu" style={{ textAlign:"center", marginBottom:52 }}>
            <div className="tr-badge" style={{ margin:"0 auto 12px" }}><BookOpen size={11} /> 15 Modules</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:700, color:"#0f1117" }}>What You Will Learn</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:520, margin:"12px auto 0" }}>
              Each module can be delivered as a standalone session or combined into a multi-day program.
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:16 }}>
            {skillPrograms.map((s, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const ref = useFU(i * 50);
              return (
                <div ref={ref} key={s.title} className="tr-app-card fu">
                  <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:"rgba(245,158,11,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                      <span style={{ fontSize:13, fontWeight:800, color:"#f59e0b" }}>{i + 1}</span>
                    </div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:4, lineHeight:1.3 }}>{s.title}</div>
                      <div style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{s.desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU RECEIVE ── */}
      <section style={{ background:"#fffbeb", padding:"72px 28px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center" }}>
          <div className="tr-badge" style={{ margin:"0 auto 16px" }}><CheckCircle2 size={11} /> Included</div>
          <h2 style={{ fontSize:"clamp(22px,3vw,30px)", fontWeight:700, color:"#0f1117", marginBottom:32 }}>Every Program Includes</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14 }}>
            {["Interactive classroom sessions", "Hands-on instrument practice", "Live demonstrations and case studies", "Q&A with experienced trainers", "Assessment and certificate distribution", "Access to the Centre of Excellence facility"].map((item) => (
              <div key={item} style={{ display:"flex", gap:10, alignItems:"center", padding:"14px 16px", background:"#fff", borderRadius:12, border:"1px solid #eef0f4", fontSize:14, color:"#334155", fontWeight:500 }}>
                <CheckCircle2 size={15} style={{ color:"#f59e0b", flexShrink:0 }} />{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default SkillDevelopment;
