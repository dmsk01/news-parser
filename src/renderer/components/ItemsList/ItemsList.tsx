import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  ISettingsState,
  editListItem,
  removeItem,
  removeSource,
} from 'renderer/store/settingsSlice';

import { List, Typography } from 'antd';
import { capitalizeFirstLetter } from 'renderer/utils';
import ListItem from './ListItem';

interface IItemsList {
  title: 'sources' | 'keywords';
  feed: string;
}

function ItemsList({ title, feed }: IItemsList) {
  const dispatch = useDispatch();

  const data = useSelector(
    (state: { settings: ISettingsState }) => state.settings.feeds[feed][title]
  );

  const handleDelete = (item: string) => {
    dispatch(removeItem({ item, feed, title }));
  };

  const handleEdit = (item: string, newValue: string) => {
    dispatch(editListItem({ item, newValue, feed, title }));
  };

  return (
    <List
      header={
        <Typography.Title level={3}>{`${capitalizeFirstLetter(
          feed
        )} ${title}`}</Typography.Title>
      }
      bordered
      size="default"
      style={{ height: '300px', overflowY: 'scroll' }}
      dataSource={data}
      renderItem={(item) => (
        <ListItem
          key={item}
          item={item}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    />
  );
}

export default ItemsList;
