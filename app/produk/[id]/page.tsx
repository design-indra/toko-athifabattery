import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductDetailClient from './ProductDetailClient'
import type { Metadata } from 'next'
import { formatRupiah, getFinalPrice } from '@/lib/whatsapp'

interface Props { params: { id: string } }

async function getProduct(id: string) {
  const { data } = await supabase.from('products').select('*').eq('id', id).single()
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id)
  if (!product) return { title: 'Produk tidak ditemukan' }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: `${formatRupiah(getFinalPrice(product.price, product.discount_percent))} — Beli di Toko Athifabattery`,
      images: product.image_url ? [product.image_url] : [],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.id)
  if (!product) notFound()

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', params.id)
    .order('created_at', { ascending: false })

  return (
    <>
      <Navbar />
      <ProductDetailClient product={product} reviews={reviews ?? []} />
      <Footer />
    </>
  )
}
