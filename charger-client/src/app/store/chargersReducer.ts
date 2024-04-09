import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Charger, StationData } from '../types/charger';

export interface TableState {
  loading: boolean;
  data: Charger[];
  filters: {
    stationName: string | null;
    stationCountry: string | null;
    chargerSerialNumber: string | null;
    chargerStatus: string | null;
    connectorStatus: string | null;
  };
  stationCountryData: StationData[] | null;
  connectorStandard: string[] | null;
  chargerStatuses: string[] | null;
  connectorStatuses: string[] | null;
  stationDetails: StationData[] | null;
}

export const initialState: TableState = {
  loading: false,
  data: [],
  filters: {
    stationName: null,
    stationCountry: null,
    chargerSerialNumber: null,
    chargerStatus: null,
    connectorStatus: null,
  },
  stationCountryData: null,
  stationDetails: null,
  connectorStandard: null,
  chargerStatuses: null,
  connectorStatuses: null,
};

export const chargerSlice = createSlice({
  name: 'chargers',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{
        filterName: keyof TableState['filters'];
        value: string | null;
      }>
    ) => {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value;
    },
    resetFilters: state => {
      Object.keys(state.filters).forEach(key => {
        state.filters[key as keyof TableState['filters']] = null;
      });
    },
    setTableData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    setAllStations: (state, action: PayloadAction<any[]>) => {
      state.stationDetails = action.payload;
    },
    setConnectorStandards: (state, action: PayloadAction<any[]>) => {
      state.connectorStandard = action.payload;
    },
    setChargerStatuses: (state, action: PayloadAction<any[]>) => {
      state.chargerStatuses = action.payload;
    },
    setConnectorStatuses: (state, action: PayloadAction<any[]>) => {
      state.connectorStatuses = action.payload;
    },
    setAllStationCountries: (state, action: PayloadAction<any[]>) => {
      state.stationCountryData = action.payload;
    },
  },
});

export const {
  setFilter,
  resetFilters,
  setTableData,
  setAllStations,
  setChargerStatuses,
  setConnectorStandards,
  setConnectorStatuses,
  setAllStationCountries,
} = chargerSlice.actions;

export default chargerSlice.reducer;
