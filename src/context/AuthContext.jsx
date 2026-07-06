import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        // Rehydrate from localStorage so login survives a page refresh
        try {
            const stored = localStorage.getItem('truemark_user')
            return stored ? JSON.parse(stored) : null
        } catch {
            return null
        }
    })

    function register({ name, email, password }) {
        // Frontend-only: store registered users in localStorage
        const existing = JSON.parse(localStorage.getItem('truemark_users') || '[]')
        const alreadyExists = existing.find((u) => u.email === email)
        if (alreadyExists) throw new Error('An account with that email already exists.')

        const newUser = { name, email, password, joinedAt: new Date().toISOString() }
        localStorage.setItem('truemark_users', JSON.stringify([...existing, newUser]))

        // Log them in immediately after registering
        const { password: _, ...safeUser } = newUser
        setUser(safeUser)
        localStorage.setItem('truemark_user', JSON.stringify(safeUser))
    }

    function login({ email, password }) {
        const existing = JSON.parse(localStorage.getItem('truemark_users') || '[]')
        const found = existing.find((u) => u.email === email && u.password === password)
        if (!found) throw new Error('Email or password is incorrect.')

        const { password: _, ...safeUser } = found
        setUser(safeUser)
        localStorage.setItem('truemark_user', JSON.stringify(safeUser))
    }

    function logout() {
        setUser(null)
        localStorage.removeItem('truemark_user')
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Convenience hook used in every component that needs auth
export function useAuth() {
    return useContext(AuthContext)
}