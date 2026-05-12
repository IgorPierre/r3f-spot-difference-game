export default function DefaultButton({ onClick, text, variant = 'primary' }) {
    const base =
        'z-20 rounded-2xl border-2 px-5 py-2.5 text-lg font-semibold shadow-lg transition hover:scale-[0.98] active:scale-95';

    const styles =
        variant === 'ghost'
            ? `${base} absolute top-6 right-6 border-white/40 bg-white/10 text-white backdrop-blur-sm`
            : `${base} absolute top-6 left-6 border-amber-900/30 bg-amber-500 text-amber-950`;

    return (
        <button type="button" className={styles} onClick={onClick}>
            {text}
        </button>
    );
}
