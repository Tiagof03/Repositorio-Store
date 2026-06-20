import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/features/categorias/services/categoriesService'
import { queryKeys } from '@/lib/queryKeys'

export const useCategories = () =>
  useQuery({
    queryKey: [...queryKeys.categories],
    queryFn: getCategories,
  })
