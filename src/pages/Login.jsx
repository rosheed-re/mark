import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/dashboard'

    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            login(form)
            navigate(from, { replace: true })
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="section container auth-page">
            <div className="auth-card">
                <div className="auth-card__header">
                    <p className="eyebrow">Welcome back</p>
                    <h1>Log in</h1>
                    <p className="auth-card__sub">
                        Don't have an account?{' '}
                        <Link to="/register" className="auth-link">Register here</Link>
                    </p>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    {error && <p className="form-error">{error}</p>}

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="email"
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
                            autoComplete="current-password"
                            required
                        />
                    </label>

                    <button type="submit" className="btn btn--primary" disabled={loading}>
                        {loading ? 'Logging in…' : 'Log in'}
                    </button>
                </form>
            </div>
        </section>
    )
}