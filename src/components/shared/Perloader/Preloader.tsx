import { Spin } from 'antd'
import './Preloader.scss'

export const Preloader = () => (
  <div className="preloader">
    <Spin size="large" />
  </div>
)
