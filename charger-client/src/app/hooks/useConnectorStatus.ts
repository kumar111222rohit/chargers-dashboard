import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { getConnectorStatuses } from '../services/apiService';
import { setConnectorStatuses } from '../store/chargersReducer';

export const useConnectorStatus = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getConnectorStatuses'],
    queryFn: getConnectorStatuses,
  });
  dispatch(setConnectorStatuses(data));
  // here returning for our Charger Dashboard component,
  // we can also access from the store in the component
  return {
    connectorStatusData: data,
    connectorStatusDataLoading: isLoading,
    connectorStatusDataIsError: isError,
    connectorStatusDataError: error,
  };
};
