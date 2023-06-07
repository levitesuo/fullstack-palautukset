import axios from 'axios'
const apiKey = process.env.REACT_APP_API_KEY

const getWeather = (lat, lon) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default getWeather