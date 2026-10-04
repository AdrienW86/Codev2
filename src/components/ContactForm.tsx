"use client";

import { useState, FormEvent } from "react";
import styles from "./contactForm.module.css";
import { trackContactSuccess } from "@/lib/analytics";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      company: (formData.get("company") as string) || "",
      email: formData.get("email") as string,
      project: (formData.get("project") as string) || "",
      message: formData.get("message") as string,
      service: new URLSearchParams(window.location.search).get("service") || "",
      source: window.location.pathname,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.success !== true) {
        throw new Error((data as { error?: string }).error || "Erreur lors de l'envoi.");
      }

      setStatus("success");
      trackContactSuccess(payload.service);
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  return (
    <>
      {status === "success" ? (
        <div className="form-success" role="status" aria-live="polite">
          <h3>Message envoyé !</h3>
          <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
          <button
            className="button button-dark"
            type="button"
            onClick={() => setStatus("idle")}
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form className={`contact-form ${styles.form}`} onSubmit={handleSubmit} aria-busy={status === "sending"}>
          <div className="form-row">
            <label>
              Nom
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Votre nom"
                required
              />
            </label>
            <label>
              Entreprise
              <input
                type="text"
                name="company"
                autoComplete="organization"
                placeholder="Le nom de votre entreprise"
              />
            </label>
          </div>

          <label>
            Adresse e-mail
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="vous@entreprise.fr"
              required
            />
          </label>

          <label>
            Type de projet
            <select name="project">
              <option value="">Sélectionnez une option</option>
              <option>Création ou refonte de site</option>
              <option>Référencement naturel</option>
              <option>Publicité en ligne</option>
              <option>Autre sujet</option>
            </select>
          </label>

          <label>
            Votre message
            <textarea
              name="message"
              rows={5}
              placeholder="Dites-nous quelques mots sur votre projet..."
              required
            />
          </label>

          <button
            className="button button-dark"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Envoi en cours..." : "Préparer ma demande"}{" "}
            <span aria-hidden="true">↗</span>
          </button>

          {status === "error" && (
            <p className="form-error" role="alert">{errorMessage}</p>
          )}
        </form>
      )}
    </>
  );
}
