import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI("AIzaSyDrkzrFKta0iyjpwFxab0GQTrDJbJW9xZg");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

async function run() {
  try {
    const result = await model.generateContent("Say 'System OK' if you receive this.");
    console.log("FINAL TEST RESULT:", result.response.text());
  } catch (e) {
    console.error("FINAL TEST FAILED:", e.message);
  }
}
run();
