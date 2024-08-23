import { clsx } from "clsx"
import { Inter } from "next/font/google"
import { twMerge } from "tailwind-merge"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export function cn(...inputs) {
  return twMerge(clsx(inputs) , inter.className)
}
