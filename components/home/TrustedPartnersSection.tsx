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
  const duplicatedPartners = [...partners, ...partners];

  return (
    <Section background="card" padding="md">
      <Container size="xl">
        <div className="space-y-8">

          {/* Subtle label — no large h2 */}
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Trusted by leading organizations worldwide
          </p>

          {/* Marquee */}
          <div className="relative overflow-hidden">
            {/* Edge masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-[var(--card)] z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-[var(--card)] z-10 pointer-events-none" />

            <div className="flex animate-scroll-horizontal gap-6">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 w-[160px] h-[80px] flex items-center justify-center px-5 bg-white border border-slate-100 rounded-xl grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={120}
                    height={60}
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
