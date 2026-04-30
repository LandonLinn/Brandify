import { chatPrompt } from "@/lib/chatPrompt"

export async function POST(req: Request) {
  try {
    const { brandKit } = await req.json()
    console.log("1 - brandKit received:", brandKit.brandName)

    // Get first concept only
    const concept = brandKit.logoConceptIdeas[0];
    console.log("2 - concept:", concept);

    // Build one prompt
    const prompt = chatPrompt(concept, brandKit);
    console.log("3 - prompt built:", prompt.slice(0, 100))

    // One fetch call
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "low",
      })
    })
    console.log("4 - fetch fired, status:", response.status)

    // Parse response
    const data = await response.json();
    console.log("OpenAI raw:", JSON.stringify(data, null, 2))
    if (!response.ok) throw new Error("OpenAI request failed");
    const imageBase64 = data.data[0].b64_json
    const imageUrl = `data:image/png;base64,${imageBase64}`

    // Return single URL
    return Response.json({ image: imageUrl })

  } catch (error) {
    console.error("Caught error:", error)
    return Response.json({ error: "Failed to generate brand logo" }, { status: 500 })
  }
}