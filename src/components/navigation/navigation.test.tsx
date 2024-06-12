/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {MemoryRouter} from 'react-router-dom';
import Navigation from "./navigation";

describe('<Navigation />', () => {

  test('should render the navigation component with a root path of /', () => {
    render(<MemoryRouter initialEntries={['/']}><Navigation/></MemoryRouter>);
    const h1 = screen.getByText('list of posts');
    expect(h1).toBeInTheDocument();
  });

});