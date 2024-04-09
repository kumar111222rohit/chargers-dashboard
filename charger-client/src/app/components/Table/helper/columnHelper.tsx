import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { ChargerTable } from '@/app/types/charger';
import { useChargerContext } from '@/app/module/ChargersDashboard/context/ChargerContext';
import { resetFilters } from '@/app/store/chargersReducer';
import { ConnectorStatus } from '@/app/module/ChargersDashboard/components/ConnectorStatus/ConnectorStatus';
import { getChargerStatusChipProps } from '@/app/utils/helper';

import { Chip } from '../../Chip/Chip';
import Dropdown from '../../Dropdown/Dropdown';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';

const columnHelper = createColumnHelper<ChargerTable>();

export const useColumns = (
  stationData: string[],
  connectorStatusData: string[],
  chargerStatusData: string[]
) => {
  const { setChargerRowData, allStationsData } = useChargerContext();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChargerEdit = (
    event: React.MouseEvent<HTMLDivElement>,
    rowData: any
  ) => {
    event.stopPropagation();
    // set the selected row data in context to be able to access in modifycharger page
    setChargerRowData(rowData);
    router.push('/modifycharger');
  };
  const handleClearAllFilters = () => {
    router.push({ query: {} });
    dispatch(resetFilters());
  };

  return [
    columnHelper.accessor('stationName', {
      header: () => (
        <>
          <div className="column-container" aria-label="Station Name">
            <span className="table-header-label">{t('stationName')}</span>
            <Input
              filterName="stationName"
              placeHolder="Search"
              searchData={allStationsData}
            />
          </div>
        </>
      ),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('stationCountry', {
      header: () => (
        <>
          <div className="column-container" aria-label="Station Country">
            <span className="table-header-label">{t('country')}</span>
            <Dropdown options={stationData} filterName="stationCountry" />
          </div>
        </>
      ),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('serialNumber', {
      header: () => (
        <>
          <div className="column-container" aria-label="Charger Serial Number ">
            <span className="table-header-label">
              {t('chargerSerialNumber')}
            </span>
            <Input filterName="chargerSerialNumber" placeHolder="Search" />
          </div>
        </>
      ),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: () => (
        <>
          <div className="column-container" aria-label="Charger Status">
            <span className="table-header-label">{t('Charger status')}</span>
            <Dropdown options={chargerStatusData} filterName="chargerStatus" />
          </div>
        </>
      ),
      cell: info => {
        const props = getChargerStatusChipProps(info.row.original.status);
        return <Chip {...props} />;
      },
    }),
    columnHelper.accessor('connectors', {
      header: () => (
        <>
          <div className="column-container" aria-label="Connector Status">
            <span className="table-header-label">{t('connectorStatus')}</span>
            <Dropdown
              options={connectorStatusData}
              filterName="connectorStatus"
            />
          </div>
        </>
      ),
      cell: info => <ConnectorStatus info={info.row.original.connectors} />,
    }),
    columnHelper.accessor('clearFilter', {
      header: () => (
        <Button
          btnLabel={t('clearFilters')}
          onClick={handleClearAllFilters}
          ariaLabel="Clear Filter"
          customClass="dropdown-clear"
        />
      ),
      cell: info => (
        <>
          <div onClick={e => handleChargerEdit(e, info.row.original)}>
            <img src="/static/assets/clear-icon.svg" />
          </div>
        </>
      ),
    }),
  ];
};
