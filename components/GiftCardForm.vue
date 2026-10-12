<template>
  <form class="gift-form card" novalidate @submit.prevent="onSubmit">
    <h2 class="gift-form__title">Gift information</h2>

    <p v-if="disabled" class="gift-form__notice" role="status">
      {{ brand.name }} is currently inactive, so gift cards can't be issued for this brand.
    </p>

    <!-- Amount -->
    <section class="gift-form__section">
      <FormField id="gift-amount" label="Select gift amount" :error="errors.amount" group>
        <template #default="{ describedby, invalid }">
          <ChoiceGroup
            v-model="form.amount"
            name="gift-amount"
            variant="button"
            :options="amountOptions"
            :invalid="invalid"
            :disabled="disabled"
            :describedby="describedby"
            @input="onAmountChange"
          />
        </template>
      </FormField>

      <FormField
        v-if="isCustomAmount"
        id="gift-custom-amount"
        label="Custom amount"
        class="gift-form__custom-amount"
        :error="errors.customAmount"
        :hint="`Between $${AMOUNT_LIMITS.min} and $${AMOUNT_LIMITS.max}`"
      >
        <template #default="{ id, describedby, invalid }">
          <BaseInput
            :id="id"
            v-model="form.customAmount"
            prefix="$"
            inputmode="decimal"
            placeholder="Enter custom amount"
            autocomplete="off"
            :invalid="invalid"
            :disabled="disabled"
            :describedby="describedby"
            @blur="touch('customAmount')"
          />
        </template>
      </FormField>
    </section>

    <!-- Delivery type -->
    <section class="gift-form__section">
      <FormField id="gift-delivery-type" label="Delivery type" :error="errors.deliveryType" group>
        <template #default="{ describedby, invalid }">
          <ChoiceGroup
            v-model="form.deliveryType"
            name="gift-delivery-type"
            :options="deliveryTypeOptions"
            :invalid="invalid"
            :disabled="disabled"
            :describedby="describedby"
          />
        </template>
      </FormField>

      <div class="gift-form__grid">
        <template v-if="isGift">
          <FormField id="gift-sender-name" label="Sender name" :error="errors.senderName">
            <template #default="{ id, describedby, invalid }">
              <BaseInput
                :id="id"
                v-model="form.senderName"
                placeholder="Enter sender name"
                autocomplete="name"
                maxlength="60"
                :invalid="invalid"
                :disabled="disabled"
                :describedby="describedby"
                @blur="touch('senderName')"
              />
            </template>
          </FormField>

          <FormField id="gift-recipient-name" label="Recipient name" :error="errors.recipientName">
            <template #default="{ id, describedby, invalid }">
              <BaseInput
                :id="id"
                v-model="form.recipientName"
                placeholder="Enter recipient name"
                autocomplete="off"
                maxlength="60"
                :invalid="invalid"
                :disabled="disabled"
                :describedby="describedby"
                @blur="touch('recipientName')"
              />
            </template>
          </FormField>
        </template>

        <FormField id="gift-recipient-email" label="Recipient email" :error="errors.recipientEmail">
          <template #default="{ id, describedby, invalid }">
            <BaseInput
              :id="id"
              v-model="form.recipientEmail"
              type="email"
              inputmode="email"
              placeholder="Enter recipient email"
              :autocomplete="isGift ? 'off' : 'email'"
              maxlength="254"
              :invalid="invalid"
              :disabled="disabled"
              :describedby="describedby"
              @blur="touch('recipientEmail')"
            />
          </template>
        </FormField>

        <FormField id="gift-recipient-phone" label="Recipient phone" :error="errors.recipientPhone">
          <template #default="{ id, describedby, invalid }">
            <BaseInput
              :id="id"
              v-model="form.recipientPhone"
              type="tel"
              inputmode="tel"
              :prefix="PHONE_PREFIX"
              placeholder="Enter recipient phone"
              :autocomplete="isGift ? 'off' : 'tel-national'"
              maxlength="10"
              :invalid="invalid"
              :disabled="disabled"
              :describedby="describedby"
              @blur="touch('recipientPhone')"
            />
          </template>
        </FormField>
      </div>
    </section>

    <!-- Delivery time & message (gift only) -->
    <template v-if="isGift">
      <section class="gift-form__section">
        <FormField id="gift-delivery-time" label="Delivery time" :error="errors.deliveryTime" group>
          <template #default="{ describedby, invalid }">
            <ChoiceGroup
              v-model="form.deliveryTime"
              name="gift-delivery-time"
              :options="deliveryTimeOptions"
              :invalid="invalid"
              :disabled="disabled"
              :describedby="describedby"
            />
          </template>
        </FormField>

        <div v-if="isScheduled" class="gift-form__grid">
          <FormField id="gift-delivery-date" label="Delivery date" :error="errors.deliveryDate">
            <template #default="{ id, describedby, invalid }">
              <BaseInput
                :id="id"
                v-model="form.deliveryDate"
                type="date"
                :min="dateLimits.min"
                :max="dateLimits.max"
                :invalid="invalid"
                :disabled="disabled"
                :describedby="describedby"
                @blur="touch('deliveryDate')"
              />
            </template>
          </FormField>

          <FormField id="gift-period" label="Period" :error="errors.period" group>
            <template #default="{ describedby, invalid }">
              <ChoiceGroup
                v-model="form.period"
                name="gift-period"
                variant="button"
                :options="periodOptions"
                :invalid="invalid"
                :disabled="disabled"
                :describedby="describedby"
              />
            </template>
          </FormField>
        </div>
      </section>

      <section class="gift-form__section">
        <FormField
          id="gift-message"
          label="Gift message"
          :error="errors.message"
          :hint="`${messageLength}/${MESSAGE_MAX} characters`"
        >
          <template #default="{ id, describedby, invalid }">
            <BaseInput
              :id="id"
              v-model="form.message"
              multiline
              rows="4"
              placeholder="Enter gift message"
              :maxlength="MESSAGE_MAX"
              :invalid="invalid"
              :disabled="disabled"
              :describedby="describedby"
              @blur="touch('message')"
            />
          </template>
        </FormField>
      </section>
    </template>

    <div class="gift-form__actions">
      <button type="submit" class="gift-form__submit" :disabled="disabled || sending">
        <span v-if="sending" class="gift-form__spinner" aria-hidden="true" />
        {{ sending ? 'Sending…' : 'Send' }}
      </button>
    </div>
  </form>
