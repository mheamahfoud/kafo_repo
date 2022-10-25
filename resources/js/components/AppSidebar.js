import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CAvatar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from '../assets/brand/logo-negative'

import { sygnet } from '../assets/brand/sygnet'
import logoKafo from '../assets/brand/kafo_icon.svg'


import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { globalSelector } from '../redux/features/global_slice';
import { setSideHide, setSidebarShow } from '../redux/features/global_slice'
// sidebar nav config
import navigation from '../Routes/_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()

  const { sidebarShow ,sideHide} = useSelector(globalSelector)

  return (
    <CSidebar

      position="fixed"
      unfoldable={false}
      style={{ overflowX: 'hidden', width: '250px', }}
      visible={sidebarShow}
      onHide={() => { dispatch(setSideHide(true)) }}
      onShow={() => { dispatch(setSideHide(false)) }}
      onVisibleChange={(visible) => {
        dispatch(setSidebarShow(visible))
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/" >
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        <CAvatar src={logoKafo} size="md" height={35} />
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav style={{ overflowX: 'auto', overflowY: 'auto' }}>
        <SimpleBar >
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
