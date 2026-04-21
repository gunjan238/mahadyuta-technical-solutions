// import { Link } from "react-router-dom";
// import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
// import logo from "@/assets/logo.png";

// // LinkedIn SVG icon component
// const LinkedInIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className="shrink-0"
//   >
//     <rect width="24" height="24" rx="4" fill="#0077B5" />
//     <path
//       d="M8 10H5.5v8H8v-8zm-1.25-1.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM18.5 18H16v-4c0-1-.5-1.5-1.25-1.5S13.5 13 13.5 14v4H11v-8h2.5v1c.5-.75 1.25-1.25 2.25-1.25C17.5 9.75 18.5 11 18.5 13v5z"
//       fill="white"
//     />
//   </svg>
// );

// const Footer = () => (
//   <footer
//     className="relative overflow-hidden"
//     style={{
//       background: "linear-gradient(135deg, #fffbeb 0%, #fff7ed 40%, #f0f9ff 100%)",
//     }}
//   >
//     {/* Subtle warm dot grid */}
//     <div
//       className="absolute inset-0 opacity-[0.07]"
//       style={{
//         backgroundImage:
//           "radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)",
//         backgroundSize: "40px 40px",
//       }}
//     />

//     {/* Ambient sunburst glow — top left */}
//     <div
//       className="absolute top-0 left-0 w-[50vw] h-[50vw] pointer-events-none"
//       style={{
//         background:
//           "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 65%)",
//         borderRadius: "50%",
//         transform: "translate(-25%, -25%)",
//       }}
//     />

//     {/* Top accent border */}
//     <div
//       className="absolute top-0 left-0 right-0 h-[3px]"
//       style={{
//         background: "linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #fbbf24 100%)",
//       }}
//     />

//     <div className="relative container-narrow section-padding pb-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

//         {/* ── Brand ── */}
//         <div className="lg:col-span-1">
//           {/*
//             LOGO FIX: Ensure you export/save your logo as a PNG with a
//             transparent background (no white fill). In most design tools:
//               - Figma: File → Export → PNG (toggle off background)
//               - Illustrator: File → Export for Screens → PNG, uncheck "White Background"
//               - Photoshop: File → Export → Export As → PNG, ensure no background layer
//             The `mix-blend-mode: multiply` below also helps on light backgrounds
//             if a fully transparent export isn't immediately available.
//           */}
//           <img
//             src={logo}
//             alt="Mahadyuta"
//             className="h-10 w-auto mb-5"
//             style={{ mixBlendMode: "multiply" }} // removes white bg on light backgrounds
//           />
//           <p className="text-sm text-slate-500 leading-relaxed">
//             We add value by improving the reliability of industrial machinery and
//             equipment with our unique, cost effective &amp; advanced technical products
//             and services.
//           </p>
//         </div>

//         {/* ── Quick Links ── */}
//         <div>
//           <h3
//             className="font-heading font-semibold text-sm uppercase tracking-wider mb-5"
//             style={{ color: "#b45309" }}
//           >
//             Quick Links
//           </h3>
//           <ul className="space-y-2.5">
//             {["Home", "About", "Services", "Products", "Gallery", "Contact"].map((l) => (
//               <li key={l}>
//                 <Link
//                   to={`/${l === "Home" ? "" : l.toLowerCase()}`}
//                   className="text-sm text-slate-500 inline-flex items-center gap-1 group transition-colors hover:text-amber-600"
//                 >
//                   {l}
//                   <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* ── Services ── */}
//         <div>
//           <h3
//             className="font-heading font-semibold text-sm uppercase tracking-wider mb-5"
//             style={{ color: "#b45309" }}
//           >
//             Services
//           </h3>
//           <ul className="space-y-2.5">
//             {[
//               "Energy Optimization",
//               "Predictive Analytics",
//               "IIoT-Based CBM",
//               "Training & Certification",
//               "Condition Monitoring",
//             ].map((s) => (
//               <li key={s} className="text-sm text-slate-500">
//                 {s}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* ── Contact ── */}
//         <div>
//           <h3
//             className="font-heading font-semibold text-sm uppercase tracking-wider mb-5"
//             style={{ color: "#b45309" }}
//           >
//             Contact Us
//           </h3>
//           <ul className="space-y-4">

//             {/* Address */}
//             <li className="flex items-start gap-3 text-sm text-slate-500">
//               <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber-500" />
//               <span className="leading-relaxed">
//                 #B-429, Silver Springs, Taloja MIDC Road,<br />
//                 M.I.D.C. Taloja, Taluka: Panvel,<br />
//                 Navi Mumbai, Maharashtra – 410 208
//               </span>
//             </li>

