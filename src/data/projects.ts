/* =========================================================================
   Portfólio — projetos conceituais
   -------------------------------------------------------------------------
   `href` e `image` ficam `null` até que o endereço e as imagens reais de cada
   projeto sejam informados. A interface trata essa ausência sem exibir links
   quebrados nem URLs fictícias.
   ========================================================================= */

/** Identificador da composição geométrica provisória exibida antes das imagens reais. */
export type ProjectComposition = 'aurora' | 'vertice' | 'atlas'

export interface Project {
  readonly id: string
  /** Numeração editorial exibida no card. */
  readonly index: string
  readonly name: string
  readonly segment: string
  readonly description: string
  readonly visualDirection: string
  readonly objective: string
  /** Endereço público da demonstração, quando disponível. */
  readonly href: string | null
  /** Caminho da imagem real do projeto (ex.: '/images/projects/aurora-estetica.jpg'). */
  readonly image: string | null
  readonly imageAlt: string
  readonly composition: ProjectComposition
}

export const projects: readonly Project[] = [
  {
    id: 'aurora-estetica',
    index: '01',
    name: 'Aurora Estética',
    segment: 'Estética e beleza',
    description:
      'Página de apresentação para um espaço de estética, com foco em serviços, ambiente e contato direto para agendamentos.',
    visualDirection: 'Elegante, sofisticada e acolhedora.',
    objective: 'Apresentar serviços e facilitar o contato para agendamentos.',
    href: null,
    image: '/images/projects/aurora.png',
    imageAlt: 'Prévia do projeto conceitual Aurora Estética',
    composition: 'aurora',
  },
  {
    id: 'vertice-arquitetura',
    index: '02',
    name: 'Vértice Arquitetura',
    segment: 'Arquitetura e design de interiores',
    description:
      'Página editorial para um estúdio de arquitetura, organizada para valorizar projetos, serviços e solicitações de orçamento.',
    visualDirection: 'Minimalista, editorial e sofisticada.',
    objective: 'Apresentar projetos, serviços e solicitações de orçamento.',
    href: null,
    image: '/images/projects/vertice.png',
    imageAlt: 'Prévia do projeto conceitual Vértice Arquitetura',
    composition: 'vertice',
  },
  {
    id: 'atlas-performance',
    index: '03',
    name: 'Atlas Performance',
    segment: 'Fitness, treinamento físico e performance esportiva',
    description:
      'Página de alto impacto para um centro de treinamento e performance, criada para apresentar a identidade da marca, organizar os serviços e abrir caminho para o contato.',
    visualDirection:
      'Moderna, esportiva, impactante e dinâmica, com tipografia marcante e elementos visuais de alta energia.',
    objective:
      'Apresentar a identidade da marca, destacar os serviços de treinamento e performance física e facilitar o contato com potenciais clientes.',
    href: null,
    image: '/images/projects/atlas.png',
    imageAlt: 'Prévia do projeto conceitual Atlas Performance',
    composition: 'atlas',
  },
]

/** Rótulo obrigatório exibido em todos os cards do portfólio. */
export const projectDisclaimer = 'Projeto conceitual'

/** Mensagem exibida quando o endereço da demonstração ainda não foi informado. */
export const projectPendingLabel = 'Demonstração em breve'
