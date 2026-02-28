import Link from 'next/link';
import { Section, Container, Button } from '@/components/ui';

export default function CTASection() {
  return (
    <Section padding="sm">
      <Container size="lg">
        <div className="bg-[var(--primary)] rounded-2xl px-8 py-8 md:px-16 md:py-10 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Transform Your Healthcare Strategy?
          </h2>

          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Get in touch with our team to see how our research can drive your decisions
          </p>

          <div className="flex justify-center mt-8">
            <Link href="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[var(--primary)] hover:bg-white/90"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
