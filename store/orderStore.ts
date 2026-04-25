import { create } from 'zustand'
import type { 
    Warehouse, 
    Organization, 
    PriceType, 
    Nomenclature,
    PayBox,
    Contragent
} from '@/types/moysklad'

// CartItem — локальный тип, не из API
type CartItem = {
    product: Nomenclature
    quantity: number
    price: number
}

type Order = {
    token: string
    contragent: Contragent | null
    warehouse: Warehouse | null
    paybox: PayBox | null
    organization: Organization | null
    priceType: PriceType | null
    cartItems: CartItem[]
}

type Action = {
    updateToken: (token: string) => void
    updateContragent: (contragent: Contragent) => void
    updateWarehouse: (warehouse: Warehouse) => void
    updatePaybox: (paybox: PayBox) => void
    updateOrganization: (organization: Organization) => void
    updatePriceType: (priceType: PriceType) => void
    addToCart: (product: Nomenclature, price: number) => void
    removeFromCart: (productName: number) => void
    updateQuantity: (productName: number, quantity: number) => void
    clearCart: () => void
    resetOrder: () => void
}

const initialState: Order = {
    token: '',
    contragent: null,
    warehouse: null,
    paybox: null,
    organization: null,
    priceType: null,
    cartItems: []
}

export const useOrderStore = create<Order & Action>((set) => ({
    ...initialState,

    updateToken: (token) => set({ token }),
    updateContragent: (contragent) => set({ contragent }),
    updateWarehouse: (warehouse) => set({ warehouse }),
    updatePaybox: (paybox) => set({ paybox }),
    updateOrganization: (organization) => set({ organization }),
    updatePriceType: (priceType) => set({ priceType }),

    addToCart: (product, price) => set((state) => {
        const exists = state.cartItems.find(
            (item) => item.product.id === product.id
        )
        if (exists) {
            return {
                cartItems: state.cartItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
        }
        return {
            cartItems: [...state.cartItems, { product, quantity: 1, price }]
        }
    }),

    removeFromCart: (productId) => set((state) => ({
        cartItems: state.cartItems.filter(
            (item) => item.product.id !== Number(productId)
        )
    })),

    updateQuantity: (productId, quantity) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
            item.product.id === Number(productId)
                ? { ...item, quantity }
                : item
        )
    })),

    clearCart: () => set({ cartItems: [] }),

    resetOrder: () => set((state) => ({
        ...initialState,
        token: state.token
    }))
}))