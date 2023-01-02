import { DatePicker, Form, Input, Radio } from 'antd'
import { FormInstance } from 'antd/lib/form/hooks/useForm'
import { FormProps } from 'antd/es/form'

import { SexEnum } from '@enums/SexEnum'
import { Person } from '@models/Person'

interface IPersonModalFormProps extends FormProps {
  form: FormInstance<Partial<Person>>
}

const initialValues: Partial<Person> = {
  surname: '',
  name: '',
  patronymic: '',
  sex: SexEnum.M,
}

export const PersonModalForm = ({ form, ...props }: IPersonModalFormProps) => (
  <Form
    autoComplete="off"
    form={form}
    initialValues={initialValues}
    {...props}
  >
    <Form.Item name="surname" label="Фамилия" labelAlign="left">
      <Input />
    </Form.Item>
    <Form.Item name="name" label="Имя" labelAlign="left">
      <Input />
    </Form.Item>
    <Form.Item name="patronymic" label="Отчество" labelAlign="left">
      <Input />
    </Form.Item>
    <Form.Item name="sex" label="Пол" labelAlign="left">
      <Radio.Group>
        <Radio value={SexEnum.M}>Мужской</Radio>
        <Radio value={SexEnum.F}>Женский</Radio>
      </Radio.Group>
    </Form.Item>
    <label htmlFor="dateOfBirth">Дата рождения:</label>
    <Form.Item name="dateOfBirth">
      <DatePicker picker="date" placeholder='Выберите дату' />
    </Form.Item>
  </Form>
)
