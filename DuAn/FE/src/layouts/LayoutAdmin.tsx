import React, { useState } from 'react';
import {
  HomeOutlined,
  PicLeftOutlined,
  ReadOutlined,
  UserOutlined,
  LogoutOutlined,
  ShopOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<NavLink to="/admin">Trang Chủ</NavLink>, '1', <HomeOutlined />,),
  getItem('Sản Phẩm', 'sub1', <ReadOutlined />, [
    getItem(<NavLink to="/admin/add">Thêm Sản Phẩm</NavLink>, '2'),
    getItem(<NavLink to="/admin">Danh Sách Sản Phẩm</NavLink>, '3'),
  ]),
  getItem('Tài Khoản', 'sub2', <UserOutlined />, [
    getItem(<NavLink to="/admin/user/add">Thêm Tài Khoản</NavLink>, '7'),
    getItem(<NavLink to="/admin/user">Danh Sách Tài Khoản</NavLink>, '4'),
  ]),
  getItem("Danh Mục", 'sub3', <PicLeftOutlined />, [
    getItem(<NavLink to="admin/category/add">Thêm Danh Mục</NavLink>, '6'),
    getItem(<NavLink to="admin/category">Danh Sách Danh Mục</NavLink>, '5')
  ]),
  getItem(<NavLink to="/admin/order">Đơn Hàng</NavLink>, '8', <ShopOutlined />),
  getItem(<NavLink to='/' >Trang Chủ</NavLink>, '9', <LogoutOutlined />)
];

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;