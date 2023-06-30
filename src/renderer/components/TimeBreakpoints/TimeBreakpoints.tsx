import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, TimePicker } from 'antd';
import { addTimeBreak, clearTimeBreaks } from 'renderer/store/settingsSlice';

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

  const onFinish = (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
    };
    dispatch(addTimeBreak({ time: values['time-picker'] }));
    // console.log('Received values of form: ', values['time-picker']);
  };
  return (
    <Form
      name="time_related_controls"
      {...formItemLayout}
      onFinish={onFinish}
      style={{ maxWidth: 600, padding: '50px 0' }}
    >
      <Form.Item name="time-picker" label="Add searching time" {...config}>
        <TimePicker />
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
        <Button
          onClick={() => dispatch(clearTimeBreaks())}
          type="primary"
          htmlType="button"
          style={{ marginLeft: '20px' }}
        >
          Clear
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TimeBreakpoints;
