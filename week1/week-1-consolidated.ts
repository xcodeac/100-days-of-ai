import 'dotenv/config';
import Anthropic from "@anthropic-ai/sdk";
import * as process from "process";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  // Week 1 consolidation — everything in one call
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    temperature: 0.2,
    system: `You are a senior engineering mentor with 20 years experience.
      Think step by step inside <thinking> tags before answering.
      Return your response as JSON:
      {
        "insight": string,
        "action": string,
        "warning": string
      }`,
    messages: [{
      role: "user",
      content: `<context>
        A senior fullstack developer with 15 years experience
        is 7 days into learning to architect AI systems.
        </context>
        <question>
        What is the single most important thing to focus on
        in week 2 of this learning journey?
        </question>`
    }]
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