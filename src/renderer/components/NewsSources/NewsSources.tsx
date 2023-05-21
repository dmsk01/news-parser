import React from 'react';

import { useSelector } from 'react-redux';
import { ISettingsState } from 'renderer/store/settingsSlice';

import { List, Typography } from 'antd';
import ListItem from './ListItem';

function NewsSources() {
  const sources = useSelector(
    (state: { settings: ISettingsState }) => state.settings.sources
  );

  return (
    <List
      header={<Typography.Title level={3}>Sources</Typography.Title>}
      bordered
      size="default"
      style={{ height: '300px', overflowY: 'scroll' }}
      dataSource={sources}
      renderItem={(item) => <ListItem key={item} item={item} />}
    />
  );
}

export default NewsSources;
