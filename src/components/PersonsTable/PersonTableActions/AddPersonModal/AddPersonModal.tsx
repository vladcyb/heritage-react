import { FormProps, message, Modal } from 'antd'
import { useSelector } from 'react-redux'
import { useForm } from 'antd/es/form/Form'

import { useAppDispatch } from '@app/slices'
import { getPersonsLoading } from '@slices/personsSlice/selectors'
import { PersonModalForm } from '@components/PersonsTable/PersonTableActions/PersonModalForm'
import { SexEnum } from '@app/enums/SexEnum'
import { PersonsThunk } from '@app/slices/personsSlice/thunk'
import { ERRORS } from '@app/shared/constants'

interface IAddPersonModalProps {
  open: boolean
  onClose: () => void
}

const layout: FormProps = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

type AddPersonModalFormType = {
  surname: string
  name: string
  patronymic: string
  sex: SexEnum
  dateOfBirth?: string
}

export const AddPersonModal = ({ open: visible, onClose }: IAddPersonModalProps) => {
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const loading = useSelector(getPersonsLoading)

  const onAdd = async () => {
    const dateOfBirth = form.getFieldValue('dateOfBirth')
    const formValues = form.getFieldsValue()

    const data: AddPersonModalFormType = {
      surname: formValues.surname.trim(),
      name: formValues.name.trim(),
      patronymic: formValues.patronymic.trim(),
      sex: formValues.sex,
    }

    if (dateOfBirth?.isValid?.()) {
      data.dateOfBirth = dateOfBirth.format('YYYY-MM-DD')
    }

    const result = await dispatch(PersonsThunk.create(data))
    if (result.meta.requestStatus === 'rejected') {
      message.error(ERRORS.somethingWentWrong)
      return
    }
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title="Добавить человека"
      open={visible}
      onCancel={onClose}
      transitionName=""
      centered
      okText="Добавить"
      cancelText="Отмена"
      onOk={onAdd}
      confirmLoading={loading}
    >
      <PersonModalForm form={form} {...layout} />
    </Modal>
  )
}
