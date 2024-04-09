import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { chargerStore } from '@/app/store/chargerStore';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/app/services/queryClient';
import { ChargerProvider } from '@/app/module/ChargersDashboard/context/ChargerContext';

import '../../i18';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={chargerStore}>
      <ChargerProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChargerProvider>
    </Provider>
  );
};

export default MyApp;
