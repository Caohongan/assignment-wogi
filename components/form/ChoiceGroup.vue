<template>
  <div class="choice-group" :class="[`choice-group--${variant}`, { 'is-invalid': invalid }]">
    <label
      v-for="option in options"
      :key="String(option.value)"
      class="choice-group__option"
      :class="{ 'is-checked': option.value === value, 'is-disabled': disabled }"
    >
      <input
        class="choice-group__input"
        type="radio"
        :name="name"
        :value="option.value"
        :checked="option.value === value"
        :disabled="disabled"
        :aria-invalid="invalid ? 'true' : null"
        :aria-describedby="describedby"
        @change="$emit('input', option.value)"
      >
      <span v-if="variant === 'radio'" class="choice-group__dot" aria-hidden="true" />
      <span class="choice-group__text">{{ option.label }}</span>
    </label>
  </div>
</template>

<script>
/**
 * Single-choice group built on native radio inputs (so keyboard arrows,
 * focus and form semantics work for free), styled either as classic radios
 * or as a row of toggle buttons. Place it inside a <FormField group> so the
 * fieldset/legend labels the group.
 */
export default {
  name: 'ChoiceGroup',
  props: {
    name: { type: String, required: true },
    value: { type: [String, Number, Boolean], default: null },
    // [{ label: String, value: any }]
    options: { type: Array, required: true },
    variant: {
      type: String,
      default: 'radio',
      validator: value => ['radio', 'button'].includes(value)
    },
    invalid: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    describedby: { type: String, default: null }
  }
}
</script>

<style scoped>
.choice-group {
  display: flex;
  flex-wrap: wrap;
}

.choice-group__input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: 0;
  pointer-events: none;
}

.choice-group__option {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.choice-group__option.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* ---- Radio variant ---- */
.choice-group--radio {
  gap: 8px 24px;
}

.choice-group--radio .choice-group__option {
  gap: 6px;
  font-size: 13px;
}

.choice-group__dot {
  position: relative;
  width: 14px;
  height: 14px;
  border: 1px solid var(--color-border-strong);
  border-radius: 50%;
  background: var(--color-surface);
  transition: border-color 0.15s ease;
}

.choice-group__dot::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: var(--color-primary);
  transform: scale(0);
  transition: transform 0.15s ease;
}

.choice-group__option:hover .choice-group__dot,
.is-checked .choice-group__dot {
  border-color: var(--color-primary);
}

.is-checked .choice-group__dot::after {
  transform: scale(1);
}

.choice-group__input:focus-visible ~ .choice-group__dot {
  box-shadow: var(--focus-ring);
}

/* ---- Button variant ---- */
.choice-group--button {
  gap: 8px;
}

.choice-group--button .choice-group__option {
  justify-content: center;
  min-width: 48px;
  height: 36px;
  padding: 0 12px;
  font-size: 13px;
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;
}

.choice-group--button .choice-group__option:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.choice-group--button .choice-group__option.is-checked {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.choice-group--button.is-invalid .choice-group__option:not(.is-checked) {
  border-color: var(--color-danger);
}

.choice-group--button .choice-group__option:focus-within {
  box-shadow: var(--focus-ring);
}
</style>
