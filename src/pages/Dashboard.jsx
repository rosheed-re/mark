import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/supabase.js'

const statusClass = {
    Confirmed: 'badge--green',
    Pending: 'badge--amber',
    Completed: 'badge--muted',
    Cancelled: 'badge--muted',
}

export default function Dashboard() {
    const { user, profile, logout } = useAuth()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('upcoming')
    const [appointments, setAppointments] = useState([])
    const [apptLoading, setApptLoading] = useState(true)

    useEffect(() => {
        if (user) fetchAppointments()
    }, [user])

    async function fetchAppointments() {
        setApptLoading(true)
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (!error) setAppointments(data || [])
        setApptLoading(false)
    }

    async function handleLogout() {
        await logout()
        navigate('/')
    }

    const upcoming = appointments.filter((a) => ['Pending', 'Confirmed'].includes(a.status))
    const past = appointments.filter((a) => ['Completed', 'Cancelled'].includes(a.status))

    const name = profile?.name || user?.user_metadata?.name || 'Member'
    const email = profile?.email || user?.email || ''
    const joinedAt = profile?.joined_at || user?.created_at

    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return (
        <section className="section container dashboard">

            {/* Sidebar */}
            <aside className="dash-sidebar">
                <div className="dash-avatar">{initials}</div>
                <h2 className="dash-name">{name}</h2>
                <p className="dash-email">{email}</p>
                <p className="dash-joined">
                    Member since{' '}
                    {new Date(joinedAt).toLocaleDateString('en-GB', {
                        month: 'long',
                        year: 'numeric',
                    })}
                </p>

                <nav className="dash-nav">
                    {['upcoming', 'history', 'profile'].map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            className={`dash-nav__link ${activeTab === tab ? 'dash-nav__link--active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>

                <button type="button" className="btn btn--ghost dash-logout" onClick={handleLogout}>
                    Log out
                </button>
            </aside>

            {/* Main panel */}
            <div className="dash-main">

                {activeTab === 'upcoming' && (
                    <>
                        <div className="dash-main__header">
                            <div>
                                <p className="eyebrow">Dashboard</p>
                                <h2>Upcoming appointments</h2>
                            </div>
                            <Link to="/contact" className="btn btn--primary">Book a session</Link>
                        </div>

                        {apptLoading ? (
                            <div className="dash-empty"><p>Loading appointments…</p></div>
                        ) : upcoming.length === 0 ? (
                            <div className="dash-empty">
                                <p>No upcoming appointments yet.</p>
                                <Link to="/contact" className="btn btn--ghost" style={{ marginTop: '1rem' }}>
                                    Book your first session
                                </Link>
                            </div>
                        ) : (
                            <div className="appointment-list">
                                {upcoming.map((appt) => (
                                    <AppointmentCard key={appt.id} appt={appt} />
                                ))}
                            </div>
                        )}

                        <div className="dash-promo">
                            <img
                                src="https://picsum.photos/seed/truemark-dash/900/300?grayscale"
                                alt="Studio interior — placeholder photo"
                            />
                            <div className="dash-promo__overlay" />
                            <div className="dash-promo__content">
                                <p className="eyebrow eyebrow--light">Flash day</p>
                                <p>First Saturday of every month — walk in, walk out marked.</p>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'history' && (
                    <>
                        <div className="dash-main__header">
                            <div>
                                <p className="eyebrow">Dashboard</p>
                                <h2>Visit history</h2>
                            </div>
                        </div>

                        {apptLoading ? (
                            <div className="dash-empty"><p>Loading history…</p></div>
                        ) : past.length === 0 ? (
                            <div className="dash-empty"><p>No past visits recorded yet.</p></div>
                        ) : (
                            <div className="appointment-list">
                                {past.map((appt) => (
                                    <AppointmentCard key={appt.id} appt={appt} muted />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'profile' && (
                    <>
                        <div className="dash-main__header">
                            <div>
                                <p className="eyebrow">Dashboard</p>
                                <h2>Your profile</h2>
                            </div>
                        </div>

                        <div className="profile-grid">
                            <div className="profile-field">
                                <span className="profile-field__label">Name</span>
                                <span className="profile-field__value">{name}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field__label">Email</span>
                                <span className="profile-field__value">{email}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field__label">Member since</span>
                                <span className="profile-field__value">
                                    {new Date(joinedAt).toLocaleDateString('en-GB', {
                                        day: 'numeric', month: 'long', year: 'numeric',
                                    })}
                                </span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field__label">Total visits</span>
                                <span className="profile-field__value">{past.length} completed</span>
                            </div>
                        </div>

                        <div className="profile-note">
                            <p>Need to update your details or have a question about your account?</p>
                            <Link to="/contact" className="btn btn--ghost" style={{ marginTop: '0.8rem' }}>
                                Contact the studio
                            </Link>
                        </div>
                    </>
                )}

            </div>
        </section>
    )
}

function AppointmentCard({ appt, muted = false }) {
    const parts = appt.date.split(' ')
    const day = parts[1]?.replace(',', '') || appt.date
    const month = parts[0] || ''

    return (
        <div className={`appointment-card ${muted ? 'appointment-card--muted' : ''}`}>
            <div className="appointment-card__date-block">
                <span className="appointment-card__day">{day}</span>
                <span className="appointment-card__month">{month}</span>
            </div>
            <div className="appointment-card__body">
                <p className="appointment-card__type">{appt.type}</p>
                <p className="appointment-card__meta">{appt.artist} · {appt.time}</p>
            </div>
            <span className={`badge ${statusClass[appt.status] || 'badge--muted'}`}>{appt.status}</span>
        </div>
    )
}