import React from 'react';

import { useSelector } from 'react-redux';
import { ISettingsState } from 'renderer/store/settingsSlice';

import { List, Typography } from 'antd';
import { capitalizeFirstLetter } from 'renderer/utils';
import ListItem from './ListItem';

interface IItemsList {
  title: 'sources' | 'keywords';
}

function ItemsList({ title }: IItemsList) {
  const data = useSelector(
    (state: { settings: ISettingsState }) => state.settings[title]
  );

  return (
    <List
      header={
        <Typography.Title level={3}>
          {capitalizeFirstLetter(title)}
        </Typography.Title>
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
