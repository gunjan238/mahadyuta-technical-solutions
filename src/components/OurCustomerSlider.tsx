/**
 * OurCustomersSlider
 * ──────────────────
 * All logos are imported as ES modules (same pattern as SlidingProducts).
 * Vite fingerprints + bundles them at build time, so they resolve correctly
 * on Vercel, Netlify, or any CDN — no public-folder path issues.
 *
 * Place all logo files in:  src/assets/
 *   3.png  5.png  7.png  9.png  10.png  11.png  14.png  15.png
 *   16.png 17.png 18.png 19.png 20.png  21.png  TataPower.png
 */

import { motion } from "framer-motion";

/* ── Direct ES-module imports — Vite handles hashing & bundling ── */
import logo3  from "@/assets/3.png";
import logo5  from "@/assets/5.png";
import logo7  from "@/assets/7.png";
import logo9  from "@/assets/9.png";
import logo10 from "@/assets/10.png";
import logo11 from "@/assets/11.png";
import logo14 from "@/assets/14.png";
import logo15 from "@/assets/15.png";
import logo16 from "@/assets/16.png";
import logo17 from "@/assets/17.png";
import logo18 from "@/assets/18.png";
import logo19 from "@/assets/19.png";
import logo20 from "@/assets/20.png";
import logo21 from "@/assets/21.png";
import logoTataPower from "@/assets/TataPower.png";

const logos: { src: string; alt: string }[] = [
  { src: logo3,         alt: "JSW Steel"        },
  { src: logo5,         alt: "Tata Motors"      },
  { src: logo7,         alt: "IFFCO"            },
  { src: logo9,         alt: "Mahindra"         },
  { src: logo10,        alt: "DCM Shriram"      },
  { src: logo11,        alt: "Ador Welding"     },
  { src: logo14,        alt: "IndianOil LNG"    },
  { src: logo15,        alt: "Oetiker"          },
  { src: logo16,        alt: "ERDA"             },
  { src: logo17,        alt: "MPPTCL"           },
  { src: logo18,        alt: "ACME"             },
  { src: logo19,        alt: "Alembic"          },
  { src: logo20,        alt: "Temple Packaging" },
  { src: logoTataPower, alt: "Tata Power"       },
  { src: logo21,        alt: "Sun Pharma"       },
];

/* Duplicate rows for a seamless infinite loop */
const row1 = [...logos, ...logos];
const row2 = [...logos].reverse().concat([...logos].reverse());

/* ── Keyframes injected once ── */
const KEYFRAMES = `
@keyframes scroll-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes scroll-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.cust-row-left  { animation: scroll-left  60s linear infinite; }
.cust-row-right { animation: scroll-right 76s linear infinite; }
.cust-row-left:hover,
.cust-row-right:hover { animation-play-state: paused; }
`;

const MASK =
  "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)";

/* ── Logo card ── */
const LogoCard = ({ src, alt }: { src: string; alt: string }) => (
  <div
    className="
      flex-shrink-0 mx-3
      flex items-center justify-center
      bg-white
      rounded-2xl
      border border-amber-100
      shadow-sm
      hover:shadow-md hover:-translate-y-1 hover:border-amber-300
      transition-all duration-300
      cursor-default
    "
    style={{ width: 152, height: 84, padding: "10px 18px" }}
  >
    <img
      src={src}
      alt={alt}
      className="max-h-full max-w-full object-contain select-none"
      draggable={false}
      loading="lazy"
    />
  </div>
);

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

/* ── Component ── */
const OurCustomersSlider = () => (
  <section
    className="py-16 overflow-hidden"
    style={{ background: "linear-gradient(160deg, #fffbeb 0%, #f0f9ff 100%)" }}
  >
    <style>{KEYFRAMES}</style>

    {/* Heading */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="text-center mb-10 container-narrow px-4"
    >
      <span className="inline-block text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
        Trusted By
      </span>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-amber-700">
        Our Valued Customers
      </h2>
      <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto">
        Proudly serving industry leaders across power, pharma, steel,
        automotive, and process sectors.
      </p>
    </motion.div>

    {/* Row 1 — left */}
    <div
      className="relative mb-4"
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    >
      <div className="flex cust-row-left" style={{ width: "max-content" }}>
        {row1.map((logo, i) => (
          <LogoCard key={`r1-${i}`} src={logo.src} alt={logo.alt} />
        ))}
      </div>
    </div>

    {/* Row 2 — right */}
    <div
      className="relative"
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    >
      <div className="flex cust-row-right" style={{ width: "max-content" }}>
        {row2.map((logo, i) => (
          <LogoCard key={`r2-${i}`} src={logo.src} alt={logo.alt} />
        ))}
      </div>
    </div>
  </section>
);

export default OurCustomersSlider;