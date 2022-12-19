import React, { useEffect, useState, useCallback } from 'react';
import {
  useMediaQuery,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  useToast,
  Button,
  Flex,
  Box,
  Text,
  Skeleton,
} from '@chakra-ui/react';
import axios from 'axios';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import EditContact from './edit-contact';
import MobileHome from './mobile-home';
import CreateContact from './create-contact';
import DeleteAlertModal from './delete-alert-modal';
import ViewAContact from './view-contact';

function Home() {
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [reload, setReload] = useState(Math.random());
  const [showCreateForm, setShowCreateForm] = useState(false);
  const toast = useToast();

  const [isBigScreen] = useMediaQuery('(min-width: 768px)');

  const getContacts = useCallback(async () => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
      setIsLoadingContacts(true);
      const response = await axios.get(`${baseURL}/contact`);
      const contacts = response.data.data.contacts;

      setContacts(contacts);
      setIsLoadingContacts(false);
    } catch (error) {
      toast({
        title: 'Oops! Something went wrong.',
        status: 'error',
        description: error.response?.data?.message || error.message,
        position: 'top',
      });
      setIsLoadingContacts(false);
      console.error(error);
    }
  }, [toast]);

  useEffect(() => {
    console.log("its reloading")
    getContacts();
  }, [reload, getContacts]);

  if (isBigScreen) {
    return (
      <Skeleton size="20" isLoaded={!isLoadingContacts}>
        <Box mx={12} mt={4}>
          <TableContainer>
            <Flex justifyContent="flex-end">
              <Button
                onClick={() => {
                  console.log('its open')
                  setShowCreateForm(true)
                }}
                w={200}
                isFullWidth={false}
                colorScheme="teal"
              >
                Add a New Contact
              </Button>
            </Flex>
            {contacts.length > 0 && (
              <Table variant="striped" colorScheme="teal">
                <TableCaption placement="top">
                  <Text fontSize="3xl">{contacts.length} Contact(s) </Text>
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Phone Number</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {contacts.map(contact => (
                    <Tr key={contact._id}>
                      <Td>{`${contact.firstName}  ${contact.lastName}`}</Td>
                      <Td>{contact.email}</Td>
                      <Td>{contact.phoneNumber}</Td>
                      <Td>
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
                      </Td>
                      <Td>
                        <Button
                          variant="link"
                          onClick={() => {
                            setSelectedContactId(contact._id);
                          }}
                        >
                          Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </TableContainer>
          <EditContact
            isOpen={!!contact}
            onClose={() => {
              setContact(null);
              // setReload(Math.random());
            }}
            contact={contact}
          />
          <CreateContact
            isOpen={showCreateForm}
            onClose={() => {
              console.log('its close')
              setShowCreateForm(false);
              // setReload(Math.random());
            }}
          />
          <DeleteAlertModal
            isOpen={!!contactToDelete}
            onClose={() => {
              setContactToDelete(null);
              // setReload(Math.random());
            }}
            contact={contactToDelete}
          />

          {selectedContactId !== null && (
            <ViewAContact
              isOpen={!!selectedContactId}
              onClose={() => {
                setSelectedContactId(null);
              }}
              contactId={selectedContactId}
            />
          )}
        </Box>
      </Skeleton>
    );
  }
  return (
    <Skeleton size="20" isLoaded={!isLoadingContacts}>
      <MobileHome
        contacts={contacts}
        refresh={() => {
          setReload(Math.random());
        }}
      />
    </Skeleton>
  );
}

export default Home;
