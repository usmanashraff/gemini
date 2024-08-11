import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];
  
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_PUBLIC_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });
export default model

// to make interactive chat send historty too
export const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello, I have 2 dogs in my house." }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
  generationConfig: {
    // maxOutputTokens: 100,
  },
});