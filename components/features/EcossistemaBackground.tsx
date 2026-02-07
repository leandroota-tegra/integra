"use client"

import React, { useEffect, useRef } from 'react'

export function EcossistemaBackground() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return

        let p5Instance: any

        const initP5 = async () => {
            // Dynamically import p5 to avoid SSR issues
            const p5Module = await import('p5')
            const p5 = p5Module.default

            const sketch = (s: any) => {
                let params = {
                    gridSpacing: 40,
                    gridOpacity: 12,
                    travelerSpeed: 0.1,
                    trailLength: 25,
                    beamSpawnRate: 0.003,
                    beamIntensity: 40,
                    bgBlue: [37, 34, 68, 25], // Matches brand blue with alpha
                    gridBlue: [80, 80, 140],
                    brandOrange: [255, 93, 0]
                }

                let traveler: any;
                let beams: any[] = [];

                s.setup = () => {
                    const container = containerRef.current
                    if (!container) return

                    let canvas = s.createCanvas(container.offsetWidth, container.offsetHeight)
                    canvas.parent(container)

                    s.randomSeed(12345)
                    s.noiseSeed(12345)

                    traveler = new Traveler(s, params)
                    s.background(37, 34, 68) // Initial background
                }

                s.draw = () => {
                    // Semi-transparent overlay for trails
                    s.fill(37, 34, 68, 20)
                    s.noStroke()
                    s.rect(0, 0, s.width, s.height)

                    drawGrid(s, params)

                    if (s.random() < params.beamSpawnRate) {
                        beams.push(new Beam(s, params))
                    }

                    for (let i = beams.length - 1; i >= 0; i--) {
                        beams[i].update()
                        beams[i].draw()
                        if (beams[i].isFinished) beams.splice(i, 1)
                    }

                    traveler.update()
                    traveler.draw()
                }

                s.windowResized = () => {
                    const container = containerRef.current
                    if (container) {
                        s.resizeCanvas(container.offsetWidth, container.offsetHeight)
                    }
                }

                function drawGrid(s: any, params: any) {
                    s.stroke(params.gridBlue[0], params.gridBlue[1], params.gridBlue[2], params.gridOpacity)
                    s.strokeWeight(1)

                    for (let x = 0; x <= s.width; x += params.gridSpacing) {
                        s.line(x, 0, x, s.height)
                    }
                    for (let y = 0; y <= s.height; y += params.gridSpacing) {
                        s.line(0, y, s.width, y)
                    }

                    s.noStroke()
                    s.fill(params.gridBlue[0], params.gridBlue[1], params.gridBlue[2], params.gridOpacity * 1.5)
                    for (let x = 0; x <= s.width; x += params.gridSpacing) {
                        for (let y = 0; y <= s.height; y += params.gridSpacing) {
                            s.ellipse(x, y, 1.5, 1.5)
                        }
                    }
                }

                class Traveler {
                    s: any;
                    params: any;
                    gridX: number;
                    gridY: number;
                    x: number;
                    y: number;
                    targetX: number;
                    targetY: number;
                    progress: number;
                    trail: { x: number, y: number }[];

                    constructor(s: any, params: any) {
                        this.s = s;
                        this.params = params;
                        this.gridX = s.floor(s.random(s.width / params.gridSpacing));
                        this.gridY = s.floor(s.random(s.height / params.gridSpacing));
                        this.x = this.gridX * params.gridSpacing;
                        this.y = this.gridY * params.gridSpacing;
                        this.targetX = this.x;
                        this.targetY = this.y;
                        this.progress = 1;
                        this.trail = [];
                    }

                    update() {
                        if (this.progress >= 1) {
                            this.gridX = this.s.floor(this.targetX / this.params.gridSpacing);
                            this.gridY = this.s.floor(this.targetY / this.params.gridSpacing);

                            let dir = this.s.floor(this.s.random(4));
                            let nextGX = this.gridX + (dir === 0 ? 1 : dir === 1 ? -1 : 0);
                            let nextGY = this.gridY + (dir === 2 ? 1 : dir === 3 ? -1 : 0);

                            if (nextGX < 0 || nextGX > this.s.width / this.params.gridSpacing) nextGX = this.gridX;
                            if (nextGY < 0 || nextGY > this.s.height / this.params.gridSpacing) nextGY = this.gridY;

                            this.targetX = nextGX * this.params.gridSpacing;
                            this.targetY = nextGY * this.params.gridSpacing;
                            this.progress = 0;
                        }

                        this.progress += this.params.travelerSpeed;
                        this.x = this.s.lerp(this.x, this.targetX, 0.1);
                        this.y = this.s.lerp(this.y, this.targetY, 0.1);

                        this.trail.push({ x: this.x, y: this.y });
                        if (this.trail.length > this.params.trailLength) this.trail.shift();
                    }

                    draw() {
                        for (let i = 0; i < this.trail.length; i++) {
                            let alpha = this.s.map(i, 0, this.trail.length, 0, 100);
                            this.s.fill(this.params.brandOrange[0], this.params.brandOrange[1], this.params.brandOrange[2], alpha);
                            this.s.noStroke();
                            let size = this.s.map(i, 0, this.trail.length, 1, 4);
                            this.s.ellipse(this.trail[i].x, this.trail[i].y, size, size);
                        }

                        this.s.fill(255, 200);
                        this.s.ellipse(this.x, this.y, 6, 6);
                        this.s.fill(this.params.brandOrange[0], this.params.brandOrange[1], this.params.brandOrange[2], 60);
                        this.s.ellipse(this.x, this.y, 12, 12);
                    }
                }

                class Beam {
                    s: any;
                    params: any;
                    type: number;
                    pos: number;
                    thickness: number;
                    life: number;
                    duration: number;
                    isFinished: boolean;

                    constructor(s: any, params: any) {
                        this.s = s;
                        this.params = params;
                        this.type = s.floor(s.random(3));
                        this.pos = s.random(1);
                        this.thickness = s.random(30, 80);
                        this.life = 0;
                        this.duration = s.random(80, 150);
                        this.isFinished = false;
                    }

                    update() {
                        this.life++;
                        if (this.life > this.duration) this.isFinished = true;
                    }

                    draw() {
                        let alpha;
                        if (this.life < this.duration * 0.5) {
                            alpha = this.s.map(this.life, 0, this.duration * 0.5, 0, this.params.beamIntensity);
                        } else {
                            alpha = this.s.map(this.life, this.duration * 0.5, this.duration, this.params.beamIntensity, 0);
                        }

                        this.s.noStroke();
                        this.s.fill(this.params.brandOrange[0], this.params.brandOrange[1], this.params.brandOrange[2], alpha * 0.2);

                        if (this.type === 0) { // Vertical
                            let x = this.pos * this.s.width;
                            this.s.rect(x - this.thickness / 2, 0, this.thickness, this.s.height);
                        } else if (this.type === 1) { // Horizontal
                            let y = this.pos * this.s.height;
                            this.s.rect(0, y - this.thickness / 2, this.s.width, this.thickness);
                        } else { // Diagonal
                            this.s.push();
                            this.s.translate(this.s.width / 2, this.s.height / 2);
                            this.s.rotate(this.s.QUARTER_PI * (this.pos > 0.5 ? 1 : -1));
                            this.s.rect(-this.s.width, -this.thickness / 2, this.s.width * 2, this.thickness);
                            this.s.pop();
                        }
                    }
                }
            }

            p5Instance = new p5(sketch)
        }

        initP5()

        return () => {
            if (p5Instance) p5Instance.remove()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    )
}
