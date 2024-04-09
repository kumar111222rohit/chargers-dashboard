import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table } from './Table';
import { ChargerStatus, ConnectorStatus } from '@/app/types/charger';
import { ChargerProvider } from '@/app/module/ChargersDashboard/context/ChargerContext';
import { Provider } from 'react-redux';
import { RootState } from '@/app/store/chargerStore';
import { configureStore } from '@reduxjs/toolkit';
import chargerReducer from '../../store/chargersReducer';

jest.mock('@/app/store/chargersReducer', () => ({
  fetchAllChargers: jest.fn(),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({})),
}));

const mockChargerData = [
  {
    id: 'e85a556b-8b5a-494f-b863-81ad0d29b392',
    stationName: 'Lisbon',
    stationCountry: 'Portugal',
    serialNumber: 'E4YXWM7YI',
    status: 'CONNECTED' as ChargerStatus,
    connectors: {
      id: '88385e30-714b-4c09-8923-6d02d71a0f7b',
      standard: 'CCS',
      status: 'CHARGING' as ConnectorStatus,
    },
  },
];
const mockStationData = ['Brussels'];
const mockConnectorStatusData = ['CHARGING'];
const mockChargerStatusData = ['AVAILABLE'];
const mockHandleChargerView = jest.fn();

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

describe.skip('Table component', () => {
  // TODO fix filters state issue in running test
  test('should render table with data', () => {
    render(
      <Provider store={store}>
        <ChargerProvider>
          <Table
            chargerData={mockChargerData}
            stationData={mockStationData}
            connectorStatusData={mockConnectorStatusData}
            chargerStatusData={mockChargerStatusData}
            handleChargerView={mockHandleChargerView}
          />
        </ChargerProvider>
      </Provider>
    );

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells.length).toBeGreaterThan(0);

    const rowCells = screen.getAllByRole('cell');
    expect(rowCells.length).toBeGreaterThan(0);
  });

  test('shoudl render emoty table', () => {
    render(
      <Provider store={store}>
        <ChargerProvider>
          <Table
            chargerData={[]}
            stationData={mockStationData}
            connectorStatusData={mockConnectorStatusData}
            chargerStatusData={mockChargerStatusData}
            handleChargerView={mockHandleChargerView}
          />
        </ChargerProvider>
      </Provider>
    );

    const noDataMessage = screen.getByText('No data to be shown');
    expect(noDataMessage).toBeInTheDocument();
  });
});
