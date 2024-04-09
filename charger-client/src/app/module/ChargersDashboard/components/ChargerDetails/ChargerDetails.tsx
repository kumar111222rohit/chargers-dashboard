import React from 'react';

import { Charger, Connectors } from '@/app/types/charger';
import { Card } from '@/app/components/Card/Card';

import './ChargerDetails.css';

interface Props {
  chargerData: Charger;
}

export const ChargerDetails: React.FC<Props> = ({ chargerData }) => {
  return (
    <>
      <div className="details-container">
        <Card
          headerText="Station Details"
          contents={{
            Country: chargerData.stationCountry,
            Station: chargerData.stationName,
          }}
        />
        <div className="info-seperator">
          This Station has the following Chargers
        </div>
        <Card
          headerText="Charger Details"
          contents={{
            SerialNumber: chargerData.serialNumber,
            Status: chargerData.status,
          }}
        />
        <div className="info-seperator">
          The Chargers have the following connectors
        </div>

        <div className="connector-container">
          {chargerData.connectors.map((connector: Connectors) => {
            return (
              <Card
                headerText="Connector Details"
                contents={{
                  Standard: connector.standard,
                  Status: connector.status,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
