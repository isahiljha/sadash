import Header from "@/components/overall/Header";
import Sidebar from "@/components/overall/Sidebar";
import { ThemeProvider } from "@/context/ThemeContext";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import mystore from "@/store/store";
import { toast } from "@/components/ui/use-toast";
import { AuthProvider, useAuth } from "@/context/AuthContent";
import Login from "@/components/overall/Login";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})


export default function App({ Component, pageProps }) {
  return (
    <Provider store={mystore}>
      <ThemeProvider>
        <AuthProvider>

          <MainApp Component={Component} pageProps={pageProps} />

        </AuthProvider>
      </ThemeProvider >
    </Provider>

  );
}



function MainApp({ Component, pageProps }) {
  const { isLoggedIn, isLoading, username } = useAuth();

  const [sidebarToggle, setSidebarToggle] = useState(false);

  useEffect(() => {
    const hasShownToast = localStorage.getItem('hasShownToast');

    if (isLoggedIn && !hasShownToast) {
      toast({
        toastType: "success",
        title: "Login Successful:👋 Welcome Back ",
        duration: 1500,
        desUserName: username,
      });
      localStorage.setItem('hasShownToast', 'true');
    }
  }, [isLoggedIn, username]);


  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      {isLoggedIn ? (<>
        <Toaster />
        <section className={`flex items-center h-screen w-screen bg-zinc-50 dark:bg-zinc-900 ${inter.className} selection:bg-black selection:text-white`}>
          <aside className={`w-[0vw] hidden md:block ${!sidebarToggle ? 'md:w-[20vw]' : 'md:w-[5vw]'} h-full border-r transition-all duration-500 bg-white dark:bg-dark dark:border-zinc-700`}>
            <Sidebar sidebarState={sidebarToggle} toggleSidebar={setSidebarToggle} />
          </aside>
          <section className={`w-[100vw] ${!sidebarToggle ? 'md:w-[80vw]' : 'md:w-[95vw]'} overflow-x-hidden transition-all duration-500 h-full bg-zinc-50 dark:bg-zinc-900`}>
            <header className="w-full h-[8vh] sticky top-0 bg-zinc-50 z-20"><Header /></header>
            <main className="h-[92vh]">
              <Component {...pageProps} />
            </main>
          </section>
        </section>

      </>
      ) : (
        <Login />
      )}
    </>
  );
}
