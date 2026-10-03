"use client";

import type { ReactNode } from "react";
import { openChat, type ChatIntent } from "./chat";

export default function ChatTrigger({ intent, className, children }: {
  intent?: ChatIntent;
  className?: string;
  children: ReactNode;
}) {
  return <button type="button" className={className} aria-haspopup="dialog" aria-controls="codev-chat" onClick={() => openChat({ intent })}>{children}</button>;
}
