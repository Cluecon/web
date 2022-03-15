import type {NextPage} from 'next'
import Head from 'next/head'
import {DatePicker} from 'antd'
const {RangePicker} = DatePicker
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Clueconn | NFT Events</title>
        <meta name="description" content="A new ticketing system for event intelligence" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
        <RangePicker showTime />
      </div>
    </div>
  )
}

export default Home
