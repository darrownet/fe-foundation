/**
 * @jest-environment jsdom
 */

import React from "react";
import {act} from "@testing-library/react";
import {commonSetup} from "../../../tests/utils/renderComponentInApp";
import {comments, post} from "../../../tests/testData";

import PostDetails from "./post-details";

import {IRequest} from "../../../tests/utils/renderComponentInApp";
import exp from "node:constants";


const mockParams = {
  postId: '3',
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockParams,
}));

describe("<PostDetails />", () => {

  test("should render the Post Details Component with comments", async () => {
    const initialState = {
      postDetails: {comments, post}
    }
    const requests: IRequest[] = [
      {method: 'get', route: '/posts/3', response: post},
      {method: 'get', route: '/comments?postId=3', response: comments}
    ];

    const {component} = commonSetup(<PostDetails/>, initialState, requests);
    await act(async () => {
      const title = component.getByText('ea molestias quasi exercitationem repellat qui ipsa sit aut');
      expect(title).toBeTruthy();
      const body = component.getByText('et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut');
      expect(body).toBeTruthy();
      const li = component.container.querySelectorAll('li');
      expect(li.length).toBe(5);

    });
  });
});
