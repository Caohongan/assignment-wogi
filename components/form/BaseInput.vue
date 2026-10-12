<template>
  <div class="base-input" :class="{ 'is-invalid': invalid, 'is-disabled': disabled, 'is-multiline': multiline }">
    <span v-if="prefix" class="base-input__prefix" aria-hidden="true">{{ prefix }}</span>
    <!-- Explicit elements (not <component :is>) so Vue binds `value` as a DOM property. -->
    <textarea
      v-if="multiline"
      :id="id"
      class="base-input__control"
      :value="value"
      :disabled="disabled"
      :aria-invalid="invalid ? 'true' : null"
      :aria-describedby="describedby"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur', $event)"
    />
    <input
      v-else
      :id="id"
      class="base-input__control"
      :type="type"
      :value="value"
      :disabled="disabled"
      :aria-invalid="invalid ? 'true' : null"
      :aria-describedby="describedby"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur', $event)"
    >
  </div>
</template>

<script>
/**
 * Text-like input (or textarea) with an optional fixed prefix, e.g. "$" or "+65".
 * Extra attributes (placeholder, inputmode, min, maxlength...) pass through to the control.
 */
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    id: { type: String, required: true },
    value: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    prefix: { type: String, default: '' },
    multiline: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    describedby: { type: String, default: null }
  }
}
</script>

<style scoped>
.base-input {
  display: flex;
  align-items: stretch;
  width: 100%;
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.base-input:hover {
  border-color: #bfbfbf;
}

.base-input:focus-within {
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

.base-input.is-invalid {
  border-color: var(--color-danger);
}

.base-input.is-invalid:focus-within {
  box-shadow: 0 0 0 3px rgba(240, 56, 79, 0.18);
}

.base-input.is-disabled {
  background: var(--color-bg);
  cursor: not-allowed;
}

.base-input__prefix {
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 13px;
  color: var(--color-text);
  border-right: 1px solid var(--color-border-strong);
}

.base-input__control {
  flex: 1;
  min-width: 0;
  height: 36px;
  padding: 0 10px;
  font-size: 13px;
  border: 0;
  background: transparent;
  outline: none;
}

.base-input__control:focus-visible {
  box-shadow: none;
}

.base-input__control::placeholder {
  color: var(--color-text-subtle);
}

.base-input__control:disabled {
  cursor: not-allowed;
}

.is-multiline .base-input__control {
  height: auto;
  min-height: 96px;
  padding: 8px 10px;
  resize: vertical;
}
</style>
