/**
 * @jest-environment jsdom
 */

import {render} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Repos from "../reops";
import {userRepos} from "../../../../tests/testData";

describe("<Repos />", () => {

  test("should render the repos component with 0 repos", () => {
    const component = render(<MemoryRouter><Repos/></MemoryRouter>);
    const ul = component.getByRole('list');
    expect(ul.children.length).toEqual(0);
  });

  test("should render the repos component with 15 orgs", () => {
    const component = render(<MemoryRouter><Repos repos={userRepos}/></MemoryRouter>);
    const ul = component.getByRole('list');
    expect(ul.children.length).toEqual(30);
  });

});
