import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalculator,
  cilPeople,
  cilSpeedometer,
  cilMoney,
  cilList,
  cilUser,
  cilSettings,
  cilActionUndo

} from '@coreui/icons'

import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const _nav = [
  {
    component: CNavItem,
    name: 'dashboard',
    label: 'Dashboard',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'new',
    // },
  },
  {
    component: CNavGroup,
    name: 'Donation',
    label: 'donation_managment',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'cases',
        label: 'cases',
        style: { paddingLeft: '5rem' },
        to: '/Donation/case',
      },

      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'successStrories',
        label: 'success_stories',
        style: { paddingLeft: '5rem' },
        to: '/Donation/success-stories',
      },

    ],
  },

  {
    component: CNavGroup,
    name: 'UsersManagment',
    label: 'users_managment',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'Users',
        label: 'users',
        style: { paddingLeft: '5rem' },
        to: '/UsersManagment/user',
      },

      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'Admins',
        label: 'admins',
        style: { paddingLeft: '5rem' },
        to: '/UsersManagment/admin',
      },





    ],
  },
  {
    component: CNavGroup,
    name: 'WalletManagement',
    label: 'wallet_managment',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'requests',
        label: 'requests',
        style: { paddingLeft: '5rem' },
        to: '/WalletManagement/request',
      },
    ],
  },
  ////SetUp 
  {
    component: CNavGroup,
    name: 'SetUps',
    label: 'SetUps',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'Validation Types',
        label: 'ValidationTypes',
        style: { paddingLeft: '5rem' },
        to: '/setup/validationtype',
      },

      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'Cites',
        label: 'cities',
        style: { paddingLeft: '5rem' },
        to: '/setup/city',
      },

      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'Country',
        label: 'countries',
        style: { paddingLeft: '5rem' },
        to: '/setup/country',
      },

      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'Provider',
        label: 'providers',
        style: { paddingLeft: '5rem' },
        to: '/setup/provider',
      },
      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'Relations',
        label: 'relations',
        style: { paddingLeft: '5rem' },
        to: '/setup/relation',
      },


      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'Terms&Conditions',
        label: 'terms&conditions',
        style: { paddingLeft: '5rem' },
        to: '/setup/term&condition',
      },

      
      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'faq',
        label: 'faq',
        style: { paddingLeft: '5rem' },
        to: '/setup/faq',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'NotificationManagement',
    label: 'notif_managment',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'notification',
        label: 'notifications',
        style: { paddingLeft: '5rem' },
        to: '/NotificationManagement/notifications',
      },
      {
        component: CNavItem,
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        name: 'notification',
        label: 'push_notifications',
        style: { paddingLeft: '5rem' },
        to: '/NotificationManagement/push_notifications',
      },

    ],
  },





  // // {
  // //   component: CNavTitle,
  // //   name: 'Theme',
  // // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // // {
  // //   component: CNavTitle,
  // //   name: 'Components',
  // // },
  // {
  //   component: CNavGroup,
  //   name: 'Base',
  //   to: '/base',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Accordion',
  //       to: '/base/accordion',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Breadcrumb',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Carousel',
  //       to: '/base/carousels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Collapse',
  //       to: '/base/collapses',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'List group',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Navs & Tabs',
  //       to: '/base/navs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Pagination',
  //       to: '/base/paginations',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Placeholders',
  //       to: '/base/placeholders',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Progress',
  //       to: '/base/progress',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Spinners',
  //       to: '/base/spinners',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // // {
  // //   component: CNavTitle,
  // //   name: 'Extras',
  // // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },







]

export default _nav
