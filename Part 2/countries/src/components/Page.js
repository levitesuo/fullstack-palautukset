import CountryView from "./countryView"
import SearchVeiw from "./searchView"

const Filter = ({text, value, onChange}) => <>{text} <input value={value} onChange={onChange} /></>

const Page = ({contentList, searchFunction, searchValue, handleButtonPress, weather, weatherUpdate}) => {
  return (
  <>
    <Filter text={'find countries'} value={searchValue} onChange={searchFunction}/>
    {contentList.length === 1 ?
    <CountryView countryObj={contentList[0]} weather={weather} weatherUpdate={weatherUpdate}/> :
    <SearchVeiw contentList={contentList} buttonOnClick={handleButtonPress}/>}
  </>
)}

export default Page