import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
    const { user } = useAuth()
    const location = useLocation()

    if (!user) {
        // Send them to /login, but remember where they were trying to go
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}