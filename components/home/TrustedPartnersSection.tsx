import { Section, Container } from '@/components/ui';
import Image from 'next/image';

interface Partner {
  name: string;
  id: string;
  logo: string;
}

const partners: Partner[] = [
  { id: 'agronne', name: 'Argonne', logo: '/assets/logos/Agronne.png' },
  { id: 'bcg', name: 'Boston Consulting Group', logo: '/assets/logos/BCG.png' },
  { id: 'cdc', name: 'CDC', logo: '/assets/logos/CDC.png' },
  { id: 'championx', name: 'ChampionX', logo: '/assets/logos/ChampionX.png' },
  { id: 'kawasaki', name: 'Kawasaki', logo: '/assets/logos/Kawasaki.png' },
  { id: 'meta', name: 'Meta', logo: '/assets/logos/Meta.png' },
  { id: 'mitsubishi', name: 'Mitsubishi', logo: '/assets/logos/Mitsubishi.png' },
  { id: 'nestle', name: 'Nestlé Professional', logo: '/assets/logos/Nestle Professional.png' },
  { id: 'pwc', name: 'PwC', logo: '/assets/logos/PWC.png' },
  { id: 'sk', name: 'SK', logo: '/assets/logos/SK.png' },
  { id: 'suzuki', name: 'Suzuki', logo: '/assets/logos/Suzuki.png' },
  { id: 'trivago', name: 'Trivago', logo: '/assets/logos/Trivago.png' },
];

export default function TrustedPartnersSection() {
  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <Section background="card" padding="lg">
      <Container size="xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
              Trusted Partners
            </h2>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Collaborating with industry leaders to deliver exceptional insights
            </p>
          </div>

          <div className="relative overflow-hidden py-4">
            {/* Gradient fade effects on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--card)] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--card)] to-transparent z-10 pointer-events-none"></div>

            <div className="flex animate-scroll-horizontal gap-8">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 w-[180px] h-[200px] flex items-center justify-center p-6 bg-white rounded-xl"
                >
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={160}
                    height={80}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
