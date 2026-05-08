import { supabase } from '@/lib/supabase/client';
import { ConsultingService, ServiceCategory } from './consulting.types';

function toService(row: Record<string, unknown>): ConsultingService {
  return {
    id: row.id as number,
    title: row.title as string,
    slug: row.slug as string,
    category: row.category as string,
    description: row.description as string,
    overview: row.overview as string,
    keyHighlights: (row.key_highlights as string[]) ?? [],
    servicesInclude: (row.services_include as string[]) ?? [],
  };
}

export async function getAllConsultingServices(): Promise<ConsultingService[]> {
  const { data, error } = await supabase
    .from('neograph_consulting_services')
    .select('*')
    .order('id');
  if (error) throw new Error(error.message);
  return (data ?? []).map(toService);
}

export async function getConsultingServiceBySlug(slug: string): Promise<ConsultingService | undefined> {
  const { data, error } = await supabase
    .from('neograph_consulting_services')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error || !data) return undefined;
  return toService(data);
}

export async function getConsultingServicesByCategory(category: ServiceCategory): Promise<ConsultingService[]> {
  const { data, error } = await supabase
    .from('neograph_consulting_services')
    .select('*')
    .eq('category', category)
    .order('id');
  if (error) throw new Error(error.message);
  return (data ?? []).map(toService);
}

export async function getAllServiceCategories(): Promise<ServiceCategory[]> {
  const services = await getAllConsultingServices();
  return Array.from(new Set(services.map(s => s.category as ServiceCategory)));
}

export async function getServicesByCategoryMap(): Promise<Map<ServiceCategory, ConsultingService[]>> {
  const services = await getAllConsultingServices();
  const map = new Map<ServiceCategory, ConsultingService[]>();
  for (const s of services) {
    const cat = s.category as ServiceCategory;
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(s);
  }
  return map;
}
