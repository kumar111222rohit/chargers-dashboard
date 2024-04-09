import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChargerForm } from './Form';
import { ChargerFormValues } from '@/app/types/charger';

describe('ChargerForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockHandleChargerDelete = jest.fn();
  const initialValues: ChargerFormValues = {
    id: 'dhqvbw812',
    stationId: '1',
    status: 'CONNECTED',
    connectors: [
      {
        id: '88385e30-714b-4c09-8923-6d02d71a0f7b',
        standard: 'CCS',
        status: 'CHARGING',
      },
    ],
  };

  beforeEach(() => {
    render(
      <ChargerForm
        stationOptions={['Amsterdam', 'NICE']}
        chargerStatusOptions={['CONNECTED', 'DISCONNECTED']}
        connectorStatusOptions={['AVAILABLE', 'CHARGING']}
        connectorStandardOptions={['CCS', 'AC']}
        onSubmit={mockOnSubmit}
        initialValues={initialValues}
        handleChargerDelete={mockHandleChargerDelete}
      />
    );
  });

  test('should remove a connector field', () => {
    const removeButton = screen.getByTestId('remove-connector');
    userEvent.click(removeButton);
    const remainingConnectors = screen.queryAllByPlaceholderText('Select');
    expect(remainingConnectors.length).toBeLessThan(
      initialValues.connectors.length
    );
  });
});
