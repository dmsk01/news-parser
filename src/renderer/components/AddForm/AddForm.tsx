import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addSource } from 'renderer/store/settingsSlice';

function AddForm() {
  const [formValue, setFormValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addSource({ source: formValue }));
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormValue(e.currentTarget.value);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Rss URL"
        name="url"
        rules={[
          {
            required: true,
            message: 'Please enter your RSS address you would like to add',
          },
        ]}
      >
        <Input onChange={handleChange} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddForm;
