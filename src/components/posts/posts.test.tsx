/**
 * @jest-environment jsdom
 */

import React from "react";
import {fireEvent, waitFor} from "@testing-library/react";
import {commonSetup} from "../../../tests/utils/renderComponentInApp";
import {posts} from "../../../tests/testData";

import Posts from "./posts";

import {IRequest} from "../../../tests/utils/renderComponentInApp";

describe("<Posts />", () => {

  test("should render the Posts Component with no posts", () => {
    const {component} = commonSetup(<Posts/>);
    const ul = component.getByRole('list');
    expect(ul.children.length).toEqual(0);
  });

  test("should render the Posts Component with 100 posts", async () => {
    const requests: IRequest[] = [
      {method: 'get', route: 'posts', response: posts},
    ]
    const {component} = commonSetup(<Posts/>, {}, requests);
    const ul = component.getByRole('list');
    await waitFor(() => {
      expect(ul.children.length).toEqual(100);
    });
  });

  test("should render the Posts Component with 100 posts and filter them to 1", async () => {
    const requests: IRequest[] = [
      {method: 'get', route: 'users', response: posts},
    ]
    const {component} = commonSetup(<Posts/>, {}, requests);
    const ul = component.getByRole('list');
    await waitFor(() => {
      expect(ul.children.length).toEqual(100);
    });
    const input = component.container.querySelectorAll('.typeahead-select-box input')[0]
    fireEvent.change(input, {
      target: {value: "laborum non"}
    });
    await waitFor(() => {
      expect(ul.children.length).toEqual(1);
    });
  });

});
