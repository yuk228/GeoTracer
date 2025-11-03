import { Navigation } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center gap-2 justify-center">
      <Navigation size={48} />
      <h1 className="text-4xl font-bold">GeoTracer</h1>
    </div>
  )
}
