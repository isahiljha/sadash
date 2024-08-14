import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <main className={`${inter.className}`}>
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold">Hello World</h1>
      </div>
    </main>
    </>
  );
}
