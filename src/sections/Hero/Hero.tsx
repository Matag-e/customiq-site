import { Button } from '../../components/Button/Button'
import { Reveal } from '../../components/Reveal/Reveal'
import { primaryCtaLabel, site } from '../../config/site'
import styles from './Hero.module.css'

const heroPillars = [
  { label: 'Landing pages personalizadas' },
  { label: 'Design responsivo' },
  { label: 'Publicação e suporte' },
]

const marqueeWords = [
  'Design',
  'Identidade',
  'Tecnologia',
  'Conversão',
  'Clareza',
]

/**
 * Seção de abertura: título de grande escala, composição geométrica
 * monocromática original e duas chamadas para ação.
 */
export function Hero() {
  return (
    <section
      className={styles.hero}
      id="inicio"
      data-theme="dark"
      aria-labelledby="hero-titulo"
    >
      <div className={styles.frame}>
        <span className={styles.frameGrid} aria-hidden="true" />
        <span className={styles.frameCircle} aria-hidden="true" />
        <span className={styles.frameSquare} aria-hidden="true" />
        <span className={styles.frameLine} aria-hidden="true" />
      </div>

      <div className={`shell ${styles.content}`}>
        <Reveal as="p" className={styles.eyebrow}>
          <span className={styles.eyebrowMark} aria-hidden="true" />
          {site.tagline}
          <span className={styles.eyebrowSeparator} aria-hidden="true" />
          Landing pages sob medida
        </Reveal>

        <h1 className={styles.title} id="hero-titulo">
          Seu negócio merece uma presença digital <em>à altura</em>.
        </h1>

        <div className={styles.support}>
          <Reveal className={styles.lead} delay={120}>
            <p>
              Criamos landing pages personalizadas que unem design, identidade e
              tecnologia para apresentar sua marca de forma profissional.
            </p>

            <div className={styles.actions}>
              <Button href="#projetos" variant="outline" size="lg">
                Conhecer projetos
              </Button>
              <Button href="#contato" size="lg">
                {primaryCtaLabel}
              </Button>
            </div>
          </Reveal>

          <Reveal as="ul" className={styles.pillars} delay={220}>
            {heroPillars.map((pillar) => (
              <li className={styles.pillar} key={pillar.label}>
                <span className={styles.pillarMark} aria-hidden="true" />
                {pillar.label}
              </li>
            ))}
          </Reveal>
        </div>
      </div>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[0, 1].map((pass) => (
            <ul className={styles.marqueeList} key={pass}>
              {marqueeWords.map((word) => (
                <li className={styles.marqueeItem} key={`${pass}-${word}`}>
                  {word}
                  <span className={styles.marqueeDot} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
