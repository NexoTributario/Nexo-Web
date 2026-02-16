
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeResolution(title: string, excerpt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analiza brevemente esta resolución tributaria ecuatoriana y dame 3 puntos clave para una empresa. 
      Título: ${title}
      Resumen: ${excerpt}
      Responde en español, con tono profesional y formato de lista.`,
    });

    return response.text || "No se pudo generar el análisis en este momento.";
  } catch (error) {
    console.error("Error analyzing resolution:", error);
    return "Error al conectar con el servicio de análisis.";
  }
}

export async function askTaxQuery(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "Eres un experto en leyes tributarias y contables del Ecuador. Responde de forma precisa, citando normativas si es posible. Si no estás seguro, recomienda consultar con un profesional de NEXO Tributario.",
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error query:", error);
    return "Lo sentimos, hubo un error al procesar tu consulta.";
  }
}
