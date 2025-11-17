let supabaseClient: any = null

export function createClient() {
  if (!supabaseClient) {
    supabaseClient = {
      auth: {
        signOut: async () => {
          // Mock sign out
          localStorage.removeItem("user")
          return { error: null }
        },
        getUser: async () => {
          const user = localStorage.getItem("user")
          return { data: { user: user ? JSON.parse(user) : null }, error: null }
        },
        signInWithPassword: async (credentials: any) => {
          // Mock sign in
          const user = { id: "1", email: credentials.email }
          localStorage.setItem("user", JSON.stringify(user))
          return { data: { user }, error: null }
        },
        signUp: async (credentials: any) => {
          // Mock sign up
          const user = { id: "1", email: credentials.email }
          localStorage.setItem("user", JSON.stringify(user))
          return { data: { user }, error: null }
        },
      },
      from: (table: string) => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null }),
          }),
          async: async () => ({ data: [], error: null }),
        }),
        insert: async (data: any) => ({ data, error: null }),
        update: async (data: any) => ({ data, error: null }),
        delete: async () => ({ data: null, error: null }),
      }),
    }
  }
  return supabaseClient
}
