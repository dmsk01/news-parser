import React from 'react';
import { useDispatch } from 'react-redux';

import { addKeyword } from 'renderer/store/settingsSlice';
import AddForm from '../AddForm/AddForm';

function AddKeywordForm() {
  const dispatch = useDispatch();
  const handleSubmit = (source: string) => {
    dispatch(addKeyword({ source }));
  };
  return (
    <AddForm
      key="keyword"
      label="Keyword"
      name="keyword"
      onSubmit={handleSubmit}
    />
  );
}

export default AddKeywordForm;
