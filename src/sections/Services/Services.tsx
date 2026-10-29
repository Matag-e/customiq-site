import { Button } from '../../components/Button/Button'
import { Reveal } from '../../components/Reveal/Reveal'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { primaryCtaLabel } from '../../config/site'
import { services } from '../../data/services'
import styles from './Services.module.css'

/**
 * Serviços em formato de lista editorial.
 * Nenhum preço é divulgado nesta versão: o investimento é definido em
 * proposta, conforme o escopo de cada projeto.
 */
export function Services() {
  return (
    <section
      className={`section ${styles.services}`}
      id="servicos"
      data-theme="dark"
      aria-labelledby="servicos-titulo"
    >
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Serviços"
          headingId="servicos-titulo"
          title="Cada marca tem uma identidade. Seu site também deveria ter."
          description={
            <p>
              O trabalho é organizado em quatro frentes que se complementam, do
              planejamento visual até a publicação da página.
            </p>
          }
        />

        <ol className={styles.list}>
          {services.map((service, index) => (
            <Reveal as="li" className={styles.row} key={service.id} delay={index * 70}>
              <span className={styles.index}>{service.index}</span>

              <div className={styles.main}>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>
              </div>

              <ul className={styles.deliverables}>
                {service.deliverables.map((item) => (
                  <li className={styles.deliverable} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        <Reveal className={styles.footer}>
          <p className={styles.note}>
            Os valores são definidos em proposta, de acordo com o escopo e as
            necessidades de cada negócio.
          </p>
          <Button href="#contato" size="lg">
            {primaryCtaLabel}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
