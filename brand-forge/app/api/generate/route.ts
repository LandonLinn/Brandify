import { claudePrompt } from "@/lib/claudePrompt";

// Claude API - Brand Details Here
export async function POST(req: Request){
    try{
        // Read form data --- app/page.tsx
        const body = await req.json();
        // Prompt Form Data
        const prompt = claudePrompt(body)

        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "x-api-key": process.env.ANTHROPIC_API_KEY!,
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-6",
                max_tokens: 1000,
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        const text = data.content[0].text;
        const brandKit = JSON.parse(text);

        return Response.json(brandKit);

    } catch (error) {
        return Response.json(
            {error: "Failed to generate brand kit"},
            {status: 500}
        );
    }
}