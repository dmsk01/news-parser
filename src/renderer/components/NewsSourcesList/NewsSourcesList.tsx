import React from 'react';
import { Card, List, Typography, Space } from 'antd';
import { useSelector } from 'react-redux';
import { ISettingsState, ISource } from 'renderer/store/settingsSlice';
import ItemsList from '../ItemsList/ItemsList';

function NewsSourcesList() {
  const { currentFeed, feeds } = useSelector(
    (state: { settings: ISettingsState }) => state.settings
  );

  const { sources } = feeds[currentFeed];

  return (
    <div
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
        borderRadius: '7px',
      }}
    >
      <List
        dataSource={sources}
        renderItem={(src: ISource) => (
          <List.Item>
            <Card title={src.url} style={{ width: '100%' }}>
              <Typography.Title level={5}>
                <Space>Title selector:{src.titleSelector}</Space>
              </Typography.Title>
              <Typography.Title level={5}>
                <Space>
                  Paragraph selector:
                  {src.paragraphSelector}
                </Space>
              </Typography.Title>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
  // return <ItemsList title="sources" feed={feed} />;
}

export default NewsSourcesList;
