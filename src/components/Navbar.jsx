import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import SignatureMark from './SignatureMark.jsx'

const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="navbar">
            <NavLink to="/" className="navbar__brand" end onClick={() => setOpen(false)}>
                <SignatureMark size="small" />
                <span className="navbar__brand-text">
                    True Mark
                    <small>Tattoo Studio</small>
                </span>
            </NavLink>

            <button
                type="button"
                className={`navbar__toggle ${open ? 'navbar__toggle--open' : ''}`}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
            >
                <span />
                <span />
                <span />
            </button>

            <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === '/'}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}