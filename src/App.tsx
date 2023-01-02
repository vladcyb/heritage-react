import { Layout } from 'antd'

import { Page500 } from '@pages/shared/Page500'
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
        {isError ? <Page500 /> : <AppRouting />}
      </Content>
    </Layout>
  )
}

export default App
