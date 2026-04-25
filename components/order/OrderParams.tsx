"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useOrderStore } from "@/store/orderStore"
import { useOrderData } from "@/hook/useOrderDara"
import type { Organization, Warehouse, PayBox, PriceType } from "@/types/moysklad"

export const OrderParams = () => {
    const { token, organization, warehouse, paybox, priceType,
            updateOrganization, updateWarehouse, updatePaybox, updatePriceType } = useOrderStore()
    const { organizations, warehouses, payboxes, priceTypes, isLoading } = useOrderData(token)
    const hasToken = !!token

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>3. Параметры продажи</CardTitle>
                <CardDescription>Счёт, организация, склад и тип цены</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">

                {/* Организация */}
                <div className="grid gap-2">
                    <Label>Организация</Label>
                    <select
                        disabled={!hasToken || isLoading}
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                        value={organization?.id ?? ''}
                        onChange={(e) => {
                            const selected = organizations.find(o => String(o.id) === e.target.value)
                            if (selected) updateOrganization(selected)
                        }}
                    >
                        <option value="">Выберите организацию</option>
                        {organizations.map((o: Organization) => (
                            <option key={o.id} value={String(o.id)}>
                                {o.short_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Счёт */}
                <div className="grid gap-2">
                    <Label>Счёт</Label>
                    <select
                        disabled={!hasToken || isLoading}
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                        value={paybox?.id ?? ''}
                        onChange={(e) => {
                            const selected = payboxes.find((p: PayBox) => String(p.id) === e.target.value)
                            if (selected) updatePaybox(selected)
                        }}
                    >
                        <option value="">Выберите счёт</option>
                        {payboxes.map((p: PayBox) => (
                            <option key={p.id} value={String(p.id)}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Склад */}
                <div className="grid gap-2">
                    <Label>Склад</Label>
                    <select
                        disabled={!hasToken || isLoading}
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                        value={warehouse?.id ?? ''}
                        onChange={(e) => {
                            const selected = warehouses.find((w: Warehouse) => String(w.id) === e.target.value)
                            if (selected) updateWarehouse(selected)
                        }}
                    >
                        <option value="">Выберите склад</option>
                        {warehouses.map((w: Warehouse) => (
                            <option key={w.id} value={String(w.id)}>
                                {w.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Тип цены */}
                <div className="grid gap-2">
                    <Label>Тип цены</Label>
                    <select
                        disabled={!hasToken || isLoading}
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                        value={priceType?.id ?? ''}
                        onChange={(e) => {
                            const selected = priceTypes.find((pt: PriceType) => String(pt.id) === e.target.value)
                            if (selected) updatePriceType(selected)
                        }}
                    >
                        <option value="">Выберите тип цены</option>
                        {priceTypes.map((pt: PriceType) => (
                            <option key={pt.id} value={String(pt.id)}>
                                {pt.name}
                            </option>
                        ))}
                    </select>
                </div>

            </CardContent>
        </Card>
    )
}