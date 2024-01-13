import type { NextApiRequest, NextApiResponse } from "next";
import { Http2Server } from "http2";
import { usePathname } from "next/navigation";
import { urlFirebase } from "@/firebase/config";
import { useRouter } from "next/router";

export default async function hander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // closed
  return res.json({ status: "closed" });
  // closed

  const path = req.url ?? "";
  try {
    let file_path = path?.replace("/source", "source");
    let file = await fetch(
      `${urlFirebase}${encodeURIComponent(file_path)}?alt=media`
    );
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
