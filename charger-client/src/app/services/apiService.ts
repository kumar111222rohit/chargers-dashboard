import { API_ROUTES } from '../constants/apiRoutes';
import { Params } from '../types/charger';
import APIClient from './makeAPICall';

const getChargerById = async (chargerId: string) => {
  return APIClient.get(`${API_ROUTES.CHARGERS}/${chargerId}`);
};
const getAllChargers = async (query: Params) => {
  return APIClient.get(`${API_ROUTES.CHARGERS}`, query);
};

const getAllStations = async () => {
  return APIClient.get(API_ROUTES.STATIONS);
};

const getChargerStatuses = async () => {
  return APIClient.options(API_ROUTES.CHARGER_STATUSES);
};

const getConnectorStatuses = async () => {
  return APIClient.options(API_ROUTES.CONNECTOR_STATUSES);
};

const getConnectorStandards = async () => {
  return APIClient.options(API_ROUTES.CONNECTOR_STANDARDS);
};

const getStationCountries = async () => {
  return APIClient.get(API_ROUTES.STATION_COUNTRIES);
};

const saveCharger = async (data: any) => {
  await APIClient.create(API_ROUTES.CHARGERS, data);
};

const updateCharger = async (chargerId: string, data: any) => {
  await APIClient.update(`${API_ROUTES.CHARGERS}/${chargerId}`, data);
};

const deleteCharger = async (chargerId: string) => {
  await APIClient.remove(`${API_ROUTES.CHARGERS}/${chargerId}`);
};

export {
  getAllStations,
  saveCharger,
  updateCharger,
  deleteCharger,
  getChargerById,
  getChargerStatuses,
  getConnectorStatuses,
  getConnectorStandards,
  getStationCountries,
  getAllChargers,
};
