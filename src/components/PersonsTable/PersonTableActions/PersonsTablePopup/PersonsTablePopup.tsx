import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Text from 'antd/es/typography/Text'
import './PersonsTablePopup.scss'


export interface IPersonsTablePopupProps {
  _id: string
  setDeletingId: (_id: string | null) => void
  setEditingId: (_id: string | null) => void
  top: `${number}px`
  left: `${number}px`
  display: 'none' | 'block'
}

export const PersonsTablePopup = ({ _id, setDeletingId, setEditingId, ...props }: IPersonsTablePopupProps) => {
  const onDelete = () => {
    setDeletingId(_id)
  }

  const onEdit = () => {
    setEditingId(_id)
  }

  return (
    <ul className="persons-table-popup" style={{ ...props }}>
      <li onClick={onEdit}>
        <Text type="secondary" className="persons-table-popup__icon">
          <EditOutlined />
        </Text>
        Редактировать
      </li>
      <li onClick={onDelete}>
        <Text type="danger" className="persons-table-popup__icon">
          <DeleteOutlined />
        </Text>
        Удалить
      </li>
    </ul>
  )
}
