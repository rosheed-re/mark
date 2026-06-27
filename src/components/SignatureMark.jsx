export default function SignatureMark({ size = 'default', className = '' }) {
    return (
        <svg
            className={`signature-mark signature-mark--${size} ${className}`}
            viewBox="0 0 200 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                className="signature-mark__line"
                d="M6,58 C34,18 56,82 92,38 C118,6 138,66 168,34 C178,23 182,30 178,40"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />
            <circle className="signature-mark__dot" cx="178" cy="40" r="4" fill="currentColor" />
        </svg>
    )
}