import { Reveal } from '../../components/Reveal/Reveal'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { differentials } from '../../data/differentials'
import styles from './Differentials.module.css'

/**
 * Diferenciais do trabalho — apenas características verificáveis do método,
 * sem promessas de resultado comercial.
 */
export function Differentials() {
  return (
    <section
      className={`section ${styles.differentials}`}
      id="diferenciais"
      data-theme="soft"
      aria-labelledby="diferenciais-titulo"
    >
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Diferenciais"
          headingId="diferenciais-titulo"
          title="Mais do que estar na internet. É sobre como sua marca se apresenta."
        />

        <ul className={styles.grid}>
          {differentials.map((item, index) => (
            <Reveal as="li" className={styles.item} key={item.id} delay={index * 60}>
              <span className={styles.index}>{item.index}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
