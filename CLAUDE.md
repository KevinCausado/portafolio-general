# Developer Portfolio V2 - Kevin Causado Barón

## Project Overview
Portfolio personal de desarrollador construido con **Nuxt 3**, basado en el diseño de @darelova y desarrollado originalmente por @alexdeploy. Personalizado para Kevin Causado Barón.

**Live:** https://kevincausado.github.io/portafolio-general/
**Repo:** https://github.com/KevinCausado/portafolio-general

## Tech Stack
- **Framework:** Nuxt 3.15.4 (Vue 3 — mezcla de Composition API y Options API)
- **Styling:** @nuxtjs/tailwindcss 6.13.1 (módulo integrado en Nuxt)
- **Fonts:** Fira Code (Light, Regular, Retina, Medium, SemiBold, Bold, Variable)
- **Animations:** AOS (Animate On Scroll) + CSS keyframes (typewriter)
- **Syntax Highlighting:** highlight.js + @highlightjs/vue-plugin
- **Testing:** Vitest
- **Deploy:** GitHub Pages via `push-dir` (genera a `.output/public`, pushea a rama `gh-pages`)

## Commands
- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción (SSR)
- `npm run generate` — generación de sitio estático (SSG) para GitHub Pages
- `npm run preview` — preview del build
- `npm run deploy` — push `.output/public` a rama `gh-pages`
- `npm run test` — ejecutar tests con Vitest

**Deploy completo:** `npm run generate && npm run deploy` + `git push origin main`

## Project Structure
```
├── app.vue                  # Root component (MobileMenu + AppHeader + NuxtPage + AppFooter)
├── developer.json           # ARCHIVO DE DATOS CENTRAL — toda la info del portafolio
├── nuxt.config.ts           # Config de Nuxt (baseURL: /portafolio-general/)
├── tailwind.config.js       # Config de Tailwind CSS (colores, fuentes custom)
├── assets/
│   ├── tailwind.css         # Estilos globales, @font-face, utilidades custom, media queries
│   └── fonts/fira-code/     # Archivos .ttf de Fira Code
├── components/
│   ├── AppHeader.vue        # Navbar desktop (hidden en mobile, visible lg+)
│   ├── AppFooter.vue        # Footer con link a GitHub
│   ├── MobileMenu.vue       # Menú hamburguesa para mobile/tablet (<lg)
│   ├── SnakeGame.vue        # Juego de Snake interactivo (solo desktop)
│   ├── CommentedText.vue    # Texto con números de línea estilo código
│   ├── ContactForm.vue      # Formulario de contacto
│   ├── FormContentCode.vue  # Preview en vivo del formulario como código JS
│   ├── GistSnippet.vue      # Muestra GitHub Gists con syntax highlighting
│   ├── GithubCorner.vue     # Ribbon SVG animado (esquina GitHub)
│   └── ProjectCard.vue      # Tarjeta de proyecto individual
├── layouts/
│   └── default.vue          # Layout wrapper (NO se usa, app.vue maneja el layout)
├── pages/
│   ├── index.vue            # Página Home/Hello con hero + SnakeGame
│   ├── about-me.vue         # Sección About Me con navegación tipo carpetas (Options API)
│   ├── projects.vue         # Showcase de proyectos con filtro por tecnología (Composition API)
│   └── contact-me.vue       # Formulario de contacto + info (Options API)
├── public/
│   ├── icons/               # SVGs (social, techs, console, gist, folder, arrow, etc.)
│   │   └── techs/           # Iconos de tecnologías (vue, angular, react, nodejs, nuxtjs, etc.)
│   └── images/projects/     # Screenshots de proyectos
└── utils/
    └── github-api.js        # Integración con GitHub API para Gists
```

## Architecture Notes

### Tailwind CSS
- Configurado via módulo `@nuxtjs/tailwindcss` en nuxt.config.ts
- Config en `tailwind.config.js` (NO .cjs) — contiene colores y fuentes custom
- CSS global en `assets/tailwind.css` — contiene @font-face, borders, media queries
- **IMPORTANTE: NO cambiar a PostCSS directo** — el módulo maneja todo automáticamente

### Data Flow
- `developer.json` es la fuente de datos central. Todos los componentes importan de ahí.
- No hay store global (Pinia/Vuex). Los datos se pasan como props o se importan directamente.

### Layout System
- `app.vue` es el layout real (NO usa `layouts/default.vue`)
- Estructura: `MobileMenu` → `AppHeader` → `NuxtPage` → `AppFooter`
- `AppHeader` solo visible en desktop (lg+: 1024px)
- `MobileMenu` solo visible en mobile/tablet (<1024px)

### Rutas de imágenes dinámicas (IMPORTANTE)
- Las rutas **estáticas** (`src="/icons/arrow.svg"`) las resuelve Nuxt automáticamente con el baseURL
- Las rutas **dinámicas** (`:src="'/icons/' + name + '.svg'"`) NO se transforman — hay que usar `baseURL` manualmente:
  ```js
  // En <script setup>:
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.app.baseURL || '/'

  // En Options API setup():
  setup() {
    const runtimeConfig = useRuntimeConfig()
    return { baseURL: runtimeConfig.app.baseURL || '/' }
  }

  // En template:
  :src="baseURL + 'icons/' + name + '.svg'"
  ```

### Styling Patterns
- Colores custom definidos en `tailwind.config.js`:
  - `bg-dark-background` → #010C15, `bg-blue-background` → #011627
  - `text-menu-text` → #85a5c4, `text-greenfy` → #43D9AD, `text-purplefy` → #799ffb
  - `font-fira_retina`, `font-fira_regular`, `font-fira_bold`, etc.
- Borders custom en CSS: `.border-top`, `.border-right`, `.border-bot`, `.border-left` → #1E2D3D
- Color scheme: dark navy (#010C15), teal (#43D9AD), purple (#4D5BCE), orange (#FEA55F)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px–1024px
- Desktop: > 1024px (lg)
- Large Desktop: > 1920px

### BaseURL & Deploy
- `baseURL: '/portafolio-general/'` en nuxt.config.ts (para GitHub Pages)
- En dev, Nuxt sirve bajo `/portafolio-general/` también
- Remoto: solo `origin` (GitHub) — no hay gitea
- Rama de deploy: `gh-pages` (generada por `push-dir`)

## Conventions
- Idioma de la UI: español
- Páginas: mezcla de Options API (`about-me.vue`, `contact-me.vue`) y Composition API (`index.vue`, `projects.vue`)
- Componentes: mezcla de Options API (`SnakeGame.vue`) y Composition API (`AppHeader.vue`, `MobileMenu.vue`)
- IDs se usan extensivamente para styling (patrón heredado del proyecto original)
- Las páginas usan `<main>` con clases específicas por página (`id="hello"`, `class="page"`)
- Los iconos SVG de techs usan `fill="#607B96"` (color menu-text) con viewBox ~20x20
