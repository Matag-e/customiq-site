import type { ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'outline' | 'quiet'

interface BaseProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: 'md' | 'lg'
  className?: string
  /** Rótulo acessível quando o texto visível não descreve a ação. */
  ariaLabel?: string
  disabled?: boolean
  onClick?: () => void
}

interface AnchorProps extends BaseProps {
  href: string
  external?: boolean
  type?: never
}

interface NativeButtonProps extends BaseProps {
  href?: undefined
  external?: never
  type?: 'button' | 'submit'
}

export type ButtonProps = AnchorProps | NativeButtonProps

/**
 * Botão único da marca: mesma geometria, microinteração discreta e
 * foco visível, em versão link ou botão nativo.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    ariaLabel,
    disabled = false,
    onClick,
  } = props

  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (typeof props.href === 'string') {
    const { href, external } = props
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className={styles.label}>{children}</span>
        <span className={styles.marker} aria-hidden="true" />
      </a>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={classes}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={styles.label}>{children}</span>
      <span className={styles.marker} aria-hidden="true" />
    </button>
  )
}
