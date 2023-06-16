/**
 * @jest-environment jsdom
 */

import {render} from "@testing-library/react";
import Followers from "../followers";
import {userFollowers} from "../../../../tests/testData";

describe("<Followers />", () => {

  test("should render the followers component with 0 followers", () => {
    const component = render(<Followers/>);
    const ul = component.getByRole('list');
    expect(ul.children.length).toEqual(0);
  });

  test("should render the followers component with 42 followers", () => {
    const component = render(<Followers count={42} followers={userFollowers}/>);
    const span = component.container.querySelectorAll(".followers-head span")[0];
    expect(span.innerHTML).toEqual('(42 total)');
    const ul = component.getByRole('list');
    expect(ul.children.length).toEqual(5);
  });

});
