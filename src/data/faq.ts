/* =========================================================================
   Perguntas frequentes.
   Valores, prazos e condições são sempre tratados como variáveis de proposta.
   ========================================================================= */

export interface FaqItem {
  readonly id: string
  readonly question: string
  readonly answer: string
}

export const faqItems: readonly FaqItem[] = [
  {
    id: 'o-que-e-landing-page',
    question: 'O que é uma landing page?',
    answer:
      'É uma página única desenvolvida com um objetivo comercial claro: apresentar um serviço, uma empresa ou uma oferta e conduzir o visitante até uma ação, como entrar em contato pelo WhatsApp, preencher um formulário ou solicitar um orçamento.',
  },
  {
    id: 'diferenca-site-tradicional',
    question: 'Qual a diferença entre uma landing page e um site tradicional?',
    answer:
      'Um site tradicional costuma reunir muitas páginas e conteúdos institucionais. A landing page concentra as informações essenciais em uma única página, com hierarquia pensada para que o visitante encontre rapidamente o que procura e saiba como falar com você.',
  },
  {
    id: 'quanto-custa',
    question: 'Quanto custa desenvolver uma landing page?',
    answer:
      'O investimento varia conforme o escopo, a quantidade de seções, os recursos necessários e os serviços contratados, como hospedagem e manutenção. Por isso, cada projeto recebe uma proposta específica após a primeira conversa.',
  },
  {
    id: 'prazo',
    question: 'Quanto tempo leva o desenvolvimento?',
    answer:
      'O prazo depende da complexidade do projeto, da disponibilidade dos materiais da marca e do ritmo de retorno nas etapas de revisão. O cronograma estimado é apresentado junto com a proposta.',
  },
  {
    id: 'funciona-celulares',
    question: 'O site funciona em celulares?',
    answer:
      'Sim. Todos os projetos são desenvolvidos com layout responsivo e testados em celulares, tablets e computadores, garantindo boa leitura, navegação confortável e botões acessíveis em telas pequenas.',
  },
  {
    id: 'hospedagem-incluida',
    question: 'A hospedagem está incluída?',
    answer:
      'A publicação e a configuração de hospedagem podem ser contratadas como parte do projeto. A forma de contratação, os custos recorrentes e as responsabilidades de cada parte são descritos na proposta comercial.',
  },
  {
    id: 'alteracoes-apos-publicacao',
    question: 'Posso solicitar alterações depois da publicação?',
    answer:
      'Sim, é possível solicitar ajustes após a publicação. As revisões previstas no escopo inicial são combinadas antes do início do trabalho, e alterações adicionais podem ser orçadas separadamente.',
  },
  {
    id: 'dominio-proprio',
    question: 'Preciso ter um domínio próprio?',
    answer:
      'Não é obrigatório para começar, mas ter um domínio próprio transmite mais credibilidade e profissionalismo. Caso ainda não possua um, a configuração pode ser orientada durante o projeto.',
  },
]
