import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../Routes/routes'
function Loading() {
  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: '30%',
          left: '50%',
        }}
      >
        <div class="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
const AppContent = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default React.memo(AppContent)
