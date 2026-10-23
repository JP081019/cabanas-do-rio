import Image from "next/image";
import { cabinCollection } from "../data/redesign-content";
export function AboutSection() {
  const photo = cabinCollection[0].photos[3];
  return (
    <section id="sobre" className="intro section-shell">
      <div className="intro-heading">
        <p className="eyebrow">Um lugar para simplesmente estar</p>
        <h2>
          Entre o rio,
          <br />a madeira
          <br />e o silêncio.
        </h2>
      </div>
      <div className="intro-aside">
        <div className="intro-image">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 700px) 85vw, 36vw"
            className="object-cover"
          />
        </div>
        <p>
          Em Caeté, no interior de Santa Catarina, a natureza encontra o aconchego de uma cabana.
          Duas formas de estar perto do que importa. E longe da pressa.
        </p>
        <a href="#cabanas" className="text-link">
          Encontre o seu refúgio <span aria-hidden="true">↓</span>
        </a>
      </div>
      <svg className="river-line" viewBox="0 0 600 300" fill="none" aria-hidden="true">
        <path d="M-20 210C100 320 290 80 180 70S80 260 330 200 410 20 620 70" />
      </svg>
    </section>
  );
}
