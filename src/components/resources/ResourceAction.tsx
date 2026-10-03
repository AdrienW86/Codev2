import Link from "next/link";
import ChatTrigger from "@/components/RobotAssistant/ChatTrigger";
import { getResourceCtaHref, type ResourceCta } from "@/data/resources";

export default function ResourceAction({ cta }: { cta: ResourceCta }) {
  if (cta.type === "chat") return <ChatTrigger intent={cta.intent} className="button button-primary">{cta.label}</ChatTrigger>;
  const href = getResourceCtaHref(cta);
  return href ? <Link href={href} className="button button-primary">{cta.label}</Link> : null;
}
