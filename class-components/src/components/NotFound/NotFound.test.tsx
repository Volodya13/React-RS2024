import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { NotFound } from './NotFound';
import { describe, test, vi, expect } from 'vitest';

vi.mock('react-router-dom', () => {
  const actual = vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('NotFound', () => {
  test('renders NotFound component', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Ooops.. Maybe it was an another universe or galaxy/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go back/i })).toBeInTheDocument();
  });

  test('navigates back when button is clicked', () => {
    const navigate = vi.fn();
    (useNavigate as unknown as vi.Mock).mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const backButton = screen.getByRole('button', { name: /Go back/i });
    fireEvent.click(backButton);

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
