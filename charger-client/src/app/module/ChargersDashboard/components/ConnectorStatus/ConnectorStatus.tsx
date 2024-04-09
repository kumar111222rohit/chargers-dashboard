import React from 'react';

import { Chip } from '@/app/components/Chip/Chip';
import { Connectors } from '@/app/types/charger';
import { getConnectorStatusChipProps } from '@/app/utils/helper';

import './ConnectorStatus.css';

interface Props {
  info: Connectors[];
}
export const ConnectorStatus: React.FC<Props> = ({ info }) => {
  return (
    <>
      <div className="chip-wrapper">
        {info.map((item: Connectors, index: number) => {
          const props = getConnectorStatusChipProps(item);
          return <Chip {...props} key={index} />;
        })}
      </div>
    </>
  );
};
