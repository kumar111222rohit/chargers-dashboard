import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { Header } from '@/app/components/Header/Header';
import { Table } from '@/app/components/Table/Table';
import { Button } from '@/app/components/Button/Button';
import { Modal } from '@/app/components/Modal/Modal';
import { Charger } from '@/app/types/charger';
import { useAllStationDetails } from '@/app/hooks/useAllStationDetails';
import { useAllStationCountries } from '@/app/hooks/useAllStationCountries';
import { useConnectorStatus } from '@/app/hooks/useConnectorStatus';
import { useChargerStatus } from '@/app/hooks/useChargerStatus';

import { useChargerContext } from '../context/ChargerContext';
import { ChargerDetails } from './ChargerDetails/ChargerDetails';
import './ChargersDashboard.css';

interface Props {
  chargerData: Charger[];
}
export const ChargersDashboard: React.FC<Props> = ({ chargerData }) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const toggleModal = () => setShowModal(!showModal);
  const router = useRouter();
  const { t } = useTranslation();

  const { stationCountriesData } = useAllStationCountries();
  const { connectorStatusData } = useConnectorStatus();
  const { chargerStatusData } = useChargerStatus();

  const { setChargerRowData, setAllStationsData } = useChargerContext();
  const [chargerRowData, setChargerData] = useState<Charger>();
  const { stationData } = useAllStationDetails();

  const handleAddChargerClick = () => {
    setChargerRowData(null);
    router.push('/modifycharger');
  };
  const handleChargerView = (chargerData: Charger) => {
    setChargerData(chargerData);
    toggleModal();
  };

  useEffect(() => {
    // setting stationData for dropdown
    if (stationData) {
      setAllStationsData(stationData);
    }
  }, [stationData]);

  return (
    <>
      {showModal && chargerRowData ? (
        <Modal
          isOpen={showModal}
          onClose={toggleModal}
          modalHeader="Charger Details"
        >
          <ChargerDetails chargerData={chargerRowData} />
        </Modal>
      ) : (
        <div className="dashboard-container">
          <Header
            imgSrc="/static/assets/fastned-logo.svg"
            children={
              <Button
                btnLabel="Add Charger"
                onClick={handleAddChargerClick}
                customClass="add-charger"
              />
            }
            tooltipText={t('exploreFuture')}
            headerText={t('Chargers')}
          />

          <Table
            chargerData={chargerData}
            stationData={stationCountriesData}
            connectorStatusData={connectorStatusData}
            chargerStatusData={chargerStatusData}
            handleChargerView={handleChargerView}
          />
        </div>
      )}
    </>
  );
};
