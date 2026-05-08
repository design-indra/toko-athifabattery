import { createClient } from '@supabase/supabase-js'
import ProductGridClient from './ProductGridClient'
import { Product } from '@/lib/types'

async function getProducts(): Promise<Product[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (url, options) =>
          fetch(url, { ...options, cache: 'no-store' }),
      },
    }
  )
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function ProductGrid() {
  const products = await getProducts()
  return <ProductGridClient products={products} />
}
