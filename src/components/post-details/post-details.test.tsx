/**
 * @jest-environment jsdom
 */
import {act, waitFor, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import {commonSetup} from "../../../tests/utils/renderComponentInApp";
import {comments, post} from "../../../tests/testData";

import PostDetails from "./post-details";

import {IRequest} from "../../../tests/utils/renderComponentInApp";
import {useParams} from "react-router-dom";

describe("<PostDetails />", () => {

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => [new URLSearchParams({ postId: '4' })],
  }));

  const initialState = {
    postDetails: {comments, post}
  }
  const requests: IRequest[] = [
    {method: 'get', route: '/posts/3', response: post},
    {method: 'get', route: '/comments?postId=3', response: comments},
    {
      method: 'post', route: '/comments', response: {
        "name": "Some Name",
        "email": "some@name.com",
        "body": "some very important comment",
        "postId": 4,
        "id": 501
      }
    }
  ];

  test("should render the Post Details Component with comments", async () => {

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

  test("should submit a new comment", async () => {
    const {component} = commonSetup(<PostDetails/>, initialState, requests);

    await act(async () => {
      const comments = component.container.querySelectorAll('li');
      expect(comments.length).toEqual(5);
      const nameField = component.getByLabelText('Name:');
      const emailField = component.getByLabelText('Email:');
      const commentField = component.getByLabelText('Comment:');
      const submitPost = component.container.querySelectorAll('input[type="submit"]')[0];

      await act(async () => {
        userEvent.type(nameField, 'Some Name');
        userEvent.type(emailField, 'some@name.com');
        userEvent.type(commentField, 'some very important comment');
        userEvent.click(submitPost);

      });

      // await act(async () => {
      //   console.log(component.container.innerHTML);
      // });

      // await act(async () => {
      //   console.log(screen.getByRole('list').innerHTML);
      // });

      // await waitFor(async () => {
      //   console.log(screen.getByRole('list').innerHTML);
      // });

    });

    // await waitFor(async () => {
    //   const newComments = component.container.querySelectorAll('li');
    //   expect(6).toEqual(6);
    // });

  });

});
