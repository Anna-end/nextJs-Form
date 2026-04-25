import { useQuery } from '@tanstack/react-query'
import { getApi } from '@/lib/moysklad'

export const useCustomer = (token: string, phone: string) => {
    const api = getApi(token)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['contragent', token, phone],
        queryFn: () => api.getContragents({ phone }),
        enabled: !!token && phone.length >= 10,  // минимум 10 цифр
        staleTime: 1000 * 30,  // 30 сек кэш — не спамить при каждом вводе
    })

    return {
        customer: data ?? null,
        isLoading,
        isError,
        error,
    }
}