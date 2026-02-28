import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Sample Report | Synaptic Research",
  description: "Request a free sample of our healthcare market research reports to experience the depth and quality of our industry analysis.",
  keywords: ["healthcare report sample", "free healthcare research", "market research sample"],
};

export default function RequestSampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
