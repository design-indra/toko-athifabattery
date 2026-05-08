export interface Product {
  id: string
  name: string
  description: string
  price: number
  discount_percent: number
  stock: number
  category: string
  brand: string
  image_url: string
  is_featured: boolean
  is_active: boolean
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  items: CartItem[]
  total_price: number
  payment_method: string
  status: 'pending' | 'confirmed' | 'done' | 'cancelled'
  created_at: string
}

export interface Review {
  id: string
  product_id: string
  reviewer_name: string
  rating: number
  comment: string
  created_at: string
}

export interface Banner {
  id: number
  title: string
  subtitle: string
  bg_color: string
}
