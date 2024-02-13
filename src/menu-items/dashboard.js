// assets
import { AreaChartOutlined, StockOutlined } from '@ant-design/icons';

// icons
const icons = {
  AreaChartOutlined, 
  StockOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
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
    }
  ]
};

export default dashboard;
