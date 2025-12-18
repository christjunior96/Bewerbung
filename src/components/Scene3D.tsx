'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AnimatedSphere() {
    const sphereRef = useRef<THREE.Mesh>(null);

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1.5, 64, 64]}>
                <MeshDistortMaterial
                    color="#38bdf8"
                    speed={3}
                    distort={0.4}
                    radius={1}
                />
            </Sphere>
        </Float>
    );
}

function Blob() {
    return (
        <Float speed={1.4} rotationIntensity={1.5} floatIntensity={2}>
            <mesh position={[2, 1, -1]}>
                <sphereGeometry args={[0.8, 64, 64]} />
                <MeshWobbleMaterial color="#818cf8" speed={1} factor={0.6} />
            </mesh>
        </Float>
    );
}

function DecorativeDots() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
        }
    });

    const dots = Array.from({ length: 50 }).map((_, i) => ({
        position: [
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        ] as [number, number, number],
        size: Math.random() * 0.05
    }));

    return (
        <group ref={groupRef}>
            {dots.map((dot, i) => (
                <mesh key={i} position={dot.position}>
                    <sphereGeometry args={[dot.size, 16, 16]} />
                    <meshStandardMaterial color="#f472b6" transparent opacity={0.6} />
                </mesh>
            ))}
        </group>
    );
}

export default function Scene3D() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -10]} color="#f472b6" intensity={1} />

                <AnimatedSphere />
                <Blob />
                <DecorativeDots />

                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div >
    );
}
