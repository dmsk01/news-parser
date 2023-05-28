import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addSource } from 'renderer/store/settingsSlice';

interface IAddForm {
  name: string;
  label: string;
}

function AddForm({ name, label }: IAddForm) {
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
      style={{ maxWidth: '100%' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div style={{ marginTop: '20px', display: 'flex', width: '100%' }}>
        <Form.Item
          label={label}
          name={name}
          rules={[
            {
              required: true,
              message: 'Field must not be empty',
            },
          ]}
          style={{ flex: '1 1 auto', width: '100%' }}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ marginLeft: '20px' }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default AddForm;
