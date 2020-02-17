import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('cat facts list component exists', () => {
    const { getByTestId } = render(<App />);
    const catFactsList = getByTestId('cat-facts-list') as HTMLElement;
    expect(catFactsList).toBeInTheDocument();
  })
});
