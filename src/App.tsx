import { Layout } from 'antd'

import { ErrorPage } from '@app/pages/shared/ErrorPage'
import { Preloader } from '@app/shared/molecules/Preloader'

import { useRefresh } from './useRefresh'
import { AppRouting } from './AppRouting'

import './App.scss'

const { Content } = Layout


const App = () => {
  const { isError, isLoading } = useRefresh()

  if (isLoading) {
    return <Preloader />
  }

  return (
    <Layout className="app">
      <Content>
        {isError ? <ErrorPage /> : <AppRouting />}
      </Content>
    </Layout>
  )
}

export default App
