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

const TermConditionPage =React.lazy(()=>import('../Pages/Setups/TermConditionPage/Index'))
const FAQPage =React.lazy(()=>import('../Pages/Setups/FAQPAge/Index'))

const CreateQuestionage =React.lazy(()=>import('../Pages/Setups/FAQPAge/CreateQuestionPage'))
const EditQuestionage =React.lazy(()=>import('../Pages/Setups/FAQPAge/EditQuestionPage'))

const NotificationPage =React.lazy(()=>import('../Pages/NotificationManagment/index'))
const PushNotificationPage =React.lazy(()=>import('../Pages/NotificationManagment/PushNotificationPage'))
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
  { path: '/setup/term&condition', name: 'terms&conditions', element: TermConditionPage },
  { path: '/setup/faq', name: 'faq', element: FAQPage },
  { path: '/setup/faq/create_question', name: 'create_question', element: CreateQuestionage },
  { path: '/setup/faq/edit_question', name: 'edit_question', element: EditQuestionage },
  
  { path: '/NotificationManagement/push_notifications', name: 'push_notifications', element: PushNotificationPage },
  { path: '/NotificationManagement/notifications', name: 'notifications', element: NotificationPage },

]

export default routes
