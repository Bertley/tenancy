export default async function getMenuData() {
  return [
    {
      category: true,
      title: 'Dashboard',
    },
    {
      title: 'Dashboard',
      key: 'dashboard',
      icon: 'fe fe-home',
      roles: ['admin'],
      url: '/dashboard' // set user roles with access to this route
    },
    {
      category: true,
      title: 'Manager',
    },
    {
      title: 'Products',
      key: 'products',
      icon: 'fe fe-database',
      children: [
        {
          title: 'Products',
          key: 'productList',
          url: '/products',
        },
        {
          title: 'Add Product',
          key: 'addProduct',
          url: '/add/product',
        }
      ],
    },
    {
      title: 'Customers',
      key: 'customers',
      icon: 'fe fe-hard-drive',
      children: [
        {
          title: 'Customers',
          key: 'customersList',
          url: '/customers'
        }
      ],
    },
    {
      category: true,
      title: 'SETTINGS',
    },
    {
      title: 'Profile',
      key: 'profile',
      icon: 'fe fe-bookmark',
      url: '/settings/profile',
    }
  ]
}
