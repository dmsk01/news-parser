import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Layout, Row, Menu, Button, Typography, theme } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import FeedPicker from '../FeedPicker/FeedPicker';
import SearchHeader from '../SearchHeader/SearchHeader';

const { Header, Sider, Content } = Layout;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface IAppLayoutProps {
  children: React.ReactNode;
}

const items: MenuProps['items'] = [
  {
    label: (
      <Link to="/search">
        <SearchOutlined rev="default" />
        <span>Search</span>
      </Link>
    ),
    key: 'search',
  },
  {
    label: (
      <Link to="/settings">
        <SettingOutlined rev="default" />
        <span>Settings</span>
      </Link>
    ),
    key: 'settings',
  },
];

const AppLayout = ({ children }: IAppLayoutProps) => {
  const [pageName, setPageName] = useState<string>('Search');
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  useEffect(() => {
    setPageName(capitalizeFirstLetter(location.pathname.substring(1)));
  }, [location]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider id="aside" trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={['1']} items={items} />
        {pageName === 'Settings' ? null : <FeedPicker />}
      </Sider>
      <Layout>
        <Header
          id="header"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Row justify="space-between" align="middle" gutter={16}>
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined rev="default" />
                ) : (
                  <MenuFoldOutlined rev="default" />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            {/* {pageName === 'Settings' ? null : <SearchHeader />} */}
            <Typography.Title style={{ padding: '0 24px', margin: '0' }}>
              {pageName || 'Search'} page
            </Typography.Title>
          </Row>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            maxHeight: 'calc(100% - 64px)',
            overflowY: 'scroll',
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
