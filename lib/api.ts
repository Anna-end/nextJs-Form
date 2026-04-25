
const BASE_URL = "https://app.tablecrm.com/api/v1"

export const baseFetch = async <T>(
    path: string,
    token: string,
    params?: Record<string, string | number | boolean>,
    options?: { method?: string; body?: string }  // ← добавить
): Promise<T> => {

    const searchParams = new URLSearchParams({
        token,
        limit: "100",
        offset: "0",
        ...Object.fromEntries(
            Object.entries(params ?? {}).map(([k, v]) => [k, String(v)])
        )
    })

    const response = await fetch(`${BASE_URL}${path}?${searchParams}`, {
        method: options?.method ?? "GET",
        headers: options?.body ? { "Content-Type": "application/json" } : undefined,
        body: options?.body,
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error?.detail?.[0]?.msg ?? `Ошибка ${response.status}`)
    }

    return response.json() as Promise<T>
}
