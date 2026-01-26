import type { Metadata } from "next";
import { APP_NAME } from "@/app/constants";
import { getPracticeById } from "@/api/server";
import { PracticeId } from "@/api/types";
import { redirect } from "next/navigation";

export type PageProps = {
  params: Promise<{ id: PracticeId }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const practice = await getPracticeById(id);

  return {
    title: `Treinamento ${practice.name} | ${APP_NAME}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return redirect(`/treinamentos/${id}/geral`);
}
