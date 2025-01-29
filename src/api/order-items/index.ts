import { supabase } from '@/lib/superbase'
import { InsertTables } from '@/types'
import { useMutation } from '@tanstack/react-query'

export const useInsertOrderItems = () => {
  return useMutation({
    mutationFn: async (items: InsertTables<'order_items'>[]) => {
      const { data: newOrder, error } = await supabase
        .from('order_items')
        .insert(items)
        .select()

      if (error) {
        throw new Error(error.message)
      }
      return newOrder
    },
  })
}
