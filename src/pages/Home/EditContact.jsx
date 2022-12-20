import React, { useEffect, useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import CustomModal from '../../components/Modal/CustomModal';
import CustomForm from '../../components/Form/CustomForm';

function EditContact(props) {
  const [contact, setContact] = useState({});
  const [editing, setEditing] = useState(false);
  const toast = useToast();

  const onSubmit = async editedContact => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
      setEditing(true);
      const {data} = await axios.put(`${baseURL}/contact/${contact._id}`, editedContact);
      toast({
        title: 'Success.',
        status: 'success',
        description: 'Contact edited successfully.',
        position: 'top',
      });
      
      props.fullContacts.forEach((v,i,a)=>{
        if(v._id === contact._id) a[i] =  {...data.data}
      });

      props.setContact([...props.fullContacts])

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
