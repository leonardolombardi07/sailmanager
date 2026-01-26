import { Metadata } from "next";
import { APP_NAME } from "../../constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Início | ${APP_NAME}`,
  };
}

export default async function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 px-4 pt-6 font-sans dark:bg-black">
      <Button>
        <Link href="/treinamentos">Treinamentos</Link>
      </Button>
    </div>
  );
}
