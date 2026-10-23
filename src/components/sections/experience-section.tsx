"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../use-reduced-motion";
import { experienceMoments } from "../data/redesign-content";
export function ExperienceSection() {
  const [selected, setSelected] = useState(0),
    reduced = useReducedMotion();
  const moment = experienceMoments[selected];
  return (
    <section id="experiencias" className="experience-section">
      <div className="section-shell">
        <div className="experience-heading">
          <p className="eyebrow">Um dia nas Cabanas do Rio</p>
          <h2>
            Esqueça as horas.
            <br />
            Lembre dos momentos.
          </h2>
        </div>
        <div className="experience-layout">
          <div className="experience-image">
            <AnimatePresence initial={false}>
              <motion.div
                key={moment.photo.src}
                className="gallery-photo-layer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.5 }}
              >
                <Image
                  src={moment.photo.src}
                  alt={moment.photo.alt}
                  fill
                  sizes="(max-width: 700px) 90vw, 55vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="experience-timeline" role="group" aria-label="Momentos do dia">
            {experienceMoments.map((item, index) => (
              <button
                key={item.time}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <span className="timeline-dot" />
                <small>{item.time}</small>
                <span>{item.title}</span>
                {selected === index ? <p>{item.text}</p> : null}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
