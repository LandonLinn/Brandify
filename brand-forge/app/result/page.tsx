'use client';

import { CopyBtn } from "@/components/ui/CopyBtn";
import { useEffect, useState } from "react";
import { BrandKit } from "@/lib/types";
import { useAppContext } from "../context/AppContext";

import jsPDF from "jspdf"
import JSZip from "jszip"

export default function Result() {

    // State for brandKit
    const [brandKit, setBrandKit] = useState<BrandKit | null>(null);

    // Downloading
    const [downloading, setDownloading] = useState(false);

    // Loading
    const { setLoadingStatus } = useAppContext();

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
                setLoadingStatus("imaging");
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
                setLoadingStatus("done")
            }
        }
        
        // Call fetch function
        fetchImages();

    }, [brandKit]);

    if (!brandKit) return <p>loading...</p>

    const handleDownload = async () => {
    if (!brandKit) return
    setDownloading(true)

    try {
        // Build PDF
        const doc = new jsPDF()
        const pageWidth = doc.internal.pageSize.getWidth()

       const pageHeight = doc.internal.pageSize.getHeight()
        let y = 0 // track current y position

        const checkPage = (currentY: number, needed: number = 20) => {
        if (currentY + needed > pageHeight - 20) {
            doc.addPage()
            return 30 // reset y to top of new page
        }
        return currentY
        }

        // ── Cover
        doc.setFillColor(brandKit.colorPalette.primary)
        doc.rect(0, 0, pageWidth, 50, "F")
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(28)
        doc.setFont("helvetica", "bold")
        doc.text(brandKit.brandName, 20, 28)
        doc.setFontSize(12)
        doc.setFont("helvetica", "normal")
        doc.text(brandKit.tagline, 20, 40)

        y = 65 // start tracking after cover

        // ── Mission
        y = checkPage(y, 30)
        doc.setTextColor(17, 17, 17)
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        doc.text("MISSION", 20, y)
        y += 10
        doc.setFont("helvetica", "normal")
        doc.setFontSize(11)
        const missionLines = doc.splitTextToSize(brandKit.missionStatement, pageWidth - 40)
        doc.text(missionLines, 20, y)
        y += missionLines.length * 7 + 10
        doc.setDrawColor(229, 231, 240)
        doc.line(20, y, pageWidth - 20, y)
        y += 14

        // ── Color Palette
        const colors = [
        { hex: brandKit.colorPalette.primary, name: brandKit.colorPalette.names.primary },
        { hex: brandKit.colorPalette.secondary, name: brandKit.colorPalette.names.secondary },
        { hex: brandKit.colorPalette.accent, name: brandKit.colorPalette.names.accent },
        { hex: brandKit.colorPalette.background, name: brandKit.colorPalette.names.background },
        { hex: brandKit.colorPalette.surface, name: brandKit.colorPalette.names.surface },
        ]

        // Row 1 — first 3
        y = checkPage(y, 70)
        colors.slice(0, 3).forEach((color, i) => {
        const x = 20 + i * 60
        const r = parseInt(color.hex.slice(1, 3), 16)
        const g = parseInt(color.hex.slice(3, 5), 16)
        const b = parseInt(color.hex.slice(5, 7), 16)
        doc.setFillColor(r, g, b)
        doc.roundedRect(x, y, 45, 28, 3, 3, "F")
        doc.setTextColor(80, 80, 80)
        doc.setFontSize(8)
        doc.setFont("helvetica", "bold")
        doc.text(color.name, x, y + 36)
        doc.setFont("helvetica", "normal")
        doc.text(color.hex, x, y + 43)
        })

        y += 55

        // Row 2 — last 2
        y = checkPage(y, 70)
        colors.slice(3).forEach((color, i) => {
        const x = 20 + i * 60
        const r = parseInt(color.hex.slice(1, 3), 16)
        const g = parseInt(color.hex.slice(3, 5), 16)
        const b = parseInt(color.hex.slice(5, 7), 16)
        doc.setFillColor(r, g, b)
        doc.roundedRect(x, y, 45, 28, 3, 3, "F")
        doc.setTextColor(80, 80, 80)
        doc.setFontSize(8)
        doc.setFont("helvetica", "bold")
        doc.text(color.name, x, y + 36)
        doc.setFont("helvetica", "normal")
        doc.text(color.hex, x, y + 43)
        })

        y += 55
        doc.setDrawColor(229, 231, 240)
        doc.line(20, y, pageWidth - 20, y)
        y += 14

        y += 55
        doc.setDrawColor(229, 231, 240)
        doc.line(20, y, pageWidth - 20, y)
        y += 14

        // ── Typography
        y = checkPage(y, 40)
        doc.setTextColor(17, 17, 17)
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        doc.text("TYPOGRAPHY", 20, y)
        y += 10
        doc.setFont("helvetica", "normal")
        doc.setFontSize(11)
        doc.text(`Heading: ${brandKit.typography.heading} — ${brandKit.typography.headingStyle}`, 20, y)
        y += 9
        doc.text(`Body: ${brandKit.typography.body} — ${brandKit.typography.bodyStyle}`, 20, y)
        y += 14
        doc.setDrawColor(229, 231, 240)
        doc.line(20, y, pageWidth - 20, y)
        y += 14

        // ── Brand Voice
        y = checkPage(y, 60)
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        doc.text("BRAND VOICE", 20, y)
        y += 10
        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        doc.text(`Tone: ${brandKit.voiceProfile.tone}`, 20, y)
        y += 9
        doc.text(`Personality: ${brandKit.voiceProfile.personality.join(", ")}`, 20, y)
        y += 14

        // Do / Don't columns
        const doStartY = y
        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(22, 163, 74)
        doc.text("DO SAY", 20, y)
        doc.setTextColor(220, 38, 38)
        doc.text("DON'T SAY", 110, y)
        y += 8

        doc.setFont("helvetica", "normal")
        doc.setTextColor(17, 17, 17)
        const maxItems = Math.max(brandKit.voiceProfile.doSay.length, brandKit.voiceProfile.dontSay.length)
        for (let i = 0; i < maxItems; i++) {
        y = checkPage(y, 10)
        if (brandKit.voiceProfile.doSay[i]) doc.text(`• ${brandKit.voiceProfile.doSay[i]}`, 20, y)
        if (brandKit.voiceProfile.dontSay[i]) doc.text(`• ${brandKit.voiceProfile.dontSay[i]}`, 110, y)
        y += 8
        }

        y += 6
        doc.setDrawColor(229, 231, 240)
        doc.line(20, y, pageWidth - 20, y)
        y += 14

        // ── Sample Copy
        y = checkPage(y, 60)
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(17, 17, 17)
        doc.text("SAMPLE COPY", 20, y)
        y += 10
        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")

        const copyItems = [
        { label: "Headline", value: brandKit.sampleCopy.heroHeadline },
        { label: "Subheadline", value: brandKit.sampleCopy.heroSubheadline },
        { label: "CTA", value: brandKit.sampleCopy.ctaButton },
        { label: "Social", value: brandKit.sampleCopy.socialPost },
        { label: "Email Subject", value: brandKit.sampleCopy.emailSubject },
        ]

        copyItems.forEach(item => {
        y = checkPage(y, 10)
        const lines = doc.splitTextToSize(`${item.label}: ${item.value}`, pageWidth - 40)
        doc.text(lines, 20, y)
        y += lines.length * 7 + 4
        })

        y += 6
        doc.setDrawColor(229, 231, 240)
        doc.line(20, y, pageWidth - 20, y)
        y += 14

        // ── Strategy
        y = checkPage(y, 40)
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(17, 17, 17)
        doc.text("BRAND STRATEGY", 20, y)
        y += 10
        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        doc.text(`Archetype: ${brandKit.brandArchetype}`, 20, y)
        y += 9
        const posLines = doc.splitTextToSize(brandKit.competitorSpacing, pageWidth - 40)
        y = checkPage(y, posLines.length * 7)
        doc.text(posLines, 20, y)

        // Convert PDF to blob
        const pdfBlob = doc.output("blob")

        // CONVERT LOGO TO PNG BLOB 
        let pngBlob: Blob | null = null

    if (image) {
      const base64Data = image.replace("data:image/png;base64,", "")
      const byteCharacters = atob(base64Data)
      const byteNumbers = Array.from(byteCharacters).map(c => c.charCodeAt(0))
      const byteArray = new Uint8Array(byteNumbers)
      pngBlob = new Blob([byteArray], { type: "image/png" })
    }

    // ZIP EVERYTHING 
    const zip = new JSZip()
    const folderName = `Brandify${brandKit.brandName.replace(/\s+/g, "_")}`
    const folder = zip.folder(folderName)!

    folder.file("brand-guidelines.pdf", pdfBlob)
    if (pngBlob) folder.file("logo.png", pngBlob)

    const zipBlob = await zip.generateAsync({ type: "blob" })

    // TRIGGER DOWNLOAD
    const url = URL.createObjectURL(zipBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${folderName}.zip`
    a.click()
    URL.revokeObjectURL(url)

  } catch (error) {
    console.error("Download failed:", error)
  } finally {
    setDownloading(false)
  }
}

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
                    <div className="relative z-1 flex flex-col gap-2 text-shadow-md text-center md:text-left items-center md:items-start">
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
                            <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center text-center">
                                <p className="text-sm text-gray-400">No image generated</p>
                                <p className="text-xs! text-gray-400">Try refreshing browser.</p>
                            </div>
                            )}
                        </div>
                        
                    </div>

                    {/* Brand Voice */}
                    <div className="col-span-2  card result-card flex flex-col gap-2">
                        <p className="result-text">BRAND VOICE</p>
                        <div className="flex flex-col gap-5 h-full">
                            {/* Personality */}
                            <div className="flex gap-4 overflow-x-auto">
                                {brandKit.voiceProfile.personality.map((pers, i) => (
                                    <p 
                                        className="text-sm! personality-tag font-bold! rounded-full px-3! py-2! text-nowrap"
                                        style={{color: brandKit.colorPalette.secondary, backgroundColor: `${brandKit.colorPalette.secondary}20`}}
                                        key={i}
                                    >
                                        {pers}
                                    </p>
                                ))}
                            </div>

                            {/* Tone */}
                            <p><strong>Tone:</strong> <span style={{ color: brandKit.colorPalette.secondary }}>{`${brandKit.voiceProfile.tone}`}</span></p>

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
                <button
                    className="btn submit-btn min-w-60!"
                    onClick={handleDownload}
                >
                    {!downloading ? (
                            "↓ Download Brand Kit" 
                        ) : (
                            <div className="w-5 h-5 rounded-full border-4 border-white/20 border-t-white animate-spin mb-6"/>
                        )
                    }
                </button>
            </main>
        </div>
    )
}