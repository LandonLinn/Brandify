"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const VIBES = [
  "Bold & Disruptive",
  "Warm & Human",
  "Playful & Fun",
  "Minimal & Clean",
  "Luxury & Premium",
  "Professional & Trustworthy",
];

export default function Home() {
  // Text Area Chars
  const [chars, setChars] = useState(200);

  // Form Data
  const [formData, setFormData] = useState({
    companyName: "",
    companyIndustry: "",
    selectedVibe: "",
    companyDesc: "",
  })

  // Errors
  const [errors, setErrors] = useState({
    companyName: "",
    companyIndustry: "",
    selectedVibe: "",
    companyDesc: "",
  })

  const charCount = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let brandDesc = event.target.value;
    let totalLength = brandDesc.length;
    setChars(200 - totalLength);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault()

    // Error Check
    const newErrors = {
      companyName: formData.companyName === "" ? "Brand name required." : "",
      companyIndustry: formData.companyIndustry === "" ? "Brand industry required." : "",
      selectedVibe: formData.selectedVibe === "" ? "Brand vibe required." : "",
      companyDesc: formData.companyDesc === "" ? "Brand description required." : "",
    }

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error !== "");
    if (hasErrors) return;

    // Route
    router.push("/result")
  }

  return (
    <div className="dark min-h-dvh">
      <main className="container--sm section flex flex-col gap-6">
      
        {/* Title Section */}
        <div className="flex flex-col gap-4">
            <h1 className="text-on-dark font-black">Build Your <br /><span className="text-gradient">Brand Identity</span></h1>
            <p className="text-on-dark--muted">AI-powered brand kit — logo, voice, color, copy, and strategy in seconds.</p>
        </div>

        {/* Form */}
        <form
          className="card flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          {/* Brand Name */}
          <div className="flex flex-col gap-4">
            <label htmlFor="companyName">BRAND NAME <span className="text-(--color-tertiary)">*</span></label>
            <input 
              type="text" 
              name="companyName" 
              placeholder="e.g. Lumio, Vault, Helio..." 
              required 
              maxLength={100}
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>

          {/* Industry */}
          <div className="flex flex-col gap-4">
            <label htmlFor="companyIndustry">INDUSTRY <span className="text-(--color-tertiary)">*</span></label>
            <input 
              type="text" 
              name="companyIndustry" 
              placeholder="Type your industry" 
              required 
              maxLength={100}
              value={formData.companyIndustry}
              onChange={handleInputChange}
            />
          </div>

          {/* Brand Vibe */}
          <div className="flex flex-col gap-4">
            <label htmlFor="industry">BRAND VIBE <span className="text-(--color-tertiary)">*</span></label>
            {/* Container */}
            <div className="grid grid-cols-2 gap-2">
                {/* Vibe Cards */}
                {
                  VIBES.map((vibe, i) => (
                    <button 
                      key={i}
                      className={`btn vibe-card ${formData.selectedVibe === vibe ? "vibe-active" : ""}`}
                      onClick={() => setFormData({...formData, selectedVibe: vibe})}
                    >
                      {vibe}
                    </button>
                  ))}
            </div>
          </div>

          {/* Describe Brand */}
          <div className="flex justify-between items-end">
            <label htmlFor="brand-desc">EXPLAIN YOUR BUSINESS <span className="text-(--color-tertiary)">*</span></label>
            <p className="text-on-dark--muted text-sm! mr-5! leading-none">{`${chars} Chars Remaining`}</p>
          </div>
          {/* Text Area */}
          <textarea 
            name="brand-desc" 
            placeholder="e.g. We sell eco-friendly cleaning products for the home..." 
            maxLength={200} 
            onChange={charCount}
            required
          />

          {/* Submit Button */}
          <button 
            className="btn submit-btn"
            type="submit" 
          >
            Generate Brand Kit &rarr;
          </button>

          {/* Error Status */}
          {}

        </form>
      </main>
    </div>
  );
}
