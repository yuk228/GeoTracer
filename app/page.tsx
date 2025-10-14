import { Navigation } from "lucide-react";

export default function Page() {
  return (
    <main>
      <div className="flex items-center gap-2 justify-center mt-20">
        <Navigation size={48} />
        <h1 className="text-4xl font-bold">GeoTracer</h1>
      </div>
    </main>
  );
}
