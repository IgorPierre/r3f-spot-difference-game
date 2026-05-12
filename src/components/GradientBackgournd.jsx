import * as THREE from 'three';

export default function GradientBackground() {
    return (
        <mesh position={[0, 0, -10]} scale={[50, 50, 1]}>
            <planeGeometry args={[50, 50]} />
            <meshBasicMaterial color={new THREE.Color('#FF4500')} />
        </mesh>
    );
}
