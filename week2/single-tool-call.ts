import 'dotenv/config';
import Anthropic from "@anthropic-ai/sdk";
import * as process from "process";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const tools = [{
  name: "get_weather",
  description: "Get current weather for a city. Use this when the user asks about weather anywhere.",
  input_schema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "The city name e.g. Helsinki, London"
      },
      unit: {
        type: "string",
        enum: ["celsius", "fahrenheit"],
        description: "Temperature unit. Default celsius."
      }
    },
    required: ["city"]
  }
}] as const;

const message = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  tools: tools,
  messages: [{
    role: "user",
    content: "What's the weather like in Helsinki today?"
  }]
});

console.log(message.stop_reason);  // should be "tool_use"
console.log(message.content);      // inspect the tool_use block