<template>
  <div class="layout">
    <main class="layout__main">
      <Nuxt />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}

.layout__main {
  padding: 24px 0 48px;
}

@media (min-width: 768px) {
  .layout__main {
    padding: 40px 0 64px;
  }
}
</style>
