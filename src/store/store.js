import { create } from 'zustand';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useStore = create((set) => ({
    gameStarted: false,
    selectedScene: null,
    foundDifferences: [],
    differences: {
        LightHouse: ['diff1', 'diff2', 'diff3'],
        WheatFarm: ['diffA', 'diffB', 'diffC'],
        WesternDiorama: ['diffX', 'diffY', 'diffZ'],
    },

    selectScene: (scene) => set({ selectedScene: scene, gameStarted: false, foundDifferences: [] }),

    returnToScenePicker: () => set({ selectedScene: null, gameStarted: false, foundDifferences: [] }),

    /** Volta à fase de memorizar (cenário completo de novo). */
    backToMemorize: () => set({ gameStarted: false, foundDifferences: [] }),

    /** Inicia o desafio ou reinicia a rodada (mantém o modo “procurar”). */
    startGame: () => set({ gameStarted: true, foundDifferences: [] }),

    markDifferenceFound: (id) => {
        set((state) => {
            if (!state.gameStarted) return state;
            if (state.foundDifferences.includes(id)) return state;

            const updatedDifferences = [...state.foundDifferences, id];
            const totalDifferences = state.differences[state.selectedScene] ?? [];

            if (updatedDifferences.length === totalDifferences.length && totalDifferences.length > 0) {
                toast.success('Parabéns! Você encontrou todos os erros neste cenário.', {
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