//             {/* Office phones */}
//             <li className="flex items-start gap-3 text-sm text-slate-500">
//               <Phone className="h-4 w-4 mt-0.5 shrink-0 text-amber-500" />
//               <span className="space-y-0.5">
//                 <span className="block font-medium text-slate-600">Office</span>
//                 <a href="tel:+918976684258" className="block hover:text-amber-600 transition-colors">
//                   (+91) 8976684258
//                 </a>
//                 <a href="tel:02248018922" className="block hover:text-amber-600 transition-colors">
//                   022 48018922
//                 </a>
//               </span>
//             </li>

//             {/* Regional offices */}
//             <li className="flex items-start gap-3 text-sm text-slate-500">
//               <Phone className="h-4 w-4 mt-0.5 shrink-0 text-amber-500" />
//               <span className="space-y-0.5">
//                 <span className="block font-medium text-slate-600">Regional</span>
//                 <span className="flex items-center gap-1.5">
//                   <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">VZG</span>
//                   <a href="tel:+918179476459" className="hover:text-amber-600 transition-colors">
//                     +91 8179476459
//                   </a>
//                 </span>
//                 <span className="flex items-center gap-1.5">
//                   <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">KL</span>
//                   <a href="tel:+919618647755" className="hover:text-amber-600 transition-colors">
//                     +91 9618647755
//                   </a>
//                 </span>
//               </span>
//             </li>

//             {/* Email */}
//             <li className="flex items-center gap-3 text-sm text-slate-500">
//               <Mail className="h-4 w-4 shrink-0 text-amber-500" />
//               <a
//                 href="mailto:info@mahadyuta.com"
//                 className="hover:text-amber-600 transition-colors"
//               >
//                 info@mahadyuta.com
//               </a>
//             </li>

//             {/* LinkedIn — MTSPL */}
//             <li className="flex items-start gap-3 text-sm text-slate-500">
//               <LinkedInIcon />
//               <span className="space-y-0.5">
//                 <span className="block font-medium text-slate-600">LinkedIn</span>
//                 <a
//                   href="https://www.linkedin.com/company/mahadyuta-technical-solutions/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block hover:text-[#0077B5] transition-colors"
//                 >
//                   MTSPL – Mahadyuta Technical Solutions
//                 </a>
//                 {/* ── LinkedIn — MCEIR ── */}
//                 <a
//                   href="https://www.linkedin.com/company/mahadyuta-center-of-excellence-for-industrial-reliability/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block hover:text-[#0077B5] transition-colors"
//                 >
//                   MCEIR – Centre of Excellence
//                 </a>
//               </span>
//             </li>

//           </ul>
//         </div>
//       </div>

//       {/* ── Bottom bar ── */}
//       <div
//         className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
//         style={{ borderColor: "rgba(251,191,36,0.25)" }}
//       >
//         <p className="text-xs text-slate-400 text-center md:text-left">
//           © {new Date().getFullYear()} Mahadyuta Technical Solutions Pvt. Ltd. All rights reserved.
//           <br className="md:hidden" />
//           <span className="block md:inline md:ml-20">
//             © Designed &amp; Developed by{" "}
//             <span className="text-amber-600 font-medium hover:underline cursor-pointer">
//               Snapit
//             </span>
//           </span>
//         </p>

//         <div className="flex gap-4 text-xs text-slate-400">
//           <span className="cursor-pointer hover:text-amber-600 transition-colors">
//             Privacy Policy
//           </span>
//           <span className="cursor-pointer hover:text-amber-600 transition-colors">
//             Terms of Service
//           </span>
//         </div>
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;




import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.png";

const LinkedInIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <rect width="24" height="24" rx="4" fill="#0077B5" />
    <path
      d="M8 10H5.5v8H8v-8zm-1.25-1.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM18.5 18H16v-4c0-1-.5-1.5-1.25-1.5S13.5 13 13.5 14v4H11v-8h2.5v1c.5-.75 1.25-1.25 2.25-1.25C17.5 9.75 18.5 11 18.5 13v5z"
      fill="white"
    />
  </svg>
);

/* Reusable contact row — icon pinned to top, content beside it */
const ContactRow = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <li className="flex items-start gap-3">
    {/* Icon wrapper: fixed width + top-aligned so it sits level with the first line of text */}
    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-[2px]">
      {icon}
    </span>
    <div className="text-sm text-slate-500 leading-relaxed">{children}</div>
  </li>
);

