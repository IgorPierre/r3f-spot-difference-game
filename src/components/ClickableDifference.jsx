import { useRef } from 'react';
import { useStore } from '../store/store.js';

export function ClickableDifference({ position, id }) {
    const meshRef = useRef();
    const { foundDifferences, markDifferenceFound, gameStarted } = useStore();

    const handleClick = () => {
        if (!foundDifferences.includes(id)) {
            markDifferenceFound(id);
        }
    };

    return (
        <mesh
            ref={meshRef}
            position={position}
            onClick={handleClick}
            visible={gameStarted && !foundDifferences.includes(id)}
        >
        <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial
                color="red"
                opacity={gameStarted && !foundDifferences.includes(id) ? 0 : 1}
                transparent
            />
        </mesh>
    );
}
