import { Button, Card, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { getUser } from '@slices/userSlice/selectors'
import { appUrls } from '@shared/appUrls'
import './RegisterForm.scss'


export const RegisterForm = () => {
  const { loading } = useSelector(getUser)

  const onFinish = (values) => {
    console.log(values)
  }

  return (
    <Card className="register-form">
      <Form
        name="register"
        onFinish={onFinish}
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
        <Form.Item
          name="password2"
          rules={[
            {
              required: true,
              message: 'Повторите пароль!',
            },
            ({ getFieldsValue }) => ({
              message: 'Пароли не совпадают',
              validator(_ , val) {
                return new Promise((resolve, reject) => {
                  if (getFieldsValue().password !== val) {
                    reject()
                    return
                  }
                  resolve('')
                })
              },
            }),
          ]}
          validateFirst
          dependencies={['password']}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Повторите пароль"
          />
        </Form.Item>
        <Form.Item noStyle>
          <Button type="primary" htmlType="submit" block disabled={loading}>
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </Button>
        </Form.Item>
      </Form>
      <div className="register-form__login">
        <Link to={appUrls.login}>Войти</Link>
      </div>
    </Card>
  )
}
