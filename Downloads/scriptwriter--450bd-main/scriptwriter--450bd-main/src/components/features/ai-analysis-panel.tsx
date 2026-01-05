'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { analyzeScript } from '@/app/actions';
import type { AnalyzeScriptOutput } from '@/ai/flows/ai-script-analysis';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface AiAnalysisPanelProps {
  scriptContent: string;
}

export default function AiAnalysisPanel({ scriptContent }: AiAnalysisPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [analysisResult, setAnalysisResult] = useState<AnalyzeScriptOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    setError(null);
    setAnalysisResult(null);
    startTransition(async () => {
      if (!scriptContent.trim()) {
        setError("Script content is empty. Please write something to analyze.");
        return;
      }
      const result = await analyzeScript({ scriptContent });
      if (result.success && result.data) {
        setAnalysisResult(result.data);
      } else {
        setError(result.error || 'An unknown error occurred.');
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-lg">AI Script Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Get feedback on plot holes, pacing, and character consistency.
        </p>
      </div>

      <Button onClick={handleAnalysis} disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Analyze Script
          </>
        )}
      </Button>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Analysis Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isPending && !error && (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    Generating Report
                </CardTitle>
                <CardDescription>Our AI is reading your script...</CardDescription>
            </CardHeader>
        </Card>
      )}

      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Report</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full rounded-md border p-4">
              <div className="text-sm text-foreground whitespace-pre-wrap">
                {analysisResult.analysisReport}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
