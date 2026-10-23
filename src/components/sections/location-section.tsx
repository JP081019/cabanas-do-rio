"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../use-reduced-motion";
import { ArrowUpRight, MapPin, Plus } from "lucide-react";
import { contactLinks } from "../data/site-content";
export function LocationSection() {
  const [expanded, setExpanded] = useState(false),
    [origin, setOrigin] = useState("");
  const reduced = useReducedMotion();
  const route = new URL(contactLinks.maps);
  if (origin.trim()) route.searchParams.set("origin", origin.trim());
  return (
    <section id="localizacao" className="location-section">
      <div className="section-shell location-layout">
        <div>
          <p className="eyebrow">Caeté, Alfredo Wagner · SC</p>
          <h2>
            O caminho
            <br />
            também faz parte
            <br />
            da experiência.
          </h2>
          <p className="location-copy">
            Entre a serra e a água, um endereço para deixar a rotina lá fora.
          </p>
          <svg className="route-line" viewBox="0 0 400 120" fill="none" aria-hidden="true">
            <path d="M0 70C80 0 120 150 210 65S310 30 370 65" />
            <circle cx="370" cy="65" r="5" />
          </svg>
        </div>
        <motion.div layout={!reduced} className="location-card" transition={{ duration: 0.3 }}>
          <button
            className="location-trigger"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls="location-map"
          >
            <MapPin size={30} strokeWidth={1.2} />
            <span>
              Cabanas do Rio<small>Alfredo Wagner, Santa Catarina</small>
            </span>
            <Plus size={21} className={expanded ? "is-rotated" : ""} />
          </button>
          <p className="location-address">
            Rua Anitápolis, S/N · Caeté
            <br />
            Alfredo Wagner, Santa Catarina
          </p>
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                id="location-map"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
                className="location-map"
              >
                <iframe
                  title="Mapa das Cabanas do Rio em Caeté, Alfredo Wagner"
                  src="https://maps.google.com/maps?q=Cabanas%20do%20Rio%2C%20Caet%C3%A9%2C%20Alfredo%20Wagner%20SC&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
          <form action="https://www.google.com/maps/dir/" method="get" target="_blank">
            <input type="hidden" name="api" value="1" />
            <input
              type="hidden"
              name="destination"
              value={route.searchParams.get("destination") ?? ""}
            />
            <label htmlFor="route-origin">De onde você vem?</label>
            <input
              id="route-origin"
              name="origin"
              placeholder="Sua cidade ou ponto de partida"
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
            />
            <button className="button" type="submit">
              Traçar rota no Google Maps <ArrowUpRight size={17} />
            </button>
          </form>
          <button className="text-link map-toggle" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Recolher mapa" : "Explore o mapa"}
            <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
