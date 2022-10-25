import React from 'react'

const Dashboard = React.lazy(() => import('../Pages/dashboard/Dashboard'))

////SetUp 
const ValidationTypePage = React.lazy(() => import('../Pages/Setups/ValidationTypePage'))
const CityPage =React.lazy(()=>import('../Pages/Setups/CityPage'))
const CountryPage =React.lazy(()=>import('../Pages/Setups/CountryPage'))
const ProviderPage =React.lazy(()=>import('../Pages/Setups/ProviderPage'))
const AdminPage=React.lazy(()=>import("../Pages/UsersManagment/AdminPage"))
const UserPage=React.lazy(()=>import("../Pages/UsersManagment/UserPage"))
const RequestPage=React.lazy(()=>import("../Pages/WalletManagement/Requests"))
const CasePage=React.lazy(()=>import("../Pages/DonationManagment/cases"))
const ViewCasePage=React.lazy(()=>import("../Pages/DonationManagment/cases/viewCasePage"))

const SuccessStoryPage=React.lazy(()=>import("../Pages/DonationManagment/success_stories"))
const ViewSuccessStoryPage=React.lazy(()=>import("../Pages/DonationManagment/success_stories/viewSuccessStoryPage"))


const RelationPage =React.lazy(()=>import('../Pages/Setups/RelationPage/Index'))

const NotificationPage =React.lazy(()=>import('../Pages/NotificationManagment/index'))
const ViewUserDetail=React.lazy(()=>import("../Pages/UsersManagment/UserPage/UserDetailPage"))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/', name: 'Dashboard', element: Dashboard },


  { path: '/Donation/case', name: 'cases', element: CasePage },
  { path: '/Donation/case/view', name: 'cases', element: ViewCasePage },


  { path: '/Donation/success-stories', name: 'success_stories', element: SuccessStoryPage },
  { path: '/Donation/success-stories/view', name: 'success_stories', element: ViewSuccessStoryPage },

  { path: '/UsersManagment/user', name: 'users', element: UserPage },
  { path: '/UsersManagment/user/view', name: 'users', element: ViewUserDetail },
  { path: '/UsersManagment/admin', name: 'admins', element: AdminPage },



  { path: '/WalletManagement/request', name: 'requests', element: RequestPage },




  

  ///SetUp////////////////
  { path: '/setup/validationtype', name: 'ValidationTypes', element: ValidationTypePage },
  { path: '/setup/city', name: 'cities', element: CityPage },
  { path: '/setup/country', name: 'countries', element: CountryPage },
  { path: '/setup/provider', name: 'providers', element: ProviderPage },
  { path: '/setup/relation', name: 'relations', element: RelationPage },


  { path: '/NotificationManagement/push_notifications', name: 'push_notifications', element: NotificationPage },
]

export default routes
