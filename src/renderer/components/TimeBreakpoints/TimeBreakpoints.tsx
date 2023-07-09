import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, List, TimePicker } from 'antd';
import {
  ISettingsState,
  addTimeBreak,
  clearTimeBreaks,
  editTimeBreak,
  removeTimeBreak,
} from 'renderer/store/settingsSlice';
import ListItem from '../ItemsList/ListItem';

function TimeBreakpoints() {
  const dispatch = useDispatch();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const config = {
    rules: [
      {
        type: 'object' as const,
        required: true,
        message: 'Please select time!',
      },
    ],
  };

  const times = useSelector(
    (state: { settings: ISettingsState }) => state.settings.timeBreakpoints
  );
  const onFinish = (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
      'time-picker': fieldsValue['time-picker'].format('HH:mm'),
    };
    dispatch(addTimeBreak({ time: values['time-picker'] }));
  };

  const handleDelete = (item: string) => {
    dispatch(removeTimeBreak({ time: item }));
  };

  const handleEdit = (item: string, newValue: string) => {
    dispatch(editTimeBreak({ item, newValue }));
  };

  const handleClear = () => {
    if (window.confirm('Are you sure to clear time list?')) {
      dispatch(clearTimeBreaks());
    }
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}
    >
      <Form
        name="time_related_controls"
        {...formItemLayout}
        onFinish={onFinish}
        style={{ maxWidth: 600, width: '100%' }}
      >
        <Form.Item name="time-picker" label="Add searching time" {...config}>
          <TimePicker allowClear format="HH:mm" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button onClick={handleClear} type="primary" htmlType="button">
            Clear time list
          </Button>
        </Form.Item>
      </Form>
      <List
        bordered
        size="default"
        style={{
          height: '300px',
          width: '350px',
          overflowY: 'scroll',
        }}
        dataSource={times}
        renderItem={(item) => (
          <ListItem
            key={item}
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      />
    </div>
  );
}

export default TimeBreakpoints;
