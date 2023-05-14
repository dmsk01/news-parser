import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSource } from 'renderer/store/settingsSlice';

function AddForm() {
  const [formValue, setFormValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addSource({ source: formValue }));
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormValue(e.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="text" />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddForm;
