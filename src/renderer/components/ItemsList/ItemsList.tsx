import React from 'react';

import { useSelector } from 'react-redux';
import { ISettingsState } from 'renderer/store/settingsSlice';

import { List, Typography } from 'antd';
import { capitalizeFirstLetter } from 'renderer/utils';
import ListItem from './ListItem';

interface IItemsList {
  title: 'sources' | 'keywords';
  feed: string;
}

function ItemsList({ title, feed }: IItemsList) {
  const data = useSelector(
    (state: { settings: ISettingsState }) => state.settings.feeds[feed][title]
  );

  return (
    <List
      header={
        <Typography.Title level={3}>{`${feed} ${title}`}</Typography.Title>
      }
      bordered
      size="default"
      style={{ height: '300px', overflowY: 'scroll' }}
      dataSource={data}
      renderItem={(item) => <ListItem key={item} item={item} />}
    />
  );
}

export default ItemsList;
