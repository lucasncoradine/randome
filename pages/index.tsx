import React from "react"
import { AppProvider, AuthProvider, CookiesProvider } from "@contexts"
import { Container } from "@styles"
import { HomePage } from "./Home/HomePage"

export default function Home() {
  return (
    <CookiesProvider>
      <AppProvider>
        <AuthProvider>
          <Container>
            <HomePage />
          </Container>
        </AuthProvider>
      </AppProvider>
    </CookiesProvider>
  )
}
