import { BRANDS } from '~/data/brands'

/**
 * Thin data-access layer. The functions are async and copy their results so
 * they can be swapped for real HTTP calls without changing the pages.
 */

const clone = value => JSON.parse(JSON.stringify(value))

/**
 * @param {{ page?: number, perPage?: number }} options
 * @returns {Promise<{ items: object[], page: number, perPage: number, total: number, totalPages: number }>}
 */
export function fetchBrands ({ page = 1, perPage = 8 } = {}) {
  const total = BRANDS.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * perPage

  return Promise.resolve({
    items: clone(BRANDS.slice(start, start + perPage)),
    page: safePage,
    perPage,
    total,
    totalPages
  })
}

/**
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export function fetchBrandById (id) {
  const brand = BRANDS.find(item => item.id === String(id))
  return Promise.resolve(brand ? clone(brand) : null)
}
