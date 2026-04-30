'use client'

import Image from "next/image"
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"

export default function Header()  {

    const [isDark, setIsDark] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const restart = () => {
        router.push("/");
    }

    useEffect(() => {
        setIsDark(pathname === "/");
    }, [pathname]);

    return(
        <header className={`fixed ${ isDark ? "dark border-white/10" : "light border-[#E5E7F0]" } w-full h-16 border-b z-100`}>
            <div className="container h-full flex items-center  justify-between gap-4 ">
                    {/* Logo */}
                    <div className="flex gap-4 items-center">
                        {/* Img container */}
                        <div className="relative h-8 w-8 shrink-0">
                            <Image
                                src={"/BF-Logo.png"}
                                alt="BrandForge Logo"
                                fill
                                sizes="100%"
                                priority={true}
                            />
                        </div>
                    
                        <h1 className={` ${ isDark ? "text-on-dark" : "text-(--color-dark)" } font-bold text-xl!`}>BrandForge</h1>
                </div>

                {/* New brand btn*/}
                <button 
                    className={`btn restart-btn ${isDark ? "hidden!" : "block"}`}
                    onClick={restart}
                >
                    &larr; New Brand
                </button>
                
            </div>
        </header>
    )
}
