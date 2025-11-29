// app/api/rdv/route.js
import dbConnect from "@/db";
import Rdv from "@/models/calendar";
import nodemailer from "nodemailer";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const future = searchParams.get("future");

  let query = {};
  if (future === "true") query.date = { $gte: new Date() };

  const rdvs = await Rdv.find(query).sort({ date: 1 });
  return new Response(JSON.stringify(rdvs), { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  const { name, email, phone, service, date } = await req.json();

  if (!name || !email || !phone || !service || !date) {
    return new Response(JSON.stringify({ message: "Champs manquants." }), { status: 400 });
  }

  const rdvDate = new Date(date);

  // Vérifier si le créneau est déjà pris
  const existing = await Rdv.findOne({ date: rdvDate });
  if (existing) {
    return new Response(JSON.stringify({ message: "Ce créneau est déjà réservé." }), { status: 400 });
  }

  // Enregistrer le rendez-vous
  const newRdv = await Rdv.create({ name, email, phone, service, date: rdvDate });

  try {
    // Config Nodemailer pour Brevo / Sendinblue
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,       // smtp-relay.brevo.com
      port: Number(process.env.SMTP_PORT), 
      secure: process.env.SMTP_SECURE === "true", // false pour 587
      auth: {
        user: process.env.SMTP_USER,     // ta clé API Brevo
        pass: process.env.SMTP_PASS      // la même clé API Brevo
      },
    });

    // Email au client
    await transporter.sendMail({
      from: process.env.SMTP_FROM,       // "Support Codev <support@code-v.fr>"
      to: email,
      subject: "Confirmation de votre rendez-vous",
      text: `Bonjour ${name},

Votre rendez-vous pour "${service}" est confirmé.

📅 Date : ${rdvDate.toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" })}

Merci !`,
    });

    // Email admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: "Nouveau rendez-vous réservé",
      text: `Nouveau rendez-vous :

Nom : ${name}
Email : ${email}
Téléphone : ${phone}
Service : ${service}
Date : ${rdvDate.toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" })}`,
    });

  } catch (err) {
    console.error("Erreur email:", err);
  }

  return new Response(JSON.stringify(newRdv), { status: 201 });
}

