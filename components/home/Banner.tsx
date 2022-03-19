import React from 'react'
import {Typography} from 'antd'
import styles from '../../styles/Home.module.css'
import Search from '../search/Search'

const {Title, Text} = Typography

function Banner() {
  return (
    <div>
      <div className={styles.bannerContainer}>
        <div>
          <Title className={styles.bannerCaption}>
            A NEW TICKETING SYSTEM <br /> FOR EVENT INTELLIGENCE
          </Title>
          <Text className={styles.bannerText}>
            Revolutionizing the events industry letting your <br /> curiousity find you the next big memories
          </Text>
        </div>
        <div className={styles.searchContainer}>
          <Search />
        </div>
      </div>
    </div>
  )
}

export default Banner
