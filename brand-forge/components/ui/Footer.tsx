'use client';

import { useState } from "react";
import { useAppContext } from "@/app/context/AppContext";

const year = new Date().getFullYear();


export const Footer = () => {

    const {isDark} = useAppContext();

    return(
        <footer className={`${ isDark ? "dark border-white/10" : "light border-[#E5E7F0]" } w-full h-16 border-t `}>
            <div className="container h-full flex items-center justify-center md:justify-start gap-4 w-full">
                <p className="text-on-dark--muted text-center md:tex-left">© {year} Landon Linn. All rights reserved.</p>
            </div>
        </footer>
    )
}