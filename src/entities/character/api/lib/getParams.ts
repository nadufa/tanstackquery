import { ISearchState } from "../../../../shared/types";

interface GetParamsType extends ISearchState {
  pageParam: number;
}

export const getParams = ({
  genderValue,
  inputSelect,
  inputText,
  statusValue,
  pageParam,
}: GetParamsType) => {
  const params = [
    { condition: inputText, key: inputSelect?.value, value: inputText },
    {
      condition: statusValue && statusValue !== "all",
      key: "status",
      value: statusValue,
    },
    {
      condition: genderValue && genderValue !== "all",
      key: "gender",
      value: genderValue,
    },
    { condition: pageParam, key: "page", value: pageParam },
  ]
    .map(({ condition, key, value }) => {
      return `${condition ? `&${key}=${value}` : ""}`;
    })
    .join("")
    .slice(1);

  return params.length ? "/?" + params : "";
};
