import { ISearchState } from "../../model";

export interface IGetParams extends ISearchState {
  pageParam: number;
  limit?: number;
}

export const getParams = ({
  genderValue,
  inputSelect,
  inputText,
  statusValue,
  pageParam,
  limit = 20,
}: IGetParams) => {
  const params = [
    {
      condition: inputText,
      key: inputSelect?.value.toLocaleLowerCase() + "_like",
      value: inputText,
    },
    {
      condition: statusValue && statusValue !== "all",
      key: "status_eq",
      value: statusValue,
    },
    {
      condition: genderValue && genderValue !== "all",
      key: "gender_eq",
      value: genderValue,
    },
    { condition: pageParam, key: "page", value: pageParam },
    { condition: true, key: "limit", value: limit },
  ]
    .map(({ condition, key, value }) => {
      return `${condition ? `&${key}=${value}` : ""}`;
    })
    .join("")
    .slice(1);

  return params.length ? "/?" + params : "";
};
