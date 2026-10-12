/**
 * Minimal rule-based validation (no external libraries).
 *
 * A rule is a function `(value, form) => true | string`: it returns `true`
 * when the value is valid, otherwise the error message to display.
 */

const isEmpty = value =>
  value === null || value === undefined || (typeof value === 'string' && value.trim() === '')

export const required = message => value => !isEmpty(value) || message

export const maxLength = (max, message) => value =>
  isEmpty(value) || String(value).trim().length <= max || message || `Must be ${max} characters or fewer`

export const minLength = (min, message) => value =>
  isEmpty(value) || String(value).trim().length >= min || message || `Must be at least ${min} characters`

export const pattern = (regex, message) => value =>
  isEmpty(value) || regex.test(String(value).trim()) || message

// Pragmatic email check: something@something.tld, no spaces.
export const email = (message = 'Please enter a valid email address') =>
  pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message)

// Singapore numbers: 8 digits starting with 3, 6, 8 or 9 (spaces/dashes allowed).
export const sgPhone = (message = 'Please enter a valid 8-digit Singapore phone number') => value =>
  isEmpty(value) || /^[3689]\d{7}$/.test(String(value).replace(/[\s-]/g, '')) || message

// Letters (any language), spaces, apostrophes, dots and hyphens. Built with the
// RegExp constructor so Babel doesn't expand \p{L} into a huge character class.
const PERSON_NAME_REGEX = new RegExp("^\\p{L}[\\p{L} .'-]*$", 'u')

export const personName = (message = 'Name can only contain letters, spaces and . \' -') =>
  pattern(PERSON_NAME_REGEX, message)

export const money = ({ min, max }) => (value) => {
  if (isEmpty(value)) {
    return true
  }
  const text = String(value).trim()
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    return 'Please enter a valid amount (up to 2 decimal places)'
  }
  const amount = Number(text)
  if (amount < min) {
    return `Minimum amount is $${min}`
  }
  if (amount > max) {
    return `Maximum amount is $${max}`
  }
  return true
}

/** Local date as YYYY-MM-DD (what <input type="date"> uses). */
export function toISODate (date) {
  const pad = n => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function addDays (date, days) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

export const dateBetween = ({ min, max }) => (value) => {
  if (isEmpty(value)) {
    return true
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return 'Please enter a valid date'
  }
  if (min && value < min) {
    return 'Delivery date cannot be in the past'
  }
  if (max && value > max) {
    return 'Delivery date must be within the next 12 months'
  }
  return true
}

/**
 * Run rules against a value; return the first error message, or '' if valid.
 * @param {*} value
 * @param {Array<Function>} rules
 * @param {object} form the whole form, for cross-field rules
 */
export function validateValue (value, rules = [], form = {}) {
  for (const rule of rules) {
    const result = rule(value, form)
    if (result !== true) {
      return result
    }
  }
  return ''
}
