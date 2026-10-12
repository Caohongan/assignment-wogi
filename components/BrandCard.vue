<template>
  <NuxtLink
    :to="`/brands/${brand.id}`"
    class="brand-card card"
    :aria-label="`${brand.name}, ${brand.status}. Issue a gift card`"
  >
    <BrandSummary :brand="brand" heading-tag="h2" />
  </NuxtLink>
</template>

<script>
import BrandSummary from '~/components/BrandSummary.vue'

export default {
  name: 'BrandCard',
  components: { BrandSummary },
  props: {
    brand: { type: Object, required: true }
  }
}
</script>

<style scoped>
.brand-card {
  display: block;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.brand-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

.brand-card:focus-visible {
  box-shadow: var(--focus-ring), var(--shadow-card-hover);
}

@media (prefers-reduced-motion: reduce) {
  .brand-card {
    transition: none;
  }

  .brand-card:hover {
    transform: none;
  }
}
</style>
