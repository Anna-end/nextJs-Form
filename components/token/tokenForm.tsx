"use client"
import {useState} from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {useOrderStore} from "@/store/orderStore"

export const TokenForm = () => {
  const { updateToken } = useOrderStore()
  const [value, setValue] = useState('')

  const handleTokenButton = () => {
    if (!value.trim()) return
    updateToken(value.trim())
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>1. Подключение кассы</CardTitle>
        <CardDescription>Введите токен и загрузите справочники</CardDescription>
      </CardHeader>
      <CardContent>
        <div >
          <div className="flex flex-col gap-6"> 
              <div className="grid gap-2">
              <Label htmlFor="token">Токен</Label>
              <Input
                id="token"
                type="string"
                placeholder="Введите токен"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button 
        variant="outline" 
        className="w-full"
        onClick={handleTokenButton}
        >
          Подключить
        </Button>
      </CardFooter>
    </Card>

  )
}