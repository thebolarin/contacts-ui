import React, { useEffect, useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import CustomModal from './custom-modal';
import axios from 'axios';
import CustomForm from './custom-form';

function EditContact(props) {
  const [contact, setContact] = useState({});
  const [editing, setEditing] = useState(false);
  const toast = useToast();

  const onSubmit = async editedContact => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
      setEditing(true);
      await axios.put(`${baseURL}/contact/${contact._id}`, editedContact);
      toast({
        title: 'Success.',
        status: 'success',
        description: 'Contact edited successfully.',
        position: 'top',
      });
      setEditing(false);
      props.onClose();
    } catch (error) {
      toast({
        title: 'Oops! Something went wrong.',
        status: 'error',
        description: error.response?.data?.data?.message || error.message,
        position: 'top',
      });
      setEditing(false);
    }
  };

  useEffect(() => {
    if (props.contact) {
      setContact(props.contact);
    }
  }, [props]);

  return (
    <CustomModal
      title="Edit Contact"
      isOpen={props.isOpen}
      onClose={props.onClose}
      footerChildren={
        <Button
          type="submit"
          size="md"
          form="edit-form"
          isLoading={editing}
          colorScheme="teal"
        >
          Submit
        </Button>
      }
    >
      <CustomForm id="edit-form" contact={contact} onSubmit={onSubmit} />
    </CustomModal>
  );
}

export default EditContact;
