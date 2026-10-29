import { useCallback, useEffect, useRef, useState } from 'react'
import { Logo } from '../Logo/Logo'
import { Button } from '../Button/Button'
import { navigation, primaryCtaLabel } from '../../config/site'
import { useActiveSection, useScrollLock } from '../../hooks/useInView'
import styles from './Header.module.css'

const sectionIds = navigation.map((item) => item.id)

/**
 * Cabeçalho fixo e adaptativo.
 * Sobre a seção inicial (fundo escuro) a navegação usa a versão branca da
 * assinatura; depois da primeira dobra o cabeçalho ganha superfície sólida
 * para garantir contraste em todas as seções seguintes.
 */
export function Header() {
  const [isDetached, setIsDetached] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useActiveSection(sectionIds)
  const panelRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  useScrollLock(menuOpen)

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById(sectionIds[0])
      const threshold = hero ? hero.offsetHeight - 120 : 160
      setIsDetached(window.scrollY > threshold)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        burgerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>('a')
    firstLink?.focus()

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const tone = !isDetached || menuOpen ? 'inverse' : 'default'

  return (
    <header
      className={styles.header}
      data-tone={tone}
      data-detached={isDetached ? 'true' : 'false'}
      data-menu-open={menuOpen ? 'true' : 'false'}
    >
      <div className={`shell ${styles.bar}`}>
        <a className={styles.brand} href="#inicio" onClick={closeMenu}>
          <Logo tone={tone === 'inverse' ? 'inverse' : 'default'} />
          <span className={styles.brandTagline}>Estúdio digital independente</span>
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  className={styles.navLink}
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href="#contato" className={styles.cta}>
            {primaryCtaLabel}
          </Button>

          <button
            ref={burgerRef}
            type="button"
            className={styles.burger}
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.burgerBox} aria-hidden="true">
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-principal"
        ref={panelRef}
        className={styles.panel}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.panelNav} aria-label="Navegação principal (mobile)">
          <ul className={styles.panelList}>
            {navigation.map((item, index) => (
              <li key={item.id}>
                <a
                  className={styles.panelLink}
                  href={`#${item.id}`}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span className={styles.panelIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.panelLabel}>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.panelFooter}>
          <Button
            href="#contato"
            variant="outline"
            size="lg"
            className={styles.panelCta}
            onClick={closeMenu}
          >
            {primaryCtaLabel}
          </Button>
        </div>
      </div>
    </header>
  )
}
