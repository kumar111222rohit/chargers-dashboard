//charger
export interface Charger {
  id: string;
  stationName: string;
  stationCountry: string;
  serialNumber: string;
  status: ChargerStatus;
  connectors: Connectors[];
}
export type ChargerStatus = 'CONNECTED' | 'DISCONNECTED' | 'REMOVED';
export interface Connectors {
  id: string;
  standard: string;
  status: ConnectorStatus;
}
export interface StationData {
  id: string;
  country: string;
  name: string;
}

export type ConnectorStatus = 'AVAILABLE' | 'CHARGING' | 'UNAVAILABLE';

// table
export interface Filter {
  stationName?: string | null;
  stationCountry?: string | null;
  chargerSerialNumber?: string | null;
  chargerStatus?: string | null;
  connectorStatus?: string | null;
}
export interface ChargerTable extends Charger {
  clearFilter?: () => void;
}

// form
export interface ChargerFormValues {
  id: string;
  serialNumber?: string;
  stationId: string;
  status: string;
  connectors: Connectors[];
  stationName?: string;
}

// API types
export interface Params {
  [key: string]: string | string[] | null | undefined;
}

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';

export interface RequestOptions {
  method: RequestMethod;
  headers: Record<string, string>;
  body?: string;
}
