import { Datetime } from "../shared";

export type MediaId = string;

type BaseMedia = {
  id: MediaId;
  title?: string;
  description?: string;
};

export type ImageMedia = {
  src: string;
  datetime: Datetime;
};

export type VideoMedia = BaseMedia & {
  src: string;
  startDatetime?: Datetime;
  durationInMinutes?: number;
};

export type Media = ImageMedia | VideoMedia;
