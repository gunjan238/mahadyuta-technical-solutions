// import express from "express";
// import nodemailer from "nodemailer";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Create transporter (Gmail)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,     // your gmail
//     pass: process.env.EMAIL_PASS,     // app password
//   },
// });

// // ✅ API route
// app.post("/send-email", async (req, res) => {
//   const { name, email, phone, company, subject, message } = req.body;

//   try {
//     await transporter.sendMail({
//       from: `"${name}" <${process.env.EMAIL_USER}>`,
//       to: "gunjankothari29@gmail.com",
//       subject: subject || "New Contact Enquiry",
//       replyTo: email,
//       html: `
//         <h3>New Contact Form Submission</h3>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone || "-"}</p>
//         <p><b>Company:</b> ${company || "-"}</p>
//         <p><b>Subject:</b> ${subject || "-"}</p>
//         <p><b>Message:</b><br/>${message}</p>
//       `,
//     });

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// });

// app.listen(5000, () => {
//   console.log("✅ Server running on http://localhost:5000");
// });



// server.js

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* =========================================================
   Middleware
========================================================= */
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://mahadyuta-technical-solutions.vercel.app/", // replace with actual Vercel domain
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

/* =========================================================
   Mail Transporter
========================================================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =========================================================
   API Route
========================================================= */
app.post("/send-email", async (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    subject,
    message,
  } = req.body;

  /* Required field validation */
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, Email and Message are required.",
    });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: "gunjankothari29@gmail.com",
      subject: subject || "New Contact Enquiry",
      replyTo: email,
      html: `
        <h3>New Contact Form Submission</h3>

        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "-"}</p>
        <p><b>Company:</b> ${company || "-"}</p>
        <p><b>Subject:</b> ${subject || "-"}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email Sending Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again.",
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