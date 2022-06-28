import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useReducer } from 'react'
import PersonService from '@services/PersonService'
import { Avatar, Button, Card, Col, Row } from 'antd'
import { Preloader } from '@components/shared/Perloader'
import { UserOutlined } from '@ant-design/icons'
import { layout } from '@shared/constants'
import { ResponseStatusEnum } from '@enums/ResponseStatusEnum'
import { Page500 } from '@pages/shared/Page500'
import { Page404 } from '@pages/shared/Page404'
import { renderDataItem } from '@shared/helpers/renderDataItem'
import { appUrls } from '@shared/appUrls'
import { SexEnum } from '@enums/SexEnum'
import { PersonReducer, PersonReducerActions } from '@shared/reducers/PersonReducer'
import './PersonPage.scss'


export const PersonPage = () => {
  const params = useParams()
  const [state, dispatch] = useReducer(PersonReducer, {
    status: ResponseStatusEnum.StatusLoading,
  })

  const navigate = useNavigate()

  useEffect(() => {
    PersonService.get(params.id as string)
      .then((res) => {
        if (res.data.ok) {
          dispatch(PersonReducerActions.actionData(res.data.result))
        }
      })
      .catch((e) => {
        if (e.response.status === 404) {
          dispatch(PersonReducerActions.action404())
          return
        }
        if (e.response.status === 500) {
          dispatch(PersonReducerActions.action500())
        }
      })
  }, [])

  if (state.status === ResponseStatusEnum.StatusLoading) {
    return <Preloader />
  }


  if (state.status === ResponseStatusEnum.Status404) {
    return <Page404 />
  }

  if (state.status !== ResponseStatusEnum.StatusOk) {
    return <Page500 />
  }

  const { data } = state
  const mother = data.nearest?.mother
  const father = data.nearest?.father

  return (
    <div className="person-page">
      <Card title="Карточка">
        <Row>
          <Col>
            <Row gutter={{ ...layout.standardGutter }}>
              <Col>
                <Avatar shape="square" size={200} icon={<UserOutlined />} />
              </Col>
              <Col>
                <dl>
                  <dt>Фамилия</dt>
                  <dd>{renderDataItem(data.surname)}</dd>
                </dl>
                <dl>
                  <dt>Имя</dt>
                  <dd>{renderDataItem(data.name)}</dd>
                </dl>
                <dl>
                  <dt>Отчество</dt>
                  <dd>{renderDataItem(data.patronymic)}</dd>
                </dl>
              </Col>
              <Col>
                <dl>
                  <dt>Дата рождения</dt>
                  <dd>{renderDataItem(data.dateOfBirth)}</dd>
                </dl>
                <dl>
                  <dt>Мать</dt>
                  <dd>
                    {mother ? (
                      <a href={`${appUrls.person}/${mother._id}`}>
                        {renderDataItem(
                          `${mother.surname || ''} ${mother.name || ''} ${mother.patronymic || ''}`,
                        )}
                      </a>
                    ) : renderDataItem()}
                  </dd>
                </dl>
                <dl>
                  <dt>Отец</dt>
                  <dd>
                    {father ? (
                      <a href={`${appUrls.person}/${father._id}`}>
                        {renderDataItem(
                          `${father.surname || ''} ${father.name || ''} ${father.patronymic || ''}`,
                        )}
                      </a>
                    ) : renderDataItem()}
                  </dd>
                </dl>
              </Col>
              <Col>
                <dl>
                  <dt>Пол</dt>
                  <dd>
                    {data.sex === SexEnum.M ? 'М' : 'Ж'}
                  </dd>
                </dl>
              </Col>
            </Row>
          </Col>
          <Col />
        </Row>
      </Card>
      <Button className="person-page__back-btn" onClick={() => navigate(appUrls.index)}>
        Назад
      </Button>
    </div>
  )
}
