import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { useSiteMetadata } from './hooks/useSiteMetadata'
import { About } from './sections/About/About'
import { Contact } from './sections/Contact/Contact'
import { Differentials } from './sections/Differentials/Differentials'
import { Faq } from './sections/Faq/Faq'
import { Hero } from './sections/Hero/Hero'
import { Intro } from './sections/Intro/Intro'
import { Portfolio } from './sections/Portfolio/Portfolio'
import { Process } from './sections/Process/Process'
import { Services } from './sections/Services/Services'

export default function App() {
  useSiteMetadata()

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo principal
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Intro />
        <Portfolio />
        <Services />
        <Differentials />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
