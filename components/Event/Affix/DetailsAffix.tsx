import React, { useState } from 'react'
import { Card, Affix, Typography, Button } from 'antd'
import Select from 'react-select'
import styles from '../../../styles/Details.module.css'

const { Title } = Typography

export type IClass = {
  id: number
  name: string
  price: string
  amount: string
}

export type DetailsAffixProps = {
  classes?: IClass[]
}

function DetailsAffix(props: DetailsAffixProps) {
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
            <Title style={{ marginTop: 20 }} level={5}>
              ${renderPrice()}
              {/* From $70 (1 SOL) */}
            </Title>
            <Button style={{ marginTop: 20 }} className={styles.button} type="primary" shape="round" size="large">
              Buy Ticket
            </Button>
          </>
        </Card>
      </Affix>
    </>
  )
}

export default DetailsAffix
