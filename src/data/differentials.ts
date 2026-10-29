/* =========================================================================
   Diferenciais — afirmações exclusivamente verificáveis sobre o método
   de trabalho. Sem promessas de resultado comercial.
   ========================================================================= */

export interface Differential {
  readonly id: string
  readonly index: string
  readonly title: string
  readonly description: string
}

export const differentials: readonly Differential[] = [
  {
    id: 'design-personalizado',
    index: '01',
    title: 'Design personalizado',
    description:
      'Cada página é construída para o negócio em questão, sem templates reaproveitados.',
  },
  {
    id: 'identidade-respeitada',
    index: '02',
    title: 'Identidade visual respeitada',
    description:
      'A paleta, a tipografia e os elementos da marca orientam todas as decisões visuais.',
  },
  {
    id: 'experiencia-mobile',
    index: '03',
    title: 'Experiência mobile',
    description:
      'A navegação é planejada primeiro para telas pequenas e ampliada para telas maiores.',
  },
  {
    id: 'clareza-comunicacao',
    index: '04',
    title: 'Clareza na comunicação',
    description:
      'Informações organizadas para que o visitante entenda a proposta sem esforço.',
  },
  {
    id: 'performance-acessibilidade',
    index: '05',
    title: 'Performance e acessibilidade',
    description:
      'Imagens otimizadas, código enxuto, contraste adequado e navegação por teclado.',
  },
  {
    id: 'desenvolvimento-organizado',
    index: '06',
    title: 'Desenvolvimento organizado',
    description:
      'Componentes reutilizáveis e conteúdo centralizado, facilitando ajustes futuros.',
  },
  {
    id: 'acompanhamento',
    index: '07',
    title: 'Acompanhamento durante o projeto',
    description:
      'Comunicação direta ao longo das etapas, da primeira conversa à publicação.',
  },
]
