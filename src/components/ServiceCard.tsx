import Link from "next/link";

type ServiceCardProps = {
  number: string;
  title: string;
  text: string;
  href: string;
  items: string[];
};

export default function ServiceCard({ number, title, text, href, items }: ServiceCardProps) {
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-number">{number}</span>
        <span className="service-icon" aria-hidden="true">↗</span>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <ul>
        {items.map((item) => <li key={item}><span aria-hidden="true">+</span>{item}</li>)}
      </ul>
      <Link className="text-link" href={href}>Découvrir l’expertise <span aria-hidden="true">↗</span></Link>
    </article>
  );
}