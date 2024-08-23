import { Unit } from "./types";

export const kelvinToOther = (temp: number, unit: Unit): number =>
  unit == "C" ? temp - 273.15 : (temp - 273.15) * 1.8 + 32;
