import { GoogleGenAI } from "@google/genai";
import { OPENAI_KEY } from "./constants";

const ai = new GoogleGenAI({ apiKey: OPENAI_KEY });

async function main() {
  if (!OPENAI_KEY) {
    console.error("OPENAI_KEY missing. Set REACT_APP_OPENAI_KEY in .env");
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain how AI works in a few words",
    });

    const text =
      typeof response.text === "function"
        ? await response.text()
        : response.text || response.response?.text?.() || "";

    console.log("Gemini response:", text);
  } catch (err) {
    console.error("Gemini error:", err);
  }
}

main();
