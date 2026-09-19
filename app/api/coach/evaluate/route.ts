import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const mastery = {
  SQL: 0,
  Python: 0,
  Pandas: 0,
  Analytics: 0,
  'Data Warehousing': 0,
  PySpark: 0,
  Databricks: 0,
  Cloud: 0,
  Airflow: 0,
};

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'AI Coach is not configured yet. Add OPENAI_API_KEY to your environment variables.' },
      { status: 503 },
    );
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Please sign in before using AI Coach.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const reflection = typeof body.reflection === 'string' ? body.reflection.slice(0, 2000) : '';

  const prompt = `You are DataForge AI Coach, a rigorous but encouraging mentor for a working professional becoming a Data Engineer and Data Analyst.

Learner mastery scores (0-100): ${JSON.stringify(mastery)}
Current streak: 8 days
Recent reflection: ${reflection || 'No reflection provided. Infer a useful focus from the mastery scores.'}

Evaluate the learner for today's practice. Return ONLY valid JSON with this exact shape:
{"headline":"short assessment","strengths":["..."],"weakAreas":["..."],"nextAction":"one concrete 20-30 minute action","why":"one sentence explaining why","question":"one interview-style question to answer next"}
Keep each array to at most 3 items. Be specific to data engineering concepts. Do not invent experience or claim measurements not present in the input.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.3,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You produce concise, evidence-grounded learning evaluations.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'The AI Coach could not complete the evaluation. Try again shortly.' }, { status: 502 });
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) return NextResponse.json({ error: 'The AI Coach returned an empty evaluation.' }, { status: 502 });

  try {
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json({ error: 'The AI Coach returned an unreadable evaluation.' }, { status: 502 });
  }
}
