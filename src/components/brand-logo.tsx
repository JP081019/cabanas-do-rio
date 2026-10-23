import Image from "next/image";
import "./brand-logo.css";

export function CabanasLogo({
  variant = "primary",
  className = "",
  loading = "lazy",
}: {
  variant?: "primary" | "badge";
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const badge = variant === "badge";

  return (
    <Image
      src="/logo/Emblema da Cabana à Beira-Rio.png"
      alt="Cabanas do Rio"
      width={1254}
      height={1254}
      sizes={badge ? "84px" : "(max-width: 700px) 52px, 66px"}
      loading={loading}
      className={`cabanas-logo ${className}`.trim()}
    />
  );
}
