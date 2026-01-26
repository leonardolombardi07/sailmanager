import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Info,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Media } from "@/api/types";

interface HeaderProps {
  activeMedia: Media | undefined;
  practiceTitle: string;
  practiceDate: string;
  onPrev: () => void;
  onNext: () => void;
  onBack: () => void;
}

export function Header({
  activeMedia,
  practiceTitle,
  practiceDate,
  onPrev,
  onNext,
  onBack,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-background w-full border-b">
      {/* Top Bar */}
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left: Navigation & Context */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="bg-muted/30 flex items-center gap-1 rounded-md border p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden flex-col md:flex">
            <h1 className="text-sm leading-tight font-semibold">
              {practiceTitle}
            </h1>
            <span className="text-muted-foreground text-xs">
              {practiceDate}
            </span>
          </div>
        </div>

        {/* Right: Search & Info Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative w-40 lg:w-64">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input placeholder="Pesquisar..." className="h-9 pl-8" />
          </div>

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant={isOpen ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Ver Detalhes</span>
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>

      {/* Collapsible Description Area */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent className="bg-muted/20 border-t">
          <div className="container mx-auto max-w-4xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{activeMedia?.title}</h2>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline">{activeMedia?.type}</Badge>
                  {activeMedia?.type === "video" && (
                    <Badge variant="secondary">
                      {activeMedia.durationInSeconds}s
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {activeMedia?.description || "Sem descrição."}
                </p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
