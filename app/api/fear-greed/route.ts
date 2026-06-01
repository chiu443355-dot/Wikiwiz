import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://cnn-fear-and-greed-index.p.rapidapi.com/cnn/v1/fear_and_greed/index',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'cnn-fear-and-greed-index.p.rapidapi.com',
          'x-rapidapi-key': 'f4e363859emsh11e0578b3227b30p1f5868jsnff900d4f5cf4',
        },
        next: { revalidate: 300 }, // cache 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // CNN Fear & Greed API response shape
    const score = data?.fear_and_greed?.score ?? data?.score ?? 50;
    const rating = data?.fear_and_greed?.rating ?? data?.rating ?? 'Neutral';

    return NextResponse.json({
      value: Math.round(score),
      valueText: rating,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Fear & Greed CNN API error:', error);
    return NextResponse.json({
      value: 50,
      valueText: 'Neutral',
      lastUpdated: new Date().toISOString(),
      error: 'Using fallback data',
    });
  }
}
