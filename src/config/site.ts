/* =========================================================================
   Configuração central do site.
   -------------------------------------------------------------------------
   TODO dado comercial editável (contatos, links, redes sociais, formulários,
   domínio e informações institucionais) vive neste arquivo.
   Nenhum valor real foi inventado: os campos iniciados como `null`
   permanecem ocultos na interface até serem preenchidos.
   ========================================================================= */

export interface NavItem {
  /** Identificador da seção — corresponde ao `id` do elemento na página. */
  readonly id: string
  /** Rótulo exibido na navegação. */
  readonly label: string
}

export interface SiteInfo {
  readonly name: string
  readonly wordmark: string
  readonly tagline: string
  readonly shortDescription: string
  /** Descrição usada em metadados (SEO/Schema.org). */
  readonly metaDescription: string
  /**
   * URL absoluta do site oficial (ex.: 'https://customiq.com.br').
   * Enquanto estiver vazio, nenhuma tag canonical/CDN absoluta é gerada.
   */
  readonly url: string
  readonly logo: {
    /** Caminho do arquivo oficial do logotipo (ex.: '/images/logo/customiq.svg'). */
    readonly src: '/images/logo/customiq.png'
    readonly alt: 'CustomIQ'
  }
}

export interface WhatsAppChannel {
  /** Número em formato internacional somente dígitos (ex.: '5511999999999'). */
  readonly phone: string | null
  /** Número formatado para exibição (ex.: '+55 (11) 99999-9999'). */
  readonly display: string | null
  /** Mensagem pré-preenchida ao abrir a conversa. */
  readonly defaultMessage: string
}

export interface EmailChannel {
  readonly address: string | null
  readonly display: string | null
}

export interface InstagramChannel {
  readonly profileUrl: string | null
  readonly handle: string | null
}

export interface ContactChannels {
  readonly whatsapp: WhatsAppChannel
  readonly email: EmailChannel
  readonly instagram: InstagramChannel
}

export interface FormEndpoints {
  /**
   * Endpoint responsável pelo envio do formulário comercial de contato.
   * Aceita um serviço de formulários (Formspree, Basin, Web3Forms, etc.) ou
   * uma função serverless. Enquanto estiver vazio, o envio permanece
   * desativado e nenhum sucesso é simulado.
   */
  readonly contactEndpoint: string | null
  /**
   * URL do formulário de briefing detalhado (Tally), usado somente após a
   * primeira negociação. Não substitui o formulário comercial inicial.
   */
  readonly briefingFormUrl: string | null
}

export interface LegalLinks {
  readonly privacyPolicyUrl: string | null
}

/* -------------------------------------------------------------------------
   Identidade institucional
   ------------------------------------------------------------------------- */

export const site: SiteInfo = {
  name: 'CustomIQ',
  wordmark: 'CustomIQ',
  tagline: 'Estúdio digital independente',
  shortDescription:
    'Estúdio digital independente que desenvolve landing pages personalizadas, responsivas e alinhadas à identidade de cada negócio.',
  metaDescription:
    'A CustomIQ desenvolve landing pages personalizadas, responsivas e alinhadas à identidade do seu negócio. Conheça os projetos, os serviços e solicite um orçamento.',
  url: '',
  logo: {
    // Insira aqui o arquivo oficial do logotipo, ex.: '/images/logo/customiq.svg'.
    // Enquanto não houver arquivo, a marca é exibida apenas como assinatura tipográfica.
    src: '/images/logo/customiq.png',
    alt: 'CustomIQ',
  },
}

/* -------------------------------------------------------------------------
   Navegação principal
   ------------------------------------------------------------------------- */

export const navigation: readonly NavItem[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'processo', label: 'Processo' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
]

/** Rótulo do CTA comercial, reutilizado em header, hero e demais seções. */
export const primaryCtaLabel = 'Solicitar orçamento'

/* -------------------------------------------------------------------------
   Canais de contato — preencher apenas com dados reais
   ------------------------------------------------------------------------- */

export const contacts: ContactChannels = {
  whatsapp: {
    phone: '1991814636',
    display: '+55 (11) 99181-4636',
    defaultMessage:
      'Olá! Gostaria de solicitar um orçamento para uma landing page.',
  },
  email: {
    address: 'customiqstudio@gmail.com',
    display: 'customiqstudio@gmail.com',
  },
  instagram: {
    profileUrl: 'https://instagram.com/customiqstudio',
    handle: '@customiqstudio',
  },
}

export const formEndpoints: FormEndpoints = {
  contactEndpoint: null,
  briefingFormUrl: null,
}

export const legal: LegalLinks = {
  privacyPolicyUrl: null,
}

/* -------------------------------------------------------------------------
   Helpers derivados — evitam links quebrados e dados fictícios na interface
   ------------------------------------------------------------------------- */

export interface ResolvedChannel {
  readonly key: 'whatsapp' | 'email' | 'instagram'
  readonly label: string
  readonly value: string
  readonly href: string
  readonly external: boolean
}

/** Link de WhatsApp somente quando o número estiver configurado. */
export function getWhatsAppUrl(): string | null {
  const { phone, defaultMessage } = contacts.whatsapp
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  if (!digits) return null
  const base = `https://wa.me/${digits}`
  return defaultMessage ? `${base}?text=${encodeURIComponent(defaultMessage)}` : base
}

/** Link de e-mail somente quando o endereço estiver configurado. */
export function getEmailUrl(): string | null {
  const { address } = contacts.email
  if (!address) return null
  const subject = 'Solicitação de orçamento — CustomIQ'
  const body = 'Olá! Gostaria de falar sobre um projeto de landing page.'
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Lista apenas os canais realmente configurados. */
export function getContactChannels(): readonly ResolvedChannel[] {
  const channels: ResolvedChannel[] = []

  const whatsappUrl = getWhatsAppUrl()
  if (whatsappUrl) {
    channels.push({
      key: 'whatsapp',
      label: 'WhatsApp comercial',
      value: contacts.whatsapp.display ?? contacts.whatsapp.phone ?? '',
      href: whatsappUrl,
      external: true,
    })
  }

  const emailUrl = getEmailUrl()
  if (emailUrl) {
    channels.push({
      key: 'email',
      label: 'E-mail profissional',
      value: contacts.email.display ?? contacts.email.address ?? '',
      href: emailUrl,
      external: false,
    })
  }

  const { instagram } = contacts
  if (instagram.profileUrl) {
    channels.push({
      key: 'instagram',
      label: 'Instagram',
      value: instagram.handle ?? instagram.profileUrl,
      href: instagram.profileUrl,
      external: true,
    })
  }

  return channels
}

/** O formulário só é funcional quando existe um endpoint de envio real. */
export function isContactFormEnabled(): boolean {
  return Boolean(formEndpoints.contactEndpoint)
}

/** URL pública do site, quando configurada. */
export function getSiteUrl(): string | null {
  if (!site.url) return null
  return site.url.replace(/\/+$/, '')
}
