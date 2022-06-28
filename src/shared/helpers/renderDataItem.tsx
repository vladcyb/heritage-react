import Text from 'antd/es/typography/Text'

export const renderDataItem = (value?: string) => {
  return value ? value : <Text type="secondary">(не указано)</Text>
}
