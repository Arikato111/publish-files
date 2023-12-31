import { useContext, useEffect, useState } from "react"
import Menu from "../components/Menu"
import { FileInfo, getFileList, getFileStorageLink } from "../firebae/config"
import { LoginContext } from "../Routing"
import { StorageReference, deleteObject, getStorage, ref } from "firebase/storage"
import { formatSize } from "../components/lib"

function AdminSource() {
  const login = useContext(LoginContext)
  const [folder, setFolder] = useState<StorageReference[]>([])
  const [file, setFile] = useState<FileInfo[]>([])

  async function deleteFile(path: string) {
    const fileRef = ref(getStorage(), path);
    deleteObject(fileRef).then(() => {
      alert("Delete success")
      window.location.reload()
    })
  }

  async function fetchFile() {
    let { file: fi, folder } = await getFileList(window.location.pathname.replace("/admin/", "/source/"))
    setFolder(folder)
    setFile(fi)
  }

  useEffect(() => {
    document.title = location.pathname;
    fetchFile()
  }, [window.location.pathname])
  return (
    <div>
      {login?.value != null && <Menu />}
      {window.location.pathname != '/' &&
        <>
          <a href={'..'}>back</a>
        </>
      }
      <table>
        {folder.map((fol, idx) => (
          <tr key={idx}>
            <td><a href={`./${fol.name}/`}>{fol.name}/</a></td>
          </tr>
        ))}
        {
          file.map((fi, idx) => (
            <tr key={idx}>
              <td>
                <button onClick={() =>confirm("Are you sure to delete?") && deleteFile(window.location.pathname.replace("/admin", "/source") + fi.name)}>delete</button>
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
