<template>
  <div class="container">
    <div class="card error">
      <p class="error__code">{{ error.statusCode || 500 }}</p>
      <h1 class="error__title">{{ title }}</h1>
      <NuxtLink to="/brands" class="error__link">Back to brands</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: { type: Object, required: true }
  },
  computed: {
    title () {
      if (this.error.statusCode === 404) {
        return this.error.message || 'Page not found'
      }
      return 'Something went wrong'
    }
  },
  head () {
    return { title: this.title }
  }
}
</script>

<style scoped>
.error {
  max-width: 480px;
  margin: 40px auto;
  padding: 40px 24px;
  text-align: center;
}

.error__code {
  font-size: 40px;
  font-weight: 600;
  color: var(--color-primary);
}

.error__title {
  margin: 8px 0 24px;
  font-size: 18px;
  font-weight: 500;
}

.error__link {
  color: var(--color-primary);
  font-weight: 500;
}

.error__link:hover {
  text-decoration: underline;
}
</style>
