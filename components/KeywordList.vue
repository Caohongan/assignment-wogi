<template>
  <div class="keyword-list">
    <ul :id="listId" class="keyword-list__items">
      <li v-for="keyword in visibleKeywords" :key="keyword" class="keyword-list__tag">
        {{ keyword }}
      </li>
      <li v-if="hiddenCount > 0 || expanded" class="keyword-list__toggle-item">
        <button
          type="button"
          class="keyword-list__toggle"
          :aria-expanded="String(expanded)"
          :aria-controls="listId"
          @click="expanded = !expanded"
        >
          {{ expanded ? 'Show less' : `+${hiddenCount}` }}
          <svg
            class="keyword-list__chevron"
            :class="{ 'is-up': expanded }"
            viewBox="0 0 12 12"
            width="10"
            height="10"
            aria-hidden="true"
          >
            <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'KeywordList',
  props: {
    keywords: { type: Array, default: () => [] },
    initialCount: { type: Number, default: 5 },
    // Must be stable between server and client render (used for aria-controls).
    listId: { type: String, default: 'keyword-list' }
  },
  data () {
    return { expanded: false }
  },
  computed: {
    visibleKeywords () {
      return this.expanded ? this.keywords : this.keywords.slice(0, this.initialCount)
    },
    hiddenCount () {
      return Math.max(0, this.keywords.length - this.initialCount)
    }
  }
}
</script>

<style scoped>
.keyword-list__items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.keyword-list__tag,
.keyword-list__toggle {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  line-height: 18px;
}

.keyword-list__tag {
  background: #f1f2f4;
  color: var(--color-text);
}

.keyword-list__toggle {
  gap: 4px;
  border: 0;
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.keyword-list__toggle:hover {
  background: #d8e9ff;
}

.keyword-list__chevron {
  transition: transform 0.2s ease;
}

.keyword-list__chevron.is-up {
  transform: rotate(180deg);
}
</style>
