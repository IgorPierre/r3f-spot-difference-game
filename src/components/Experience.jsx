import { useStore } from '../store/store.js';
import { LightHouse } from './LightHouse';
import { WheatFarm } from './WheatFarm';
import { WesternDiorama } from './WesternDiorama';
import { OrbitControls } from '@react-three/drei';

export const Experience = () => {
    const { selectedScene } = useStore();

    return (
        <>
            <color attach="background" args={['#87b8e8']} />
            <ambientLight intensity={0.75} />
            <directionalLight castShadow intensity={1.85} position={[6, 12, 8]} />
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
