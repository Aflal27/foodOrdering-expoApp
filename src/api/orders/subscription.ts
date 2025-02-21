import { useEffect } from 'react'
import { supabase } from '@/lib/superbase'
import { useQueryClient } from '@tanstack/react-query'
export const useInsertOrderSubscription = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const ordersSubscription = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['orders'] })
        }
      )
      .subscribe()

    return () => {
      ordersSubscription.unsubscribe()
    }
  }, [])
}

export const useUpdateOrderSubscription = (id: number) => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const ordersSubscription = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['orders', id] })
        }
      )
      .subscribe()

    return () => {
      ordersSubscription.unsubscribe()
    }
  }, [])
}
