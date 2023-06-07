const WeatherIcon = ({weather}) => {
    console.log(weather.weather[0].icon)
    return (
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
)}

const WeatherModule = ({ weather ,city }) => {
    console.log(weather)
    const temp = Math.round((parseFloat(weather.main.temp) - 273.15) * 100) / 100
    return(
        <div>
            <h2>{`Weather in ${city}`}</h2>
            <p>{`temperature ${temp} Celcius`}</p>
            <WeatherIcon weather={weather} />
            <p>{`wind ${weather.wind.speed} m/s`}</p>
        </div>
    )
}

const CountryView = ({ countryObj , weather }) => (
    <div>
      <h1>{ countryObj.name.common }</h1>
      <p>{`capital ${countryObj.capital}`}</p>
      <p>{`area ${countryObj.area}`}</p>
      <h2>{'languages: '}</h2>
      <ul>
        {Object.values(countryObj.languages).map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={countryObj.flags.png} alt =""/>
      <WeatherModule weather={weather} city={countryObj.capital} />
    </div>
)

export default CountryView
