import 'dotenv/config';
import Anthropic from "@anthropic-ai/sdk";
import * as process from "process";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {

  const article = `Anthropic announced Claude 4 with 1M token context, 
  improved reasoning, and stronger coding benchmarks...`;

  const message = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  system: `You are a tech news analyst for senior engineers.
    Return ONLY valid JSON matching this schema exactly:
    {
      "title": string,
      "summary": string (max 2 sentences),
      "key_insight": string (one actionable takeaway for a Tech Lead),
      "relevance_score": number (1-10),
      "tags": string[],
      "sentiment": "positive"|"neutral"|"negative"
    }`,
    messages: [{ role: "user", content: `<article>${article}</article>` }]
  });

  if (message.content[0].type === 'text') {
    let jsonText = message.content[0].text;
    
    // Remove markdown code blocks if present
    const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }
    
    const parsed = JSON.parse(jsonText);
    console.log(parsed);
  }
}

main();