import { render, screen } from '@testing-library/react';

import Pagination from '../../src/app/components/Pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  it('should display current page and total pages', () => {
    render(<Pagination page={9} totalPages={50} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('Page 9 of 50')).toBeInTheDocument();
  });
});
