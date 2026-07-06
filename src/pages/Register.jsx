import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!form.name.trim()) {
            setError('Please enter your full name.')
            return
        }
        if (form.password !== form.confirm) {
            setError('Passwords do not match.')
            return
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters.')
            return
        }

        setLoading(true)
        setError('')

        try {
            const result = await register({
                name: form.name.trim(),
                email: form.email.trim(),
                password: form.password,
            })

            // Supabase returns a session immediately if email confirmation is OFF.
            // If email confirmation is ON, session will be null and user must verify first.
            if (result?.session) {
                navigate('/dashboard', { replace: true })
            } else {
                // Email confirmation is enabled — tell them to check their inbox
                setEmailSent(true)
            }
        } catch (err) {
            // Map common Supabase error messages to friendlier ones
            const msg = err.message || ''
            if (msg.includes('already registered') || msg.includes('already been registered')) {
                setError('An account with that email already exists. Try logging in instead.')
            } else if (msg.includes('invalid email')) {
                setError('Please enter a valid email address.')
            } else if (msg.includes('Password should')) {
                setError('Password must be at least 6 characters.')
            } else {
                setError(msg || 'Something went wrong. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    // Show confirmation notice if email verification is required
    if (emailSent) {
        return (
            <section className="section container auth-page">
                <div className="auth-card">
                    <div className="auth-card__header">
                        <p className="eyebrow">One more step</p>
                        <h1>Check your email</h1>
                    </div>
                    <p style={{ marginBottom: '1rem' }}>
                        We sent a confirmation link to <strong>{form.email}</strong>.
                        Click it to activate your account, then come back and log in.
                    </p>
                    <p style={{ fontSize: '0.88rem', color: 'var(--brass)' }}>
                        Didn't get it? Check your spam folder, or{' '}
                        <button
                            type="button"
                            className="auth-link"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}
                            onClick={() => setEmailSent(false)}
                        >
                            try again
                        </button>
                        .
                    </p>
                    <Link to="/login" className="btn btn--primary" style={{ marginTop: '1.4rem', display: 'inline-flex' }}>
                        Go to login
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <section className="section container auth-page">
            <div className="auth-card">
                <div className="auth-card__header">
                    <p className="eyebrow">Join the studio</p>
                    <h1>Create account</h1>
                    <p className="auth-card__sub">
                        Already have an account?{' '}
                        <Link to="/login" className="auth-link">Log in here</Link>
                    </p>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    {error && <p className="form-error">{error}</p>}

                    <label>
                        Full name
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            autoComplete="name"
                            placeholder="e.g. Alex Johnson"
                            required
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="email"
                            placeholder="you@example.com"
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            placeholder="At least 6 characters"
                            required
                        />
                    </label>

                    <label>
                        Confirm password
                        <input
                            type="password"
                            name="confirm"
                            value={form.confirm}
                            onChange={handleChange}
                            autoComplete="new-password"
                            placeholder="Repeat your password"
                            required
                        />
                    </label>

                    <button type="submit" className="btn btn--primary" disabled={loading}>
                        {loading ? 'Creating account…' : 'Create account'}
                    </button>
                </form>
            </div>
        </section>
    )
}