export interface ConsultingService {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  overview: string;
  keyHighlights: string[];
  servicesInclude: string[];
}

export type ServiceCategory =
  | "Market Intelligence"
  | "R&D & Innovation"
  | "Regulatory & Compliance"
  | "Primary Research"
  | "Strategic Advisory"
  | "Therapeutic Expertise";
