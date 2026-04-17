import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VenueProvider } from '../context/VenueContext';
import OrderExpress from './OrderExpress';

describe('OrderExpress', () => {
  it('renders menu items and allows checkout', () => {
    render(
      <VenueProvider>
        <OrderExpress />
      </VenueProvider>,
    );

    const addButtons = screen.getAllByRole('button', { name: /add to order/i });
    expect(addButtons.length).toBeGreaterThan(0);

    fireEvent.click(addButtons[0]);
    expect(screen.getByText(/1 Item\(s\)/i)).toBeInTheDocument();

    const checkoutButton = screen.getByRole('button', { name: /checkout now/i });
    fireEvent.click(checkoutButton);

    expect(screen.getByText(/order status/i)).toBeInTheDocument();
    expect(screen.getByText(/order received/i)).toBeInTheDocument();
  });
});
