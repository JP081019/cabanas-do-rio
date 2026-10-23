"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../use-reduced-motion";
import { ArrowUpRight } from "lucide-react";
import { cabinCollection } from "../data/redesign-content";
export function ComparisonSection() {
  const [selected, setSelected] = useState(0),
    reduced = useReducedMotion();
  const cabin = cabinCollection[selected];
  return (
    <section id="comparar" className="comparison section-shell">
      <div className="comparison-title">
        <p className="eyebrow">Na dúvida, siga o seu ritmo</p>
        <h2>
          Qual delas
          <br />
          combina com você?
        </h2>
        <p>Dois refúgios. Duas formas de viver o mesmo lugar.</p>
      </div>
      <div className="comparison-layout">
        <div className="comparison-image">
          <AnimatePresence initial={false}>
            <motion.div
              className="gallery-photo-layer"
              key={cabin.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.45 }}
            >
              <Image
                src={cabin.photos[0].src}
                alt={cabin.photos[0].alt}
                fill
                sizes="(max-width: 700px) 90vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="comparison-details">
          <div className="cabin-switch" role="group" aria-label="Compare as cabanas">
            {cabinCollection.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelected(index)}
                aria-pressed={selected === index}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div aria-live="polite">
            <p className="comparison-concept">{cabin.concept}</p>
            <h3>{cabin.name}</h3>
            <p>
              {selected === 0
                ? "Para quem quer estar dentro da natureza. O rio como companhia e as árvores como vizinhas."
                : "Para quem quer contemplar a paisagem. O olhar encontra espaço e o tempo encontra uma pausa."}
            </p>
            <ul>
              {cabin.amenities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="text-link" href="#disponibilidade" data-cabin={cabin.id}>
              Ver disponibilidade desta cabana <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
