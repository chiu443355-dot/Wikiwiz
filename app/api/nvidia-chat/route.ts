import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    // NVIDIA API Configuration
    const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
    const API_KEY = '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';

    const nvidiaResponse = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-super-120b-a12b',
        messages: [
          {
            role: 'system',
            content: 'You are a professional trading analyst. Provide brief, actionable market insights.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 2048,
        stream: true,
      }),
    });

    if (!nvidiaResponse.ok) {
      const errorText = await nvidiaResponse.text();
      console.error('NVIDIA API Error:', nvidiaResponse.status, errorText);
      return new NextResponse(
        JSON.stringify({ error: `NVIDIA API Error: ${nvidiaResponse.status}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a readable stream to send back to client
    const reader = nvidiaResponse.body?.getReader();
    if (!reader) {
      return new NextResponse('Error: No response body', { status: 500 });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // Flush any remaining buffer
              if (buffer.trim()) {
                controller.enqueue(encoder.encode(buffer));
              }
              controller.close();
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');

            // Keep the last incomplete line in the buffer
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine || trimmedLine === ':' || trimmedLine.startsWith(':')) continue;

              if (trimmedLine.startsWith('data: ')) {
                const jsonStr = trimmedLine.slice(6);

                if (jsonStr === '[DONE]') {
                  continue;
                }

                try {
                  const parsed = JSON.parse(jsonStr);
                  const content = parsed.choices?.[0]?.delta?.content;

                  if (content) {
                    controller.enqueue(encoder.encode(content));
                  }
                } catch (parseError) {
                  // Silently continue on parse errors
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Route error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
