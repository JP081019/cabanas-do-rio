export function AboutSection() {
  return (
    <section id="sobre" className="bg-[var(--paper)]">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
          <p className="section-kicker">Sobre o lugar</p>
          <h2 className="section-title">Um encontro entre cabana, rio e descanso.</h2>
        </div>
        <div className="space-y-6">
          <p className="section-copy">
            As Cabanas do Rio nascem para quem quer trocar o excesso por presença. O site foi pensado
            em seções claras para apresentar o lugar, as cabanas, as experiências e o caminho até a reserva.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Natureza", "Conforto", "Privacidade"].map((item) => (
              <div key={item} className="border-t border-[var(--line)] pt-4">
                <p className="font-serif text-2xl">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
