import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
      style={{ maxWidth: '100%' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div style={{ marginTop: '20px', display: 'flex', width: '100%' }}>
        <Form.Item
          label="Rss URL"
          name="url"
          rules={[
            {
              required: true,
              message: 'Please enter your RSS address you would like to add',
            },
          ]}
          style={{ flex: '1 1 auto', width: '100%' }}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 18 }} style={{ marginLeft: '20px' }}>
          <Button
            type="primary"
            htmlType="submit"
            key="add-rss"
            icon={<PlusOutlined rev="default" />}
          >
            Add
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default AddForm;
