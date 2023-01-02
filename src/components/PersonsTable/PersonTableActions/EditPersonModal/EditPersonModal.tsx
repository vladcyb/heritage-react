import { useEffect } from 'react'
import { FormProps, Modal } from 'antd'
import { useSelector } from 'react-redux'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'

import { PersonModalForm } from '@components/PersonsTable/PersonTableActions/PersonModalForm'
import { getAllPersons, getPersonsLoading } from '@slices/personsSlice/selectors'
import { PersonsThunk } from '@slices/personsSlice/thunk'
import { useAppDispatch } from '@app/slices'
import { SexEnum } from '@app/enums/SexEnum'


interface IEditPersonModalProps {
  id: string | null
  onClose: () => void
}

const layout: FormProps = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

type EditPersonModalFormType = {
  _id: string
  surname: string
  name: string
  patronymic: string
  sex: SexEnum
  dateOfBirth?: string
}

export const EditPersonModal = ({ id, onClose }: IEditPersonModalProps) => {
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const idUpdating = useSelector(getPersonsLoading)
  const persons = useSelector(getAllPersons)

  useEffect(() => {
    if (!id) {
      return
    }
    const person = persons.find(item => item._id === id)
    if (person) {
      form.setFieldsValue({
        name: person.name,
        surname: person.surname,
        patronymic: person.patronymic,
        dateOfBirth: person.dateOfBirth ? dayjs(person.dateOfBirth) : '',
        sex: person.sex,
      })
    }

    return () => {
      form.setFieldsValue({
        name: '',
        surname: '',
        patronymic: '',
        dateOfBirth: '',
        sex: SexEnum.M,
      })
    }
  }, [id])

  const onOk = async () => {
    if (!id) {
      return
    }
    const data: EditPersonModalFormType = {
      _id:id,
      name: form.getFieldValue('name').trim(),
      surname: form.getFieldValue('surname').trim(),
      patronymic: form.getFieldValue('patronymic').trim(),
      sex: form.getFieldValue('sex'),
    }
    const dateOfBirth = form?.getFieldValue('dateOfBirth')
    if (dateOfBirth?.isValid?.()) {
      data.dateOfBirth = dateOfBirth.format('YYYY-MM-DD')
    }
    await dispatch(PersonsThunk.edit(data))
    onClose()
  }

  return (
    <Modal
      title="Редактировать человека"
      open={!!id}
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
