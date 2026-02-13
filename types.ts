
export enum Entity {
  SRI = 'SRI',
  IESS = 'IESS',
  SUPERCIAS = 'SuperCias',
  MDT = 'Min. Trabajo',
  UAFE = 'UAFE',
  ALL = 'Todas'
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  entity: Entity;
  date: string;
  imageUrl?: string;
  resolutionNumber?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface TaxObligation {
  id: string;
  title: string;
  entity: Entity;
  deadline: string;
  frequency: string;
  description: string;
}
