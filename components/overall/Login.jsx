// components/Login.js
import { useState } from 'react';
import { useAuth } from '@/context/AuthContent';
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { TbEye, TbLoader } from 'react-icons/tb';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Toaster } from '../ui/toaster';
import { toast } from '../ui/use-toast';
import { Inter } from 'next/font/google';


const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [seePass, setSeePass] = useState(false);
    const { login } = useAuth();
    const [isloging, setIsLoging] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            const userData = {
                user_name: username,
                user_pass: password
            }
            loginWithBackend(userData);
        }
        else {
            toast({
                toastType: "warning",
                title: "Warning: Fill the Form",
                description: "Please Fill the form to login your account",
                duration: 1000,
            })
        }
    };

    const loginWithBackend = async (userData) => {
        try {
            setIsLoging(true);
            await fetch('https://phpstack-1006141-4590195.cloudwaysapps.com/api/DashUsers/userLogin.php', {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        setIsLoging(false);
                        login(data.username)
                    } else {
                        setIsLoging(false);
                        toast({
                            toastType: "error",
                            title: "Login failed: Try again",
                            description: "Wrong username or password",
                            duration: 1000,
                        })
                    }
                })

        } catch (error) {
            console.error("error", error.message);
        }
    }

    const handleLoginWithEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e)
        }
    };

    {/* #f0c9a1 */}

    return (
        <div className={`${inter.className} w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen selection:bg-violet-500 selection:text-white`}>
            {/* =============== left section =========== */}
            <div className="relative h-full flex-col bg-muted py-4 px-4 md:px-8 md:p-10 text-dark dark:text-white lg:flex dark:border-r font-semibold">
                <div className="absolute inset-0 bg-login-light dark:bg-login-dark bg-cover brightness-95 bg-bottom dark:bg-right-top"></div>
                <div className="relative z-20 flex items-center text-base md:text-lg select-none">
                    <img src="/Images/logo-nobg.png" height={58} width={58} className='z-10 drop-shadow-[5px_2px_7px_#fff]' alt="" /> <span className='relative top-1.5 text-3xl drop-shadow-[2px_2px_4px_black] -left-1.5 font-extrabold text-white'>adash</span>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className=" space-y-3 md:space-y-2">
                        <p className="text-base mt-4 md:mt-11 md:text-base opacity-0 md:opacity-100 bg-cyan-950/25 backdrop-blur-sm text-[#f0c9a1] tracking-wide rounded-md py-3 px-4">“This Website is under development process. Any suggestions regarding the development and improvment will be appreciated”</p>
                        <footer className="text-sm text-zinc-300 selection:!bg-black selection:text-white">- Sahil Jha <span className='text-xs'>( owner )</span></footer>
                    </blockquote>
                </div>
            </div>


            {/* =============== right section =================== */}
            <div className="flex md:h-screen items-center px-9 py-5 lg:p-8 dark:bg-dark">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-2xl font-bold">Welcome Back 👋</h1>
                        <p className="text-balance text-muted-foreground text-sm">
                            Please Fill the form to login your Account </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2 mt-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <p
                                    className="ml-auto inline-block text-sm underline cursor-default"
                                >
                                    Forgot your password?
                                </p>
                            </div>
                            <div className='relative flex-1'>
                                <Input
                                    id="password"
                                    type={seePass ? "Text" : "Password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={handleLoginWithEnter}
                                />
                                <div className='absolute right-2.5 top-2 cursor-pointer text-zinc-500 transition-all duration-100 active:scale-90' onClick={() => setSeePass(!seePass)}>
                                    {seePass ?
                                        <FaEye className="h-5 w-5" />
                                        :
                                        <FaEyeSlash className="h-5 w-5" />
                                    }
                                </div>
                            </div>
                        </div>
                        <Button bg="themeBtn" className={`w-full h-9 md:h-10 text-sm md:text-base active:scale-90 transition-all duration-100`} onClick={handleSubmit}
                            disabled={isloging ? true : false}
                        >
                            {isloging ?
                                <div className='flex items-center gap-2 animate-pulse tracking-wide select-none'>
                                    <TbLoader className='h-5 w-5 animate-spin' /> Processing...</div>
                                :
                                <div>Login</div>
                            }
                        </Button>
                    </div>
                    <div className="-mt-1 md:mt-4 text-center text-sm leading-5 text-zinc-500 select-none">
                        By clicking continue, you agree to our
                        <div>
                            <Link href="#" className='underline underline-offset-4'>Terms of Service</Link> and <Link href="#" className='underline underline-offset-4'>Privacy Policy</Link>.
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}
