import { Link } from 'react-router-dom'
import { Result } from 'antd'

import { ERRORS } from '@shared/constants'
import { appUrls } from '@shared/appUrls'

export const Page500 = () => (
  <Result
    status="500"
    title={ERRORS.somethingWentWrong}
    subTitle="Повторите позднее."
    extra={<Link to={appUrls.index}>На главную</Link>}
  />
)
