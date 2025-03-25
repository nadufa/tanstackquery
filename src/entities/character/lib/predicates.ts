import { GenderValueType, StatusValueType } from "@/entities/character";

export const isStatusValueType = (value: string): value is StatusValueType => {
  return (
    value === "all" ||
    value === "Alive" ||
    value === "Dead" ||
    value === "unknown"
  );
};

export const isGenderValueType = (value: string): value is GenderValueType => {
  return (
    value === "all" ||
    value === "Female" ||
    value === "Male" ||
    value === "Genderless" ||
    value === "unknown"
  );
};
