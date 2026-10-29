/* =========================================================================
   Processo de trabalho — sequência editorial em sete etapas.
   ========================================================================= */

export interface ProcessStep {
  readonly id: string
  readonly index: string
  readonly title: string
  readonly description: string
}

export const processSteps: readonly ProcessStep[] = [
  {
    id: 'primeiro-contato',
    index: '01',
    title: 'Primeiro contato',
    description: 'Entendimento inicial das necessidades e objetivos do negócio.',
  },
  {
    id: 'proposta',
    index: '02',
    title: 'Proposta',
    description: 'Definição de escopo, prazo, investimento e condições comerciais.',
  },
  {
    id: 'briefing',
    index: '03',
    title: 'Briefing',
    description:
      'Coleta estruturada de informações, referências e materiais da marca.',
  },
  {
    id: 'design-desenvolvimento',
    index: '04',
    title: 'Design e desenvolvimento',
    description: 'Planejamento visual e implementação da landing page.',
  },
  {
    id: 'revisao',
    index: '05',
    title: 'Revisão',
    description: 'Apresentação para avaliação e ajustes previstos no escopo.',
  },
  {
    id: 'publicacao',
    index: '06',
    title: 'Publicação',
    description: 'Configuração, testes e disponibilização do site.',
  },
  {
    id: 'suporte',
    index: '07',
    title: 'Suporte',
    description: 'Hospedagem e manutenção conforme as condições contratadas.',
  },
]
