import { getAuth, signInWithPopup, signOut } from "firebase/auth"
import { googleProvider } from "../firebase/firebase"
import { useContext, useEffect } from "react"
import { LoginContext } from "./_app"

export default function Login() {
    const Logout = async () => {
        if (window.location.href.match('logout')?.length) {
            await signOut(getAuth())
        }
    }
    useEffect(() => {
        Logout()
    }, [])
    const login = useContext(LoginContext)
    if (login?.value != null) return <div>
        <h1>you are now logined.</h1>
    </div>
    return <div>
        <button onClick={async () => {
            try {
                const auth = getAuth()
                const data = await signInWithPopup(auth, googleProvider)
                login?.set(data.user)
            } catch (err) {
                console.log("found error: ", err);
            }
        }}>login</button>
    </div>
}