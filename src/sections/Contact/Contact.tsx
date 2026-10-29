import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Reveal } from '../../components/Reveal/Reveal'
import {
  formEndpoints,
  getContactChannels,
  isContactFormEnabled,
  site,
} from '../../config/site'
import styles from './Contact.module.css'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface FormValues {
  nome: string
  email: string
  telefone: string
  mensagem: string
  consentimento: boolean
  /** Campo armadilha antispam: permanece vazio para visitantes reais. */
  gotcha: string
}

type FieldErrors = Partial<Record<'nome' | 'email' | 'telefone' | 'mensagem' | 'consentimento', string>>

const initialValues: FormValues = {
  nome: '',
  email: '',
  telefone: '',
  mensagem: '',
  consentimento: false,
  gotcha: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}

  if (values.nome.trim().length < 2) {
    errors.nome = 'Informe seu nome.'
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Informe um e-mail válido.'
  }

  const digits = values.telefone.replace(/\D/g, '')
  if (values.telefone.trim() && digits.length < 10) {
    errors.telefone = 'Informe o telefone com DDD.'
  }

  if (values.mensagem.trim().length < 10) {
    errors.mensagem = 'Descreva brevemente o que você precisa.'
  }

  if (!values.consentimento) {
    errors.consentimento = 'É necessário autorizar o contato para enviar.'
  }

  return errors
}

/**
 * Seção de contato e conversão.
 * O formulário só envia dados quando existe um endpoint real configurado em
 * `src/config/site.ts`. Sem endpoint, a interface permanece visível, porém
 * desativada — nenhum envio é simulado.
 */
