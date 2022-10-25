import React from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../Routes/routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { mainColor } from '../config/constants';
const AppBreadcrumb = () => {
  const currentLocation = useLocation()

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    var state=location.state;
    location.pathname.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          label:state,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }
  const { t } = useTranslation();
  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2"  style={{color:mainColor}}>
      <CBreadcrumbItem href="#/"  style={{color:mainColor}}>{ t('home')}</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
          style={{color:mainColor}}
            {...(breadcrumb.active ? { active: true } : {   href: '#' +breadcrumb.pathname })}
            key={index}
          >
            { index==breadcrumbs.length-1  ?  breadcrumb.label != null ?  breadcrumb.label.name :  t(breadcrumb.name) : t(breadcrumb.name)}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
