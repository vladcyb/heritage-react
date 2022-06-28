import { Button, Input } from 'antd'
import { useState } from 'react'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { SearchOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@app/slices'
import { actions as personsActions } from '@slices/personsSlice/actions'
import { Person } from '@models/Person'
import './SearchFilterDropdown.scss'

interface ISearchFilterDropdownProps extends Pick<FilterDropdownProps, 'confirm'> {
  dataIndex: string
}

export const SearchFilterDropdown = ({ confirm, dataIndex }: ISearchFilterDropdownProps) => {
  const [value, setValue] = useState<string[]>([])
  const dispatch = useAppDispatch()


  const handleConfirm = () => {
    dispatch(personsActions.setFilter({
      value,
      dataIndex: dataIndex as keyof Person,
    }))
    confirm()
  }

  return (
    <div className="search-filter-dropdown">
      <Input
        placeholder="Введите значение"
        value={value}
        onChange={e => {
          setValue([e.target.value])
        }}
        onPressEnter={handleConfirm}
      />
      <Button
        type="primary"
        onClick={handleConfirm}
        icon={<SearchOutlined />}
        size="small"
      >
        Поиск
      </Button>
    </div>
  )
}
