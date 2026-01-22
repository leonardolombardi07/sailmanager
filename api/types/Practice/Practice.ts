import { CoachId } from "../Coach";
import { Location } from "../Location";
import { MediaId } from "./Media";
import { SailingClass, Datetime, Rating, Status, Tag } from "../shared";
import { TuningModelId } from "../TuningModel";
import { SailorId } from "../Sailor";
import { MeteorologySummary } from "../Meteorology";

export type PracticeId = string;

export type Practice = {
  id: PracticeId;
  //
  status: Status;
  //
  metereologySummary: MeteorologySummary;
  otherMetereologySummaries: MeteorologySummary[]; // This is a bad name, I know
  //
  name: string;
  descriptionMarkdown: string;
  rating: Rating;
  location: Location;
  //
  expectedStart: Datetime;
  expectedEnd: Datetime;
  actualStart?: Datetime;
  actualEnd?: Datetime;
  //
  classes: SailingClass[];
  tags: Tag[];
  //
  coachIds: CoachId[];
  sailorIds: SailorId[];
  tunningModelIds: TuningModelId[];
  mediaIds: MediaId[];
};
