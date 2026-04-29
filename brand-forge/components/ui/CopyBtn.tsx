'use client'

import { useState } from "react"

interface CopyProps {
    hexcode: string
}

export const CopyBtn = ({hexcode}: CopyProps) => {

    const [copy, setCopy] = useState(false);

    const copyCode = async (hexcode: string) => {
        try {
            await navigator.clipboard.writeText(hexcode);
            setCopy(true);
            setTimeout(() => setCopy(false), 2000)

        } catch (error) {
            console.error('Failed to copy ', error);
        }
    }

    return (
        <button 
            className="btn copy-btn px-2! py-2!"
            onClick={() => copyCode(hexcode)}
        >
            {`${copy === false ? "copy" : "copied!"}`}
        </button>
    )
}