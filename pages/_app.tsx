require('../styles/variables.less')
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import Script from 'next/script'
import Navbar from '../components/Navbar'
import { NewEventWrapper } from '../context/newEvent';
import React, { Children, FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }: AppProps) {

  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);


  return (
    <>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGvZcCyI8iQgz9NwFgPJ0bKQAiwwrO13s&libraries=places"
        strategy="beforeInteractive"
      />
      <Navbar />
      <NextNProgress color="#d818ff" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      <NewEventWrapper>
        <ConnectionProvider endpoint={endpoint}>

          <Component {...pageProps} />
        </ConnectionProvider>
      </NewEventWrapper>
    </>
  )
}

export default MyApp
