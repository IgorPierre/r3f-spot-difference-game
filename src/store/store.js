import { create } from 'zustand';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DIFF_POOL = {
    LightHouse: ['diff1', 'diff2', 'diff3', 'diff4', 'diff5'],
    WheatFarm: ['diffA', 'diffB', 'diffC', 'diffD', 'diffE'],
    WesternDiorama: ['diffX', 'diffY', 'diffZ', 'diffW', 'diffV'],
};

export const ROUND_SIZE = 3;

function pickRandomSubset(ids, n) {
    const copy = [...ids];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(n, copy.length));
}

export const useStore = create((set, get) => ({
    gameStarted: false,
    selectedScene: null,
    foundDifferences: [],
    activeHiddenIds: [],

    selectScene: (scene) =>
        set({
            selectedScene: scene,
            gameStarted: false,
            foundDifferences: [],
            activeHiddenIds: [],
        }),

    returnToScenePicker: () =>
        set({
            selectedScene: null,
            gameStarted: false,
            foundDifferences: [],
            activeHiddenIds: [],
        }),

    backToMemorize: () =>
        set({
            gameStarted: false,
            foundDifferences: [],
            activeHiddenIds: [],
        }),

    startGame: () => {
        const scene = get().selectedScene;
        const pool = DIFF_POOL[scene] ?? [];
        const activeHiddenIds = pickRandomSubset(pool, ROUND_SIZE);
        set({ gameStarted: true, foundDifferences: [], activeHiddenIds });
    },

    markDifferenceFound: (id) => {
        set((state) => {
            if (!state.gameStarted) return state;
            if (!state.activeHiddenIds.includes(id)) return state;
            if (state.foundDifferences.includes(id)) return state;

            const updatedDifferences = [...state.foundDifferences, id];
            const target = state.activeHiddenIds.length;

            if (updatedDifferences.length === target && target > 0) {
                toast.success('Parabéns! Você encontrou os três erros desta rodada!', {
                    position: 'top-center',
                    autoClose: 2800,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                });

                setTimeout(() => {
                    set({ gameStarted: false });
                }, 600);
            }

            return { foundDifferences: updatedDifferences };
        });
    },
}));
