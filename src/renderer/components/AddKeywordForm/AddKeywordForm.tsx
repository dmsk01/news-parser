import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ISettingsState, addListItem } from 'renderer/store/settingsSlice';
import AddForm from '../AddForm/AddForm';

function AddKeywordForm() {
  const dispatch = useDispatch();
  const feed = useSelector(
    (state: { settings: ISettingsState }) => state.settings.currentFeed
  );

  const handleSubmit = (keyword: string) => {
    dispatch(addListItem({ item: keyword, feed, title: 'keywords' }));
  };
  return (
    <AddForm
      key="keywords"
      label="Keyword"
      name="keywords"
      onSubmit={handleSubmit}
    />
  );
}

export default AddKeywordForm;
