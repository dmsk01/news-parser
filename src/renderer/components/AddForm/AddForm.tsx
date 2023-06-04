import React from 'react';
import { Button, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface IAddForm {
  name: string;
  label: string;
  onSubmit: (value: string) => void;
}

function AddForm({ name, label, onSubmit }: IAddForm) {
  const [form] = Form.useForm();
  Form.useWatch(name, form);

  const onFinish = (values: any) => {
    try {
      onSubmit(values[name].trim());
    } catch (err) {
      console.log('Err from catch add form element', err);
    } finally {
      form.resetFields();
    }
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
      key={name}
    >
      <div style={{ marginTop: '20px', display: 'flex', width: '100%' }}>
        <Form.Item
          label={label}
          name={name}
          key={name}
          rules={[
            {
              required: true,
              message: `Please enter ${label} you would like to add`,
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
            key="add-item"
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
