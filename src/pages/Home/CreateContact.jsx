import React, { useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import CustomModal from '../../components/Modal/CustomModal';
import CustomForm from '../../components/Form/CustomForm';

function CreateContact(props) {
  const {isOpen, onClose, setContact} = props;
  const [creating, setCreating] = useState(false);
  const toast = useToast();


  const onSubmit = async contact => {
    const baseURL = process.env.REACT_APP_BASE_URL;
   
    try {
      setCreating(true);
      const {data} = await axios.post(`${baseURL}/contact`, contact);

      const spreadData = [data?.data, ...props.contact];
      setContact([...spreadData])

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
