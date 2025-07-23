export const proveedores = {
  openrouter: {
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    key: process.env.OPENROUTER_API_KEY
  },
  together: {
    endpoint: "https://api.together.xyz/v1/chat/completions",
    key: process.env.TOGETHER_API_KEY
  },
  deepinfra: {
    endpoint: "https://api.deepinfra.com/v1/openai/chat/completions",
    key: process.env.DEEPINFRA_API_KEY
  }
};
