// assets
import { AreaChartOutlined, StockOutlined, LogoutOutlined } from '@ant-design/icons';
// icons
const icons = {
  AreaChartOutlined, 
  StockOutlined, LogoutOutlined
};
// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.AreaChartOutlined,
      breadcrumbs: false
    },
    {
      id: 'deals',
      title: 'Deals',
      type: 'item',
      url: '/deals',
      icon: icons.StockOutlined,
      breadcrumbs: false
    },
    {
      id: 'back',
      title: 'Back to solneta.com',
      type: 'item',
      url: 'https://solneta.com/',
      icon: icons.LogoutOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
