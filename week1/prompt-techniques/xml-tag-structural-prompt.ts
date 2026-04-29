import 'dotenv/config';
import Anthropic from "@anthropic-ai/sdk";
import * as process from "process";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// XML tags give Claude clear boundaries. Output becomes structured 
// and predictable — critical for production systems.
async function main() {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: "You are a senior code reviewer. Be concise and direct.",
    messages: [{
      role: "user",
      content: `Review this function and give feedback.
      
      <code>
      function fetchUser(id) {
        return fetch('/api/users/' + id)
      }
      </code>

      <instructions>
      - Flag type safety issues
      - Flag error handling gaps  
      - Suggest one improvement only
      </instructions>`
    }]
  });

  console.log(message.content);
}

main();