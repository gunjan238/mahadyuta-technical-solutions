

// // server.js

// import express from "express";
// import nodemailer from "nodemailer";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();

// /* =========================================================
//    Health Check Route
// ========================================================= */
// app.get("/", (req, res) => {
//   res.status(200).send("Backend Running Successfully");
// });

// /* =========================================================
//    CORS Configuration (Fixed for Vercel + Render)
// ========================================================= */
// const allowedOrigins = [
//   "http://localhost:8080",
//   "https://mahadyuta-technical-solutions.vercel.app",
//   "https://mahadyuta.com",
//   "https://www.mahadyuta.com",

// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (Postman, mobile apps, etc.)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         console.error("Blocked by CORS:", origin);
//         return callback(new Error("CORS not allowed"));
//       }
//     },
//     methods: ["GET", "POST", "OPTIONS"],
//     credentials: true,
//   })
// );

// /* Handle preflight requests */
// // app.options("*", cors());

// app.use(express.json());

// /* =========================================================
//    Mail Transporter (Hostinger SMTP)
// ========================================================= */
// const transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.com",
//   port: 465,
//   secure: true, // true for 465
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// /* =========================================================
//    Verify Mail Transporter
// ========================================================= */
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Mail Transporter Error:", error);
//   } else {
//     console.log("Mail Server Ready");
//   }
// });

// /* =========================================================
//    Contact Form API
// ========================================================= */
// app.post("/send-email", async (req, res) => {
//   console.log("Incoming Request Body:", req.body);

//   const {
//     name,
//     email,
//     phone,
//     company,
//     subject,
//     message,
//   } = req.body;

//   /* Required Field Validation */
//   if (!name || !email || !message) {
//     return res.status(400).json({
//       success: false,
//       message: "Name, Email and Message are required.",
//     });
//   }

//   try {
//     await transporter.sendMail({
//       from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       subject: subject || "New Contact Enquiry",
//       replyTo: email,
//       html: `
//         <h2>New Contact Form Submission</h2>

//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone || "-"}</p>
//         <p><strong>Company:</strong> ${company || "-"}</p>
//         <p><strong>Subject:</strong> ${subject || "-"}</p>
//         <p><strong>Message:</strong><br/>${message}</p>
//       `,
//     });

//     console.log("Email Sent Successfully");

//     return res.status(200).json({
//       success: true,
//       message: "Email sent successfully.",
//     });
//   } catch (error) {
//     console.error("Email Sending Error:", error);
//     console.error(
//       "FULL EMAIL ERROR:",
//       JSON.stringify(error, null, 2)
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         error.response?.message ||
//         error.message ||
//         "Failed to send email.",
//     });
//   }
// });

// /* =========================================================
//    Server Start
// ========================================================= */
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

/* =========================================================
Resend Configuration
========================================================= */
const resend = new Resend(process.env.RESEND_API_KEY);

console.log("RESEND KEY LOADED:", !!process.env.RESEND_API_KEY);
console.log("TO_EMAIL:", process.env.TO_EMAIL);

/* =========================================================
Health Check Route
========================================================= */
app.get("/", (req, res) => {
  res.status(200).send("Backend Running Successfully");
});

/* =========================================================
CORS Configuration
========================================================= */
const allowedOrigins = [
  "http://localhost:8080",
  "https://mahadyuta-technical-solutions.vercel.app",
  "https://mahadyuta.com",
  "https://www.mahadyuta.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman, curl, mobile apps
      if (!origin) {
        return callback(null, true);
      }


      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("Blocked by CORS:", origin);
      return callback(new Error("CORS not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,


  })
);

app.use(express.json());

/* =========================================================
Contact Form API
========================================================= */
app.post("/send-email", async (req, res) => {
  console.log("Incoming Request Body:", req.body);

  const {
    name,
    email,
    phone,
    company,
    subject,
    message,
  } = req.body;

  /* Validation */
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, Email and Message are required.",
    });
  }

  try {
    console.log("Attempting email send...");


    const { data, error } = await resend.emails.send({
      /*
        USE THIS IF DOMAIN IS VERIFIED
      */
      from: "Website Enquiry <info@mahadyuta.com>",

      /*
        IF DOMAIN IS NOT VERIFIED YET,
        COMMENT ABOVE LINE AND USE:
    
        from: "onboarding@resend.dev",
      */

      to: [process.env.TO_EMAIL],

      replyTo: email,

      subject: subject || "New Contact Enquiry",

      html: `
    <h2>New Contact Form Submission</h2>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "-"}</p>
    <p><strong>Company:</strong> ${company || "-"}</p>
    <p><strong>Subject:</strong> ${subject || "-"}</p>

    <hr />

    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
    });

    console.log("RESEND DATA:", data);
    console.log("RESEND ERROR:", error);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    console.log("Email Sent Successfully");

    return res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });


  } catch (error) {
    console.error("SERVER ERROR:", error);


    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to send email.",
    });


  }
});

/* =========================================================
Server Start
========================================================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
