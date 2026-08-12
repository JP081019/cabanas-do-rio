import { Camera, Mail, MessageCircle, Phone, Send, Sparkles } from "lucide-react";
import { contactLinks } from "@/src/components/data/site-content";

const contactCards = [
  {
    label: "Airbnb",
    value: "Cabana Mirante do Caeté",
    href: contactLinks.airbnb,
    icon: Sparkles,
    tone: "text-[#ef7b2d]",
  },
  {
    label: "Instagram",
    value: "@cabanasdorio_",
    href: contactLinks.instagram,
    icon: Camera,
    tone: "text-[#8b7d68]",
  },
  {
    label: "E-mail",
    value: "medeirosmarilene40@gmail.com",
    href: contactLinks.email,
    icon: Mail,
    tone: "text-[#4f7661]",
  },
];

export function ContactSection() {
  return (
    <section id="contato" className="bg-[#dbe8df]">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-lg bg-[#202a1f] p-8 text-white shadow-[0_30px_70px_rgba(32,42,31,0.24)] sm:p-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
            <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full border border-white/10" />

            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/54">Reservas</p>
            <h2 className="mt-5 font-serif text-[clamp(3rem,5vw,5.4rem)] font-normal leading-[0.92]">
              Fale com a gente.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/74">
              Escolha o canal que preferir para tirar dúvidas, consultar datas e planejar sua estadia nas Cabanas do Rio.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <a
                className="group flex items-center gap-5 rounded-md bg-[#eef4ea] p-5 !text-[#202a1f] transition hover:-translate-y-1 hover:!bg-white hover:!text-[#202a1f]"
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#22483a] !text-white">
                  <MessageCircle size={31} strokeWidth={1.45} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm uppercase tracking-[0.2em] text-[#6d7565]">WhatsApp</span>
                  <span className="mt-1 block font-serif text-2xl text-[#202a1f]">(55) 48 99648-0494</span>
                </span>
                <Send size={22} strokeWidth={1.4} className="text-[#202a1f] transition group-hover:translate-x-1" />
              </a>

              <a
                className="group flex items-center gap-5 rounded-md border border-white/16 p-5 text-white transition hover:-translate-y-1 hover:bg-white/8"
                href={contactLinks.phone}
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15">
                  <Phone size={29} strokeWidth={1.45} />
                </span>
                <span>
                  <span className="block text-sm uppercase tracking-[0.2em] text-white/54">Telefone</span>
                  <span className="mt-1 block font-serif text-2xl">Ligar agora</span>
                </span>
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {contactCards.map((card) => {
              const Icon = card.icon;

              return (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-5 rounded-lg bg-[#f8faf3] p-6 text-[#20251d] shadow-[0_18px_45px_rgba(31,65,52,0.1)] ring-1 ring-[#20251d]/5 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,65,52,0.16)]"
                >
                  <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#eef4ea] ${card.tone}`}>
                    <Icon size={31} strokeWidth={1.35} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm uppercase tracking-[0.24em] text-[#6d7565]">{card.label}</span>
                    <span className="mt-1 block break-words font-serif text-[clamp(1.4rem,2.6vw,2rem)] leading-tight">
                      {card.value}
                    </span>
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#20251d]/10 text-[#20251d]/50 transition group-hover:border-[#ef7b2d] group-hover:bg-[#ef7b2d] group-hover:text-white">
                    <Send size={18} strokeWidth={1.4} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
