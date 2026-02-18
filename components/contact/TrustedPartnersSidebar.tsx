import Image from 'next/image';

interface Partner {
  name: string;
  id: string;
  logo: string;
}

// Using a subset of partners for sidebar display
const partners: Partner[] = [
  { id: 'bcg', name: 'Boston Consulting Group', logo: '/assets/logos/BCG.png' },
  { id: 'pwc', name: 'PwC', logo: '/assets/logos/PWC.png' },
  { id: 'meta', name: 'Meta', logo: '/assets/logos/Meta.png' },
  { id: 'mitsubishi', name: 'Mitsubishi', logo: '/assets/logos/Mitsubishi.png' },
  { id: 'kawasaki', name: 'Kawasaki', logo: '/assets/logos/Kawasaki.png' },
  { id: 'trivago', name: 'Trivago', logo: '/assets/logos/Trivago.png' },
];

export default function TrustedPartnersSidebar() {
  return (
    <div className="bg-white rounded-lg p-4 border border-[var(--border)]">
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">
        Trusted Partner
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex items-center justify-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Image
              src={partner.logo}
              alt={`${partner.name} logo`}
              width={80}
              height={40}
              className="object-contain max-w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
