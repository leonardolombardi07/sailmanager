import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Media } from "@/api/types";

interface MediaShowerProps {
  media: Media | undefined;
}

export function MediaShower({ media }: MediaShowerProps) {
  if (!media) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center bg-zinc-950">
        Select an item from the sidebar to begin.
      </div>
    );
  }

  return (
    // Flex-1 ensures it fills the remaining height after the Header
    <div className="flex flex-1 flex-col items-center overflow-y-auto bg-zinc-950 p-4 lg:p-8">
      <div className="w-full max-w-5xl">
        <AspectRatio
          ratio={16 / 9}
          className="overflow-hidden rounded-lg border bg-black shadow-2xl"
        >
          {media.type === "video" ? (
            <video
              className="h-full w-full object-contain"
              controls
              autoPlay={true}
              poster={media.thumbnail}
              src={media.src}
            >
              Your browser does not support the video tag.
            </video>
          ) : media.type === "image" ? (
            <img
              src={media.src}
              alt={media.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Alert variant="destructive" className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Unsupported media type encountered.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </AspectRatio>

        {/* Optional: Annotations or Footer below media */}
        {media.type === "video" && media.annotations && (
          <div className="mt-4 grid gap-2">
            {media.annotations.map((note) => (
              <div
                key={note.id}
                className="rounded border border-white/10 bg-white/5 p-3 text-sm text-zinc-300"
              >
                <span className="text-primary mr-2 font-mono">
                  {formatTime(note.rangeInSeconds[0])}
                </span>
                {note.message}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
