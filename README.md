# CustomIQ — Site institucional

Site oficial da **CustomIQ**, estúdio digital independente especializado no
desenvolvimento de landing pages personalizadas e responsivas.

Aplicação de página única (one-page) com navegação por seções, construída em
**React + TypeScript + Vite**, com CSS Modules, HTML semântico e identidade
visual monocromática.

---

## 1. Requisitos

- Node.js 18 ou superior (recomendado: 20 LTS)
- npm 9 ou superior

## 2. Instalação

```bash
npm install
```

## 3. Execução local

```bash
npm run dev
```

Servidor de desenvolvimento em `http://localhost:5173`.

## 4. Build de produção

```bash
npm run build
```

Gera a pasta `dist/` pronta para publicação.

Para conferir o resultado do build localmente:

```bash
npm run preview
```

Verificação de tipos isolada:

```bash
npm run typecheck
```

---

## 5. Estrutura do projeto

```text
customiq/
├── public/
│   ├── favicon/               # favicon provisório (substituir pelo oficial)
│   ├── images/                # imagens do site (logo, projetos, OG image)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── _headers               # cabeçalhos de segurança e cache (Cloudflare Pages)
├── src/
│   ├── components/
│   │   ├── Button/            # botão único da marca (link ou botão)
│   │   ├── Footer/
│   │   ├── Header/            # navegação fixa + menu mobile
│   │   ├── Logo/              # assinatura da marca
│   │   ├── ProjectCard/       # card + visual do portfólio
│   │   ├── Reveal/            # revelação suave por scroll
│   │   └── SectionHeading/    # cabeçalho padrão das seções
│   ├── config/
│   │   └── site.ts            # ⚙️ contatos, links, formulários, navegação, SEO
│   ├── data/
│   │   ├── differentials.ts   # diferenciais
│   │   ├── faq.ts             # perguntas frequentes
│   │   ├── process.ts         # etapas do processo
│   │   ├── projects.ts        # ⚙️ portfólio
│   │   └── services.ts        # serviços
│   ├── hooks/                 # useInView, useSiteMetadata, scroll lock
│   ├── sections/              # Hero, Intro, Portfolio, Services, Differentials,
│   │                          # Process, About, Faq, Contact
│   ├── styles/
│   │   ├── tokens.css         # paleta, tipografia, espaçamento, movimento
│   │   └── global.css         # reset, utilitários e classes de acessibilidade
│   ├── App.tsx
│   └── main.tsx
├── index.html                 # metadados, Open Graph e fontes
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

**Regra do projeto:** nenhum dado comercial (contato, link, preço, URL de
projeto) é escrito dentro dos componentes. Tudo fica em `src/config/site.ts` ou
em `src/data/`.

---

## 6. O que precisa ser preenchido antes de publicar

O site foi entregue **sem nenhum dado fictício**. Os itens abaixo estão
deliberadamente vazios e ficam ocultos na interface até serem configurados.

### 6.1 Contatos — `src/config/site.ts`

```ts
export const contacts = {
  whatsapp: {
    phone: '5511999999999',        // somente dígitos, com DDI + DDD
    display: '+55 (11) 99999-9999', // como será exibido
    defaultMessage: 'Olá! Gostaria de solicitar um orçamento para uma landing page.',
  },
  email: {
    address: 'contato@seudominio.com.br',
    display: 'contato@seudominio.com.br',
  },
  instagram: {
    profileUrl: 'https://instagram.com/seuperfil',
    handle: '@seuperfil',
  },
}
```

Enquanto um canal estiver como `null`, ele não é exibido — nenhum link quebrado
é renderizado.

### 6.2 Domínio oficial — `src/config/site.ts`

```ts
export const site = {
  // ...
  url: 'https://customiq.com.br',
}
```

Com o domínio informado, a aplicação passa a gerar automaticamente as tags
`canonical`, `og:url` e os dados estruturados com URL absoluta.
Atualize também `public/robots.txt` e `public/sitemap.xml`, que usam um domínio
de exemplo.

### 6.3 Logotipo oficial — `src/config/site.ts`

Coloque o arquivo em `public/images/logo/` e informe o caminho:

```ts
logo: {
  src: '/images/logo/customiq.svg',
  alt: 'CustomIQ',
},
```

O arquivo é usado exatamente como fornecido: sem redesenho do símbolo, alteração
de tipografia, efeitos ou cores. Enquanto não houver arquivo, a marca é exibida
apenas como assinatura tipográfica (`site.wordmark`), sem inventar símbolo.

Substitua também `public/favicon/favicon.svg` pelo favicon oficial e adicione a
imagem de compartilhamento em `public/images/og/customiq-og.png` (1200×630).

### 6.4 Projetos do portfólio — `src/data/projects.ts`

Para cada projeto, informe a imagem e o endereço da demonstração:

```ts
{
  id: 'aurora-estetica',
  // ...
  href: 'https://demo.seudominio.com.br/aurora-estetica', // ou null
  image: '/images/projects/aurora-estetica.jpg',          // ou null
  imageAlt: 'Página inicial do projeto Aurora Estética',
}
```

- `image: null` → é exibida uma composição geométrica monocromática original
  (nunca uma imagem genérica apresentada como projeto real).
- `href: null` → o botão "Visualizar projeto" dá lugar ao aviso
  "Demonstração em breve", em vez de um link fictício.

Para adicionar um quarto projeto, basta incluir um novo objeto no array e
escolher uma das composições provisórias (`aurora`, `vertice`, `atlas`) ou
já informar a imagem real.

### 6.5 Formulário de contato — `src/config/site.ts`

O formulário **não simula envio**. Ele só é ativado quando existe um endpoint
real de recebimento:

```ts
export const formEndpoints = {
  contactEndpoint: 'https://formspree.io/f/SEU_ID', // ou Web3Forms, Basin, etc.
  briefingFormUrl: 'https://tally.so/r/SEU_FORMULARIO',
}
```

Procedimento de ativação:

1. Crie um formulário em um serviço de recebimento (Formspree, Web3Forms, Basin,
   Getform ou função serverless própria) que aceite `POST` em JSON.
2. O endpoint precisa responder com status `2xx` em caso de sucesso.
3. Informe a URL em `contactEndpoint`.
4. Confirme que os campos enviados (`nome`, `email`, `telefone`, `mensagem`,
   `origem`) são aceitos pelo serviço.
5. Publique e envie um teste real. A mensagem de sucesso só aparece após uma
   resposta `2xx` do serviço.

Enquanto `contactEndpoint` estiver `null`, a interface do formulário permanece
visível, porém desativada, com um aviso claro e os canais diretos como
alternativa.

**Antispam:** já existe um campo armadilha oculto (`gotcha`); envios com esse
campo preenchido são descartados. Se o serviço escolhido oferecer captcha
(Turnstile, hCaptcha), ele pode ser adicionado dentro do `fieldset` do
formulário em `src/sections/Contact/Contact.tsx`.

**Importante:** nunca coloque chaves secretas ou tokens privados no front-end.
Endpoints públicos de formulário são a única credencial aceitável no cliente.

### 6.6 Formulário de briefing (Tally)

`briefingFormUrl` é um formulário **separado**, usado somente depois da primeira
negociação, e não substitui o formulário comercial inicial. Quando configurado,
aparece como um link discreto na seção de contato.

---

## 7. Publicação no GitHub

```bash
git init
git add .
git commit -m "Site institucional CustomIQ"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/customiq.git
git push -u origin main
```

## 8. Publicação no Cloudflare Pages

1. Acesse o painel da Cloudflare → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git**.
2. Selecione o repositório do projeto.
3. Configure o build:

   | Configuração          | Valor           |
   | --------------------- | --------------- |
   | Framework preset      | `Vite`          |
   | Build command         | `npm run build` |
   | Build output directory| `dist`          |
   | Node version          | `20` (variável `NODE_VERSION`) |

4. Clique em **Save and Deploy**.
5. Cada `push` na branch `main` gera uma nova publicação automática; outros
   branches geram *preview deployments*.

O arquivo `public/_headers` é copiado para `dist/` e aplica cabeçalhos de
segurança e cache na Cloudflare Pages.

## 9. Domínio próprio

1. No projeto do Cloudflare Pages, abra **Custom domains** → **Set up a domain**.
2. Informe o domínio (ex.: `customiq.com.br`) e siga as instruções de DNS.
3. Se o domínio estiver registrado fora da Cloudflare, aponte o DNS conforme
   indicado pelo painel (registro `CNAME` ou nameservers da Cloudflare).
4. Aguarde a emissão do certificado SSL (automática).
5. Depois de publicado, atualize `site.url` em `src/config/site.ts`,
   `public/robots.txt` e `public/sitemap.xml` com o domínio final e faça um novo
   deploy.

---

## 10. Manutenção do conteúdo

| O que atualizar                | Onde                                                       |
| ------------------------------ | ---------------------------------------------------------- |
| Contatos, redes sociais, links | `src/config/site.ts`                                        |
| Navegação do header/rodapé     | `src/config/site.ts` (`navigation`)                         |
| Projetos do portfólio          | `src/data/projects.ts`                                      |
| Serviços                       | `src/data/services.ts`                                      |
| Diferenciais                   | `src/data/differentials.ts`                                 |
| Etapas do processo             | `src/data/process.ts`                                       |
| Perguntas frequentes           | `src/data/faq.ts`                                           |
| Textos das seções              | arquivos em `src/sections/<Seção>/<Seção>.tsx`              |
| Cores, tipografia, espaçamento | `src/styles/tokens.css`                                     |
| Metadados, Open Graph, fontes  | `index.html`                                                |

### Substituição de imagens

- Logo: `public/images/logo/` → referenciar em `site.logo.src`.
- Projetos: `public/images/projects/` → referenciar em `projects[].image`.
  Sugestão de proporção: **4:3** (ex.: 1600×1200). As imagens são carregadas com
  `loading="lazy"` e `object-fit: cover`.
- Open Graph: `public/images/og/customiq-og.png` (1200×630).
- Favicon: `public/favicon/favicon.svg`.

---

## 11. Identidade visual

- **Paleta monocromática:** `#0B0B0B`, `#FFFFFF`, `#F5F5F3`, `#E8E8E8`,
  `#777777`, `#242424`. Nenhuma outra cor é usada na interface.
- **Tipografia:** Inter (fallback Helvetica Neue / Arial / system-ui), carregada
  via Google Fonts com `display=swap`.
- **Acessibilidade:** HTML semântico, navegação por teclado, foco visível,
  contraste adequado, textos alternativos, FAQ com `aria-expanded`/`aria-controls`
  e respeito a `prefers-reduced-motion`.
- **Movimento:** revelações suaves por scroll, microinterações de hover e faixa
  tipográfica no hero — todas desativadas quando há redução de movimento.

---

## 12. Créditos

Conteúdo, identidade e código desenvolvidos para a CustomIQ.
