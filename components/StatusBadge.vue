<template>
  <span class="status-badge" :class="`status-badge--${status}`">{{ status }}</span>
</template>

<script>
export default {
  name: 'StatusBadge',
  props: {
    status: {
      type: String,
      required: true,
      validator: value => ['active', 'inactive'].includes(value)
    }
  }
}
</script>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 1px 8px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  line-height: 18px;
}

.status-badge--active {
  color: var(--color-success);
  background: var(--color-success-soft);
}

.status-badge--inactive {
  color: var(--color-danger);
  background: var(--color-danger-soft);
}
</style>
