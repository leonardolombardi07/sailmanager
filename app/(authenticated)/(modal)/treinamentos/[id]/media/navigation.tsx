import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PlayCircle, Image as ImageIcon, PanelLeftClose } from "lucide-react";
import { PracticeMedias } from "@/api/types";

interface FixedSidebarProps {
  data: PracticeMedias;
  currentMediaId: string;
  onMediaSelect: (id: string) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export function FixedSidebar({
  data,
  currentMediaId,
  onMediaSelect,
  isCollapsed,
  toggleSidebar,
}: FixedSidebarProps) {
  if (isCollapsed) {
    return (
      <div className="bg-muted/10 flex h-full flex-col items-center border-r py-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <PanelLeftClose className="h-5 w-5 rotate-180" />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background flex h-full w-full flex-col border-r">
      {/* Sidebar Header */}
      <div className="flex h-14 items-center justify-between border-b p-4">
        <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          Media
        </span>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <PanelLeftClose className="h-4 w-4" />
        </Button>
      </div>

      {/* List Content */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          <PracticeElements
            data={data}
            currentMediaId={currentMediaId}
            onSelect={onMediaSelect}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

// Sub-component for the actual list logic
function PracticeElements({
  data,
  currentMediaId,
  onSelect,
}: {
  data: PracticeMedias;
  currentMediaId: string;
  onSelect: (id: string) => void;
}) {
  const { elements, mediasById, slugs } = data;

  return (
    <>
      {elements.map((element, index) => {
        // CASE 1: It is a SECTION (Header)
        if (typeof element === "object") {
          return (
            <div key={`section-${index}`} className="mt-4 mb-2 px-2">
              <h3 className="text-foreground text-sm font-bold">
                {element.title}
              </h3>
              <p className="text-muted-foreground text-xs">
                {element.description}
              </p>
            </div>
          );
        }

        // CASE 2: It is a MEDIA (Link)
        const slug = slugs[element];
        // Find the media object that corresponds to this slug/index
        // Note: In a real app, you might map slug -> id differently.
        // Here assuming we can find it via iteration or the struct allows it.
        // For this snippet, let's find the media by values for demo purposes:
        const media = Object.values(mediasById).find((m) => m.slug === slug);

        if (!media) return null;

        const isActive = media.id === currentMediaId;
        const Icon = media.type === "video" ? PlayCircle : ImageIcon;
        const duration =
          media.type === "video"
            ? `${Math.floor(media.durationInSeconds / 60)}m`
            : null;

        return (
          <button
            key={media.id}
            onClick={() => onSelect(media.id)}
            className={cn(
              "group flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm transition-colors",
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            />

            <div className="flex-1 truncate">
              {media?.title || "Untitled Media"}
            </div>

            {duration && (
              <span className="text-xs opacity-70 group-hover:opacity-100">
                {duration}
              </span>
            )}
          </button>
        );
      })}
    </>
  );
}
