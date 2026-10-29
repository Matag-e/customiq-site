import { Logo } from '../Logo/Logo'
import { getContactChannels, legal, navigation, site } from '../../config/site'
import styles from './Footer.module.css'

/**
 * Rodapé institucional.
 * Contatos e links jurídicos só aparecem quando realmente configurados em
 * `src/config/site.ts` — nenhum endereço fictício é renderizado.
 */
export function Footer() {
  const channels = getContactChannels()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer} id="rodape">
      <div className={`shell ${styles.inner}`}>
        <div className={styles.brandColumn}>
          <Logo tone="inverse" size="lg" />
          <p className={styles.description}>{site.shortDescription}</p>
          <p className={styles.tagline}>{site.tagline}</p>
        </div>

        <nav className={styles.column} aria-label="Navegação do rodapé">
          <h2 className={styles.columnTitle}>Navegação</h2>
          <ul className={styles.list}>
            {navigation.map((item) => (
              <li key={item.id}>
                <a className={styles.link} href={`#${item.id}`}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a className={styles.link} href="#perguntas-frequentes">
                Perguntas frequentes
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Contato</h2>
          {channels.length > 0 ? (
            <ul className={styles.list}>
              {channels.map((channel) => (
                <li key={channel.key}>
                  <a
                    className={styles.link}
                    href={channel.href}
                    {...(channel.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <span className={styles.linkLabel}>{channel.label}</span>
                    <span className={styles.linkValue}>{channel.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.note}>
              Os canais oficiais de contato serão publicados assim que estiverem
              configurados.
            </p>
          )}
        </div>
      </div>

      <div className={`shell ${styles.base}`}>
        <p className={styles.copyright}>
          © {currentYear} {site.name}. Todos os direitos reservados.
        </p>
        <ul className={styles.legalList}>
          {legal.privacyPolicyUrl && (
            <li>
              <a className={styles.link} href={legal.privacyPolicyUrl}>
                Política de privacidade
              </a>
            </li>
          )}
          <li>
            <a className={styles.link} href="#inicio">
              Voltar ao topo
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
