import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Synaptic Research | Research & Business Inquiries",
  description: "Contact Synaptic Research for healthcare research inquiries, report access, partnerships, or consulting support.",
  keywords: ["contact synaptic research", "healthcare research contact", "healthcare consulting inquiry"],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
