import { useLayoutEffect, useRef } from 'react';
import { useStore } from '../store/store.js';
import { LightHouse } from './LightHouse';
import { WheatFarm } from './WheatFarm';
import { WesternDiorama } from './WesternDiorama';
import { Environment, OrbitControls } from '@react-three/drei';
import { getAtmosphere } from '../constants/sceneAtmosphere.js';

export const Experience = () => {
    const { selectedScene } = useStore();
    const sunRef = useRef(null);
    const atm = getAtmosphere(selectedScene);

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
            <color attach="background" args={[atm.background]} key={selectedScene} />
            <Environment preset={atm.envPreset} environmentIntensity={atm.envIntensity} key={`${selectedScene}-env`} />
            <hemisphereLight args={atm.hemisphere} />
            <ambientLight intensity={atm.ambientIntensity ?? 0.18} />
            <directionalLight
                ref={sunRef}
                castShadow
                position={atm.sunPosition}
                color={atm.sunColor}
                intensity={atm.sunIntensity}
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
            {selectedScene === 'LightHouse' && <LightHouse />}
            {selectedScene === 'WheatFarm' && <WheatFarm />}
            {selectedScene === 'WesternDiorama' && <WesternDiorama />}
        </>
    );
};
