// hooks/useNomenclature.ts
import { useQuery } from '@tanstack/react-query'
import { getApi } from '@/lib/moysklad'

export const useNomenclature = (token: string, search?: string) => {
    const api = getApi(token)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['nomenclature', token, search],
        queryFn: () => api.getNomenclature(search ? { name: search } : undefined),
        enabled: !!token,
        staleTime: 1000 * 60 * 5,  // 5 минут кэш — товары меняются редко
    })

    return {
        nomenclature: data?.result ?? [],
        isLoading,
        isError,
    }
}