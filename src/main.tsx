import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import "./utils/i18n.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
      gcTime: 60 * 60 * 1000,
    },
    queries: {
      retry: false,
      staleTime: 60 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  }
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster richColors closeButton position="top-right" />
    </QueryClientProvider>
  </StrictMode>
)
