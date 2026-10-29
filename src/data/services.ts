/* =========================================================================
   Serviços oferecidos pela CustomIQ.
   Sem divulgação de preços nesta versão: investimento é definido em proposta.
   ========================================================================= */

export interface Service {
  readonly id: string
  readonly index: string
  readonly title: string
  readonly description: string
  readonly deliverables: readonly string[]
}

export const services: readonly Service[] = [
  {
    id: 'landing-pages',
    index: '01',
    title: 'Landing pages personalizadas',
    description:
      'Desenvolvimento de páginas comerciais alinhadas à identidade e aos objetivos de cada negócio.',
    deliverables: ['Estrutura sob medida', 'Conteúdo organizado', 'Chamadas para ação'],
  },
  {
    id: 'design-responsivo',
    index: '02',
    title: 'Design responsivo',
    description:
      'Experiências adaptadas para celulares, tablets e computadores, com atenção à legibilidade e à navegação.',
    deliverables: ['Mobile, tablet e desktop', 'Layout fluido', 'Testes de uso'],
  },
  {
    id: 'experiencia-conversao',
    index: '03',
    title: 'Experiência e conversão',
    description:
      'Organização estratégica de informações, chamadas para ação e canais de contato para facilitar o próximo passo do visitante.',
    deliverables: ['Hierarquia de conteúdo', 'Fluxo de contato', 'Ajustes de clareza'],
  },
  {
    id: 'publicacao-suporte',
    index: '04',
    title: 'Publicação e suporte',
    description:
      'Configuração de hospedagem, publicação e serviços de manutenção conforme a proposta contratada.',
    deliverables: ['Publicação assistida', 'Configuração de domínio', 'Manutenção sob proposta'],
  },
]
