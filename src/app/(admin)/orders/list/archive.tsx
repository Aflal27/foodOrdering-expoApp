import { StyleSheet, Text, View, FlatList } from 'react-native'
import orders from '@assets/data/orders'
import OrderItemListItem from '@/components/OrderListItem'

const index = () => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItemListItem order={item} />}
    />
  )
}

export default index

const styles = StyleSheet.create({})
