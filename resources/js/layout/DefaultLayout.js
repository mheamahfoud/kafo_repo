import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { globalSelector } from '../redux/features/global_slice';

const DefaultLayout = () => {
  const {sideHide} = useSelector(globalSelector)
  const useStylesGlobal = makeStyles({
    '@global': {
      'body': {
      },
      '[dir=rtl] .sidebar-nav .nav-group-items .nav-link': {
        paddingRight: ' 5rem'
      },
      // '[dir=rtl] [type=number]': {
      //   direction: 'rtl'
      // },
      '& .MuiDataGrid-columnHeadersInner': {
        color: '#ffff'
      },
      '.language_style': {
        margin: 'auto',
      },
      'html:not([dir=rtl]) .wrapper': {
        paddingLeft: sideHide ? 0 : '15rem'
      },
      '*[dir=rtl] .wrapper': {
        paddingRight: sideHide ? 0 : '15rem',

      },

      '*[dir=rtl] .MuiInputLabel-root': {
        left: 'auto'

      },

      'html:not([dir=rtl]) .MuiFormHelperText-root': {
        marginRight: 'auto'
      },

      '.image_dataTable': {
        //  background: "url('path/to/image') no-repeat center center /cover"
      },
      'html:not([dir=ltr]) .MuiButton-startIcon': {
        display: 'inherit',
        marginLeft: '8px',
        marginRight: '- 2px'
      },

      'html:not([dir=ltr]) .MuiFormHelperText-root': {
        marginLeft: 'auto'
      },





      // '*[dir=rtl]  .MuiFormLabel-filled css-1c2i806-MuiFormLabel-root-MuiInputLabel-root':{
      // }
    },
  });
  useStylesGlobal();
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout
