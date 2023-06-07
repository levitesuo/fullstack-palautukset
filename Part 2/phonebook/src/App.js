import { useState, useEffect } from 'react'
import personService from './services/persons'
import TwoFieldForm from './components/TwoFielForm'
import Content from './components/Content'
import './index.css'

const Filter = ({text, value, onChange}) => <>{text} <input value={value} onChange={onChange} /></>

const Notification = ({ message, type }) => {
  if (message === null) {return null
  } else {
    return (
      <div className={type}>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const [search, setNewSearch] = useState('')
  const [dataShown, setDataShown] = useState([])

  const [notificationMessage, setNotifMessage] = useState(null)
  const [notiType, setNotiType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
        setDataShown(response)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    /* console.log('button clicked', event.target) */
    const personObj = {
      name: newName,
      number: newNum,
    }
    if (persons.some(person => person.name === personObj.name)){
      handlePersonInfoChange(personObj)
    } else {
      personService
        .create(personObj)
        .then(response => {
          const newPersons = persons.concat(response)
          setPersons(newPersons)
          handleDataShownChange(search, newPersons)
          handleNotification(`Added ${response.name}`, 'confirmation')
        })
    }
    setNewName('')
    setNewNum('')
  }

  const handlePersonInfoChange = personObj => {
    if (persons.some(person => person.name === personObj.name && person.number !== personObj.number)){
      if (window.confirm(`${personObj.name} is alredy in the phonbook. Would you like to replace the old information with the new one?`)){
        const id = persons.find(p => p.name === personObj.name).id
        personService
          .update(id, personObj)
          .then(response => {
            const newPersons = persons.map(p => p.id === id ? response : p)
            setPersons(newPersons)
            handleDataShownChange(search, newPersons)
            handleNotification(`Changed ${response.name}`, 'confirmation')})
          .catch(error => {
              handleNotification(`Information of ${personObj.name} has alredy been deleted from server.`, 'error')
          })
      }
    }
  }

  const deleteName = personToBeDeleted => {
    if (window.confirm(`delete ${personToBeDeleted.name}`)) {
      const id = personToBeDeleted.id
      personService.remove(id)
      const newPersons = persons.filter(p => p.id !== id)
      setPersons(newPersons)
      handleDataShownChange(search, newPersons)
      handleNotification(`Deleted ${personToBeDeleted.name}`, 'confirmation')
    }
  }

  const handleDataShownChange = (query, data) => {
    const newDataToBeShown = data.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
    setDataShown(newDataToBeShown)
    /* console.log(query) */
  }

  const handleNameChange = (event) => {
    /* console.log(event.target.value) */
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
    /* console.log(search) */
    handleDataShownChange(event.target.value, persons)
  }

  const handleNotification = (message, type) => {
    setNotiType(type)
    setNotifMessage(message)
    setTimeout(()=> {setNotifMessage(null)}, 2500)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notiType} />
      <Filter text = 'filter shown with' value={search} onChange={handleSearch} />
      <TwoFieldForm
        formHeading={'add a new'}
        f1Text={'name:'}
        f1Value={newName}
        f1OnChange={handleNameChange}
        f2Text={'number:'}
        f2Value={newNum}
        f2OnChange={handleNumChange}
        buttonText={'add'}
        onSubmit={addName}
        
      />
      <Content heading={'Numbers'} contentList={dataShown} removePerson={deleteName} />
    </div>
  )
}

export default App