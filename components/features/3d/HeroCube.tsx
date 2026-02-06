"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { RoundedBox, Environment, Float } from "@react-three/drei"
import { useRef, useMemo, useEffect, Suspense } from "react"
import * as THREE from "three"

// Configuration constants
const CUBE_SIZE = 0.55
const ORBIT_RADIUS = 1.7 // Tighter cluster (Was 2.0)
const ORBIT_SPEED = 0.05
const REPEL_DIST = 4.0
const MAX_DIST = 5.0 // Tighter safety leash (Was 6.5)

// DUAL PHYSICS CONFIGURATION
// 1. DISPERSED STATE (Zero Gravity / Astronaut Feel)
const PHYSICS_DISPERSED = {
    SPRING: 0.0,   // ZERO pull-back (True Zero-G)
    DAMPING: 0.95, // Higher friction to stop drift
    FLICK: 0.05    // Reduced sensitivity (Tap not Punch)
}

// 2. ASSEMBLED STATE (Magnetic Snap)
const PHYSICS_ASSEMBLED = {
    SPRING: 0.08,  // Softer magnetic pull (Was 0.15)
    DAMPING: 0.90, // Smoother arrival
    FLICK: 0.0     // Locked
}

// Colors
const COLOR_BLUE = "#252244" // Vibrant Cobalt (Matte)
const COLOR_ORANGE = "#FF5D00" // Brand Orange (Matte)

// Fragment Component
function Fragment({
    position,
    isAssembling,
    isOrange
}: {
    position: [number, number, number],
    isAssembling: boolean,
    isOrange: boolean
}) {
    const meshRef = useRef<THREE.Mesh>(null)

    // Initial random offsets
    const randomOffset = useMemo(() => ({
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
        z: (Math.random() - 0.5) * 3.5,
        phase: Math.random() * Math.PI * 2
    }), [])

    // Physics State REF
    const state = useRef({
        pos: new THREE.Vector3(
            position[0] * 3 + randomOffset.x,
            position[1] * 3 + randomOffset.y,
            position[2] * 3 + randomOffset.z
        ),
        vel: new THREE.Vector3(0, 0, 0),
        rot: new THREE.Quaternion(),
        rotVel: new THREE.Vector3(0, 0, 0)
    })

    // Interaction Handler
    const handlePointerOver = (e: any) => {
        if (isAssembling) return

        const params = isAssembling ? PHYSICS_ASSEMBLED : PHYSICS_DISPERSED

        // Precise Push: Impulse Direction = Mouse Velocity approx or just Random spread
        // To make it feel like "pushing", we can add a vector away from camera + random
        const impulse = new THREE.Vector3(
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 1.5
        ).normalize().multiplyScalar(params.FLICK)

        state.current.vel.add(impulse)

        // Add Spin
        state.current.rotVel.set(
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
        )
    }

    useFrame((_, delta) => {
        if (!meshRef.current) return

        const time = _.clock.getElapsedTime()
        let targetPos = new THREE.Vector3()
        let targetRot = new THREE.Quaternion()

        // 1. Calculate Target Position (Home)
        if (isAssembling) {
            const GAP = 0.05
            targetPos.set(
                position[0] * (CUBE_SIZE + GAP),
                position[1] * (CUBE_SIZE + GAP),
                position[2] * (CUBE_SIZE + GAP)
            )
            targetRot.identity()
        } else {
            // Orbit Logic
            const angle = time * ORBIT_SPEED + randomOffset.phase
            targetPos.set(
                Math.sin(angle) * ORBIT_RADIUS * 0.8 + randomOffset.x,
                Math.cos(angle * 0.9) * ORBIT_RADIUS * 0.8 + randomOffset.y,
                Math.sin(angle * 0.5) * 1.0 + randomOffset.z
            )
            // Gentle continuous rotation target
            targetRot.setFromEuler(new THREE.Euler(time * 0.2, time * 0.1, 0))
        }

        // 2. Dynamic Physics Properties
        const params = isAssembling ? PHYSICS_ASSEMBLED : PHYSICS_DISPERSED

        // Force = (Target - Current) * SpringK
        // Force Calculation
        if (params.SPRING > 0) {
            const force = new THREE.Vector3().subVectors(targetPos, state.current.pos).multiplyScalar(params.SPRING)
            state.current.vel.add(force)
        } else {
            // EXPLOSION LOGIC
            const dist = state.current.pos.length()
            if (dist < ORBIT_RADIUS) {
                const pushDir = state.current.pos.clone().normalize()
                if (pushDir.lengthSq() < 0.1) pushDir.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
                state.current.vel.add(pushDir.multiplyScalar(0.05)) // Strong push
            }
            // Safety
            if (dist > MAX_DIST) {
                state.current.vel.add(state.current.pos.clone().normalize().multiplyScalar(-0.01))
            }
        }


        // Apply Damping (Friction)
        state.current.vel.multiplyScalar(params.DAMPING)

        // Update Position
        state.current.pos.add(state.current.vel)

        // 3. Rotation Physics
        if (state.current.rotVel.length() > 0.001) {
            const rotEuler = new THREE.Euler(
                state.current.rotVel.x * delta,
                state.current.rotVel.y * delta,
                state.current.rotVel.z * delta
            )
            const dq = new THREE.Quaternion().setFromEuler(rotEuler)
            state.current.rot.multiply(dq)
            state.current.rotVel.multiplyScalar(params.DAMPING) // Slow down spin
        } else {
            state.current.rot.slerp(targetRot, isAssembling ? 0.2 : 0.05)
        }

        // Apply to Mesh
        meshRef.current.position.copy(state.current.pos)
        meshRef.current.quaternion.copy(state.current.rot)
    })

    return (
        <group>
            {/* HITBOX HELPER (Invisible but larger for easier interaction) */}
            <mesh
                ref={meshRef}
                onPointerOver={handlePointerOver}
            >
                <boxGeometry args={[CUBE_SIZE * 1.4, CUBE_SIZE * 1.4, CUBE_SIZE * 1.4]} />
                <meshBasicMaterial visible={false} />

                {/* VISUAL MESH (Child of Physics Mesh) */}
                <RoundedBox
                    args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]}
                    radius={0.06}
                    smoothness={4}
                >
                    <meshStandardMaterial
                        color={isOrange ? COLOR_ORANGE : COLOR_BLUE}
                        roughness={0.7}
                        metalness={0.1}
                        envMapIntensity={1}
                    />
                </RoundedBox>
            </mesh>
        </group>
    )
}

