import { ArrowUpRight } from "lucide-react";
import { cabinCollection } from "../data/redesign-content";
import { CabinGallery } from "../gallery/cabin-gallery";
export function CabinsSection() {
  return (
    <section id="cabanas" className="cabins-section">
      <div className="section-shell cabins-intro">
        <p className="eyebrow">Escolha como viver esse lugar</p>
        <h2>
          Dois refúgios.
          <br />A natureza em comum.
        </h2>
      </div>
      {cabinCollection.map((cabin) => (
        <article
          key={cabin.id}
          id={`cabana-${cabin.id}`}
          className={`cabin-article cabin-${cabin.id}`}
        >
          <div className="section-shell">
            <div className="cabin-heading">
              <div>
                <p className="eyebrow">{cabin.concept}</p>
                <h3>{cabin.name}</h3>
              </div>
              <div className="cabin-description">
                <h4>{cabin.headline}</h4>
                <p>{cabin.description}</p>
                <a href="#disponibilidade" data-cabin={cabin.id} className="text-link">
                  Quero ficar aqui <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <CabinGallery cabin={cabin} />
          </div>
        </article>
      ))}
    </section>
  );
}
