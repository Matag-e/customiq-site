import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  /** Numeração editorial da seção (ex.: "01"). */
  index?: string
  /** Rótulo curto exibido junto à numeração. */
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  headingId?: string
  /** Nível do heading, para manter a hierarquia correta do documento. */
  level?: 'h2' | 'h3'
  align?: 'start' | 'center'
  className?: string
}

/**
 * Cabeçalho padrão das seções: fio condutor, numeração, título grande
 * e descrição opcional — base do ritmo editorial do site.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  headingId,
  level = 'h2',
  align = 'start',
  className,
}: SectionHeadingProps) {
  const Heading = level

  const classes = [styles.heading, styles[align], className]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={classes}>
      {(index || eyebrow) && (
        <p className={styles.eyebrow}>
          {index && <span className={styles.index}>{index}</span>}
          {index && eyebrow && <span className={styles.slash} aria-hidden="true" />}
          {eyebrow && <span className={styles.eyebrowText}>{eyebrow}</span>}
        </p>
      )}
      <Heading className={styles.title} id={headingId}>
        {title}
      </Heading>
      {description && <div className={styles.description}>{description}</div>}
    </header>
  )
}
