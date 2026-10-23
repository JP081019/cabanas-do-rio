"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { cabinCollection, whatsappMessage } from "../data/redesign-content";
const subjects = ["Cabana do Rio", "Mirante do Caeté", "Disponibilidade", "Outra dúvida"];
export function ContactSection() {
  const [subject, setSubject] = useState(subjects[0]);
  return (
    <>
      <section id="contato" className="contact-section section-shell">
        <div>
          <p className="eyebrow">Vamos conversar</p>
          <h2>
            Sua próxima pausa
            <br />
            começa aqui.
          </h2>
        </div>
        <div className="contact-options">
          <p>
            Conte o que você tem em mente.
            <br />A gente ajuda a encontrar o seu refúgio.
          </p>
          <div role="group" aria-label="Assunto da conversa">
            {subjects.map((item) => (
              <button key={item} aria-pressed={subject === item} onClick={() => setSubject(item)}>
                {item}
              </button>
            ))}
          </div>
          <a
            className="text-link"
            href={whatsappMessage(
              `Olá! Estou planejando minha estadia nas Cabanas do Rio e gostaria de conversar sobre: ${subject}.`,
            )}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={19} /> Converse pelo WhatsApp <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <section className="final-cta">
        <Image
          src={cabinCollection[1].photos[0].src}
          alt={cabinCollection[1].photos[0].alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="final-shade" />
        <div className="final-content">
          <p>Cabanas do Rio · Alfredo Wagner, SC</p>
          <h2>
            Agora só falta
            <br />
            viver isso.
          </h2>
          <a href="#disponibilidade" className="button button-light">
            Ver disponibilidade <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </>
  );
}
