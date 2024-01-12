import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import Menu from "../components/Menu"
import { FileInfo, getFileList, getFileStorageLink } from "../firebase/firebase"
import { LoginContext } from "./_app"
import { StorageReference, deleteObject, getStorage, ref } from "firebase/storage"
import { formatSize } from "../components/lib"
import { useRouter } from "next/router"
import Head from "next/head"

function AdminSource() {
    const login = useContext(LoginContext)
    const router = useRouter();
    const [pathname, setPathname] = useState("")
    const [folder, setFolder] = useState<StorageReference[]>([])
    const [file, setFile] = useState<FileInfo[]>([])

    async function deleteFile(path: string) {
        const fileRef = ref(getStorage(), path);
        deleteObject(fileRef).then(() => {
            fetchFile()
        }).catch(() => {
            alert("You have no permission.")
        })
    }

    async function fetchFile() {
        let { file: fi, folder } = await getFileList(window.location.pathname.replace("/admin/", "/source/"))
        setFolder(folder)
        setFile(fi)
    }
    function previousPath(path: string) {
        let path_list = path.split("/");
        path_list.pop()
        path_list.pop()
        return path_list.join("/") + "/"
    }


    useEffect(() => {
        setPathname(window.location.pathname)
        fetchFile()
    }, [router.asPath])
    if (login?.value == null) return <div>
        <Head>
            <title>not found</title>
        </Head>
        <h3>Not found</h3>
    </div>
    return (
        <div>
            <Head>
                <title>{router.asPath}</title>
            </Head>
            {login?.value != null && <Menu fetchFile={fetchFile} />}
            {pathname != '/' &&
                <>
                    <Link href={previousPath(pathname)}>back</Link>
                </>
            }
            <table>
                {folder.map((fol, idx) => (
                    <tr key={idx}>
                        <td><Link href={`${router.asPath}${fol.name}/`}>{fol.name}/</Link></td>
                    </tr>
                ))}
                {
                    file.map((fi, idx) => (
                        <tr key={idx}>
                            <td>
                                <button onClick={() => confirm("Are you sure to delete?") && deleteFile(window.location.pathname.replace("/admin", "/source") + fi.name)}>delete</button>
                            </td>

                            <td>
                                <a target="_blank" href={getFileStorageLink(window.location.pathname.replace("/admin", "/source") + fi.name)}>{fi.name}</a>
                            </td>
                            <td>
                                <span> {formatSize(fi.size)} </span>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default AdminSource 