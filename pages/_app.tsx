require('../styles/variables.less')
import type { AppProps } from 'next/app'
import React from 'react'
import NextNProgress from 'nextjs-progressbar'
import Script from 'next/script'
import Navbar from '../components/Navbar'
import { NewEventWrapper } from '../context/newEvent'
import { WalletWrapper } from '../context/Wallet'

import 'regenerator-runtime/runtime'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGvZcCyI8iQgz9NwFgPJ0bKQAiwwrO13s&libraries=places"
        strategy="beforeInteractive"
      />
      <WalletWrapper>
        <Navbar />
        <NextNProgress color="#d818ff" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
        <NewEventWrapper>
          <Component {...pageProps} />
        </NewEventWrapper>
      </WalletWrapper>
    </>
  )
}

export default MyApp
