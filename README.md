# WOGI – Frontend Task

Brand browsing and gift card issuing UI built with **Nuxt 2 / Vue 2**, plain **HTML5 / CSS3** and
custom components only. No UI or CSS frameworks are used (no Bootstrap, Vuetify, etc.), and the
only runtime dependency is `nuxt`.

## Getting started

Requires Node.js 16+ (tested on Node 24).

```bash
npm install
npm run dev        # http://localhost:3000 (hot reload)

npm run build      # production build
npm run start      # serve the production build
```

## Features

### Brands page – `/brands`
- Responsive grid of brand cards (4 → 3 → 2 → 1 columns) showing logo, name, status and featured
  details (country, products).
- Server-side rendered pagination (8 per page) driven by the `?page=` query, so pages are linkable
  and the browser back button works. Out-of-range pages redirect to the nearest valid page.
- Clicking a card opens the brand's issue page.

### Brand page – `/brands/:id`
Two panels:

1. **Brand details**: logo, name, status, country, products, id, company, category, phone
   (click-to-call), keywords and social network links. Keywords show 5 at first; a `+N` button
   expands the rest and collapses them again.
2. **Issue gift card**: a form whose fields change with the user's choices:

   | Choice | Fields shown |
   | --- | --- |
   | Amount `$10–$40` / `Custom` | `Custom` adds a `$` amount input |
   | Delivery type `Personal` | Recipient email, recipient phone |
   | Delivery type `Send as gift` | + sender name, recipient name, delivery time, gift message |
   | Delivery time `Custom` | + delivery date and period (Morning / Afternoon / Evening) |

   **Validation rules**

   | Field | Rules |
   | --- | --- |
   | Gift amount | required |
   | Custom amount | required, number with ≤ 2 decimals, $5 – $1000 |
   | Sender / recipient name | required, ≤ 50 chars, letters, spaces and `. ' -` only |
   | Recipient email | required, valid email, ≤ 254 chars |
   | Recipient phone | required, 8-digit Singapore number starting with 3/6/8/9 (`+65` prefix) |
   | Delivery date | required, from today up to 12 months ahead |
   | Period | required |
   | Gift message | required, ≤ 200 chars (live counter) |

   - Errors show once a field loses focus, or for every field when **Send** is pressed.
   - On an invalid submit, focus moves to the first invalid field.
   - Only fields that are currently visible are validated and sent.
   - On a valid submit, the payload is printed to the **browser console** and shown in a new
     **"Gift card issued"** panel (with the raw JSON). The form then resets.
   - Gift cards can't be issued for **inactive** brands: the form is disabled and a notice is shown.

- Unknown brand ids show a 404 page.

## Project structure

```
assets/css/main.css         Design tokens (CSS variables), reset, shared helpers
components/
  AppPagination.vue         Pagination with ellipses + "x–y of n results"
  BrandCard.vue             Clickable card on the brands grid
  BrandSummary.vue          Logo, name, status, country, products (shared by card + details)
  BrandDetails.vue          Brand details panel
  KeywordList.vue           Expandable keyword tags
  SocialLinks.vue           Social network icon links (inline SVG)
  StatusBadge.vue           active / inactive badge
  GiftCardForm.vue          Dynamic gift card form + validation + submit
  GiftCardSummary.vue       Result panel shown after a successful submit
  form/
    FormField.vue           Label/legend, hint and error message wrapper
    BaseInput.vue           Input/textarea with optional prefix ("$", "+65")
    ChoiceGroup.vue         Native-radio based group, styled as radios or toggle buttons
data/brands.js              Mock brand catalogue
services/brandService.js    Async data access (swap for real API calls)
utils/validators.js         Small rule-based validation helpers
layouts/                    Default layout and error (404) page
pages/
  index.vue                 Redirects to /brands
  brands/index.vue          Brands list
  brands/_id.vue            Brand details + issue gift card
static/logos/               Brand logos (simple SVG placeholders)
```

## Notes and decisions

- **Data**: there's no backend, so `services/brandService.js` serves mock data through async
  functions with the same shape an API would return. Pages load it in `asyncData`, so swapping in
  real HTTP calls doesn't require page changes.
- **Accessibility**: real `<label>`s and `fieldset`/`legend` groups; radio and toggle-button groups
  are native radio inputs, so keyboard navigation works. Errors are linked to inputs with
  `aria-describedby` and `aria-invalid` and announced politely. Focus styles are visible.
- **Responsive**: mobile-first CSS with breakpoints at 480 / 560 / 600 / 800 / 900 / 1080px. On
  desktop the details panel is a sticky sidebar; on smaller screens the panels stack.
- **Logos** in `static/logos` are simple SVG placeholders, not official brand assets.
