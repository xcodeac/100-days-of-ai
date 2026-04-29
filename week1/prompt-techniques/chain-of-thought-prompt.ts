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
    system: `You are a system architect. 
            Before answering, think through the problem step by step 
            inside <thinking> tags. Then give your final answer.`,
    messages: [{
      role: "user",
      content: `Solve this step by step.

      <problem>
      A train leaves Station A at 9:00 AM traveling at 60 mph. 
      Another train leaves Station B at 10:00 AM traveling toward Station A at 80 mph.
      The stations are 280 miles apart.
      When will the trains meet?
      </problem>

      Think through:
      1. When does the second train leave (relative to the first)?
      2. How far has the first train traveled by then?
      3. What is the combined speed when both trains are moving?
      4. How much distance is left to cover?
      5. Calculate when they meet.`
    }],
  });

  console.log(message.content);
}

main();