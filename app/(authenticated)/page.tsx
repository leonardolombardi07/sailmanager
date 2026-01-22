import { Metadata } from "next";
import { APP_NAME } from "../constants";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Início | ${APP_NAME}`,
  };
}

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Hello</h1>
    </div>
  );
}
