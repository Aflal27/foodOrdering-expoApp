import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { Link, Redirect } from 'expo-router'
import { useAuth } from '../providers/AuthProvider'
import { supabase } from '@/lib/superbase'

const index = () => {
  const { session, loading, isAdmin, profile } = useAuth()

  if (loading) {
    return <ActivityIndicator />
  }
  if (!session) {
    return <Redirect href={'/sign-in'} />
  }

  if (profile?.qurop === 'USER') {
    return <Redirect href={'/(user)'} />
  }
  if (profile?.qurop === 'ADMIN') {
    return <Redirect href={'/(admin)'} />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text='User' />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text='Admin' />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text='Sign out' />
    </View>
  )
}

export default index
