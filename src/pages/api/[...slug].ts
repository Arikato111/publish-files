import type { NextApiRequest, NextApiResponse } from "next";
import { usePathname } from "next/navigation";
import { urlFirebase } from "@/firebase/config";
import { useRouter } from "next/router";

export default async function hander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.sendFile("https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg")
  const path = req.headers["x-invoke-path"] as string;
  try {
    let file_path = path?.replace("/source", "source");
    let file = await fetch(
      `${urlFirebase}${encodeURIComponent(file_path)}?alt=media`
    );
      return res.send(file_path)
    res.setHeader("Content-Type", file.headers.get("Content-Type") ?? "");
    if (file.status == 404) throw "custom throw 404";
    res.send(Buffer.from(await file.arrayBuffer()));
  } catch (err) {
    res.json({
      status: 404,
      err,
      path: path,
    });
  }
}
