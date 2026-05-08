import { supabase } from '@/lib/supabase'
import ProductCard from './ProductCard'
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

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="text-4xl mb-3">🔋</p>
        <p className="font-medium">Belum ada produk tersedia.</p>
        <p className="text-sm">Silakan cek kembali nanti.</p>
      </div>
    )
  }

  const categories = ['Semua', ...Array.from(new Set(products.map((p) => p.category)))]

  return (
    <div>
      {/* Category filter — client side via URL */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <span
            key={cat}
            className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-default"
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
