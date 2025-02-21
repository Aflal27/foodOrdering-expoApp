import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderItemListItem from '../../../components/OrderItemListItem'
import OrderListItem from '../../../components/OrderListItem'
import { useOrderDetail } from '@/api/orders'
import { useUpdateOrderSubscription } from '@/api/orders/subscription'

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  useUpdateOrderSubscription(id)

  const { data: order, error, isLoading } = useOrderDetail(id)

  if (error) {
    return <Text>Failed to fetch order</Text>
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (!order) {
    return <Text>Order not found!</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      {/* <OrderListItem order={order} /> */}

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={() => <OrderListItem order={order} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
})

export default OrderDetailScreen
