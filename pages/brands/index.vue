<template>
  <div class="container brands-page">
    <h1 class="page-title">Brands</h1>

    <p v-if="!brands.length" class="brands-page__empty card">No brands found.</p>

    <template v-else>
      <ul class="brands-page__grid">
        <li v-for="brand in brands" :key="brand.id">
          <BrandCard :brand="brand" />
        </li>
      </ul>

      <AppPagination
        :page="pagination.page"
        :total-pages="pagination.totalPages"
        :total="pagination.total"
        :per-page="pagination.perPage"
      />
    </template>
  </div>
</template>

<script>
import AppPagination from '~/components/AppPagination.vue'
import BrandCard from '~/components/BrandCard.vue'
import { fetchBrands } from '~/services/brandService'

const PER_PAGE = 8

export default {
  name: 'BrandsPage',
  components: { AppPagination, BrandCard },

  // Re-run asyncData when only the ?page= query changes.
  watchQuery: ['page'],

  async asyncData ({ query, redirect, route }) {
    const requestedPage = parseInt(query.page, 10) || 1
    const result = await fetchBrands({ page: requestedPage, perPage: PER_PAGE })

    // Normalise out-of-range page numbers (e.g. ?page=999) to the nearest valid page.
    if (query.page && result.page !== requestedPage) {
      return redirect({ path: route.path, query: { ...query, page: String(result.page) } })
    }

    return {
      brands: result.items,
      pagination: {
        page: result.page,
        perPage: result.perPage,
        total: result.total,
        totalPages: result.totalPages
      }
    }
  },

  head () {
    return { title: 'Brands | WOGI' }
  }
}
</script>

<style scoped>
.brands-page__grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 20px;
  margin: 24px 0 32px;
}

@media (min-width: 480px) {
  .brands-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 800px) {
  .brands-page__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1080px) {
  .brands-page__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 36px;
    margin-top: 32px;
  }
}

.brands-page__empty {
  margin-top: 24px;
  padding: 32px;
  text-align: center;
  color: var(--color-text-muted);
}
</style>
