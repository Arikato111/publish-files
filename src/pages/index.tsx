import Head from "next/head"
import { useEffect } from "react"

export default function Home() {
   return <div>
        <Head>
            <title>HOME/</title>
        </Head>
        <h3>README</h3>
        <ul>
            <li>เว็บไซต์สำหรับเผยแพร่ไฟล์ต่างๆ เพื่อจุดประสงค์ของการเปิดกว้างทางข้อมูล</li>
            <li>source code ของเว็บไซต์อยู่ที่ <a href="https://github.com/Arikato111/publish-files">https://github.com/Arikato111/publish-files</a></li>
        </ul>
        <h4>การใช้งาน</h4>
        <ul>
            <li>ไปที่ <a href="/source/">ไฟล์</a></li>
        </ul>

        <ul>
            <li>when folder empty it will be delete.</li>
            <li>This is only front-end for work with firebase, it can not get file by curl or wget in terminal.</li>
            <li>This is website for share files. </li>
            <li>go to source <a href="/source/">click</a></li>
        </ul>
    </div>
}
