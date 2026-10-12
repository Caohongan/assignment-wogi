<template>
  <ul class="social-links">
    <li v-for="link in links" :key="link.type">
      <a
        :href="link.url"
        class="social-links__link"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${link.label} (opens in a new tab)`"
        :title="link.label"
      >
        <!-- Icons are static, trusted strings defined below. -->
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" v-html="icons[link.type] || icons.website" />
      </a>
    </li>
  </ul>
</template>

<script>
const STROKE = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"'

const ICONS = {
  website: `<circle cx="12" cy="12" r="9" ${STROKE}/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" ${STROKE}/>`,
  facebook: `<circle cx="12" cy="12" r="9" ${STROKE}/><path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.6c0-.8.3-1.4 1.4-1.4h1.4V5.8c-.3 0-1.1-.1-2-.1-2 0-3.3 1.2-3.3 3.4v2.1H8.7V14H11v7" ${STROKE}/>`,
  instagram: `<rect x="3.5" y="3.5" width="17" height="17" rx="5" ${STROKE}/><circle cx="12" cy="12" r="4" ${STROKE}/><circle cx="17" cy="7" r="0.8" fill="currentColor"/>`,
  twitter: '<path d="M21 6.2c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.2 1.6-2-.7.4-1.5.7-2.3.9a3.6 3.6 0 0 0-6.2 3.3A10.3 10.3 0 0 1 4.5 5.2a3.6 3.6 0 0 0 1.1 4.8c-.6 0-1.2-.2-1.6-.4 0 1.8 1.2 3.3 2.9 3.6-.5.1-1.1.2-1.6.1.5 1.4 1.8 2.5 3.4 2.5A7.3 7.3 0 0 1 3 17.3 10.3 10.3 0 0 0 8.6 19c6.7 0 10.4-5.6 10.4-10.4v-.5c.8-.5 1.4-1.2 2-1.9z" fill="currentColor"/>'
}

export default {
  name: 'SocialLinks',
  props: {
    links: { type: Array, default: () => [] }
  },
  data () {
    return { icons: ICONS }
  }
}
</script>

<style scoped>
.social-links {
  display: flex;
  justify-content: space-around;
  gap: 8px;
}

.social-links__link {
  display: inline-flex;
  padding: 6px;
  border-radius: 50%;
  color: var(--color-text-muted);
  transition: color 0.15s ease, background-color 0.15s ease;
}

.social-links__link:hover {
  color: var(--color-primary);
  background: var(--color-primary-soft);
}
</style>
