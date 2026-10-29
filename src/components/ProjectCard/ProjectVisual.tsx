import type { Project, ProjectComposition } from '../../data/projects'
import styles from './ProjectVisual.module.css'

interface ProjectVisualProps {
  project: Project
  /** Classes de composição por projeto, indexadas pela variante. */
  variant: ProjectComposition
}

/**
 * Área visual do card de portfólio.
 * Enquanto a imagem real do projeto não estiver configurada em
 * `projects.ts`, é exibida uma composição geométrica monocromática original
 * — nunca uma imagem genérica apresentada como projeto verdadeiro.
 */
export function ProjectVisual({ project, variant }: ProjectVisualProps) {
  if (project.image) {
    return (
      <figure className={styles.frame}>
        <img
          className={styles.image}
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
        />
      </figure>
    )
  }

  return (
    <figure className={styles.frame} aria-hidden="true">
      <div className={`${styles.composition} ${styles[variant]}`}>
        <span className={styles.grid} />
        <span className={styles.shapePrimary} />
        <span className={styles.shapeSecondary} />
        <span className={styles.shapeTertiary} />
        <span className={styles.caption}>Prévia visual</span>
      </div>
    </figure>
  )
}
