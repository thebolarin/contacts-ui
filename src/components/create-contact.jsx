import React, { useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import CustomModal from './custom-modal';
import axios from 'axios';
import CustomForm from './custom-form';

function CreateContact(props) {
  const {isOpen, onClose} = props;
  const [creating, setCreating] = useState(false);
  const toast = useToast();

  const onSubmit = async contact => {
    const baseURL = process.env.REACT_APP_BASE_URL;
   
    try {
      setCreating(true);
      await axios.post(`${baseURL}/contact`, contact);
      toast({
        title: 'Success.',
        status: 'success',
        description: 'Contact successfully created.',
        position: 'top',
      });
      setCreating(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Oops! Something went wrong.',
        status: 'error',
        description: error.response?.data?.data?.message || error.message,
        position: 'top',
      });
      setCreating(false);
    }
  };

  return (
    <CustomModal
      title="Create Contact"
      isOpen={isOpen}
      onClose={onClose}
      footerChildren={
        <Button
          type="submit"
          size="md"
          form="create-form"
          isLoading={creating}
          colorScheme="teal"
        >
          Submit
        </Button>
      }
    >
      <CustomForm id="create-form" onSubmit={onSubmit} />
    </CustomModal>
  );
}

export default CreateContact;
