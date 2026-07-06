import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--brass)' }}>
                Loading…
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}