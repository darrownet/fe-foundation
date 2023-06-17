/**
 * @jest-environment jsdom
 */

import React from "react";
import {fireEvent, waitFor} from "@testing-library/react";
import {commonSetup} from "../../../../tests/utils/renderComponentInApp";
import {users, user} from "../../../../tests/testData";

import Users from "../users";

import {IRequest} from "../../../../tests/utils/renderComponentInApp";

describe("<Users />", () => {

  test("should render the Users Component with no users", () => {
    const {component} = commonSetup(<Users/>);
    const ul = component.getByRole('list');
    expect(ul.children.length).toEqual(0);
  });

  test("should render the Users Component with 30 users", async () => {
    const requests: IRequest[] = [
      {method: 'get', route: 'users', response: users},
    ]
    const {component} = commonSetup(<Users/>, {}, requests);
    const ul = component.getByRole('list');
    await waitFor(() => {
      expect(ul.children.length).toEqual(30);
    });
  });

  test("should render the Users Component and clear a selected user if one is stored in state", async () => {
    const initialState = {userDetails:{user}}
    const requests: IRequest[] = [
      {method: 'get', route: 'users', response: users},
    ]
    const {component} = commonSetup(<Users/>, initialState, requests);
    const ul = component.getByRole('list');
    await waitFor(() => {
      expect(ul.children.length).toEqual(30);
    });
  });

  test("should render the Users Component with 30 users and filter them to 1", async () => {
    const requests: IRequest[] = [
      {method: 'get', route: 'users', response: users},
    ]
    const {component} = commonSetup(<Users/>, {}, requests);
    const ul = component.getByRole('list');
    await waitFor(() => {
      expect(ul.children.length).toEqual(30);
    });
    const input = component.container.querySelectorAll('.users .filter-users input')[0]
    fireEvent.change(input, {
      target: { value: "jes" }
    });
    await waitFor(() => {
      expect(ul.children.length).toEqual(1);
    });
  });

});
