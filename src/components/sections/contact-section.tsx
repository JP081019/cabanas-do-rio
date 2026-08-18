import { CalendarCheck, Camera, Home, Mail, MessageCircle, Send, Sparkles } from "lucide-react";
import { cabins, contactLinks } from "@/src/components/data/site-content";

const contactCards = [
  {
    label: "Reservas",
    value: "Booking e Airbnb",
    href: cabins[0].bookingUrl,
    icon: Sparkles,
    tone: "text-[#ef7b2d]",
    bookingUrl: cabins[0].bookingUrl,
    airbnbUrl: cabins[0].airbnbUrl,
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
    value: "medeirosmarilene40",
    suffix: "@gmail.com",
    href: contactLinks.email,
    icon: Mail,
    tone: "text-[#4f7661]",
  },
];

export function ContactSection() {
  return (
    <section id="contato" className="bg-[#dbe8df]">
      <div className="section-shell">
        <div className="grid min-w-0 gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <div className="relative min-w-0 overflow-hidden rounded-lg bg-[#202a1f] p-6 text-white shadow-[0_30px_70px_rgba(32,42,31,0.24)] sm:p-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
            <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full border border-white/10" />

            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/54 sm:text-sm">Reservas</p>
            <h2 className="mt-5 max-w-full font-serif text-[clamp(3rem,13vw,5.4rem)] font-normal leading-[0.92]">
              Fale com a gente.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/74">
              Escolha o canal que preferir para tirar dúvidas, consultar datas e planejar sua estadia nas Cabanas do Rio.
            </p>

            <div className="mt-10 grid gap-4">
              <a
                className="group flex min-w-0 items-center gap-4 rounded-md bg-[#eef4ea] p-4 !text-[#202a1f] transition hover:-translate-y-1 hover:!bg-white hover:!text-[#202a1f] sm:gap-5 sm:p-5"
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#22483a] !text-white sm:h-16 sm:w-16">
                  <MessageCircle size={29} strokeWidth={1.45} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs uppercase tracking-[0.2em] text-[#6d7565] sm:text-sm">WhatsApp</span>
                  <span className="mt-1 block break-words font-serif text-[clamp(1.35rem,7vw,1.8rem)] leading-tight text-[#202a1f]">
                    (55) 48 99648-0494
                  </span>
                </span>
                <Send size={20} strokeWidth={1.4} className="hidden shrink-0 text-[#202a1f] transition group-hover:translate-x-1 sm:block" />
              </a>
            </div>
          </div>

          <div className="grid min-w-0 gap-4">
            {contactCards.map((card) => {
              const Icon = card.icon;

              if ("bookingUrl" in card) {
                return (
                  <div
                    key={card.label}
                    className="flex min-w-0 items-center gap-4 rounded-lg bg-[#f8faf3] p-4 text-[#20251d] shadow-[0_18px_45px_rgba(31,65,52,0.1)] ring-1 ring-[#20251d]/5 sm:gap-5 sm:p-6"
                  >
                    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eef4ea] sm:h-16 sm:w-16 ${card.tone}`}>
                      <Icon size={29} strokeWidth={1.35} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-[0.24em] text-[#6d7565] sm:text-sm">{card.label}</span>
                      <span className="mt-1 block max-w-full font-serif text-[clamp(1.35rem,7vw,2rem)] leading-tight">
                        {card.value}
                      </span>
                      <span className="mt-4 grid max-w-md gap-2 sm:grid-cols-2">
                        <a
                          href={card.bookingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#263023] px-4 text-xs font-bold uppercase tracking-[0.08em] !text-white transition hover:-translate-y-0.5 hover:bg-[#3a4834]"
                        >
                          <CalendarCheck size={15} strokeWidth={1.5} />
                          Booking
                        </a>
                        <a
                          href={card.airbnbUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#ef7b2d] px-4 text-xs font-bold uppercase tracking-[0.08em] !text-white transition hover:-translate-y-0.5 hover:bg-[#d96518]"
                        >
                          <Home size={15} strokeWidth={1.5} />
                          Airbnb
                        </a>
                      </span>
                    </span>
                  </div>
                );
              }

              return (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex min-w-0 items-center gap-4 rounded-lg bg-[#f8faf3] p-4 text-[#20251d] shadow-[0_18px_45px_rgba(31,65,52,0.1)] ring-1 ring-[#20251d]/5 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,65,52,0.16)] sm:gap-5 sm:p-6"
                >
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eef4ea] sm:h-16 sm:w-16 ${card.tone}`}>
                    <Icon size={29} strokeWidth={1.35} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-[0.24em] text-[#6d7565] sm:text-sm">{card.label}</span>
                    <span className="mt-1 block max-w-full overflow-wrap-anywhere font-serif text-[clamp(1.35rem,7vw,2rem)] leading-tight">
                      {card.value}
                      {"suffix" in card ? <span className="block">{card.suffix}</span> : null}
                    </span>
                  </span>
                  <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#20251d]/10 text-[#20251d]/50 transition group-hover:border-[#ef7b2d] group-hover:bg-[#ef7b2d] group-hover:text-white sm:flex">
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
