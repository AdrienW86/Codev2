"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./robotAssistant.module.css";
import { chatIntents, chatOpenEvent, defaultWelcome, isChatIntent, type ChatIntent } from "./chat";

type Expression = "happy" | "neutral" | "thinking" | "surprised" | "waving";
type Message = { role: "user" | "assistant"; content: string };
type Thread = ChatIntent | "general";
const welcome = (thread: Thread): Message => ({ role: "assistant", content: thread === "general" ? defaultWelcome : chatIntents[thread].welcome });

export default function RobotAssistant() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [expression, setExpression] = useState<Expression>("happy");
  const [isTyping, setIsTyping] = useState(false);
  const [thread, setThread] = useState<Thread>("general");
  const [conversations, setConversations] = useState<Partial<Record<Thread, Message[]>>>({ general: [welcome("general")] });
  const activeThread = useRef<Thread>("general");
  const request = useRef<AbortController | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const messages = conversations[thread] ?? [welcome(thread)];

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const intent = (event as CustomEvent<{ intent?: unknown }>).detail?.intent;
      if (intent !== undefined && !isChatIntent(intent)) return;
      const nextThread: Thread = intent ?? "general";
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (activeThread.current !== nextThread) {
        request.current?.abort();
        request.current = null;
        setIsTyping(false);
        setMessage("");
        activeThread.current = nextThread;
        setThread(nextThread);
        setConversations(previous => previous[nextThread] ? previous : { ...previous, [nextThread]: [welcome(nextThread)] });
      }
      setExpression("happy");
      setIsVisible(true);
      setIsOpen(true);
      // Also focus when the already-open assistant receives the same intent.
      requestAnimationFrame(() => input.current?.focus({ preventScroll: true }));
    };
    window.addEventListener(chatOpenEvent, handleOpen);
    return () => { window.removeEventListener(chatOpenEvent, handleOpen); request.current?.abort(); };
  }, []);

  useEffect(() => {
    if (isOpen && isVisible) input.current?.focus({ preventScroll: true });
  }, [isOpen, isVisible, thread]);

  useEffect(() => {
    if (content.current) content.current.scrollTop = content.current.scrollHeight;
  }, [conversations, isTyping, isOpen]);

  const closeChat = () => {
    setIsOpen(false);
    opener.current?.focus({ preventScroll: true });
  };

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim() || request.current) return;
    const userMessage = message.trim();
    const requestThread = thread;
    const controller = new AbortController();
    request.current = controller;
    setMessage("");
    setConversations(previous => ({ ...previous, [requestThread]: [...(previous[requestThread] ?? [welcome(requestThread)]), { role: "user", content: userMessage }] }));
    setIsTyping(true);
    setExpression("thinking");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, ...(requestThread !== "general" ? { intent: requestThread } : {}), history: messages.slice(-20) }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error("Erreur réseau");
      const data = await res.json();
      if (typeof data.reply !== "string") throw new Error("Réponse invalide");
      if (request.current !== controller) return;
      setConversations(previous => ({ ...previous, [requestThread]: [...(previous[requestThread] ?? []), { role: "assistant", content: data.reply }] }));
      setExpression("happy");
    } catch {
      if (controller.signal.aborted || request.current !== controller) return;
      setConversations(previous => ({ ...previous, [requestThread]: [...(previous[requestThread] ?? []), { role: "assistant", content: "Désolé, je n’arrive pas à répondre pour le moment. Vous pouvez réessayer dans un instant." }] }));
      setExpression("surprised");
    } finally {
      if (request.current === controller) { request.current = null; setIsTyping(false); }
    }
  }

  const handleRobotClick = () => {
    if (isOpen) closeChat();
    else {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setIsOpen(true);
      setExpression("waving");
    }
  };

  if (!isVisible) return <button className={styles["show-cody-button"]} onClick={() => setIsVisible(true)} aria-label="Afficher l’assistant" title="Afficher l’assistant"><img src="/brand/code-v-robot.svg" width="875" height="660" alt="" /></button>;

  return <div className={styles["robot-widget"]}>
    {isOpen && <div id="codev-chat" role="dialog" aria-labelledby="codev-chat-title" className={styles["robot-chat"]} onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); closeChat(); } }}>
      <div className={styles["robot-chat-header"]}><div><img src="/brand/code-v-robot.svg" width="40" height="40" alt="" /><strong id="codev-chat-title">Assistant CODE-V</strong><span>{thread === "general" ? "Assistant CODE-V" : chatIntents[thread].label}</span></div><button className={styles["close-button"]} onClick={closeChat} aria-label="Fermer le chat">×</button></div>
      <div ref={content} role="log" aria-live="polite" aria-label="Conversation avec CODE-V" className={styles["robot-chat-content"]}>
        {messages.map((msg, i) => <div key={i} className={msg.role === "user" ? styles["robot-message-user"] : styles["robot-message"]}>{msg.content}</div>)}
        {isTyping && <div role="status" className={styles["robot-message"]}>Je réfléchis...</div>}
      </div>
      <form className={styles["robot-chat-form"]} onSubmit={sendMessage}>
        <input ref={input} type="text" value={message} onChange={event => setMessage(event.target.value)} onFocus={() => setExpression("neutral")} placeholder="Décrivez votre objectif..." aria-label="Votre message" maxLength={10000} />
        <button type="submit" disabled={isTyping || !message.trim()} aria-label="Envoyer">➤</button>
      </form>
    </div>}
    <button className={`${styles["robot-character"]} ${styles[`expression-${expression}`]}`} onClick={handleRobotClick} aria-label={isOpen ? "Fermer l’assistant" : "Ouvrir l’assistant"} aria-expanded={isOpen} aria-controls="codev-chat" aria-haspopup="dialog"><span className={styles["robot-glow"]} /><img src="/brand/code-v-robot.svg" alt="" className={styles["robot-image"]} /><span className={styles["robot-status"]} /></button>
    <div className={styles["robot-help-label"]}>Besoin d’aide ?</div>
    <button className={styles["hide-cody-button"]} onClick={() => { closeChat(); setIsVisible(false); }} aria-label="Masquer l’assistant" title="Masquer l’assistant">✕</button>
  </div>;
}
