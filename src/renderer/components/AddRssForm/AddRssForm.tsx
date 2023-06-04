import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ISettingsState, addListItem } from 'renderer/store/settingsSlice';
import AddForm from '../AddForm/AddForm';

function AddRssForm() {
  const dispatch = useDispatch();
  const feed = useSelector(
    (state: { settings: ISettingsState }) => state.settings.currentFeed
  );
  const handleSubmit = (source: string) => {
    dispatch(addListItem({ item: source, feed, title: 'sources' }));
  };
  return (
    <AddForm key="url" label="Rss URL" name="url" onSubmit={handleSubmit} />
  );
}

export default AddRssForm;
