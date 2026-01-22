import { SailingClass } from "../shared";

export type TuningModelId = string;

export type TuningModel = {
  id: TuningModelId;
  class: SailingClass;
  // etc
};
