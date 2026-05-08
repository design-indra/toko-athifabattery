import { supabase } from '@/lib/supabase'
import ProductGridClient from './ProductGridClient'
import { Product } from '@/lib/types'

async function getProducts(): Promise<Product[]> {
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
