import { useStore } from '../store/store.js';

const scenes = [
    { id: 'LightHouse', title: 'Farol', hint: 'Costa e mar', color: 'from-sky-600 to-blue-800' },
    { id: 'WheatFarm', title: 'Fazenda', hint: 'Moinho e trigo', color: 'from-amber-600 to-orange-800' },
    { id: 'WesternDiorama', title: 'Cidade western', hint: 'Baixo poli', color: 'from-amber-900 to-stone-800' },
];

export default function SceneSelection() {
    const { selectScene } = useStore();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 pb-16 pt-10">
            <div className="max-w-lg text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md md:text-4xl">
                    Sete erros em 3D
                </h1>
                <p className="mt-3 text-base text-white/90 drop-shadow">
                    Escolha um cenário, observe com calma e, ao iniciar o desafio, clique nos três lugares em que
                    os objetos sumiram.
                </p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-3">
                {scenes.map(({ id, title, hint, color }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => selectScene(id)}
                        className={`flex w-full flex-col rounded-2xl border-2 border-white/25 bg-gradient-to-r ${color} px-5 py-4 text-left text-white shadow-lg transition hover:scale-[1.02] hover:border-white/50 active:scale-[0.99]`}
                    >
                        <span className="text-lg font-semibold">{title}</span>
                        <span className="text-sm text-white/80">{hint}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
