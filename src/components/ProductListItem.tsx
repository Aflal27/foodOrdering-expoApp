import { StyleSheet, Image, Text, View, Pressable } from 'react-native'
import Colors from '@/constants/Colors'
import { Tables } from '@/types'
import { Link, useSegments } from 'expo-router'
import { defaultImage } from '@/constants/Images'
import RemoteImage from './RemoteImage'

type ProductListItemProps = {
  product: Tables<'products'>
}

export const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments()

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultImage}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.title}>{product?.name}</Text>
        <Text style={styles.price}>${product?.price.toFixed(2)}</Text>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    flex: 1,
    maxWidth: '50%',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
})
