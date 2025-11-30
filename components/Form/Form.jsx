"use client";
import { useState } from "react";
import styles from './form.module.css'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, phone, message } = formData;
    if (!name || !email || !phone || !message) return "Tous les champs sont requis.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Adresse email invalide.";
    const phoneRegex = /^[0-9+\s-]{7,15}$/;
    if (!phoneRegex.test(phone)) return "Numéro de téléphone invalide.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setError(data.message || "Erreur lors de l'envoi du message.");
      }
    } catch (err) {
      setLoading(false);
      setError("Erreur réseau, veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
      <p className={styles.p}> 
        Une question ? N'hésitez pas à nous écrire pour toute dermande. 
        Notre équipe se fera un plaisir de vous répondre dans les plus brefs délais.
      </p>
      <h2 className={styles.title}>Contactez-nous</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nom et prénom"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Téléphone"
          value={formData.phone}
          onChange={handleChange}
         className={styles.input}
        />
        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={styles.input}
        />
        {error && <p className="text-red-600 text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className={styles.submit}
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>
        {success && <p className="text-green-600 text-center mt-2">Message envoyé avec succès !</p>}
      </form>
    </div>
  );
}
