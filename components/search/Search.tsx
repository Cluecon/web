import { Input, DatePicker, Button } from 'antd'
import React, { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import moment from 'moment'

function Search() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [date, setDate] = useState('')
  const [latlng, setLatlng] = useState<{ lat: number; lng: number } | undefined>()
  const [location, setLocation] = useState('')
  const router = useRouter()

  function onDateChange(date: moment.Moment | null, dateString: string) {
    const selectedDate = date && moment.utc(date).format()
    setDate(selectedDate as string)
    console.log(selectedDate, dateString)
  }

  async function searchEvents() {
    if (latlng) {
      router.push(`/search/${latlng.lat}/${latlng.lng}`)
    }
  }

  return (
    <>
      <div className={styles.searchBar}>
        <div className={styles.fieldWrapper}>
          <PlacesAutocomplete
            value={location}
            onChange={(add) => {
              setLocation(add)
            }}
            onSelect={(add) => {
              geocodeByAddress(add)
                .then((results) => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                  setLatlng({ lat: lat, lng: lng })
                  setLocation(add)
                })
            }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <Input
                  className={styles.searchInput}
                  {...getInputProps({
                    placeholder: 'Event location',
                  })}
                  size="large"
                  prefix={<EnvironmentOutlined />}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' }
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        <div className={styles.fieldWrapper}>
          <DatePicker className={styles.searchInput} onChange={onDateChange} />
        </div>
        <div>
          <Button
            className={styles.btn}
            type="primary"
            shape="round"
            size="large"
            icon={<SearchOutlined />}
            onClick={searchEvents}
          >
            Explore
          </Button>
        </div>
      </div>
    </>
  )
}

export default Search
