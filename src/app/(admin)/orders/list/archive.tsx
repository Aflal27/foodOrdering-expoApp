import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import OrderItemListItem from '@/components/OrderListItem'
import { useAdminOrdersList } from '@/api/orders'

const index = () => {
  const {
    data: orders,
    error,
    isLoading,
  } = useAdminOrdersList({ archived: true })

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch orders</Text>
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItemListItem order={item} />}
    />
  )
}

export default index

const styles = StyleSheet.create({})
