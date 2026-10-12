<template>
  <component
    :is="group ? 'fieldset' : 'div'"
    :id="group ? id : null"
    class="form-field"
    :class="{ 'has-error': !!error }"
  >
    <component
      :is="group ? 'legend' : 'label'"
      class="form-field__label"
      :for="group ? null : id"
    >
      {{ label }}
    </component>

    <slot :id="id" :describedby="describedby" :invalid="!!error" />

    <p v-if="hint && !error" :id="`${id}-hint`" class="form-field__hint">{{ hint }}</p>
    <p :id="`${id}-error`" class="form-field__error" aria-live="polite">
      <template v-if="error">
        {{ error }}
      </template>
    </p>
  </component>
</template>

<script>
/**
 * Wraps a control with a label (or legend, for groups), an optional hint and
 * the validation message. Exposes `id`, `describedby` and `invalid` to the
 * slot so the control can wire up its accessibility attributes.
 */
export default {
  name: 'FormField',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    error: { type: String, default: '' },
    hint: { type: String, default: '' },
    // Render as fieldset/legend (for radio and button groups).
    group: { type: Boolean, default: false }
  },
  computed: {
    describedby () {
      return this.error ? `${this.id}-error` : (this.hint ? `${this.id}-hint` : null)
    }
  }
}
</script>

<style scoped>
.form-field {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.form-field__label {
  display: block;
  margin-bottom: 8px;
  padding: 0;
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text);
}

.form-field__hint,
.form-field__error {
  margin-top: 4px;
  font-size: 11px;
  line-height: 1.4;
}

.form-field__hint {
  color: var(--color-text-muted);
}

.form-field__error {
  color: var(--color-danger);
}

.form-field__error:empty {
  display: none;
}

.form-field__error::before {
  content: '* ';
}
</style>
