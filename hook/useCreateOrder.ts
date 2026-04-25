// hooks/useCreateOrder.ts
import { useMutation } from '@tanstack/react-query'
import { getApi } from '@/lib/moysklad'
import { useOrderStore } from '@/store/orderStore'
import type { CreateOrderPayload } from '@/types/moysklad'

export const useCreateOrder = () => {
    const { token, warehouse, organization, paybox, contragent, cartItems, resetOrder } = useOrderStore()
    const api = getApi(token)

    const buildPayload = (comment?: string): CreateOrderPayload => ({
        operation: "Заказ",
        warehouse: warehouse!.id!,
        organization: organization!.id!,
        paybox: paybox?.id,
        contragent: contragent?.id,
        comment,
        dated: Math.floor(Date.now() / 1000),  // unix timestamp
        status: false,
        tax_included: true,
        tax_active: true,
        paid_rubles: 0,
        paid_lt: 0,
        settings: {},
        goods: cartItems.map(item => ({
            nomenclature: item.product.id!,
            price: item.price,
            quantity: item.quantity,
        }))
    })

    const { mutate, isPending, isSuccess, isError, error } = useMutation({
        mutationFn: (comment?: string) => api.createOrder(buildPayload(comment)),
        onSuccess: () => {
            resetOrder()  // сбрасываем стор после успешного создания
        }
    })

    // проверка что всё заполнено перед отправкой
    const canSubmit =
        !!warehouse &&
        !!organization &&
        cartItems.length > 0

    return {
        createOrder: mutate,   // createOrder(comment?)
        isPending,
        isSuccess,
        isError,
        error,
        canSubmit,
    }
}