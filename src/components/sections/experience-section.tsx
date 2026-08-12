import { Droplets, FlameKindling, Leaf, Moon } from "lucide-react";
import { experiences } from "@/src/components/data/site-content";

const icons = [Droplets, Leaf, FlameKindling, Moon];

export function ExperienceSection() {
  return (
    <section id="experiencias" className="bg-[#dfe8dd]">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-kicker">Experiências</p>
          <h2 className="section-title">Dias com ritmo leve e memória boa.</h2>
          <p className="section-copy mt-6">
            Este bloco guarda tudo que envolve a vivência: descanso, alimentação, passeios e momentos
            especiais. Depois podemos transformar cada item em uma página ou detalhe próprio.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {experiences.map((experience, index) => {
            const Icon = icons[index];
            return (
              <div key={experience} className="bg-[var(--paper)] p-7">
                <Icon aria-hidden size={26} className="text-[var(--river-dark)]" />
                <p className="mt-8 font-serif text-2xl leading-tight">{experience}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
