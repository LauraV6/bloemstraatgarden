import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Vraag is verplicht' },
        { status: 400 }
      );
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      console.error('Missing Cloudflare credentials');
      return NextResponse.json(
        { error: 'Server configuratie fout' },
        { status: 500 }
      );
    }

    // Call Cloudflare Workers AI
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'Je bent een vriendelijke moestuincoach. Beantwoord ALLEEN vragen over moestuinen, groenten kweken, groenten zaaien, planten, oogsten, en tuinieren. Als de vraag niet over moestuinen of groenten gaat, antwoord dan vriendelijk: "Deze vraag gaat niet over moestuinen. Stel gerust een vraag over groenten kweken!" Geef praktische adviezen in het Nederlands. Houd je antwoord beknopt: maximaal 1-2 korte zinnen. Wees direct en to-the-point.',
            },
            {
              role: 'user',
              content: question,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudflare API error:', errorText);
      return NextResponse.json(
        { error: 'AI service niet beschikbaar' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const answer = data.result?.response || 'Geen antwoord ontvangen';

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Error in tuincoach API:', error);
    return NextResponse.json(
      { error: 'Er ging iets fout. Probeer het opnieuw.' },
      { status: 500 }
    );
  }
}
