import { useCallback, useState } from 'react'
import { Reveal } from '../../components/Reveal/Reveal'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { faqItems } from '../../data/faq'
import styles from './Faq.module.css'

/**
 * Perguntas frequentes em acordeão acessível:
 * cada item é controlado por um botão com `aria-expanded` e o painel
 * correspondente é associado por `aria-controls`/`aria-labelledby`.
 */
export function Faq() {
  const [openIds, setOpenIds] = useState<readonly string[]>([])

  const toggle = useCallback((id: string) => {
    setOpenIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }, [])

  return (
    <section
      className={`section ${styles.faq}`}
      id="perguntas-frequentes"
      data-theme="soft"
      aria-labelledby="faq-titulo"
    >
      <div className={`shell ${styles.grid}`}>
        <div className={styles.intro}>
          <SectionHeading
            index="07"
            eyebrow="Perguntas frequentes"
            headingId="faq-titulo"
            title="Dúvidas comuns antes de começar."
            description={
              <p>
                Prazos, valores e condições variam conforme o escopo de cada
                projeto e são sempre definidos em proposta.
              </p>
            }
          />
        </div>

        <ul className={styles.list}>
          {faqItems.map((item, index) => {
            const isOpen = openIds.includes(item.id)
            const panelId = `faq-panel-${item.id}`
            const buttonId = `faq-botao-${item.id}`

            return (
              <Reveal as="li" className={styles.item} key={item.id} delay={index * 40}>
                <h3 className={styles.questionWrapper}>
                  <button
                    type="button"
                    id={buttonId}
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                  >
                    <span className={styles.questionText}>{item.question}</span>
                    <span className={styles.toggle} aria-hidden="true">
                      <span className={styles.toggleBar} />
                      <span className={styles.toggleBarVertical} />
                    </span>
                  </button>
                </h3>

                <div
                  className={styles.panel}
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  data-open={isOpen ? 'true' : 'false'}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
