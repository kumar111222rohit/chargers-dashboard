import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { setAllStationCountries } from '../store/chargersReducer';
import { getStationCountries } from '../services/apiService';

export const useAllStationCountries = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getStationCountries'],
    queryFn: getStationCountries,
  });

  dispatch(setAllStationCountries(data));
  // here returning for our Charger Dashboard component,
  // we can also access from the redux store in the component
  return {
    stationCountriesData: data,
    stationDataLoading: isLoading,
    stationDataIsError: isError,
    stationDataError: error,
  };
};
