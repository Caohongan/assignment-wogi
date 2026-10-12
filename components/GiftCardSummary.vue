<template>
  <section class="gift-summary card" aria-labelledby="gift-summary-title">
    <div class="gift-summary__header">
      <div>
        <h2 id="gift-summary-title" ref="title" class="gift-summary__title" tabindex="-1">
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
            <circle cx="10" cy="10" r="9" fill="currentColor" />
            <path d="M6 10.5l2.5 2.5L14 7.5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Gift card issued
        </h2>
        <p class="gift-summary__subtitle">The information below was also printed to the browser console.</p>
      </div>
      <button type="button" class="gift-summary__close" aria-label="Dismiss summary" @click="$emit('close')">
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <dl class="gift-summary__list">
      <div v-for="row in rows" :key="row.label" class="gift-summary__row">
        <dt>{{ row.label }}</dt>
        <dd>{{ row.value }}</dd>
      </div>
    </dl>

    <details class="gift-summary__raw">
      <summary>Raw payload (JSON)</summary>
      <pre>{{ JSON.stringify(payload, null, 2) }}</pre>
    </details>
  </section>
</template>

<script>
const PERIOD_LABELS = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' }

function formatDate (iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-SG', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export default {
  name: 'GiftCardSummary',
  props: {
    payload: { type: Object, required: true }
  },
  computed: {
    rows () {
      const { payload } = this
      const isGift = payload.deliveryType === 'gift'
      const rows = [
        { label: 'Brand', value: `${payload.brand.name} (#${payload.brand.id})` },
        { label: 'Amount', value: `$${payload.amount.toFixed(2)} ${payload.currency}` },
        { label: 'Delivery type', value: isGift ? 'Send as gift' : 'Personal' }
      ]

      if (isGift) {
        rows.push(
          { label: 'Sender name', value: payload.sender.name },
          { label: 'Recipient name', value: payload.recipient.name }
        )
      }

      rows.push(
        { label: 'Recipient email', value: payload.recipient.email },
        { label: 'Recipient phone', value: payload.recipient.phone }
      )

      if (isGift) {
        rows.push({
          label: 'Delivery time',
          value: payload.delivery.time === 'scheduled'
            ? `${formatDate(payload.delivery.date)} · ${PERIOD_LABELS[payload.delivery.period]}`
            : 'Immediately'
        })
        rows.push({ label: 'Gift message', value: payload.message })
      }

      return rows
    }
  },
  mounted () {
    // Move focus to the result so keyboard and screen-reader users notice it.
    this.$el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    this.$refs.title.focus({ preventScroll: true })
  }
}
</script>

<style scoped>
.gift-summary {
  padding: 16px;
  border-top: 3px solid var(--color-success);
}

@media (min-width: 600px) {
  .gift-summary {
    padding: 20px 24px 24px;
  }
}

.gift-summary__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.gift-summary__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-success);
}

.gift-summary__title:focus {
  outline: none;
}

.gift-summary__subtitle {
  margin-top: 2px;
  font-size: 12px;
  color: var(--color-text-muted);
}

.gift-summary__close {
  display: inline-flex;
  padding: 6px;
  color: var(--color-text-muted);
  background: transparent;
  border: 0;
  border-radius: 50%;
}

.gift-summary__close:hover {
  color: var(--color-text);
  background: var(--color-bg);
}

.gift-summary__list {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px 20px;
}

@media (min-width: 600px) {
  .gift-summary__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.gift-summary__row dt {
  font-size: 11px;
  color: var(--color-text-muted);
}

.gift-summary__row dd {
  font-size: 13px;
  white-space: pre-wrap;
  word-break: break-word;
}

.gift-summary__raw {
  margin-top: 20px;
  font-size: 12px;
}

.gift-summary__raw summary {
  cursor: pointer;
  color: var(--color-primary);
}

.gift-summary__raw pre {
  margin: 8px 0 0;
  padding: 12px;
  overflow-x: auto;
  font-size: 12px;
  background: var(--color-bg);
  border-radius: var(--radius-md);
}
</style>
