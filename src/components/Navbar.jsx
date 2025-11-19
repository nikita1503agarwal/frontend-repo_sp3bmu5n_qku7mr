import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Menu } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => { sub.subscription.unsubscribe() }
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-600 text-white grid place-items-center font-bold">DB</div>
          <span className="font-semibold text-slate-800">Dr. Bur Dental Clinic</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-slate-600">
          <NavLink to="/shop" className={({isActive})=> isActive? 'text-blue-600 font-medium' : 'hover:text-slate-900'}>Shop</NavLink>
          {user && <NavLink to="/dashboard" className={({isActive})=> isActive? 'text-blue-600 font-medium' : 'hover:text-slate-900'}>Dashboard</NavLink>}
          {user && <NavLink to="/chat" className={({isActive})=> isActive? 'text-blue-600 font-medium' : 'hover:text-slate-900'}>Chat</NavLink>}
          {user && <NavLink to="/profile" className={({isActive})=> isActive? 'text-blue-600 font-medium' : 'hover:text-slate-900'}>Profile</NavLink>}
          {!user ? (
            <a href="#auth" onClick={(e)=>{e.preventDefault(); document.dispatchEvent(new CustomEvent('open-auth'))}} className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Login</a>
          ) : (
            <button onClick={logout} className="px-3 py-2 bg-slate-900 text-white rounded-md hover:bg-black transition">Logout</button>
          )}
        </nav>
        <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Open Menu">
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-3 flex flex-col gap-3">
          <NavLink to="/shop" onClick={()=>setOpen(false)}>Shop</NavLink>
          {user && <NavLink to="/dashboard" onClick={()=>setOpen(false)}>Dashboard</NavLink>}
          {user && <NavLink to="/chat" onClick={()=>setOpen(false)}>Chat</NavLink>}
          {user && <NavLink to="/profile" onClick={()=>setOpen(false)}>Profile</NavLink>}
          {!user ? (
            <button onClick={()=>{document.dispatchEvent(new CustomEvent('open-auth')); setOpen(false)}} className="px-3 py-2 bg-blue-600 text-white rounded-md">Login</button>
          ) : (
            <button onClick={()=>{logout(); setOpen(false)}} className="px-3 py-2 bg-slate-900 text-white rounded-md">Logout</button>
          )}
        </div>
      )}
    </header>
  )
}
