"use client";

import { ProgressProvider as BProgressProvider } from "@bprogress/next/app";

export default function ProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BProgressProvider
      height="4px"
      color="var(--primary)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </BProgressProvider>
  );
}
