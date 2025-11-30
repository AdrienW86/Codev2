"use client";
import { useState, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday } from "date-fns";
import { fr } from "date-fns/locale";
import styles from './calendar.module.css'

export default function RdvMonthCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [data, setData] = useState({ name: "", email: "", phone: "", service: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const services = ["Audit SEO", "Google Ads", "Social Ads", "Local Services"];
  const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  useEffect(() => {
    async function fetchRdv() {
      const res = await fetch("/api/rdv?future=true");
      const json = await res.json();
      setBookedSlots(json.map(r => new Date(r.date).toISOString().slice(0,16)));
    }
    fetchRdv();
  }, []);

  // Validation côté front pour sécuriser le formulaire
  const validate = () => {
    const { name, email, phone, service } = data;

    const nameRegex = /^[A-Za-zÀ-ÿ\s'-]{2,50}$/;
    if (!name || !nameRegex.test(name)) return "Nom invalide. Utilisez uniquement des lettres.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return "Email invalide.";

    const phoneRegex = /^[0-9+\s]{7,15}$/;
    if (!phone || !phoneRegex.test(phone)) return "Numéro de téléphone invalide.";

    if (!service) return "Veuillez choisir un service.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) return setError(validationError);

    if (!selectedDate || !selectedSlot) return setError("Veuillez sélectionner une date et un créneau.");

    setLoading(true);
    const dateTime = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedSlot}`);
    try {
      const res = await fetch("/api/rdv", {
        method: "POST",
        body: JSON.stringify({ ...data, date: dateTime }),
        headers: { "Content-Type": "application/json" },
      });
      setLoading(false);
      const resData = await res.json();
      if (res.ok) {
        setSuccess(true);
        setData({ name: "", email: "", phone: "", service: "" });
        setSelectedDate(null);
        setSelectedSlot("");
      } else {
        setError(resData.message || "Erreur lors de la réservation.");
      }
    } catch (err) {
      setLoading(false);
      setError("Erreur réseau, veuillez réessayer plus tard.");
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { locale: fr });
  const endDate = endOfWeek(monthEnd, { locale: fr });
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2 className={styles.title} style={{ textAlign: "center" }}>Réservez votre rendez-vous gratuit</h2>

      {/* Navigation mois */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <button onClick={prevMonth}>{"<"}</button>
        <h3 className={styles.h3}>{format(currentMonth, "MMMM yyyy", { locale: fr })}</h3>
        <button onClick={nextMonth}>{">"}</button>
      </div>

      {/* Jours de la semaine */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", fontWeight: "bold" }}>
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(d => <div key={d}>{d}</div>)}
      </div>

      {/* Calendrier */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
        {days.map(day => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isPast = day < new Date(new Date().setHours(0,0,0,0));
          const isDisabled = !isCurrentMonth || isPast;
          const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
          const isDayToday = isToday(day);

          return (
            <button
              key={day}
              disabled={isDisabled}
              onClick={() => setSelectedDate(day)}
              style={{
                padding: 10,
                borderRadius: 6,
                border: isSelected ? "2px solid #ff9800" : "1px solid #ccc",
                backgroundColor: isSelected ? "#ff9800" : isDayToday ? "#4caf50" : "#fff",
                color: isDisabled ? "#999" : isSelected || isDayToday ? "#fff" : "#333",
                cursor: isDisabled ? "not-allowed" : "pointer"
              }}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {/* Créneaux disponibles */}
      {selectedDate && (
        <div style={{ marginTop: 20 }}>
          <h4>Choisir un créneau horaire pour le {format(selectedDate, "EEEE dd/MM/yyyy", { locale: fr })}</h4>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {slots.map(slot => {
              const slotDate = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${slot}`);
              const isPastSlot = selectedDate.toDateString() === new Date().toDateString() && slotDate < new Date();
              const disabled = bookedSlots.includes(slotDate.toISOString().slice(0,16)) || isPastSlot;

              return (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  disabled={disabled}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: selectedSlot === slot ? "#ff9800" : disabled ? "#ccc" : "#eee",
                    color: disabled ? "#666" : "#333",
                    border: "none"
                  }}
                >
                  {slot} {disabled ? "(Indisponible)" : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Formulaire info client */}
      {selectedDate && selectedSlot && (
        <form onSubmit={handleSubmit} style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            placeholder="Nom"
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={data.phone}
            onChange={e => setData({ ...data, phone: e.target.value })}
            required
          />
          <select
            value={data.service}
            onChange={e => setData({ ...data, service: e.target.value })}
            required
          >
            <option value="">Choisir un service</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Réservation..." : "Confirmer le rendez-vous"}
          </button>

          {success && <p style={{ color: "green" }}>Rendez-vous réservé avec succès !</p>}
        </form>
      )}
    </div>
  );
}
