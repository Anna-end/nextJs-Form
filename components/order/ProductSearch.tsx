"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useOrderStore } from "@/store/orderStore"
import { useNomenclature } from "@/hook/useNomenclature"
import { useState } from "react"
import type { Nomenclature } from "@/types/moysklad"
import {useCreateOrder} from "@/hook/useCreateOrder"
export const ProductSearch = () => {
    const { token, cartItems, addToCart, removeFromCart, updateQuantity, priceType } = useOrderStore()
    const hasToken = !!token
    const [search, setSearch] = useState('')
    const { nomenclature, isLoading } = useNomenclature(token, search)
    const { createOrder, isPending, canSubmit } = useCreateOrder()
    const [comment, setComment] = useState('')

    // получаем цену товара с учётом выбранного типа цены
    const getPrice = (product: Nomenclature): number => {
        if (!priceType || !product.prices?.length) return 0
        const match = product.prices.find(p => p.price_type === priceType.name)
        return match?.price ?? product.prices[0]?.price ?? 0
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <>
            {/* Шаг 4 — Поиск товаров */}
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>🛍 4. Товары</CardTitle>
                    <CardDescription>Поиск и добавление номенклатуры</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <Input
                        placeholder="Поиск товара по названию"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        disabled={!hasToken}
                    />

                    <div className="border rounded-md min-h-32 max-h-56 overflow-y-auto">
                        {isLoading && (
                            <p className="text-sm text-muted-foreground p-3">Загрузка...</p>
                        )}
                        {!isLoading && nomenclature.length === 0 && (
                            <p className="text-sm text-muted-foreground p-3">Товары не найдены</p>
                        )}
                        {!isLoading && nomenclature.map((product: Nomenclature, index: number) => {
                            const price = getPrice(product)
                            const inCart = cartItems.find(i => i.product.id === product.id)
                            return (
                                <div
                                    key={product.id ?? index}
                                    className="flex items-center justify-between px-3 py-2 border-b last:border-0 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{product.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {price.toLocaleString('ru-RU')} ₽
                                        </span>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant={inCart ? "default" : "outline"}
                                        className="h-7 px-2 text-xs"
                                        onClick={() => addToCart(product, price)}
                                    >
                                        {inCart ? `+${inCart.quantity}` : "+ Добавить"}
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Корзина */}
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>🛒 Корзина</CardTitle>
                    <CardDescription>Количество, цена и сумма по позициям</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {cartItems.length === 0 && (
                        <p className="text-sm text-muted-foreground">Добавьте хотя бы один товар</p>
                    )}
                    {cartItems.map((item) => (
                        <div
                            key={item.product.id}
                            className="flex items-center gap-2 border-b pb-2 last:border-0"
                        >
                            <div className="flex-1">
                                <p className="text-sm font-medium leading-tight">{item.product.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {item.price.toLocaleString('ru-RU')} ₽ × {item.quantity} = {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                                </p>
                            </div>

                            {/* счётчик количества */}
                            <div className="flex items-center gap-1">
                                <button
                                    className="w-6 h-6 rounded border text-sm flex items-center justify-center hover:bg-muted"
                                    onClick={() => item.quantity > 1
                                        ? updateQuantity(item.product.id, item.quantity - 1)
                                        : removeFromCart(item.product.id)
                                    }
                                >
                                    −
                                </button>
                                <span className="text-sm w-5 text-center">{item.quantity}</span>
                                <button
                                    className="w-6 h-6 rounded border text-sm flex items-center justify-center hover:bg-muted"
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Комментарий + Итого + Кнопки */}
            <Card className="w-full max-w-sm">
                <CardContent className="flex flex-col gap-3 pt-4">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Комментарий к заказу (необязательно)"
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background resize-none min-h-16"
                        rows={3}
                    />
                </CardContent>
            </Card>

            {/* Итого — прилипает к низу */}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background border-t px-4 py-3 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Итого</span>
                    <span className="text-sm font-bold">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <Button
                    className="w-full"
                    onClick={() => createOrder(comment)}
                    disabled={!canSubmit || isPending}
                >
                    Создать продажу
                </Button>
                <button className="text-sm text-muted-foreground flex items-center justify-center gap-1 py-1">
                    ⊙ Создать и провести
                </button>
            </div>
        </>
    )
}