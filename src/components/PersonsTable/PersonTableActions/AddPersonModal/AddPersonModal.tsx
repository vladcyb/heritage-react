import { FormProps, message, Modal } from 'antd'
import { useSelector } from 'react-redux'
import { isMoment } from 'moment'
import { useForm } from 'antd/es/form/Form'
import { useAppDispatch } from '@app/slices'
import { PersonsThunk } from '@slices/personsSlice/thunk'
import { getPersonsLoading } from '@slices/personsSlice/selectors'
import { ERRORS } from '@shared/constants'
import { PersonModalForm } from '@components/PersonsTable/PersonTableActions/PersonModalForm'

interface IAddPersonModalProps {
  visible: boolean
  onClose: () => void
}

const layout: FormProps = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

export const AddPersonModal = ({ visible, onClose }: IAddPersonModalProps) => {
  const [form] = useForm()
  const dispatch = useAppDispatch()
  const loading = useSelector(getPersonsLoading)

  const onAdd = async () => {
    const dateOfBirth = form.getFieldValue('dateOfBirth')
    const formValues = form.getFieldsValue()

    const data = {
      surname: formValues.surname.trim(),
      name: formValues.name.trim(),
      patronymic: formValues.patronymic.trim(),
      sex: formValues.sex,
      dateOfBirth: formValues.dateOfBirth,
    }

    if (isMoment(dateOfBirth)) {
      data.dateOfBirth = data.dateOfBirth.format('YYYY-MM-DD')
    } else {
      delete data.dateOfBirth
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
      visible={visible}
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
