import { useContext, useEffect, useState } from "react"
import Menu from "../components/Menu"
import { getFileList, getFileStorageLink } from "../firebae/config"
import { LoginContext } from "../Routing"

function Source() {
  const login = useContext(LoginContext)
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
      {login?.value != null && <Menu />}
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
