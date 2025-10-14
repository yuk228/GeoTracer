import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "lucide-react";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center max-w-4xl mx-auto">
      <div className="flex items-center gap-2 justify-center mt-20">
        <Navigation size={48} />
        <h1 className="text-4xl font-bold">GeoTracer</h1>
      </div>
      <div className="items-center justify-center mt-20 flex w-full max-w-md flex-col gap-2">
        <Input type="url" placeholder="Enter URL" aria-label="URL" />
        <Input
          type="url"
          placeholder="Discord Webhook URL (optional)"
          aria-label="Discord Webhook URL"
        />
        <Button className="w-full">Shorten</Button>
      </div>
    </main>
  );
}
