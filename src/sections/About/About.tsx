import { Reveal } from '../../components/Reveal/Reveal'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import styles from './About.module.css'

const focusAreas = [
  'Personalização',
  'Atenção aos detalhes',
  'Clareza',
  'Tecnologia',
  'Qualidade visual',
  'Relacionamento profissional',
]

/**
 * Sobre a CustomIQ — sem inventar equipe, sede física, trajetória
 * ou informações pessoais do fundador.
 */
export function About() {
  return (
    <section
      className={`section ${styles.about}`}
      id="sobre"
      data-theme="dark"
      aria-labelledby="sobre-titulo"
    >
      <div className="shell">
        <SectionHeading
          index="06"
          eyebrow="Sobre"
          headingId="sobre-titulo"
          title="Uma presença digital profissional não deveria ser privilégio de grandes empresas."
        />

        <div className={styles.grid}>
          <div className={styles.body}>
            <Reveal as="p" className={styles.paragraph}>
              A CustomIQ é um estúdio digital independente. Trabalhamos com
              empresas, profissionais autônomos e pequenos negócios que precisam
              apresentar o que fazem com clareza e credibilidade na internet.
            </Reveal>
            <Reveal as="p" className={styles.paragraph} delay={100}>
              Em vez de adaptar o negócio a um modelo pronto, o projeto parte do
              negócio para chegar à página: o conteúdo, a identidade e a
              experiência são definidos a partir do que cada marca tem de
              específico.
            </Reveal>
          </div>

          <Reveal as="div" className={styles.focus} delay={160}>
            <h3 className={styles.focusTitle}>No que o trabalho se apoia</h3>
            <ul className={styles.focusList}>
              {focusAreas.map((area) => (
                <li className={styles.focusItem} key={area}>
                  <span className={styles.focusMark} aria-hidden="true" />
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
