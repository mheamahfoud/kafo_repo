import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilLanguage, cilList, cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown, AppHeaderLanguage } from './header/index'
import { logo } from '../assets/brand/logo'
import { useTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { globalSelector } from '../redux/features/global_slice';
import { setSidebarShow } from '../redux/features/global_slice'
const useStylesGlobal = makeStyles({
  '@global': {
    '.language_style': {
      margin: 'auto',
    },

  },
});
const AppHeader = () => {
  useStylesGlobal();
  const dispatch = useDispatch()
  const { lang ,sidebarShow} = useSelector(globalSelector)
  const { t } = useTranslation();
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(setSidebarShow(!sidebarShow))}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/#" component={NavLink}>
              {t('dashboard')}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#/UsersManagment/user"> {t('users')}</CNavLink>
          </CNavItem>
          {/* <CNavItem>
            <CNavLink href="#"> {t('setting')}</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem >
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem margin='auto' className='language_style'>
            <AppHeaderLanguage />
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
