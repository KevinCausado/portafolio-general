<template>
  <main class="flex flex-col flex-auto lg:flex-row overflow-hidden">

    <div id="mobile-page-title">
      <h2>_proyectos</h2>
    </div>

    <!-- section title (mobile) -->
    <div id="section-content-title" class="flex lg:hidden" @click="showFilters = !showFilters">
      <img :class="showFilters ? 'section-arrow rotate-90' : 'section-arrow'" src="/icons/arrow.svg">
      <span class="font-fira_regular text-white text-sm">proyectos</span>
    </div>

    <div v-if="showFilters" id="filter-menu"
      class="w-full flex-col border-right font-fira_regular text-menu-text lg:flex">
      <!-- title -->
      <div id="section-content-title" class="hidden lg:flex items-center min-w-full">
        <img id="section-arrow-menu" src="/icons/arrow.svg" alt="" class="section-arrow mx-3">
        <p class="font-fira_regular text-white text-sm">proyectos</p>
      </div>

      <!-- filter menu -->
      <nav id="filters" class="w-full flex-col">

        <div v-for="tech in techs" :key="tech.name" class="flex items-center py-2">
          <input type="checkbox" :id="tech.name" v-model="tech.checked">
          <img :src="baseURL + 'icons/techs/' + tech.icon + '.svg'" :alt="tech.name" class="tech-icon w-5 h-5 mx-4" :class="{ active: tech.checked }">
          <label :for="tech.name" :class="{ 'text-white': tech.checked }">{{ tech.name }}</label>
        </div>
      </nav>
    </div>

    <!-- content -->

    <div class="flex flex-col w-full overflow-hidden">

      <!-- windows tab -->
      <div class="tab-height w-full hidden lg:flex border-bot items-center">
        <div class="flex items-center border-right h-full">
          <p v-for="filter in activeFilters" :key="filter" class="font-fira_regular text-menu-text text-sm px-3">{{ filter }};
          </p>
          <img src="/icons/close.svg" alt="" class="m-3">
        </div>
      </div>

      <!-- windows tab mobile -->
      <div id="tab" class="flex lg:hidden items-center">
        <span class="text-white"> // </span>
        <p class="font-fira_regular text-white text-sm px-3">proyectos</p>
        <span class="text-menu-text"> / </span>
        <p v-for="filter in activeFilters" :key="filter" class="font-fira_regular text-menu-text text-sm px-3">{{ filter }};
        </p>
      </div>

      <!-- projects -->
      <div v-if="filteredProjects.length > 0" id="projects-case" class="grid grid-cols-1 lg:grid-cols-2 max-w-full h-full overflow-scroll lg:self-center">
        <project-card v-for="(project, index) in filteredProjects" :key="index" :index="index" :project="project" />
      </div>
      <div v-else class="flex flex-col font-fira_retina text-menu-text my-5 h-full justify-center items-center">
        <span class="flex justify-center text-4xl pb-3">X__X</span>
        <span class="text-white flex justify-center text-xl">No se encontraron proyectos</span>
        <span class="flex justify-center">para estas tecnologías</span>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import DevConfig from '~/developer.json';

const runtimeConfig = useRuntimeConfig()
const baseURL = runtimeConfig.app.baseURL || '/'

useHead({ title: 'Proyectos | Kevin Causado' })

const techs = reactive([
  { name: 'Vue', icon: 'vue', checked: false },
  { name: 'Angular', icon: 'angular', checked: false },
  { name: 'React', icon: 'react', checked: false },
  { name: 'Nuxt.js', icon: 'nuxtjs', checked: false },
  { name: 'Node.js', icon: 'nodejs', checked: false },
  { name: 'Express.js', icon: 'expressjs', checked: false },
  { name: 'TypeScript', icon: 'typescript', checked: false },
  { name: 'Supabase', icon: 'supabase', checked: false },
  { name: 'PostgreSQL', icon: 'postgresql', checked: false },
  { name: 'Tailwind CSS', icon: 'tailwindcss', checked: false },
  { name: 'Pinia', icon: 'pinia', checked: false },
])

const showFilters = ref(true)

const activeFilters = computed(() => {
  const selected = techs.filter(t => t.checked).map(t => t.name)
  return selected.length > 0 ? selected : ['all']
})

const filteredProjects = computed(() => {
  const allProjects = Object.values(DevConfig.projects)
  if (activeFilters.value[0] === 'all') return allProjects
  return allProjects.filter(project =>
    activeFilters.value.some(filter => project.tech.includes(filter))
  )
})

</script>

<style>
#filters {
  padding: 10px 25px;
}

#tab {
  padding: 25px 25px 5px;
  flex-wrap: wrap;
}

.tech-icon {
  opacity: 0.4;
}

.tech-icon.active {
  opacity: 1;
}

#view-button {
  background-color: #1C2B3A;
}

#view-button:hover {
  background-color: #263B50;
}

input[type="checkbox"] {
  appearance: none;
  background-color: transparent;
  width: 1.15em;
  height: 1.15em;
  border: 2px solid currentColor;
  border-radius: 0.15em;
  margin-top: 1px;
}

input[type="checkbox"]:checked {
  background-color: currentColor;
  background-image: url("data:image/svg+xml;utf8,<svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.38587 7.2802L11.9718 0.693573L12.9856 1.70668L5.38587 9.30641L0.826172 4.74671L1.83928 3.73361L5.38587 7.2802Z' fill='white'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
}

input[type="checkbox"]:checked:hover {
  box-shadow: #607b968b 0px 0px 0px 2px;
}

input[type="checkbox"]:not(:checked) {
  border-color: currentColor;
}

input[type="checkbox"]:hover {
  cursor: pointer;
  background-color: currentColor;
  background-image: url("data:image/svg+xml;utf8,<svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.38587 7.2802L11.9718 0.693573L12.9856 1.70668L5.38587 9.30641L0.826172 4.74671L1.83928 3.73361L5.38587 7.2802Z' fill='white'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: #607b968b 0px 0px 0px 2px;
}

input[type="checkbox"]:hover:not(:checked) {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
  background-image: none;
  box-shadow: #607b968b 0px 0px 0px 2px;
}

input[type="checkbox"]:focus {
  box-shadow: none;
}

@media (max-width: 768px) {
  #projects-case {
    padding: 0px 25px 40px;
  }

}

@media (min-width: 768px) {
  #projects-case {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 50px 50px 40px;
  }
}

@media (min-width: 1350px) {
  #projects-case {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 50px 80px 40px;
    /* padding: 100px 100px 40px; */
  }
}

@keyframes animateToBottom {
  from {
    transform: translate3d(0, -200px, 0);
  }

  to {
    transform: translate3d(0, 10px, 0);
  }
}
</style>
