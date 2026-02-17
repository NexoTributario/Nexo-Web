
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export async function analyzeResolution(title: string, excerpt: string) {
try {
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt = Analiza brevemente esta resolución tributaria ecuatoriana y dame 3 puntos clave para una empresa.  Título: ${title} Resumen: ${excerpt} Responde en español, con tono profesional y formato de lista.;

} catch (error) {
console.error("Error analyzing resolution:", error);
return "Error al conectar con el servicio de análisis.";
}
}

export async function askTaxQuery(query: string) {
try {
const model = ai.getGenerativeModel({
model: "gemini-1.5-flash",
systemInstruction: "Eres un experto en leyes tributarias y contables del Ecuador. Responde de forma precisa, citando normativas si es posible."
});

} catch (error) {
console.error("Error query:", error);
return "Lo sentimos, hubo un error al procesar tu consulta.";
}
