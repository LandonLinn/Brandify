'use client';

import { useState, createContext, useContext } from "react";

interface AppContextType{
    loadingStatus: "idle" | "generating" | "imaging" | "done"
    setLoadingStatus: (status: "idle" | "generating" | "imaging" | "done") => void
    brandKit: any
    setBrandKit: (brandKit: any) => void
    imageUrl: string | null
    setImageUrl: (url: string | null) => void
    isDark: boolean;
    setIsDark: (isDark: boolean) => void
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: {children: React.ReactNode}) {
    const [loadingStatus, setLoadingStatus] = useState<"idle" | "generating" | "imaging" | "done">("idle");
    const [brandKit, setBrandKit] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isDark, setIsDark] = useState(false);

    return(
        <AppContext.Provider value={{
            loadingStatus, setLoadingStatus,
            brandKit, setBrandKit,
            imageUrl, setImageUrl,
            isDark, setIsDark,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used inside AppProvider");
    return context;
}