"use client"

import React, { createContext, useContext, useEffect } from "react"
import { useMotionValue, MotionValue } from "framer-motion"

interface MousePositionContextType {
    x: MotionValue<number>
    y: MotionValue<number>
}

const MousePositionContext = createContext<MousePositionContextType | null>(null)

export function MousePositionProvider({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Using pageX/Y (Document Coordinates) to avoid needing to listen to scroll events
            // in the consumers for position recalculation.
            x.set(e.pageX)
            y.set(e.pageY)
        }

        window.addEventListener("mousemove", handleMouseMove)

        // Initialize with 0 or center if needed, but 0 is fine as it will update on first move
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [x, y])

    return (
        <MousePositionContext.Provider value={{ x, y }}>
            {children}
        </MousePositionContext.Provider>
    )
}

export function useMousePosition() {
    const context = useContext(MousePositionContext)
    if (!context) {
        throw new Error("useMousePosition must be used within a MousePositionProvider")
    }
    return context
}
