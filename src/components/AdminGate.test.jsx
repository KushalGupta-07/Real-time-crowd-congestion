import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminGate from './AdminGate';

describe('AdminGate', () => {
  it('shows validation error for incorrect code and authorizes with correct code', () => {
    const onAuthorize = vi.fn();
    const onClose = vi.fn();

    render(<AdminGate open onClose={onClose} onAuthorize={onAuthorize} />);

    const input = screen.getByPlaceholderText(/access code/i);
    const unlockButton = screen.getByRole('button', { name: /unlock portal/i });

    fireEvent.change(input, { target: { value: 'wrong-code' } });
    fireEvent.click(unlockButton);
    expect(screen.getByText(/incorrect access code/i)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'VenueFlow@2026' } });
    fireEvent.click(unlockButton);
    expect(onAuthorize).toHaveBeenCalled();
  });
});
