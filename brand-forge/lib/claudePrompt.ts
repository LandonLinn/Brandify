interface FormData{
    companyName: string;
    companyIndustry: string;
    selectedVibe: string;
    companyDesc: string;
}

export function claudePrompt(formData: FormData): string {
    return `
    
    You are a world-class brand strategist and designer with expertise in brand identity, copywriting,
    and visual design systems.

    Using the following information provided by the user, generate a complete brand kit:

    Company name: ${formData.companyName}
    Industry: ${formData.companyIndustry}
    Brand Vibe: ${formData.selectedVibe}
    Company Description: ${formData.companyDesc}

    Return ONLY a valid JSON object with exactly this structure.
    No markdown, no backticks, no explanation, no text before or after the JSON:

    {
    "brandName": "string",
    "tagline": "string — punchy, 5-8 words",
    "missionStatement": "string — one sentence",
    "voiceProfile": {
        "tone": "string — 3-4 descriptors",
        "personality": ["trait1", "trait2", "trait3"],
        "doSay": ["phrase1", "phrase2", "phrase3"],
        "dontSay": ["phrase1", "phrase2", "phrase3"]
    },
    "colorPalette": {
        "primary": "#hexcode",
        "secondary": "#hexcode",
        "accent": "#hexcode",
        "background": "#hexcode",
        "surface": "#hexcode",
        "names": {
            "primary": "color name",
            "secondary": "color name",
            "accent": "color name",
            "background: "color name",
            "surface": "color name"
        }
    },
    "typography": {
        "heading": "Google Font name",
        "body": "Google Font name",
        "headingStyle": "brief descriptor",
        "bodyStyle": "brief descriptor"
    },
    "sampleCopy": {
        "heroHeadline": "string",
        "heroSubheadline": "string",
        "ctaButton": "string — 2-4 words",
        "socialPost": "string — tweet length",
        "emailSubject": "string"
    },
    "logoConceptIdeas": ["concept1", "concept2", "concept3"],
    "brandArchetype": "string — e.g. The Creator, The Hero, The Sage, etc., 2-3 words",
    "competitorSpacing": "string — 1-2 sentences on how this brand stands apart"
    }
    
    `.trim();
}