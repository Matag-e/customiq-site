import { useEffect } from 'react'
import { getSiteUrl, site } from '../config/site'

/**
 * Aplica metadados que dependem do domínio oficial.
 * Enquanto `site.url` estiver vazio, nenhuma URL absoluta é gerada —
 * evitando canonical e Open Graph apontando para endereços fictícios.
 */
export function useSiteMetadata(): void {
  useEffect(() => {
    const url = getSiteUrl()
    if (!url) return

    const absolute = `${url}/`

    const link = document.createElement('link')
    link.rel = 'canonical'
    link.href = absolute
    document.head.appendChild(link)

    const ogUrl = document.createElement('meta')
    ogUrl.setAttribute('property', 'og:url')
    ogUrl.content = absolute
    document.head.appendChild(ogUrl)

    const ogImage = document.querySelector<HTMLMetaElement>(
      'meta[property="og:image"]',
    )
    ogImage?.setAttribute('content', `${url}/images/og/customiq-og.png`)

    const structured = document.createElement('script')
    structured.type = 'application/ld+json'
    structured.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.name,
      description: site.metaDescription,
      url: absolute,
    })
    document.head.appendChild(structured)

    return () => {
      link.remove()
      ogUrl.remove()
      structured.remove()
    }
  }, [])
}
