<template>
  <div class="brand-summary">
    <div class="brand-summary__logo">
      <img :src="brand.logo" :alt="`${brand.name} logo`" loading="lazy" width="240" height="90">
    </div>

    <div class="brand-summary__head">
      <component :is="headingTag" class="brand-summary__name">{{ brand.name }}</component>
      <StatusBadge :status="brand.status" />
    </div>

    <dl class="brand-summary__stats">
      <div class="brand-summary__stat">
        <dt>Country</dt>
        <dd>{{ brand.country }}</dd>
      </div>
      <div class="brand-summary__stat">
        <dt>Products</dt>
        <dd>{{ brand.products }}</dd>
      </div>
    </dl>
  </div>
</template>

<script>
import StatusBadge from '~/components/StatusBadge.vue'

/**
 * Image, name, status and featured details (country, products) of a brand.
 * Shared by the brand list card and the brand details panel.
 */
export default {
  name: 'BrandSummary',
  components: { StatusBadge },
  props: {
    brand: { type: Object, required: true },
    headingTag: { type: String, default: 'h2' }
  }
}
</script>

<style scoped>
.brand-summary__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  padding: 24px;
  border-bottom: 1px solid var(--color-border);
}

.brand-summary__logo img {
  width: 100%;
  max-width: 220px;
  height: auto;
}

.brand-summary__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
}

.brand-summary__name {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
}

.brand-summary__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0;
}

.brand-summary__stat {
  padding: 10px 8px;
  text-align: center;
}

.brand-summary__stat + .brand-summary__stat {
  border-left: 1px solid var(--color-border);
}

.brand-summary__stat dt {
  font-size: 11px;
  color: var(--color-text-muted);
}

.brand-summary__stat dd {
  font-size: 13px;
}
</style>
