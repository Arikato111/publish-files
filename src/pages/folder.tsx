import { useEffect, useState } from "react"
import { FileInfo, getFileList, getFileStorageLink } from "../firebase/firebase"
import { StorageReference } from "firebase/storage"
import { formatSize } from "../components/lib"
import { useRouter } from "next/router"
import Link from "next/link"

function Source() {
    const router = useRouter()
    const [pathname, setPathname] = useState("")
    const [folder, setFolder] = useState<StorageReference[]>([])
    const [file, setFile] = useState<FileInfo[]>([])

    async function fetchFile() {
        let { file, folder } = await getFileList(window.location.pathname)
        setFolder(folder)
        setFile(file)
        console.log(file);
    }

    function previousPath(path: string) {
        let path_list = path.split("/");
        path_list.pop()
        path_list.pop()
        return path_list.join("/") + "/"
    }

    useEffect(() => {
        document.title = location.pathname;
        console.log(window.location.pathname)
        setPathname(window.location.pathname)
        fetchFile()
    }, [router.asPath])
    return (
        <div>
            {pathname != '/' &&
                <Link href={previousPath(pathname)}>back</Link>
            }
            <table>
                <tbody>
                    {folder.map((fol, idx) => (
                        <tr key={idx}>
                            <td><Link href={`/${router.asPath}/${fol.name}/`}>{fol.name}/</Link></td>
                        </tr>
                    ))}
                    {
                        file.map((fi, idx) => (
                            <tr key={idx}>
                                <td>
                                    <a target="_blank" href={fi.name}>{fi.name}</a>
                                </td>
                                <td>
                                    <span> {formatSize(fi.size)} </span>
                                </td>
                                <td>
                                    <span> {(new Date(fi.updated)).toLocaleDateString()} </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Source 