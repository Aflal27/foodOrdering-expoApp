import { ActivityIndicator, FlatList, View, Text } from 'react-native'

import { ProductListItem } from '@/components/ProductListItem'
import { useProductList } from '@/api/products'

export default function ManuScreen() {
  const { data: products, error, isLoading } = useProductList()
  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch products</Text>
  }
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  )
}
