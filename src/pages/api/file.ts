import type { NextApiRequest, NextApiResponse } from "next";
import { urlFirebase } from "@/firebase/config";

export default async function hander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.sendFile("https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg")
  try {
    let file_path = req.url ?? "";
    file_path = file_path?.replace("/source", "source");
    let file = await fetch(
      `${urlFirebase}${encodeURIComponent(file_path)}?alt=media`
    );
    res.setHeader("Content-Type", file.headers.get("Content-Type") ?? "");
    res.send(Buffer.from(await file.arrayBuffer()));
  } catch (err) {
    res.status(404).json({
      status: 404,
      err,
    });
  }
}
