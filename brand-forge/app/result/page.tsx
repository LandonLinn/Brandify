'use client'

import { CopyBtn } from "@/components/ui/CopyBtn"

import { useEffect, useState } from "react"

interface BrandKit {
  brandName: string
  tagline: string
  missionStatement: string
  voiceProfile: {
    tone: string
    personality: string[]
    doSay: string[]
    dontSay: string[]
  }
  colorPalette: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    names: {
      primary: string
      secondary: string
      accent: string
      background: string
      surface: string
    }
  }
  typography: {
    heading: string
    body: string
    headingStyle: string
    bodyStyle: string
  }
  sampleCopy: {
    heroHeadline: string
    heroSubheadline: string
    ctaButton: string
    socialPost: string
    emailSubject: string
  }
  logoConceptIdeas: string[]
  brandArchetype: string
  competitorSpacing: string
}

export default function Result() {

    // State for brandKit
    const [brandKit, setBrandKit] = useState<BrandKit | null>(null);

    useEffect(() => {
        const data = localStorage.getItem("brandKit");
        if (data) {
            setBrandKit(JSON.parse(data));
        }
    }, [])

    if (!brandKit) return <p>loading...</p>

    return(
        <div className="light min-h-dvh">
            <main className="container section">

                {/* Brand Heading Section */}
                <div 
                    className={`relative overflow-hidden w-full min-h-20 p-10! rounded-(--radius) text-on-dark`}
                    style={{backgroundColor: brandKit.colorPalette.primary}}
                >

                    {/* Blobs */}
                    <div 
                        className="absolute w-100 h-100 rounded-full -bottom-120 left-0 -translate-y-1/2 -translate-x-1/2 blur-3xl z-0 opacity-50"
                        style={{backgroundColor: brandKit.colorPalette.secondary}}
                    />
                    <div 
                        className="absolute w-100 h-100 rounded-full -bottom-10 -right-100 -translate-y-1/2 -translate-x-1/2 blur-3xl z-0 opacity-40"
                        style={{backgroundColor: brandKit.colorPalette.accent}}
                    />

                    {/* Content */}
                    <div className="relative z-1 flex flex-col gap-2 text-shadow-lg">
                        <p className="text-xs! font-semibold! uppercase bg-white/10 w-fit px-5! py-2! rounded-md mb-2!">{brandKit.brandArchetype}</p>
                        <h1 className="">{brandKit.brandName}</h1>
                        <p className="font-bold!">{brandKit.tagline}</p>
                        <p className="text-sm!">{brandKit.missionStatement}</p>
                    </div>
                </div>

                {/* Main Cards */}
                <div className="mt-5! grid grid-cols-2 gap-5">
                    {/* Colors */}
                    <div className="card result-card">
                        <p className="result-text">COLOR PALETTE</p>
                        {/* Colors container */}
                        <div className="w-full mt-2! flex flex-col gap-2 justify-between items-center">
                            {/* Primary */}
                            <div className="w-full flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Color block */}
                                    <div style={{backgroundColor: brandKit.colorPalette.primary}} className="w-11 h-11 rounded-xl"/>
                                    {/* Colors */}
                                    <div className="">
                                        <p className="font-bold!">{brandKit.colorPalette.names.primary}</p>
                                        <p className="text-(--color-gray)! text-sm!">{brandKit.colorPalette.primary}</p>
                                    </div>

                                </div>
                                

                                {/* Copy btn */}
                                <CopyBtn hexcode={brandKit.colorPalette.primary} />
                            </div>

                            {/* Secondary */}
                            <div className="w-full flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Color block */}
                                    <div style={{backgroundColor: brandKit.colorPalette.secondary}} className="w-11 h-11 rounded-xl"/>
                                    {/* Colors */}
                                    <div className="">
                                        <p className="font-bold!">{brandKit.colorPalette.names.secondary}</p>
                                        <p className="text-(--color-gray)! text-sm!">{brandKit.colorPalette.secondary}</p>
                                    </div>
                                </div>
                                

                                {/* Copy btn */}
                                <CopyBtn hexcode={brandKit.colorPalette.secondary} />
                            </div>

                            {/* Accent */}
                            <div className="w-full flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Color block */}
                                    <div style={{backgroundColor: brandKit.colorPalette.accent}} className="w-11 h-11 rounded-xl"/>
                                    {/* Colors */}
                                    <div className="">
                                        <p className="font-bold!">{brandKit.colorPalette.names.accent}</p>
                                        <p className="text-(--color-gray)! text-sm!">{brandKit.colorPalette.accent}</p>
                                    </div>
                                </div>
                                

                                {/* Copy btn */}
                                <CopyBtn hexcode={brandKit.colorPalette.accent} />
                            </div>

                            {/* Background */}
                            <div className="w-full flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Color block */}
                                    <div style={{backgroundColor: brandKit.colorPalette.background}} className="w-11 h-11 rounded-xl"/>
                                    {/* Colors */}
                                    <div className="">
                                        <p className="font-bold!">{brandKit.colorPalette.names.background}</p>
                                        <p className="text-(--color-gray)! text-sm!">{brandKit.colorPalette.background}</p>
                                    </div>
                                </div>
                                

                                {/* Copy btn */}
                                <CopyBtn hexcode={brandKit.colorPalette.background} />
                            </div>

                            {/* Surface */}
                            <div className="w-full flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Color block */}
                                    <div style={{backgroundColor: brandKit.colorPalette.surface}} className="w-11 h-11 rounded-xl"/>
                                    {/* Colors */}
                                    <div className="">
                                        <p className="font-bold!">{brandKit.colorPalette.names.surface}</p>
                                        <p className="text-(--color-gray)! text-sm!">{brandKit.colorPalette.surface}</p>
                                    </div>
                                </div>

                                {/* Copy btn */}
                                <CopyBtn hexcode={brandKit.colorPalette.surface} />
                            </div>

                            
                        </div>

                    </div>

                    {/* Typography */}
                    <div className="card result-card">
                        <p className="result-text">TYPOGRAPHY</p>
                    </div>

                </div>
                
            </main>
        </div>
    )
}