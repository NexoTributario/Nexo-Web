
import { Entity, NewsArticle, TeamMember, TaxObligation } from './types';

export const NEWS_MOCK: NewsArticle[] = [
  {
    id: '1',
    title: 'Facturación 3.0: Implementación de Validación en Tiempo Real',
    excerpt: 'El SRI establece el nuevo protocolo de interoperabilidad para la emisión de comprobantes electrónicos con validación inmediata por nodos estatales, optimizando el control del IVA.',
    entity: Entity.SRI,
    date: '15 de Mayo, 2026',
    resolutionNumber: 'NAC-DGERCGC26-00000042',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Reporte Obligatorio de Activos Digitales y Criptoactivos',
    excerpt: 'La Superintendencia de Compañías actualiza las Normas de Información Financiera para la declaración de tenencias en criptoactivos y stablecoins dentro del patrimonio societario.',
    entity: Entity.SUPERCIAS,
    date: '10 de Mayo, 2026',
    resolutionNumber: 'SCVS-INC-2026-0012',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Nuevos Incentivos Fiscales para Empresas con Carbono Neutral',
    excerpt: 'Se publica la ley de beneficios tributarios que otorga una reducción adicional del 5% en el Impuesto a la Renta para empresas que certifiquen operaciones 100% sostenibles este año.',
    entity: Entity.SRI,
    date: '05 de Mayo, 2026',
    resolutionNumber: 'LEY-ECO-VERDE-2026',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800'
  }
];

export const TEAM_MOCK: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Ricardo Cortez',
    role: 'Socio Director / Especialista Tributario',
    description: 'Con más de 20 años en el mercado, el Dr. Cortez ha liderado defensas fiscales ante el SRI para las mayores empresas de la región Costa.',
    imageUrl: 'https://picsum.photos/seed/ricardo/400/500',
    tags: ['Derecho Fiscal', 'Ex-SRI']
  },
  {
    id: '2',
    name: 'Mgs. Elena Mendoza',
    role: 'Socia de Auditoría y Cumplimiento',
    description: 'Experta en normativa NIIF y planificación fiscal internacional, Elena garantiza que la transición digital de nuestros clientes sea impecable.',
    imageUrl: 'https://picsum.photos/seed/elena/400/500',
    tags: ['NIIF', 'Auditoría']
  },
  {
    id: '3',
    name: 'Ab. Gabriel Vera',
    role: 'Asociado Legal Senior',
    description: 'Especializado en litigio administrativo y constitucional, Gabriel es el pilar en la resolución de conflictos complejos ante entes reguladores.',
    imageUrl: 'https://picsum.photos/seed/gabriel/400/500',
    tags: ['Litigio', 'Derecho Societario']
  }
];

export const OBLIGATIONS_MOCK: TaxObligation[] = [
  {
    id: 'o1',
    title: 'IVA Mensual',
    entity: Entity.SRI,
    frequency: 'Mensual',
    deadline: 'Según 9no Dígito (10-28)',
    description: 'Declaración de ventas y compras realizadas en el mes anterior.'
  },
  {
    id: 'o2',
    title: 'Aportes al IESS',
    entity: Entity.IESS,
    frequency: 'Mensual',
    deadline: 'Día 15 de cada mes',
    description: 'Pago de planillas de aportes patronales e individuales.'
  },
  {
    id: 'o3',
    title: 'Décimo Cuarto Sueldo',
    entity: Entity.MDT,
    frequency: 'Anual',
    deadline: '15 de Marzo (Costa)',
    description: 'Bono escolar obligatorio para todos los trabajadores.'
  },
  {
    id: 'o4',
    title: 'Estados Financieros',
    entity: Entity.SUPERCIAS,
    frequency: 'Anual',
    deadline: 'Hasta 30 de Abril',
    description: 'Carga de estados financieros auditados al portal SuperCias.'
  }
];
