import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { Reveal } from '../../components/Reveal/Reveal'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { projects } from '../../data/projects'
import styles from './Portfolio.module.css'

/**
 * Portfólio com projetos conceituais.
 * Imagens reais e endereços de demonstração são configurados em
 * `src/data/projects.ts`.
 */
export function Portfolio() {
  const [first, second, third] = projects

  return (
    <section
      className={`section ${styles.portfolio}`}
      id="projetos"
      aria-labelledby="portfolio-titulo"
    >
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="Portfólio"
          headingId="portfolio-titulo"
          title="Projetos que falam por si."
          description={
            <p>
              Uma seleção de projetos conceituais que demonstram como a CustomIQ
              traduz a identidade de cada segmento em uma experiência digital
              própria. As imagens e os endereços de demonstração são publicados
              conforme cada projeto é finalizado.
            </p>
          }
        />

        <div className={styles.grid}>
          <Reveal className={styles.wideItem}>
            <ProjectCard project={first} layout="wide" />
          </Reveal>

          {second && (
            <Reveal className={styles.item} delay={100}>
              <ProjectCard project={second} />
            </Reveal>
          )}

          {third && (
            <Reveal className={styles.item} delay={160}>
              <ProjectCard project={third} />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
