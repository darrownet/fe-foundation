/**
 * @jest-environment jsdom
 */

import React from "react";
import {waitFor} from "@testing-library/react";
import {commonSetup} from "../../../../tests/utils/renderComponentInApp";
import {users, user} from "../../../../tests/testData";

import Home from "../home";

describe("<Home />", () => {

  test("should render the Home Component with no users", () => {
    const {component} = commonSetup(<Home/>);
    const ul = component.getByRole('list');
    expect(ul.children.length).toEqual(0);
  });

  test("should render the Home Component with 30 users", async () => {
    const requests = [{route:'users', data:users}]
    const {component} = commonSetup(<Home/>, {}, requests);
    const ul = component.getByRole('list');
    await waitFor(() => {
      expect(ul.children.length).toEqual(30);
    });
  });

  test("should render the Home Component and clear a selected user if one is stored in state", async () => {
    const initialState = {userDetails:{user}}
    const requests = [{route:'users', data:users}]
    const {component} = commonSetup(<Home/>, initialState, requests);
    const ul = component.getByRole('list');
    await waitFor(() => {
      expect(ul.children.length).toEqual(30);
    });
  });

});
