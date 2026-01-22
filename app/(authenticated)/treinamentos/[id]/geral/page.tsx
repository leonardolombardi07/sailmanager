import {
  MapPin,
  Wind,
  Waves,
  Thermometer,
  Cloud,
  Droplets,
  Anchor,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Practice,
  MeteorologySummary,
  Datetime,
  PracticeId,
} from "@/api/types"; // Adjust path as needed
import { getPracticeById } from "@/api/server";

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

export type PageProps = {
  params: Promise<{ id: PracticeId }>;
};

export default async function Page({ params }: PageProps) {
  const { id: practiceId } = await params;
  const practice = await getPracticeById(practiceId);

  if (!practice) return <div>Practice not found</div>;

  return (
    <div className="min-h-screen pb-14 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT COLUMN (Main Content) - Spans 2 columns on large screens */}
          <div className="space-y-8 lg:col-span-2">
            <GeneralInformationHeader practice={practice} />

            <Separator />

            <CoachesCarouselSection coachIds={practice.coachIds} />

            <DescriptionSection description={practice.descriptionMarkdown} />

            <SailorsCarouselSection sailorIds={practice.sailorIds} />
          </div>

          {/* RIGHT COLUMN (Sidebar/Stats) - Spans 1 column */}
          <div className="space-y-6">
            <MeterologySections data={practice.metereologySummary} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function GeneralInformationHeader({ practice }: { practice: Practice }) {
  const statusColors = {
    scheduled: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    ongoing: "bg-green-100 text-green-800 hover:bg-green-100",
    finished: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  };

  return (
    <div className="space-y-4">
      {/* Top Row: Status & Date */}
      <div className="text-muted-foreground flex items-center gap-3 text-sm">
        <Badge
          variant="outline"
          className={`border-0 px-2.5 py-0.5 capitalize ${statusColors[practice.status]}`}
        >
          {practice.status === "finished"
            ? "Finalizado"
            : practice.status === "ongoing"
              ? "Em Andamento"
              : "Agendado"}
        </Badge>

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
          <MapPin className="h-4 w-4 text-orange-500" />
          {practice.location.place.name}
        </div>

        <div className="h-4 w-px bg-gray-300" />

        <div className="flex items-center gap-2">
          {/* Classes Badges */}
          {practice.classes.map((cls) => (
            <Badge key={cls} variant="secondary" className="font-normal">
              {cls}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tags */}
      {practice.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {practice.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function CoachesCarouselSection({ coachIds }: { coachIds: string[] }) {
  // Mocking coach data fetch
  const coaches = coachIds.map((id) => ({
    id,
    name: "Lucas Faria",
    image:
      "https://instagram.fsdu40-1.fna.fbcdn.net/v/t51.75761-15/503644608_18515974654011700_4398614960091936268_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=101&ig_cache_key=MzY2NTI0MjI0OTg0Mzg2MTQxMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5oZHIuQzMifQ%3D%3D&_nc_ohc=v0tjNxJ9KTYQ7kNvwHxOcvp&_nc_oc=AdnKoNOaNtbi9ILczV3bzwfI-8_L3hHdT6HV0rCjP9-qLyF5gwg0HR4mPsogfHUzeAkiLmHi3m7G5PJbMdON4tTE&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fsdu40-1.fna&_nc_gid=ZYMUcdECgy-XvqKt-gEKrQ&oh=00_Afq208rnmcCp0AnZGgVaEuozNmf55hgwSb6MkkK2GmDQJA&oe=69776805",
  }));

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        Técnicos{" "}
        <span className="text-sm font-normal text-gray-400">
          ({coaches.length})
        </span>
      </h3>

      <Carousel className="w-full max-w-sm">
        <CarouselContent>
          {coaches.map((coach) => (
            <CarouselItem key={coach.id} className="basis-1/4 md:basis-1/5">
              <div className="flex flex-col items-center gap-2 text-center">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src={coach.image} />
                  <AvatarFallback className="bg-orange-100 text-orange-700">
                    CM
                  </AvatarFallback>
                </Avatar>
                <span className="w-full truncate text-xs font-medium">
                  {coach.name}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Simple nav arrows if list is long */}
        <div className="hidden sm:block">
          <CarouselPrevious className="-left-4 h-8 w-8" />
          <CarouselNext className="-right-4 h-8 w-8" />
        </div>
      </Carousel>
    </div>
  );
}

function DescriptionSection({ description }: { description: string }) {
  return (
    <div className="prose prose-stone max-w-none rounded-lg border bg-white p-6 text-sm leading-relaxed text-gray-700 shadow-sm">
      {/* Simple markdown rendering simulation */}
      {description.split("\n").map((line, i) => (
        <p key={i} className={line.startsWith("*") ? "ml-4 list-disc" : "mb-2"}>
          {line.replace(/\*\*/g, "")}
        </p>
      ))}
    </div>
  );
}

function SailorsCarouselSection({ sailorIds }: { sailorIds: string[] }) {
  // Mocking sailor data
  const sailors = sailorIds.map((id, i) => ({
    id,
    name: `Velejador ${i + 1}`,
    image: "",
  }));

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        Velejadores{" "}
        <span className="text-sm font-normal text-gray-400">
          ({sailors.length})
        </span>
      </h3>

      <Carousel className="w-full">
        <CarouselContent>
          {sailors.map((sailor) => (
            <CarouselItem
              key={sailor.id}
              className="basis-1/5 md:basis-1/6 lg:basis-1/8"
            >
              <div className="group flex cursor-pointer flex-col items-center gap-2 text-center">
                <Avatar className="h-14 w-14 ring-orange-400 transition group-hover:ring-2">
                  <AvatarImage src={sailor.image} />
                  <AvatarFallback className="bg-slate-100 text-xs text-slate-600">
                    S{sailor.id.split("-")[1]}
                  </AvatarFallback>
                </Avatar>

                <span className="w-full truncate text-xs text-gray-600">
                  {sailor.name}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="hidden sm:block">
          <CarouselPrevious className="-left-4 h-8 w-8" />
          <CarouselNext className="-right-4 h-8 w-8" />
        </div>
      </Carousel>
    </div>
  );
}

function MeterologySections({ data }: { data: MeteorologySummary }) {
  return (
    <Card className="overflow-hidden border-0 bg-white shadow-sm ring-1 ring-gray-200">
      <CardHeader className="border-b pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Cloud className="h-4 w-4 text-gray-500" />
          Condições Metereológicas
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-6 px-6 py-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-orange-50 p-2 text-orange-600">
              {getConditionIcon(data.condition)}
            </div>

            <div>
              <div className="text-2xl font-bold text-gray-900">
                {data.temperature}°C
              </div>

              <div className="text-xs text-gray-500 capitalize">
                {data.condition === "cloudy" ? "Nublado" : "Ensolarado"}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {data.feelsLikeTemperature}°C
            </div>

            <div className="text-muted-foreground text-xs">
              Sensação Térmica
            </div>
          </div>
        </div>

        <Separator />

        {/* Wind Section */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            <Wind className="h-3 w-3" /> Vento
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <StatItem
              label="Intensidade"
              value={`${data.wind.speed} nós`}
              sub={`Rajada ${data.wind.gust} nós`}
            />

            <StatItem
              label="Direção"
              value={`${data.wind.direction}°`}
              sub={`Rondada ${data.wind.shift}°`}
            />
          </div>
        </div>

        {/* Waves & Current Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="flex items-center gap-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">
              <Waves className="h-3 w-3" /> Ondas
            </h4>

            <StatItem label="Altura" value={`${data.waves.height}m`} />

            <StatItem label="Período" value={`${data.waves.period}s`} />
          </div>

          <div className="space-y-3">
            <h4 className="flex items-center gap-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">
              <Anchor className="h-3 w-3" /> Corrente
            </h4>

            <StatItem label="Intensidade" value={`${data.current.speed} nós`} />

            <StatItem label="Direção" value={`${data.current.direction}°`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getConditionIcon(condition: string) {
  switch (condition) {
    case "rainy":
      return <Droplets className="h-5 w-5" />;
    case "sunny":
      return <Thermometer className="h-5 w-5" />; // Or a Sun icon if available
    default:
      return <Cloud className="h-5 w-5" />;
  }
}

function StatItem({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <div className="text-sm font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
      {sub && <div className="mt-0.5 text-[10px] text-gray-400">{sub}</div>}
    </div>
  );
}
