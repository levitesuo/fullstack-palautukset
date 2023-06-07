const SearchVeiw = ({contentList, buttonOnClick}) => {
    return (
        contentList.length > 10 ? 
            <p>{'Too many matches, specify another filter'}</p> : 
            <>{contentList.map(c => (
            <div key={c.name.official}>
                {c.name.common}<button onClick={() => buttonOnClick(c)}>{'show'}</button>
            </div>
            )
            )}</>
    )
}

export default SearchVeiw