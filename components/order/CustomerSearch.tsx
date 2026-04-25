"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useOrderStore } from "@/store/orderStore"
import { useState } from "react"
import { useCustomer } from "@/hook/useCustomer"

export const CustomerSearch = () => {
    const { token, updateContragent } = useOrderStore()
    const hasToken = !!token
    const [phone, setPhone] = useState('')
    const [value, setValue] = useState('')
    const { customer, isLoading } = useCustomer(token, phone)

    const handleSearchCustomerButton = () => {
        if (!value.trim()) return
        setPhone(value)
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>2. Клиент</CardTitle>
                <CardDescription>Поиск клиента по телефону</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="phone">Номер телефона</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="+79990000000"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={!hasToken}
                    />
                </div>

                <CardDescription>Найденный клиент</CardDescription>
                <select
                        disabled={!customer?.result || customer.result.length === 0 || isLoading}
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                        onChange={(e) => {
                            const selected = customer?.result.find(
                                c => String(c.id) === e.target.value
                            )
                            if (selected) updateContragent(selected)
                        }}
                    >
                        <option value="">
                            {isLoading ? "Поиск..." : "Выберите клиента"}
                        </option>
                        {customer?.result.map(c => (
                            <option key={c.id} value={String(c.id)}>
                                {c.name}
                            </option>
                        ))}
                </select>

                {/* клиент не найден */}
                {!isLoading && phone && customer?.result?.length === 0 && (
                    <p className="text-sm text-muted-foreground">Клиент не найден</p>
                )}
            </CardContent>
            <CardFooter>
                <Button
                    disabled={isLoading || !hasToken}
                    variant="outline"
                    className="w-full"
                    onClick={handleSearchCustomerButton}
                >
                    {isLoading ? "Поиск..." : "Найти"}
                </Button>
            </CardFooter>
        </Card>
    )
}