require('../styles/variables.less')
import type { AppProps } from 'next/app'
import React from 'react'
import NextNProgress from 'nextjs-progressbar'
import Script from 'next/script'
import { isMobile } from 'react-device-detect'
import Navbar from '../components/Navbar'
import { NewEventWrapper } from '../context/newEvent'
import { WalletWrapper } from '../context/Wallet'
import { Typography } from 'antd'

import 'regenerator-runtime/runtime'

const { Title } = Typography

function MyApp({ Component, pageProps }: AppProps) {
  if (isMobile) {
    return (
      <>
        <Title> This site is not currently supported on mobile</Title>
      </>
    )
  }

  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-QXRE37E5JP" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QXRE37E5JP');
        `}
      </Script>
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
