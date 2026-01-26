"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { APP_BASE_URL } from "@/app/constants";

interface UseSafeGoBackOptions {
  fallbackToSegment?: boolean;
}

export default function useSafeGoBack(options?: UseSafeGoBackOptions) {
  const router = useRouter();

  const pathname = usePathname();

  return React.useCallback(() => {
    const hasHistory = window.history.length > 2 && window.history.state;
    const previousRouteIsInternal = document.referrer.startsWith(APP_BASE_URL);

    if (hasHistory && previousRouteIsInternal) {
      return router.back();
    }

    const parentPath = pathname.replace(/\/[^/]+\/?$/, "/");
    if (options?.fallbackToSegment && parentPath) {
      router.push(parentPath);
      return;
    }

    router.push("/");
  }, [router, pathname, options?.fallbackToSegment]);
}
