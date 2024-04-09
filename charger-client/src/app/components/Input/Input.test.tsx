import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Input } from './Input';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '@/app/store/chargerStore';
import chargerReducer from '../../store/chargersReducer';
import { Charger, ChargerStatus, ConnectorStatus } from '@/app/types/charger';
import mockRouter from 'next-router-mock';

describe.skip('Input Component', () => {
  const filterName = 'stationName';
  const mockChargerData: Charger[] = [
    {
      id: 'e85a556b-8b5a-494f-b863-81ad0d29b392',
      stationName: 'Lisbon',
      stationCountry: 'Portugal',
      serialNumber: 'E4YXWM7YI',
      status: 'CONNECTED' as ChargerStatus,
      connectors: [
        {
          id: '88385e30-714b-4c09-8923-6d02d71a0f7b',
          standard: 'CCS',
          status: 'CHARGING' as ConnectorStatus,
        },
      ],
    },
  ];
  const createTestStore = (state: RootState) => {
    return configureStore({
      reducer: {
        chargers: chargerReducer,
      },
      preloadedState: state,
    });
  };

  const store = createTestStore({
    chargers: {
      loading: false,
      stationCountryData: null,
      stationDetails: null,
      connectorStandard: null,
      chargerStatuses: null,
      connectorStatuses: null,
      data: mockChargerData,
      filters: {
        stationName: 'Lisbon',
        stationCountry: 'Portugal',
        chargerSerialNumber: 'E4YXWM7YI',
        chargerStatus: 'CONNECTED',
        connectorStatus: 'CHARGING',
      },
    },
  });

  jest.mock('next/router', () => ({
    useRouter: () => mockRouter,
  }));

  test('shoudl set input and pass the filter to state', () => {
    render(
      <Provider store={store}>
        <Input filterName={filterName} />
      </Provider>
    );

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Lisbon' } });

    expect(inputElement).toHaveValue('Lisbon');
  });
});
