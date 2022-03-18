import React, {useState} from 'react'
import {Card, Button, Affix, Typography} from 'antd'
import Select from 'react-select'
import styles from '../../../styles/Details.module.css'

const {Title} = Typography

const options = [
  {value: 'VIP', label: 'VIP'},
  {value: 'Early Birds', label: 'Early Birds'},
  {value: 'Regular', label: 'Regular'},
]

function MobileFooter() {
  const [selectedOption, setSelectedOption] = useState(null)
  return (
    <>
      <Affix style={{width: '100%'}} offsetBottom={10}>
        <Card
          style={{width: '100%'}}
          bodyStyle={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <Select
              width="500px"
              defaultValue={selectedOption}
              //  @ts-ignore
              onChange={setSelectedOption}
              options={options}
              menuPlacement="auto"
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
              $70 (1 SOL)
            </Title>
            <Button style={{marginTop: 20}} className={styles.button} type="primary" shape="round" size="large">
              Buy Ticket
            </Button>
          </div>
        </Card>
      </Affix>
    </>
  )
}

export default MobileFooter
