/**
 * @jest-environment jsdom
 */

import React from "react";
import {act} from "@testing-library/react";
import {commonSetup} from "../../../../tests/utils/renderComponentInApp";
import {userFollowers, userOrgs, userRepos, users, user} from "../../../../tests/testData";

import UserDetails from "../user-details";

import {IRequest} from "../../../../tests/utils/renderComponentInApp";

const mockParams = {
  login: 'mojodna',
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockParams,
}));

describe("<UserDetails />", () => {

  test("should render the User Details Component with followers, orgs, and repos", async () => {
    const initialState = {
      users: {users: users}
    }
    const requests: IRequest[] = [
      {method: 'get', route: '/posts/mojodna', response: user},
      {method: 'get', route: '/posts/mojodna/followers', response: userFollowers},
      {method: 'get', route: '/posts/mojodna/orgs', response: userOrgs},
      {method: 'get', route: '/posts/mojodna/repos', response: userRepos},
    ];
    await act(async () => {
      const {component} = commonSetup(<UserDetails/>, initialState, requests);
      setTimeout(() => {
        const followers = component.container.querySelectorAll('.user-details .followers li');
        expect(followers.length).toEqual(5);
        const orgs = component.container.querySelectorAll('.user-details .orgs li');
        expect(orgs.length).toEqual(9);
        const repos = component.container.querySelectorAll('.user-details .repos li');
        expect(repos.length).toEqual(30);
      }, 0);
    });
  });
});
