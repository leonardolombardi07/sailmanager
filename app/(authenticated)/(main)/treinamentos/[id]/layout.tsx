import { MapPin } from "lucide-react";
import { Practice, Datetime, PracticeId } from "@/api/types";
import { getPracticeById } from "@/api/server";
import Tabs from "./_layout/Tabs";
import { StatusBadge } from "@/components/status-badge";
import { SailingClassBadge } from "@/components/sailing-class-badge";

export type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: PracticeId }>;
};

export default async function Layout({ children, params }: LayoutProps) {
  const { id: practiceId } = await params;
  const practice = await getPracticeById(practiceId);

  return (
    <div className="min-h-screen pb-14 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER SECTION */}
        <div className="mb-8 space-y-8">
          <GeneralInformationHeader practice={practice} />
          <Tabs practiceId={practiceId} />
        </div>

        {children}
      </div>
    </div>
  );
}

function formatDate(dt: Datetime) {
  const date = new Date(dt.datetime);
  return new Intl.DateTimeFormat("pt-br", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function GeneralInformationHeader({ practice }: { practice: Practice }) {
  return (
    <div className="space-y-4">
      {/* Top Row: Status & Date */}
      <div className="text-muted-foreground flex items-center gap-3 text-sm">
        <StatusBadge status={practice.status}>
          {practice.status === "finished"
            ? "Finalizado"
            : practice.status === "ongoing"
              ? "Em Andamento"
              : "Agendado"}
        </StatusBadge>

        <span>
          {formatDate(practice.actualStart || practice.expectedStart)}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {practice.name}
      </h1>

      {/* Location & Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1.5">
          <MapPin className="text-primary h-4 w-4" />
          {practice.location.place.name}
        </div>

        <div className="h-4 w-px bg-gray-300" />

        <div className="flex items-center gap-2">
          {practice.classes.map((cls) => (
            <SailingClassBadge key={cls} sailingClass={cls}>
              {cls}
            </SailingClassBadge>
          ))}
        </div>
      </div>

      {/* Tags */}
      {practice.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {practice.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
