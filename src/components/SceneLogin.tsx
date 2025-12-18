'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

function CameraRig() {
    const { camera, pointer } = useThree();
    const vec = new THREE.Vector3();

    return useFrame(() => {
        // Smoothed parallax movement based on mouse pointer
        vec.set(pointer.x * 2, pointer.y * 2, camera.position.z);
        camera.position.lerp(vec, 0.05);
        camera.lookAt(0, 0, 0);
    });
}

function StarField({ count = 2000 }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 50;
            p[i * 3 + 1] = (Math.random() - 0.5) * 50;
            p[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        return p;
    }, [count]);

    const ref = useRef<THREE.Points>(null!);
    useFrame((state) => {
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    });

    return (
        <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#38bdf8"
                size={0.1}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
}

function MainStructure() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh ref={meshRef}>
                    <torusKnotGeometry args={[8, 2, 256, 32]} />
                    <meshStandardMaterial
                        color="#1e293b"
                        wireframe
                        transparent
                        opacity={0.15}
                    />
                </mesh>
            </Float>
            <mesh scale={15}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#0f172a"
                    speed={2}
                    distort={0.4}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
}

export default function SceneLogin() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, background: '#020617', pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#f472b6" />
                <spotLight position={[0, 5, 10]} intensity={1} />

                <CameraRig />
                <StarField count={3000} />
                <MainStructure />
            </Canvas>
        </div>
    );
}
