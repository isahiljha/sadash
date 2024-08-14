import Header from "@/components/myCreated/Header";
import Sidebar from "@/components/myCreated/Sidebar";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function App({ Component, pageProps }) {

const [sidebarToggle , setSidebarToggle] = useState(false);

  return (
    <>
      <section className={`flex items-center h-screen w-screen bg-zinc-50 ${inter.className}`}>
        <aside className={`${!sidebarToggle ? 'w-[20vw]': 'w-[5vw]' } h-full border-r transition-all duration-500 bg-white`}><Sidebar sidebarState={sidebarToggle} toggleSidebar={setSidebarToggle} /></aside>
        <section className={`${!sidebarToggle ? 'w-[80vw]' : 'w-[95vw]' } transition-all duration-500 h-full bg-zinc-50`}>
          <header className="w-full h-[8vh]"><Header /></header>
          <main className="h-[92vh] p-12">
            <Component {...pageProps} />
          </main>
        </section>
      </section>
    </>
  )

}
