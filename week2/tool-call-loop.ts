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

// After experiment 1, extract the tool call
type ToolUseBlock = {
  type: "tool_use";
  id: string;
  input: {
    city: string;
  };
};

const toolUseBlock = message.content.find((b): b is ToolUseBlock => {
  return typeof b === "object" && b !== null && (b as any).type === "tool_use";
});

if (!toolUseBlock) {
  throw new Error("Unable to extract tool use block from the response");
}

// Simulate calling a real weather API
const fakeWeatherResult = {
  city: (toolUseBlock.input as { city: string, unit?: string }).city,
  temperature: 18,
  condition: "Partly cloudy",
  unit: "celsius"
};

// Return result back to Claude
const finalResponse = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  tools: tools,
  messages: [
    { role: "user", content: "What's the weather in Helsinki?" },
    { role: "assistant", content: message.content },
    {
      role: "user",
      content: [{
        type: "tool_result",
        tool_use_id: toolUseBlock.id,
        content: JSON.stringify(fakeWeatherResult)
      }]
    }
  ]
});

const textBlock = finalResponse.content.find(block => block.type === 'text') as { type: 'text'; text: string };
console.log(textBlock?.text);