import { useLayoutEffect, useRef } from 'react';
import { useStore } from '../store/store.js';
import { LightHouse } from './LightHouse';
import { WheatFarm } from './WheatFarm';
import { WesternDiorama } from './WesternDiorama';
import { Environment, OrbitControls } from '@react-three/drei';
import { ScenePointerPlacer, MarkersVisual } from './SceneMarkers.jsx';

export const Experience = () => {
    const { selectedScene } = useStore();
    const sunRef = useRef(null);

    useLayoutEffect(() => {
        const light = sunRef.current;
        if (!light?.shadow?.camera) return;
        const cam = light.shadow.camera;
        cam.near = 0.5;
        cam.far = 160;
        const extent = 42;
        cam.left = -extent;
        cam.right = extent;
        cam.top = extent;
        cam.bottom = -extent;
        cam.updateProjectionMatrix();
    }, [selectedScene]);

    return (
        <>
            <color attach="background" args={['#87b8e8']} />
            {/* IBL: materiais PBR (glTF) ganham reflexos e “volume” como no Sketchfab */}
            <Environment preset="park" environmentIntensity={0.65} />
            <hemisphereLight args={['#d4ecff', '#3d3530', 0.42]} />
            <ambientLight intensity={0.18} />
            <directionalLight
                ref={sunRef}
                castShadow
                position={[12, 22, 14]}
                intensity={1.9}
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.00028}
                shadow-normalBias={0.035}
            />
            <OrbitControls
                makeDefault
                enablePan
                enableDamping
                dampingFactor={0.08}
                minDistance={1.2}
                maxDistance={22}
                maxPolarAngle={Math.PI * 0.49}
            />
            {selectedScene === 'LightHouse' && (
                <>
                    <ScenePointerPlacer />
                    <MarkersVisual />
                    <LightHouse />
                </>
            )}
            {selectedScene === 'WheatFarm' && (
                <>
                    <ScenePointerPlacer />
                    <MarkersVisual />
                    <WheatFarm />
                </>
            )}
            {selectedScene === 'WesternDiorama' && (
                <>
                    <ScenePointerPlacer />
                    <MarkersVisual />
                    <WesternDiorama />
                </>
            )}
        </>
    );
};
