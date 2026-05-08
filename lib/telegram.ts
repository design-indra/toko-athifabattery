import { Order } from './types'
import { formatRupiah } from './whatsapp'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!

export async function sendTelegramNotification(order: Order): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return

  const itemLines = order.items
    .map(
      (item) =>
        `  • ${item.product.name} × ${item.quantity} = ${formatRupiah(
          item.product.price * item.quantity
        )}`
    )
    .join('\n')

  const now = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })

  const text = `🔔 *PESANAN BARU — Toko Athifabattery*

👤 Nama: ${order.customer_name}
📱 WA: ${order.customer_phone}
🛍️ Pesanan:
${itemLines}

💰 Total: ${formatRupiah(order.total_price)}
💳 Bayar: ${order.payment_method}
📅 Waktu: ${now} WIB

[Lihat di Dashboard →](${process.env.NEXT_PUBLIC_APP_URL}/admin/pesanan)`

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'Markdown',
    }),
  })
}
