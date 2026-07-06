import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // onAuthStateChange fires immediately with the current session,
        // so we don't need getSession() separately — using both causes a race condition
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const currentUser = session?.user ?? null
            setUser(currentUser)

            if (currentUser) {
                await fetchProfile(currentUser.id)
            } else {
                setProfile(null)
                setLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    async function fetchProfile(userId) {
        setLoading(true)
        try {
            // Retry up to 3 times — the trigger that creates the profile row
            // runs after auth, so there can be a brief delay on first registration
            let data = null
            let error = null

            for (let attempt = 0; attempt < 3; attempt++) {
                const result = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single()

                data = result.data
                error = result.error

                // PGRST116 = no rows found — profile trigger hasn't fired yet, wait and retry
                if (error?.code === 'PGRST116' && attempt < 2) {
                    await new Promise((resolve) => setTimeout(resolve, 800))
                    continue
                }

                break
            }

            if (data) {
                setProfile(data)
            } else {
                // Profile still not found — fall back to user metadata so the UI
                // doesn't break (name/email still display correctly on dashboard)
                setProfile(null)
            }
        } catch (err) {
            console.error('fetchProfile error:', err)
            setProfile(null)
        } finally {
            setLoading(false)
        }
    }

    async function register({ name, email, password }) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }, // stored in auth.users.raw_user_meta_data, trigger reads this
            },
        })
        if (error) throw new Error(error.message)
        return data // caller checks data.session to know if email confirmation is needed
    }

    async function login({ email, password }) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) throw new Error(error.message)
        return data
    }

    async function logout() {
        const { error } = await supabase.auth.signOut()
        if (error) throw new Error(error.message)
        // onAuthStateChange will fire automatically and clear user + profile state
    }

    const value = {
        user,
        profile,
        loading,
        login,
        register,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}