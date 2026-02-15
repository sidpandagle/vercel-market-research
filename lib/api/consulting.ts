import consultingServicesData from '@/data/consulting-services.json';
import { ConsultingService, ServiceCategory } from './consulting.types';

export function getAllConsultingServices(): ConsultingService[] {
  return consultingServicesData as ConsultingService[];
}

export function getConsultingServiceBySlug(slug: string): ConsultingService | undefined {
  return consultingServicesData.find((service) => service.slug === slug) as ConsultingService | undefined;
}

export function getConsultingServicesByCategory(category: ServiceCategory): ConsultingService[] {
  return consultingServicesData.filter((service) => service.category === category) as ConsultingService[];
}

export function getAllServiceCategories(): ServiceCategory[] {
  const categories = new Set<ServiceCategory>();
  consultingServicesData.forEach((service) => {
    categories.add(service.category as ServiceCategory);
  });
  return Array.from(categories);
}

export function getServicesByCategoryMap(): Map<ServiceCategory, ConsultingService[]> {
  const map = new Map<ServiceCategory, ConsultingService[]>();
  consultingServicesData.forEach((service) => {
    const category = service.category as ServiceCategory;
    if (!map.has(category)) {
      map.set(category, []);
    }
    map.get(category)!.push(service as ConsultingService);
  });
  return map;
}
