import {Input, DatePicker, Button} from 'antd'
import React from 'react'
import {EnvironmentOutlined, SearchOutlined} from '@ant-design/icons'
import styles from '../../styles/Home.module.css'

function Search() {
  function onDateChange(date: moment.Moment | null, dateString: string) {
    console.log(date, dateString)
  }

  return (
    <>
      <div className={styles.searchBar}>
        <div className={styles.fieldWrapper}>
          <Input
            className={styles.searchInput}
            placeholder="Event Location"
            size="large"
            prefix={<EnvironmentOutlined />}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <DatePicker className={styles.searchInput} onChange={onDateChange} />
        </div>
        <div>
          <Button className={styles.btn} type="primary" shape="round" size="large" icon={<SearchOutlined />}>
            Explore
          </Button>
        </div>
      </div>
    </>
  )
}

export default Search
