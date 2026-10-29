import { Reveal } from '../../components/Reveal/Reveal'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { processSteps } from '../../data/process'
import styles from './Process.module.css'

/**
 * Sequência editorial das etapas de trabalho — organizada, sem sugerir
 * burocracia desnecessária.
 */
export function Process() {
  return (
    <section
      className={`section ${styles.process}`}
      id="processo"
      aria-labelledby="processo-titulo"
    >
      <div className="shell">
        <SectionHeading
          index="05"
          eyebrow="Processo"
          headingId="processo-titulo"
          title="Um caminho claro do primeiro contato à publicação."
          description={
            <p>
              Sete etapas organizam o projeto e deixam visível em que ponto do
              trabalho você está. O percurso é ajustado conforme o escopo de cada
              negócio.
            </p>
          }
        />

        <ol className={styles.timeline}>
          {processSteps.map((step, index) => (
            <Reveal as="li" className={styles.step} key={step.id} delay={index * 55}>
              <div className={styles.markerColumn}>
                <span className={styles.index}>{step.index}</span>
                <span className={styles.marker} aria-hidden="true" />
              </div>

              <div className={styles.content}>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
