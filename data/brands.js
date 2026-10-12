/**
 * Mock brand data. In a real app this would come from an API; here a set of
 * base brands is expanded into a larger, deterministic catalogue so that the
 * pagination has something to page through (and SSR/client output matches).
 */

const BASE_BRANDS = [
  {
    name: 'Grab',
    logo: '/logos/grab.svg',
    company: 'XYZ Limited',
    category: 'Other Gifts',
    phone: '+123 4455 6677 8899',
    keywords: ['grab', 'grab gift', 'grab voucher', 'promo code', 'ride', 'food delivery', 'grabfood', 'grabmart', 'transport'],
    website: 'https://www.grab.com',
    social: { facebook: 'grab', instagram: 'grab', twitter: 'grab' }
  },
  {
    name: 'Amazon',
    logo: '/logos/amazon.svg',
    company: 'Amazon.com, Inc.',
    category: 'E-commerce',
    phone: '+1 206 266 1000',
    keywords: ['amazon', 'amazon gift', 'shopping', 'prime', 'books', 'electronics', 'voucher'],
    website: 'https://www.amazon.com',
    social: { facebook: 'amazon', instagram: 'amazon', twitter: 'amazon' }
  },
  {
    name: 'Esprit',
    logo: '/logos/esprit.svg',
    company: 'Esprit Holdings Ltd.',
    category: 'Fashion',
    phone: '+65 6123 4567',
    keywords: ['esprit', 'fashion', 'clothing', 'apparel', 'accessories', 'gift card'],
    website: 'https://www.esprit.com',
    social: { facebook: 'esprit', instagram: 'esprit', twitter: 'esprit' }
  },
  {
    name: 'Lazada',
    logo: '/logos/lazada.svg',
    company: 'Lazada Group',
    category: 'E-commerce',
    phone: '+65 6123 8888',
    keywords: ['lazada', 'lazmall', 'online shopping', 'voucher', 'flash sale', 'lazada gift', 'deals', 'free shipping'],
    website: 'https://www.lazada.sg',
    social: { facebook: 'LazadaSingapore', instagram: 'lazadasg', twitter: 'lazadasg' }
  },
  {
    name: 'Subway',
    logo: '/logos/subway.svg',
    company: 'Subway IP LLC',
    category: 'Food & Beverage',
    phone: '+65 6222 3333',
    keywords: ['subway', 'sandwich', 'sub', 'food', 'fast food', 'meal voucher'],
    website: 'https://www.subway.com',
    social: { facebook: 'subway', instagram: 'subway', twitter: 'subway' }
  },
  {
    name: 'Kaspersky Lab',
    logo: '/logos/kaspersky.svg',
    company: 'Kaspersky Lab',
    category: 'Software',
    phone: '+65 6555 0000',
    keywords: ['kaspersky', 'antivirus', 'security', 'software', 'licence', 'internet security', 'vpn'],
    website: 'https://www.kaspersky.com',
    social: { facebook: 'Kaspersky', instagram: 'kasperskylab', twitter: 'kaspersky' }
  },
  {
    name: 'Shopee',
    logo: '/logos/shopee.svg',
    company: 'Shopee Pte. Ltd.',
    category: 'E-commerce',
    phone: '+65 6206 6610',
    keywords: ['shopee', 'shopee pay', 'online shopping', 'coins', 'voucher', 'deals'],
    website: 'https://shopee.sg',
    social: { facebook: 'ShopeeSG', instagram: 'shopee_sg', twitter: 'ShopeeSG' }
  },
  {
    name: 'Starbucks',
    logo: '/logos/starbucks.svg',
    company: 'Starbucks Coffee Singapore',
    category: 'Food & Beverage',
    phone: '+65 6337 8888',
    keywords: ['starbucks', 'coffee', 'cafe', 'drinks', 'starbucks card', 'frappuccino', 'beverage'],
    website: 'https://www.starbucks.com.sg',
    social: { facebook: 'StarbucksSingapore', instagram: 'starbuckssg', twitter: 'StarbucksSG' }
  }
]

const COUNTRIES = ['Singapore', 'Singapore', 'Malaysia', 'Vietnam', 'Thailand', 'Indonesia', 'Philippines']
const PRODUCT_COUNTS = [250, 400, 250, 300, 100, 30, 120, 180, 75, 500]
const TOTAL_BRANDS = 60

function buildBrand (index) {
  const base = BASE_BRANDS[index % BASE_BRANDS.length]
  const id = String(123456 + index)

  return {
    id,
    name: base.name,
    logo: base.logo,
    // Roughly 2 in 7 brands are inactive (incl. the first Amazon and Subway, as in the design).
    status: index % 7 === 1 || index % 7 === 4 ? 'inactive' : 'active',
    country: COUNTRIES[index % COUNTRIES.length],
    products: PRODUCT_COUNTS[index % PRODUCT_COUNTS.length],
    company: base.company,
    category: base.category,
    phone: base.phone,
    keywords: base.keywords.slice(),
    socialNetworks: [
      { type: 'website', label: 'Website', url: base.website },
      { type: 'facebook', label: 'Facebook', url: `https://www.facebook.com/${base.social.facebook}` },
      { type: 'instagram', label: 'Instagram', url: `https://www.instagram.com/${base.social.instagram}` },
      { type: 'twitter', label: 'Twitter', url: `https://twitter.com/${base.social.twitter}` }
    ]
  }
}

export const BRANDS = Array.from({ length: TOTAL_BRANDS }, (_, i) => buildBrand(i))
