'use server';

import { analyzeScript as analyzeScriptFlow, type AnalyzeScriptInput } from "@/ai/flows/ai-script-analysis";

export async function analyzeScript(input: AnalyzeScriptInput) {
  // In a real application, you would add authentication and validation logic here.
  // For example, check if the user is logged in and has the rights to perform this action.
  
  try {
    const output = await analyzeScriptFlow(input);
    return { success: true, data: output };
  } catch (error) {
    console.error("Error analyzing script:", error);
    // Return a generic error message to the client for security reasons.
    return { success: false, error: "Failed to analyze script. Please try again later." };
  }
}
