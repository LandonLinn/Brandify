import { chatPrompt } from "@/lib/chatPrompt"

export async function POST(req: Request) {
  try {
    const { brandKit } = await req.json()

    // Get first concept only
    const concept = brandKit.logoConceptIdeas[0]

    // Build one prompt
    const prompt = chatPrompt(concept, brandKit)

    // One fetch call
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      })
    })

    if (!response.ok) throw new Error("OpenAI request failed")

    // Parse response
    const data = await response.json()
    const imageUrl = data.data[0].url

    // Return single URL
    return Response.json({ image: imageUrl })

  } catch (error) {
    return Response.json(
      { error: "Failed to generate brand logo" },
      { status: 500 }
    )
  }
}