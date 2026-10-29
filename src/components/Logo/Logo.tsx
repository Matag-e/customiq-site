import { site } from '../../config/site'
import styles from './Logo.module.css'

interface LogoProps {
  /** `light` inverte a assinatura para uso sobre fundos escuros. */
  tone?: 'default' | 'inverse'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Assinatura da marca.
 * Quando o arquivo oficial do logotipo estiver configurado em
 * `site.logo.src`, ele é utilizado exatamente como fornecido — sem
 * redesenho, distorção ou alteração de cor. Enquanto o arquivo não existir,
 * a marca é apresentada apenas como palavra tipográfica, sem criar símbolo.
 */
export function Logo({ tone = 'default', size = 'md', className }: LogoProps) {
  const classes = [styles.logo, styles[size], styles[tone], className]
    .filter(Boolean)
    .join(' ')

  if (site.logo.src) {
    return (
      <img
        className={classes}
        src={site.logo.src}
        alt={site.logo.alt}
        width={220}
        height={48}
        decoding="async"
      />
    )
  }

  return (
    <span className={classes} aria-label={site.logo.alt} role="img">
      {site.wordmark}
    </span>
  )
}
