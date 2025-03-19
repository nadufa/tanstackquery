import { ComponentType } from "react";

export const withConsoleLog = <T extends object>(
  Component: ComponentType<T>,
  logData: string
) => {
  return (props: T) => {
    console.log(logData);

    return <Component {...props} />;
  };
};
