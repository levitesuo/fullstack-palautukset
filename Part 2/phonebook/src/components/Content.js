
const Content = ({ contentList, heading, removePerson }) => (
    <div>
      <h2>{heading}</h2>
      <div>
        {contentList.map(person => 
            <li key={person.id}>
                {person.name} {person.number}
                <button onClick={() => removePerson(person)}>{'delete'}</button>
            </li>
        )}
    </div>
    </div>
  )

export default Content