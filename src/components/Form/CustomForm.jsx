import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

function CustomForm({ id, contact: selectedContact, onSubmit }) {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  
  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact);
    }
  }, [selectedContact]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(contact);
  };

  const handleValueChange = (valueObject) => setContact(value => ({ ...value, ...valueObject }))

  return (
    <form id={id} onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input
          id="firstName"
          type="text"
          onChange={e => handleValueChange({firstName: e.target.value})}
          value={contact.firstName}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input
          id="lastName"
          type="text"
          onChange={e => handleValueChange({lastName: e.target.value})}
          value={contact.lastName}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          onChange={e => handleValueChange({email: e.target.value})}
          value={contact.email}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="PhoneNumber">Phone Number</FormLabel>
        <Input
          id="phoneNumber"
          type="phone"
          onChange={e => handleValueChange({phoneNumber: e.target.value})}
          value={contact.phoneNumber}
        />
      </FormControl>
    </form>
  );
}

export default CustomForm;
