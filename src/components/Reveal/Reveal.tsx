import {
  createElement,
  type ElementType,
  type ReactNode,
  type CSSProperties,
} from 'react'
import { useInView } from '../../hooks/useInView'

interface RevealProps {
  children: ReactNode
  /** Elemento HTML renderizado (padrão: div). */
  as?: ElementType
  /** Atraso da transição em milissegundos, para revelações escalonadas. */
  delay?: number
  className?: string
  id?: string
}

/**
 * Envolve o conteúdo e o revela suavemente quando ele entra na viewport.
 * Respeita `prefers-reduced-motion` — nesse caso o conteúdo é exibido
 * imediatamente, sem animação.
 */
export function Reveal({
  children,
  as = 'div',
  delay = 0,
  className,
  id,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()

  const classes = ['reveal', className].filter(Boolean).join(' ')

  return createElement(
    as,
    {
      ref,
      id,
      className: classes,
      'data-visible': inView ? 'true' : 'false',
      style: { '--reveal-delay': `${delay}ms` } as CSSProperties,
    },
    children,
  )
}
