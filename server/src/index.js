import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

const PORT = Number(process.env.PORT || 8787);
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS"));
    },
  }),
);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false") === "true",
  auth:
    process.env.SMTP_USER && process.env.SMTP_PASS
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
});

function required(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function getNotifyTo() {
  return process.env.NOTIFY_TO || process.env.SMTP_USER;
}

function getFromEmail() {
  return process.env.FROM_EMAIL || process.env.SMTP_USER;
}

async function sendSubmissionEmail({ subject, body }) {
  const to = getNotifyTo();
  const from = getFromEmail();

  if (!to || !from) {
    throw new Error("Missing NOTIFY_TO/FROM_EMAIL (or SMTP_USER) configuration");
  }

  await transporter.sendMail({
    from,
    to,
    subject,
    text: body,
  });
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/waitlist", async (req, res) => {
  try {
    const { name, email, institution, role, country, source, challenge } = req.body || {};

    if (!required(email)) {
      res.status(400).json({ ok: false, error: "Email is required" });
      return;
    }

    const lines = [
      "New waitlist submission",
      "",
      `Name: ${name || "-"}`,
      `Email: ${email}`,
      `Institution: ${institution || "-"}`,
      `Role: ${role || "-"}`,
      `Country: ${country || "-"}`,
      `Source: ${source || "-"}`,
      `Challenge: ${challenge || "-"}`,
      "",
      `Submitted at: ${new Date().toISOString()}`,
    ];

    await sendSubmissionEmail({
      subject: "[AKEP] Waitlist submission",
      body: lines.join("\n"),
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("waitlist_error", error);
    res.status(500).json({ ok: false, error: "Failed to submit waitlist request" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, institution, subject, message } = req.body || {};

    if (!required(name) || !required(email)) {
      res.status(400).json({ ok: false, error: "Name and email are required" });
      return;
    }

    const lines = [
      "New contact/demo submission",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Institution: ${institution || "-"}`,
      `Subject: ${subject || "-"}`,
      `Message: ${message || "-"}`,
      "",
      `Submitted at: ${new Date().toISOString()}`,
    ];

    await sendSubmissionEmail({
      subject: "[AKEP] Contact request",
      body: lines.join("\n"),
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("contact_error", error);
    res.status(500).json({ ok: false, error: "Failed to send contact request" });
  }
});

app.listen(PORT, () => {
  console.log(`Email API listening on port ${PORT}`);
});