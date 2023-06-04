import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ISettingsState,
  addItem,
  addKeyword,
} from 'renderer/store/settingsSlice';
import AddForm from '../AddForm/AddForm';

function AddKeywordForm() {
  const dispatch = useDispatch();
  const feed = useSelector(
    (state: { settings: ISettingsState }) => state.settings.currentFeed
  );

  const handleSubmit = (keyword: string) => {
    dispatch(addKeyword({ keyword, feed }));
    // dispatch(addItem({ keyword, feed, title: 'keywords' }));
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
