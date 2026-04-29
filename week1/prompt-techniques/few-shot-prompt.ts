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
    temperature: 0,
    system: "You are an expert sentiment analyst. Classify the sentiment of messages with precision. Respond only with the classification label.",
    messages: [{
      role: "user",
      content: `Classify the sentiment of these messages.

      <examples>
      Message: "The deployment failed again" → Negative
      Message: "Tests are all green!" → Positive  
      Message: "PR is under review" → Neutral
      </examples>

      <classify>
      Message: "The client loved the demo"
      </classify>`
    }],
  });

  console.log(message.content);
}

main();