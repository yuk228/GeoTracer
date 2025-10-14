"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "lucide-react";
import { Turnstile } from "next-turnstile";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 justify-center mt-20">
        <Navigation size={48} />
        <h1 className="text-4xl font-bold">GeoTracer</h1>
      </div>
      <div className="items-center justify-center mt-20 flex w-full max-w-md flex-col gap-2 px-4">
        <Input type="url" placeholder="Enter URL" aria-label="URL" />
        <Input
          type="url"
          placeholder="Discord Webhook URL (optional)"
          aria-label="Discord Webhook URL"
        />
        <Button className="w-full">Shorten</Button>
        <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} />
      </div>
    </main>
  );
}
