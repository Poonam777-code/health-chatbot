"use client"

import type React from "react"
import { Suspense } from "react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"
import { I18nextProvider } from "react-i18next"
import i18n from "@/lib/i18n"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          {children}
        </Suspense>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
            },
          }}
        />
      </ThemeProvider>
    </I18nextProvider>
  )
}
