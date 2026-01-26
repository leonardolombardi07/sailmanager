"use client";

import * as React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FixedSidebar } from "./navigation";
import { Header } from "./header";
import { MediaShower } from "./main";
import { PracticeMedias } from "@/api/types";
import useSafeGoBack from "@/lib/navigation/use-safe-go-back";

// GERADOR DE DADOS DE EXEMPLO (Para demonstração)
const MOCK_DATA: PracticeMedias = {
  slugs: ["intro-video", "tacking-diagram", "wind-analysis"],
  elements: [
    { title: "Sessão Matinal", description: "Treinamento de cambadas" },
    0, // intro-video
    { title: "Treino na Água", description: "Exercícios e técnicas" },
    1, // tacking-diagram
    2, // wind-analysis
  ],
  mediasById: {
    m1: {
      id: "m1",
      type: "video",
      title: "Cambada 1x1",
      description:
        "O treinador descreve a estratégia de vento para o dia. Preste atenção à discussão sobre as rajadas.",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      slug: "intro-video",
      elementIndex: 0,
      thumbnail: "/placeholder.jpg",
      durationInSeconds: 120,
      annotations: [
        {
          id: "a1",
          videoId: "m1",
          message: "Ponto chave da estratégia de vento aqui",
          rangeInSeconds: [10, 20],
        },
      ],
    },
    m2: {
      id: "m2",
      type: "image",
      title: "Diagrama de Ângulo de Cambada",
      src: "https://placehold.co/600x400/png",
      slug: "tacking-diagram",
      description: "Ângulos ideais para vento de 15 nós.",
    },
    m3: {
      id: "m3",
      type: "video",
      title: "Visão do Drone - Contravento",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      slug: "wind-analysis",
      elementIndex: 2,
      thumbnail: "/placeholder.jpg",
      durationInSeconds: 300,
    },
  },
};

export default function PracticePage() {
  const [currentMediaId, setCurrentMediaId] = React.useState<string>("m1");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const safeGoBack = useSafeGoBack({ fallbackToSegment: true });
  // Helper to find media
  const activeMedia = MOCK_DATA.mediasById[currentMediaId];

  // Navigation handlers
  const handleNext = () => {
    // Logic to find next media ID based on elements list
    console.log("Next clicked");
  };

  const handlePrev = () => {
    console.log("Prev clicked");
  };

  return (
    <div className="bg-background text-foreground h-screen w-screen overflow-hidden">
      <ResizablePanelGroup>
        <ResizableHandle />

        {/* RIGHT MAIN CONTENT PANEL */}
        <ResizablePanel defaultSize={140}>
          <div className="flex h-full flex-col">
            <Header
              activeMedia={activeMedia}
              practiceTitle="Treinamento 24/01 - Vento Forte"
              practiceDate="Jan 24, 2026"
              onPrev={handlePrev}
              onNext={handleNext}
              onBack={safeGoBack}
            />

            {/* The Stage */}
            <MediaShower media={activeMedia} />
          </div>
        </ResizablePanel>

        {/* LEFT SIDEBAR PANEL */}
        <ResizablePanel
          defaultSize={60}
          minSize={60}
          //   maxSize={60}
          collapsible={true}
          collapsedSize={4}
          className={
            isSidebarCollapsed
              ? "min-w-[50px] transition-all duration-300 ease-in-out"
              : "transition-all duration-300 ease-in-out"
          }
        >
          <FixedSidebar
            data={MOCK_DATA}
            currentMediaId={currentMediaId}
            onMediaSelect={setCurrentMediaId}
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
