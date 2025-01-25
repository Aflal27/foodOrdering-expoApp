import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import { defaultImage as defaultPizzaImage } from '@/constants/Images'
import Button from '../../../components/Button'
import { useCart } from '../../../providers/CartProvider'
import { PizzaSize } from '../../../types'
// import { useProduct } from '../../../api/products';
import products from '../../../../assets/data/products'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useProduct } from '@/api/products'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const { addItem } = useCart()

  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: product, error, isLoading } = useProduct(id)

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch product</Text>
  }

  const addToCart = () => {
    if (!product) return
    addItem(product, selectedSize)
    router.push('/cart')
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create/?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='pencil'
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={styles.subtitle}>{product?.name}</Text>
      <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: '600',
    fontSize: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
})

export default ProductDetailsScreen
