import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { getConnectorStandards } from '../services/apiService';
import { setConnectorStandards } from '../store/chargersReducer';

export const useConnectorStandards = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getConnectorStandards'],
    queryFn: getConnectorStandards,
  });
  dispatch(setConnectorStandards(data));
  // here returning for our Charger Dashboard component,
  // we can also access from the store in the component
  return {
    connectorStandardData: data,
    connectorStandardDataLoading: isLoading,
    connectorStandardDataIsError: isError,
    connectorStandardDataError: error,
  };
};
