import React from 'react';
import CatDetails, { CatDetailsProps } from './CatDetails';
import { render } from '@testing-library/react';

const setup = (props: CatDetailsProps) => {
  const utils = render(<CatDetails {...props} />);

  const catImage = utils.getByTestId('cat-image') as HTMLElement;
  const catFact = utils.getByTestId('cat-fact') as HTMLElement;


  return {
    catImage,
    catFact,
    ...utils,
  };
};

describe('CatDetails component', () => {
  it('will display given cat image and fact', () => {
    const props: CatDetailsProps = {
      fact: 'cats are lovely', 
      pictureUrl: 'www.foo.com',
      showCatDetailsCarousel: false,
      setShowCatDetailsCarousel: jest.fn()
    };
    const { catImage, catFact} = setup(props);
    expect(catImage.innerHTML).toContain('www.foo.com');
    expect(catFact.innerHTML).toContain('cats are lovely');
  });
});