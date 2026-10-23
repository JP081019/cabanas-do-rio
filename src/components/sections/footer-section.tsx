import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CabanasLogo } from "../brand-logo";
import { contactLinks } from "../data/site-content";
export function FooterSection() {
  return (
    <footer id="rodape" className="site-footer">
      <div className="section-shell">
        <div className="footer-main">
          <a href="#inicio" className="footer-brand" aria-label="Cabanas do Rio, início">
            <CabanasLogo variant="badge" className="footer-logo" />
          </a>
          <p>
            Caeté, Alfredo Wagner
            <br />
            Santa Catarina, Brasil
          </p>
          <nav aria-label="Redes e contato">
            <a href={contactLinks.instagram} target="_blank" rel="noreferrer">
              Instagram <ArrowUpRight size={14} />
            </a>
            <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp <ArrowUpRight size={14} />
            </a>
            <a href={contactLinks.email}>
              E-mail <ArrowUpRight size={14} />
            </a>
          </nav>
          <nav aria-label="Explore o site">
            <a href="#cabanas">Nossas cabanas</a>
            <a href="#experiencias">A experiência</a>
            <a href="#disponibilidade">Planeje sua estadia</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Cabanas do Rio</p>
          <a
            href="https://jpcreative.com.br"
            target="_blank"
            rel="noreferrer"
            className="creative-signature"
          >
            <Image
              src="/logo/Identidade Minimalista JP Creative.png"
              alt=""
              width={2172}
              height={724}
              sizes="64px"
              className="creative-logo"
            />
            <span>
              Desenvolvido por <strong>JPCreative</strong>
            </span>{" "}
            <ArrowUpRight size={13} />
          </a>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </div>
    </footer>
  );
}
