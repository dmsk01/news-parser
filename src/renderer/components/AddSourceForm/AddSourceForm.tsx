import React from 'react';
import { Button, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  ISettingsState,
  ISource,
  addSourceItem,
} from 'renderer/store/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';

interface IAddForm {
  name: string;
  onSubmit: (value: ISource) => void;
}

function AddSourceForm() {
  const dispatch = useDispatch();
  const feed = useSelector(
    (state: { settings: ISettingsState }) => state.settings.currentFeed
  );

  const [form] = Form.useForm();
  Form.useWatch('source-form', form);

  const onFinish = (values: ISource) => {
    try {
      dispatch(addSourceItem({ item: values, feed }));
    } catch (err) {
      console.log('Err from catch add form element', err);
    } finally {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
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
      key="source-form"
      name="source-form"
    >
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Form.Item
          label="Rss URL"
          name="url"
          key="rss-url"
          rules={[
            {
              required: true,
              message: `Please enter Rss url you would like to add`,
            },
          ]}
          style={{ flex: '1 1 auto', width: '100%' }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Title selector"
          name="titleSelector"
          key="title-selector"
          rules={[
            {
              required: true,
              message: `Please enter title selector for news article you'd like to add`,
            },
          ]}
          style={{ flex: '1 1 auto', width: '100%' }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Paragraph selector"
          name="paragraphSelector"
          key="paragraph-selector"
          rules={[
            {
              required: true,
              message: `Please enter paragraph (text) selector for news article you'd like to add`,
            },
          ]}
          style={{ flex: '1 1 auto', width: '100%' }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 18 }}
          style={{ marginLeft: '20px', alignSelf: 'flex-end' }}
        >
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

export default AddSourceForm;
