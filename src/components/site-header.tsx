"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CabanasLogo } from "./brand-logo";
const links = [
  { label: "Cabanas", href: "#cabanas" },
  { label: "Experiência", href: "#experiencias" },
  { label: "Localização", href: "#localizacao" },
  { label: "Dúvidas", href: "#duvidas" },
];
export function SiteHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [floating, setFloating] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("inicio"),
      booking = document.getElementById("disponibilidade"),
      footer = document.getElementById("rodape"),
      contact = document.getElementById("contato"),
      finalCta = document.querySelector(".final-cta");
    if (!hero || !booking || !footer) return;
    let pastHero = false;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero)
          pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        else if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      setFloating(pastHero && visible.size === 0);
    });
    [hero, booking, footer, contact, finalCta].forEach((element) => {
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="Cabanas do Rio, início">
          <CabanasLogo className="header-logo" loading="eager" />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="header-book" href="#disponibilidade">
          Reservar <ArrowUpRight size={16} />
        </a>
        <button
          ref={trigger}
          className="menu-trigger icon-button"
          aria-label="Abrir menu"
          aria-haspopup="dialog"
          onClick={() => dialog.current?.showModal()}
        >
          <Menu size={24} />
        </button>
      </header>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-label="Menu de navegação"
        onClose={() => trigger.current?.focus()}
      >
        <div className="menu-top">
          <span className="brand">
            <CabanasLogo className="menu-logo" />
          </span>
          <button
            className="icon-button"
            aria-label="Fechar menu"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Navegação mobile">
          {[...links, { label: "Planeje sua estadia", href: "#disponibilidade" }].map((link) => (
            <a key={link.href} href={link.href} onClick={() => dialog.current?.close()}>
              {link.label}
              <ArrowUpRight size={24} />
            </a>
          ))}
        </nav>
        <p>Um encontro com o seu próprio tempo.</p>
      </dialog>
      <a
        className={`floating-booking${floating ? " is-visible" : ""}`}
        href="#disponibilidade"
        tabIndex={floating ? 0 : -1}
        aria-hidden={!floating}
      >
        <span className="floating-brand">
          <CabanasLogo variant="badge" className="floating-logo" />
          <small>Sua próxima pausa</small>
        </span>
        <span>
          Ver disponibilidade <ArrowUpRight size={17} />
        </span>
      </a>
    </>
  );
}
