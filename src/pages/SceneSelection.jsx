import { useStore } from '../store/store.js';

const scenes = [
    {
        id: 'LightHouse',
        title: 'Farol',
        difficulty: 'Normal',
        hint: 'Costa e mar',
        image: '/images/light-house.png',
    },
    {
        id: 'WheatFarm',
        title: 'Fazenda',
        difficulty: 'Normal',
        hint: 'Moinho e trigo',
        image: '/images/farm.png',
    },
    {
        id: 'WesternDiorama',
        title: 'Cidade western',
        difficulty: 'Normal',
        hint: 'Baixo poli',
        image: '/images/west.png',
    },
];

export default function SceneSelection() {
    const { selectScene } = useStore();

    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 px-4 py-10 md:py-14">
            <header className="mb-8 max-w-2xl text-center md:mb-12">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">Sete erros em 3D</h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                    Escolha uma missão. A cada rodada, <strong className="font-semibold text-slate-800">três</strong> objetos
                    somem, sorteados entre <strong className="font-semibold text-slate-800">cinco</strong> possíveis — clique
                    onde faltou algo.
                </p>
            </header>

            <div className="grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                {scenes.map(({ id, title, difficulty, hint, image }) => (
                    <button
                        key={id}
                        type="button"
                        aria-label={`Iniciar missão ${title}`}
                        onClick={() => selectScene(id)}
                        className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border-2 border-slate-300/90 bg-slate-300 text-left shadow-md outline-none ring-slate-400/0 transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg focus-visible:ring-4 focus-visible:ring-slate-500/40 sm:min-h-[300px] md:min-h-[340px]"
                    >
                        <span
                            aria-hidden
                            className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-105"
                            style={{ backgroundImage: `url(${image})` }}
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-900/35 to-transparent" />

                        <span className="relative mt-auto flex flex-col gap-1.5 p-4 pt-16 text-white md:p-5 md:pt-20">
                            <span className="inline-flex w-fit items-center rounded-md border border-white/25 bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/95 backdrop-blur-sm">
                                {difficulty}
                            </span>
                            <span className="text-xl font-bold tracking-tight drop-shadow md:text-2xl">{title}</span>
                            <span className="text-xs text-white/85 md:text-sm">{hint}</span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
