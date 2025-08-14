import { render, screen, fireEvent } from '@testing-library/react';

import { Pagination } from '../../src/components';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  it('should display current page and total pages', () => {
    render(<Pagination page={9} totalPages={50} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('Page 9 of 50')).toBeInTheDocument();
  });

  it('should call onPageChange with previous page when prev button is clicked', () => {
    render(<Pagination page={3} totalPages={10} onPageChange={mockOnPageChange} />);

    const prevButton = screen.getByRole('button', { name: '<' });
    expect(prevButton).not.toHaveClass('cursor-not-allowed');
    expect(prevButton).not.toHaveClass('text-gray-500');
    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with next page when next button is clicked', () => {
    render(<Pagination page={3} totalPages={10} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByRole('button', { name: '>' });
    expect(nextButton).not.toHaveClass('cursor-not-allowed');
    expect(nextButton).not.toHaveClass('text-gray-500');
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });
});
