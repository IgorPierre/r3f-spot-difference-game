import { useStore } from '../store/store.js';

const REPO_URL = 'https://github.com/IgorPierre/r3f-spot-difference-game';

function GitHubIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.463 2 11.97c0 4.407 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.337-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 11.97C22 6.463 17.522 2 12 2z"
            />
        </svg>
    );
}

function StarIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );
}

const scenes = [
    {
        id: 'LightHouse',
        title: 'Farol',
        difficulty: 'Fácil',
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
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">SpotDifference Game</h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                    Escolha um cenário e tente memorizá-lo.
                    A cada rodada, três objetos somem — clique onde faltou algo!
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

            <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir o repositório do projeto no GitHub"
                className="mt-10 flex max-w-2xl items-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 px-6 py-4 outline-none transition hover:bg-slate-100 focus-visible:ring-4 focus-visible:ring-slate-400/40 dark:border-neutral-700 dark:hover:bg-neutral-800/30"
            >
                <span className="flex shrink-0 items-center" aria-hidden>
                    <GitHubIcon className="h-5 w-5 text-slate-800 dark:text-neutral-200" />
                    <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-700 dark:text-yellow-700" />
                </span>
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-200">
                    Deixe sua estrela no nosso repositório!
                </span>
            </a>
        </div>
    );
}
