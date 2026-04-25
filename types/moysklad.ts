
export type WarehousesResponse = {
    result : Warehouse[],
    count: number
}
export type Warehouse = {
  name: string,
  type?: string,
  description?: string,
  address?: string,
  phone?: string,
  parent?: number,
  is_public?: true,
  status?: true,
  id?: number,
  updated_at?: number,
  created_at?: number,
  longitude?: number,
  latitude?: number,
  qr_hash?: string,
  qr_url?: string
}

export type OrganizationsResponse = {
  result: Organization[],
  count: number
}

export type Organization = {
    type: string,
      short_name: string,
      full_name: string,
      work_name?: string,
      prefix?: string,
      inn?: number,
      kpp?: number,
      okved?: number,
      okved2?: number,
      okpo?: number,
      ogrn?: number,
      org_type?: "ООО",
      tax_type?: "ОСНО",
      tax_percent?: number,
      registration_date?: number,
      id?: number,
      updated_at?: number,
      created_at?: number
}

export type PriceTypeResponse = {
  result: PriceType[],
}

export type PriceType = {
    name: string,
    tags: [],
    id: number,
    updated_at: number,
    created_at: number
}
export type NomenclatureResponse = {
  result: Nomenclature []
}

export type Nomenclature = {
    name: string,
    description_short?: string,
    description_long?: string,
    id: number
    prices: [
        {
          price: number,
          price_type: string
        }
    ]
}
export type PayBoxesResponse = {
  result: PayBox[],
  count: number
}

export type PayBox = {
    id: number,
    external_id?: string,
    name: string,
    start_balance?: number,
    balance?: number,
}

export type Contragent = {
    id: number
    name: string
    phone?: string
    email?: string
    inn?: number
}

export type ContragentsResponse = {
    result: Contragent[]
    count: number
}

export type OrderGood = {
    nomenclature: number
    price: number
    quantity: number
    unit?: number
    discount?: number
    sum_discounted?: number
    price_type?: number
}

export type CreateOrderPayload = {
    operation: "Заказ"
    warehouse: number
    organization: number
    paybox?: number
    contragent?: number
    goods: OrderGood[]
    comment?: string
    dated?: number
    status?: boolean
    tax_included?: boolean
    tax_active?: boolean
    paid_rubles?: number
    paid_lt?: number
    priority?: number
    settings?: Record<string, unknown>
}

