import React from 'react'
import SalesChart from '../../../components/charts/Dashboard/SalesChart'
import styles from '../../../styles/EventDashboard.module.css'

function EventDashboard() {
  return (
    <>
      <div className={styles.container}>
        <SalesChart />
      </div>
    </>
  )
}

export default EventDashboard
