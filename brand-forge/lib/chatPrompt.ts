import { BrandKit } from "./types"

export function chatPrompt(concept: string, brandKit: BrandKit): string {
  return `
    You are a professional logo designer and brand identity expert.

    Generate a single logo concept image for the following brand:

    Brand Name: ${brandKit.brandName}
    Industry: ${brandKit.competitorSpacing}
    Brand Archetype: ${brandKit.brandArchetype}
    Brand Vibe & Tone: ${brandKit.voiceProfile.tone}
    Personality: ${brandKit.voiceProfile.personality.join(", ")}

    Logo Concept to Visualize: ${concept}

    Primary Color: ${brandKit.colorPalette.primary} (${brandKit.colorPalette.names.primary})
    Secondary Color: ${brandKit.colorPalette.secondary} (${brandKit.colorPalette.names.secondary})
    Accent Color: ${brandKit.colorPalette.accent} (${brandKit.colorPalette.names.accent})

    Design Requirements:
    - Clean, minimal, professional logo mark
    - Use only the brand colors listed above
    - Vector illustration style
    - Centered on a pure white background
    - No text, words, letters, or typography of any kind
    - No gradients unless they use only the brand colors
    - Suitable for use as a standalone brand logo mark
    - Simple enough to work at small sizes
    - Do not include any borders, frames, or shadows
  `.trim()
}