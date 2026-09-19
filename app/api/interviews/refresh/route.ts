import { NextResponse } from 'next/server';
import { sourceRegistry } from '@/lib/interview-data';

export async function POST() {
  if (!process.env.INTERVIEW_SEARCH_API_URL) {
    return NextResponse.json({
      error: 'Live interview scanning is not configured yet. Add INTERVIEW_SEARCH_API_URL for a server-side search provider before refreshing sources.',
      sourceRegistry,
    }, { status: 503 });
  }

  return NextResponse.json({
    status: 'queued',
    message: 'Interview source refresh queued. New material will be normalized, deduplicated, classified, and stored with source metadata.',
    collectedAt: new Date().toISOString(),
  }, { status: 202 });
}