export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const channels = useMemo(() => getContactChannels(), [])
  const formEnabled = isContactFormEnabled()

  const hasChannels = channels.length > 0

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const target = event.target
    const name = target.name as keyof FormValues
    const isCheckbox =
      target instanceof HTMLInputElement && target.type === 'checkbox'

    setValues((current) => {
      const next: FormValues = { ...current }

      if (name === 'consentimento') {
        next.consentimento = Boolean(isCheckbox && target.checked)
      } else if (name === 'gotcha') {
        next.gotcha = target.value
      } else {
        next[name] = target.value
      }

      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!formEnabled) return

    // Proteção antispam: envios com o campo armadilha preenchido são ignorados.
    if (values.gotcha) return

    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      setStatus('error')
      setFeedback('Revise os campos destacados para concluir o envio.')
      const field = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstError}"]`,
      )
      field?.focus()
      return
    }

    setStatus('submitting')
    setFeedback('')

    try {
      const response = await fetch(formEndpoints.contactEndpoint as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nome: values.nome.trim(),
          email: values.email.trim(),
          telefone: values.telefone.trim(),
          mensagem: values.mensagem.trim(),
          origem: site.name,
        }),
      })

      if (!response.ok) {
        throw new Error(`Falha no envio (${response.status})`)
      }

      setValues(initialValues)
      setStatus('success')
      setFeedback(
        'Mensagem enviada com sucesso. Obrigado pelo contato — retornaremos em breve.',
      )
    } catch {
      setStatus('error')
      setFeedback(
        'Não foi possível enviar a mensagem agora. Tente novamente em instantes ou utilize um dos canais de contato.',
      )
    }
  }

  const isSubmitting = status === 'submitting'

  return (
    <section
      className={`section ${styles.contact}`}
      id="contato"
      data-theme="dark"
      aria-labelledby="contato-titulo"
    >
      <div className={`shell ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>08</span>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Contato
          </p>

          <h2 className={styles.title} id="contato-titulo">
            Sua próxima grande impressão começa aqui.
          </h2>

          <p className={styles.lead}>
            Conte um pouco sobre o seu negócio e descubra como podemos construir
            uma presença digital alinhada à sua marca.
          </p>

          <div className={styles.channels}>
            <h3 className={styles.channelsTitle}>Canais diretos</h3>
            {hasChannels ? (
              <ul className={styles.channelsList}>
                {channels.map((channel) => (
                  <li key={channel.key}>
                    <a
                      className={styles.channel}
                      href={channel.href}
                      {...(channel.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <span className={styles.channelLabel}>{channel.label}</span>
                      <span className={styles.channelValue}>{channel.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.channelsEmpty}>
                Os canais oficiais de contato serão publicados assim que estiverem
                configurados.
              </p>
            )}

            {formEndpoints.briefingFormUrl && (
              <p className={styles.briefing}>
                Já conversamos sobre o projeto?{' '}
                <a
                  className={styles.briefingLink}
                  href={formEndpoints.briefingFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Preencha o briefing detalhado
                </a>
                .
              </p>
            )}
          </div>
        </div>

        <Reveal className={styles.formWrapper} delay={120}>
          <h3 className={styles.formTitle}>Solicitar orçamento</h3>

          {!formEnabled && (
            <p className={styles.formNotice} id="form-aviso">
              {hasChannels
                ? 'O envio pelo formulário será ativado assim que o serviço de recebimento estiver configurado. Enquanto isso, utilize um dos canais diretos ao lado.'
                : 'O envio pelo formulário será ativado assim que o serviço de recebimento estiver configurado.'}
            </p>
          )}

          <form
            ref={formRef}
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-describedby={!formEnabled ? 'form-aviso' : undefined}
          >
            <fieldset className={styles.fieldset} disabled={!formEnabled}>
              <legend className="visually-hidden">
                Formulário de solicitação de orçamento
              </legend>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contato-nome">
                  Nome <span className={styles.required}>*</span>
                </label>
                <input
                  className={styles.input}
                  id="contato-nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  value={values.nome}
                  onChange={updateField}
                  aria-invalid={errors.nome ? 'true' : undefined}
                  aria-describedby={errors.nome ? 'erro-nome' : undefined}
                />
                {errors.nome && (
                  <p className={styles.error} id="erro-nome">
                    {errors.nome}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contato-email">
                  E-mail <span className={styles.required}>*</span>
                </label>
                <input
                  className={styles.input}
                  id="contato-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={updateField}
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'erro-email' : undefined}
                />
                {errors.email && (
                  <p className={styles.error} id="erro-email">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contato-telefone">
                  WhatsApp <span className={styles.optional}>(opcional)</span>
                </label>
                <input
                  className={styles.input}
                  id="contato-telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  value={values.telefone}
                  onChange={updateField}
                  aria-invalid={errors.telefone ? 'true' : undefined}
                  aria-describedby={errors.telefone ? 'erro-telefone' : undefined}
                />
                {errors.telefone && (
                  <p className={styles.error} id="erro-telefone">
                    {errors.telefone}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contato-mensagem">
                  Sobre o seu negócio <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  id="contato-mensagem"
                  name="mensagem"
                  rows={5}
                  value={values.mensagem}
                  onChange={updateField}
                  placeholder="O que o seu negócio faz e o que você espera da página."
                  aria-invalid={errors.mensagem ? 'true' : undefined}
                  aria-describedby={errors.mensagem ? 'erro-mensagem' : undefined}
                />
                {errors.mensagem && (
                  <p className={styles.error} id="erro-mensagem">
                    {errors.mensagem}
                  </p>
                )}
              </div>

              {/* Campo armadilha antispam — oculto para visitantes reais. */}
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="contato-gotcha">Não preencha este campo</label>
                <input
                  id="contato-gotcha"
                  name="gotcha"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.gotcha}
                  onChange={updateField}
                />
              </div>

              <div className={styles.consent}>
                <input
                  className={styles.checkbox}
                  id="contato-consentimento"
                  name="consentimento"
                  type="checkbox"
                  checked={values.consentimento}
                  onChange={updateField}
                  aria-invalid={errors.consentimento ? 'true' : undefined}
                  aria-describedby={
                    errors.consentimento ? 'erro-consentimento' : undefined
                  }
                />
                <label className={styles.consentLabel} htmlFor="contato-consentimento">
                  Autorizo o contato e o uso dos dados enviados exclusivamente para
                  responder a esta solicitação.
                </label>
              </div>
              {errors.consentimento && (
                <p className={styles.error} id="erro-consentimento">
                  {errors.consentimento}
                </p>
              )}

              <button
                className={styles.submit}
                type="submit"
                disabled={isSubmitting || !formEnabled}
              >
                <span>
                  {isSubmitting ? 'Enviando…' : formEnabled ? 'Enviar mensagem' : 'Envio em configuração'}
                </span>
                <span className={styles.submitMark} aria-hidden="true" />
              </button>
            </fieldset>

            <p
              className={styles.feedback}
              data-status={status}
              role="status"
              aria-live="polite"
            >
              {feedback}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
