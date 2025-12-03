import { GoogleGenAI } from "@google/genai";
import { OPENAI_KEY } from "./constants";

const ai = new GoogleGenAI({ apiKey: OPENAI_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
}

main();
