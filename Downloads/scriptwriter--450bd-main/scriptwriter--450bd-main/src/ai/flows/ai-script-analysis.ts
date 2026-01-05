'use server';

/**
 * @fileOverview Analyzes a script for plot holes, pacing issues, or character inconsistencies.
 *
 * - analyzeScript - Analyzes the given script.
 * - AnalyzeScriptInput - The input type for the analyzeScript function.
 * - AnalyzeScriptOutput - The return type for the analyzeScript function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeScriptInputSchema = z.object({
  scriptContent: z
    .string()
    .describe('The content of the script to be analyzed.'),
});
export type AnalyzeScriptInput = z.infer<typeof AnalyzeScriptInputSchema>;

const AnalyzeScriptOutputSchema = z.object({
  analysisReport: z
    .string()
    .describe(
      'An analysis report highlighting plot holes, pacing issues, or character inconsistencies.'
    ),
});
export type AnalyzeScriptOutput = z.infer<typeof AnalyzeScriptOutputSchema>;

export async function analyzeScript(
  input: AnalyzeScriptInput
): Promise<AnalyzeScriptOutput> {
  return analyzeScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeScriptPrompt',
  input: {schema: AnalyzeScriptInputSchema},
  output: {schema: AnalyzeScriptOutputSchema},
  prompt: `You are a script analysis expert. Analyze the provided script content for plot holes, pacing issues, and character inconsistencies. Provide a detailed analysis report.

Script Content:
{{{scriptContent}}}`,
});

const analyzeScriptFlow = ai.defineFlow(
  {
    name: 'analyzeScriptFlow',
    inputSchema: AnalyzeScriptInputSchema,
    outputSchema: AnalyzeScriptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
