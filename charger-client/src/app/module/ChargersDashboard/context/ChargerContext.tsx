import { ChargerFormValues, StationData } from '@/app/types/charger';
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ChargerContextProps {
  chargerRowData: ChargerFormValues | null;
  setChargerRowData: React.Dispatch<
    React.SetStateAction<ChargerFormValues | null>
  >;
  allStationsData: StationData[] | null;
  setAllStationsData: React.Dispatch<
    React.SetStateAction<StationData[] | null>
  >;
}

const ChargerContext = createContext<ChargerContextProps | null>(null);

interface ChargerProviderProps {
  children: ReactNode;
}

export const ChargerProvider: React.FC<ChargerProviderProps> = ({
  children,
}) => {
  const [chargerRowData, setChargerRowData] =
    useState<ChargerFormValues | null>(null);
  const [allStationsData, setAllStationsData] = useState<StationData[] | null>(
    null
  );

  return (
    <ChargerContext.Provider
      value={{
        chargerRowData,
        setChargerRowData,
        allStationsData,
        setAllStationsData,
      }}
    >
      {children}
    </ChargerContext.Provider>
  );
};

export const useChargerContext = () => {
  const chargerContext = useContext(ChargerContext);
  if (chargerContext === null) {
    throw new Error('useChargerContext must be used within a ChargerProvider');
  }
  return chargerContext;
};
