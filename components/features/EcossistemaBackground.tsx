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
                    gridSpacing: 60,
                    lineCoreWeight: 1,
                    glowStrength: 8,
                    hazeAmount: 65,
                    pulseRate: 0.04,
                    flareIntensity: 210,
                    travelerSpeed: 0.15,
                    travelerGlowLength: 200,
                    vignetteStrength: 230,
                    neonBlue: [0, 229, 255],
                    brandOrange: [255, 93, 0]
                }

                let traveler: any;
                let beams: any[] = [];
                let stars: any[] = [];

                s.setup = () => {
                    const container = containerRef.current
                    if (!container) return

                    let canvas = s.createCanvas(container.offsetWidth, container.offsetHeight)
                    canvas.parent(container)
                    s.pixelDensity(1)
                    initializeSystem()
                }

                function initializeSystem() {
                    s.randomSeed(12345)
                    s.noiseSeed(12345)
                    traveler = new Traveler(s, params)
                    beams = []
                    stars = []

                    for (let x = 0; x <= s.width; x += params.gridSpacing) {
                        for (let y = 0; y <= s.height; y += params.gridSpacing) {
                            if (s.random() < 0.15) {
                                stars.push({ x, y, phase: s.random(s.TWO_PI), size: s.random(0.6, 1.1) })
                            }
                        }
                    }
                }

                s.draw = () => {
                    s.background(0, 0, 8) // Night blue-black

                    s.blendMode(s.SCREEN)
                    drawGrid(s, params)
                    drawStars(s, params)

                    traveler.update()
                    traveler.draw()

                    if (s.random() < 0.006) beams.push(new Beam(s, params))
                    for (let i = beams.length - 1; i >= 0; i--) {
                        beams[i].update()
                        beams[i].draw()
                        if (beams[i].isFinished) beams.splice(i, 1)
                    }

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

                function drawGrid(s: any, params: any) {
                    let [r, g, b] = params.neonBlue

                    for (let x = 0; x <= s.width; x += params.gridSpacing) {
                        renderNeonLine(s, x, 0, x, s.height, r, g, b, params)
                    }
                    for (let y = 0; y <= s.height; y += params.gridSpacing) {
                        renderNeonLine(s, 0, y, s.width, y, r, g, b, params)
                    }
                }

                function renderNeonLine(s: any, x1: number, y1: number, x2: number, y2: number, r: number, g: number, b: number, params: any) {
                    // Atmosphere Haze
                    s.stroke(r, g, b, params.hazeAmount * 0.15)
                    s.strokeWeight(12)
                    s.line(x1, y1, x2, y2)

                    // Main Glow
                    s.stroke(r, g, b, params.glowStrength * 4)
                    s.strokeWeight(5)
                    s.line(x1, y1, x2, y2)

                    // Vivid Core
                    s.stroke(255, 255, 255, 180)
                    s.strokeWeight(params.lineCoreWeight)
                    s.line(x1, y1, x2, y2)
                }

                function drawStars(s: any, params: any) {
                    for (let st of stars) {
                        let pulse = (s.sin(s.frameCount * params.pulseRate + st.phase) + 1) * 0.5
                        let intensity = pulse * params.flareIntensity
                        if (intensity > 10) renderStarFlare(s, st.x, st.y, intensity * st.size, params)
                    }
                }

                function renderStarFlare(s: any, x: number, y: number, intensity: number, params: any) {
                    let [r, g, b] = params.neonBlue
                    s.noStroke()
                    s.fill(r, g, b, intensity * 0.2)
                    s.ellipse(x, y, 18, 18)
                    s.fill(255, 255, 255, intensity)
                    s.ellipse(x, y, 3, 3)

                    s.stroke(r, g, b, intensity * 0.7)
                    s.strokeWeight(1.2)
                    s.line(x - 18, y, x + 18, y)
                    s.line(x, y - 18, x, y + 18)
                }

                function drawVignette(s: any, params: any) {
                    let ctx = s.drawingContext
                    let centerX = s.width / 2
                    let centerY = s.height / 2
                    let radius = Math.max(s.width, s.height) * 0.8

                    let grd = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
                    grd.addColorStop(0, 'rgba(0,0,0,0)')
                    grd.addColorStop(0.2, 'rgba(0,0,0,0)')
                    grd.addColorStop(1, `rgba(0,0,0,${params.vignetteStrength / 255})`)

                    ctx.fillStyle = grd
                    ctx.globalCompositeOperation = 'multiply'
                    ctx.fillRect(0, 0, s.width, s.height)
                    ctx.globalCompositeOperation = 'source-over'
                }

                class Traveler {
                    s: any; params: any;
                    x: number; y: number; destX: number; destY: number; p: number;
                    gridX: number; gridY: number;
                    constructor(s: any, params: any) {
                        this.s = s; this.params = params;
                        this.gridX = s.floor(s.random(s.width / params.gridSpacing));
                        this.gridY = s.floor(s.random(s.height / params.gridSpacing));
                        this.x = this.gridX * params.gridSpacing; this.y = this.gridY * params.gridSpacing;
                        this.destX = this.x; this.destY = this.y; this.p = 1;
                    }
                    update() {
                        if (this.p >= 1) {
                            this.gridX = this.s.floor(this.destX / this.params.gridSpacing);
                            this.gridY = this.s.floor(this.destY / this.params.gridSpacing);
                            let dir = this.s.floor(this.s.random(4));
                            let nx = this.gridX + (dir === 0 ? 1 : dir === 1 ? -1 : 0);
                            let ny = this.gridY + (dir === 2 ? 1 : dir === 3 ? -1 : 0);
                            if (nx < 0 || nx > this.s.width / this.params.gridSpacing) nx = this.gridX;
                            if (ny < 0 || ny > this.s.height / this.params.gridSpacing) ny = this.gridY;
                            this.destX = nx * this.params.gridSpacing; this.destY = ny * this.params.gridSpacing;
                            this.p = 0;
                        }
                        this.p += this.params.travelerSpeed;
                        this.x = this.s.lerp(this.x, this.destX, 0.1);
                        this.y = this.s.lerp(this.y, this.destY, 0.1);
                    }
                    draw() {
                        this.s.noStroke();
                        for (let i = 1; i < 5; i++) {
                            this.s.fill(this.params.neonBlue[0], this.params.neonBlue[1], this.params.neonBlue[2], 40 / i);
                            this.s.ellipse(this.x, this.y, i * 12, i * 12);
                        }
                        this.s.fill(255); this.s.ellipse(this.x, this.y, 5, 5);
                    }
                }

                class Beam {
                    s: any; params: any; x: number; y: number; life: number; duration: number; isFinished: boolean = false;
                    constructor(s: any, params: any) {
                        this.s = s; this.params = params; this.x = s.random(s.width); this.y = s.random(s.height);
                        this.life = 0; this.duration = s.random(30, 60);
                    }
                    update() { this.life++; if (this.life > this.duration) this.isFinished = true; }
                    draw() {
                        let a = this.s.map(this.s.sin(this.s.map(this.life, 0, this.duration, 0, this.s.PI)), 0, 1, 0, this.params.orangeBeamIntensity);
                        this.s.stroke(this.params.brandOrange[0], this.params.brandOrange[1], this.params.brandOrange[2], a * 0.4);
                        this.s.strokeWeight(1);
                        this.s.line(this.x - 30, this.y - 30, this.x + 30, this.y + 30);
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
