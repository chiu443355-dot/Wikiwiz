import { NextRequest, NextResponse } from 'next/server';

/**
 * NVIDIA Nemotron API Route
 * Handles streaming chat completions with extended thinking
 * 
 * API Key: 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
 * Model: nvidia/nemotron-3-super-120b-a12b
 */

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const API_KEY = process.env.NVIDIA_API_KEY || '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';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-super-120b-a12b',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 1,
        top_p: 0.95,
        max_tokens: 16384,
        extra_body: {
          chat_template_kwargs: {
            enable_thinking: true,
          },
          reasoning_budget: 16384,
        },
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('NVIDIA API error:', error);
      return NextResponse.json({ error: 'API request failed' }, { status: response.status });
    }

    // Stream the response back to client
    const reader = response.body?.getReader();
    if (!reader) {
      return NextResponse.json({ error: 'No response body' }, { status: 500 });
    }

    return new NextResponse(
      new ReadableStream({
        async start(controller) {
          const decoder = new TextDecoder();
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              const lines = chunk.split('\n');

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6);
                  if (data === '[DONE]') {
                    controller.close();
                    return;
                  }

                  try {
                    const parsed = JSON.parse(data);
                    const delta = parsed.choices?.[0]?.delta;

                    if (delta) {
                      // Handle reasoning content
                      if (delta.reasoning_content) {
                        controller.enqueue(
                          new TextEncoder().encode(`[REASONING]${delta.reasoning_content}[/REASONING]`)
                        );
                      }
                      // Handle actual content
                      if (delta.content) {
                        controller.enqueue(new TextEncoder().encode(delta.content));
                      }
                    }
                  } catch (e) {
                    // Skip invalid JSON lines
                  }
                }
              }
            }
          } catch (error) {
            controller.error(error);
          } finally {
            controller.close();
          }
        },
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      }
    );
  } catch (error) {
    console.error('Route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