const Footer = () => (
  <footer
    className="relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #fffbeb 0%, #fff7ed 40%, #f0f9ff 100%)",
    }}
  >
    {/* Subtle warm dot grid */}
    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    />

    {/* Ambient sunburst glow — top left */}
    <div
      className="absolute top-0 left-0 w-[50vw] h-[50vw] pointer-events-none"
      style={{
        background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 65%)",
        borderRadius: "50%",
        transform: "translate(-25%, -25%)",
      }}
    />

    {/* Top accent border */}
    <div
      className="absolute top-0 left-0 right-0 h-[3px]"
      style={{
        background: "linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #fbbf24 100%)",
      }}
    />

    <div className="relative container-narrow section-padding pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* ── Brand ── */}
        <div className="lg:col-span-1">
          <img
            src={logo}
            alt="Mahadyuta"
            className="h-10 w-auto mb-5"
            style={{ mixBlendMode: "multiply" }}
          />
          <p className="text-sm text-slate-500 leading-relaxed">
            We add value by improving the reliability of industrial machinery and
            equipment with our unique, cost effective &amp; advanced technical products
            and services.
          </p>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <h3
            className="font-heading font-semibold text-sm uppercase tracking-wider mb-5"
            style={{ color: "#b45309" }}
          >
            Quick Links
          </h3>
          <ul className="space-y-2.5">
            {["Home", "About", "Services", "Products", "Gallery", "Contact"].map((l) => (
              <li key={l}>
                <Link
                  to={`/${l === "Home" ? "" : l.toLowerCase()}`}
                  className="text-sm text-slate-500 inline-flex items-center gap-1 group transition-colors hover:text-amber-600"
                >
                  {l}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Services ── */}
        <div>
          <h3
            className="font-heading font-semibold text-sm uppercase tracking-wider mb-5"
            style={{ color: "#b45309" }}
          >
            Services
          </h3>
          <ul className="space-y-2.5">
            {[
              "Energy Optimization",
              "Predictive Analytics",
              "IIoT-Based CBM",
              "Training & Certification",
              "Condition Monitoring",
            ].map((s) => (
              <li key={s} className="text-sm text-slate-500">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact ── */}
        <div>
          <h3
            className="font-heading font-semibold text-sm uppercase tracking-wider mb-5"
            style={{ color: "#b45309" }}
          >
            Contact Us
          </h3>

          <ul className="space-y-4">

            {/* Address */}
            <ContactRow icon={<MapPin className="h-4 w-4 text-amber-500" />}>
              #B-429, Silver Springs,<br /> Taloja MIDC Road,<br />
              M.I.D.C. Taloja, Taluka: Panvel,<br />
              Navi Mumbai,<br /> Maharashtra – 410 208
            </ContactRow>

            {/* Office phones */}
            <ContactRow icon={<Phone className="h-4 w-4 text-amber-500" />}>
              <span className="block font-medium text-slate-600 mb-0.5">Office</span>
              <a href="tel:+918976684258" className="block hover:text-amber-600 transition-colors">
                (+91) 8976684258
              </a>
              <a href="tel:02248018922" className="block hover:text-amber-600 transition-colors">
                022 48018922
              </a>
            </ContactRow>

            {/* Regional offices */}
            <ContactRow icon={<Phone className="h-4 w-4 text-amber-500" />}>
              <span className="block font-medium text-slate-600 mb-0.5">Regional</span>
              <span className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium leading-none">
                  VZG
                </span>
                <a href="tel:+918179476459" className="hover:text-amber-600 transition-colors">
                  +91 8179476459
                </a>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium leading-none">
                  KL
                </span>
                <a href="tel:+919618647755" className="hover:text-amber-600 transition-colors">
                  +91 9618647755
                </a>
              </span>
            </ContactRow>

            {/* Email */}
            <ContactRow icon={<Mail className="h-4 w-4 text-amber-500" />}>
              <a
                href="mailto:info@mahadyuta.com"
                className="hover:text-amber-600 transition-colors"
              >
                info@mahadyuta.com
              </a>
            </ContactRow>

            {/* LinkedIn */}
            <ContactRow icon={<LinkedInIcon />}>
              <span className="block font-medium text-slate-600 mb-0.5">LinkedIn</span>
              <a
                href="https://www.linkedin.com/company/mahadyuta-technical-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#0077B5] transition-colors"
              >
                MTSPL – Mahadyuta Technical Solutions
              </a>
              <a
                href="https://www.linkedin.com/company/mahadyuta-center-of-excellence-for-industrial-reliability/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#0077B5] transition-colors"
              >
                MCEIR – Centre of Excellence
              </a>
            </ContactRow>

          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderColor: "rgba(251,191,36,0.25)" }}
      >
        <p className="text-xs text-slate-400 text-center md:text-left">
          © {new Date().getFullYear()} Mahadyuta Technical Solutions Pvt. Ltd. All rights reserved.
          <br className="md:hidden" />
          <span className="block md:inline md:ml-20">
            © Designed &amp; Developed by{" "}
            <span className="text-amber-600 font-medium hover:underline cursor-pointer">
              Snapit
            </span>
          </span>
        </p>

        <div className="flex gap-4 text-xs text-slate-400">
          <span className="cursor-pointer hover:text-amber-600 transition-colors">
            Privacy Policy
          </span>
          <span className="cursor-pointer hover:text-amber-600 transition-colors">
            Terms of Service
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;