function Scene({ isAssembling }: { isAssembling: boolean }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (groupRef.current && isAssembling) {
            groupRef.current.rotation.y += 0.2 * delta
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        } else if (groupRef.current) {
            groupRef.current.rotation.y += 0.05 * delta
        }
    })

    const cubes = useMemo(() => {
        const arr: { pos: [number, number, number], isOrange: boolean }[] = []
        const range = [-1, 0, 1]
        range.forEach(x => range.forEach(y => range.forEach(z => {
            const absSum = Math.abs(x) + Math.abs(y) + Math.abs(z)
            const isCenterFace = absSum === 1
            arr.push({ pos: [x, y, z] as [number, number, number], isOrange: isCenterFace })
        })))
        return arr
    }, [])

    return (
        <group>
            <Environment preset="studio" />
            <group ref={groupRef}>
                {cubes.map((item, i) => (
                    <Fragment
                        key={i}
                        position={item.pos}
                        isAssembling={isAssembling}
                        isOrange={item.isOrange}
                    />
                ))}
            </group>
        </group>
    )
}

export function HeroCube({ isAssembling }: { isAssembling: boolean }) {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 9], fov: 45 }}
                style={{ pointerEvents: 'auto' }}
                gl={{ preserveDrawingBuffer: true, alpha: true }}
            >
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1.5} color="#ffffff" />

                <Suspense fallback={null}>
                    <group position={[2.5, 0, 0]}>
                        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                            <Scene isAssembling={isAssembling} />
                        </Float>
                    </group>
                </Suspense>
            </Canvas>
        </div>
    )
}
