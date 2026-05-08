import { CartItem } from './types'

const WA_NUMBER = '6287882385071'

export function generateWALink(items: CartItem[], paymentMethod?: string): string {
  const lines = items
    .map(
      (item) =>
        `🔋 ${item.product.name} × ${item.quantity} = ${formatRupiah(
          getFinalPrice(item.product.price, item.product.discount_percent) * item.quantity
        )}`
    )
    .join('\n')

  const total = items.reduce(
    (sum, item) =>
      sum + getFinalPrice(item.product.price, item.product.discount_percent) * item.quantity,
    0
  )

  const method = paymentMethod ?? 'COD / Transfer / Ambil Langsung'

  const message = `Halo Toko Athifabattery 👋

Saya ingin memesan produk berikut:

${lines}

💰 Total: ${formatRupiah(total)}
💳 Metode Bayar: ${method}

Mohon konfirmasinya. Terima kasih! 🙏`

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function generateSingleWALink(
  productName: string,
  price: number,
  discountPercent: number
): string {
  const finalPrice = getFinalPrice(price, discountPercent)
  const message = `Halo Toko Athifabattery 👋

Saya ingin memesan:

🔋 *${productName}*
   Harga: ${formatRupiah(finalPrice)}
   Qty: 1

💰 Total: ${formatRupiah(finalPrice)}
💳 Metode: COD / Transfer / Ambil Langsung

Mohon konfirmasinya. Terima kasih! 🙏`

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function getFinalPrice(price: number, discountPercent: number): number {
  if (!discountPercent) return price
  return Math.round(price - (price * discountPercent) / 100)
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}
