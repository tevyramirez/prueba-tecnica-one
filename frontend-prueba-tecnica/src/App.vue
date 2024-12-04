<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'

const route = useRoute()
const showAuditLink = ref(false)
const showNavbar = ref(true)
const checkAuditRoute = () => {
  showAuditLink.value = route.path === '/audit'
}

onMounted(checkAuditRoute)
watch(() => route.path, checkAuditRoute)

const checkNavbarVisibility = () => {
  showNavbar.value = route.path !== '/audit'
}

onMounted(checkNavbarVisibility)
watch(() => route.path, checkNavbarVisibility)
</script>

<template>
  <header v-if="showNavbar">
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Calculadora</RouterLink>
        <RouterLink v-if="showAuditLink" to="/audit">Tabla de Auditoría</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.wrapper {
  display: flex;
  place-items: center;
  justify-content: space-between;
  padding: 0 var(--section-gap);
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text-active)

}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color: var(--color-text);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 2rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
@media (max-width: 1023px) {
  header {
    padding: 1rem;
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2rem;
  }

  nav a {
    margin-bottom: 0.5rem;
  }
}
</style>
