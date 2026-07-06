import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const upcomingAppointments = [
    { id: 1, artist: 'Mara Voss', date: 'Aug 02, 2026', time: '14:00', type: 'Custom consult', status: 'Confirmed' },
    { id: 2, artist: 'Theo Banks', date: 'Aug 15, 2026', time: '11:30', type: 'Session — forearm piece', status: 'Pending' },
]

const pastAppointments = [
    { id: 3, artist: 'Mara Voss', date: 'Jun 10, 2026', time: '13:00', type: 'Flash piece — crescent moon', status: 'Completed' },
    { id: 4, artist: 'Mara Voss', date: 'Mar 22, 2026', time: '10:00', type: 'Touch-up', status: 'Completed' },
]

const statusClass = { Confirmed: 'badge--green', Pending: 'badge--amber', Completed: 'badge--muted' }

export default function Dashboard() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('upcoming')

    function handleLogout() {
        logout()
        navigate('/')
    }

    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : '?'

    return (
        <section className="section container dashboard">

            {/* Sidebar */}
            <aside className="dash-sidebar">
                <div className="dash-avatar">{initials}</div>
                <h2 className="dash-name">{user?.name}</h2>
                <p className="dash-email">{user?.email}</p>
                <p className="dash-joined">
                    Member since {new Date(user?.joinedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                </p>

                <nav className="dash-nav">
                    <button
                        type="button"
                        className={`dash-nav__link ${activeTab === 'upcoming' ? 'dash-nav__link--active' : ''}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        Upcoming
                    </button>
                    <button
                        type="button"
                        className={`dash-nav__link ${activeTab === 'history' ? 'dash-nav__link--active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        History
                    </button>
                    <button
                        type="button"
                        className={`dash-nav__link ${activeTab === 'profile' ? 'dash-nav__link--active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
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

                        {upcomingAppointments.length === 0 ? (
                            <div className="dash-empty">
                                <p>No upcoming appointments.</p>
                                <Link to="/contact" className="btn btn--ghost" style={{ marginTop: '1rem' }}>
                                    Book your first session
                                </Link>
                            </div>
                        ) : (
                            <div className="appointment-list">
                                {upcomingAppointments.map((appt) => (
                                    <div className="appointment-card" key={appt.id}>
                                        <div className="appointment-card__date-block">
                                            <span className="appointment-card__day">{appt.date.split(' ')[1].replace(',', '')}</span>
                                            <span className="appointment-card__month">{appt.date.split(' ')[0]}</span>
                                        </div>
                                        <div className="appointment-card__body">
                                            <p className="appointment-card__type">{appt.type}</p>
                                            <p className="appointment-card__meta">{appt.artist} · {appt.time}</p>
                                        </div>
                                        <span className={`badge ${statusClass[appt.status]}`}>{appt.status}</span>
                                    </div>
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

                        {pastAppointments.length === 0 ? (
                            <div className="dash-empty">
                                <p>No past visits yet.</p>
                            </div>
                        ) : (
                            <div className="appointment-list">
                                {pastAppointments.map((appt) => (
                                    <div className="appointment-card appointment-card--muted" key={appt.id}>
                                        <div className="appointment-card__date-block">
                                            <span className="appointment-card__day">{appt.date.split(' ')[1].replace(',', '')}</span>
                                            <span className="appointment-card__month">{appt.date.split(' ')[0]}</span>
                                        </div>
                                        <div className="appointment-card__body">
                                            <p className="appointment-card__type">{appt.type}</p>
                                            <p className="appointment-card__meta">{appt.artist} · {appt.time}</p>
                                        </div>
                                        <span className={`badge ${statusClass[appt.status]}`}>{appt.status}</span>
                                    </div>
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
                                <span className="profile-field__value">{user?.name}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field__label">Email</span>
                                <span className="profile-field__value">{user?.email}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field__label">Member since</span>
                                <span className="profile-field__value">
                                    {new Date(user?.joinedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field__label">Visits</span>
                                <span className="profile-field__value">{pastAppointments.length} completed</span>
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