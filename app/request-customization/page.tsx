import { Suspense } from "react";
import { Section, Container } from "@/components/ui";
import RequestCustomizationForm from "./RequestCustomizationForm";

export default function RequestCustomizationPage() {
  return (
    <Suspense fallback={
      <Section padding="lg" background="muted">
        <Container size="lg">
          <div className="text-center space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded-full mx-auto animate-pulse" />
            <div className="h-12 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="h-6 w-full max-w-2xl bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
        </Container>
      </Section>
    }>
      <RequestCustomizationForm />
    </Suspense>
  );
}
