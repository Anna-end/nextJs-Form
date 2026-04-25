import type { WarehousesResponse, 
            OrganizationsResponse, 
            PriceTypeResponse, 
            NomenclatureResponse,
            PayBoxesResponse,
            ContragentsResponse,
            CreateOrderPayload
        } from "@/types/moysklad"
import {baseFetch} from "@/lib/api"

export const getApi = (token: string) => {
    return {
        getContragents: (params?: Record<string, string | number | boolean>) => 
            baseFetch<ContragentsResponse>("/contragents/", token, params),
        getWarehouses: (params?: Record<string, string | number | boolean>) => 
            baseFetch<WarehousesResponse>("/warehouses/", token, params),
        getPayboxes: (params?: Record<string, string | number | boolean>) => 
            baseFetch<PayBoxesResponse>("/payboxes/", token, params),
        getOrganizations: (params?: Record<string, string | number | boolean>) => 
            baseFetch<OrganizationsResponse>("/organizations/", token, params),
        getPriceType: (params?: Record<string, string | number | boolean>) => 
            baseFetch<PriceTypeResponse>("/price_types/", token, params),
        getNomenclature: (params?: Record<string, string | number | boolean>) => 
            baseFetch<NomenclatureResponse>("/nomenclature/", token, params),
        createOrder: (payload: CreateOrderPayload) =>
        baseFetch("/docs_sales/", token, undefined, {
        method: "POST",
        body: JSON.stringify([payload])
    }),
    
    }
}