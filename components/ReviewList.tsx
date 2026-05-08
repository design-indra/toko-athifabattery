import { supabase } from '@/lib/supabase'

export default async function ReviewList() {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (!reviews || reviews.length === 0) return null

  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <div key={r.id} className="card p-4 space-y-1">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <span key={s} className={s <= r.rating ? 'text-amber-400' : 'text-slate-200'}>★</span>
            ))}
          </div>
          <p className="font-bold text-sm">{r.judul}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{r.pesan}"</p>
          <p className="text-xs font-semibold text-slate-500 pt-1">{r.name}{r.lokasi ? ` / ${r.lokasi}` : ''}</p>
        </div>
      ))}
    </div>
  )
}
