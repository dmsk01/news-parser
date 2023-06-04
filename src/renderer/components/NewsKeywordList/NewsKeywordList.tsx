import React from 'react';
import { useSelector } from 'react-redux';
import { ISettingsState } from 'renderer/store/settingsSlice';
import ItemsList from '../ItemsList/ItemsList';

function NewsKeywordList() {
  const feed = useSelector(
    (state: { settings: ISettingsState }) => state.settings.currentFeed
  );

  return <ItemsList title="keywords" feed={feed} />;
}

export default NewsKeywordList;
