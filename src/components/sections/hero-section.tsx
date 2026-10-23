"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../use-reduced-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { riverPhoto } from "../data/redesign-content";
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [contentVisible, setContentVisible] = useState(false);
  const previousVisibility = useRef(false);
  // Explicit percentages avoid native ViewTimeline range resets in sticky sections.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0%", "end 100%"] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(28% 24% 22% 24% round 2px)", "inset(0% 0% 0% 0% round 0px)"],
  );
  const topTransform = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["translateX(0vw)", "translateX(-65vw)"],
  );
  const bottomTransform = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["translateX(0vw)", "translateX(65vw)"],
  );
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4, 0.65], [1, 1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.85], [0, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0.25, 0.85], [0, 0.46]);
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const visible = progress > 0.6;
    if (visible !== previousVisibility.current) {
      previousVisibility.current = visible;
      setContentVisible(visible);
    }
  });
  return (
    <section
      ref={ref}
      id="inicio"
      className="hero"
      aria-label="Cabanas do Rio, hospedagem em Alfredo Wagner"
    >
      <div className="hero-sticky">
        <motion.div className="hero-media" style={reduced ? undefined : { clipPath }}>
          <Image
            src={riverPhoto.src}
            alt={riverPhoto.alt}
            fill
            preload
            sizes="(max-width: 700px) 160vh, 100vw"
            className="object-cover"
          />
          <motion.div className="hero-shade" style={{ opacity: reduced ? 0.38 : overlayOpacity }} />
        </motion.div>
        <h1 className="hero-wordmark" aria-label="Cabanas do Rio">
          <motion.span
            className="hero-word hero-word-top"
            style={reduced ? undefined : { transform: topTransform, opacity: titleOpacity }}
          >
            Cabanas
          </motion.span>
          <motion.span
            className="hero-word hero-word-bottom"
            style={reduced ? undefined : { transform: bottomTransform, opacity: titleOpacity }}
          >
            do Rio
          </motion.span>
        </h1>
        <motion.div
          className="hero-footnote"
          inert={contentVisible || reduced}
          style={reduced ? undefined : { opacity: titleOpacity }}
        >
          <a href="#sobre">
            <ArrowDown size={18} /> Desça. Respire. Descubra.
          </a>
          <p>
            Dois refúgios.
            <br />
            Um encontro com a natureza.
          </p>
        </motion.div>
        <motion.div
          className="hero-content"
          inert={!reduced && !contentVisible}
          style={{ opacity: reduced ? 1 : contentOpacity }}
        >
          <p>Alfredo Wagner, Santa Catarina</p>
          <h2>
            Desacelere.
            <br />O rio continua correndo.
          </h2>
          <p>Cabanas entre a madeira, a mata e o seu próprio tempo.</p>
          <div className="hero-actions">
            <a href="#cabanas" className="button button-light">
              Conheça as cabanas <ArrowDown size={17} />
            </a>
            <a href="#disponibilidade" className="text-link">
              Ver disponibilidade <ArrowUpRight size={17} />
            </a>
          </div>
        </motion.div>
        <span className="hero-side-note" aria-hidden="true">
          Natureza para sentir. Tempo para viver.
        </span>
      </div>
    </section>
  );
}
