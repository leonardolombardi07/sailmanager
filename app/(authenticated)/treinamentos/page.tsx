import type { Metadata } from "next";
import { APP_NAME } from "@/app/constants";
import DataTable from "./_page/DataTable";
import { getPractices } from "@/api/server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Treinamentos | ${APP_NAME}`,
  };
}

export default async function Page() {
  const practices = await getPractices();

  return (
    <div className="pt-4">
      <div className="px-4 py-2 sm:px-8">
        <h1 className="text-2xl font-bold">Treinamentos</h1>
      </div>

      <div className="px-4">
        <DataTable practices={practices} />
      </div>
    </div>
  );
}
