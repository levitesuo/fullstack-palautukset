import axios from 'axios'
const allUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getCountries = () => {
    const request = axios.get(allUrl)
    return request.then(response => response.data)
}

const getCountry = (countryName) => {
    const request = axios.get(`${baseUrl}${countryName}`)
    console.log(`making a request to ${baseUrl}${countryName} for ${countryName}s data`)
    return request.then(request.data)
}

export default { getCountries, getCountry}