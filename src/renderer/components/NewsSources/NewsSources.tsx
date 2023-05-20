import React from 'react';

import { useSelector } from 'react-redux';
import { ISettingsState } from 'renderer/store/settingsSlice';

import { List, Typography, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              htmlType="button"
              shape="circle"
              key="list-item-edit"
              icon={<EditOutlined rev="default" />}
            />,
            <Button
              danger
              type="primary"
              htmlType="button"
              shape="circle"
              key="list-item-delete"
              icon={<DeleteOutlined rev="default" />}
            />,
          ]}
        >
          <Typography.Text>{item}</Typography.Text>
        </List.Item>
      )}
    />
  );
}

export default NewsSources;
