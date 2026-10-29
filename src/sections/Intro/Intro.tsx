import { Reveal } from '../../components/Reveal/Reveal'
import styles from './Intro.module.css'

/**
 * Apresentação inicial da CustomIQ — texto curto, sem afirmações
 * que não possam ser sustentadas nesta fase do estúdio.
 */
export function Intro() {
  return (
    <section
      className={`section ${styles.intro}`}
      id="apresentacao"
      data-theme="soft"
      aria-labelledby="apresentacao-titulo"
    >
      <div className={`shell ${styles.grid}`}>
        <Reveal as="div" className={styles.statement}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>01</span>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Apresentação
          </p>
          <h2 className={styles.title} id="apresentacao-titulo">
            Design com propósito. Tecnologia com identidade.
          </h2>
        </Reveal>

        <div className={styles.body}>
          <Reveal as="p" className={styles.paragraph} delay={100}>
            A CustomIQ é um estúdio digital independente dedicado ao
            desenvolvimento de landing pages personalizadas. Cada projeto começa
            pela compreensão do negócio: o que ele oferece, para quem fala e como
            quer ser percebido.
          </Reveal>
          <Reveal as="p" className={styles.paragraph} delay={180}>
            A partir disso, construímos uma página que respeita as características
            da marca, organiza as informações com clareza e conduz o visitante até
            o contato.
          </Reveal>

          <Reveal as="ul" className={styles.markers} delay={260}>
            <li className={styles.marker}>Proximidade no atendimento</li>
            <li className={styles.marker}>Atenção aos detalhes</li>
            <li className={styles.marker}>Decisões técnicas justificadas</li>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
