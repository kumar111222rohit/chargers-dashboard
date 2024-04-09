import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { setAllStations } from '../store/chargersReducer';
import { getAllStations } from '../services/apiService';

export const useAllStationDetails = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getAllStations'],
    queryFn: getAllStations,
  });

  dispatch(setAllStations(data));
  // here returning for our Charger Dashboard component,
  // we can also access from the store in the component
  return {
    stationData: data,
    stationDataLoading: isLoading,
    stationDataIsError: isError,
    stationDataError: error,
  };
};
