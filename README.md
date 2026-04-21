# Claude Learning Project

A TypeScript project for learning and experimenting with the Anthropic Claude API. This project demonstrates how to set up and use the Claude SDK to build AI-powered applications.

## 📚 What This Project Does

This is a learning-focused project that:
- Integrates with the Anthropic Claude API
- Demonstrates async API calls and message handling
- Shows how to properly manage environment variables and API keys
- Provides a foundation for building Claude-based applications

The example script queries Claude for insights on LLM concepts for senior developers.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- An Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd claude-learning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.template .env
   ```
   Then edit `.env` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-...your-key-here...
   ```

4. **Run the project**
   ```bash
   npx tsx index.ts
   ```

## 📁 Project Structure

```
claude-learning/
├── index.ts                 # Main entry point with example Claude API usage
├── package.json            # Project dependencies and metadata
├── tsconfig.json           # TypeScript configuration with ESM support
├── .env                    # Environment variables (not committed to git)
├── .env.template           # Template for environment variables
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🛠️ Technologies Used

- **TypeScript**: Type-safe JavaScript
- **tsx**: Fast TypeScript executor
- **Anthropic SDK**: Official Claude API client
- **dotenv**: Environment variable management

## 📖 Learning Path

### Level 1: Get It Running
- [ ] Clone/open the project
- [ ] Install dependencies (`npm install`)
- [ ] Add your API key to `.env`
- [ ] Run `npx tsx index.ts` and see it work

### Level 2: Understand the Code
- [ ] Read through `index.ts`
- [ ] Understand how the Anthropic client is initialized
- [ ] Learn about the message creation API structure
- [ ] Explore the response format

### Level 3: Modify and Experiment
- [ ] Change the prompt in `messages`
- [ ] Adjust `max_tokens` to control response length
- [ ] change `temperature` value 0-1, and notice the response
- [ ] Add different `system` prompts
- [ ] Try different `model` versions
- [ ] Add error handling

### Level 4: Build Something New
- [ ] Create a multi-turn conversation
- [ ] Add user input handling
- [ ] Store conversation history
- [ ] Build a specific use case (chatbot, code assistant, etc.)

## 🔧 Configuration

### Environment Variables
- `ANTHROPIC_API_KEY`: Your Anthropic API key (required)

### TypeScript Configuration
The project uses:
- ES2020 target
- ESNext module format
- Node.js module resolution
- Strict type checking

### Development Tools
- **tsx**: Used for running TypeScript files directly without compilation
- **ts-node**: Alternative runner (configured in `tsconfig.json`)

## 📝 Common Tasks

### Run the script
```bash
npx tsx index.ts
```

### Check git status
```bash
git status
```

### Install new packages
```bash
npm install package-name
```

### Add to git staging
```bash
git add .
```

## 🔐 Security

- **Never commit `.env`** - It contains your API key
- Use `.env.template` as a reference for required variables
- `.env` is in `.gitignore` and won't be tracked by git
- Keep your API key private and rotate it if accidentally exposed

## 🐛 Troubleshooting

### "Unknown file extension .ts" error
- Ensure `tsconfig.json` has ESM configuration
- Use `npx tsx` instead of `npx ts-node`

### "Could not resolve authentication method" error
- Check that `.env` file exists and contains your API key
- Verify the API key format is correct
- Ensure `import 'dotenv/config'` is at the top of `index.ts`

### Module not found errors
- Run `npm install` to install dependencies
- Check `package.json` for required packages

## 📚 Useful Resources

- [Anthropic API Documentation](https://docs.anthropic.com)
- [Claude Models](https://docs.anthropic.com/claude/reference/models-overview)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js ESM Support](https://nodejs.org/en/docs/guides/ecmascript-modules/)

## 🤝 Contributing

This is a learning project. Feel free to:
- Modify the code to experiment
- Create branches for new features
- Test different Claude models and prompts
- Share learnings and improvements

## 📄 License

ISC

---

**Happy Learning!** 🎓
