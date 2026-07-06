import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SignatureMark from './SignatureMark.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
    const { user, profile, logout } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    function handleLogout() {
        logout()
        setOpen(false)
        navigate('/')
    }

    // Use profile first, then fallback to user_metadata
    const displayName = profile?.name || user?.user_metadata?.name || user?.name || 'User'

    const initials = displayName
        ? displayName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : '??'

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
                {publicLinks.map((link) => (
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

                <div className="navbar__auth">
                    {user ? (
                        <>
                            <NavLink
                                to="/dashboard"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'navbar__link navbar__link--active navbar__dash-link'
                                        : 'navbar__link navbar__dash-link'
                                }
                            >
                                <span className="navbar__avatar">{initials}</span>
                                {user.name ? user.name.split(' ')[0] : 'User'}
                            </NavLink>
                            <button type="button" className="btn btn--ghost btn--sm" onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                                }
                            >
                                Log in
                            </NavLink>
                            <NavLink to="/register" onClick={() => setOpen(false)} className="btn btn--primary btn--sm">
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}