import React, {createContext} from "react";

interface IActionsContext {
  actions: any,
  data: any
}

const obj: IActionsContext = {actions: {}, data: {}}

export const ServiceContext = createContext<IActionsContext>(obj);

export const ServiceContextProvider = (props: any) => {
  const value = {
    actions: props.value.actionServices,
    data: props.value.dataService
  };
  return (
    <ServiceContext.Provider value={value}>
      {props.children}
    </ServiceContext.Provider>
  );
};
