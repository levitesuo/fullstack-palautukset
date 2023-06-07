import { useState, useEffect } from 'react'
import countryServices from './services/countries'
import getWeather from './services/weather'
import Page from './components/Page'

const App = () => {
  const [search, setNewSearch] = useState('')
  const [countryList, setCountryList] = useState([])
  const [filteredCountries, setFilteredCount] = useState([])
  const [weather, setWeather] = useState('')

  useEffect(() => {
    countryServices
    .getCountries()
    .then(response => {
      setCountryList(response)
      setFilteredCount(response)
    })
  }, [])

  useEffect(() => {
    weatherUpdate(filteredCountries[0])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(filteredCountries.length === 1)])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
    const newFiltered = countryList.filter(c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredCount(newFiltered)
  }

  const weatherUpdate = (country) => {
    const capitalCord = 
      (typeof country !== "undefined") ?
        country.capitalInfo.latlng : 
        [0, 0]
    console.log(capitalCord)
    getWeather(capitalCord[0], capitalCord[1])
    .then(response => setWeather(response))
  }

  const handleButtonPress = (country) => {
    setFilteredCount([country])
}

  return(
      <Page 
        contentList={filteredCountries} 
        searchFunction={handleSearch} 
        searchValue={search} 
        handleButtonPress={handleButtonPress}
        weather={weather}
      />
  )
}

export default App;
