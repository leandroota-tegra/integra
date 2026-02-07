"use client"

import React from 'react'

export function BlueGridBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[#111C33]">
            {/* Grid Layer */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #0F172A 1px, transparent 1px),
                        linear-gradient(to bottom, #0F172A 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Vignette Overlay with Defocus */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, #0F172A 100%)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    maskImage: 'radial-gradient(circle at center, transparent 30%, black 90%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, transparent 30%, black 90%)'
                }}
            />
        </div>
    )
}
