/**
 * @jest-environment jsdom
 */

import React from "react";
import {fireEvent, waitFor} from "@testing-library/react";
import {commonSetup} from "../../../../tests/utils/renderComponentInApp";
import {users, user} from "../../../../tests/testData";

import Posts from "../posts";

import {IRequest} from "../../../../tests/utils/renderComponentInApp";

describe("<Posts />", () => {

  test("should render the Posts Component with no posts", () => {
    const {component} = commonSetup(<Posts/>);
    const ul = component.getByRole('list');
    expect(ul.children.length).toEqual(0);
  });

  test("should render the Posts Component with 30 posts", async () => {
    const requests: IRequest[] = [
      {method: 'get', route: 'users', response: users},
    ]
    const {component} = commonSetup(<Posts/>, {}, requests);
    const ul = component.getByRole('list');
    await waitFor(() => {
      expect(ul.children.length).toEqual(30);
    });
  });

  test("should render the Posts Component and clear a selected user if one is stored in state", async () => {
    const initialState = {userDetails:{user}}
    const requests: IRequest[] = [
      {method: 'get', route: 'users', response: users},
    ]
    const {component} = commonSetup(<Posts/>, initialState, requests);
    const ul = component.getByRole('list');
    await waitFor(() => {
      expect(ul.children.length).toEqual(30);
    });
  });

  test("should render the Posts Component with 30 posts and filter them to 1", async () => {
    const requests: IRequest[] = [
      {method: 'get', route: 'users', response: users},
    ]
    const {component} = commonSetup(<Posts/>, {}, requests);
    const ul = component.getByRole('list');
    await waitFor(() => {
      expect(ul.children.length).toEqual(30);
    });
    const input = component.container.querySelectorAll('.posts .filter-posts input')[0]
    fireEvent.change(input, {
      target: { value: "jes" }
    });
    await waitFor(() => {
      expect(ul.children.length).toEqual(1);
    });
  });

});
