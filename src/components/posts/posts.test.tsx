/**
 * @jest-environment jsdom
 */
import {act, fireEvent, waitFor} from "@testing-library/react";
import {commonSetup} from "../../../tests/utils/renderComponentInApp";
import {posts} from "../../../tests/testData";

import Posts from "./posts";

import {IRequest} from "../../../tests/utils/renderComponentInApp";

describe("<Posts />", () => {

  test("should render the Posts Component with no posts", async () => {
    const {component} = commonSetup(<Posts/>);
    const selectAff = component.container.querySelectorAll('i')[0];
    await act(async () => {
      fireEvent.click(selectAff);
    });
    const ul = component.getByRole('list');
    expect(ul.children.length).toEqual(0);
  });

  test("should render the Posts Component with 100 posts", async () => {
    const requests: IRequest[] = [
      {method: 'get', route: 'posts', response: posts},
    ]
    const {component} = commonSetup(<Posts/>, {}, requests);
    const selectAff = component.container.querySelectorAll('i')[0];
    await act(async () => {
      fireEvent.click(selectAff);
    });
    const ul = component.getByRole('list');
    await waitFor(() => {
      expect(ul.children.length).toEqual(100);
    });
    const input = component.container.querySelectorAll('.typeahead-select-box input')[0]
    fireEvent.change(input, {
      target: {value: "laborum non"}
    });
    await waitFor(() => {
      expect(ul.children.length).toEqual(100);
    });
  });

});
