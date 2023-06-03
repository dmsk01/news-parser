import React from 'react';
import { useDispatch } from 'react-redux';

import { addSource } from 'renderer/store/settingsSlice';
import AddForm from '../AddForm/AddForm';

function AddRssForm() {
  const dispatch = useDispatch();
  const handleSubmit = (source: string) => {
    dispatch(addSource({ source }));
  };
  return (
    <AddForm key="url" label="Rss URL" name="url" onSubmit={handleSubmit} />
  );
}

export default AddRssForm;
