import { Link } from "react-router-dom";

export default function Home() {
    return <main>
        <header>
            <nav>
                <ul>
                    <li><Link to={'/source/'}>source</Link></li>
                </ul>
            </nav>
        </header>
    </main>
}