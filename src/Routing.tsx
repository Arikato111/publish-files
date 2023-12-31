import Home from './pages/Home'
import NotFound from './pages/Notfound'
import Login from './pages/Login'
import Source from './pages/Source'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import AdminSource from './pages/AdminSource'

export const LoginContext = createContext<{ value: User | null, set: Function } | null>(null)

export default function Routing() {
    const [login, setLogin] = useState<User | null>(null);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (data) => {
            setLogin(data)
        })
    }, [])
    return <LoginContext.Provider value={{ value: login, set: setLogin }}>
        <BrowserRouter>
            <nav style={{ margin: "10px" }}>
                <a href="/"> home </a>
                <a href="/source/"> source </a>
                {login != null && (
                    <>
                        <a href="/admin/"> admin </a>
                        <a href="/login?logout"> logout </a>
                    </>
                )}
            </nav>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/source/*' element={<Source />} />
                <Route path='/admin/*' element={<AdminSource />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </LoginContext.Provider>
}