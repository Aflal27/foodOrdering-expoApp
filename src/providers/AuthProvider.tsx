import { supabase } from '@/lib/superbase'
import { Session } from '@supabase/supabase-js'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

type AuthContextType = {
  session: Session | null
  loading: boolean
  profile: any
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
})

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)

      // fetch profile
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setProfile(data)
      }
      setLoading(false)
    }

    fetchSession()
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{ session, loading, profile, isAdmin: profile?.qurop === 'ADMIN' }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
