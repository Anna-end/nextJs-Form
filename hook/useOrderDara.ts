import { useQuery } from '@tanstack/react-query'
import { getApi } from '@/lib/moysklad'

export const useOrderData = (token: string) => {
    const api = getApi(token)

    const warehouses = useQuery({
        queryKey: ['warehouses', token],
        queryFn: () => api.getWarehouses(),
        enabled: !!token,
    })

    const payboxes = useQuery({
        queryKey: ['payboxes', token],
        queryFn: () => api.getPayboxes(),
        enabled: !!token,
    })

    const organizations = useQuery({
        queryKey: ['organizations', token],
        queryFn: () => api.getOrganizations(),
        enabled: !!token,
    })

    const priceTypes = useQuery({
        queryKey: ['priceTypes', token],
        queryFn: () => api.getPriceType(),
        enabled: !!token,
    })

    const isLoading = 
        warehouses.isLoading || 
        payboxes.isLoading || 
        organizations.isLoading || 
        priceTypes.isLoading

    const isError = 
        warehouses.isError || 
        payboxes.isError || 
        organizations.isError || 
        priceTypes.isError

    return {
        warehouses: warehouses.data?.result ?? [],
        payboxes: payboxes.data?.result ?? [],
        organizations: organizations.data?.result ?? [],
        priceTypes: priceTypes.data?.result ?? [],
        isLoading,
        isError,
    }
}