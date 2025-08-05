import { screen } from '@testing-library/react';

import { Page404 } from '@/pages';
import { renderWithRouter } from '../test-utils/test-utils.tsx';

describe('NotFound', () => {
  it('should render correctly', () => {
    renderWithRouter(<Page404 />);

    const image = screen.getByTestId('404-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt');
    expect(image.getAttribute('alt')).not.toBe('');
  });
});
