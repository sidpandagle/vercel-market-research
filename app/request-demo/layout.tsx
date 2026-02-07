import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Demo | Healthcare Foresights",
  description: "Schedule a personalized demo to explore our healthcare market research platform and discover how our insights can drive your strategic decisions.",
  keywords: ["healthcare research demo", "market research demo", "healthcare consulting demo"],
};

export default function RequestDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
