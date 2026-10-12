<template>
  <div class="container brand-page">
    <NuxtLink to="/brands" class="brand-page__back">
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path d="M13 8H3m4-4L3 8l4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Brands
    </NuxtLink>

    <h1 class="page-title">Issue gift card</h1>

    <div class="brand-page__layout">
      <aside class="brand-page__aside">
        <BrandDetails :brand="brand" />
      </aside>

      <div class="brand-page__main">
        <GiftCardForm
          :brand="brand"
          :disabled="brand.status !== 'active'"
          @submitted="lastIssued = $event"
        />

        <GiftCardSummary
          v-if="lastIssued"
          :key="lastIssued.createdAt"
          :payload="lastIssued"
          @close="lastIssued = null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BrandDetails from '~/components/BrandDetails.vue'
import GiftCardForm from '~/components/GiftCardForm.vue'
import GiftCardSummary from '~/components/GiftCardSummary.vue'
import { fetchBrandById } from '~/services/brandService'

export default {
  name: 'BrandIssuePage',
  components: { BrandDetails, GiftCardForm, GiftCardSummary },

  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },

  async asyncData ({ params, error }) {
    const brand = await fetchBrandById(params.id)
    if (!brand) {
      return error({ statusCode: 404, message: 'Brand not found' })
    }
    return { brand }
  },

  data () {
    return { lastIssued: null }
  },

  head () {
    return { title: `${this.brand.name} - Issue gift card | WOGI` }
  }
}
</script>

<style scoped>
.brand-page__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.brand-page__back:hover {
  color: var(--color-primary);
}

.brand-page__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.brand-page__main {
  display: grid;
  gap: 20px;
  align-content: start;
}

@media (min-width: 900px) {
  .brand-page__layout {
    grid-template-columns: 240px minmax(0, 1fr);
    gap: 28px;
    align-items: start;
    margin-top: 28px;
  }

  .brand-page__aside {
    position: sticky;
    top: 24px;
  }
}

@media (min-width: 1080px) {
  .brand-page__layout {
    grid-template-columns: 260px minmax(0, 1fr);
    gap: 36px;
  }
}
</style>
