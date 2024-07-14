import { render, screen, fireEvent, act } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { describe, test, expect, vi } from 'vitest';

describe('SearchBar', () => {
  test('renders input and search button', async () => {
    await act(async () => {
      render(
        <SearchBar
          searchItem=""
          error={null}
          setError={vi.fn()}
          onSearch={vi.fn()}
          onSearchChange={vi.fn()}
        />,
      );
    });

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  test('calls onSearchChange on input change', async () => {
    const onSearchChangeMock = vi.fn();

    await act(async () => {
      render(
        <SearchBar
          searchItem=""
          error={null}
          setError={vi.fn()}
          onSearch={vi.fn()}
          onSearchChange={onSearchChangeMock}
        />,
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Star Trek' } });
    });

    expect(onSearchChangeMock).toHaveBeenCalledWith('Star Trek');
  });

  test('sets error for invalid input', async () => {
    const setErrorMock = vi.fn();

    await act(async () => {
      render(
        <SearchBar
          searchItem=""
          error={null}
          setError={setErrorMock}
          onSearch={vi.fn()}
          onSearchChange={vi.fn()}
        />,
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Star$%!' } });
      fireEvent.click(screen.getByText(/Search/i));
    });

    expect(setErrorMock).toHaveBeenCalledWith(new Error('Please use only Latin letters.'));
  });
});
