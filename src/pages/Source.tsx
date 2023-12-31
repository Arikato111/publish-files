import { useEffect, useState } from "react"
import { FileInfo, getFileList, getFileStorageLink } from "../firebae/config"
import { StorageReference } from "firebase/storage"
import { formatSize } from "../components/lib"

function Source() {
  const [folder, setFolder] = useState<StorageReference[]>([])
  const [file, setFile] = useState<FileInfo[]>([])

  async function fetchFile() {
    let { file, folder } = await getFileList(window.location.pathname)
    setFolder(folder)
    setFile(file)
    console.log(file);
  }

  useEffect(() => {
    document.title = location.pathname;
    console.log(window.location.pathname)
    fetchFile()
  }, [window.location.pathname])
  return (
    <div>
      {window.location.pathname != '/' &&
        <a href={'..'}>back</a>
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
                <a target="_blank" href={getFileStorageLink(fi.fullPath)}>{fi.name}</a>
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
      </table>
    </div>
  )
}

export default Source 
