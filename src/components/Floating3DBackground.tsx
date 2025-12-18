'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingMesh({ position, color, speed, distort, type }: { position: [number, number, number], color: string, speed: number, distort: number, type?: 'sphere' | 'torus' | 'icosahedron' }) {
    return (
        <Float speed={speed} rotationIntensity={2} floatIntensity={1.5}>
            <mesh position={position}>
                {type === 'torus' ? (
                    <torusGeometry args={[1, 0.4, 16, 100]} />
                ) : type === 'icosahedron' ? (
                    <icosahedronGeometry args={[1, 0]} />
                ) : (
                    <sphereGeometry args={[1, 64, 64]} />
                )}
                <MeshDistortMaterial
                    color={color}
                    speed={speed}
                    distort={distort}
                    radius={1}
                    transparent
                    opacity={0.2}
                />
            </mesh>
        </Float>
    );
}

export default function Floating3DBackground({ variant = 'default' }: { variant?: 'default' | 'experience' }) {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
                <pointLight position={[-10, -10, -10]} color="#38bdf8" intensity={0.5} />

                {variant === 'experience' ? (
                    <>
                        <FloatingMesh position={[-7, 5, -5]} color="#38bdf8" speed={1} distort={0.2} type="torus" />
                        <FloatingMesh position={[8, -2, -3]} color="#818cf8" speed={1.5} distort={0.3} type="torus" />
                    </>
                ) : (
                    <>
                        <FloatingMesh position={[-5, 3, -2]} color="#38bdf8" speed={1.5} distort={0.3} />
                        <FloatingMesh position={[6, -4, -1]} color="#818cf8" speed={2} distort={0.4} />
                        <FloatingMesh position={[-2, -5, -3]} color="#f472b6" speed={1.2} distort={0.5} />
                    </>
                )}
            </Canvas>
        </div>
    );
}
