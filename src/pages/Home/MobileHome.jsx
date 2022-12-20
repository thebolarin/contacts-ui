import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  VStack,
  IconButton,
  HStack,
  Spacer,
  Button,
} from '@chakra-ui/react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import ViewAContact from './ViewContact';
import EditContact from './EditContact';
import DeleteContact from './DeleteContact';
import CreateContact from './CreateContact';

function MobileHome(props) {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (props.contacts) {
      setContacts(props.contacts);
    }
  }, [props]);
  return (
    <Box>
      {contacts.length > 0 && (
        <Text fontSize="xl" color="gray.500">
          {contacts.length} Contact(s)
        </Text>
      )}
      <VStack spacing={4} pt={5} pb={5} align="stretch">
        {contacts.map(contact => (
          <Box
            shadow="md"
            w="100%"
            textAlign="left"
            pl="5"
            py="3"
            borderWidth="1px"
            key={contact._id}
          >
            <HStack>
              <Box
                onClick={() => {
                  setSelectedContactId(contact._id);
                }}
              >
                <Text fontSize="sm">{`${contact.firstName}  ${contact.lastName}`}</Text>
                <Text fontSize="sm">{contact.email}</Text>
                <Text fontSize="sm">{contact.phoneNumber}</Text>
              </Box>
              <Spacer />
              <VStack>
                <IconButton
                  aria-label="Edit Contact"
                  size="sm"
                  variant="link"
                  icon={
                    <GrEdit
                      onClick={() => {
                        setContact(contact);
                      }}
                    />
                  }
                />
                <Spacer />
                <IconButton
                  colorScheme="red"
                  size="sm"
                  variant="link"
                  aria-label="Delete Contact"
                  icon={
                    <RiDeleteBin6Line
                      onClick={() => {
                        setContactToDelete(contact);
                      }}
                    />
                  }
                />
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>

      <EditContact
        isOpen={contact}
        onClose={() => setContact(null) }
        fullContacts={contacts}
        contact={contact}
        setContact={setContact}

      />

      <CreateContact
        setContact={setContacts}
        contact={contacts}

        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      />
      <DeleteContact
        isOpen={contactToDelete}
        onClose={() => setContactToDelete(null)}
        contact={contacts}
        setContact={setContacts}
        contactToDelete={contactToDelete}
      />
      {selectedContactId !== null && (
        <ViewAContact
          isOpen={selectedContactId}
          onClose={() => {
            setSelectedContactId(null);
          }}
          contactId={selectedContactId}
        />
      )}
      <Button colorScheme="teal" onClick={() => setShowCreateForm(true)}>
        Add a New Contact
      </Button>
    </Box>
  );
}

export default MobileHome;
