import React from 'react'
import SalesChart from '../../../components/charts/Dashboard/SalesChart'
import SoldCard from '../../../components/charts/Dashboard/Sold'
import Summary from '../../../components/charts/Dashboard/Summary'
import styles from '../../../styles/EventDashboard.module.css'

function EventDashboard() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <SalesChart />
        </div>
        <div className={styles.overview}>
          <div className={styles.overviewItem}>
            <SoldCard />
          </div>
          <div className={styles.overviewItem}>
            <Summary />
          </div>
        </div>
      </div>
    </>
  )
}

export default EventDashboard
