import { Layout } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { IndexPage, LoginPage } from './pages'
import { appUrls } from '@shared/appUrls'
import { useRefresh } from './useRefresh'
import { PersonPage } from '@pages/PersonPage'
import { Preloader } from '@components/shared/Perloader'
import { Page500 } from '@pages/shared/Page500'
import { RegisterPage } from '@pages/RegisterPage'
import './App.scss'

const { Content } = Layout

const App = () => {
  const { isError, isLoading } = useRefresh()

  if (isLoading) {
    return <Preloader />
  }

  if (isError) {
    return (
      <Layout className="app">
        <Content>
          <Page500 />
        </Content>
      </Layout>
    )
  }

  return (
    <Layout className="app">
      <Content>
        <Routes>
          <Route path={appUrls.index} element={<IndexPage />} />
          <Route path={appUrls.login} element={<LoginPage />} />
          <Route path={appUrls.register} element={<RegisterPage />} />
          <Route path={appUrls.person}>
            <Route path=":id" element={<PersonPage />} />
          </Route>
        </Routes>
      </Content>
    </Layout>
  )
}

export default App
