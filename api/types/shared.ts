export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export type Tag = string;

export type ISO8601Datetime = string;
export type Timezone = string;

export type Datetime = {
  datetime: ISO8601Datetime;
  timezone: Timezone;
};

export type Status = "scheduled" | "ongoing" | "finished";

export type SailingClass = "420" | "Laser" | "470";
