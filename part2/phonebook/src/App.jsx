import { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import phonebookService from './services/phonebook';
import Notification from './Notification';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ message: null, type: '' });

  // Function to display notifications
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: '' });
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );
  
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        phonebookService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            showNotification('Phone number updated successfully!', 'success');
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            showNotification(`Failed to update: ${existingPerson.name} was already deleted from the server`, 'error');
            setPersons(persons.filter(p => p.id !== existingPerson.id));
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
  
      phonebookService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          showNotification('Added new person to phonebook!', 'success');
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          showNotification('Failed to add new person', 'error');
        });
    }
  };
  
  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialNotes => setPersons(initialNotes))
      .catch(error => showNotification('Failed to retrieve phonebook data', 'error'));
  }, []);

  const handleDelete = id => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          showNotification('Person deleted successfully', 'success');
        })
        .catch(error => {
          showNotification(`Failed to delete ${person.name}. They might have already been removed`, 'error');
          setPersons(persons.filter(p => p.id !== id));
        });
    }
  };
  
  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter searchTerm={searchTerm} handleSearchChange={setSearchTerm} />

      <h3>Add a new</h3>

      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={setNewName}
        handleNumberChange={setNewNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
