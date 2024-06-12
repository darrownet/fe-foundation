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
    const p = screen.getByText('list of github posts');
    const span = screen.getByText('...in 80s Brutalist Deco');
    expect(p).toBeInTheDocument();
    expect(span).toBeInTheDocument();
  });

  test('should render the navigation component with a root path of /:login', () => {
    render(<MemoryRouter initialEntries={['/somelogin']}><Navigation/></MemoryRouter>);
    const a = screen.getByText('←back');
    expect(a).toBeInTheDocument();
  });

});