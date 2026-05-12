import 'dotenv/config';
import Anthropic from "@anthropic-ai/sdk";
import * as process from "process";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// A tool definition tells Claude what external capabilities it can invoke.
// Claude never calls the tool itself — it returns a tool_use block with the
// name and arguments, and your code does the actual work.
const tools: Anthropic.Tool[] = [
  {
    // Unique identifier Claude uses to reference this tool in tool_use blocks.
    name: "get_weather",

    // Plain-English description Claude reads to decide WHEN to use this tool.
    // Be specific — vague descriptions lead to wrong or missed tool calls.
    description: "Get the current weather for a given city. Use this whenever the user asks about weather conditions.",

    // JSON Schema describing the arguments Claude must supply when calling this tool.
    input_schema: {
      // Always "object" — tool inputs are key/value maps.
      type: "object",

      properties: {
        city: {
          type: "string",                           // the argument's data type
          description: "City name, e.g. Helsinki",  // helps Claude fill this correctly
        },
        unit: {
          type: "string",
          enum: ["celsius", "fahrenheit"],           // constrains the value to a fixed set
          description: "Temperature unit. Defaults to celsius if omitted.",
        },
      },

      // Arguments listed here MUST be present in Claude's tool_use input.
      // Omit optional fields (like `unit` above) from this list.
      required: ["city"],
    },
  },
];

// Log the structure so you can inspect it without making an API call.
console.log("Tool definition:");
console.log(JSON.stringify(tools, null, 2));
