import { GoogleGenAI } from "@google/genai";

// Ensure process is defined to prevent crash in non-Node environments if polyfill is missing
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';
const ai = new GoogleGenAI({ apiKey });

export const generatePoeticWish = async (mood: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, whimsical, and cinematic birthday poem for a friend named Ishita. 
      Her birthday is January 21st.
      The mood should be: ${mood}.
      Keep it under 60 words. Make it sound magical. Do not use markdown symbols like ** or #.`,
    });
    
    return response.text || "May your day be filled with starlight and joy.";
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Error generating wish:", error);
    }
    return "The stars are aligning to wish you the happiest of birthdays, Ishita.";
  }
};

export const generateFinalMessage = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a single, short, profound, and heart-warming sentence to wish Ishita a happy birthday. 
      Her birthday is January 21st.
      It should be suitable for a closing card message. 
      Do not use quotes.`,
    });
    
    return response.text?.trim() || "Wishing you a year as beautiful as your soul, Ishita.";
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Error generating final wish:", error);
    }
    return "Wishing you a year as beautiful as your soul, Ishita.";
  }
};

export const generateGhibliImage = async (description: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
           { text: `Generate a high-quality illustration in the style of Studio Ghibli anime. 
           The scene should be cinematic, with beautiful lighting and soft colors.
           
           Subject Description: ${description}
           ` }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Image gen error:", error);
    }
    return null;
  }
};