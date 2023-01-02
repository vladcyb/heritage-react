import { useEffect } from 'react'
import { FormProps, Modal } from 'antd'
import moment, { isMoment } from 'moment'
import { useSelector } from 'react-redux'
import { useForm } from 'antd/es/form/Form'

import { PersonModalForm } from '@components/PersonsTable/PersonTableActions/PersonModalForm'
import { getPersonsLoading } from '@slices/personsSlice/selectors'
import { PersonsThunk } from '@slices/personsSlice/thunk'
import { useAppDispatch } from '@app/slices'
import PersonService from '@services/PersonService'


interface IEditPersonModalProps {
  id: string | null
  onClose: () => void
}

const layout: FormProps = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

export const EditPersonModal = ({ id, onClose }: IEditPersonModalProps) => {
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const idUpdating = useSelector(getPersonsLoading)


  useEffect(() => {
    if (id) {
      PersonService.get(id)
        .then((res) => {
          if (res.data && res.data.ok) {
            const { result } = res.data
            form.setFieldsValue({
              name: result.name.trim(),
              surname: result.surname.trim(),
              patronymic: result.patronymic.trim(),
              dateOfBirth: result.dateOfBirth ? moment(result.dateOfBirth) : null,
              sex: result.sex,
            })
          }
        })
    }
    return () => {
      form.setFieldsValue({
        name: '',
        surname: '',
        patronymic: '',
        dateOfBirth: null,
        sex: 'M',
      })
    }
  }, [id])


  const onOk = async () => {
    const data = {
      _id: id,
      ...form.getFieldsValue(),
    }
    if (isMoment(data.dateOfBirth)) {
      data.dateOfBirth = data.dateOfBirth.format('YYYY-MM-DD')
    } else {
      delete data.dateOfBirth
    }
    await dispatch(PersonsThunk.edit(data))
    onClose()
  }

  return (
    <Modal
      title="Редактировать человека"
      visible={!!id}
      transitionName=""
      centered
      onCancel={onClose}
      okText="Сохранить"
      cancelText="Отмена"
      confirmLoading={idUpdating}
      onOk={onOk}
    >
      <PersonModalForm form={form} {...layout} />
    </Modal>
  )
}
