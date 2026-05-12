import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { useStore } from './store/store.js';
import DefaultButton from './components/DefaultButton.jsx';
import SceneSelection from './pages/SceneSelection.jsx';
import GameOverlay from './components/GameOverlay.jsx';
import { ToastContainer } from 'react-toastify';

function App() {
    const { startGame, gameStarted, selectedScene } = useStore();

    const primaryLabel = gameStarted ? 'Reiniciar rodada' : 'Iniciar desafio';

    return (
        <div className="relative h-screen w-screen bg-gradient-to-t from-[#D5E5F2] to-[#3B82BF]">
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
                    >
                        <Experience />
                    </Canvas>
                </>
            )}
        </div>
    );
}

export default App;
