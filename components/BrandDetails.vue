<template>
  <section class="brand-details card" aria-label="Brand details">
    <BrandSummary :brand="brand" heading-tag="h2" />

    <dl class="brand-details__section brand-details__info">
      <div v-for="row in infoRows" :key="row.label" class="brand-details__row">
        <dt>{{ row.label }}</dt>
        <dd>
          <a v-if="row.href" :href="row.href" class="brand-details__link">{{ row.value }}</a>
          <template v-else>
            {{ row.value }}
          </template>
        </dd>
      </div>
    </dl>

    <div v-if="brand.keywords && brand.keywords.length" class="brand-details__section">
      <h3 class="brand-details__label">Keywords</h3>
      <KeywordList :keywords="brand.keywords" :initial-count="5" :list-id="`brand-${brand.id}-keywords`" />
    </div>

    <div v-if="brand.socialNetworks && brand.socialNetworks.length" class="brand-details__section">
      <h3 class="visually-hidden">Social networks</h3>
      <SocialLinks :links="brand.socialNetworks" />
    </div>
  </section>
</template>

<script>
import BrandSummary from '~/components/BrandSummary.vue'
import KeywordList from '~/components/KeywordList.vue'
import SocialLinks from '~/components/SocialLinks.vue'

export default {
  name: 'BrandDetails',
  components: { BrandSummary, KeywordList, SocialLinks },
  props: {
    brand: { type: Object, required: true }
  },
  computed: {
    infoRows () {
      return [
        { label: 'Id', value: this.brand.id },
        { label: 'Company', value: this.brand.company },
        { label: 'Category', value: this.brand.category },
        {
          label: 'Phone',
          value: this.brand.phone,
          href: `tel:${this.brand.phone.replace(/\s+/g, '')}`
        }
      ]
    }
  }
}
</script>

<style scoped>
.brand-details {
  overflow: hidden;
}

.brand-details__section {
  margin: 0;
  padding: 12px 14px;
  border-top: 1px solid var(--color-border);
}

.brand-details__info {
  display: grid;
  gap: 10px;
}

/* On mid-size screens the panel is full width, so lay the info out in columns. */
@media (min-width: 560px) and (max-width: 899px) {
  .brand-details__info {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.brand-details__row dt,
.brand-details__label {
  font-size: 11px;
  font-weight: 400;
  color: var(--color-text-muted);
}

.brand-details__label {
  margin-bottom: 6px;
}

.brand-details__row dd {
  font-size: 13px;
  word-break: break-word;
}

.brand-details__link:hover {
  color: var(--color-primary);
}
</style>
