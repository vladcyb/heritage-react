import { useState } from 'react'
import { Button } from 'antd'
import { AddPersonModal } from './AddPersonModal'
import { DeletePersonModal } from './DeletePersonModal'
import { PersonsTablePopup } from './PersonsTablePopup'
import { EditPersonModal } from './EditPersonModal'

interface IPersonTableActionsProps {
  popup: {
    _id: string
    top: `${number}px`
    left: `${number}px`
    display: 'block' | 'none'
  }
}

export const PersonTableActions = ({ popup }: IPersonTableActionsProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  return (
    <>
      <Button
        className="persons-table__add"
        onClick={() => { setIsCreating(true) }}
      >
        Добавить
      </Button>
      <AddPersonModal
        visible={isCreating}
        onClose={() => {
          setIsCreating(false) }
        }
      />
      <DeletePersonModal
        id={deletingId}
        onClose={() => {
          setDeletingId(null)
        }}
      />
      <EditPersonModal
        id={editingId}
        onClose={() => {
          setEditingId(null)
        }}
      />
      <PersonsTablePopup
        setDeletingId={setDeletingId}
        setEditingId={setEditingId}
        {...popup}
      />
    </>
  )
}
