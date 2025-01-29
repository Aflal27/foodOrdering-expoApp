import { View, Text, FlatList } from 'react-native'
import { useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'

const CartScreen = () => {
  const { items, total, checkout } = useCart()
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 18 }}>
        ${`${total.toFixed(2)}`}
      </Text>
      <Button onPress={checkout} text='Checkout' />
    </View>
  )
}

export default CartScreen
