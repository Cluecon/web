require('../styles/variables.less')
import type {AppProps} from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import Navbar from '../components/Navbar'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Navbar />
      <NextNProgress color="#d818ff" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
