import React from 'react';
import { useDispatch } from 'react-redux';
import { removeSource, editSource } from 'renderer/store/settingsSlice';
import { List, Button, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface IListItem {
  item: string;
  onDelete: (feed: string) => void;
  onEdit: (item: string, newValue: string) => void;
}

function ListItem({ item, onDelete, onEdit }: IListItem) {
  const handleDelete = (src: string) => {
    onDelete(src);
  };

  const handleEdit = (newValue: string) => {
    onEdit(item, newValue);
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
