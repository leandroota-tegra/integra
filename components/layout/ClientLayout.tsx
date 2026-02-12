"use client"

import { MousePositionProvider } from "@/components/context/MousePositionContext"
import { Navbar } from "@/components/layout/Navbar"

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <MousePositionProvider>
            <Navbar />
            {children}
        </MousePositionProvider>
    )
}
