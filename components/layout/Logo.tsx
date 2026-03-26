import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const color = variant === "light" ? "#f1f5f9" : "#0f172a";

  return (
    <Link href="/" className={`inline-flex items-center group ${className}`}>
      <span
        className="text-[18px] font-semibold tracking-tight transition-opacity duration-200 group-hover:opacity-70"
        style={{ fontFamily: "var(--font-geist-sans)", color }}
      >
        NeoGraph{" "}
        <span className="font-light">Analytics</span>
      </span>
    </Link>
  );
}
