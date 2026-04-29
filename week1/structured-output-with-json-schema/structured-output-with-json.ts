import 'dotenv/config';
import Anthropic from "@anthropic-ai/sdk";
import * as process from "process";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: `You are a data extraction engine.
    Return ONLY valid JSON. No explanation. No markdown. No preamble.
    Schema: { sentiment: string, intent: string, urgency: "low"|"medium"|"high" }`,
    messages: [{ 
      role: "user", 
      content: "I've been waiting 3 weeks and nobody responds!" 
    }]
  });

  if (message.content[0].type === 'text') {
    const parsed = JSON.parse(message.content[0].text);
    console.log(parsed);
  }
}

main();