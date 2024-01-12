import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig, urlFirebase } from "./config";

initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();

export function getFileStorageLink(path: string): string {
  console.log("path", path);
  if (path[0] == "/") {
    let path_arr = path.split("");
    delete path_arr[0];
    path = path_arr.join("");
  }
  console.log("path", path);
  path = encodeURIComponent(path);
  let linkStorage = `${urlFirebase}${path}?alt=media`;
  return linkStorage;
}

import { getStorage, ref, listAll, getMetadata } from "firebase/storage";

export type FileInfo = {
  name: string;
  fullPath: string;
  size: number;
  updated: string;
};

export async function getFileList(path: string) {
  // const folder: StorageReference[] = [];
  const file: FileInfo[] = [];
  const storage = getStorage();
  const listRef = ref(storage, path);
  const res = await listAll(listRef);
  console.log("item", res.items);
  for (let i = 0; i < res.items.length; i++) {
    let info = await getMetadata(ref(getStorage(), res.items[i].fullPath));
    file.push({
      fullPath: res.items[i].fullPath,
      name: res.items[i].name,
      size: info.size,
      updated: info.updated,
    });
  }
  return { folder: res.prefixes, file };
}