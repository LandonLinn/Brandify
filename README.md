# BrandForge

**AI-powered brand identity generator** — generate a complete brand kit in seconds using Claude AI and GPT Image.

Built with Next.js, TypeScript, Tailwind CSS, Anthropic Claude API, and OpenAI GPT Image API.

---

## What It Does

Enter your company name, industry, brand vibe, and a short description. BrandForge generates a complete brand kit including:

- Color palette with hex codes and color names
- Typography recommendations (Google Fonts)
- Brand voice profile — tone, personality, do/don't say
- Sample copy — hero headline, CTA, social post, email subject
- Logo concept ideas with AI-generated logo image
- Brand archetype and competitive positioning
- Downloadable brand guidelines PDF + logo PNG in a zip folder

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Brand Generation | Anthropic Claude API (`claude-sonnet-4-5`) |
| Logo Generation | OpenAI GPT Image API (`gpt-image-2`) |
| State Management | React Context + localStorage |
| PDF Generation | jsPDF |
| Zip Export | JSZip |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Anthropic API key — [console.anthropic.com](https://console.anthropic.com)
- OpenAI API key — [platform.openai.com](https://platform.openai.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/brandforge.git
cd brandforge

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Add your API keys to `.env.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
OPENAI_API_KEY=sk-your-key-here
```

```bash
# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## How It Works

### 1. Form Submission

User fills in company name, industry, vibe, and description. On submit, `formData` is validated and posted to `/api/generate`.

### 2. Brand Kit Generation (Claude)

`/api/generate/route.ts` builds a detailed prompt using `lib/claudePrompt.ts` and sends it to the Anthropic Claude API. Claude returns a structured JSON object containing all brand kit data. The result is saved to `localStorage` and the user is routed to `/result`.

### 3. Logo Generation (GPT Image)

On the results page, a separate `useEffect` calls `/api/generate/images`. This builds an image prompt using `lib/chatPrompt.ts` — injecting the brand context, colors, and logo concept — and sends it to the OpenAI GPT Image API. The base64 image is returned and saved to `localStorage` to prevent regeneration on revisit.

### 4. Download

The download button generates a brand guidelines PDF using `jsPDF` and packages it alongside the logo PNG in a zip folder using `JSZip`. The user gets a single `.zip` download containing both files.

---

## API Routes

### `POST /api/generate`

Accepts `formData` and returns a structured brand kit JSON.

**Request body:**
```json
{
  "companyName": "Lumio",
  "companyIndustry": "Technology",
  "selectedVibe": "Minimal & Clean",
  "companyDesc": "A productivity tool for remote teams"
}
```

**Response:**
```json
{
  "brandName": "Lumio",
  "tagline": "Clarity in every click.",
  "colorPalette": { "primary": "#4F46E5", ... },
  "voiceProfile": { "tone": "Confident, minimal", ... },
  ...
}
```

### `POST /api/generate/images`

Accepts `brandKit` and returns a single AI-generated logo image as a base64 data URL.

**Request body:**
```json
{
  "brandKit": { ... }
}
```

**Response:**
```json
{
  "image": "data:image/png;base64,..."
}
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic Claude API key |
| `OPENAI_API_KEY` | OpenAI API key |

---

## Deployment

### Deploy to Vercel

```bash
npm run build   # verify no build errors first
```

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add environment variables in **Settings → Environment Variables**
4. Deploy

Vercel auto-detects Next.js — no build configuration needed.

---

## License

MIT

---

## Author

**Landon Linn** — [Linnium Technologies](https://linnium.com)

Built as a portfolio project to demonstrate full-stack AI integration with Next.js, TypeScript, and multiple AI APIs.
