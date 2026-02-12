# Developer Portfolio V2 - Kevin Causado Barón

## Project Overview
Portfolio personal de desarrollador construido con **Nuxt 3**, basado en el diseño de @darelova y desarrollado originalmente por @alexdeploy. Personalizado para Kevin Causado Barón.

## Tech Stack
- **Framework:** Nuxt 3.15.4 (Vue 3 Composition API)
- **Styling:** @nuxtjs/tailwindcss 6.13.1 (módulo integrado en Nuxt)
- **Fonts:** Fira Code (todas las variantes: Light, Regular, Retina, Medium, SemiBold, Bold, Variable)
- **Animations:** AOS (Animate On Scroll) + CSS keyframes (typewriter)
- **Syntax Highlighting:** highlight.js + @highlightjs/vue-plugin
- **Testing:** Vitest
- **Deploy:** GitHub Pages (push-dir)

## Commands
- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run generate` — generación de sitio estático (SSG)
- `npm run preview` — preview del build
- `npm run deploy` — deploy a GitHub Pages (rama gh-pages)
- `npm run test` — ejecutar tests con Vitest

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
│   ├── about-me.vue         # Sección About Me con navegación tipo carpetas
│   ├── projects.vue         # Showcase de proyectos con filtro por tecnología
│   └── contact-me.vue       # Formulario de contacto + info
├── public/
│   ├── icons/               # SVGs (social, techs, console, gist, etc.)
│   └── images/projects/     # Screenshots de proyectos
└── utils/
    └── github-api.js        # Integración con GitHub API para Gists
```

## Architecture Notes

### Tailwind CSS
- Configurado via módulo `@nuxtjs/tailwindcss` en nuxt.config.ts
- Config en `tailwind.config.js` (NO .cjs) — contiene colores y fuentes custom
- CSS global en `assets/tailwind.css` — contiene @font-face, borders, media queries
- **NO cambiar a PostCSS directo** — el módulo maneja todo automáticamente

### Data Flow
- `developer.json` es la fuente de datos central. Todos los componentes importan de ahí.
- No hay store global (Pinia/Vuex). Los datos se pasan como props o se importan directamente.

### Layout System
- `app.vue` es el layout real (NO usa `layouts/default.vue`)
- Estructura: `MobileMenu` → `AppHeader` → `NuxtPage` → `AppFooter`
- `AppHeader` solo visible en desktop (lg+: 1024px)
- `MobileMenu` solo visible en mobile/tablet (<1024px)

### Styling Patterns
- Colores custom definidos en `tailwind.config.js`:
  - `bg-dark-background` → #010C15
  - `bg-blue-background` → #011627
  - `text-menu-text` → #85a5c4
  - `text-greenfy` → #43D9AD
  - `text-purplefy` → #799ffb
  - `font-fira_retina`, `font-fira_regular`, etc.
- Borders custom en CSS: `.border-top`, `.border-right`, `.border-bot`, `.border-left` → #1E2D3D
- Color scheme: dark navy background, teal accent (#43D9AD), purple accent (#4D5BCE), orange accent (#FEA55F)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px–1024px
- Desktop: > 1024px
- Large Desktop: > 1920px

### BaseURL
- Configurado como `/portafolio-general/` para GitHub Pages
- Para desarrollo local cambiar a `/` si es necesario

## Conventions
- Idioma de la UI: español
- Componentes usan mezcla de Options API y Composition API (`<script setup>`)
- IDs se usan extensivamente para styling (no ideal, pero es el patrón del proyecto)
- Las páginas usan `<main>` con clases específicas por página (`id="hello"`, `class="page"`)
