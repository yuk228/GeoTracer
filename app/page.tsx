import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "lucide-react";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 justify-center mt-20">
        <Navigation size={48} />
        <h1 className="text-4xl font-bold">GeoTracer</h1>
      </div>
      <div className="items-center justify-center mt-20 flex flex-col gap-2">
        <Input type="url" placeholder="Enter URL" />
        <Button>Shorten</Button>
      </div>
    </main>
  );
}
