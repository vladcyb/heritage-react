import { Link } from 'react-router-dom'
import { Result } from 'antd'
import { appUrls } from '@shared/appUrls'

export const Page404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="Страница не найдена."
    extra={<Link to={appUrls.index}>На главную</Link>}
  />
)
