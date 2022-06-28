import { Modal } from 'antd'
import { useSelector } from 'react-redux'
import { getAllPersons, getPersonsLoading } from '@slices/personsSlice/selectors'
import { PersonsThunk } from '@slices/personsSlice/thunk'
import { useAppDispatch } from '@app/slices'
import { renderDataItem } from '@shared/helpers/renderDataItem'
import './DeletePersonModal.scss'
import Text from 'antd/es/typography/Text'


interface IDeletePersonModalProps {
  id: string | null
  onClose: () => void
}

export const DeletePersonModal = ({ onClose, id }: IDeletePersonModalProps) => {
  const loading = useSelector(getPersonsLoading)
  const persons = useSelector(getAllPersons)
  const dispatch = useAppDispatch()

  const onDelete = async () => {
    if (!id) {
      return
    }
    await dispatch(PersonsThunk.deleteOne(id))
    onClose()
  }

  const renderBody = () => {
    const person = persons.find((item) => item._id === id)
    if (!person) {
      return null
    }

    return (
      <>
        <Text type="danger" style={{ fontWeight: 'bold' }}>
          Вы действительно хотите удалить человека?
        </Text>
        <div>
          Фамилия: <span className="delete-person-modal__value">{renderDataItem(person.surname)}</span>
        </div>
        <div>
          Имя: <span className="delete-person-modal__value">{renderDataItem(person.name)}</span>
        </div>
        <div>
          Отчество: <span className="delete-person-modal__value">{renderDataItem(person.patronymic)}</span>
        </div>
        <div>
          Дата рождения: <span className="delete-person-modal__value">{renderDataItem(person.dateOfBirth)}</span>
        </div>
      </>
    )
  }

  return (
    <Modal
      className="delete-person-modal"
      title="Удалить человека"
      visible={!!id}
      onCancel={onClose}
      onOk={onDelete}
      okButtonProps={{
        danger: true,
      }}
      okText="Удалить"
      cancelText="Отмена"
      transitionName=""
      centered
      confirmLoading={loading}
    >
      {renderBody()}
    </Modal>
  )
}
