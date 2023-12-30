import Home from './pages/Home'
import NotFound from './pages/Notfound'
import Source from './pages/Source'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

export default function Routing() {
    return <BrowserRouter>
        <nav style={{margin: "10px"}}>
            <a href="/"> home </a>
            <a href="/source/"> source </a>
        </nav>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/source/*' element={<Source />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
}