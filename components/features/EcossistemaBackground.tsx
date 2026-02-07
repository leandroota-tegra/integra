"use client"

import React, { useEffect, useRef } from 'react'

export function EcossistemaBackground() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return

        let p5Instance: any

        const initP5 = async () => {
            const p5Module = await import('p5')
            const p5 = p5Module.default

            const sketch = (s: any) => {
                let params = {
                    gridSpacing: 40,
                    glowAlphaBase: 120,    // High alpha for the "leading edge"
                    pulseSpeed: 4.5,       // Pixels per frame expansion
                    maxRadius: 600,        // Max spread before total death
                    fissureWeight: 2.2,
                    brandOrange: [255, 93, 0],
                    brandMidnight: [17, 28, 51] // #111C33
                }

                let pulses: GridPulse[] = []
                let nextSpawnTime = 0

                s.setup = () => {
                    const container = containerRef.current
                    if (!container) return

                    let canvas = s.createCanvas(container.offsetWidth, container.offsetHeight)
                    canvas.parent(container)
                    s.pixelDensity(1)
                    s.frameRate(60)
                    s.strokeCap(s.ROUND)

                    pulses = []
                    spawnOne()
                }

                function spawnOne() {
                    // Pick a grid-aligned origin
                    let rx = s.random(s.width * 0.1, s.width * 0.9)
                    let ry = s.random(s.height * 0.1, s.height * 0.9)
                    let nx = s.floor(rx / params.gridSpacing) * params.gridSpacing
                    let ny = s.floor(ry / params.gridSpacing) * params.gridSpacing

                    pulses.push(new GridPulse(s, params, nx, ny))
                }

                s.draw = () => {
                    s.background(params.brandMidnight[0], params.brandMidnight[1], params.brandMidnight[2])

                    if (s.millis() > nextSpawnTime) {
                        spawnOne()
                        nextSpawnTime = s.millis() + s.random(1500, 3500)
                    }

                    for (let i = pulses.length - 1; i >= 0; i--) {
                        pulses[i].update()
                        if (pulses[i].isDead) pulses.splice(i, 1)
                    }

                    s.blendMode(s.ADD)
                    drawGrid(s, params)
                    s.blendMode(s.BLEND)
                }

                s.windowResized = () => {
                    const container = containerRef.current
                    if (container) s.resizeCanvas(container.offsetWidth, container.offsetHeight)
                }

                function drawGrid(s: any, p: any) {
                    // Render Base Grid
                    s.stroke(15, 23, 42, 100)
                    s.strokeWeight(p.fissureWeight)

                    for (let x = 0; x <= s.width + p.gridSpacing; x += p.gridSpacing) {
                        s.line(x, 0, x, s.height)
                    }
                    for (let y = 0; y <= s.height + p.gridSpacing; y += p.gridSpacing) {
                        s.line(0, y, s.width, y)
                    }

                    // Render Energy Pulses along Grid
                    for (let pulse of pulses) {
                        renderEnergyTravel(s, pulse, p)
                    }
                }

                function renderEnergyTravel(s: any, pulse: GridPulse, p: any) {
                    let [r, g, b] = p.brandOrange
                    let rInner = pulse.radius - 80
                    let rOuter = pulse.radius

                    // Check Horizontal Lines (Y is constant)
                    for (let y = 0; y <= s.height + p.gridSpacing; y += p.gridSpacing) {
                        if (s.abs(y - pulse.y) < 1) { // Same line as origin
                            renderPulseSegment(s, 0, y, s.width, y, true, pulse, p)
                        } else if (s.abs(y - pulse.y) <= pulse.radius) {
                            // Parallel line within radius
                            renderPulseSegment(s, 0, y, s.width, y, true, pulse, p)
                        }
                    }

                    // Check Vertical Lines (X is constant)
                    for (let x = 0; x <= s.width + p.gridSpacing; x += p.gridSpacing) {
                        if (s.abs(x - pulse.x) < 1) {
                            renderPulseSegment(s, x, 0, x, s.height, false, pulse, p)
                        } else if (s.abs(x - pulse.x) <= pulse.radius) {
                            renderPulseSegment(s, x, 0, x, s.height, false, pulse, p)
                        }
                    }
                }

                function renderPulseSegment(s: any, x1: number, y1: number, x2: number, y2: number, isH: boolean, pulse: GridPulse, p: any) {
                    let [r, g, b] = p.brandOrange
                    let steps = 20
                    let len = isH ? s.width : s.height

                    // We only care about segments that intersect our current "wavefront"
                    // Distance from origin to any point on this line: 
                    // d = sqrt((x-px)^2 + (y-py)^2)

                    for (let j = 0; j < steps; j++) {
                        let t = j / steps
                        let curX = s.lerp(x1, x2, t)
                        let curY = s.lerp(y1, y2, t)

                        let d = s.dist(curX, curY, pulse.x, pulse.y)

                        // Wavefront logic: illuminate if d is slightly less than pulse.radius
                        if (d < pulse.radius && d > pulse.radius - 150) {
                            let intensity = s.map(d, pulse.radius - 150, pulse.radius, 0, 1)
                            intensity *= s.map(pulse.radius, 0, p.maxRadius, 1, 0) // Dissipation over distance

                            let alpha = intensity * p.glowAlphaBase * pulse.lifecycleAlpha

                            if (alpha > 1) {
                                s.stroke(r, g, b, alpha)
                                s.strokeWeight(p.fissureWeight + intensity * 2)
                                let nextT = (j + 1) / steps
                                s.line(curX, curY, s.lerp(x1, x2, nextT), s.lerp(y1, y2, nextT))

                                // Core highlight for the "head"
                                if (intensity > 0.8) {
                                    s.stroke(255, 255, 255, alpha * 0.6)
                                    s.strokeWeight(p.fissureWeight * 0.5)
                                    s.line(curX, curY, s.lerp(x1, x2, nextT), s.lerp(y1, y2, nextT))
                                }
                            }
                        }
                    }
                }

                class GridPulse {
                    s: any; p: any; x: number; y: number; radius: number;
                    lifecycle: number; lifecycleAlpha: number; isDead: boolean;

                    constructor(s: any, p: any, x: number, y: number) {
                        this.s = s; this.p = p
                        this.x = x; this.y = y
                        this.radius = 0
                        this.lifecycle = 0; this.lifecycleAlpha = 1
                        this.isDead = false
                    }

                    update() {
                        this.radius += this.p.pulseSpeed
                        this.lifecycle += 16.67

                        // Fade out towards the end of range
                        if (this.radius > this.p.maxRadius * 0.7) {
                            this.lifecycleAlpha = s.map(this.radius, this.p.maxRadius * 0.7, this.p.maxRadius, 1, 0)
                        }

                        if (this.radius >= this.p.maxRadius) this.isDead = true
                    }
                }
            }

            p5Instance = new p5(sketch)
        }

        initP5()

        return () => { if (p5Instance) p5Instance.remove() }
    }, [])

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Dedicated Relative Container for p5 เพื่อ clear warning */}
            <div ref={containerRef} className="relative w-full h-full" />

            {/* Defocus Vignette Overlay (Above p5 Canvas) */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 20%, #0F172A 85%)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    maskImage: 'radial-gradient(circle at center, transparent 10%, black 70%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, transparent 10%, black 70%)'
                }}
            />
        </div>
    )
}
