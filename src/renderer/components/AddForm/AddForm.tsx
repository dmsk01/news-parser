import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addSource } from 'renderer/store/settingsSlice';

function AddForm() {
  const [form] = Form.useForm();
  Form.useWatch('url', form);
  const dispatch = useDispatch();

  const onFinish = (values: { url: string }) => {
    dispatch(addSource({ source: values.url }));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 300 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
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
        <Input />
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
