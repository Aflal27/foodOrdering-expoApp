import { supabase } from '@/lib/superbase'
import { useAuth } from '@/providers/AuthProvider'
import { InsertTables, UpdateTables } from '@/types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useAdminOrdersList = ({ archived = false }) => {
  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']
  return useQuery({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .in('status', statuses)
        .order('created_at', { ascending: false })
      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  })
}

export const useMyOrderList = () => {
  const { session } = useAuth()
  const id = session?.user?.id

  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      if (!id) return null
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false })
      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  })
}

export const useOrderDetail = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('id', id)
        .single()

      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  })
}

export const useInsertOrder = () => {
  const queryClient = useQueryClient()
  const { session } = useAuth()
  const id = session?.user?.id

  return useMutation({
    mutationFn: async (data: InsertTables<'orders'>) => {
      const { data: newOrder, error } = await supabase
        .from('orders')
        .insert({
          ...data,
          user_id: id,
        })
        .select()
        .single()
      if (error) {
        throw new Error(error.message)
      }
      return newOrder
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      updateFeilds,
    }: {
      id: number
      updateFeilds: UpdateTables<'orders'>
    }) => {
      const { data: updatedOrder, error } = await supabase
        .from('orders')
        .update(updateFeilds)
        .eq('id', id)
        .select()
        .single()
      if (error) {
        throw new Error(error.message)
      }
      return updatedOrder
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ['orders'] })
      await queryClient.invalidateQueries({ queryKey: ['orders', id] })
    },
  })
}
