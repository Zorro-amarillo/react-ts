import { screen } from '@testing-library/react';

import { AboutPage } from '../../src/pages';
import { renderWithRouter } from '../test-utils/test-utils';

describe('AboutPage', () => {
  it('should render content correctly', () => {
    renderWithRouter(<AboutPage />);

    const heading = screen.getByRole('heading', {
      name: /about the developer/i,
    });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/Yana Malakhova/i)).toBeInTheDocument();
  });

  it('should contain RSSchool React course link', () => {
    renderWithRouter(<AboutPage />);

    const link = screen.getByRole('link', {
      name: /RSSchool React course/i,
    });
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
