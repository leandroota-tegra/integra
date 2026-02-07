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
                    gridSpacing: 80,
                    glowRadius: 28,
                    glowAlpha: 12,
                    flareHeight: 120,
                    flareWidth: 40,
                    smokeAlpha: 4,
                    vignetteStrength: 235,
                    neonBlue: [0, 210, 255],
                    travelerSpeed: 0.12
                }

                let traveler: any
                let stars: any[] = []

                s.setup = () => {
                    const container = containerRef.current
                    if (!container) return

                    let canvas = s.createCanvas(container.offsetWidth, container.offsetHeight)
                    canvas.parent(container)
                    s.pixelDensity(1)
                    initializeSystem()
                }

                function initializeSystem() {
                    s.randomSeed(88888)
                    s.noiseSeed(88888)
                    traveler = new Traveler(s, params)
                    stars = []

                    for (let x = 0; x <= s.width + params.gridSpacing; x += params.gridSpacing) {
                        for (let y = 0; y <= s.height + params.gridSpacing; y += params.gridSpacing) {
                            // High density of intersections in this movement
                            stars.push({
                                x, y,
                                phase: s.random(s.TWO_PI),
                                size: s.random(0.7, 1.3),
                                type: s.random() < 0.3 ? 'heavy' : 'light'
                            })
                        }
                    }
                }

                s.draw = () => {
                    // Deep navy black
                    s.background(0, 0, 5)

                    // Atmosphere / Smoke Grain
                    drawSmoke(s, params)

                    // Luminous Grid & Flares
                    s.blendMode(s.SCREEN)
                    drawVolumetricGrid(s, params)
                    drawIntersections(s, params)

                    traveler.update()
                    traveler.draw()

                    s.blendMode(s.BLEND)
                    drawVignette(s, params)
                }

                s.windowResized = () => {
                    const container = containerRef.current
                    if (container) {
                        s.resizeCanvas(container.offsetWidth, container.offsetHeight)
                        initializeSystem()
                    }
                }

                function drawSmoke(s: any, p: any) {
                    s.noStroke()
                    for (let i = 0; i < 3; i++) {
                        s.fill(p.neonBlue[0], p.neonBlue[1], p.neonBlue[2], p.smokeAlpha)
                        let x = s.noise(s.frameCount * 0.003, i) * s.width
                        let y = s.noise(i, s.frameCount * 0.003) * s.height
                        s.ellipse(x, y, 600, 600)
                    }
                }

                function drawVolumetricGrid(s: any, p: any) {
                    let [r, g, b] = p.neonBlue
                    s.noFill()

                    for (let x = 0; x <= s.width + p.gridSpacing; x += p.gridSpacing) {
                        renderVolumetricLine(s, x, 0, x, s.height, r, g, b, p)
                    }
                    for (let y = 0; y <= s.height + p.gridSpacing; y += p.gridSpacing) {
                        renderVolumetricLine(s, 0, y, s.width, y, r, g, b, p)
                    }
                }

                function renderVolumetricLine(s: any, x1: number, y1: number, x2: number, y2: number, r: number, g: number, b: number, p: any) {
                    // Staggered glow for cloud-like feel
                    for (let i = p.glowRadius; i > 0; i -= 4) {
                        let alpha = s.map(i, 0, p.glowRadius, p.glowAlpha, 0)
                        s.stroke(r, g, b, alpha)
                        s.strokeWeight(i)
                        s.line(x1, y1, x2, y2)
                    }
                    // Vivid core line
                    s.stroke(255, 255, 255, 140)
                    s.strokeWeight(1)
                    s.line(x1, y1, x2, y2)
                }

                function drawIntersections(s: any, p: any) {
                    for (let st of stars) {
                        let pulse = (s.sin(s.frameCount * 0.03 + st.phase) + 1) * 0.5
                        if (pulse > 0.1) {
                            renderVerticalFlare(s, st.x, st.y, pulse * st.size, p)
                        }
                    }
                }

                function renderVerticalFlare(s: any, x: number, y: number, pulse: number, p: any) {
                    let [r, g, b] = p.neonBlue
                    let h = p.flareHeight * pulse
                    let w = p.flareWidth * pulse

                    s.noStroke()
                    // Diffuse hub
                    s.fill(r, g, b, 50 * pulse)
                    s.ellipse(x, y, 12, 12)

                    // High-intensity core dot
                    s.fill(255, 255, 255, 220 * pulse)
                    s.ellipse(x, y, 3, 3)

                    // Beams (Vertical Dominant)
                    s.fill(r, g, b, 80 * pulse)
                    s.rect(x - 1, y - h / 2, 2, h) // Vertical
                    s.rect(x - w / 2, y - 0.5, w, 1) // Horizontal
                }

                function drawVignette(s: any, p: any) {
                    let ctx = s.drawingContext
                    let centerX = s.width / 2
                    let centerY = s.height / 2
                    let radius = Math.max(s.width, s.height) * 0.95

                    let grd = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
                    grd.addColorStop(0, 'rgba(0,0,0,0)')
                    grd.addColorStop(0.3, 'rgba(0,0,0,0)')
                    grd.addColorStop(1, `rgba(0,0,0,${p.vignetteStrength / 255})`)

                    ctx.fillStyle = grd
                    ctx.globalCompositeOperation = 'multiply'
                    ctx.fillRect(0, 0, s.width, s.height)
                    ctx.globalCompositeOperation = 'source-over'
                }

                class Traveler {
                    s: any; p: any; x: number; y: number; destX: number; destY: number; progress: number;
                    gridX: number; gridY: number;
                    constructor(s: any, p: any) {
                        this.s = s; this.p = p;
                        this.gridX = s.floor(s.random(s.width / p.gridSpacing));
                        this.gridY = s.floor(s.random(s.height / p.gridSpacing));
                        this.x = this.gridX * p.gridSpacing; this.y = this.gridY * p.gridSpacing;
                        this.destX = this.x; this.destY = this.y; this.progress = 1;
                    }
                    update() {
                        if (this.progress >= 1) {
                            this.gridX = this.s.floor(this.destX / this.p.gridSpacing);
                            this.gridY = this.s.floor(this.destY / this.p.gridSpacing);
                            let dir = this.s.floor(this.s.random(4));
                            let nx = this.gridX + (dir === 0 ? 1 : dir === 1 ? -1 : 0);
                            let ny = this.gridY + (dir === 2 ? 1 : dir === 3 ? -1 : 0);
                            if (nx < 0 || nx > this.s.width / this.p.gridSpacing) nx = this.gridX;
                            if (ny < 0 || ny > this.s.height / this.p.gridSpacing) ny = this.gridY;
                            this.destX = nx * this.p.gridSpacing; this.destY = ny * this.p.gridSpacing;
                            this.progress = 0;
                        }
                        this.progress += this.p.travelerSpeed;
                        this.x = this.s.lerp(this.x, this.destX, 0.1);
                        this.y = this.s.lerp(this.y, this.destY, 0.1);
                    }
                    draw() {
                        this.s.noStroke();
                        this.s.fill(this.p.neonBlue[0], this.p.neonBlue[1], this.p.neonBlue[2], 120);
                        this.s.ellipse(this.x, this.y, 10, 10);
                        this.s.fill(255); this.s.ellipse(this.x, this.y, 4, 4);
                    }
                }
            }

            p5Instance = new p5(sketch)
        }

        initP5()

        return () => { if (p5Instance) p5Instance.remove() }
    }, [])

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />
    )
}
