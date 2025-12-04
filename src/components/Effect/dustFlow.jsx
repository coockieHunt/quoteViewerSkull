import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function DustFlow({ particleCount = 1000 }) {
    const DustParticles = () => {
        const particlesRef = useRef();

        const particlesCount = particleCount;
        const particlesPosition = useMemo(() => {
            const positions = [];
            for (let i = 0; i < particlesCount; i++) {
                positions.push((Math.random() - 0.5) * 20);
                positions.push((Math.random() - 0.5) * 20);
                positions.push((Math.random() - 0.5) * 20);
            }
            return new Float32Array(positions);
        }, [particlesCount]);
            
        const circleTexture = useMemo(() => {
            const size = 64;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, size, size);
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = 'white';
            ctx.fill();
            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        }, []);

        useFrame(() => {
            if (particlesRef.current) {
                particlesRef.current.rotation.y += 0.001;
                particlesRef.current.rotation.x += 0.0005;
            }
        });

        return (
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particleCount}
                        array={particlesPosition}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.06}
                    sizeAttenuation={true}
                    color={new THREE.Color().setRGB(0.5, 0.5, 0.5)}
                    transparent={true}
                    map={circleTexture}
                    alphaTest={0.01}
                />
            </points>
                         
        );
    };

    return (
        <Canvas
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}
            camera={{ position: [0, 0, 10], fov: 75 }}>
            <DustParticles />
        </Canvas>
    );
}

export default DustFlow;