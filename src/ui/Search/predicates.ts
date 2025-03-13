import { GenderValueType, StatusValueType } from "../../Container/types";

export const isStatusValueType = (value: string): value is StatusValueType => {
  return (
    value === "all" ||
    value === "alive" ||
    value === "dead" ||
    value === "unknown"
  );
};

export const isGenderValueType = (value: string): value is GenderValueType => {
  return (
    value === "all" ||
    value === "female" ||
    value === "male" ||
    value === "genderless" ||
    value === "unknown"
  );
};
