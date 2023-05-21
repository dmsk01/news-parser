import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ISettingsState, removeSource } from 'renderer/store/settingsSlice';

import { List, Typography, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function NewsSources() {
  const dispatch = useDispatch();
  const sources = useSelector(
    (state: { settings: ISettingsState }) => state.settings.sources
  );

  const handleDelete = (src: string) => {
    dispatch(removeSource({ src }));
  };

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
              onClick={() => handleDelete(item)}
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
