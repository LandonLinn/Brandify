export interface BrandKit {
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

export interface FormData {
  companyName: string
  companyIndustry: string
  selectedVibe: string
  companyDesc: string
}

export interface FormErrors {
  companyName: string
  companyIndustry: string
  selectedVibe: string
  companyDesc: string
}