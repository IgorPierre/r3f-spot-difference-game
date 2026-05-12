import { useStore } from '../store/store.js';

export default function GameOverlay() {
    const {
        selectedScene,
        gameStarted,
        foundDifferences,
        differences,
        markers,
        returnToScenePicker,
        backToMemorize,
        submitMarkers,
        clearMarkers,
    } = useStore();

    const total = differences[selectedScene]?.length ?? 0;
    const found = foundDifferences.length;

    return (
        <>
            <div className="pointer-events-none fixed left-1/2 top-20 z-10 w-[min(92vw,28rem)] -translate-x-1/2 rounded-2xl border border-white/25 bg-slate-900/55 px-4 py-3 text-center text-white shadow-lg backdrop-blur-md">
                {!gameStarted ? (
                    <p className="pointer-events-none text-sm leading-relaxed">
                        Arraste para girar a cena e role para aproximar. Memorize os detalhes e use{' '}
                        <span className="font-semibold text-amber-300">Iniciar desafio</span>. Três objetos somem.
                    </p>
                ) : (
                    <>
                        <p className="pointer-events-none text-sm leading-relaxed">
                            <span className="font-semibold text-amber-300">Shift</span> ou{' '}
                            <span className="font-semibold text-amber-300">Alt</span> + clique no lugar onde acha
                            que sumiu (até 3 marcas). Também pode usar{' '}
                            <span className="font-semibold text-amber-300">duplo clique</span> no lugar. Depois{' '}
                            <span className="font-semibold text-amber-300">Conferir</span>.
                        </p>
                        <p className="pointer-events-none mt-2 text-base font-medium tabular-nums">
                            Acertos: {found} / {total} — marcas: {markers.length} / 3
                        </p>
                    </>
                )}
            </div>

            <div className="pointer-events-auto fixed bottom-6 left-1/2 z-10 flex max-w-[95vw] -translate-x-1/2 flex-wrap items-center justify-center gap-2">
                {gameStarted && (
                    <>
                        <button
                            type="button"
                            className="rounded-xl border border-amber-400/80 bg-amber-500 px-4 py-2 text-sm font-semibold text-amber-950 shadow hover:bg-amber-400"
                            onClick={submitMarkers}
                        >
                            Conferir
                        </button>
                        <button
                            type="button"
                            className="rounded-xl border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/25"
                            onClick={clearMarkers}
                        >
                            Limpar marcas
                        </button>
                        <button
                            type="button"
                            className="rounded-xl border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/25"
                            onClick={backToMemorize}
                        >
                            Memorizar de novo
                        </button>
                    </>
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
