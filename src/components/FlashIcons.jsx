export function AnchorIcon(props) {
    return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="32" cy="10" r="6" />
            <line x1="32" y1="16" x2="32" y2="50" />
            <line x1="20" y1="24" x2="44" y2="24" />
            <path d="M10,38 C10,50 20,58 32,58 C44,58 54,50 54,38" />
        </svg>
    )
}

export function DaggerIcon(props) {
    return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="32" y1="6" x2="32" y2="42" />
            <path d="M16,18 L48,18 L32,30 Z" />
            <path d="M26,42 L38,42 L32,58 Z" />
        </svg>
    )
}

export function MoonIcon(props) {
    return (
        <svg viewBox="0 0 64 64" fill="currentColor" {...props}>
            <path d="M40,6 A26,26 0 1 0 40,58 A20,20 0 1 1 40,6 Z" />
        </svg>
    )
}