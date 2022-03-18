import React, {useState} from 'react'
import {Card, Affix, Typography, Button} from 'antd'
import Select from 'react-select'
import styles from '../../../styles/Details.module.css'

const {Title} = Typography

const options = [
  {value: 'VIP', label: 'VIP'},
  {value: 'Early Birds', label: 'Early Birds'},
  {value: 'Regular', label: 'Regular'},
]

function DetailsAffix() {
  const [selectedOption, setSelectedOption] = useState(null)
  return (
    <>
      <Affix offsetTop={20}>
        <Card>
          <>
            <Title level={5}>Type</Title>
            <Select
              defaultValue={selectedOption}
              //  @ts-ignore
              onChange={setSelectedOption}
              options={options}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: '#d818ff',
                },
              })}
            />
            <Title style={{marginTop: 20}} level={5}>
              From $70 (1 SOL)
            </Title>
            <Button style={{marginTop: 20}} className={styles.button} type="primary" shape="round" size="large">
              Buy Ticket
            </Button>
          </>
        </Card>
      </Affix>
    </>
  )
}

export default DetailsAffix
