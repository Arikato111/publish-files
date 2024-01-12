import { getStorage, ref, uploadBytes } from "firebase/storage"
import { useRouter } from "next/router"
import { FormEvent, useRef, useState } from "react"

function CreateFolder() {
    const [folder, setFolder] = useState("")
    const router = useRouter()

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        router.push(window.location.pathname + `${folder}/`)
        setFolder("")
    }

    return <div>
        <form onSubmit={onSubmit}>
            <input type="text" value={folder} onChange={(e) => setFolder(e.target.value)} placeholder="create folder" />
            <button>create</button>
        </form>
    </div>

}

function UploadFile({ fetchFile }: { fetchFile: Function }) {
    const [file, setFile] = useState<File | null>()
    const inputFileRef = useRef<HTMLInputElement>(null)
    function submitForm(e: FormEvent) {
        e.preventDefault()
        if (file) {
            const storageRef = ref(getStorage(), window.location.pathname.replace("/admin", "/source") + file.name);
            uploadBytes(storageRef, file).then(() => {
                setFile(null)
                if (inputFileRef.current)
                    inputFileRef.current.value = ""
                fetchFile()
            }).catch(() => {
                alert("You have no permission.")
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

export default function Menu({ fetchFile }: { fetchFile: Function }) {
    return <div>
        <CreateFolder />
        <UploadFile fetchFile={fetchFile} />
    </div>
}