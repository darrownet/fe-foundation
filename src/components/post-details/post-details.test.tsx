/**
 * @jest-environment jsdom
 */

import React from "react";
import {act} from "@testing-library/react";
import {commonSetup} from "../../../tests/utils/renderComponentInApp";
import {comments, post} from "../../../tests/testData";

import PostDetails from "./post-details";

import {IRequest} from "../../../tests/utils/renderComponentInApp";


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
    await act(async () => {
      const {component} = commonSetup(<PostDetails/>, initialState, requests);
      setTimeout(() => {
        const followers = component.container.querySelectorAll('.post-details .followers li');
        expect(followers.length).toEqual(5);
        const orgs = component.container.querySelectorAll('.post-details .orgs li');
        expect(orgs.length).toEqual(9);
        const repos = component.container.querySelectorAll('.post-details .repos li');
        expect(repos.length).toEqual(30);
      }, 0);
    });
  });
});