</template>

<script>
import BaseInput from '~/components/form/BaseInput.vue'
import ChoiceGroup from '~/components/form/ChoiceGroup.vue'
import FormField from '~/components/form/FormField.vue'
import {
  addDays,
  dateBetween,
  email,
  maxLength,
  money,
  personName,
  required,
  sgPhone,
  toISODate,
  validateValue
} from '~/utils/validators'

const PRESET_AMOUNTS = [10, 20, 30, 40]
const CUSTOM = 'custom'
const AMOUNT_LIMITS = { min: 5, max: 1000 }
const MESSAGE_MAX = 200
const NAME_MAX = 50
const PHONE_PREFIX = '+65'
// Simulated network latency for the "send" request.
const SEND_DELAY_MS = 600

// Order matters: it is the order fields appear in, used to focus the first error.
const FIELD_ORDER = [
  'amount',
  'customAmount',
  'deliveryType',
  'senderName',
  'recipientName',
  'recipientEmail',
  'recipientPhone',
  'deliveryTime',
  'deliveryDate',
  'period',
  'message'
]

const FIELD_DOM_IDS = {
  amount: 'gift-amount',
  customAmount: 'gift-custom-amount',
  deliveryType: 'gift-delivery-type',
  senderName: 'gift-sender-name',
  recipientName: 'gift-recipient-name',
  recipientEmail: 'gift-recipient-email',
  recipientPhone: 'gift-recipient-phone',
  deliveryTime: 'gift-delivery-time',
  deliveryDate: 'gift-delivery-date',
  period: 'gift-period',
  message: 'gift-message'
}

