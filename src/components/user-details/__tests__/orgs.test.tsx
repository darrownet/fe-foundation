/**
 * @jest-environment jsdom
 */

import {render} from "@testing-library/react";
import Orgs from "../orgs";
import {userOrgs} from "../../../../tests/testData";

describe("<Orgs />", () => {

  test("should render the orgs component with 0 orgs", () => {
    const component = render(<Orgs/>);
    const ul = component.getByRole('list');
    expect(ul.children.length).toEqual(0);
  });

  test("should render the orgs component with 15 orgs", () => {
    const component = render(<Orgs orgs={userOrgs}/>);
    const ul = component.getByRole('list');
    expect(ul.children.length).toEqual(9);
  });

});
