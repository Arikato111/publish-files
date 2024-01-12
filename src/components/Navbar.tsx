import Link from "next/link";

export default function Navbar() {
    return <nav style={{padding: "3px"}}>
        <Link href={'/'}> Home </Link>
        <Link href={'/source/'}> Source </Link>
    </nav>
}