"use server";

import { Practice, PracticeId } from "@/api/types";
import { MOCK_PRACTICES } from "./MOCK_PRACTICES";
import { cache } from "react";

export const getPracticeById = cache(async function (
  id: PracticeId,
): Promise<Practice> {
  const practice = MOCK_PRACTICES.find((p) => p.id === id);

  if (!practice) {
    return MOCK_PRACTICES[0];
  }

  return practice;
});

export const getPractices = cache(async function (): Promise<Practice[]> {
  return MOCK_PRACTICES;
});
