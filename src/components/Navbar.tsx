import { LoginContext } from "@/pages/_app";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
    const login = useContext(LoginContext)
    return <nav style={{padding: "3px"}}>
        <Link href={'/'}> Home </Link>
        <Link href={'/source/'}> Source </Link>
        {login?.value != null && (
            <>
                <Link href={'/admin/'}> admin </Link>
                <Link href={'/login?logout'}> logout </Link>
            </>
        )}
    </nav>
}