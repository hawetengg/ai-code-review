const BASE_URL = 'http://localhost:5000/api'

type RequestOptions = {
  method?: string
  body?: unknown
  token?: string
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  }

  if (body !== undefined) {
    fetchOptions.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions)

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong')
  }

  return data as T
}

export const api = {
  register: (name: string, email: string, password: string) =>
    request<{ token: string; user: { id: string; email: string; name: string } }>(
      '/auth/register',
      { method: 'POST', body: { name, email, password } }
    ),

  login: (email: string, password: string) =>
    request<{ token: string; user: { id: string; email: string; name: string } }>(
      '/auth/login',
      { method: 'POST', body: { email, password } }
    ),
}