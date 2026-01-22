import { SailorId } from "../Sailor";
import { SailingClass } from "../shared";

export type BoatId = string;

export type Boat = {
  id: BoatId;
  class: SailingClass;
  sailNumber: string; // e.g. BRA 3563
  ownerId: SailorId;
  //   etc.
};
