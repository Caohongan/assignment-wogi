<template>
  <nav class="pagination" aria-label="Pagination">
    <ul class="pagination__list card">
      <li>
        <component
          :is="page > 1 ? 'NuxtLink' : 'span'"
          :to="page > 1 ? linkTo(page - 1) : null"
          class="pagination__item pagination__arrow"
          :class="{ 'is-disabled': page <= 1 }"
          aria-label="Previous page"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M13 8H3m4-4L3 8l4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </component>
      </li>

      <li v-for="(item, index) in items" :key="`${item}-${index}`">
        <span v-if="item === ELLIPSIS" class="pagination__item pagination__ellipsis" aria-hidden="true">…</span>
        <NuxtLink
          v-else
          :to="linkTo(item)"
          class="pagination__item"
          :class="{ 'is-current': item === page }"
          :aria-current="item === page ? 'page' : null"
          :aria-label="`Page ${item}`"
        >
          {{ item }}
        </NuxtLink>
      </li>

      <li>
        <component
          :is="page < totalPages ? 'NuxtLink' : 'span'"
          :to="page < totalPages ? linkTo(page + 1) : null"
          class="pagination__item pagination__arrow"
          :class="{ 'is-disabled': page >= totalPages }"
          aria-label="Next page"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </component>
      </li>
    </ul>

    <p class="pagination__summary">
      <strong>{{ rangeStart }}-{{ rangeEnd }}</strong> of <strong>{{ total }}</strong> results
    </p>
  </nav>
</template>

<script>
const ELLIPSIS = '…'

export default {
  name: 'AppPagination',
  props: {
    page: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    total: { type: Number, required: true },
    perPage: { type: Number, required: true },
    // How many pages to show on each side of the current one.
    siblings: { type: Number, default: 2 }
  },
  data () {
    return { ELLIPSIS }
  },
  computed: {
    /** Page numbers to render, e.g. [1, '…', 8, 9, 10, 11, 12, '…', 20]. */
    items () {
      const { page, totalPages, siblings } = this
      const start = Math.max(2, page - siblings)
      const end = Math.min(totalPages - 1, page + siblings)
      const items = [1]

      // Only collapse a gap into an ellipsis if it hides more than one page.
      if (start === 3) {
        items.push(2)
      } else if (start > 3) {
        items.push(ELLIPSIS)
      }

      for (let i = start; i <= end; i++) {
        items.push(i)
      }

      if (end === totalPages - 2) {
        items.push(totalPages - 1)
      } else if (end < totalPages - 2) {
        items.push(ELLIPSIS)
      }

      if (totalPages > 1) {
        items.push(totalPages)
      }
      return items
    },
    rangeStart () {
      return this.total === 0 ? 0 : (this.page - 1) * this.perPage + 1
    },
    rangeEnd () {
      return Math.min(this.page * this.perPage, this.total)
    }
  },
  methods: {
    linkTo (page) {
      const query = { ...this.$route.query, page: String(page) }
      if (page === 1) {
        delete query.page
      }
      return { path: this.$route.path, query }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
}

.pagination__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  padding: 4px 6px;
}

.pagination__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 4px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--color-text);
  transition: background-color 0.15s ease, color 0.15s ease;
}

a.pagination__item:hover {
  background: var(--color-bg);
}

.pagination__item.is-current {
  color: var(--color-primary);
  font-weight: 500;
}

.pagination__arrow {
  color: var(--color-text-muted);
}

.pagination__item.is-disabled {
  color: var(--color-border-strong);
  cursor: not-allowed;
}

.pagination__ellipsis {
  color: var(--color-text-muted);
}

.pagination__summary {
  font-size: 13px;
  color: var(--color-text-muted);
}

.pagination__summary strong {
  font-weight: 500;
  color: var(--color-text);
}
</style>
