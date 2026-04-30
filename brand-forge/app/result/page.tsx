'use client';

import Image from "next/image";

import { CopyBtn } from "@/components/ui/CopyBtn";
import { useEffect, useState } from "react";
import { BrandKit } from "@/lib/types";

export default function Result() {

    // State for brandKit
    const [brandKit, setBrandKit] = useState<BrandKit | null>(null);

    // State for images
    const [image, setImage] = useState<string | null>(null);
    const [imageLoading, setImageLoading] = useState(false);

    // Brandkit mounted
    useEffect(() => {
        const data = localStorage.getItem("brandKit");
        if (data) {
            setBrandKit(JSON.parse(data));
        }
    }, []);

    // BrandKit Change
    useEffect(() => {
        if (brandKit === null) return;

        // Check if logo exists already
        const savedImage = localStorage.getItem("brandImage");
        if(savedImage) {
            setImage(savedImage);
            return;
        }

        // Fetch
        const fetchImages = async () => {
            try {
                // Loading
                setImageLoading(true);

                const response = await fetch("/api/generate/images", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ brandKit })
                });

                // Response Failed
                if (!response.ok) throw new Error("Failed to fetch images.");
                

                // Get response data & Save
                const data = await response.json();
                localStorage.setItem("brandImage", data.image);
                setImage(data.image);
                
            } catch (error) {
                console.error("Image fetch failed: ", error);
            } finally {
                setImageLoading(false);
            }
        }
        
        // Call fetch function
        fetchImages();

    }, [brandKit]);

    if (!brandKit) return <p>loading...</p>

    return(
        <div className="light min-h-dvh">
            <main className="container section flex flex-col items-center">

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
                    <div className="relative z-1 flex flex-col gap-2 text-shadow-lg text-center md:text-left items-center md:items-start">
                        <p className="text-xs! font-semibold! uppercase bg-white/10 w-fit px-5! py-2! rounded-md mb-2!">{brandKit.brandArchetype}</p>
                        <h1 className="">{brandKit.brandName}</h1>
                        <p className="font-bold!">{brandKit.tagline}</p>
                        <p className="text-sm!">{brandKit.missionStatement}</p>
                    </div>
                </div>

                {/* Main Cards */}
                <div className="mt-5! grid grid-cols-1 md:grid-cols-2! gap-y-5 md:gap-x-5">
                    {/* Colors */}
                    <div className="card result-card col-start-1 md:row-start-1! w-full">
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
                                    <div>
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
                    <div className="card result-card flex flex-col gap-2 row-start-2 md:row-start-1!">
                        <p className="result-text">TYPOGRAPHY</p>
                        <div className="flex flex-col gap-5 h-full">
                            {/* Heading */}
                            <div className="">
                                <p className="result-text text-xs!">HEADING</p>
                                <p 
                                    className="text-4xl! font-bold!"
                                    style={{color: brandKit.colorPalette.primary}}
                                >
                                    {brandKit.typography.heading}
                                </p>
                                <p className="text-sm! text-(--color-gray)!">{brandKit.typography.headingStyle}</p>
                            </div>

                            <div className="divider" />

                            {/* Body */}    
                            <div className="">
                                <p className="result-text text-xs!">BODY</p>
                                <p 
                                    className="text-xl!"
                                    style={{color: brandKit.colorPalette.primary}}
                                >
                                    {brandKit.typography.body}
                                </p>
                                <p className="text-sm! text-(--color-gray)!">{brandKit.typography.bodyStyle}</p>
                            </div>
                        </div>
                        
                    </div>

                    {/* Logos */}
                    <div className="col-span-2 card result-card flex flex-col gap-2">
                        <p className="result-text">LOGO</p>
                        <div className="flex justify-bewteen gap-5 h-full">
                            {imageLoading ? (
                            // Show skeleton while generating
                            <div className="w-full h-64 bg-gray-100 animate-pulse rounded-xl" />
                            ) : image ? (
                            // Show image when ready
                            <div className="relative w-full h-full">
                                <img
                                    src={image}
                                    alt="Brand Logo"
                                    className="object-contain"
                                />
                            </div>
                            ) : (
                            // Show placeholder if failed
                            <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                                <p className="text-sm text-gray-400">No image generated</p>
                            </div>
                            )}
                        </div>
                        
                    </div>

                    {/* Brand Voice */}
                    <div className="col-span-2  card result-card flex flex-col gap-2">
                        <p className="result-text">BRAND VOICE</p>
                        <div className="flex flex-col gap-5 h-full">
                            {/* Personality */}
                            <div className="flex gap-4 overflow-x-scroll md:overflow-auto">
                                {brandKit.voiceProfile.personality.map((pers, i) => (
                                    <p 
                                        className="text-sm! personality-tag font-bold! rounded-full px-3! py-2!"
                                        style={{color: brandKit.colorPalette.secondary, backgroundColor: `${brandKit.colorPalette.secondary}20`}}
                                        key={i}
                                    >
                                        {pers}
                                    </p>
                                ))}
                            </div>

                            {/* Tone */}
                            <p><strong>Tone:</strong> <span style={{ color:  brandKit.colorPalette.secondary }}>{`${brandKit.voiceProfile.tone}`}</span></p>

                            {/* Do vs Dont Say */}
                            <div className="grid grid-cols-1 gap-y-5 md:gap-y-0 md:gap-x-5 md:grid-cols-2">
                                {/* Do say */}
                                <div>
                                    <p className="result-text text-sm! text-[#16A34A]!">DO SAY</p>
                                    <ul className="pl-5!">
                                        {brandKit.voiceProfile.doSay.map((d, i) => (
                                            <li className="list-disc py-1!" key={i}>{d}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Dont say */}
                                <div>
                                    <p className="result-text text-sm! text-[#DC2626]!">DON'T SAY</p>
                                    <ul className="pl-5!">
                                        {brandKit.voiceProfile.dontSay.map((d, i) => (
                                            <li className="list-disc py-1!" key={i}>{d}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            
                        </div>
                    </div>

                    {/* Sample Copy */}
                    <div className="col-span-2 card result-card flex flex-col gap-2">
                        <p className="result-text font-sm!">SAMPLE COPY</p>
                        {/* Hero Headline */}
                        <div className="w-full flex items-center justify-between gap-4">
                            <div>
                                <p className="result-text text-xs! font-bold!">HERO HEADLINE</p>
                                <p>{brandKit.sampleCopy.heroHeadline}</p>
                            </div>
                            
                            {/* Copy btn */}
                            <CopyBtn hexcode={brandKit.sampleCopy.heroHeadline} />
                        </div>

                        <div className="divider" />

                        {/* CTA Btn */}
                        <div className="w-full flex items-center justify-between gap-4">
                            <div>
                                <p className="result-text text-xs! font-bold!">CTA BUTTON</p>
                                <p>{brandKit.sampleCopy.ctaButton}</p>
                            </div>
                            
                            {/* Copy btn */}
                            <CopyBtn hexcode={brandKit.sampleCopy.ctaButton} />
                        </div>

                        <div className="divider" />

                        {/* Social Post */}
                        <div className="w-full flex items-center justify-between gap-4">
                            <div>
                                <p className="result-text text-xs! font-bold!">SOCIAL POST</p>
                                <p>{brandKit.sampleCopy.socialPost}</p>
                            </div>
                            
                            {/* Copy btn */}
                            <CopyBtn hexcode={brandKit.sampleCopy.socialPost} />
                        </div>

                        <div className="divider" />

                        {/* Email Subject */}
                        <div className="w-full flex items-center justify-between gap-4">
                            <div>
                                <p className="result-text text-xs! font-bold!">EMAIL SUBJECT</p>
                                <p>{brandKit.sampleCopy.emailSubject}</p>
                            </div>
                            
                            {/* Copy btn */}
                            <CopyBtn hexcode={brandKit.sampleCopy.emailSubject} />
                        </div>
                    </div>
                </div>

                {/* Download Button */}
                {/* <button
                    className="btn submit-btn"
                >
                    ↓ Download Brand Kit
                </button> */}
            </main>
        </div>
    )
}