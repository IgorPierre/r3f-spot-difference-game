import { create } from 'zustand';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearWorldAnchors, getWorldAnchors } from './worldAnchors.js';

const HIT_TOLERANCE = {
    LightHouse: 0.28,
    WheatFarm: 0.55,
    WesternDiorama: 0.35,
};

function distSq(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
}

export const useStore = create((set, get) => ({
    gameStarted: false,
    selectedScene: null,
    foundDifferences: [],
    /** Até 3 marcas [[x,y,z], ...] */
    markers: [],
    differences: {
        LightHouse: ['diff1', 'diff2', 'diff3'],
        WheatFarm: ['diffA', 'diffB', 'diffC'],
        WesternDiorama: ['diffX', 'diffY', 'diffZ'],
    },

    selectScene: (scene) => {
        clearWorldAnchors();
        set({ selectedScene: scene, gameStarted: false, foundDifferences: [], markers: [] });
    },

    returnToScenePicker: () => {
        clearWorldAnchors();
        set({ selectedScene: null, gameStarted: false, foundDifferences: [], markers: [] });
    },

    backToMemorize: () => {
        clearWorldAnchors();
        set({ gameStarted: false, foundDifferences: [], markers: [] });
    },

    startGame: () => {
        clearWorldAnchors();
        set({ gameStarted: true, foundDifferences: [], markers: [] });
    },

    addMarker: (point) =>
        set((state) => {
            if (!state.gameStarted) return state;
            if (state.markers.length >= 3) return state;
            const p = [point.x, point.y, point.z];
            return { markers: [...state.markers, p] };
        }),

    clearMarkers: () => set({ markers: [] }),

    submitMarkers: () => {
        const state = get();
        if (!state.gameStarted) return;

        const ids = state.differences[state.selectedScene] ?? [];
        const tol = HIT_TOLERANCE[state.selectedScene] ?? 0.35;
        const tolSq = tol * tol;
        const anchors = getWorldAnchors();
        const markers = state.markers;

        if (markers.length === 0) {
            toast.info('Marque pelo menos um lugar (Shift ou Alt + clique, ou duplo clique).', { theme: 'colored' });
            return;
        }

        const newFound = [...state.foundDifferences];
        const usedMarkerIdx = new Set();

        for (const id of ids) {
            if (newFound.includes(id)) continue;
            const anchor = anchors[id];
            if (!anchor) continue;

            let bestI = -1;
            let bestD = Infinity;
            markers.forEach((m, i) => {
                if (usedMarkerIdx.has(i)) return;
                const d = distSq(m, anchor);
                if (d < bestD) {
                    bestD = d;
                    bestI = i;
                }
            });

            if (bestI >= 0 && bestD <= tolSq) {
                usedMarkerIdx.add(bestI);
                newFound.push(id);
            }
        }

        const newHitsCount = newFound.length - state.foundDifferences.length;
        const wrongCount = markers.length - usedMarkerIdx.size;
        const total = ids.length;
        const becameComplete = newFound.length === total && total > 0;

        if (becameComplete) {
            toast.success('Parabéns! Você encontrou todos os erros neste cenário.', {
                position: 'top-center',
                autoClose: 2800,
                theme: 'colored',
            });
            setTimeout(() => set({ gameStarted: false }), 650);
        } else {
            if (newHitsCount === 0 && wrongCount > 0) {
                toast.error('Nenhum X no lugar certo. Tente de novo.', { theme: 'colored' });
            } else if (newHitsCount > 0 && wrongCount > 0) {
                toast.warning(`Acertou ${newHitsCount} lugar(es). ${wrongCount} X fora do alvo.`, {
                    theme: 'colored',
                });
            } else if (newHitsCount > 0) {
                toast.success(
                    newHitsCount === 1 ? 'Acertou um lugar!' : `Acertou ${newHitsCount} lugares!`,
                    { theme: 'colored' },
                );
            }
        }

        set({ foundDifferences: newFound, markers: [] });
    },
}));
