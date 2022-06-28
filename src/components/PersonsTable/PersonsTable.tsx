import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Table, Tag } from 'antd'
import classNames from 'classnames'
import { PersonsThunk } from '@slices/personsSlice/thunk'
import { useAppDispatch } from '@app/slices'
import { useSelector } from 'react-redux'
import { getPersons } from '@slices/personsSlice/selectors'
import { getPersonsColumns } from './helpers/getPersonsColumns'
import { actions as personsActions } from '@slices/personsSlice/actions'
import { Person } from '@models/Person'
import { russianLabel } from '@shared/helpers/russianLabel'
import { PersonTableActions } from './PersonTableActions'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { SexEnum } from '@enums/SexEnum'
import { appUrls } from '@shared/appUrls'
import './PersonsTable.scss'

type RowPopupStateType = {
  _id: string
  top: `${number}px`
  left: `${number}px`
  display: 'block' | 'none'
}


export const PersonsTable = () => {
  /* hooks */
  const dispatch = useAppDispatch()
  const { persons, loading, filters } = useSelector(getPersons)
  const navigate = useNavigate()

  /* state */
  const [popupState, setPopupState] = useState<RowPopupStateType>({
    _id: '',
    left: '0px',
    top: '0px',
    display: 'none',
  })

  const [sexFilter, setSexFilter] = useState<null | SexEnum>(null)

  /* handlers */
  const onClickOutside = () => {
    if (popupState.display === 'none') {
      return
    }
    setPopupState((state) => ({
      ...state,
      display: 'none',
    }))
  }

  const clearFilter = (key: string) => {
    dispatch(personsActions.clearFilter({
      dataIndex: key as keyof Person,
    }))
  }

  const clearAllFilters = () => {
    setSexFilter(null)
    dispatch(personsActions.clearAllFilters())
  }

  const onOnlyMenChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSexFilter(SexEnum.M)
      return
    }
    setSexFilter(null)
  }

  const onOnlyWomanChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSexFilter(SexEnum.F)
      return
    }
    setSexFilter(null)
  }

  /* effects */
  useEffect(() => {
    window.addEventListener('click', onClickOutside)
    return () => {
      window.removeEventListener('click', onClickOutside)
    }
  }, [popupState.display])

  useEffect(() => {
    dispatch(PersonsThunk.update())
  }, [])

  const selectedFilters: [string, string[]][] = []

  Object.entries(filters).map((item) => {
    if (item[1].length) {
      selectedFilters.push(item)
    }
  })

  return (
    <div className="persons-table">
      <div className="persons-table__filters">
        {selectedFilters.map((item) => (
          <Tag
            key={item[0]}
            closable
            onClose={() => clearFilter(item[0])}
            color="blue"
          >
            <b>{russianLabel[item[0]]}: </b>{item[1]}
          </Tag>
        ))}
        <Button
          className={classNames('persons-table__clear-filters', {
            'invisible': !selectedFilters.length,
          })}
          type="link"
          onClick={clearAllFilters}
        >
          Сбросить все фильтры
        </Button>
        <div className="persons-table__sex-filter">
          <Checkbox onChange={onOnlyMenChange} checked={sexFilter === SexEnum.M}>
            Только мужчины
          </Checkbox>
        </div>
        <div>
          <Checkbox onChange={onOnlyWomanChange} checked={sexFilter === SexEnum.F}>
            Только женщины
          </Checkbox>
        </div>
      </div>
      <Table
        columns={getPersonsColumns(filters)}
        dataSource={sexFilter === null ? persons : persons.filter((p) => p.sex === sexFilter)}
        loading={loading}
        rowKey="_id"
        onRow={(record) => ({
          onContextMenu: (event) => {
            event.preventDefault()
            setPopupState({
              _id: record._id,
              left: `${event.clientX}px`,
              top: `${event.clientY}px`,
              display: 'block',
            })
          },
          onDoubleClick: () => {
            navigate(`${appUrls.person}/${record._id}`)
          },
        })}
      />
      <PersonTableActions popup={{ ...popupState }} />
    </div>
  )
}
