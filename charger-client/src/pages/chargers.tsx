import React from 'react';
import { GetServerSidePropsContext } from 'next';

import { ChargersDashboard } from '@/app/module/ChargersDashboard/components/ChargersDashBoard';
import { Charger } from '@/app/types/charger';
import { BASE_URL } from '@/app/constants/genericConstants';
import { objectToQueryParams } from '@/app/utils/helper';

interface Props {
  chargers: Charger[];
}
const Chargers: React.FC<Props> = ({ chargers }) => {
  return <ChargersDashboard chargerData={chargers} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { query } = context;
    const queryParams = objectToQueryParams(query);
    const url = `${BASE_URL}/api/v1/chargers?${queryParams}`;
    const res = await fetch(url);
    const chargers = await res.json();
    return {
      props: {
        chargers,
      },
    };
  } catch (e) {
    console.log(e);
    // also we can send to logger like sentry or kibana
  }
}

export default Chargers;
