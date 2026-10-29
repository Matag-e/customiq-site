import { Button } from '../Button/Button'
import { projectDisclaimer, projectPendingLabel, type Project } from '../../data/projects'
import { ProjectVisual } from './ProjectVisual'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  /** `wide` ocupa a largura total da grade do portfólio. */
  layout?: 'standard' | 'wide'
  /** Inverte a ordem entre visual e conteúdo em telas largas. */
  reversed?: boolean
}

export function ProjectCard({
  project,
  layout = 'standard',
  reversed = false,
}: ProjectCardProps) {
  const classes = [
    styles.card,
    layout === 'wide' ? styles.wide : null,
    reversed ? styles.reversed : null,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={classes} aria-labelledby={`projeto-${project.id}`}>
      <div className={styles.visualColumn}>
        <ProjectVisual project={project} variant={project.composition} />
        <p className={styles.badge}>{projectDisclaimer}</p>
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          <span className={styles.index}>{project.index}</span>
          <span className={styles.segment}>{project.segment}</span>
        </p>

        <h3 className={styles.name} id={`projeto-${project.id}`}>
          {project.name}
        </h3>

        <p className={styles.description}>{project.description}</p>

        <dl className={styles.details}>
          <div className={styles.detailRow}>
            <dt>Direção visual</dt>
            <dd>{project.visualDirection}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt>Objetivo</dt>
            <dd>{project.objective}</dd>
          </div>
        </dl>

        <div className={styles.action}>
          {project.href ? (
            <Button href={project.href} variant="quiet" external ariaLabel={`Visualizar projeto ${project.name}`}>
              Visualizar projeto
            </Button>
          ) : (
            <p className={styles.pending}>
              <span className={styles.pendingMark} aria-hidden="true" />
              {projectPendingLabel}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
