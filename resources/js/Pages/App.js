import React, { useEffect, useState, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { notify } from '../api/common/error_msg';
import './scss/style.scss'
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { LinearProgress } from '@material-ui/core';
import '../services/i18n';
import { CheckAuth } from '../api/account/account';
import { setToken } from '../services/fireBase';
import { result } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('../layout/DefaultLayout'))


const Page404 = React.lazy(() => import('../Pages/pages/page404/Page404'))
const Page500 = React.lazy(() => import('../Pages/pages/page500/Page500'))
import * as Yup from 'yup';


function App() {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch()
  useEffect(() => {

    setToken();
    CheckAuth().then((result) => {
      if (result.success) {
        dispatch({ type: 'set', lang: result.data.lang })
        dispatch({ type: 'set', current_user: result.data.user })

        if (!result.data.user.is_active) {
          notify(t('user_not_active'))
          window.location.href = '/login';
        }
        require('../services/notifications/index');
        setLoading(false);
      }
      else {
        notify(result.error_description)
        window.location.href = '/login';
      }




    })
  }, [])


  ///yup
  Yup.setLocale({
    mixed: {
      required: t('required'),
    },
  });
  return (
    <Suspense fallback={loading}>
      <HashRouter>

        <SnackbarProvider maxSnack={1} preventDuplicate>


          {loading ? <Loading /> :

            <Routes >
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </Routes>}

        </SnackbarProvider>
        <ToastContainer position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />

      </HashRouter>

    </Suspense>
  )

}

export default App
function Loading() {
  const { t } = useTranslation();
  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: '30%',
          left: '45%',

        }}
      >
        <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">{t('loading_dot')}</span>
        </div>

        <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">{t('loading_dot')}</span>
        </div>
      </div>
    </div>
  );
}