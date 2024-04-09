import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { ChargerForm } from '@/app/components/Form/Form';
import { Header } from '@/app/components/Header/Header';
import { useAllStationDetails } from '@/app/hooks/useAllStationDetails';
import { useConnectorStandards } from '@/app/hooks/useConnectorStandards';
import { useChargerContext } from '@/app/module/ChargersDashboard/context/ChargerContext';
import {
  deleteCharger,
  saveCharger,
  updateCharger,
} from '@/app/services/apiService';
import { RootState } from '@/app/store/chargerStore';
import { generateSerialNumber } from '@/app/utils/helper';
import { ChargerFormValues } from '@/app/types/charger';

const ModifyCharger: React.FC = () => {
  const { stationData } = useAllStationDetails();
  const { chargerRowData } = useChargerContext();
  const router = useRouter();

  const { connectorStandardData } = useConnectorStandards();
  const chargerStatuses = useSelector(
    (state: RootState) => state.chargers.chargerStatuses
  );
  const connectorStatuses = useSelector(
    (state: RootState) => state.chargers.connectorStatuses
  );

  const onSubmit = async (chargerData: ChargerFormValues) => {
    const serialNumber = generateSerialNumber();
    if (!chargerRowData) {
      // no inital data exists so we add
      await saveCharger({ serialNumber, ...chargerData });
    } else {
      // otherwise we are updating an existing data
      await updateCharger(chargerData.id, { ...chargerData });
    }
    router.push('/chargers');
  };
  const handleChargerDelete = async (
    event: React.MouseEvent<HTMLElement>,
    chargerData: ChargerFormValues
  ) => {
    // we also need to prevent the default form submission here
    event.preventDefault();
    event.stopPropagation();
    await deleteCharger(chargerData.id);
    router.push('/chargers');
  };
  return (
    <>
      <Header
        imgSrc="/static/assets/fastned-logo.svg"
        tooltipText="Welcome to Fastned"
      />
      <ChargerForm
        initialValues={chargerRowData ? chargerRowData : null}
        stationOptions={stationData ? stationData : []}
        chargerStatusOptions={chargerStatuses ? chargerStatuses : []}
        onSubmit={onSubmit}
        connectorStatusOptions={connectorStatuses ? connectorStatuses : []}
        connectorStandardOptions={
          connectorStandardData ? connectorStandardData : []
        }
        handleChargerDelete={handleChargerDelete}
      />
    </>
  );
};

export default ModifyCharger;
