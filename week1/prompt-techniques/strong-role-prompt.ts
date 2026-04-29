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
    system: "You are a Staff Engineer at a Finnish product company with 20 years experience in distributed systems. You give direct, opinionated answers — no fluff.",
    messages: [
      {
        role: "user",
        content: "What is the single most important concept for a senior developer to understand about LLMs?",
      },
    ],
  });

  console.log(message.content);
}

main();