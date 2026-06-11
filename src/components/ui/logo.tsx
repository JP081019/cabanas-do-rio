type LogoProps = {
  light?: boolean;
};

export function Logo({ light = false }: LogoProps) {
  return (
    <a
      href="#inicio"
      aria-label="Cabanas do Rio - Página inicial"
      className={`inline-flex flex-col leading-none ${
        light ? "text-[#f4f0e8]" : "text-[#18352d]"
      }`}
    >
      <span className="font-title text-[2rem] font-medium tracking-[-0.04em]">
        Cabanas do Rio
      </span>

      <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.3em] opacity-70">
        Cabanas &amp; Pousadas
      </span>
    </a>
  );
}