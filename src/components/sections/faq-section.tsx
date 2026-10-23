"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../use-reduced-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { faqItems } from "../data/redesign-content";
export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null),
    reduced = useReducedMotion();
  return (
    <section id="duvidas" className="faq-section section-shell">
      <div className="faq-heading">
        <p className="eyebrow">Dúvidas frequentes</p>
        <h2>
          Antes de
          <br />
          fazer as malas.
        </h2>
        <p>
          Um pouco de clareza.
          <br />
          Para chegar com a cabeça leve.
        </p>
      </div>
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div key={item.question} className={`faq-item${open === index ? " is-open" : ""}`}>
            <h3>
              <button
                id={`faq-question-${index}`}
                onClick={() => setOpen(open === index ? null : index)}
                aria-expanded={open === index}
                aria-controls={`faq-answer-${index}`}
              >
                {item.question}
                <Plus size={21} aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open === index ? (
                <motion.div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    reduced ? { duration: 0 } : { type: "spring", duration: 0.35, bounce: 0 }
                  }
                  className="faq-answer"
                >
                  <motion.div
                    initial={{ opacity: 0, transform: reduced ? "none" : "translateY(5px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <p>{item.answer}</p>
                    {item.href ? (
                      <a
                        className="text-link"
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {item.link}
                        <ArrowUpRight size={16} />
                      </a>
                    ) : null}
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
