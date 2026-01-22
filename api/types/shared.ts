export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export type Tag = string;

export type ISO8601Datetime = string;
export type Timezone = string;

export type Datetime = {
  datetime: ISO8601Datetime;
  timezone: Timezone;
};

export type Status = "scheduled" | "ongoing" | "finished";

export type OlympicClass =
  | "ILCA 7" // Formerly ILCA 7 Standard
  | "ILCA 6" // Formerly ILCA 7 Radial
  | "ILCA 4" // Formerly ILCA 7 4.7
  | "49er"
  | "49erFX"
  | "470" // Mixed, Men, Women
  | "Nacra 17"
  | "iQFOiL" // Men, Women
  | "Formula Kite"
  | "Finn" // Historic Olympic
  | "Star" // Historic Olympic
  | "Europe" // Historic Olympic
  | "Elliott 6m"; // Historic Olympic

export type DinghyClass =
  | "Optimist"
  | "420"
  | "29er"
  | "505"
  | "Fireball"
  | "Flying Dutchman"
  | "Snipe"
  | "Lightning"
  | "Sunfish"
  | "OK Dinghy"
  | "Cadet"
  | "Mirror"
  | "Topper"
  | "RS Aero"
  | "RS Feva"
  | "RS Tera"
  | "RS 100"
  | "RS 200"
  | "RS 400"
  | "RS 800"
  | "Musto Skiff"
  | "Contender"
  | "Enterprise"
  | "GP14"
  | "Wayfarer"
  | "Sabot"
  | "Heron"
  | "Tasar"
  | "Thistle"
  | "Flying Scot"
  | "Moth" // Foiling
  | "Waszp"; // One-design Foiling

export type KeelboatClass =
  | "J/70"
  | "J/24"
  | "J/80"
  | "Melges 24"
  | "Melges 20"
  | "Melges 15"
  | "SB20"
  | "Etchells"
  | "Dragon"
  | "Soling"
  | "Yngling"
  | "Squib"
  | "Flying Fifteen"
  | "Sonar"
  | "Viper 640"
  | "VX One"
  | "TP52"
  | "RC44"
  | "Class40"
  | "IMOCA 60";

export type MultihullClass =
  | "Hobie 16"
  | "Hobie 14"
  | "Hobie Dragoon"
  | "Hobie Tiger"
  | "Hobie Wildcat"
  | "Tornado"
  | "Dart 18"
  | "A-Class Catamaran"
  | "F18"
  | "Nacra 15"
  | "Nacra F20"
  | "Topcat";

export type BoardClass = "RS:X" | "Techno 293" | "Kona One" | "Raceboard";

export type SailingClass =
  | OlympicClass
  | DinghyClass
  | KeelboatClass
  | MultihullClass
  | BoardClass;
