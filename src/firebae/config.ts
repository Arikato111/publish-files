// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIfO7TX8QciQYXLkbWUXulGIDjWZ1DBtE",
  authDomain: "source-54c83.firebaseapp.com",
  projectId: "source-54c83",
  storageBucket: "source-54c83.appspot.com",
  messagingSenderId: "347580500240",
  appId: "1:347580500240:web:6e3dc6903347fab2ee3d95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();

export function getFileStorageLink(path: string): string {
  console.log("path", path);
  if (path[0] == "/") {
    let path_arr = path.split("");
    delete path_arr[0];
    path = path_arr.join('')
  }
  console.log("path", path);
  path = encodeURIComponent(path)
  let linkStorage = `https://firebasestorage.googleapis.com/v0/b/source-54c83.appspot.com/o/${path}?alt=media`;
  return linkStorage;
}

import { getStorage, ref, listAll } from "firebase/storage";
export async function getFileList(path: string) {
  const folder: string[] = [];
  const file: string[] = [];
  const storage = getStorage();
  const listRef = ref(storage, path);
  const res = await listAll(listRef);
  res.items.forEach((f) => file.push(f.name));
  res.prefixes.forEach((fol) => folder.push(fol.name));
  return { folder, file };
}
