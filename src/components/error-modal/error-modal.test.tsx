/**
 * @jest-environment jsdom
 */

import React from "react";
import {commonSetup} from "../../../tests/utils/renderComponentInApp";

import ErrorModal from "./error-modal";

describe("<ErrorModal />", () => {

  test("should render no content from the error modal component", () => {
    const {component} = commonSetup(<ErrorModal/>);
    const testVal = "<div class=\"content\"></div>";
    expect(component.container.innerHTML).toEqual(testVal);
  });

  test("should render the error modal component with an error message", () => {
    const initialState = {app: {error: "some error"}}
    const {component} = commonSetup(<ErrorModal/>, initialState);
    const testVal = "<div class=\"content\"><div class=\"error-modal\"><h1>Error!</h1><p>some error</p></div></div>";
    expect(component.container.innerHTML).toEqual(testVal);
  });

});
