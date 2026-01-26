"use client";

import {
  LayoutDashboard,
  Image as ImageIcon,
  Ship,
  CloudSun,
  RulerDimensionLine,
} from "lucide-react";
import Link from "next/link";
import { PracticeId } from "@/api/types";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Tabs({ practiceId }: { practiceId: PracticeId }) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
        <Tab
          label="Visão Geral"
          segment="geral"
          icon={LayoutDashboard}
          practiceId={practiceId}
        />

        <Tab
          label="Media"
          segment="media"
          icon={ImageIcon}
          practiceId={practiceId}
        />

        <Tab
          label="Barcos"
          segment="barcos"
          icon={Ship}
          practiceId={practiceId}
        />

        <Tab
          label="Tuning"
          segment="tuning"
          icon={RulerDimensionLine}
          practiceId={practiceId}
        />

        <Tab
          label="Meteorologia"
          segment="meteorologia"
          icon={CloudSun}
          practiceId={practiceId}
        />
      </nav>
    </div>
  );
}

function Tab({
  practiceId,
  segment,
  label,
  icon: Icon,
}: {
  practiceId: string;
  segment: string;
  label: string;
  icon: typeof CloudSun;
}) {
  const activeSegment = useSelectedLayoutSegment();
  const isActive = segment === activeSegment;

  return (
    <Link
      href={`/treinamentos/${practiceId}/${segment}`}
      className={`group flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
        isActive
          ? "border-primary text-primary"
          : "text-muted-foreground hover:border-border hover:text-foreground border-transparent"
      } `}
    >
      {/* Simplified: The Icon now inherits color from the parent 
        (Primary when active, Muted when inactive)
    */}
      <Icon className="h-4 w-4" />

      {label}
    </Link>
  );
}
