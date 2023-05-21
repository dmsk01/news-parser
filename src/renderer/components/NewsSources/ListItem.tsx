import React from 'react';
import { useDispatch } from 'react-redux';
import { removeSource, editSource } from 'renderer/store/settingsSlice';
import { List, Button, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function ListItem({ item }: { item: string }) {
  const dispatch = useDispatch();

  const handleDelete = (src: string) => {
    dispatch(removeSource({ src }));
  };

  const handleEdit = (editedSrc: string) => {
    dispatch(editSource({ src: item, newSrc: editedSrc }));
  };
  return (
    <List.Item
      key={item}
      actions={[
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
      <Typography.Text
        editable={{
          onChange: handleEdit,
        }}
      >
        {item}
      </Typography.Text>
    </List.Item>
  );
}

export default ListItem;
