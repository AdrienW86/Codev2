import Link from "next/link";
import { getPublishedResources } from "@/data/resources";
import type { ServiceId } from "@/data/services";
import styles from "./resourceReadings.module.css";

export default function ResourceReadings({ services, heading }: { services: readonly ServiceId[]; heading: string }) {
  const readings = getPublishedResources().filter(resource => resource.relatedServices.some(service => services.includes(service))).slice(0, 4);
  if (!readings.length) return null;
  return <section className={styles.section}><div className="container"><p className={styles.eyebrow}>POUR PRÉPARER VOTRE DÉCISION</p><h2>{heading}</h2><div className={styles.readings}>{readings.map(resource => <Link key={resource.id} href={`/ressources/${resource.slug}`}><span>{resource.title}</span><span aria-hidden="true">↗</span></Link>)}</div></div></section>;
}
