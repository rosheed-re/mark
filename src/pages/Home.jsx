import { Link } from 'react-router-dom'
import SignatureMark from '../components/SignatureMark.jsx'
import { AnchorIcon, DaggerIcon, MoonIcon } from '../components/FlashIcons.jsx'

const steps = [
    { label: 'Consult', body: 'We talk placement, size, and style — and turn it into a real design.' },
    { label: 'Stencil', body: 'Your design gets transferred to skin so you can see it before a single line goes in.' },
    { label: 'Session', body: 'One sitting for small work, scheduled sessions for anything larger.' },
    { label: 'Aftercare', body: 'Clear instructions, and a free touch-up if anything needs it.' },
]

const focus = [
    { icon: AnchorIcon, title: 'Custom pieces', body: 'Original designs built around your idea, sized and placed to fit your body.' },
    { icon: DaggerIcon, title: 'Fine line & blackwork', body: 'Precise single-needle line work and solid black saturation, no shortcuts.' },
    { icon: MoonIcon, title: 'Flash day', body: 'First Saturday of the month — walk in, pick a pre-drawn design, walk out marked.' },
]

export default function Home() {
    return (
        <>
            <section className="hero">
                <img
                    className="hero__img"
                    src="https://picsum.photos/seed/truemark-hero/1920/1080?grayscale"
                    alt="Close-up of finished tattoo work at True Mark studio"
                />
                <div className="hero__overlay" />
                <div className="hero__content container">
                    <SignatureMark className="hero__mark-small" />
                    <p className="eyebrow eyebrow--light">Custom tattoo studio</p>
                    <h1 className="hero__title">True Mark</h1>
                    <p className="hero__tagline">Precision. Passion. Permanence.</p>
                    <div className="hero__actions">
                        <Link to="/contact" className="btn btn--primary">Book your session</Link>
                        <Link to="/portfolio" className="btn btn--ghost btn--ghost-light">See the portfolio</Link>
                    </div>
                </div>
            </section>

            <section className="section container">
                <p className="eyebrow">Welcome</p>
                <h2>True Mark Tattoo Studio</h2>
                <p className="page-lede">
                    Where every line tells a story. Our studio is dedicated to creating
                    meaningful, high-quality tattoos with the utmost care and
                    professionalism.
                </p>
                <div className="work-grid">
                    <img src="https://picsum.photos/seed/truemark-1/600/750?grayscale" alt="Recent fine line tattoo — placeholder photo" />
                    <img src="https://picsum.photos/seed/truemark-2/600/750?grayscale" alt="Recent blackwork tattoo — placeholder photo" />
                    <img src="https://picsum.photos/seed/truemark-3/600/750?grayscale" alt="Studio session in progress — placeholder photo" />
                </div>
                <Link to="/portfolio" className="btn btn--ghost">Explore our work</Link>
            </section>

            <section className="section container">
                <p className="eyebrow">What we do</p>
                <div className="focus-grid">
                    {focus.map(({ icon: Icon, title, body }) => (
                        <div className="card" key={title}>
                            <Icon className="card__icon" />
                            <h3>{title}</h3>
                            <p>{body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section container steps">
                <p className="eyebrow">How a session works</p>
                <ol className="steps__list">
                    {steps.map((step) => (
                        <li key={step.label}>
                            <span className="steps__label">{step.label}</span>
                            <p>{step.body}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="studio-banner">
                <img src="https://picsum.photos/seed/truemark-banner/1920/700?grayscale" alt="Inside the True Mark studio — placeholder photo" />
                <div className="studio-banner__overlay" />
                <p className="studio-banner__quote">
                    "A stencil is a promise — we don't rush a line we can't take back."
                </p>
            </section>

            <section className="section container cta-band">
                <h2>Got an idea you keep circling back to?</h2>
                <p>That one's worth a consult.</p>
                <Link to="/contact" className="btn btn--primary">Start the conversation</Link>
            </section>
        </>
    )
}