function initialForm () {
  return {
    amount: null,
    customAmount: '',
    deliveryType: 'personal',
    senderName: '',
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    deliveryTime: 'immediately',
    deliveryDate: '',
    period: 'morning',
    message: ''
  }
}

function initialTouched () {
  return FIELD_ORDER.reduce((acc, key) => ({ ...acc, [key]: false }), {})
}

export default {
  name: 'GiftCardForm',
  components: { BaseInput, ChoiceGroup, FormField },
  props: {
    brand: { type: Object, required: true },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      form: initialForm(),
      touched: initialTouched(),
      submitted: false,
      sending: false,

      AMOUNT_LIMITS,
      MESSAGE_MAX,
      PHONE_PREFIX,
      amountOptions: [
        ...PRESET_AMOUNTS.map(value => ({ label: `$${value}`, value })),
        { label: 'Custom', value: CUSTOM }
      ],
      deliveryTypeOptions: [
        { label: 'Personal', value: 'personal' },
        { label: 'Send as gift', value: 'gift' }
      ],
      deliveryTimeOptions: [
        { label: 'Immediately', value: 'immediately' },
        { label: 'Custom', value: 'scheduled' }
      ],
      periodOptions: [
        { label: 'Morning', value: 'morning' },
        { label: 'Afternoon', value: 'afternoon' },
        { label: 'Evening', value: 'evening' }
      ]
    }
  },
  computed: {
    isCustomAmount () {
      return this.form.amount === CUSTOM
    },
    isGift () {
      return this.form.deliveryType === 'gift'
    },
    isScheduled () {
      return this.isGift && this.form.deliveryTime === 'scheduled'
    },
    messageLength () {
      return this.form.message.length
    },
    dateLimits () {
      const today = new Date()
      return { min: toISODate(today), max: toISODate(addDays(today, 365)) }
    },

    /**
     * Validation rules for the fields that are currently visible. Hidden
     * fields have no rules, so they never block submission.
     */
    rules () {
      const rules = {
        amount: [required('Please select gift amount')],
        deliveryType: [required('Please select delivery type')],
        recipientEmail: [
          required('Please enter recipient email'),
          maxLength(254),
          email()
        ],
        recipientPhone: [required('Please enter recipient phone'), sgPhone()]
      }

      if (this.isCustomAmount) {
        rules.customAmount = [required('Please enter gift amount'), money(AMOUNT_LIMITS)]
      }

      if (this.isGift) {
        rules.senderName = [required('Please enter sender name'), maxLength(NAME_MAX), personName()]
        rules.recipientName = [required('Please enter recipient name'), maxLength(NAME_MAX), personName()]
        rules.deliveryTime = [required('Please select delivery time')]
        rules.message = [required('Please enter gift message'), maxLength(MESSAGE_MAX)]
      }

      if (this.isScheduled) {
        rules.deliveryDate = [required('Please enter delivery date'), dateBetween(this.dateLimits)]
        rules.period = [required('Please select delivery period')]
      }

      return rules
    },

    /** Current error for each visible field (all fields, regardless of touched state). */
    allErrors () {
      return Object.keys(this.rules).reduce((acc, key) => {
        acc[key] = validateValue(this.form[key], this.rules[key], this.form)
        return acc
      }, {})
    },

    /** Errors to display: only after a field was touched or a submit was attempted. */
    errors () {
      return FIELD_ORDER.reduce((acc, key) => {
        const show = this.submitted || this.touched[key]
        acc[key] = (show && this.allErrors[key]) || ''
        return acc
      }, {})
    },

    isValid () {
      return Object.values(this.allErrors).every(error => !error)
    }
  },
  methods: {
    touch (key) {
      this.touched[key] = true
    },

    onAmountChange (value) {
      this.touch('amount')
      if (value === CUSTOM) {
        this.$nextTick(() => {
          const input = this.$el.querySelector(`#${FIELD_DOM_IDS.customAmount}`)
          if (input) {
            input.focus()
          }
        })
      }
    },

    focusFirstError () {
      const firstKey = FIELD_ORDER.find(key => this.allErrors[key])
      if (!firstKey) {
        return
      }
      const field = this.$el.querySelector(`#${FIELD_DOM_IDS[firstKey]}`)
      // Groups are rendered as <fieldset id>; focus their first radio instead.
      const target = field && field.tagName === 'FIELDSET'
        ? field.querySelector('input:checked') || field.querySelector('input')
        : field
      if (target) {
        target.focus()
      }
    },

    buildPayload () {
      const { form } = this
      const amount = this.isCustomAmount ? Number(Number(form.customAmount).toFixed(2)) : form.amount
      const phoneDigits = form.recipientPhone.replace(/[\s-]/g, '')

      const payload = {
        brand: { id: this.brand.id, name: this.brand.name },
        amount,
        currency: 'SGD',
        deliveryType: form.deliveryType,
        recipient: {
          email: form.recipientEmail.trim(),
          phone: `${PHONE_PREFIX} ${phoneDigits.slice(0, 4)} ${phoneDigits.slice(4)}`
        },
        delivery: { time: 'immediately' },
        createdAt: new Date().toISOString()
      }

      if (this.isGift) {
        payload.sender = { name: form.senderName.trim() }
        payload.recipient.name = form.recipientName.trim()
        payload.message = form.message.trim()
        payload.delivery = this.isScheduled
          ? { time: 'scheduled', date: form.deliveryDate, period: form.period }
          : { time: 'immediately' }
      }

      return payload
    },

    async onSubmit () {
      if (this.disabled || this.sending) {
        return
      }

      this.submitted = true
      if (!this.isValid) {
        this.$nextTick(this.focusFirstError)
        return
      }

      this.sending = true
      try {
        const payload = this.buildPayload()
        // Stand-in for an API request.
        await new Promise(resolve => setTimeout(resolve, SEND_DELAY_MS))

        // eslint-disable-next-line no-console
        console.log('[WOGI] Gift card issued:', JSON.parse(JSON.stringify(payload)))
        this.$emit('submitted', payload)
        this.reset()
      } finally {
        this.sending = false
      }
    },

    reset () {
      this.form = initialForm()
      this.touched = initialTouched()
      this.submitted = false
    }
  }
}
</script>

<style scoped>
.gift-form {
  padding: 16px;
}

@media (min-width: 600px) {
  .gift-form {
    padding: 20px 24px 24px;
  }
}

.gift-form__title {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
}

.gift-form__notice {
  margin-bottom: 16px;
  padding: 10px 12px;
  font-size: 13px;
  color: var(--color-danger);
  background: var(--color-danger-soft);
  border-radius: var(--radius-md);
}

.gift-form__section + .gift-form__section {
  margin-top: 28px;
}

.gift-form__custom-amount {
  max-width: 280px;
  margin-top: 16px;
}

.gift-form__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px 20px;
  margin-top: 20px;
}

@media (min-width: 600px) {
  .gift-form__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.gift-form__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.gift-form__submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 76px;
  height: 36px;
  padding: 0 20px;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  background: var(--color-primary);
  border: 0;
  border-radius: var(--radius-md);
  transition: background-color 0.15s ease;
}

.gift-form__submit:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.gift-form__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 479px) {
  .gift-form__submit {
    width: 100%;
  }
}

.gift-form__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: gift-form-spin 0.7s linear infinite;
}

@keyframes gift-form-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
