import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramNotification } from '@/lib/telegram'
import { Order } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const order: Order = await req.json()
    await sendTelegramNotification(order)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
