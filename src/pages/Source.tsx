import { useEffect, useState } from "react"
import { getFileList, getFileStorageLink } from "../firebae/config"

function Source() {
  const [folder, setFolder] = useState<string[]>([])
  const [file, setFile] = useState<string[]>([])

  async function fetchFile() {
    let { file, folder } = await getFileList(window.location.pathname)
    setFolder(folder)
    setFile(file)
  }

  useEffect(() => {
    console.log(window.location.pathname)
    fetchFile()
  }, [window.location.pathname])
  return (
    <div>
      {window.location.pathname != '/' &&
      <a href={'..'}>back</a>
      }
      {folder.map((fol, idx) => (
        <p key={idx}><a href={`./${fol}/`}>{fol}/</a></p>
      ))}
      {
        file.map((fi, idx) => (
          <p key={idx}><a target="_blank" href={getFileStorageLink(window.location.pathname + fi)}>{fi}</a></p>
        ))
      }
    </div>
  )
}

export default Source 
