import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, phone, message } = data;

    // Validation serveur
    if (!name || !email || !phone || !message) {
      return new Response(JSON.stringify({ message: "Tous les champs sont requis." }), { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ message: "Adresse email invalide." }), { status: 400 });
    }
    const phoneRegex = /^[0-9+\s-]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return new Response(JSON.stringify({ message: "Numéro de téléphone invalide." }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Nouveau message de contact de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Message envoyé avec succès !" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Erreur lors de l'envoi du message." }), { status: 500 });
  }
}
