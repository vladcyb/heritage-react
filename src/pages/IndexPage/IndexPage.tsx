import Title from 'antd/es/typography/Title'

import { PersonsTable } from '@components/PersonsTable'


export const IndexPage = () => {
  return (
    <div className="index-page">
      <Title>
        Люди
      </Title>
      <PersonsTable />
    </div>
  )
}
