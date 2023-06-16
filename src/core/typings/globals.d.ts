import "@testing-library/jest-dom/extend-expect";

declare global {

  type AppAction = {
    type: string,
    payload?: any
  };

  type DispatchType = (args: AppAction) => AppAction;
}
