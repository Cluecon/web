import React, { useState } from 'react'
import { Card, Button, Affix, Typography } from 'antd'
import Select from 'react-select'
import styles from '../../../styles/Details.module.css'
import { DetailsAffixProps } from '../Affix/DetailsAffix'

const { Title } = Typography

function MobileFooter(props: DetailsAffixProps) {
  const options = props.classes?.map((cl) => {
    return {
      value: cl.name,
      label: cl.name,
    }
  })
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null)

  function renderPrice() {
    if (!props.classes) {
      return 'Free'
    }
    if (selectedOption) {
      return props.classes ? props.classes.filter((c) => c.name == selectedOption.value)[0].price : ''
    }
  }

  return (
    <>
      <Affix style={{ width: '100%' }} offsetBottom={10}>
        <Card
          style={{ width: '100%' }}
          bodyStyle={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
            <Title style={{ marginTop: 20 }} level={5}>
              ${renderPrice()}
            </Title>
            <Button style={{ marginTop: 20 }} className={styles.button} type="primary" shape="round" size="large">
              Buy Ticket
            </Button>
          </div>
        </Card>
      </Affix>
    </>
  )
}

export default MobileFooter
