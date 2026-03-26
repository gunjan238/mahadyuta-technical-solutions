


import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

import mh1 from "@/assets/mh1.jpeg";
import g1 from "@/assets/gallery1.jpg";
import g2 from "@/assets/gallery2.jpg";
import g3 from "@/assets/gallery3.jpg";
import g4 from "@/assets/gallery4.jpg";
import g5 from "@/assets/gallery5.jpg";
import g6 from "@/assets/gallery6.jpg";
import g7 from "@/assets/gallery7.jpg";
import g8 from "@/assets/gallery8.jpg";

const galleryImages = [
  { src: mh1 },
  { src: g1 },
  { src: g2 },
  { src: g3 },
  { src: g4 },
  { src: g5 },
  { src: g6 },
  { src: g7 },
  { src: g8 },
];

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const css = `
  .gl-page * { box-sizing: border-box; }

  /* ── Hero ── */
  .gl-hero {
    position: relative; overflow: hidden;
    min-height: 42vh; display: flex; align-items: center;
  }
  .gl-hero-photo {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; filter: brightness(0.62); pointer-events: none;
  }
  .gl-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(120deg,
      rgba(255,251,235,0.90) 0%,
      rgba(224,242,254,0.82) 55%,
      rgba(255,251,235,0.90) 100%);
  }
  .gl-hero-dots {
    position: absolute; inset: 0; opacity: 0.07;
    background-image: radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0);
    background-size: 40px 40px;
  }
  .gl-hero-burst {
    position: absolute; pointer-events: none;
    width: 65vw; height: 65vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.24) 0%, rgba(251,191,36,0.08) 40%, transparent 70%);
    top: -15%; left: -8%;
  }
  .gl-hero-sky {
    position: absolute; pointer-events: none;
    width: 50vw; height: 50vw; border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%);
    bottom: -20%; right: -5%;
  }

  /* ── Gallery card ── */
  .gl-card {
    position: relative; overflow: hidden;
    border-radius: 16px; aspect-ratio: 4/3;
    background: #f1f5f9; border: 1px solid #eef0f4;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    cursor: pointer; width: 100%;
    transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s, border-color 0.2s;
    /* reset button styles */
    padding: 0; outline: none; font: inherit;
  }
  .gl-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 16px 40px rgba(0,0,0,0.14);
    border-color: rgba(245,158,11,0.30);
  }
  .gl-card img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.5s ease;
  }
  .gl-card:hover img { transform: scale(1.08); }

  .gl-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(15,17,23,0.55) 0%, transparent 55%);
    opacity: 0; transition: opacity 0.3s ease;
    display: flex; align-items: flex-end; padding: 14px 16px;
  }
  .gl-card:hover .gl-overlay { opacity: 1; }

  /* ── Lightbox ── */
  .gl-lightbox {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(10,12,20,0.94); backdrop-filter: blur(14px);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 20px;
  }

  .gl-lightbox-img-wrap {
    max-width: min(880px, 90vw);
    width: 100%;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.55);
    /* leave room for nav buttons on small screens */
    max-height: calc(100svh - 140px);
    display: flex; align-items: center; justify-content: center;
  }
  .gl-lightbox-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    border-radius: 18px;
    max-height: calc(100svh - 140px);
  }

  /* Nav buttons */
  .gl-lb-btn {
    position: fixed; top: 50%; transform: translateY(-50%);
    width: 48px; height: 48px; border-radius: 50%;
    background: rgba(255,255,255,0.10); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.18); color: #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background 0.15s, border-color 0.15s;
    z-index: 10000; padding: 0;
  }
  .gl-lb-btn:hover { background: rgba(245,158,11,0.30); border-color: rgba(245,158,11,0.55); }
  .gl-lb-btn.prev { left: 14px; }
  .gl-lb-btn.next { right: 14px; }
  @media(max-width:600px){
    .gl-lb-btn { width: 38px; height: 38px; }
    .gl-lb-btn.prev { left: 8px; }
    .gl-lb-btn.next { right: 8px; }
  }

  /* Close button */
  .gl-lb-close {
    position: fixed; top: 16px; right: 16px;
    width: 42px; height: 42px; border-radius: 50%;
    background: rgba(255,255,255,0.10); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.18); color: #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background 0.15s; z-index: 10000; padding: 0;
  }
  .gl-lb-close:hover { background: rgba(239,68,68,0.40); border-color: rgba(239,68,68,0.55); }

  /* Counter */
  .gl-lb-counter {
    font-size: 12px; font-weight: 600;
    color: rgba(255,255,255,0.45); letter-spacing: 0.08em;
    margin-top: 14px;
  }

  /* Dot indicator */
  .gl-dots { display: flex; gap: 6px; justify-content: center; margin-top: 10px; flex-wrap: wrap; max-width: 320px; }
  .gl-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.25); border: none; padding: 0; cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .gl-dot.active { background: #f59e0b; transform: scale(1.45); }
`;

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
const Gallery = () => {
  const [selected, setSelected] = useState(null);

  const filtered = galleryImages;

  const navigate = (dir) => {
    if (selected === null) return;
    setSelected((selected + dir + filtered.length) % filtered.length);
  };

  const onKey = (e) => {
    if (e.key === "ArrowLeft")  navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
    if (e.key === "Escape")     setSelected(null);
  };

  return (
    <div className="gl-page" onKeyDown={onKey} tabIndex={-1} style={{ outline:"none" }}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section className="gl-hero">
        <img src={heroBg} alt="" className="gl-hero-photo" aria-hidden="true" />
        <div className="gl-hero-wash" /><div className="gl-hero-dots" />
        <div className="gl-hero-burst" /><div className="gl-hero-sky" />

        <div style={{ position:"relative", maxWidth:1280, margin:"0 auto", padding:"64px 20px 56px", width:"100%" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:24 }}>
            <Link to="/" style={{ fontSize:12.5, color:"#64748b", textDecoration:"none" }}>Home</Link>
            <ChevronRight size={12} style={{ color:"#cbd5e1" }} />
            <span style={{ fontSize:12.5, color:"#334155", fontWeight:500 }}>Gallery</span>
          </div>

          <span style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(245,158,11,0.10)", border:"1px solid rgba(245,158,11,0.30)", color:"#b45309", fontSize:11, fontWeight:700, letterSpacing:"0.09em", textTransform:"uppercase", padding:"5px 14px", borderRadius:999, marginBottom:16 }}>
            <Images size={11} /> Portfolio
          </span>

          <h1 style={{ fontSize:"clamp(28px,4.5vw,52px)", fontWeight:800, color:"#1e293b", lineHeight:1.06, marginBottom:14 }}>
            Our{" "}
            <span style={{ background:"linear-gradient(90deg,#f59e0b 0%,#ea580c 60%,#f59e0b 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Gallery
            </span>
          </h1>
          <p style={{ fontSize:"clamp(14px,1.4vw,17px)", color:"#475569", lineHeight:1.75, maxWidth:520 }}>
            Explore our products, services and solutions deployed across industries.
          </p>
        </div>
      </section>

      {/* ── GALLERY GRID ── */}
      <section style={{ background:"linear-gradient(160deg,#fafaf9 0%,#f0f9ff 100%)", padding:"60px 20px 80px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:20 }}>
            {filtered.map((img, i) => (
              <button
                key={img.src}
                className="gl-card"
                onClick={() => setSelected(i)}
                aria-label={`Open image ${i + 1}`}
              >
                <img src={img.src} alt={`Gallery image ${i + 1}`} loading="lazy" />
                <div className="gl-overlay" />
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign:"center", padding:"60px 0", color:"#94a3b8" }}>
              No images in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {selected !== null && (
        <div
          className="gl-lightbox"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            className="gl-lb-close"
            onClick={(e) => { e.stopPropagation(); setSelected(null); }}
            aria-label="Close lightbox"
          >
            <X size={18} />
          </button>

          {/* Prev */}
          <button
            className="gl-lb-btn prev"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Image */}
          <div
            className="gl-lightbox-img-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[selected].src}
              alt={`Gallery image ${selected + 1}`}
            />
          </div>

          {/* Next */}
          <button
            className="gl-lb-btn next"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>

          {/* Counter + dots */}
          <div onClick={(e) => e.stopPropagation()} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div className="gl-lb-counter">
              {selected + 1} / {filtered.length}
            </div>
            <div className="gl-dots">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  className={`gl-dot ${i === selected ? "active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;