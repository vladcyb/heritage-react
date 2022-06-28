import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Form, Input, message } from 'antd'
import { useSelector } from 'react-redux'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { appUrls } from '@shared/appUrls'
import { useAppDispatch } from '@app/slices'
import { getUser } from '@slices/userSlice/selectors'
import { UserThunk } from '@slices/userSlice/thunk'
import './LoginForm.scss'


export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const { loading } = useSelector(getUser)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onFinish = async (values) => {
    const response = await dispatch(UserThunk.login(values))

    if (response.meta.requestStatus === 'rejected') {
      if (response.payload) {
        setError(response.payload as string)
      }
      return
    }
    message.success('Вход выполнен.', 2)
    navigate(appUrls.index, { replace: true })
  }

  return (
    <Card className="login-form">
      <Form
        name="login"
        onFinish={onFinish}
        onChange={() => {
          setError('')
        }}
        fields={[
          {
            name: 'login',
            errors: error ? [error] : [],
          },
        ]}
      >
        <Form.Item
          name="login"
          rules={[{ required: true, message: 'Введите логин!' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Логин"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item noStyle>
          <Button type="primary" htmlType="submit" block disabled={loading}>
            {loading ? 'Загрузка...' : 'Войти'}
          </Button>
        </Form.Item>
      </Form>
      <div className="login-form__register">
        <Link to={appUrls.register}>Регистрация</Link>
      </div>
    </Card>
  )
}
