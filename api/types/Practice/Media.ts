import { Datetime } from "../shared";

export type MediaId = string;

type BaseMedia = {
  id: MediaId;
  title?: string;
  description?: string;
};

export type ImageMedia = BaseMedia & {
  type: "image";
  src: string;
  slug?: string;
  datetime?: Datetime;
};

type VideoAnnotation = {
  id: string;
  videoId: string;
  message: string;
  rangeInSeconds: [number, number];
};

export type VideoMedia = BaseMedia & {
  type: "video";
  src: string;
  slug?: string;
  startDatetime?: Datetime;
  elementIndex: number;
  thumbnail: string;
  durationInSeconds: number;
  annotations?: VideoAnnotation[];
};

export type Media = ImageMedia | VideoMedia;

export type PracticeSection = {
  title: string;
  description: string;
};

export type PracticeElement = number | PracticeSection;

export type PracticeMedias = {
  slugs: string[];
  elements: PracticeElement[];
  mediasById: Record<MediaId, Media>;
};
