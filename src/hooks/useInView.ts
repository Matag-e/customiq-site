import { useEffect, useRef, useState } from 'react'

/**
 * Observa um elemento e informa quando ele entra na viewport.
 * O observer é desconectado após a primeira revelação e nunca é criado
 * quando o visitante solicita redução de movimento.
 */
export function useInView<T extends HTMLElement>(options?: {
  threshold?: number
  rootMargin?: string
  once?: boolean
}) {
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = options ?? {}
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}

/**
 * Marca qual seção está visível para destacar o item correspondente
 * na navegação principal.
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveId(visible.target.id)
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 1],
      },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}

/** Bloqueia a rolagem do documento (usado pelo menu mobile). */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    document.body.dataset.scrollLocked = 'true'
    return () => {
      delete document.body.dataset.scrollLocked
    }
  }, [locked])
}
