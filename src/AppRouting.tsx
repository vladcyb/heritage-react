import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { appUrls } from '@shared/appUrls'

import { NotFound } from './pages/shared/NotFound'

const RegisterPage = lazy(() => import('@pages/RegisterPage'))
const PersonPage = lazy(() => import('@pages/PersonPage'))
const IndexPage = lazy(() => import('@pages/IndexPage'))
const LoginPage = lazy(() => import('@pages/LoginPage'))


export const AppRouting = () => (
  <Suspense>
    <Routes>
      <Route path={appUrls.index} element={<IndexPage />} />
      <Route path={appUrls.login} element={<LoginPage />} />
      <Route path={appUrls.register} element={<RegisterPage />} />
      <Route path={appUrls.person}>
        <Route path=":id" element={<PersonPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
)
