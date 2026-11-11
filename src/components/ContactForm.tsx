"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Link from "next/link";
import styles from "./contactForm.module.css";
import { trackContactSuccess } from "@/lib/analytics";
import { elapsedField, projectOptions, submitContact, trapField } from "@/lib/contact-form";

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const shownAt = useRef(0);

  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const contact = String(formData.get("contact") ?? "").trim();
    const isEmail = contact.includes("@");

    const payload = {
      name: String(formData.get("name") ?? ""),
      company: "",
      email: isEmail ? contact : "",
      phone: isEmail ? "" : contact,
      project: String(formData.get("project") ?? ""),
      message: String(formData.get("message") ?? ""),
      service: new URLSearchParams(window.location.search).get("service") || "",
      source: window.location.pathname,
      [trapField]: String(formData.get(trapField) ?? ""),
      [elapsedField]: Math.max(0, Date.now() - shownAt.current),
    };

    try {
      await submitContact(
        payload,
        body => fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        }),
        trackContactSuccess,
      );

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  if (status === "success") {
    return <div className="form-success" role="status" aria-live="polite">
      <h3>Votre demande est bien partie.</h3>
      <p>Merci. CODE-V va prendre connaissance de votre besoin et revenir vers vous avec une réponse personnalisée.</p>
      <button className="button button-dark" type="button" onClick={() => { shownAt.current = Date.now(); setStatus("idle"); }}>
        Faire une autre demande
      </button>
    </div>;
  }

  return <form className={`contact-form ${styles.form} ${compact ? styles.compact : ""}`} onSubmit={handleSubmit} aria-busy={status === "sending"}>
    <label>
      Nom
      <input type="text" name="name" autoComplete="name" placeholder="Votre nom" required />
    </label>

    <label>
      Téléphone ou e-mail
      <input type="text" name="contact" autoComplete="email" inputMode="text" placeholder="06 12 34 56 78 ou vous@entreprise.fr" required aria-describedby="contact-help" />
      <small id="contact-help" className={styles.hint}>Choisissez simplement le moyen par lequel vous préférez être recontacté.</small>
    </label>

    <label>
      Votre besoin
      <select name="project" required defaultValue="">
        <option value="" disabled>Sélectionnez votre besoin</option>
        {projectOptions.map(option => <option key={option}>{option}</option>)}
      </select>
    </label>

    <label>
      Message <span className={styles.optional}>facultatif</span>
      <textarea name="message" rows={compact ? 3 : 4} placeholder="Quelques mots sur votre activité ou votre projet..." />
    </label>

    <div className={styles.trap} aria-hidden="true">
      <label>
        Référence
        <input type="text" name={trapField} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>

    <button className="button button-primary" type="submit" disabled={status === "sending"}>
      {status === "sending" ? "Envoi en cours..." : "Recevoir mon devis gratuit"} <span aria-hidden="true">↗</span>
    </button>

    <p className={styles.privacy}>Vos informations servent uniquement à répondre à votre demande. <Link href="/politique-confidentialite">Politique de confidentialité</Link>.</p>

    {status === "error" && <p className="form-error" role="alert">{errorMessage}</p>}
  </form>;
}
