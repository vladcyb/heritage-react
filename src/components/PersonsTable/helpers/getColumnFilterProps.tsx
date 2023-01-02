import { ColumnType } from 'antd/lib/table/interface'
import { SearchOutlined } from '@ant-design/icons'

import { Person } from '@models/Person'
import { KeysMatching } from '@shared/helpers/KeysMatching'
import { renderDataItem } from '@shared/helpers/renderDataItem'
import { SearchFilterDropdown } from '@components/shared/FilterDropdown'


export const getColumnFilterProps = (dataIndex: keyof Person): ColumnType<Person> => ({
  render: renderDataItem,
  filterDropdown: ({ confirm, visible }) => {
    if (!visible) {
      return null
    }
    return (
      <SearchFilterDropdown
        confirm={confirm}
        dataIndex={dataIndex}
      />
    )
  },
  filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value, record: Pick<Person, KeysMatching<Person, string>>) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase())
      : '',
})
