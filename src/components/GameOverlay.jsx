import { useEffect, useState } from 'react';
import { useStore, DIFF_POOL, ROUND_SIZE } from '../store/store.js';

export default function GameOverlay() {
    const {
        selectedScene,
        gameStarted,
        foundDifferences,
        activeHiddenIds,
        returnToScenePicker,
        backToMemorize,
    } = useStore();

    const [hintVisible, setHintVisible] = useState(true);

    useEffect(() => {
        setHintVisible(true);
    }, [selectedScene]);

    const poolSize = DIFF_POOL[selectedScene]?.length ?? ROUND_SIZE;
    const roundTarget = activeHiddenIds.length || ROUND_SIZE;
    const found = foundDifferences.length;

    return (
        <>
            {!hintVisible && (
                <button
                    type="button"
                    aria-label="Mostrar dicas do jogo"
                    className="pointer-events-auto fixed right-4 top-20 z-10 rounded-full border border-white/35 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md hover:bg-slate-800/85"
                    onClick={() => setHintVisible(true)}
                >
                    Ajuda
                </button>
            )}

            {hintVisible && (
                <div className="pointer-events-auto fixed left-1/2 top-20 z-10 w-[min(92vw,28rem)] -translate-x-1/2 rounded-2xl border border-white/25 bg-slate-900/55 pt-9 pb-3 pl-4 pr-4 text-center text-white shadow-lg backdrop-blur-md">
                    <button
                        type="button"
                        aria-label="Fechar dicas"
                        className="absolute right-2 top-2 rounded-lg border border-white/30 bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
                        onClick={() => setHintVisible(false)}
                    >
                        ×
                    </button>
                    {!gameStarted ? (
                        <p className="text-sm leading-relaxed">
                            Arraste para girar e role para aproximar. Há <span className="font-semibold text-amber-300">{poolSize}</span>{' '}
                            objetos que podem sumir; em cada rodada <span className="font-semibold text-amber-300">{ROUND_SIZE}</span> são
                            escolhidos <span className="font-semibold text-amber-300">ao acaso</span>. Use{' '}
                            <span className="font-semibold text-amber-300">Iniciar desafio</span> e clique onde faltou algo.
                        </p>
                    ) : (
                        <p className="text-base font-medium tabular-nums">
                            Encontrados nesta rodada: {found} / {roundTarget}
                        </p>
                    )}
                </div>
            )}

            <div className="pointer-events-auto fixed bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-2">
                {gameStarted && (
                    <button
                        type="button"
                        className="rounded-xl border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/25"
                        onClick={backToMemorize}
                    >
                        Memorizar de novo
                    </button>
                )}
                <button
                    type="button"
                    className="rounded-xl border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/25"
                    onClick={returnToScenePicker}
                >
                    Trocar cenário
                </button>
            </div>
        </>
    );
}
