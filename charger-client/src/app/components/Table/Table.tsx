import React, { useEffect, useRef } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import './Table.css';

import { useState } from 'react';
import { Charger } from '@/app/types/charger';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/store/chargerStore';
import { useColumns } from './helper/columnHelper';

interface Props {
  chargerData?: Charger[];
  stationData: string[];
  connectorStatusData: string[];
  chargerStatusData: string[];
  handleChargerView: (chargerData: Charger) => void;
}

export const Table: React.FC<Props> = ({
  chargerData,
  stationData,
  connectorStatusData,
  chargerStatusData,
  handleChargerView,
}) => {
  const columns = useColumns(
    stationData,
    connectorStatusData,
    chargerStatusData
  );
  const [data, setData] = useState<Charger[]>(chargerData as Charger[]);

  const dispatch = useAppDispatch();
  const filters = useSelector((state: RootState) => state.chargers.filters);

  useEffect(() => {
    if (chargerData) {
      setData(chargerData);
    }
  }, [chargerData]);

  const observerRef = useRef(null);

  //  setup Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          //  for now only console logging the intersection events
          //  based on how many entries we want on the screen before and after filtering -
          //  we can further modify our redux store to handle  loading the data
          console.log('intersecting');
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [dispatch, filters]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div style={{ marginTop: '1rem' }}>
        <table className="table-container">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {data.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  onClick={() => handleChargerView(row.original)}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                  No data to be shown
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* our sentinel node for the interseciotn observer */}
      <div ref={observerRef}></div>
    </>
  );
};
