import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { getChargerStatuses } from '../services/apiService';
import { setChargerStatuses } from '../store/chargersReducer';

export const useChargerStatus = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getChargerStatuses'],
    queryFn: getChargerStatuses,
  });
  dispatch(setChargerStatuses(data));
  // here returning for our Charger Dashboard component,
  // we can also access from the store in the component
  return {
    chargerStatusData: data,
    chargerStatusDataLoading: isLoading,
    chargerStatusDataIsError: isError,
    chargerStatusDataError: error,
  };
};
