import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        document.title = "HOME/"
    }, [])
    return <div>
        <h3>README</h3>
        <ul>
            <li>when folder empty it will be delete.</li>
            <li>This is only front-end for work with firebase, it can not get file by curl or wget in terminal.</li>
            <li>This is website for share files. </li>
            <li>go to source <a href="/source/">click</a></li>
        </ul>
    </div>
}