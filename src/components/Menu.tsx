import { getStorage, ref, uploadBytes } from "firebase/storage"
import { FormEvent, useRef, useState } from "react"

function CreateFolder() {
    const [folder, setFolder] = useState("")
    function createFolder() {
        const storage = getStorage()
        const folderRef = ref(storage, folder)
    }
    return <div>
        <div>
            <input type="text" value={folder} onChange={(e) => setFolder(e.target.value)} />
            <button onClick={createFolder}>create</button>
        </div>
    </div>

}

function UploadFile() {
    const [file, setFile] = useState<File | null>()
    const inputFileRef = useRef<HTMLInputElement>(null)
    function submitForm(e: FormEvent) {
        e.preventDefault()
        if (file) {
            const storageRef = ref(getStorage(), window.location.pathname + file.name);
            uploadBytes(storageRef, file).then(() => {
                alert("update success")
                setFile(null)
                if (inputFileRef.current)
                    inputFileRef.current.value = ""
            })
        }
    }
    return <div>
        <form onSubmit={submitForm}>
            <input ref={inputFileRef} type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
            <button type="submit">upload</button>
        </form>
    </div>
}

export default function Menu() {
    return <div>
        <CreateFolder />
        <UploadFile />
    </div>
}