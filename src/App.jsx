import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Experience } from './components/Experience';
import { useStore } from './store/store.js';
import DefaultButton from './components/DefaultButton.jsx';
import SceneSelection from './pages/SceneSelection.jsx';
import GameOverlay from './components/GameOverlay.jsx';
import { ToastContainer } from 'react-toastify';
import { getAtmosphere } from './constants/sceneAtmosphere.js';

function App() {
    const { startGame, gameStarted, selectedScene } = useStore();

    const primaryLabel = gameStarted ? 'Reiniciar rodada' : 'Iniciar desafio';
    const shellStyle = selectedScene ? { background: getAtmosphere(selectedScene).shellGradient } : undefined;

    return (
        <div
            className={`relative h-screen w-screen ${selectedScene ? '' : 'bg-gradient-to-t from-[#D5E5F2] to-[#3B82BF]'}`}
            style={shellStyle}
        >
            <ToastContainer position="top-center" theme="colored" />
            {!selectedScene ? (
                <SceneSelection />
            ) : (
                <>
                    <DefaultButton onClick={startGame} text={primaryLabel} />
                    <GameOverlay />
                    <Canvas
                        shadows
                        className="touch-none"
                        gl={{ antialias: true, alpha: false }}
                        camera={{ position: [3, 3, 3], fov: 32, near: 0.1, far: 200 }}
                        onCreated={({ gl }) => {
                            gl.outputColorSpace = THREE.SRGBColorSpace;
                            gl.toneMapping = THREE.ACESFilmicToneMapping;
                            gl.toneMappingExposure = 1.05;
                            gl.shadowMap.type = THREE.PCFSoftShadowMap;
                        }}
                    >
                        <Experience />
                    </Canvas>
                </>
            )}
        </div>
    );
}

export default App;
